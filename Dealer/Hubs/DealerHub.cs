using Dealer.Server.Services;
using Lyra.Core.API;
using Lyra.Core.Blocks;
using Lyra.Data.API;
using Lyra.Data.API.Identity;
using Lyra.Data.API.WorkFlow;
using Lyra.Data.API.WorkFlow.UniMarket;
using Lyra.Data.Crypto;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using System.Threading.Tasks.Dataflow;
using System.Web;
using UserLibrary.Data;

namespace Dealer.Server.Hubs
{
    // inherit Hub<T>, where T is your interface defining the messages
    // client call this
    public class DealerHub : Hub<IHubPushMethods>, IHubInvokeMethods
    {
        private string _dealerOwnerAccountId, _dealerKey;

        Keeper _keeper;
        IConfiguration _config;
        ILyraAPI _lyraApi;
        DealerDb _db;
        Dealeamon _dealer;
        BufferBlock<ChatMessage> _messageBuffer;
        BufferBlock<FileMessage> _fileBuffer;

        Dictionary<string, string> _idgrps = new Dictionary<string, string>();

        ILogger<DealerHub> _logger;

        Dictionary<string, Func<ChatMessage, Task>> BotCommands;

        public DealerHub(DealerDb db, Dealeamon dealer, Keeper keeper, ILyraAPI lyraApi, IConfiguration Configuration, ILogger<DealerHub> logger)
        {
            _config = Configuration;
            _lyraApi = lyraApi;
            _db = db;
            _dealer = dealer;
            _logger = logger;
            _keeper = keeper;
            _messageBuffer = new BufferBlock<ChatMessage>();
            _fileBuffer = new BufferBlock<FileMessage>();

            _dealerKey = Configuration["DealerKey"];
            _dealerOwnerAccountId = Signatures.GetAccountIdFromPrivateKey(_dealerKey);

            BotCommands = new Dictionary<string, Func<ChatMessage, Task>>
            {
                // OTC Trade
                { "status", CommandStatus },
                { "fiatsent", CommandFiatSent },
                { "fiatreceived", CommandFiatReceived },
                { "info", CommandInfo },
                { "cancel", CommandCancel },

                // ODR
                //{ "complaint", CommandComplain }
            };
        }

        #region the main chat Logic
        // room == trade == group, trinity
        bool InConsumer = false;
        private async Task ConsumeAsync<T>(IReceivableSourceBlock<T> source)
        {
            if (InConsumer)
                return;

            InConsumer = true;
            while (source.TryReceive(out T post))
            {
                if(post is ChatMessage msg)
                {
                    // save history
                    var room = await _db.GetRoomByTradeAsync(msg.TradeId);
                    if (room.Members.Any(a => a.AccountId == msg.AccountId))
                    {
                        await SendResponseToRoomAsync(room.TradeId, msg.AccountId, msg.Text);

                        await ProcessInputAsync(msg);
                    }
                    else
                    {
                        _logger.LogInformation("Not permited to chat.");
                    }
                }
                else if(post is FileMessage fm)
                {
                    var room = await _db.GetRoomByTradeAsync(fm.TradeId);
                    if (room.Members.Any(a => a.AccountId == fm.AccountId))
                    {
                        var img = await _db.GetImageDataByIdAsync(fm.FileHash);
                        if(img != null)
                        {
                            var tximg = new TxImage
                            {
                                MimeType = img.Mime,
                                MessageType = img.Mime.StartsWith("image/") ? MessageTypes.Image : MessageTypes.File,
                                DataHash = img.Hash,
                                Url = $"{_config["baseUrl"]}/api/dealer/img?hash={img.Hash}",

                                AccountId = fm.AccountId,
                                TradeID = fm.TradeId,
                                FileName = img.FileName,
                            };

                            await SendFileToRoomAsync(tximg);
                        }
                    }
                    else
                    {
                        _logger.LogInformation("Not permited to chat.");
                    }
                }
            }
            InConsumer = false;
        }

