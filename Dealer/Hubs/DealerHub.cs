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
            _ = Task.Run(async () => await ConsumeAsync(_buffer));
        }

        public async Task ConsumeAsync(ISourceBlock<ChatMessage> source)
        {
            while (await source.OutputAvailableAsync())
            {
                var msg = await source.ReceiveAsync();
                // save history
                var room = await _db.GetRoomByTradeAsync(msg.TradeId);
                if (room.Members.Any(a => a.AccountId == msg.AccountId))
                {
                    var prevMsgs = await _db.GetTxRecordsByTradeAsync(room.TradeId);
                    var txmsg = new TxMessage
                    {
                        TradeID = room.TradeId,
                        AccountId = msg.AccountId,

                        Text = msg.Text,
                    };

                    TxRecord last = null;
                    if (prevMsgs.Count() > 0)
                        last = prevMsgs.Last();

                    txmsg.Initialize(last, Consts.DEALER_KEY, Consts.DEALER_ACCOUNTID);
                    await _db.CreateTxRecordAsync(txmsg);

                    msg.Hash = txmsg.Hash;

                    await _hubContext.Clients.All.SendAsync("OnChat", msg);
                }
                else
                {
                    Console.WriteLine("Not permited to chat.");
                }
            }
        }

        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
        }

        public async Task Chat(ChatMessage msg)
        {
            _buffer.Post(msg);
        }

        //public async Task<BarResult> InvokeBar(double number, double cost)
        //{
        //    var bar = new BarData { Number = number, Cost = cost };
        //    await Clients.All.OnBar(Context.UserIdentifier, bar);

        //    return new BarResult { Id = "Some Id" };
        //}

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
                    var room = await _db.GetRoomByTradeAsync(req.TradeID);
                    if (room == null)
                    {
                        var seller = await _db.GetUserByAccountIdAsync(tradeblk.Trade.orderOwnerId);
                        var buyer = await _db.GetUserByAccountIdAsync(tradeblk.OwnerAccountId);

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
                        return new JoinRoomResponse
                        {
                            ResultCode = APIResultCodes.Success,
#pragma warning disable CS8601 // Possible null reference assignment.
                            RoomId = room.Id,
#pragma warning restore CS8601 // Possible null reference assignment.
                        };
                    }
                }
            }

            return new JoinRoomResponse
            {
                ResultCode = APIResultCodes.DealerRoomNotExists,
            };
        }
    }
}
