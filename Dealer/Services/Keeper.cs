using CoinGecko.Clients;
using CoinGecko.Entities.Response.ExchangeRates;
using CoinGecko.Entities.Response.Simple;
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
using System.Collections.Concurrent;
using System.Timers;
using UserLibrary.Data;

namespace Dealer.Server.Services
{
    public class Keeper : BackgroundService
    {
        public ConcurrentDictionary<string, decimal> Prices { get; private set; }
        public FiatInfo GetFiat(string symbol) {
            if(_grates == null || symbol == null)
                return null;

            if (!_grates.Rates.ContainsKey(symbol.ToLower()))
                return null;

            var item = _grates.Rates[symbol.ToLower()];
            return new FiatInfo { symbol = symbol, name = item.Name, unit = item.Unit };
        }
        // coingecko's results
        Price _gmarket;
        ExchangeRates _grates;

        // usdt tethering account id
        string _usdtpoolid;

        // Use a second template parameter when defining the hub context to get the strongly typed hub context
        private readonly IHubContext<DealerHub, IHubPushMethods> _dealerHub;
        ILyraAPI _lyraApi;
        DealerDb _db;
        Dealeamon _dealer;
        LyraEventClient _eventClient;
        ILogger<Keeper> _logger;

        System.Timers.Timer _Timer;

        public static Keeper Singleton { get; private set; } = null!;
        public Keeper(IHubContext<DealerHub, IHubPushMethods> dealerHub, IConfiguration config,
            DealerDb db, Dealeamon dealer, ILogger<Keeper> logger)
        {
            Singleton = this;
            _dealerHub = dealerHub;
            _db = db;
            _dealer = dealer;
            _lyraApi = LyraRestClient.Create(config["network"], Environment.OSVersion.ToString(), "Dealer", "1.0");
            _logger = logger;
            Prices = new ConcurrentDictionary<string, decimal>();
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            await InitAsync();

            while (!stoppingToken.IsCancellationRequested)
            {
                //_logger.LogInformation($"Worker running at: {DateTime.Now}");

                ////List<string> history = new List<string> { "line 1", "line 2" };
                //await _dealerHub.Clients.All.OnFoo(new FooData { FooPayload = $"{DateTime.Now}"});
                await Task.Delay(5000);
            }
        }

