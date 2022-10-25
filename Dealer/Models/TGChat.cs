using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;

namespace Dealer.Server.Models
{
    public class TGChat
    {
        [BsonId(IdGenerator = typeof(StringObjectIdGenerator))]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonIgnoreIfDefault]
        public string? Id { get; set; }

        public long ChatID { get; set; }
        public string Username { get; set; }
        public int VerifyCode { get; set; }
        public string AssociatedAccountID { get; set; }

        // UI -> send hello to dealer telegram bot
        // user -> hello -> bot -> your verify code is 111333
        // or bot -> account is already associated with wallet L....., send disa to disassociate.
        // user -> UI -> telegram verify code is 111333
        // controller -> register req -> verify telegram verification code against database
    }
}
