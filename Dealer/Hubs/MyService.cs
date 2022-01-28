using Microsoft.AspNetCore.SignalR;
using UserLibrary.Data;

namespace Dealer.Server.Hubs
{
    public class MyService : BackgroundService
    {
        // Use a second template parameter when defining the hub context to get the strongly typed hub context
        private readonly IHubContext<DealerHub, IHubPushMethods> _myHub;
        //private readonly ISomeDatabaseRepository _db;
        public MyService(IHubContext<DealerHub, IHubPushMethods> myHub/*, ISomeDatabaseRepository db*/)
        {
            _myHub = myHub;
            //_db = db;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                Console.WriteLine($"Worker running at: {DateTime.Now}");

                List<string> history = new List<string> { "line 1", "line 2" };
                //await _myHub.Clients.All.OnBar(history);
                await Task.Delay(5000);
            }
        }
    }
}
