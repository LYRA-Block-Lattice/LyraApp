using Dealer.Server.Services;
using Lyra.Core.Blocks;
using Lyra.Data.API.Identity;
using Lyra.Data.API.WorkFlow;
using Microsoft.AspNetCore.SignalR;
using UserLibrary.Data;

namespace Dealer.Server.Hubs
{
    public class ChatServer
    {
        public static async Task PinMessageAsync(DealerDb _db, IHubClients<IHubPushMethods> Clients, IOtcTrade tradeblk, string accountId)
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
                if ((tradeblk.Trade.dir == TradeDirection.Buy && accountId == tradeblk.OwnerAccountId) ||
                    ((tradeblk.Trade.dir == TradeDirection.Sell && accountId == tradeblk.Trade.orderOwnerId)))
                // buyer
                {
                    var fiat = $"{tradeblk.Trade.fiat} {tradeblk.Trade.pay:N2}";
                    var next = tradeblk.OTStatus switch
                    {
                        OTCTradeStatus.Open => (PinnedMode.Action, $"Pay {fiat} to seller."),
                        OTCTradeStatus.FiatSent => (PinnedMode.Wait, $"Seller confirm receive of payment {fiat}."),
                        OTCTradeStatus.FiatReceived => (PinnedMode.Wait, $"Dealer release Crypto {tradeblk.Trade.amount} {tradeblk.Trade.crypto} to buyer."),
                        OTCTradeStatus.CryptoReleased => (PinnedMode.Notify, "Trade completed successfully!"),
                        OTCTradeStatus.Closed => (PinnedMode.Notify, "Trade closed. Nothing to do."),
                        OTCTradeStatus.Canceled => (PinnedMode.Notify, "Trade canceled. Nothing to do."),
                        OTCTradeStatus.Dispute => (PinnedMode.Wait, "Arbitration"),
                        OTCTradeStatus.DisputeClosed => (PinnedMode.Notify, "Dispute resolved and trade closed. Nothing to do."),
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
                    var fiat = $"{tradeblk.Trade.fiat} {tradeblk.Trade.price * tradeblk.Trade.amount:N2}";
                    var next = tradeblk.OTStatus switch
                    {
                        OTCTradeStatus.Open => (PinnedMode.Wait, $"Buyer pay {fiat} to me."),
                        OTCTradeStatus.FiatSent => (PinnedMode.Action, $"Confirm receive of payment {fiat}."),
                        OTCTradeStatus.FiatReceived => (PinnedMode.Wait, $"Dealer release Crypto {tradeblk.Trade.amount} {tradeblk.Trade.crypto} to buyer."),
                        OTCTradeStatus.CryptoReleased => (PinnedMode.Notify, "Trade completed successfully!"),
                        OTCTradeStatus.Closed => (PinnedMode.Notify, "Trade closed. Nothing to do."),
                        OTCTradeStatus.Canceled => (PinnedMode.Notify, "Trade canceled. Nothing to do."),
                        OTCTradeStatus.Dispute => (PinnedMode.Wait, "Arbitration"),
                        OTCTradeStatus.DisputeClosed => (PinnedMode.Notify, "Dispute resolved and trade closed. Nothing to do."),
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
