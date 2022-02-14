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

    public interface IChatResp
    {
        string TradeId { get; set; }
        string UserName { get; set; }
        string Hash { get; set; }
    }
    public class RespMessage : IChatResp
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

    public class RespFile : IChatResp
    {
        public string TradeId { get; set; } = null!;
        public string UserName { get; set; } = null!;
        public string FileName { get; set; } = null!;
        public string FileHash { get; set; } = null!;   // the hash of file data
        public string Hash { get; set; } = null!;       // the hash of tx chain
        public string Url { get; set; } = null!;
        public string MimeType { get; set; } = null!;  
    }

    public enum ContractChangeEventTypes { General, Open, Close, Partial }
    public class ContractChangeEvent
    {
        public string ContractId { get; set; } = null!;
        public ContractChangeEventTypes ChangeType { get; set; }
    }

    public enum AccountChangeTypes { Send, Receive, SendReceived, Contract }
    public class AccountChangedEvent
    {
        public AccountChangeTypes ChangeType { get; set; }
        public string PeerAccountId { get; set; } = null!;
    }

    public class RespQuote
    {
        public Dictionary<string, decimal> Prices { get; set; } = null!;
    }

    public enum MessageTypes { Null, Text, Image, File  }
    public enum EventTypes { Null, AccountChanged, WorkflowEvent, Quote, ContractChanged }
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

        public IChatResp? Get()
        {
            return MsgType switch
            {
                MessageTypes.Null => null,
                MessageTypes.Text => JsonConvert.DeserializeObject<RespMessage>(Json),
                MessageTypes.Image => JsonConvert.DeserializeObject<RespFile>(Json),
                MessageTypes.File => JsonConvert.DeserializeObject<RespFile>(Json),
                _ => throw new NotImplementedException(),
            };
        }
    }

    public class NotifyContainer
    {
        public EventTypes EvtType { get; set; }
        public string Json { get; set; } = null!;

        public NotifyContainer()
        {

        }

        public NotifyContainer(ContractChangeEvent cntevt)
        {
            EvtType = EventTypes.ContractChanged;
            Json = JsonConvert.SerializeObject(cntevt);
        }

        public NotifyContainer(AccountChangedEvent achgevt)
        {
            EvtType = EventTypes.AccountChanged;
            Json = JsonConvert.SerializeObject(achgevt);
        }

        public NotifyContainer(WorkflowEvent wfevt)
        {
            EvtType = EventTypes.WorkflowEvent;
            Json = JsonConvert.SerializeObject(wfevt);
        }

        public NotifyContainer(RespQuote entity)
        {
            EvtType = EventTypes.Quote;
            Json = JsonConvert.SerializeObject(entity);
        }

        public object? Get()
        {
            return EvtType switch
            {
                EventTypes.Null => null,
                EventTypes.ContractChanged => JsonConvert.DeserializeObject<ContractChangeEvent>(Json),
                EventTypes.AccountChanged => JsonConvert.DeserializeObject<AccountChangedEvent>(Json),
                EventTypes.WorkflowEvent => JsonConvert.DeserializeObject<WorkflowEvent>(Json),
                EventTypes.Quote => JsonConvert.DeserializeObject<RespQuote>(Json),
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
        Task OnEvent(NotifyContainer msg);
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
