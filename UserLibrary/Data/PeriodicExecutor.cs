
using CoinGecko.Clients;
using CoinGecko.Interfaces;
using Lyra.Core.API;
using Lyra.Core.Blocks;
using System.Net;
using System.Timers;

namespace UserLibrary.Data
{
    public class JobExecutedEventArgs : EventArgs { 
        public Dictionary<string, decimal> prices { get; set; }
    }

    public delegate void DealerMessageHandler(RespMessage msg);
    public delegate void DealerPinnedMessageHandler(PinnedMessage msg);

    public class PeriodicExecutor : IAsyncDisposable
    {
        public event DealerMessageHandler OnDealerMessage;
        public event DealerPinnedMessageHandler OnDealerPinnedMessage;

        public event EventHandler<JobExecutedEventArgs> JobExecuted;
        ConnectionMethodsWrapper? wrapper;

        public ConnectionMethodsWrapper HotLine => wrapper;
        void OnJobExecuted(Dictionary<string, decimal> prices)
        {
            JobExecuted?.Invoke(this, new JobExecutedEventArgs { prices = prices });
        }

        System.Timers.Timer _Timer;
        bool _Running;
        string _network;

        public PeriodicExecutor(string network)
        {
            _network = network;
        }

        public async Task Disconnect()
        {
            if (wrapper != null)
            {
                await wrapper.DisposeAsync();
                wrapper = null;
            }
        }
        public async Task ConnectDealer(string url)
        {
            if (wrapper != null)
            {
                await wrapper.DisposeAsync();
            }

            wrapper = new ConnectionMethodsWrapper(ConnectionFactoryHelper.CreateConnection(new Uri(url)));

            wrapper.RegisterOnChat(a => OnDealerMessage?.Invoke(a));
            wrapper.RegisterOnPinned(a => OnDealerPinnedMessage?.Invoke(a));

            await wrapper.StartAsync();
        }

        public void StartExecuting()
        {
            if (!_Running)
            {
                // Initiate a Timer
                _Timer = new System.Timers.Timer();
                _Timer.Interval = 10000;  // every 5 mins
                _Timer.Elapsed += HandleTimer;
                _Timer.AutoReset = true;
                _Timer.Enabled = true;

                _Running = true;
            }
        }

        bool _injob = false;
        async void HandleTimer(object source, ElapsedEventArgs e)
        {
            if (_injob)
                return;

            try
            {
                _injob = true;
                Dictionary<string, decimal> myprice = new Dictionary<string, decimal>();

                // Execute required job
                ICoinGeckoClient _client = CoinGeckoClient.Instance;
                const string vsCurrencies = "usd";
                var coins = new[] { "lyra", "tron", "ethereum", "bitcoin" };
                var prices = await _client.SimpleClient.GetSimplePrice(coins, new[] { vsCurrencies });
                foreach (var coin in coins)
                    myprice.Add(coin, (decimal)prices[coin]["usd"]);

                // calculate lyra price based on lyr/trx liquidate pool
                var lc = LyraRestClient.Create(_network, Environment.OSVersion.ToString(), "Nebula", "1.4");
                var existspool = await lc.GetPoolAsync(LyraGlobal.OFFICIALTICKERCODE, "tether/trx");
                if (existspool != null && existspool.Successful() && existspool.PoolAccountId != null)
                {
                    var poollatest = existspool.GetBlock() as TransactionBlock;
                    var swapcal = new SwapCalculator(existspool.Token0, existspool.Token1, poollatest,
                            LyraGlobal.OFFICIALTICKERCODE, 1, 0);
                    myprice.Add(LyraGlobal.OFFICIALTICKERCODE, Math.Round(swapcal.MinimumReceived * myprice["tron"], 8));
                }
                else
                {
                    myprice.Add(LyraGlobal.OFFICIALTICKERCODE, myprice["lyra"]);
                }

                // Notify any subscribers to the event
                OnJobExecuted(myprice);
            }
            catch(Exception ex)
            {
                Console.WriteLine($"In HandleTimer: {ex}");
            }
            finally
            {
                _injob = false;
            }

        }

        public async ValueTask DisposeAsync()
        {
            if (wrapper is not null)
            {
                await wrapper.DisposeAsync();
            }

            if (_Running)
            {
                // Clear up the timer
                _Timer.Stop();
                _Timer.Close();
                _Timer.Dispose();
            }
        }
    }
}
