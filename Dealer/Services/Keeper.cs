﻿using Dealer.Server.Hubs;
using Dealer.Server.Model;
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

        LyraEventClient _eventClient;
        public static Keeper Singleton { get; private set; } = null!;
        public Keeper(/*IHubContext<DealerHub, IHubPushMethods> dealerHub*/)
        {
            Singleton = this;
            //_dealerHub = dealerHub;
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
            var url = $"https://localhost:4504/events";
            _eventClient = new LyraEventClient(LyraEventHelper.CreateConnection(new Uri(url)));

            _eventClient.RegisterOnConsensus(a =>
            {
                Console.WriteLine($"Lyra Event: {a.BlockAPIResult.GetBlock().Hash}: {a.Consensus}");
            });

            await _eventClient.StartAsync();
        }
    }
}
