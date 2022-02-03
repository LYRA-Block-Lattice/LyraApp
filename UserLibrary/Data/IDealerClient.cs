using Lyra.Core.API;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserLibrary.Data
{
    // Define the hub methods
    public class JoinRoomRequest
    {
        public string TradeID { get; set; } = null!;
        public string UserAccountID { get; set; } = null!;
        public string Signature { get; set; } = null!;
    }

    public class JoinRoomResponse : APIResult
    {
        public string RoomId { get; set; } = null!;
    }

    public class ChatMessage
    {
        public string TradeId { get; set; } = null!;
        public string AccountId { get; set; } = null!;  
        public string Text { get; set; } = null!;
        public string Signature { get; set; } = null!;
        public string? Hash { get; set; }
    }

    /// <summary> SignalR Hub push interface (signature for Hub pushing notifications to Clients) </summary>
    public interface IHubPushMethods
    {
        Task OnChat(ChatMessage msg);
    }

    /// <summary> SignalR Hub invoke interface (signature for Clients invoking methods on server Hub) </summary>
    public interface IHubInvokeMethods
    {
        Task<JoinRoomResponse> JoinRoom(JoinRoomRequest req);
        Task Chat(ChatMessage msg);
    }


}
