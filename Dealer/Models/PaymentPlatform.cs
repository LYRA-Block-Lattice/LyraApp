using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Dealer.Server.Model
{
    public class PaymentPlatform
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("Name")]
        public string Name { get; set; } = null!;

        [BsonElement("Region")]
        public string? Region { get; set; }
    }
}