        private async Task InitAsync()
        {
            await UpdatePriceAsync();

            //var url = LyraGlobal.SelectNode(_db.NetworkId).Replace("/api/", "/events");
            //var url = $"https://192.168.3.62:4504/events";
            var url = $"https://seed1.testnet.lyra.live:4504/events";
            if(_db.NetworkId == "mainnet")
                url = $"https://seed1.mainnet.lyra.live:5504/events";
            else if(_db.NetworkId == "devnet")
                url = $"https://devnet.lyra.live:4504/events";

            _logger.LogInformation($"Lyra event on {_db.NetworkId} using {url}");

            _eventClient = new LyraEventClient(LyraEventHelper.CreateConnection(new Uri(url)));

            _eventClient.RegisterOnEvent(async evt => await ProcessEventAsync(evt));

            await _eventClient.StartAsync();

            // Initiate a Timer
            _Timer = new System.Timers.Timer();
            _Timer.Interval = 60_000;
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
                    _logger.LogInformation($"Lyra Event: {block.Hash}: {a.Consensus}");                    

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

                            // update price from the LYR/$USDT pool
                            if(brkr is PoolSwapOutBlock pool && pool.AccountID == _usdtpoolid)
                            {
                                var swapcal = new SwapCalculator("LYR", "tether/USDT", pool,
                                        LyraGlobal.OFFICIALTICKERCODE, 1, 0);
                                Prices.AddOrUpdate("LYR_INT", Math.Round(swapcal.MinimumReceived, 8), (key, old) => Math.Round(swapcal.MinimumReceived, 8));

                                await NotifyMarketChangedAsync();
                            }
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
                        {
                            // notify only to related account
                            //await _dealerHub.Clients.Group(act.Key).OnEvent(
                            //    new NotifyContainer(cce));

                            // or notify to everyone. quick implement. maybe in future only notify related account
                            // related account need to query previous block, or even the genesis block, etc. added more complex.
                            await _dealerHub.Clients.All.OnEvent(
                                new NotifyContainer(cce));
                        }

                    }
                }
                else if (obj is WorkflowEvent wf)
                {
                    _logger.LogInformation($"([WF] {DateTime.Now:mm:ss.ff}) [{wf.Owner.Shorten()}][{wf.Name}]: Key is: {wf.Key}, Block {wf.Action} result: {wf.Result} State: {wf.State}, {wf.Message}");

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
                _logger.LogInformation($"Error in ProcessEventAsync: {ex}");
            }
        }

        async void HandleTimer(object source, ElapsedEventArgs e)
        {
            await UpdatePriceAsync();
        }

        private async Task UpdatePriceAsync()
        {
            try
            {
                // Execute required job
                ICoinGeckoClient _client = CoinGeckoClient.Instance;
                var coins = new[] { "lyra", "tron", "ethereum", "bitcoin", "tether" };
                _gmarket = await _client.SimpleClient.GetSimplePrice(coins, new[] { "usd", "cny" });
                foreach (var coin in coins)
                {
                    var pric = (decimal)_gmarket[coin]["usd"];
                    var symbol = coin switch
                    {
                        "tron" => "TRX",
                        "ethereum" => "ETH",
                        "bitcoin" => "BTC",
                        "tether" => "USDT",
                        "lyra" => "LYR",
                        _ => coin,
                    };
                    Prices.AddOrUpdate(symbol, pric, (key, old) => pric);
                }

                if(_grates != null)
                    await Task.Delay(10_000);

                _grates = await _client.ExchangeRatesClient.GetExchangeRates();
                // calculate exchange rates
                // per dollar
                var interested = new[]
                {
                    ""
                };
                if (_grates != null && _gmarket != null)
                {
                    var btcprice = (decimal)_gmarket["bitcoin"]["usd"];
                    foreach (var rate in _grates.Rates)
                    {
                        if (Prices.ContainsKey(rate.Key.ToUpper()))
                            continue;

                        var converted = Math.Round(btcprice / rate.Value.Value.Value, 8);
                        Prices.AddOrUpdate(rate.Key, converted, (key, old) => converted);
                    }
                }

                // calculate lyra price based on lyr/USDT liquidate pool
                // just once. remember we have block feeds.
                if (!Prices.ContainsKey("LYR_INT"))
                {
                    var existspool = await _lyraApi.GetPoolAsync(LyraGlobal.OFFICIALTICKERCODE, "tether/usdt");
                    if (existspool != null && existspool.Successful() && existspool.PoolAccountId != null)
                    {
                        var poollatest = existspool.GetBlock() as TransactionBlock;

                        _usdtpoolid = poollatest.AccountID;

                        var swapcal = new SwapCalculator(existspool.Token0, existspool.Token1, poollatest,
                                LyraGlobal.OFFICIALTICKERCODE, 1, 0);
                        Prices.AddOrUpdate("LYR_INT", Math.Round(swapcal.MinimumReceived, 8), (key, old) => Math.Round(swapcal.MinimumReceived, 8));
                    }
                }

                //else
                //{
                //    Prices.AddOrUpdate("LYR_INT", (decimal)prices["lyra"]["usd"], (key, old) => (decimal)prices["lyra"]["usd"]);
                //}

                await NotifyMarketChangedAsync();
            }
            catch (Exception ex)
            {
                _logger.LogInformation($"in keeper get price: {ex}");
            }
        }

        private async Task NotifyMarketChangedAsync()
        {
            await _dealerHub.Clients.All.OnEvent(
                new NotifyContainer(new RespQuote
                {
                    Prices = Prices.ToDictionary(kvp => kvp.Key, kvp => kvp.Value),
                }));
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
