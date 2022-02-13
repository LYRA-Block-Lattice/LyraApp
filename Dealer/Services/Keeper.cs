using CoinGecko.Clients;
using CoinGecko.Interfaces;
using Dealer.Server.Hubs;
using Dealer.Server.Model;
using Lyra.Core.API;
using Lyra.Core.Blocks;
using Lyra.Data.API;
using Lyra.Data.API.WorkFlow;
using Lyra.Data.Blocks;
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
        ILyraAPI _lyraApi;
        DealerDb _db;
        Dealeamon _dealer;
        LyraEventClient _eventClient;

        System.Timers.Timer _Timer;

        public static Keeper Singleton { get; private set; } = null!;
        public Keeper(IHubContext<DealerHub, IHubPushMethods> dealerHub, ILyraAPI lyraApi,
            DealerDb db, Dealeamon dealer)
        {
            Singleton = this;
            _dealerHub = dealerHub;
            _db = db;
            _dealer = dealer;
            _lyraApi = lyraApi;
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
            //var url = $"https://192.168.3.62:4504/events";
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

                    // send event to client only when:
                    // * sender or receiver of transaction;
                    // * broker account's owner
                    var notifyTarget = new List<KeyValuePair<string, object>>();
                    if(a.Consensus == Lyra.Data.API.ConsensusResult.Yea)
                    {
                        if(block is IBrokerAccount brkr)
                        {
                            notifyTarget.Add(new KeyValuePair<string, object>(brkr.OwnerAccountId, new AccountChangedEvent
                            {
                                ChangeType = AccountChangeTypes.Contract,
                                PeerAccountId = (brkr as TransactionBlock).AccountID,
                            }));

                            notifyTarget.Add(new KeyValuePair<string, object>(brkr.OwnerAccountId, new ContractChangeEvent
                            {
                                ChangeType = ContractChangeEventTypes.General,
                                ContractId = (brkr as TransactionBlock).AccountID,
                            }));
                        }
                        
                        if(block is SendTransferBlock send)
                        {
                            notifyTarget.Add(new KeyValuePair<string, object>(send.AccountID, new AccountChangedEvent
                            {
                                ChangeType = AccountChangeTypes.Send,
                                PeerAccountId = send.DestinationAccountId,
                            }));
                            notifyTarget.Add(new KeyValuePair<string, object>(send.DestinationAccountId, new AccountChangedEvent
                            {
                                ChangeType = AccountChangeTypes.Receive,
                                PeerAccountId = send.AccountID,
                            }));
                        }
                        else if(block is ReceiveTransferBlock recv)
                        {
                            if(recv.SourceHash == null)
                            {
                                notifyTarget.Add(new KeyValuePair<string, object>(recv.AccountID, new AccountChangedEvent
                                {
                                    ChangeType = AccountChangeTypes.Receive,
                                }));
                            }
                            else
                            {
                                var sendblkret = await _lyraApi.GetBlockAsync(recv.SourceHash);
                                var sendblk = sendblkret.GetBlock() as SendTransferBlock;
                                notifyTarget.Add(new KeyValuePair<string, object>(sendblk.AccountID, new AccountChangedEvent
                                {
                                    ChangeType = AccountChangeTypes.SendReceived,
                                    PeerAccountId = sendblk.DestinationAccountId,
                                }));
                                notifyTarget.Add(new KeyValuePair<string, object>(recv.AccountID, new AccountChangedEvent
                                {
                                    ChangeType = AccountChangeTypes.Receive,
                                    PeerAccountId = sendblk.AccountID,
                                }));
                            }                            
                        }
                    }

                    foreach(var act in notifyTarget)
                    {
                        if(act.Value is AccountChangedEvent ace)
                            await _dealerHub.Clients.Group(act.Key).OnEvent(
                                new NotifyContainer(ace));
                        else if (act.Value is ContractChangeEvent cce)
                            await _dealerHub.Clients.Group(act.Key).OnEvent(
                                new NotifyContainer(cce));
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
                var coins = new[] { "lyra", "tron", "ethereum", "bitcoin", "tether" };
                var prices = await _client.SimpleClient.GetSimplePrice(coins, new[] { "usd" });
                foreach (var coin in coins)
                    myprice.Add(coin, (decimal)prices[coin]["usd"]);

                // calculate lyra price based on lyr/USDT liquidate pool
                // TODO: just once. remember we have block feeds.
                var existspool = await _lyraApi.GetPoolAsync(LyraGlobal.OFFICIALTICKERCODE, "tether/usdt");
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
                Console.WriteLine($"in keeper get price: {ex}");
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
