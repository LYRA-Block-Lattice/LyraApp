using Dealer.Server.Services;
using Lyra.Core.API;
using Lyra.Core.Blocks;
using Lyra.Data.API.Identity;
using Lyra.Data.API.WorkFlow;
using Lyra.Data.Crypto;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks.Dataflow;
using UserLibrary.Data;

namespace Dealer.Server.Hubs
{
    // inherit Hub<T>, where T is your interface defining the messages
    // client call this
    public class DealerHub : Hub<IHubPushMethods>, IHubInvokeMethods
    {
        DealerDb _db;
        BufferBlock<ChatMessage> _buffer;
        private readonly IHubContext<DealerHub> _hubContext;

        public DealerHub(DealerDb db, IHubContext<DealerHub> hubContext)
        {
            _db = db;
            _hubContext = hubContext;
            _buffer = new BufferBlock<ChatMessage>();
        }

        // room == trade == group, trinity
        bool InConsumer = false;
        public async Task ConsumeAsync(IReceivableSourceBlock<ChatMessage> source)
        {
            if (InConsumer)
                return;

            InConsumer = true;
            while (source.TryReceive(out ChatMessage msg))
            {
                // save history
                var room = await _db.GetRoomByTradeAsync(msg.TradeId);
                if (room.Members.Any(a => a.AccountId == msg.AccountId))
                {                   

                    await SendResponseToRoomAsync(room.TradeId, msg.AccountId, msg.Text);

                    await ProcessInputAsync(room.TradeId, msg.Text);
                }
                else
                {
                    Console.WriteLine("Not permited to chat.");
                }
            }
            InConsumer = false;
        }

        private async Task SendResponseToRoomAsync(string tradeid, string speakerAccountId, string text)
        {
            var prevMsgs = await _db.GetTxRecordsByTradeAsync(tradeid);
            var txmsg = new TxMessage
            {
                TradeID = tradeid,
                AccountId = speakerAccountId,

                Text = text,
            };

            TxRecord last = null;
            if (prevMsgs.Count() > 0)
                last = prevMsgs.Last();

            txmsg.Initialize(last, Consts.DEALER_KEY, Consts.DEALER_ACCOUNTID);
            await _db.CreateTxRecordAsync(txmsg);

            string userName;
            if (speakerAccountId == Consts.DEALER_ACCOUNTID)
                userName = "Dealer";
            else
            {
                var user = await _db.GetUserByAccountIdAsync(speakerAccountId);
                userName = user.UserName;
            }
            
            var resp = new RespMessage
            {
                UserName = userName,
                Text = text,
            };
            await _hubContext.Clients.Group(tradeid).SendAsync("OnChat", resp);
        }

        private async Task ProcessInputAsync(string tradeid, string input)
        {
            if(input.StartsWith("/"))   // bot command
            {
                switch(input.Substring(1))
                {
                    case "status":
                        await CommandStatus(tradeid, input);
                        break;
                    case "fiatsent":
                        await CommandFiatSent(tradeid, input);
                        break;
                    case "fiatreceived":
                        await CommandFiatReceived(tradeid, input);
                        break;
                    default:
                        break;
                }
            }
        }

        private async Task CommandFiatReceived(string tradeid, string input)
        {
            var lastStatus = OTCTradeStatus.FiatSent;
            var lc = LyraRestClient.Create(_db.NetworkId, Environment.OSVersion.ToString(), "Dealer", "0.1");
            for (var i = 0; i < 50; i++)
            {
                var tradeblk = (await lc.GetLastBlockAsync(tradeid)).As<IOtcTrade>();
                if (tradeblk.OTStatus == lastStatus)
                {
                    await Task.Delay(100);
                    continue;
                }

                await CommandStatus(tradeid, input);

                var room = await _db.GetRoomByTradeAsync(tradeid);
                foreach (var user in room.Members)
                    await PinMessageAsync(tradeblk, user.AccountId);

                if(tradeblk.OTStatus == OTCTradeStatus.FiatReceived)
                {
                    lastStatus = OTCTradeStatus.FiatReceived;
                    continue;
                }
                return;
            }

            var msg = $"Dealer can't confirm FiAT send. Please try again.";
            await SendResponseToRoomAsync(tradeid, Consts.DEALER_ACCOUNTID, msg);
        }

