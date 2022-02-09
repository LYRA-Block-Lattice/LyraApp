
using Lyra.Core.API;
using Lyra.Core.Blocks;
using System.Net;
using System.Timers;

namespace UserLibrary.Data
{
    public class JobExecutedEventArgs : EventArgs { 
        public Dictionary<string, decimal> prices { get; set; }
    }

    public delegate void DealerMessageHandler(RespContainer msg);
    public delegate void DealerPinnedMessageHandler(PinnedMessage msg);

    public class PeriodicExecutor : IAsyncDisposable
    {
        public event DealerMessageHandler OnDealerMessage;
        public event DealerPinnedMessageHandler OnDealerPinnedMessage;
        public event DealerMessageHandler OnGenericEvent;

        public event EventHandler<JobExecutedEventArgs> JobExecuted;
        ConnectionMethodsWrapper? wrapper;

        string eventUrl;
        public ConnectionMethodsWrapper HotLine => wrapper;
        void OnJobExecuted(Dictionary<string, decimal> prices)
        {
            JobExecuted?.Invoke(this, new JobExecutedEventArgs { prices = prices });
        }

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
            eventUrl = url;
            await Reconnect();
        }

        public async Task Reconnect()
        {
            await Disconnect();

            wrapper = new ConnectionMethodsWrapper(ConnectionFactoryHelper.CreateConnection(new Uri(eventUrl)));

            wrapper.RegisterOnChat(a => OnDealerMessage?.Invoke(a));
            wrapper.RegisterOnPinned(a => OnDealerPinnedMessage?.Invoke(a));
            wrapper.RegisterOnEvent(a => OnGenericEvent?.Invoke(a));

            await wrapper.StartAsync();
        }

        public void StartExecuting()
        {
            if (!_Running)
            {
                _Running = true;
            }
        }

        public async ValueTask DisposeAsync()
        {
            if (wrapper is not null)
            {
                await wrapper.DisposeAsync();
            }
        }
    }
}