        private async Task SendResponseToRoomAsync(string tradeid, string speakerAccountId, string text)
        {
            var txmsg = new TxMessage
            {
                TradeID = tradeid,
                AccountId = speakerAccountId,

                Text = text,
            };

            var latestmsg = await _db.AppendTxRecordAsync(txmsg);

            string userName;
            if (speakerAccountId == _dealerOwnerAccountId)
                userName = "Dealer";
            else
            {
                var user = await _db.GetUserByAccountIdAsync(speakerAccountId);
                userName = user.User.UserName;
            }
            
            var resp = new RespMessage
            {
                TradeId = tradeid,
                UserName = userName,
                Text = text,
                Hash = latestmsg.Hash,
            };

            await SendToTradeRoomAsync(txmsg.TradeID, new RespContainer(resp));
        }

        public async Task SendFileToRoomAsync(TxFile file)
        {
            var latestmsg = await _db.AppendTxRecordAsync(file);

            string userName;
            if (file.AccountId == _dealerOwnerAccountId)
                userName = "Dealer";
            else
            {
                var user = await _db.GetUserByAccountIdAsync(file.AccountId);
                userName = user.User.UserName;
            }

            var resp = new RespFile
            {
                TradeId = file.TradeID,
                UserName = userName,
                Hash = latestmsg.Hash,

                FileHash = file.Hash,
                Url = file.Url,
                MimeType = file.MimeType,
                FileName = file.FileName,
            };

            await SendToTradeRoomAsync(file.TradeID, new RespContainer(resp));
        }

        private async Task SendToTradeRoomAsync(string tradeId, RespContainer container)
        {
            // to all members separately
            var room = await _db.GetRoomByTradeAsync(tradeId);
            foreach (var mem in room.Members)
            {
                var x = Clients.Group(mem.AccountId);
                await Clients.Group(mem.AccountId).OnChat(container);

                Console.WriteLine($"SendToTradeRoomAsync {container.MsgType} to {mem.AccountId}");

                // send to telegram
                var user = await _db.GetUserByAccountIdAsync(mem.AccountId);
                if(user?.User.TelegramID != null)
                {
                    await _keeper.SendToTelegramAsync(user?.User.TelegramID, container);
                }
            }
        }

        private async Task ProcessInputAsync(ChatMessage msg)
        {
            if (msg.Text.StartsWith('/'))
            {
                var secs = msg.Text.Split(' ');
                var cmd = secs[0].Substring(1);

                if (BotCommands.ContainsKey(cmd))
                    await BotCommands[cmd](msg);
                else
                {
                    await CommandHelp(msg);
                }
            }
        }

        // help
        private async Task CommandHelp(ChatMessage msg)
        {
            var text = @$"Supported commands: {string.Join(",", BotCommands.Keys.ToArray())}";

            await SendResponseToRoomAsync(msg.TradeId, _dealerOwnerAccountId, text);
        }

        #endregion

        #region OTC state changes
        private async Task CommandFiatReceived(ChatMessage msg)
        {
            //var lastStatus = UniTradeStatus.FiatSent;
            //for (var i = 0; i < 50; i++) // TODO: create a better solution
            //{
            //    var tradeblk = (await _lyraApi.GetLastBlockAsync(msg.TradeId)).As<IUniTrade>();
            //    if (tradeblk.UTStatus == lastStatus)
            //    {
            //        await Task.Delay(100);
            //        continue;
            //    }

            //    await CommandStatus(msg);

            //    var room = await _db.GetRoomByTradeAsync(msg.TradeId);
            //    foreach (var user in room.Members)
            //        await ChatServer.PinMessageAsync(_db, Clients, tradeblk, user.AccountId);

            //    if(tradeblk.UTStatus == UniTradeStatus.FiatReceived)
            //    {
            //        lastStatus = UniTradeStatus.FiatReceived;
            //        continue;
            //    }
            //    return;
            //}

            var text = $"Dealer can't confirm FiaT send. Please try again.";
            await SendResponseToRoomAsync(msg.TradeId, _dealerOwnerAccountId, text);
        }

