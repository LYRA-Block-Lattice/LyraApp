using Lyra.Core.API;
using Lyra.Data.API.Identity;
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

    public class ChatMessage
    {
        public TxMessage Content { get; set; } = null!;
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

    public class JoinRoomResponse : APIResult
    {
        public string RoomId { get; set; } = null!;
    }
}
