using Converto;
using Dealer.Server.Hubs;
using Dealer.Server.Models;
using ImageMagick;
using Lyra.Core.API;
using Lyra.Core.Blocks;
using Lyra.Data.API;
using Lyra.Data.API.Identity;
using Lyra.Data.API.ODR;
using Lyra.Data.API.WorkFlow;
using Lyra.Data.Crypto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using Org.BouncyCastle.Tsp;
using System;
using System.Drawing;
using System.Security.Cryptography;
using System.Text;
using UserLibrary.Data;
using UserLibrary.Pages.Dealer;
using static MudBlazor.CategoryTypes;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Dealer.Server.Services
{
    [Route("api/[controller]")]
    [ApiController]
    public class DealerController : ControllerBase
    {
        private Keeper _keeper;
        private IConfiguration _config;
        private DealerDb _db;
        private IHubContext<DealerHub, IHubPushMethods> _hub;
        ILyraAPI _client;

        public DealerController(DealerDb db, IHubContext<DealerHub, IHubPushMethods> hub,
            IConfiguration Configuration, Keeper keeper, ILyraAPI client)
        {
            _db = db;
            _hub = hub;
            _config = Configuration;
            _keeper = keeper;
            _client = client;
        }

        [Route("GetBrief")]
        [HttpGet]
        public Task<SimpleJsonAPIResult> GetBriefAsync()
        {
            var brief = new DealerBrief
            {
                AccountId = Signatures.GetAccountIdFromPrivateKey(_config["DealerKey"]),
                TelegramBotUsername = _keeper.BotUserName
            };
            return Task.FromResult(SimpleJsonAPIResult.Create(brief));
        }

        [Route("GetPrices")]
        [HttpGet]
        public Task<SimpleJsonAPIResult> GetPricesAsync()
        {
            return Task.FromResult(SimpleJsonAPIResult.Create(_keeper.Prices));
        }

        [Route("GetFiat")]
        [HttpGet]
        public Task<SimpleJsonAPIResult> GetFiatAsync(string symbol)
        {
            return Task.FromResult(SimpleJsonAPIResult.Create(_keeper.GetFiat(symbol)));
        }

        [Route("GetUserByAccountId")]
        [HttpGet]
        public async Task<SimpleJsonAPIResult> GetUserByAccountIdAsync(string accountId)
        {
            var user = await _db.GetUserByAccountIdAsync(accountId);
            if (user == null)
                return new SimpleJsonAPIResult { ResultCode = Lyra.Core.Blocks.APIResultCodes.NotFound };

            var ret = await _client.GetOtcTradeStatsForUsersAsync(
                new TradeStatsReq { AccountIDs = new List<string> { accountId } }
                );

            var stat = new UserStats
            {
                AccountId = accountId,
                UserName = user.UserName,
                Total = 0,
                Ratio = 0
            };

            if (ret.Successful())
            {
                var tstat = ret.Deserialize<List<TradeStats>>();
                if (tstat.Count == 1)
                {
                    var ts = tstat.First();
                    stat.Total = ts.TotalTrades;
                    if (ts.TotalTrades > 0)
                        stat.Ratio = Math.Round((decimal)ts.FinishedCount / ts.TotalTrades, 4);
                }
            }

            return SimpleJsonAPIResult.Create(stat);
        }

        [Route("GetUserDetailsByAccountId")]
        [HttpGet]
        public async Task<SimpleJsonAPIResult> GetUserDetailsByAccountIdAsync(string accountId, string signature)
        {
            // validate signature
            var lsb = await _client.GetLastServiceBlockAsync();
            if (!Signatures.VerifyAccountSignature(lsb.GetBlock().Hash, accountId, signature))
                return new SimpleJsonAPIResult { ResultCode = Lyra.Core.Blocks.APIResultCodes.Unauthorized };

            var user = await _db.GetUserByAccountIdAsync(accountId);
            if (user == null)
                return new SimpleJsonAPIResult { ResultCode = Lyra.Core.Blocks.APIResultCodes.NotFound };

            return SimpleJsonAPIResult.Create(user);
        }

        [HttpGet]
        [Route("Register")]
        public async Task<APIResult> RegisterAsync(string accountId,
            string userName, string firstName, string? middleName, string lastName,
            string email, string mibilePhone, string? avatarId, string? telegramID, string signature)
        {
            // validate data
            if (userName.ToLower().Contains("dealer"))
                return new APIResult { ResultCode = Lyra.Core.Blocks.APIResultCodes.InvalidName };

            // validate signature
            var lsb = await _client.GetLastServiceBlockAsync();
            if (!Signatures.VerifyAccountSignature(lsb.GetBlock().Hash, accountId, signature))
                return new APIResult { ResultCode = Lyra.Core.Blocks.APIResultCodes.Unauthorized };

            var user = new LyraUser
            {
                UserName = userName,
                FirstName = firstName,
                MiddleName = middleName,
                LastName = lastName,
                Email = email,
                MobilePhone = mibilePhone,
                AvatarId = avatarId,
                AccountId = accountId,
                TelegramID = telegramID,
                RegistedTime = DateTime.UtcNow,
            };

            user.RegistedTime = DateTime.UtcNow;
            var usrx = await _db.GetUserByAccountIdAsync(user.AccountId);
            if (usrx == null)
                await _db.CreateUserAsync(user);
            else
            {
                user.Id = usrx.Id;
                await _db.UpdateUserAsync(user);
            }

            return APIResult.Success;
        }

        public class ImageModel
        {
            public IFormFile file { get; set; }
            public string accountId { get; set; }
            public string signature { get; set; }
            public string tradeId { get; set; }
        }

        [HttpPost]
        [Route("UploadFile")]
        public async Task<APIResult> UploadFileAsync([FromForm] ImageModel model)
        {
            //ImageModel model = new ImageModel();
            try
            {
                using (var ms = new MemoryStream())
                {
                    model.file.CopyTo(ms);
                    var bindata = ms.ToArray();
                    using (var img = new MagickImage(bindata))
                    {
                        using (var sha = SHA256.Create())
                        {
                            byte[] hash_bytes = sha.ComputeHash(bindata);
                            string hash = Base58Encoding.Encode(hash_bytes);

                            if (Signatures.VerifyAccountSignature(hash, model.accountId, model.signature))
                            {
                                // check image hash exists
                                if (null == await _db.GetImageDataByIdAsync(hash))
                                {
                                    var bin = new ImageData
                                    {
                                        FileName = model.file.FileName,
                                        Data = bindata,
                                        Format = img.Format.ToString(),
                                        Mime = $"image/{img.Format.ToString().ToLower()}",
                                        Hash = hash,
                                        TimeStamp = DateTime.UtcNow,
                                        TradeId = model.tradeId,
                                        OwnerAccountId = model.accountId,
                                    };
                                    await _db.CreateImageDataAsync(bin);
                                }

                                return new ImageUploadResult
                                {
                                    ResultCode = Lyra.Core.Blocks.APIResultCodes.Success,
                                    Hash = hash,
                                    Url = $"{_config["baseUrl"]}/api/dealer/img?hash={hash}",
                                };
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return new APIResult { ResultCode = Lyra.Core.Blocks.APIResultCodes.Exception, ResultMessage = ex.ToString() };
            }

            return new APIResult { ResultCode = Lyra.Core.Blocks.APIResultCodes.InvalidParameterFormat };
        }

        [Route("GetTradeBrief")]
        [HttpGet]
        public async Task<SimpleJsonAPIResult> GetTradeBriefAsync(string tradeId, string? accountId, string? signature)
        {
            // validate signature
            var lsb = await _client.GetLastServiceBlockAsync();
            var showRealName = Signatures.VerifyAccountSignature(lsb.GetBlock().Hash, accountId, signature);

            var trade = (await _client.GetLastBlockAsync(tradeId)).As<IOtcTrade>();
            if (trade == null)
                return new SimpleJsonAPIResult { ResultCode = Lyra.Core.Blocks.APIResultCodes.NotFound };

            var brief = await _db.GetTradeBriefImplAsync(trade, accountId, showRealName);
            if (brief == null)
                return new SimpleJsonAPIResult { ResultCode = Lyra.Core.Blocks.APIResultCodes.NotFound };

            return SimpleJsonAPIResult.Create(brief);
        }

        [HttpPost]
        [Route("CommentTrade")]
        public async Task<APIResult> CommentTradeAsync([FromBody] CommentConfig cfg)
        {
            if (cfg != null && cfg.VerifySignature(cfg.ByAccountId))
            {
                // comment should allow only once.
                var exists = await _db.FindTxCommentByAuthorAsync(cfg.TradeId, cfg.ByAccountId);
                if (exists == null)
                {
                    // then authorize the comment
                    // fill the index fields
                    var tradeblk = (await _client.GetLastBlockAsync(cfg.TradeId)).As<IOtcTrade>();
                    var orderblk = (await _client.GetLastBlockAsync(tradeblk.Trade.orderId)).As<IOtcOrder>();
                    if (tradeblk != null && orderblk != null)
                    {
                        var brief = await _db.GetTradeBriefImplAsync(tradeblk, cfg.ByAccountId, true);
                        if (brief.Members.Contains(cfg.ByAccountId))
                        {
                            // box/unbox to avoid string changed
                            cfg.Content = Encoding.UTF8.GetString(Convert.FromBase64String(cfg.EncContent));
                            cfg.Title = Encoding.UTF8.GetString(Convert.FromBase64String(cfg.EncTitle));

                            if (cfg.Rating > 0 && cfg.Rating < 6 && cfg.Confirm &&
                                cfg.Content.Length > 4 && cfg.Title.Length > 4 &&
                                cfg.Content.Length < 8192 && cfg.Title.Length < 1024 &&
                                cfg.Created < DateTime.UtcNow && cfg.Created.AddSeconds(20) > DateTime.UtcNow)
                            {
                                var comment = cfg.ConvertTo<TxComment>();

                                comment.DaoId = orderblk.Order.daoId;
                                comment.OrderId = tradeblk.Trade.orderId;
                                comment.SellerId = orderblk.OwnerAccountId;
                                comment.BuyerId = tradeblk.OwnerAccountId;

                                await _db.CreateTxCommentAsync(comment);

                                return new APIResult { ResultCode = Lyra.Core.Blocks.APIResultCodes.Success };
                            }

                            return new APIResult { ResultCode = Lyra.Core.Blocks.APIResultCodes.ArgumentOutOfRange };
                        }
                    }
                }
            }

            return new APIResult { ResultCode = Lyra.Core.Blocks.APIResultCodes.Unauthorized };
        }

        [HttpGet]
        [Route("GetCommentsForTrade")]
        public async Task<SimpleJsonAPIResult> GetCommentsForTradeAsync(string tradeId)
        {
            var cmnts = await _db.GetTxCommentsForTradeAsync(tradeId);
            var cmtcfgs = cmnts.Select(a => a.ConvertTo<CommentConfig>()).ToList();
            return new SimpleJsonAPIResult
            {
                ResultCode = Lyra.Core.Blocks.APIResultCodes.Success,
                JsonString = JsonConvert.SerializeObject(cmnts)
            };
        }

        [HttpGet]
        [Route("img")]
        public async Task<ActionResult> ViewAsync(string hash)
        {
            var image = await _db.GetImageDataByIdAsync(hash); //Pull image from the database.
            if (image == null)
                return NotFound();
            return File(image.Data, image.Mime);
        }

        [HttpPost]
        [Route("Complain")]
        public async Task<APIResult> ComplainAsync([FromBody] ComplaintClaim complaint)
        {
            if (complaint != null && complaint.VerifySignature(complaint.ownerId))
            {
                var tradeblk = (await _client.GetLastBlockAsync(complaint.tradeId)).As<IOtcTrade>();
                if (tradeblk == null)
                    return new APIResult { ResultCode = APIResultCodes.BlockNotFound };

                // check if images all exists
                foreach (var hash in complaint.imageHashes ?? Enumerable.Empty<string>())
                {
                    if (null == await _db.GetImageDataByIdAsync(hash))
                        return new APIResult
                        {
                            ResultCode = Lyra.Core.Blocks.APIResultCodes.InvalidOperation,
                            ResultMessage = "Image hash not found.",
                        };
                }

                // complain level by level
                if (complaint.level == DisputeLevels.Peer && (tradeblk.OTStatus == OTCTradeStatus.Dispute ||
                    tradeblk.OTStatus == OTCTradeStatus.DisputeClosed))
                {
                    return new APIResult
                    {
                        ResultCode = Lyra.Core.Blocks.APIResultCodes.InvalidOperation,
                        ResultMessage = "Inappropriate",
                    };
                }

                // get or create room
                var room = await _db.GetRoomByTradeAsync(tradeblk.AccountID);
                if (room == null)
                {
                    room = await _db.CreateRoomAsync(tradeblk);
                }

                if (room.DisputeLevel == complaint.level)
                {
                    if (room.DisputeHistory.Any(a => a.Complaint.level == complaint.level
                        && a.Complaint.ownerId == complaint.ownerId
                        && a.IsPending))   // don't allow same level of complain when pending one exists.
                    {
                        return new APIResult
                        {
                            ResultCode = Lyra.Core.Blocks.APIResultCodes.ResolutionPending,
                            ResultMessage = $"Complaint pending.",
                        };
                    }
                }
                else if (room.NextLevel != complaint.level)
                {
                    return new APIResult
                    {
                        ResultCode = Lyra.Core.Blocks.APIResultCodes.InvalidOperation,
                        ResultMessage = $"Please submit complaint level {room.DisputeLevel} first.",
                    };
                }

                if (complaint.level == DisputeLevels.DAO
                    && tradeblk.OTStatus != OTCTradeStatus.Dispute
                    && tradeblk.OTStatus != OTCTradeStatus.DisputeClosed)
                {
                    // change state of trade
                    var ret = await _keeper.DealerWallet.OTCTradeRaiseDisputeAsync(tradeblk.AccountID);
                    if (!ret.Successful())
                    {
                        return new APIResult
                        {
                            ResultCode = Lyra.Core.Blocks.APIResultCodes.UndefinedError,
                            ResultMessage = $"Error change state of trade by dealer: {ret.ResultCode}",
                        };
                    }
                }

                DisputeCase dispute = complaint.level switch
                {
                    DisputeLevels.Peer => new DisputeCase
                    {
                        Id = room.DisputeHistory?.Count + 1 ?? 1,
                        RaisedTime = DateTime.UtcNow,
                        Complaint = complaint,
                    },
                    DisputeLevels.DAO => new DaoDisputeCase
                    {
                        Id = room.DisputeHistory?.Count + 1 ?? 1,
                        RaisedTime = DateTime.UtcNow,
                        Complaint = complaint,
                    },
                    DisputeLevels.LyraCouncil => new CouncilDisputeCase
                    {
                        Id = room.DisputeHistory?.Count + 1 ?? 1,
                        RaisedTime = DateTime.UtcNow,
                        Complaint = complaint,
                    },
                    _ => throw new NotImplementedException()
                };

                room.DisputeLevel = dispute.Complaint.level;
                room.AddComplain(dispute);
                await _db.UpdateRoomAsync(room.Id, room);

                // notify all client UI via hub
                await NotifyTradeesInRoomAsync(room, tradeblk);
                
                string from = complaint.role.ToString();

                ///*about lost of {dispute.ClaimedLost} LYR*/
                var text = $"{from} issued a complaint. Please be noted. ";
                return new APIResult
                {
                    ResultCode = Lyra.Core.Blocks.APIResultCodes.Success,
                    ResultMessage = text
                };
            }

            return new APIResult { ResultCode = Lyra.Core.Blocks.APIResultCodes.Unauthorized };
        }

        [HttpPost]
        [Route("ComplainReply")]
        public async Task<APIResult> ComplainReplyAsync([FromBody] ComplaintReply reply)
        {
            if (reply != null && reply.VerifySignature(reply.ownerId))
            {
                var tradeblk = (await _client.GetLastBlockAsync(reply.tradeId)).As<IOtcTrade>();
                if (tradeblk == null)
                    return new APIResult { ResultCode = APIResultCodes.BlockNotFound };

                // check if images all exists
                foreach (var hash in reply.imageHashes ?? Enumerable.Empty<string>())
                {
                    if (null == await _db.GetImageDataByIdAsync(hash))
                        return new APIResult
                        {
                            ResultCode = Lyra.Core.Blocks.APIResultCodes.InvalidOperation,
                            ResultMessage = "Image hash not found.",
                        };
                }

                // get or create room
                var room = await _db.GetRoomByTradeAsync(tradeblk.AccountID);
                if (room == null)
                {
                    return new APIResult
                    {
                        ResultCode = Lyra.Core.Blocks.APIResultCodes.InvalidOperation,
                        ResultMessage = "Trading room not found",
                    };
                }

                var dispute = room.DisputeHistory.FirstOrDefault(a => a.Complaint.Hash == reply.complaintHash);
                if (dispute == null)
                {
                    return new APIResult
                    {
                        ResultCode = Lyra.Core.Blocks.APIResultCodes.InvalidOperation,
                        ResultMessage = "Complaint not found",
                    };
                }

                // reply must be from either seller or buyer

                if (dispute is DisputeCase ddc)
                {
                    (var c, var r) = ddc.GetRoles(tradeblk);
                    if (reply.ownerId != c && reply.ownerId != r)
                        return new APIResult { ResultCode = Lyra.Core.Blocks.APIResultCodes.Unauthorized };

                    if (ddc.Replies == null)
                        ddc.Replies = new List<ComplaintReply>();

                    if (ddc.Replies.Any(a => a.ownerId == reply.ownerId))
                    {
                        return new APIResult
                        {
                            ResultCode = Lyra.Core.Blocks.APIResultCodes.InvalidOperation,
                            ResultMessage = "Already replied.",
                        };
                    }

                    ddc.Replies.Add(reply);
                }

                // do withdraw if the reply is from complaint's owner
                if (dispute.Complaint.ownerId == reply.ownerId)
                {
                    if (dispute.IsPending && reply.response == ComplaintResponse.OwnerWithdraw)
                    {
                        dispute.State = DisputeNegotiationStates.PlaintiffWithdraw;
                    }

                    var lastcase = room.DisputeHistory
                                        .Where(a => a.IsPending)
                                        .OrderBy(a => a.Complaint.created)
                                        .LastOrDefault();
                    if (lastcase != null)
                        room.DisputeLevel = lastcase.Complaint.level;
                    else
                        room.DisputeLevel = DisputeLevels.None;

                    await _db.UpdateRoomAsync(room.Id, room);
                }
                else if (dispute.Complaint.request == ComplaintRequest.CancelTrade)
                {
                    // do cancel if both agreed
                    if (reply.response == ComplaintResponse.AgreeToCancel)
                    {
                        dispute.State = DisputeNegotiationStates.AcceptanceConfirmed;
                        room.DisputeLevel = DisputeLevels.None;
                        room.IsCancelable = true;
                        await _db.UpdateRoomAsync(room.Id, room);

                        // dealer cancel the trade
                        var ret = await _keeper.DealerWallet.CancelOTCTradeAsync(tradeblk.Trade.daoId, tradeblk.Trade.orderId, tradeblk.AccountID);
                        if (!ret.Successful())
                        {
                            return new APIResult
                            {
                                ResultCode = Lyra.Core.Blocks.APIResultCodes.UndefinedError,
                                ResultMessage = $"Error cancel trade by dealer: {ret.ResultCode}",
                            };
                        }
                    }
                    else if (reply.response == ComplaintResponse.RefuseToCancel)
                    {
                        dispute.State = DisputeNegotiationStates.AcceptanceConfirmed;
                        room.IsCancelable = false;
                        await _db.UpdateRoomAsync(room.Id, room);
                    }
                    else
                    {
                        return new APIResult
                        {
                            ResultCode = Lyra.Core.Blocks.APIResultCodes.InvalidOperation,
                            ResultMessage = "Only allow to agree cancel or not.",
                        };
                    }
                }

                // notify all client UI via hub
                await NotifyTradeesInRoomAsync(room, tradeblk);

                ///*about lost of {dispute.ClaimedLost} LYR*/
                var text = $"Reply was recorded.";
                return new APIResult
                {
                    ResultCode = Lyra.Core.Blocks.APIResultCodes.Success,
                    ResultMessage = text
                };
            }

            return new APIResult { ResultCode = Lyra.Core.Blocks.APIResultCodes.Unauthorized };
        }

        /// <summary>
        /// several complaint -> one resolution -> several response 
        /// </summary>
        /// <param name="resolution"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("SubmitResolution")]
        public async Task<APIResult> SubmitResolutionAsync([FromBody] ODRResolution resolution, string voteid)
        {
            if (resolution != null && resolution.VerifySignature(resolution.Creator))
            {
                // verify the trade
                var trade = (await _client.GetLastBlockAsync(resolution.TradeId)).As<IOtcTrade>();
                if (trade == null)
                    return new APIResult { ResultCode = APIResultCodes.NotFound };

                // get dealer room
                var room = await _db.GetRoomByTradeAsync(resolution.TradeId);
                if (room == null)
                {
                    return new APIResult
                    {
                        ResultCode = APIResultCodes.InvalidOperation,
                        ResultMessage = "Inappropriate",
                    };
                }

                //var dispute = room.DisputeHistory.FirstOrDefault(a => 
                //    a.Complaint.Hash == resolution.ComplaintHash)
                //    as DaoDisputeCase;

                // only dao owner can submit resolution for dao dispute
                // and only lord can submit resolution for lyra council
                var dao = (await _client.GetLastBlockAsync(trade.Trade.daoId)).As<IDao>();
                if (resolution.Creator != dao.OwnerAccountId)
                {
                    return new APIResult
                    {
                        ResultCode = Lyra.Core.Blocks.APIResultCodes.Unauthorized,
                        ResultMessage = "Not DAO's Owner"
                    };
                }

                //// check pending resolution
                //if (room.Rounds != null && room.Rounds.Any(a => a.TradeId == trade.AccountID && !a.Finished))
                //    return new APIResult { ResultCode = APIResultCodes.ResolutionPending };

                //resolution.Id = room.ResolutionHistory?.Count + 1 ?? 1;
                //room.AddResolution(resolution);

                //var prnew = new ODRNegotiationRound
                //{
                //    Id = room.Rounds?.Count + 1 ?? 1,
                //    Timestamp = DateTime.UtcNow,
                //    LastUpdateTime = DateTime.UtcNow,

                //    TradeId = trade.AccountID,
                //    CaseId = resolution.CaseId,
                //    ResolutionId = resolution.Id,

                //    State = ODRNegotiationStatus.NewlyCreated,
                //};

                //room.AddNegotiationRound(prnew);
                //dispute.Resolution = resolution;
                //dispute.VoteId = voteid;

                if (room.ResolutionHistory == null)
                    room.ResolutionHistory = new List<ResolutionContainer>();

                room.ResolutionHistory.Add(
                    new ResolutionContainer
                    {
                        Resolution = resolution,
                        VoteId = voteid,
                        Status = ResolutionStatus.Pending,
                        Replies = new List<AnswerToResolution>()
                    }
                    );
                await _db.UpdateRoomAsync(room!.Id!, room);

                // notify all client UI via hub
                await NotifyTradeesInRoomAsync(room, trade);

                return APIResult.Success;
            }

            return new APIResult { ResultCode = Lyra.Core.Blocks.APIResultCodes.Unauthorized };
        }

        [HttpPost]
        [Route("ResolutionReply")]
        public async Task<APIResult> ResolutionReplyAsync([FromBody] AnswerToResolution reply)
        {
            if (reply == null || !reply.VerifySignature(reply.ownerId))
                return new APIResult { ResultCode = Lyra.Core.Blocks.APIResultCodes.Unauthorized };

            // verify the trade
            var trade = (await _client.GetLastBlockAsync(reply.tradeId)).As<IOtcTrade>();
            if (trade == null)
                return new APIResult { ResultCode = APIResultCodes.NotFound };

            // get dealer room
            var room = await _db.GetRoomByTradeAsync(reply.tradeId);
            if (room == null)
            {
                return new APIResult
                {
                    ResultCode = APIResultCodes.InvalidOperation,
                    ResultMessage = "No trading room",
                };
            }

            var oc = room.ResolutionHistory.FirstOrDefault(a => a.Resolution.Hash == reply.resolutionHash);
            if (oc == null)
            {
                return new APIResult
                {
                    ResultCode = APIResultCodes.NotFound,
                    ResultMessage = "No such resolution",
                };
            }

            if (oc.Replies == null)
                oc.Replies = new List<AnswerToResolution>();

            if (oc.Replies.Any(a => a.ownerId == reply.ownerId))
                return new APIResult
                {
                    ResultCode = APIResultCodes.InvalidOperation,
                    ResultMessage = "Duplicate answer to resolution.",
                };

            if (!room.Members.Any(a => a.AccountId == reply.ownerId))
                return new APIResult
                {
                    ResultCode = APIResultCodes.Unauthorized,
                    ResultMessage = "Not authorized to answer to resolution.",
                };

            oc.Replies.Add(reply);
            await _db.UpdateRoomAsync(room.Id, room);

            // TODO: the execution should be in keeper. just signal it
            //two agree and the resolution will be executed.
            // execute DAO resolution if both agree
            if (room.DisputeLevel == DisputeLevels.DAO && oc.Replies.Count(a => a.agreeToResolution) == room.Members.Length)
            {
                // change state of trade
                var ret = await _keeper.DealerWallet.ExecuteResolution(oc.VoteId, oc.Resolution);
                if (!ret.Successful())
                {
                    return new APIResult
                    {
                        ResultCode = ret.ResultCode,
                        ResultMessage = $"Unable to execute resolution: {ret.ResultMessage}",
                    };
                }
            }

            // notify all client UI via hub
            await NotifyTradeesInRoomAsync(room, trade);

            return new APIResult { ResultCode = Lyra.Core.Blocks.APIResultCodes.Success };
        }

        private async Task NotifyTradeesInRoomAsync(TxRoom room, IOtcTrade trade)
        {
            foreach (var act in room.Members)
                await ChatServer.PinMessageAsync(_db, _hub.Clients, trade, act.AccountId);
        }
    }
}
