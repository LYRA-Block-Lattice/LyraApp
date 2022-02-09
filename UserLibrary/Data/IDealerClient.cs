using Lyra.Core.API;
using Lyra.Data.API;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserLibrary.Data
{
    // Define the hub methods
    public class JoinRequest
    {
        public string UserAccountID { get; set; } = null!;
        public string Signature { get; set; } = null!;
    }

    public class JoinRoomRequest
    {
        public string TradeID { get; set; } = null!;
        public string UserAccountID { get; set; } = null!;
        public string Signature { get; set; } = null!;
    }

    public class JoinRoomResponse : APIResult
    {
        public RespContainer[]? History { get; set; }
        public Dictionary<string, string> Roles { get; set; }
    }

    public class ChatMessage
    {
        public string TradeId { get; set; } = null!;
        public string AccountId { get; set; } = null!;  
        public string Text { get; set; } = null!;
        public string Signature { get; set; } = null!;
        public string? Hash { get; set; }
    }

    public class RespMessage
    {
        public string TradeId { get; set; } = null!;
        public string UserName { get; set; } = null!;
        public string Text { set; get; } = null!;  
        public string Hash { get; set; } = null!;   // the hash of tx chain
    }

    public class FileMessage
    {
        public string TradeId { get; set; } = null!;
        public string AccountId { get; set; } = null!;
        public string FileHash { get; set; } = null!;
        public string Signature { get; set; } = null!;
        public string? Hash { get; set; }
    }

    public class RespFile
    {
        public string TradeId { get; set; } = null!;
        public string UserName { get; set; } = null!;
        public string FileName { get; set; } = null!;
        public string FileHash { get; set; } = null!;   // the hash of file data
        public string Hash { get; set; } = null!;       // the hash of tx chain
        public string Url { get; set; } = null!;
        public string MimeType { get; set; } = null!;  
    }

    public class RespRecvEvent
    {
        public string Source { get; set; } = null!;
        public string Destination { get; set; } = null!;
    }

    public class RespQuote
    {
        public Dictionary<string, decimal> Prices { get; set; } = null!;
    }

    public enum MessageTypes { Null, Text, Image, File, RecvEvent, WorkflowEvent, Quote }

    public class RespContainer
    {
        public MessageTypes MsgType { get; set; }
        public string Json { get; set; } = null!;

        public RespContainer()
        {

        }
        public RespContainer(RespMessage msg)
        {
            MsgType = MessageTypes.Text;
            Json = JsonConvert.SerializeObject(msg);
        }

        public RespContainer(RespFile file)
        {
            MsgType = MessageTypes.File;
            Json = JsonConvert.SerializeObject(file);
        }

        public RespContainer(RespRecvEvent recvevt)
        {
            MsgType = MessageTypes.RecvEvent;
            Json = JsonConvert.SerializeObject(recvevt);
        }

        public RespContainer(WorkflowEvent wfevt)
        {
            MsgType = MessageTypes.WorkflowEvent;
            Json = JsonConvert.SerializeObject(wfevt);
        }

        public RespContainer(RespQuote entity)
        {
            MsgType = MessageTypes.Quote;
            Json = JsonConvert.SerializeObject(entity);
        }

        public object? Get()
        {
            return MsgType switch
            {
                MessageTypes.Null => null,
                MessageTypes.Text => JsonConvert.DeserializeObject<RespMessage>(Json),
                MessageTypes.Image => JsonConvert.DeserializeObject<RespFile>(Json),
                MessageTypes.File => JsonConvert.DeserializeObject<RespFile>(Json),
                MessageTypes.RecvEvent => JsonConvert.DeserializeObject<RespRecvEvent>(Json),
                MessageTypes.WorkflowEvent => JsonConvert.DeserializeObject<WorkflowEvent>(Json),
                MessageTypes.Quote => JsonConvert.DeserializeObject<RespQuote>(Json),
                _ => throw new NotImplementedException(),
            };
        }
    }

    public enum PinnedMode { Notify, Wait, Action };
    public class PinnedMessage
    {
        public PinnedMode Mode { get; set; }
        public string TradeId { get; set; }
        public string Text { set; get; } = null!;
    }

    /// <summary> SignalR Hub push interface (signature for Hub pushing notifications to Clients) </summary>
    public interface IHubPushMethods
    {
        Task OnChat(RespContainer msg);
        Task OnPinned(PinnedMessage msg);
        Task OnEvent(RespContainer msg);
    }

    /// <summary> SignalR Hub invoke interface (signature for Clients invoking methods on server Hub) </summary>
    public interface IHubInvokeMethods
    {
        Task Join(JoinRequest req);
        Task SendFile(FileMessage fm);
        Task<JoinRoomResponse> JoinRoom(JoinRoomRequest req);
        Task Chat(ChatMessage msg);
    }
}
