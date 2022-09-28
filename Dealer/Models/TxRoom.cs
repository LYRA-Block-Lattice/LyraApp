using Dealer.Server.Models;
using Lyra.Data.API.ODR;
using Lyra.Data.API.WorkFlow;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;
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
        [BsonId(IdGenerator = typeof(StringObjectIdGenerator))]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string TradeId { get; set; } = null!;
        public TradeDirection Dir { get; set; }

        // UTC time of created
        public DateTime TimeStamp { get; set; }

        // add full user document as a snapshot
        public LyraUser[] Members { get; set; }

        public bool IsCancelable { get; set; }

        public DisputeLevels DisputeLevel {get; set; }

        public List<DisputeCase?> DisputeHistory { get; set; } = null!;
        public List<ResolutionContainer>? ResolutionHistory { get; set; }

        public DisputeLevels NextLevel => (DisputeLevels)((int)DisputeLevel + 1);
        public DisputeLevels PrevLevel => (DisputeLevels)((int)DisputeLevel - 1);

        public void AddComplain(DisputeCase disp)
        {
            if(DisputeHistory == null)
                DisputeHistory = new List<DisputeCase?>();

            DisputeHistory.Add(disp);
        }
    }
}
