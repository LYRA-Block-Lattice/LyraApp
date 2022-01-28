using Microsoft.AspNetCore.SignalR;
using UserLibrary.Data;

namespace Dealer.Server.Hubs
{
    public class MyService : BackgroundService
    {
        // Use a second template parameter when defining the hub context to get the strongly typed hub context
        private readonly IHubContext<MyHub, IMyHub> _myHub;
        //private readonly ISomeDatabaseRepository _db;
        public MyService(IHubContext<MyHub, IMyHub> myHub/*, ISomeDatabaseRepository db*/)
        {
            _myHub = myHub;
            //_db = db;
        }

        public async Task GetHistory(string connectionId)
        {
            // Get the history from our pretend database
            List<string> history = new List<string> { "line 1", "line 2" }; //await _db.GetHistory();

            // Send the history to the client

            // Old way:
            // await _myHub.Clients.Client(connectionId).SendAsync("History", history);

            // New way:
            await _myHub.Clients.Client(connectionId).History(history);
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                Console.WriteLine($"Worker running at: {DateTime.Now}");

                List<string> history = new List<string> { "line 1", "line 2" };
                await _myHub.Clients.All.History(history);
                await Task.Delay(5000);
            }
        }
    }
}