        private async Task CommandFiatSent(ChatMessage msg)
        {
            for(var i = 0; i < 50; i++)
            {
                var tradeblk = (await _lyraApi.GetLastBlockAsync(msg.TradeId)).As<IUniTrade>();
                if(tradeblk.UTStatus == UniTradeStatus.Open)
                {
                    await Task.Delay(100);
                    continue;
                }

                await CommandStatus(msg);

                var room = await _db.GetRoomByTradeAsync(msg.TradeId);
                foreach (var user in room.Members)
                    await ChatServer.PinMessageAsync(_db, Clients, tradeblk, user.AccountId);

                return;
            }

            var text = $"Dealer can't confirm FIAT send. Please try again.";
            await SendResponseToRoomAsync(msg.TradeId, _dealerOwnerAccountId, text);
        }

        private async Task CommandStatus(ChatMessage msg)
        {
            var tradeblk = (await _lyraApi.GetLastBlockAsync(msg.TradeId)).As<IUniTrade>();
            var fiat = $"{tradeblk.Trade.biding} {tradeblk.Trade.price * tradeblk.Trade.amount:N2}";
            var next = tradeblk.UTStatus switch
            {
                UniTradeStatus.Open => $"Buyer send {fiat} to seller",
                UniTradeStatus.Processing => $"Processing payment in progress",
                //UniTradeStatus.FiatReceived => $"Contract to release Crypto {tradeblk.Trade.amount} {tradeblk.Trade.crypto} to buyer",
                //UniTradeStatus.CryptoReleased => "None",
                UniTradeStatus.Closed => "Trade closed. Nothing to do",
                UniTradeStatus.Canceled => "Trade canceled. Nothing to do",
                UniTradeStatus.Dispute => "Arbitration",
                _ => throw new NotImplementedException(),
            };
            var text = $"Current status of trade: {tradeblk.UTStatus}. Next step: {next}";

            await SendResponseToRoomAsync(msg.TradeId, _dealerOwnerAccountId, text);
        }

        // print peer info
        private async Task CommandInfo(ChatMessage msg)
        {
            var tradeblk = (await _lyraApi.GetLastBlockAsync(msg.TradeId)).As<IUniTrade>();
            var text = $"Trade ID: {(tradeblk as TransactionBlock).AccountID}";

            await SendResponseToRoomAsync(msg.TradeId, _dealerOwnerAccountId, text);
        }

        // cancel trade
        private async Task CommandCancel(ChatMessage msg)
        {
            for (var i = 0; i < 50; i++)
            {
                var tradeblk = (await _lyraApi.GetLastBlockAsync(msg.TradeId)).As<IUniTrade>();
                if (tradeblk.UTStatus != UniTradeStatus.Canceled)
                {
                    await Task.Delay(100);
                    continue;
                }

                await CommandStatus(msg);

                var room = await _db.GetRoomByTradeAsync(msg.TradeId);
                foreach (var user in room.Members)
                    await ChatServer.PinMessageAsync(_db, Clients, tradeblk, user.AccountId);

                return;
            }

            var text = $"Dealer can't confirm FIAT send. Please try again.";
            await SendResponseToRoomAsync(msg.TradeId, _dealerOwnerAccountId, text);
        }
        #endregion

        #region signalR events
        public override async Task OnConnectedAsync()
        {
            try
            {
                //var qs = Context.GetHttpContext().Request.QueryString;
                //var parsed = HttpUtility.ParseQueryString(qs.Value);
                //var account = parsed["a"];
                //var id = parsed["id"];
                //var sign = parsed["sign"];
                //if (Signatures.VerifyAccountSignature(account, account, sign))
                //    await Groups.AddToGroupAsync(Context.ConnectionId, account);
            }
            catch (Exception ex)
            {
                _logger.LogInformation($"Error in OnConnectedAsync: {ex}");
            }
            //File.AppendAllText("c:\\tmp\\connectionids.txt", $"AddToGroupAsync: {id}, {account}\n");

            //File.AppendAllText("c:\\tmp\\connectionids.txt", $"OnConnectedAsync: {Context.ConnectionId}\n");
            await base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            return base.OnDisconnectedAsync(exception);
        }
        #endregion

        #region client API
        public async Task Chat(ChatMessage msg)
        {
            // PortableSignatures make a better compatibility
            if (msg.VerifySignature(msg.AccountId))
            {
                _messageBuffer.Post(msg);
                await ConsumeAsync(_messageBuffer);
            }
            else
            {
                _logger.LogInformation("Message signature verify failed.");
            }
        }