        private async Task CommandFiatSent(string tradeid, string input)
        {
            var lc = LyraRestClient.Create(_db.NetworkId, Environment.OSVersion.ToString(), "Dealer", "0.1");
            for(var i = 0; i < 50; i++)
            {
                var tradeblk = (await lc.GetLastBlockAsync(tradeid)).As<IOtcTrade>();
                if(tradeblk.OTStatus == OTCTradeStatus.Open)
                {
                    await Task.Delay(100);
                    continue;
                }

                await CommandStatus(tradeid, input);

                var room = await _db.GetRoomByTradeAsync(tradeid);
                foreach (var user in room.Members)
                    await PinMessageAsync(tradeblk, user.AccountId);

                return;
            }

            var msg = $"Dealer can't confirm FiAT send. Please try again.";
            await SendResponseToRoomAsync(tradeid, Consts.DEALER_ACCOUNTID, msg);
        }

        private async Task CommandStatus(string tradeid, string input)
        {
            var lc = LyraRestClient.Create(_db.NetworkId, Environment.OSVersion.ToString(), "Dealer", "0.1");
            var tradeblk = (await lc.GetLastBlockAsync(tradeid)).As<IOtcTrade>();
            var fiat = $"{tradeblk.Trade.fiat} {tradeblk.Trade.price * tradeblk.Trade.amount:N2}";
            var next = tradeblk.OTStatus switch
            {
                OTCTradeStatus.Open => $"Buyer send {fiat} to seller",
                OTCTradeStatus.FiatSent => $"Seller confirm receive of payment {fiat}",
                OTCTradeStatus.FiatReceived => $"Seller release Crypto {tradeblk.Trade.amount} {tradeblk.Trade.crypto} to buyer",
                OTCTradeStatus.CryptoReleased => "None",
                OTCTradeStatus.Closed => "Trade closed. Nothing to do",
                OTCTradeStatus.Dispute => "Arbitration",
                _ => throw new NotImplementedException(),
            };
            var msg = $"Current status of trade: {tradeblk.OTStatus}. Next step: {next}";

            await SendResponseToRoomAsync(tradeid, Consts.DEALER_ACCOUNTID, msg);
        }

        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            return base.OnDisconnectedAsync(exception);
        }

        public async Task Chat(ChatMessage msg)
        {
            if(Signatures.VerifyAccountSignature(msg.Text, msg.AccountId, msg.Signature))
            {
                _buffer.Post(msg);
                await ConsumeAsync(_buffer);
            }
            else
            {
                Console.WriteLine("Message signature verify failed.");
            }
        }

