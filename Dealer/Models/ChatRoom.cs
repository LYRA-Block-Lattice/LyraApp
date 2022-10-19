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
    /// A general purpose chat room
    /// </summary>
    public class ChatRoom
    {
        [BsonId(IdGenerator = typeof(StringObjectIdGenerator))]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        // UTC time of created
        public DateTime TimeStamp { get; set; }

        // add full user document as a snapshot
        public LyraUser[] Members { get; set; }
    }
}
