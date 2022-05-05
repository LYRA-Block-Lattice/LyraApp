using Blazored.LocalStorage;
using Converto;
using Fluxor;
using Lyra.Data.API;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Nebula.Store.WebWalletUseCase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserLibrary.Store.NotificationUseCase
{
    [FeatureState]
    public class HotDataState
    {
        public Dictionary<string, decimal> MarketPrices;

        public HotDataState() { }
        public HotDataState(Dictionary<string, decimal> NewPrice)
        {
            MarketPrices = NewPrice;
        }
    }

    // update to latest
    public class HotUpdateAction { }
    public class HotUpdateResultAction
    {
        public Dictionary<string, decimal> LatestPrices;
    }
    public class MarketUpdated { }

    public static class HotDataReducers
    {
        [ReducerMethod]
        public static HotDataState RunHotUpdate(HotDataState state, HotUpdateResultAction action)
        {
            return new HotDataState(action.LatestPrices);
        }
    }

    public class Effects
    {
        private readonly ILyraAPI client;
        private readonly DealerClient dealer;
        private readonly IConfiguration config;
        private readonly ILogger<Effects> logger;
        private readonly ILocalStorageService _localStorage;

        public Effects(ILyraAPI lyraClient,
            DealerClient dealerClient,
            IConfiguration configuration,
            ILogger<Effects> logger,
            ILocalStorageService storage)
        {
            client = lyraClient;
            dealer = dealerClient;
            config = configuration;
            this.logger = logger;
            _localStorage = storage;
        }

        [EffectMethod]
        public async Task HandleUpdate(HotUpdateAction action, IDispatcher dispatcher)
        {
            try
            {
                var lps = await dealer.GetPricesAsync();
                dispatcher.Dispatch(new HotUpdateResultAction
                {
                    LatestPrices = lps
                });
                dispatcher.Dispatch(new MarketUpdated());
            }
            catch (Exception ex)
            {
                dispatcher.Dispatch(new WalletErrorResultAction
                {
                    error = ex.ToString()
                });
            }
        }
    }
}
