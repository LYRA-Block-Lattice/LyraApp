using CoinGecko.Clients;
using CoinGecko.Interfaces;
using Dealer.Server.Hubs;
using Dealer.Server.Model;
using Lyra.Core.API;
using Lyra.Core.Blocks;
using Lyra.Data.API;
using Lyra.Data.Shared;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.Timers;
using UserLibrary.Data;

namespace Dealer.Server.Services
{
    public class Keeper : BackgroundService
    {
        // Use a second template parameter when defining the hub context to get the strongly typed hub context
        private readonly IHubContext<DealerHub, IHubPushMethods> _dealerHub;

        DealerDb _db;
        Dealeamon _dealer;
        LyraEventClient _eventClient;

        System.Timers.Timer _Timer;

        public static Keeper Singleton { get; private set; } = null!;
        public Keeper(IHubContext<DealerHub, IHubPushMethods> dealerHub,
            DealerDb db, Dealeamon dealer)
        {
            Singleton = this;
            _dealerHub = dealerHub;
            _db = db;
            _dealer = dealer;
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
            //var url = $"https://localhost:4504/events";
            _eventClient = new LyraEventClient(LyraEventHelper.CreateConnection(new Uri(url)));

            _eventClient.RegisterOnEvent(async evt => await ProcessEventAsync(evt));

            await _eventClient.StartAsync();

            // Initiate a Timer
            _Timer = new System.Timers.Timer();
            _Timer.Interval = 5000;
            _Timer.Elapsed += HandleTimer;
            _Timer.AutoReset = true;
            _Timer.Enabled = true;
        }

        private async Task ProcessEventAsync(EventContainer evt)
        {
            try
            {
                var obj = evt.Get();
                if (obj is ConsensusEvent a)
                {
                    var block = a.BlockAPIResult.GetBlock();
                    Console.WriteLine($"Lyra Event: {block.Hash}: {a.Consensus}");

                    if (a.Consensus == Lyra.Data.API.ConsensusResult.Yea && block is SendTransferBlock send)
                    {
                        await _dealerHub.Clients.Group(send.DestinationAccountId).OnEvent(
                            new NotifyContainer(new RespRecvEvent
                            {
                                Source = send.AccountID,
                                Destination = send.DestinationAccountId,
                            }));
                    }
                }
                else if (obj is WorkflowEvent wf)
                {
                    Console.WriteLine($"([WF] {DateTime.Now:mm:ss.ff}) [{wf.Owner.Shorten()}][{wf.Name}]: Key is: {wf.Key}, Block {wf.Action} result: {wf.Result} State: {wf.State}, {wf.Message}");

                    if (wf.State == "Finished")
                    {
                        foreach (var msg in await _dealer.WorkflowFinished(wf))
                        {
                            await _dealerHub.Clients.Group(wf.Owner).OnEvent(
                                new NotifyContainer(wf));
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in ProcessEventAsync: {ex}");
            }
        }

        async void HandleTimer(object source, ElapsedEventArgs e)
        {
            Dictionary<string, decimal> myprice = new Dictionary<string, decimal>();

            try
            {
                // Execute required job
                ICoinGeckoClient _client = CoinGeckoClient.Instance;
                const string vsCurrencies = "usd";
                var coins = new[] { "lyra", "tron", "ethereum", "bitcoin" };
                var prices = await _client.SimpleClient.GetSimplePrice(coins, new[] { vsCurrencies });
                foreach (var coin in coins)
                    myprice.Add(coin, (decimal)prices[coin]["usd"]);

                // calculate lyra price based on lyr/USDT liquidate pool
                // TODO: just once. remember we have block feeds.
                var lc = LyraRestClient.Create(_db.NetworkId, Environment.OSVersion.ToString(), "DealKeeper", "1.0");
                var existspool = await lc.GetPoolAsync(LyraGlobal.OFFICIALTICKERCODE, "tether/usdt");
                if (existspool != null && existspool.Successful() && existspool.PoolAccountId != null)
                {
                    var poollatest = existspool.GetBlock() as TransactionBlock;
                    var swapcal = new SwapCalculator(existspool.Token0, existspool.Token1, poollatest,
                            LyraGlobal.OFFICIALTICKERCODE, 1, 0);
                    myprice.Add(LyraGlobal.OFFICIALTICKERCODE, Math.Round(swapcal.MinimumReceived, 8));
                }
                else
                {
                    myprice.Add(LyraGlobal.OFFICIALTICKERCODE, myprice["lyra"]);
                }

                await _dealerHub.Clients.All.OnEvent(
                    new NotifyContainer(new RespQuote
                    {
                        Prices = myprice,
                    }));
            }
            catch (Exception ex)
            {

            }
        }

        public override void Dispose()
        {
            // Clear up the timer
            _Timer.Stop();
            _Timer.Close();
            _Timer.Dispose();
            base.Dispose();
        }
    }
}
