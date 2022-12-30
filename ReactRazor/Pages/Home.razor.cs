using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;
using System.Net.Http;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components.Routing;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.JSInterop;
using BusinessLayer.Lib;
using Fluxor;
using Nebula.Store.WebWalletUseCase;
using Blazored.LocalStorage;
using Microsoft.Extensions.Localization;
using Lyra.Core.API;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Converto;
using Lyra.Data.API.WorkFlow.UniMarket;
using Lyra.Data.API.WorkFlow;
using Org.BouncyCastle.Ocsp;
using MudBlazor;
using Humanizer;
using Lyra.Data.Shared;
using Lyra.Core.Blocks;

namespace ReactRazor.Pages
{
    public partial class Home
    {
        [Inject]
        private IState<WebWalletState> walletState { get; set; }

        [Inject]
        private IDispatcher Dispatcher { get; set; }
        [Inject] ISnackbar Snackbar { get; set; }

        [Inject]
        NebulaConsts _consts { get; set; }
        [Inject]
        private ILocalStorageService localStorage { get; set; }
        [Inject] IStringLocalizer<Home> localizer { get; set; }

        private DotNetObjectReference<Home>? objRef;
        protected override void OnInitialized()
        {
            objRef = DotNetObjectReference.Create(this);
            base.OnInitialized();
        }

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                try
                {
                    await JS.InvokeVoidAsync("loadScript", "_content/ReactRazor/static/js/main.js");
                    await JS.InvokeAsync<string>("lyraSetProxy", objRef);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error loadScript: {ex.Message}");
                }
            //await JS.InvokeVoidAsync("bruic.openwallet", _react);
            }