        public async Task<JoinRoomResponse> JoinRoom(JoinRoomRequest req)
        {
            // verify the signature
            var ok = Signatures.VerifyAccountSignature(req.TradeID, req.UserAccountID, req.Signature);
            if (ok)
            {
                // check if the client belongs to the room
                // account id should be either buyer or seller
                var lc = LyraRestClient.Create(_db.NetworkId, Environment.OSVersion.ToString(), "Dealer", "0.1");
                var tradeblk = (await lc.GetLastBlockAsync(req.TradeID)).As<IOtcTrade>();

                if (tradeblk?.OwnerAccountId == req.UserAccountID
                    || tradeblk?.Trade.orderOwnerId == req.UserAccountID)
                {
                    // in database, one dealer room per trade.
                    var seller = await _db.GetUserByAccountIdAsync(tradeblk.Trade.orderOwnerId);
                    var buyer = await _db.GetUserByAccountIdAsync(tradeblk.OwnerAccountId);

                    var room = await _db.GetRoomByTradeAsync(req.TradeID);
                    if (room == null)
                    {
                        if (seller != null && buyer != null)
                        {
                            var crroom = new TxRoom
                            {
                                TradeId = ((TransactionBlock)tradeblk).AccountID,
                                Members = new[] { seller, buyer },
                            };
                            await _db.CreateRoomAsync(crroom);
                        }
                    }
                    room = await _db.GetRoomByTradeAsync(req.TradeID);

                    if (room != null)
                    {
                        // join the group
                        await Groups.AddToGroupAsync(Context.ConnectionId, req.TradeID);
                        await Groups.AddToGroupAsync(Context.ConnectionId, req.UserAccountID);

                        // pin a message
                        await PinMessageAsync(tradeblk, req.UserAccountID);

                        var txmsgs = await _db.GetTxRecordsByTradeAsync(req.TradeID);
                        var dict = new Dictionary<string, string>()
                        {
                            { seller.AccountId, seller.UserName },
                            { buyer.AccountId, buyer.UserName },
                            { Consts.DEALER_ACCOUNTID, "Dealer" },
                        };
                        return new JoinRoomResponse
                        {                            
                            ResultCode = APIResultCodes.Success,
                            History = txmsgs.Select(msg =>
                                new RespMessage
                                {
                                    UserName = dict[msg.AccountId],
                                    Text = (msg as TxMessage).Text,
                                }
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

        private async Task PinMessageAsync(IOtcTrade tradeblk, string accountId)
        {
            PinnedMessage pinned;
            if(accountId == tradeblk.OwnerAccountId)    // buyer
            {
                var fiat = $"{tradeblk.Trade.fiat} {tradeblk.Trade.price * tradeblk.Trade.amount:N2}";
                var next = tradeblk.OTStatus switch
                {
                    OTCTradeStatus.Open => (PinnedMode.Action, $"Pay {fiat} to seller"),
                    OTCTradeStatus.FiatSent => (PinnedMode.Wait, $"Seller confirm receive of payment {fiat}"),
                    OTCTradeStatus.FiatReceived => (PinnedMode.Wait, $"Dealer release Crypto {tradeblk.Trade.amount} {tradeblk.Trade.crypto} to buyer"),
                    OTCTradeStatus.CryptoReleased => (PinnedMode.Notify, "Trade completed successfully!"),
                    OTCTradeStatus.Closed => (PinnedMode.Notify, "Trade closed. Nothing to do"),
                    OTCTradeStatus.Dispute => (PinnedMode.Wait, "Arbitration"),
                    _ => throw new NotImplementedException(),
                };

                pinned = new PinnedMessage
                {
                    Mode = next.Item1,
                    Text = next.Item2,
                    TradeId = (tradeblk as TransactionBlock).AccountID,
                };
            }
            else    // seller
            {
                var fiat = $"{tradeblk.Trade.fiat} {tradeblk.Trade.price * tradeblk.Trade.amount:N2}";
                var next = tradeblk.OTStatus switch
                {
                    OTCTradeStatus.Open => (PinnedMode.Wait, $"Buyer pay {fiat} to me"),
                    OTCTradeStatus.FiatSent => (PinnedMode.Action, $"Confirm receive of payment {fiat}"),
                    OTCTradeStatus.FiatReceived => (PinnedMode.Wait, $"Dealer release Crypto {tradeblk.Trade.amount} {tradeblk.Trade.crypto} to buyer"),
                    OTCTradeStatus.CryptoReleased => (PinnedMode.Notify, "Trade completed successfully!"),
                    OTCTradeStatus.Closed => (PinnedMode.Notify, "Trade closed. Nothing to do"),
                    OTCTradeStatus.Dispute => (PinnedMode.Wait, "Arbitration"),
                    _ => throw new NotImplementedException(),
                };

                pinned = new PinnedMessage
                {
                    Mode = next.Item1,
                    Text = next.Item2,
                    TradeId = (tradeblk as TransactionBlock).AccountID,
                };
            }

            await Clients.Group(accountId).OnPinned(pinned);
            //await _hubContext.Clients.Group(accountId).SendAsync("OnPinned", pinned);
        }

        public async Task Join(JoinRequest req)
        {
            var ok = Signatures.VerifyAccountSignature(req.UserAccountID, req.UserAccountID, req.Signature);
            if(ok)
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, req.UserAccountID);
            }
        }
    }
}
