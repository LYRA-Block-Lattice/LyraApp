using Lyra.Data.API.ODR;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lyra.Data.API.Identity
{
    /// <summary>
    /// None -> Peer: any time
    /// Peer -> DAO: 24 hours
    /// DAO -> Lyra Council: 4 days
    /// 
    /// Peer Level: peer must response within 12 hours or will be fine 10% of lost.
    /// DAO Level: Dao owner must response within 2 days or will be fine 20% of lost.
    /// Council Level: The Council must response within 5 days or will be fine 100% of lost.
    /// </summary>
    public enum DisputeLevels { None, Peer, DAO, LyraCouncil }
    /// <summary>
    /// SignalR group for the transaction. Uniqe for every transacton.
    /// </summary>
    public class TxRoom
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string TradeId { get; set; } = null!;

        // add full user document as a snapshot
        public LyraUser[] Members { get; set; }

        // dispute
        public DisputeLevels DisputeLevel { get; set; }

        public List<DisputeRaiseHistory> DisputeHistory { get; set; }

        public void Claim(DisputeRaiseHistory hist)
        {
            if(DisputeHistory == null)
                DisputeHistory = new List<DisputeRaiseHistory>();

            DisputeHistory.Add(hist);
            DisputeLevel = (DisputeLevels)((int)DisputeLevel + 1);
        }
    }

    /// <summary>
    /// lost is calculated in LYR
    /// </summary>
    public class DisputeRaiseHistory
    {
        // plaintiff
        public string DisputeRaisedBy { get; set; }
        public DateTime DisputeRaisedTime { get; set; }

        public decimal ClaimedLost { get; set; }

        // defendant
        public bool PeerAcceptance { get; set; }
        public DateTime PeerAcceptanceTime { get; set; }   
        
        // mediator
        public string MediatorID { get; set; }
        public ODRResolution Resolution { get; set; }
        public DateTime ResolutionTime { get; set; }

        // final result
        public bool AcceptanceByPlaintiff { get; set; }
        public DateTime AcceptanceTimeByPlaintiff { get; set; }

        public bool AcceptanceByDefendant { get; set; }
        public DateTime AcceptanceTimeByDefendant { get; set; }
    }
}