            await base.OnAfterRenderAsync(firstRender);
        }

        [JSInvokable("Redir")]
        public Task<string> RedirAsync(string path)
        {
            navigator.NavigateTo($"/{path}", false, true);
            return Task.FromResult($"wanna redirect to Blazor url /{path}?");
        }

        [JSInvokable("Alert")]
        public Task<string> AlertAsync(string severity, string message)
        {
            var svt = Severity.Info;
            if (Enum.TryParse(severity, out Severity svtx))
                svt = svtx;

            Snackbar.Add(message, svt);
            return Task.FromResult("");
        }

        [JSInvokable("GetWalletNames")]
        public async Task<string[]> GetWalletNamesAsync()
        {
            var wcjson = await localStorage.GetItemAsync<string>(_consts.NebulaStorName);
            var wc = new WalletContainer(wcjson);

            var walletNames = wc.Names;
            //if (walletNames.Length == 1)
            //    curname = walletNames[0];
            //else if (walletNames.Contains(localizer["Default"]))
            //    curname = localizer["Default"];

            return walletNames;
        }

        [JSInvokable("OpenWallet")]
        public Task<string> OpenWalletAsync(string name, string password)
        {
            Dispatcher.Dispatch(new WebWalletOpenAction{store = _consts.NebulaStorName, name = name, password = password});
            return Task.FromResult($"Opening...");
        }

        [JSInvokable("GetBalance")]
        public Task<string> GetBalancesAsync()
        {
            if (walletState.Value.wallet == null)
                return Task.FromResult("");

            var balances = walletState.Value.wallet.GetLastSyncBlock().Balances.ToDecimalDict();
            return Task.FromResult(JsonConvert.SerializeObject(balances.Select(kvp => new {token = kvp.Key, balance = kvp.Value })));
        }

        [JSInvokable("SearchDao")]
        public async Task<string> SearchDaoAsync(string q)
        {
            var daos = await walletState.Value.wallet.RPC?.FindDaosAsync(q);
            return daos;
        }

        [JSInvokable("SearchToken")]
        public async Task<string?> SearchTokenAsync(string? q, string? cat)
        {
            var tokens = await walletState.Value.wallet.RPC?.FindTokensAsync(q, cat);
            return tokens;
        }

        [JSInvokable("GetCurrentDealer")]
        public async Task<string?> GetCurrentDealerAsync()
        {
            var storStr = await localStorage.GetItemAsync<string>(_consts.PrefStorName) ?? "{}";
            var pc = JsonConvert.DeserializeObject<PreferenceContainer>(storStr);
            return pc.PriceFeedingDealerID;
        }

        [JSInvokable("CreateOrder")]
        public async Task<string?> CreateOrderAsync(string json)
        {
            try
            {
                var argsObj = JObject.Parse(json);
                var argsDict = argsObj.ToObject<Dictionary<string, string>>();
                if (argsDict != null)
                {
                    var order = new UniOrder
                    {
                        daoId = argsDict["daoid"],
                        dealerId = argsDict["dealerid"],
                        offerby = LyraGlobal.GetHoldTypeFromTicker(argsDict["selltoken"]),
                        offering = argsDict["selltoken"],
                        bidby = LyraGlobal.GetHoldTypeFromTicker(argsDict["gettoken"]),
                        biding = argsDict["gettoken"],
                        price = decimal.Parse(argsDict["price"]),
                        cltamt = decimal.Parse(argsDict["collateral"]),
                        payBy = new string[0],

                        amount = decimal.Parse(argsDict["count"]),
                        limitMin = decimal.Parse(argsDict["limitmin"]),
                        limitMax = decimal.Parse(argsDict["limitmax"]),
                    };

                    var ret = await walletState.Value.wallet.CreateUniOrderAsync(order);
                    return JsonConvert.SerializeObject(
                        new
                        {
                            ret = ret.ResultCode.ToString(),
                            txhash = ret.TxHash,
                        });
                }
            }
            catch(Exception ex)
            {
                return JsonConvert.SerializeObject(
                new
                {
                    ret = "Exception",
                    msg = ex.Message,
                });
            }

            return "";
        }

        public string ShortToken(string addr)
        {
            if (string.IsNullOrWhiteSpace(addr) || addr.Length < 12)
            {
                return addr;
            }

            return addr.Substring(0, 4) + "..." + addr.Substring(addr.Length - 6, 6);
        }

        [JSInvokable("GetOrders")]
        public async Task<string?> GetOrdersAsync()
        {
            // get all current trades
            var ret = await walletState.Value.wallet.RPC.GetUniOrdersByOwnerAsync(walletState.Value.wallet.AccountId);
            if (ret.Successful())
            {
                var blocks = ret.GetBlocks().Cast<TransactionBlock>();
                var orders = blocks
                    .Where(a => a.BlockType == BlockTypes.UniOrderGenesis)
                    .Select(a => new
                    {
                        gens = a as IUniOrder,
                        latest = blocks.FirstOrDefault(x => x.BlockType != BlockTypes.UniOrderGenesis && x.AccountID == a.AccountID) as IUniOrder ?? a as IUniOrder,
                    })                    
                    .OrderByDescending(a => a.gens.TimeStamp)
                    .Select(a => new
                    {
                        orderid = a.gens.AccountID,
                        status = a.latest.UOStatus.ToString(),
                        offering = ShortToken(a.gens.Order.offering),
                        biding = ShortToken(a.gens.Order.biding),
                        a.gens.Order.amount,
                        a.gens.Order.price,
                        limitmin = a.gens.Order.limitMin, 
                        limitmax = a.gens.Order.limitMax,
                        time = a.gens.TimeStamp.ToString(),
                        sold = a.gens.Order.amount - a.latest.Order.amount,
                        shelf = a.latest.Order.amount,
                    });
                return JsonConvert.SerializeObject(
                new
                {
                    ret = ret.ResultCode.ToString(),
                    orders
                });
            }

            return JsonConvert.SerializeObject(
            new
            {
                ret = "Error",
                msg = ret.ResultCode.ToString(),
            });
        }

        [JSInvokable("GetTrades")]
        public async Task<string?> GetTradesAsync(string orderid)
        {
            // get all current trades
            var ret = await walletState.Value.wallet.RPC.FindUniTradeForOrderAsync(orderid);
            if (ret.Successful())
            {
                var blocks = ret.GetBlocks().Cast<TransactionBlock>();
                var trades = blocks
                    .Where(a => a.BlockType == BlockTypes.UniTradeGenesis)
                    .Select(a => new
                    {
                        gens = a as IUniTrade,
                        latest = blocks.FirstOrDefault(x => x.BlockType != BlockTypes.UniTradeGenesis && x.AccountID == a.AccountID) as IUniTrade ?? a as IUniTrade,
                    })
                    .OrderByDescending(a => a.gens.TimeStamp)
                    .Select(a => new
                    {
                        //orderid = orderid.Shorten(),
                        buyer = a.gens.AccountID.Shorten(),
                        time = a.gens.TimeStamp.ToString(),
                        a.gens.Trade.amount,
                        status = a.latest.UTStatus.ToString(),                     
                    });
                return JsonConvert.SerializeObject(
                new
                {
                    ret = ret.ResultCode.ToString(),
                    trades
                });
            }

            return JsonConvert.SerializeObject(
            new
            {
                ret = "Error",
                msg = ret.ResultCode.ToString(),
            });
        }
    }
}