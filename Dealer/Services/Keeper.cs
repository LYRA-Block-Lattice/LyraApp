using Dealer.Server.Hubs;
using Dealer.Server.Model;
using Lyra.Core.API;
using Lyra.Core.Blocks;
using Lyra.Data.API;
using Lyra.Data.Shared;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using UserLibrary.Data;

namespace Dealer.Server.Services
{
    public class Keeper : BackgroundService
    {
        // Use a second template parameter when defining the hub context to get the strongly typed hub context
        private readonly IHubContext<DealerHub, IHubPushMethods> _dealerHub;

        DealerDb _db;
        LyraEventClient _eventClient;
        public static Keeper Singleton { get; private set; } = null!;
        public Keeper(IHubContext<DealerHub, IHubPushMethods> dealerHub,
            DealerDb db)
        {
            Singleton = this;
            _dealerHub = dealerHub;
            _db = db;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            await InitAsync();

            while (!stoppingToken.IsCancellationRequested)
            {
                //Console.WriteLine($"Worker running at: {DateTime.Now}");

                ////List<string> history = new List<string> { "line 1", "line 2" };
                //await _dealerHub.Clients.All.OnFoo(new FooData { FooPayload = $"{DateTime.Now}"});
                await Task.Delay(5000);
            }
        }

        private async Task InitAsync()
        {
            var url = LyraGlobal.SelectNode(_db.NetworkId).Replace("/api/", "/events");
            _eventClient = new LyraEventClient(LyraEventHelper.CreateConnection(new Uri(url)));

            _eventClient.RegisterOnEvent(evt =>
            {
                var obj = evt.Get();
                if(obj is ConsensusEvent a)
                {
                    var block = a.BlockAPIResult.GetBlock();
                    Console.WriteLine($"Lyra Event: {block.Hash}: {a.Consensus}");

                    if (a.Consensus == Lyra.Data.API.ConsensusResult.Yea && block is SendTransferBlock send)
                    {
                        _dealerHub.Clients.Group(send.DestinationAccountId).OnChat(
                            new RespContainer(new RespRecvEvent
                            {
                                Source = send.AccountID,
                                Destination = send.DestinationAccountId,
                            }));
                    }
                }
                else if(obj is WorkflowEvent wf)
                {
                    Console.WriteLine($"[WF][{wf.Owner.Shorten()}][{wf.Name}]: {wf.State}, {wf.Result}");
                    //_dealerHub.Clients.Group(wf.Owner).OnChat(
                    //    new RespContainer(wf));
                }
            });

            await _eventClient.StartAsync();
        }
    }
}
