using Lyra.Data.API.Identity;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;

namespace Dealer.Server.Models
{
    public class TxUser
    {
        [BsonId(IdGenerator = typeof(StringObjectIdGenerator))]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonIgnoreIfDefault]
        public string? Id { get; set; }

        public LyraUser User { get; set; } = null!;

        public bool EmailVerified { get; set; }
        public bool TelegramVerified { get; set; }
    }
}
