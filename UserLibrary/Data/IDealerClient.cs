using Lyra.Core.API;
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
        public RespMessage[]? History { get; set; }
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
        public string UserName { get; set; } = null!;
        public string Text { set; get; } = null!;   
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
        Task OnChat(RespMessage msg);
        Task OnPinned(PinnedMessage msg);
    }

    /// <summary> SignalR Hub invoke interface (signature for Clients invoking methods on server Hub) </summary>
    public interface IHubInvokeMethods
    {
        Task Join(JoinRequest req);
        Task<JoinRoomResponse> JoinRoom(JoinRoomRequest req);
        Task Chat(ChatMessage msg);
    }
}
