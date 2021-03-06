using Lyra.Data.API.ODR;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lyra.Data.API.Identity
{
    /// <summary>
    /// SignalR group for the transaction. Uniqe for every transacton.
    /// </summary>
    public class TxRoom
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string TradeId { get; set; } = null!;

        // UTC time of created
        public DateTime TimeStamp { get; set; }

        // add full user document as a snapshot
        public LyraUser[] Members { get; set; }

        [JsonIgnore]
        [BsonIgnore]
        public DisputeLevels DisputeLevel => DisputeHistory == null ? DisputeLevels.None : (DisputeLevels)DisputeHistory.Count;

        public List<DisputeCase>? DisputeHistory { get; set; }

        public void Claim(DisputeCase hist)
        {
            if(DisputeHistory == null)
                DisputeHistory = new List<DisputeCase>();

            DisputeHistory.Add(hist);
        }
    }
}