        public async Task SendFile(FileMessage file)
        {
            // PortableSignatures make a better compatibility
            if (file.VerifySignature(file.AccountId))
            {
                _fileBuffer.Post(file);
                await ConsumeAsync(_fileBuffer);
            }
            else
            {
                _logger.LogInformation("Message signature verify failed.");
            }
        }

        /// <summary>
        /// join a dealer room. talk with trading peer.
        /// </summary>
        /// <param name="req"></param>
        /// <returns></returns>
        public async Task<JoinRoomResponse> JoinRoom(JoinRoomRequest req)
        {
            // verify the signature
            var ok = Signatures.VerifyAccountSignature(req.TradeID, req.UserAccountID, req.Signature);
            if (ok)
            {
                // check if the client belongs to the room
                // account id should be either buyer or seller
                var tradeblk = (await _lyraApi.GetLastBlockAsync(req.TradeID)).As<IUniTrade>();

                if (tradeblk?.OwnerAccountId == req.UserAccountID
                    || tradeblk?.Trade.orderOwnerId == req.UserAccountID)
                {
                    // in database, one dealer room per trade.
                    var room = await _db.GetRoomByTradeAsync(req.TradeID);
                    if (room == null)
                    {
                        room = await _db.CreateRoomAsync(tradeblk);
                    }

                    if (room != null)
                    {
                        // room members[0] is seller
                        var seller = room.Members.First();
                        var buyer = room.Members.Skip(1).First();

                        // join the group
                        await Groups.AddToGroupAsync(Context.ConnectionId, req.TradeID);
                        Console.WriteLine($"JoinRoom add client id {Context.ConnectionId} to group {req.TradeID}");
                        await Groups.AddToGroupAsync(Context.ConnectionId, req.UserAccountID);
                        Console.WriteLine($"JoinRoom add client id {Context.ConnectionId} to group {req.UserAccountID}");

                        // pin a message
                        await ChatServer.PinMessageAsync(_db, Clients, tradeblk, req.UserAccountID);

                        var txmsgs = await _db.GetTxRecordsByTradeAsync(req.TradeID);
                        var dict = new Dictionary<string, string>()
                        {
                            { room.Members.First().AccountId, seller.UserName },
                            { buyer.AccountId, buyer.UserName },
                            { _dealerOwnerAccountId, "Dealer" },
                        };
                        return new JoinRoomResponse
                        {                            
                            ResultCode = APIResultCodes.Success,
                            History = txmsgs.Select(rec =>
                                rec is TxMessage msg ?

                                new RespContainer(
                                        new RespMessage
                                        {
                                            TradeId = req.TradeID,
                                            UserName = dict[msg.AccountId],
                                            Text = msg.Text,
                                        })
                                :
                                
                                new RespContainer(
                                        new RespFile
                                        {
                                            TradeId = req.TradeID,
                                            UserName = dict[(rec as TxFile).AccountId],
                                            Hash = rec.Hash,

                                            FileHash = (rec as TxFile).DataHash,
                                            Url = (rec as TxFile).Url,
                                            MimeType = (rec as TxFile).MimeType,
                                        })                                
                                )
                                .ToArray(),
                            Roles = new Dictionary<string, string>()
                            {
                                { seller.UserName, seller.AccountId == req.UserAccountID ? "me" : "peer"},
                                { buyer.UserName, buyer.AccountId == req.UserAccountID ? "me" : "peer"},
                                { "Dealer", "dealer" },
                            }
                        };
                    }
                }
            }

            return new JoinRoomResponse
            {
                ResultCode = APIResultCodes.DealerRoomNotExists,
            };
        }

