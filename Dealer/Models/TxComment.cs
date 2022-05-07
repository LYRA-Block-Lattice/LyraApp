using Lyra.Core.Blocks;
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
    /// Comment for trade
    /// </summary>
    public class TxComment : CommentConfig
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        // for a better index/query performance
        public string DaoId { get; set; }
        public string OrderId { get; set; }
        public string SellerId { get; set; }
        public string BuyerId { get; set; }
    }

    public class TxCommentLike
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        /// <summary>
        /// mongodb ID of the comment
        /// </summary>
        public string CommentId { get; set; }
        public string TradeId { get; set; }
        public string LikedByAccountId { get; set; }
        public DateTime Created { get; set; }

        // do we need a signature? too serious for a like?
    }

    public class TxCommentReport
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        /// <summary>
        /// mongodb ID of the comment
        /// </summary>
        public string CommentId { get; set; }
        public string TradeId { get; set; }
        public string ReportedByAccountId { get; set; }
        public DateTime Created { get; set; }

        public string Content { get; set; }
        /// <summary>
        /// hash input format: account id | comment id | date | enc(content)
        /// </summary>
        public string Signature { get; set; }
    }
}
