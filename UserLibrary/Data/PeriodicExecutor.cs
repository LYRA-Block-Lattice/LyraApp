using Fluxor;
using Lyra.Core.API;
using Lyra.Core.Blocks;
using Lyra.Data.Shared;
using Microsoft.Extensions.Configuration;
using System.Net;
using System.Timers;

namespace UserLibrary.Data
{
    public class JobExecutedEventArgs : EventArgs { 
        public Dictionary<string, decimal> prices { get; set; }
    }

    public class PeriodicExecutor
    {
        static ConnectionMethodsWrapper? wrapper;

        static bool _Running;
        string _network;
        IDispatcher _dispatcher;

        public ConnectionMethodsWrapper HotLine => wrapper;
        public PeriodicExecutor(IConfiguration Configuration, IDispatcher dispatcher)
        {
            _network = Configuration["network"];
            _dispatcher = dispatcher;
        }

        public async Task InitializeAsync()
        {
            if(!_Running)
            {
                _Running = true;

                var eventUrl = "https://192.168.3.91:7070/hub";
                if (_network == "testnet")
                    eventUrl = "https://dealertestnet.lyra.live/hub";
                else if(_network == "mainnet")
                    eventUrl = "https://dealer.lyra.live/hub";
                wrapper = new ConnectionMethodsWrapper(ConnectionFactoryHelper.CreateConnection(new Uri(eventUrl)));

                wrapper.RegisterOnChat(a => _dispatcher.Dispatch(a));
                wrapper.RegisterOnPinned(a => _dispatcher.Dispatch(a));
                wrapper.RegisterOnEvent(a => _dispatcher.Dispatch(a));

                await wrapper.StartAsync();
            }
        }
    }
}
