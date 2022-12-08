using Dealer.Server.Services;
using Lyra.Core.Blocks;
using Lyra.Data.API.Identity;
using Lyra.Data.API.WorkFlow;
using Lyra.Data.API.WorkFlow.UniMarket;
using Microsoft.AspNetCore.SignalR;
using UserLibrary.Data;

namespace Dealer.Server.Hubs
{
    public class ChatServer
    {
        public static async Task PinMessageAsync(DealerDb _db, IHubClients<IHubPushMethods> Clients, IUniTrade tradeblk, string accountId)
        {
            var room = await _db.GetRoomByTradeAsync((tradeblk as TransactionBlock).AccountID);
            PinnedMessage pinned;

            var brief = await _db.GetTradeBriefImplAsync(tradeblk, accountId, true);

            // special treatment for peer level dispute
            if (brief.DisputeLevel == DisputeLevels.Peer)
            {
                var peerHasComplaint = brief.GetDisputeHistory().Any(a => a.IsPending && a.Complaint.ownerId != accountId);
                pinned = new PinnedMessage
                {
                    Mode = peerHasComplaint ? PinnedMode.Action : PinnedMode.Wait,
                    Text = peerHasComplaint ? "Please try to reply peer's complaint." : "Please wait for peer's reply to your complaint.",
                    TradeId = (tradeblk as TransactionBlock).AccountID,
                    Level = room.DisputeLevel,
                };
            }
            else
            {
                if (accountId == tradeblk.Trade.orderOwnerId)
                // buyer
                {
                    var fiat = $"{tradeblk.Trade.biding} {tradeblk.Trade.pay:N2}";
                    var next = tradeblk.UTStatus switch
                    {
                        UniTradeStatus.Open => (PinnedMode.Action, $"Pay {fiat} to seller."),
                        UniTradeStatus.Processing => (PinnedMode.Wait, $"Processing payment."),
                        //UniTradeStatus.FiatReceived => (PinnedMode.Wait, $"Dealer release Crypto {tradeblk.Trade.amount} {tradeblk.Trade.crypto} to buyer."),
                        //UniTradeStatus.CryptoReleased => (PinnedMode.Notify, "Trade completed successfully!"),
                        UniTradeStatus.Closed => (PinnedMode.Notify, "Trade closed. Nothing to do."),
                        UniTradeStatus.Canceled => (PinnedMode.Notify, "Trade canceled. Nothing to do."),
                        UniTradeStatus.Dispute => (PinnedMode.Wait, "Arbitration"),
                        UniTradeStatus.DisputeClosed => (PinnedMode.Notify, "Dispute resolved and trade closed. Nothing to do."),
                        _ => throw new NotImplementedException(),
                    };
                    pinned = new PinnedMessage
                    {
                        Mode = next.Item1,
                        Text = next.Item2,
                        TradeId = (tradeblk as TransactionBlock).AccountID,
                        Level = room.DisputeLevel,
                    };
                }
                else    // seller
                {
                    var fiat = $"{tradeblk.Trade.biding} {tradeblk.Trade.price * tradeblk.Trade.amount:N2}";
                    var next = tradeblk.UTStatus switch
                    {
                        UniTradeStatus.Open => (PinnedMode.Wait, $"Buyer pay {fiat} to me."),
                        UniTradeStatus.Processing => (PinnedMode.Wait, $"Processing payment."),
                        //UniTradeStatus.FiatReceived => (PinnedMode.Wait, $"Dealer release Crypto {tradeblk.Trade.amount} {tradeblk.Trade.crypto} to buyer."),
                        //UniTradeStatus.CryptoReleased => (PinnedMode.Notify, "Trade completed successfully!"),
                        UniTradeStatus.Closed => (PinnedMode.Notify, "Trade closed. Nothing to do."),
                        UniTradeStatus.Canceled => (PinnedMode.Notify, "Trade canceled. Nothing to do."),
                        UniTradeStatus.Dispute => (PinnedMode.Wait, "Arbitration"),
                        UniTradeStatus.DisputeClosed => (PinnedMode.Notify, "Dispute resolved and trade closed. Nothing to do."),
                        _ => throw new NotImplementedException(),
                    };

                    pinned = new PinnedMessage
                    {
                        Mode = next.Item1,
                        Text = next.Item2,
                        TradeId = (tradeblk as TransactionBlock).AccountID,
                        Level = room.DisputeLevel,
                    };
                }
            }

            var x = Clients.Group(tradeblk.AccountID);
            await Clients.Group(tradeblk.AccountID).OnPinned(pinned);
        }
    }
}
