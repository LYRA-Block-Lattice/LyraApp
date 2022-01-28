using Microsoft.AspNetCore.SignalR;
using UserLibrary.Data;

namespace Dealer.Server.Hubs
{
    // inherit Hub<T>, where T is your interface defining the messages
    public class MyHub : Hub<IMyHub>
    {
        public async Task Publish(string user, string message)
        {
            // Send to everyone else

            // Old way:
            // await Clients.Others.SendAsync("Publish", message);

            // New way:
            await Clients.All.OnPublish(user, message);
        }

        public async Task Whisper(string connectionIdTarget, string message)
        {
            // Send to an individual client

            // Old way:
            // await Clients.Client(connectionIdTarget).SendAsync("Whisper", message);

            // New way:
            await Clients.Client(connectionIdTarget).Whisper(message);
        }

        public override Task OnConnectedAsync()
        {
            
            return base.OnConnectedAsync();
        }
    }
}