        /// <summary>
        /// join a uniqe virtual room named as user account id.
        /// </summary>
        /// <param name="req"></param>
        /// <returns></returns>
        public async Task Join(JoinRequest req)
        {
            var lsb = await _lyraApi.GetLastServiceBlockAsync();

            var ok = Signatures.VerifyAccountSignature(lsb.GetBlock().Hash, req.UserAccountID, req.Signature);
            if(ok)
            {
                if(_idgrps.ContainsKey(Context.ConnectionId))
                    await Groups.RemoveFromGroupAsync(Context.ConnectionId, _idgrps[Context.ConnectionId]);

                _idgrps.Add(Context.ConnectionId, req.UserAccountID);
                await Groups.AddToGroupAsync(Context.ConnectionId, req.UserAccountID);
                Console.WriteLine($"Join add user {req.UserAccountID} to it's group with conn id: {Context.ConnectionId}.");
                //File.AppendAllText("c:\\tmp\\connectionids.txt", $"AddToGroupAsync: {Context.ConnectionId}, {req.UserAccountID}\n");
            }
        }

        public async Task Leave(JoinRequest req)
        {
            var lsb = await _lyraApi.GetLastServiceBlockAsync();

            var ok = Signatures.VerifyAccountSignature(lsb.GetBlock().Hash, req.UserAccountID, req.Signature);
            if (ok)
            {
                if (_idgrps.ContainsKey(Context.ConnectionId))
                {
                    await Groups.RemoveFromGroupAsync(Context.ConnectionId, _idgrps[Context.ConnectionId]);
                    Console.WriteLine($"Leave remove client {Context.ConnectionId} from group {_idgrps[Context.ConnectionId]}");
                }
                //File.AppendAllText("c:\\tmp\\connectionids.txt", $"AddToGroupAsync: {Context.ConnectionId}, {req.UserAccountID}\n");
            }
        }
        #endregion

        #region ODR
        //private async Task CommandComplain(ChatMessage msg)
        //{
        //    var room = await _db.GetRoomByTradeAsync(msg.TradeId);
        //    var delay = room.DisputeLevel switch
        //    {
        //        //DisputeLevels.Peer => TimeSpan.FromDays(1),
        //        //DisputeLevels.DAO => TimeSpan.FromDays(4),
        //        //DisputeLevels.LyraCouncil => TimeSpan.FromDays(7),
        //        _ => TimeSpan.Zero,
        //    };

        //    var tradeblk = (await _lyraApi.GetLastBlockAsync(msg.TradeId)).As<IUniTrade>();
        //    if (tradeblk.UTStatus == UniTradeStatus.Dispute ||
        //        tradeblk.UTStatus == UniTradeStatus.DisputeClosed)
        //    {
        //        await SendResponseToRoomAsync(msg.TradeId, _dealerOwnerAccountId, "Inappropriate");
        //        return;
        //    }

        //    if(room.DisputeLevel != DisputeLevels.None)
        //    {
        //        // delay
        //        if(room.DisputeHistory.Last().RaisedTime + delay > DateTime.UtcNow)
        //        {
        //            var str = string.Format("{0} Days {1} Hours {2} Minutes", delay.Days, delay.Hours, delay.Minutes);
        //            await SendResponseToRoomAsync(msg.TradeId, _dealerOwnerAccountId, $"Can't raise dispute level in cooling down. Time left: {str}");
        //            return;
        //        }
        //    }

        //    var dispute = new DisputeCase
        //    {
        //        Id = room.DisputeHistory?.Count + 1 ?? 1,
        //        Level = (DisputeLevels)((int)room.DisputeLevel + 1),
        //        RaisedBy = msg.AccountId,
        //        RaisedTime = DateTime.UtcNow,
        //        ClaimedLost = decimal.Parse(msg.Text.Split(' ')[1]),
        //    };

        //    room.DisputeLevel = dispute.Level;
        //    room.AddComplain(dispute);
        //    await _db.UpdateRoomAsync(room.Id, room);

        //    string from;
        //    if (msg.AccountId == tradeblk.OwnerAccountId)    // buyer
        //    {
        //        from = "Buyer";
        //    }
        //    else  // seller
        //    {
        //        from = "Seller";
        //    }

        //    var text = $"{from} issued a complaint about lost of {dispute.ClaimedLost} LYR. Please be noted. ";
        //    await SendResponseToRoomAsync(msg.TradeId, _dealerOwnerAccountId, text);

        //    foreach (var user in room.Members)
        //        await PinMessageAsync(tradeblk, user.AccountId);
        //}
        #endregion
    }
}
