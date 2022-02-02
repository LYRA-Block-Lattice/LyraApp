using Dealer.Server.Services;
using Lyra.Core.API;
using Lyra.Core.Blocks;
using Lyra.Data.API.Identity;
using Lyra.Data.API.WorkFlow;
using Lyra.Data.Crypto;
using Microsoft.AspNetCore.SignalR;
using UserLibrary.Data;

namespace Dealer.Server.Hubs
{
    // inherit Hub<T>, where T is your interface defining the messages
    // client call this
    public class DealerHub : Hub<IHubPushMethods>, IHubInvokeMethods
    {
        DealerDb _db;
        public DealerHub(DealerDb db)
        {
            _db = db;
        }

        public async Task GetHistory(string connectionId)
        {
            // Get the history from our pretend database
            List<string> history = new List<string> { "This is chat history", "line 1", "line 2" }; //await _db.GetHistory();

            // Send the history to the client
            foreach (var hist in history)
            {
                var foo = new FooData { FooPayload = hist };
                await Clients.Client(connectionId).OnFoo(foo);
            }
        }

        public override async Task OnConnectedAsync()
        {
            await GetHistory(Context.ConnectionId);
            await base.OnConnectedAsync();
        }

        public async Task InvokeFoo(string payload)
        {
            var foo = new FooData { FooPayload = payload };
            await Clients.All.OnFoo(foo);
        }

        public async Task<BarResult> InvokeBar(double number, double cost)
        {
            var bar = new BarData { Number = number, Cost = cost };
            await Clients.All.OnBar(Context.UserIdentifier, bar);

            return new BarResult { Id = "Some Id" };
        }

        public async Task<APIResult> JoinRoom(JoinRoomRequest req)
        {
            // verify the signature
            var ok = Signatures.VerifyAccountSignature(req.TradeID, req.UserAccountID, req.Signature);
            if (ok)
            {
                // check if the client belongs to the room
                // account id should be either buyer or seller
                var lc = LyraRestClient.Create(_db.NetworkId, Environment.OSVersion.ToString(), "Dealer", "0.1");
                var traderet = await lc.GetLastBlockAsync(req.TradeID);
                if (traderet.Successful())
                {
                    var tradeblk = traderet.GetBlock() as IOtcTrade;
                    if (tradeblk != null && (
                        tradeblk.OwnerAccountId == req.UserAccountID
                        || tradeblk.Trade.orderOwnerId == req.UserAccountID))
                    {
                        // in database, one dealer room per trade.
                        var room = await _db.GetRoomByTradeAsync(req.TradeID);
                        if (room == null)
                        {
                            var seller = await _db.GetUserByAccountIdAsync(tradeblk.Trade.orderOwnerId);
                            var buyer = await _db.GetUserByAccountIdAsync(tradeblk.OwnerAccountId);

                            if(seller != null && buyer != null)
                            {
                                var crroom = new TxRoom
                                {
                                    TradeId = (tradeblk as TransactionBlock).AccountID,
                                    Members = new[] { seller, buyer },
                                };
                                await _db.CreateRoomAsync(crroom);
                            }
                        }
                        room = await _db.GetRoomByTradeAsync(req.TradeID);

                        if (room != null)
                        {
                            return new APIResult
                            {
                                ResultCode = APIResultCodes.Success
                            };
                        }
                    }
                }
            }

            return new APIResult
            {
                ResultCode = Lyra.Core.Blocks.APIResultCodes.DealerRoomNotExists,
            };
        }
    }
}
