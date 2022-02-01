using Lyra.Core.API;
using Microsoft.AspNetCore.SignalR;
using UserLibrary.Data;

namespace Dealer.Server.Hubs
{
    // inherit Hub<T>, where T is your interface defining the messages
    // client call this
    public class DealerHub : Hub<IHubPushMethods>, IHubInvokeMethods
    {
        public async Task GetHistory(string connectionId)
        {
            // Get the history from our pretend database
            List<string> history = new List<string> { "This is chat history", "line 1", "line 2" }; //await _db.GetHistory();

            // Send the history to the client
            foreach(var hist in history)
            {
                var foo = new FooData { FooPayload = hist };
                await Clients.Client(connectionId).OnFoo(foo);
            }
        }

        public override async Task OnConnectedAsync()
        {
            await GetHistory(Context.ConnectionId);
            await base.OnConnectedAsync();
        }

        public async Task InvokeFoo(string payload)
        {
            var foo = new FooData { FooPayload = payload };
            await Clients.All.OnFoo(foo);
        }

        public async Task<BarResult> InvokeBar(double number, double cost)
        {
            var bar = new BarData { Number = number, Cost = cost };
            await Clients.All.OnBar(Context.UserIdentifier, bar);

            return new BarResult { Id = "Some Id" };
        }

        public Task<APIResult> JoinRoom(JoinRoomRequest req)
        {
            return Task.FromResult(new APIResult
            {
                ResultCode = Lyra.Core.Blocks.APIResultCodes.DealerRoomNotExists,
            });
        }
    }
}
