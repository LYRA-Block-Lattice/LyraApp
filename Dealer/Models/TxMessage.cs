using BusinessLayer.Lib;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserLibrary.Data;

namespace Lyra.Data.API.Identity
{
    public class TxMessage : TxRecord
    {
        public override MessageTypes MessageType => MessageTypes.Text;

        public string Text { get; set; }

        public override string Print()
        {
            return base.Print() +
                "Text: " + Text;
        }

        protected override string GetExtraData()
        {
            return base.GetExtraData() +
                this.Text + "|";
        }
    }

    public class ImageData
    {
        public string FileName { get; set; } = null!;
        public byte[] Data { get; set; } = null!;
        public string Format { get; set; } = null!;
        public string Mime { get; set; } = null!;

        [BsonId]
        public string Hash { get; set; } = null!;   // unique key
        public DateTime TimeStamp { get; set; }
        public string TradeId { get; set; } = null!;    // just a indicate of image source
        public string OwnerAccountId { get; set; } = null!;     // just a indicate of image source
    }

    public class TxFile : TxRecord
    {
        public override MessageTypes MessageType => MessageTypes.File;
        public string? FileName { get; set; }
        public string DataHash { get; set; } = null!;
        public string MimeType { get; set; } = null!;
        public string Url { get; set; } = null!;

        public override string Print()
        {
            return base.Print() +
                $"File Name: {FileName}\n" +
                $"File Mime Type: {MimeType}\n" +
                $"File Hash: {DataHash}\n" +
                $"File Url: {Url}\n";
        }

        protected override string GetExtraData()
        {
            return base.GetExtraData() +
                this.MessageType + "|" +
                this.FileName + "|" +
                this.MimeType + "|" +
                this.DataHash + "|";
        }
    }

    public class TxImage : TxFile
    {
        public override MessageTypes MessageType => MessageTypes.Image;

        public override string Print()
        {
            return base.Print() +
                $"File Type: Image\n";
        }
    }
}
