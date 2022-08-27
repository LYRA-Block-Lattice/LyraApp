using CoinGecko.Clients;
using CoinGecko.Entities.Response.ExchangeRates;
using CoinGecko.Entities.Response.Simple;
using CoinGecko.Interfaces;
using Dealer.Server.Hubs;
using Dealer.Server.Model;
using Humanizer;
using Lyra.Core.Accounts;
using Lyra.Core.API;
using Lyra.Core.Blocks;
using Lyra.Data.API;
using Lyra.Data.API.ABI;
using Lyra.Data.API.WorkFlow;
using Lyra.Data.Blocks;
using Lyra.Data.Shared;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.Collections.Concurrent;
using System.Timers;
using Telegram.Bot;
using Telegram.Bot.Exceptions;
using Telegram.Bot.Extensions.Polling;
using Telegram.Bot.Types;
using Telegram.Bot.Types.Enums;
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
        IConfiguration _config;
        ILyraAPI _lyraApi;
        DealerDb _db;
        Dealeamon _dealer;
        LyraEventClient _eventClient;
        ILogger<Keeper> _logger;
        TelegramBotClient _botClient;

        string _botUserName;
        public string BotUserName => _botUserName;
        public bool SupportTelegram { get; private set; }

        System.Timers.Timer _Timer;

        public static Keeper Singleton { get; private set; } = null!;
        public Keeper(IHubContext<DealerHub, IHubPushMethods> dealerHub, IConfiguration config,
            DealerDb db, Dealeamon dealer, ILogger<Keeper> logger)
        {
            Singleton = this;
            _config = config;
            _dealerHub = dealerHub;
            _db = db;
            _dealer = dealer;
            _lyraApi = LyraRestClient.Create(config["network"], Environment.OSVersion.ToString(), "Dealer", "1.0");
            _logger = logger;
            Prices = new ConcurrentDictionary<string, decimal>();
            Prices.TryAdd("usd", 1m); // for dumb
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
            await InitDealerServerAsync();
            await InitTelegramBotAsync();
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
            if(_db.NetworkId == "devnet")
                _Timer.Interval = 1_800_000;    // just keep price stable to run unit test
            else
                _Timer.Interval = 60_000;
            _Timer.Elapsed += HandleTimerAsync;
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
                                if(sendblk != null) // block may be missing!
                                {
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
                    }

                    foreach(var act in notifyTarget)
                    {
                        //Console.WriteLine($"notify target is {act.Value.GetType().FullName}");
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

        async Task InitDealerServerAsync()
        {
            // start wallet
            var walletStor2 = new AccountInMemoryStorage();
            Wallet.Create(walletStor2, "xunit", "1234", _config["network"], _config["DealerKey"]);
            var dlrWallet = Wallet.Open(walletStor2, "xunit", "1234", _lyraApi);
            _logger.LogInformation($"Dealer Wallet Account ID: {dlrWallet.AccountId}");
            dlrWallet.NoConsole = true;
            await dlrWallet.SyncAsync(null);

            // register if necessary
            while(true)
            {
                var gdret = await dlrWallet.RPC.GetDealerByAccountIdAsync(dlrWallet.AccountId);
                if (!gdret.Successful())
                {
                    var dealerAbi = new Wallet.LyraContractABI
                    {
                        svcReq = BrokerActions.BRK_DLR_CREATE,
                        targetAccountId = PoolFactoryBlock.FactoryAccount,
                        amounts = new Dictionary<string, decimal>
                        {
                            { LyraGlobal.OFFICIALTICKERCODE, 1 },
                        },
                        objArgument = new DealerCreateArgument
                        {
                            Name = _config["DealerName"],
                            Description = _config["DealerDescription"],
                            ServiceUrl = $"{_config["baseUrl"]}/",
                            DealerAccountId = dlrWallet.AccountId,
                            Mode = ClientMode.Permissionless
                        }
                    };

                    // we temp disable the dealer creation.
                    var ret = await dlrWallet.ServiceRequestAsync(dealerAbi);
                    if (ret.Successful())
                    {
                        Console.WriteLine("Successfully created dealer.");
                        return;
                    }
                    else
                    {
                        Console.WriteLine($"Unable to create dealer: {ret.ResultCode.Humanize()}");
                        await Task.Delay(30_000);
                    }
                }
                return;
            }
        }

        async Task InitTelegramBotAsync()
        {
            var tgToken = _config["TelegramBotToken"];
            if(string.IsNullOrEmpty(tgToken))
            {
                SupportTelegram = false;
                return;
            }

            SupportTelegram = true;

            _botClient = new TelegramBotClient(tgToken);

            // StartReceiving does not block the caller thread. Receiving is done on the ThreadPool.
            var receiverOptions = new ReceiverOptions
            {
                AllowedUpdates = Array.Empty<UpdateType>() // receive all update types
            };
            _botClient.StartReceiving(
                updateHandler: HandleUpdateAsync, 
                errorHandler: HandlePollingErrorAsync,
                receiverOptions: receiverOptions
            );

            var me = await _botClient.GetMeAsync();
            _botUserName = me.Username;
            Console.WriteLine($"Hello, World! I am user {me.Id} and my name is {me.FirstName}.");
        }

        async Task HandleUpdateAsync(ITelegramBotClient botClient, Update update, CancellationToken cancellationToken)
        {
            try
            {
                // Only process Message updates: https://core.telegram.org/bots/api#message
                if (update.Type != UpdateType.Message)
                    return;
                // Only process text messages
                if (update.Message!.Type != MessageType.Text)
                    return;

                var chatId = update.Message.Chat.Id;
                var messageText = update.Message.Text;

                Console.WriteLine($"Received a '{messageText}' message in chat {chatId}.");

                if (update.Message.Chat.Username != null)    // some user never create user id
                    await _db.CreateOrUpdateTGChatAsync(new Models.TGChat
                    {
                        ChatID = chatId,
                        Username = update.Message.Chat.Username
                    });

                // Echo received message text
                Message sentMessage = await botClient.SendTextMessageAsync(
                    chatId: chatId,
                    text: "Please open Lyra APP to reply.\n\nYou said:\n" + messageText,
                    cancellationToken: cancellationToken);
            }
            catch(Exception ex)
            {
                Console.WriteLine($"Error in HandleUpdateAsync: {ex}");
            }
        }

        Task HandlePollingErrorAsync(ITelegramBotClient botClient, Exception exception, CancellationToken cancellationToken)
        {
            var ErrorMessage = exception switch
            {
                ApiRequestException apiRequestException
                    => $"Telegram API Error:\n[{apiRequestException.ErrorCode}]\n{apiRequestException.Message}",
                _ => exception.ToString()
            };

            Console.WriteLine(ErrorMessage);
            return Task.CompletedTask;
        }

        public async Task SendToTelegramAsync(string telegramID, RespContainer container)
        {
            if (telegramID == null || telegramID?.Trim() == "@")
                return;

            try
            {
                var tgchat = await _db.GetTGChatByUserIDAsync(telegramID.Substring(1)); // remove the leading '@'
                var obj = container.Get();

                if(obj is RespMessage msg)
                {
                    Message message = await _botClient.SendTextMessageAsync(
                        chatId: new ChatId(tgchat.ChatID),
                        text: $"{msg.Text}\n\nBy: {msg.UserName}\nTrade: {msg.TradeId.Shorten()}");
                }
                else if(obj is RespFile file)
                {
                    // todo: send the miage to telegram
                    Message message = await _botClient.SendTextMessageAsync(
                        chatId: new ChatId(tgchat.ChatID),
                        text: $"(An Image, Hash: {file.FileHash})\n\nBy: {file.UserName}\nTrade: {file.TradeId.Shorten()}");
                }
                else
                {
                    throw new NotImplementedException();
                }
            }
            catch(Exception ex)
            {
                Console.WriteLine($"Error send message via Telegram: {ex}");
            }
        }

        async void HandleTimerAsync(object source, ElapsedEventArgs e)
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
            try
            {
                if(_Timer != null)
                {
                    _Timer.Stop();
                    _Timer.Close();
                    _Timer.Dispose();
                }
            }
            catch { }
            base.Dispose();
        }
    }
}
