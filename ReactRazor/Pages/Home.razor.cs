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
using Lyra.Core.Accounts;
using Lyra.Data.API;
using System.Xml.Linq;
using Lyra.Data.Crypto;
using System.Security.Cryptography;
using System.Reflection.Metadata.Ecma335;
using static MudBlazor.Colors;
using Microsoft.Extensions.Configuration;
using static MudBlazor.CategoryTypes;

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
        [Inject] ILyraAPI lyraApi { get; set; }
        [Inject] DealerConnMgr connMgr { get; set; }
        [Inject] IConfiguration Configuration { get; set; }

        private string LastAccountId { get; set; }

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
                    LastAccountId = await localStorage.GetItemAsync<string>(_consts.AccountIdStorName);
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

        // standard api return
        private string returnError(string errorMsg)
        {
            return JsonConvert.SerializeObject(
            new
            {
                ret = "Error",
                msg = errorMsg
            });
        }

        private string returnSuccess(object result)
        {
            return JsonConvert.SerializeObject(
            new
            {
                ret = "Success",
                result
            });
        }

        private string returnApiResult(APIResult result)
        {
            return JsonConvert.SerializeObject(
            new
            {
                ret = result.Successful() ? "Success" : "Error",
                msg = result.ResultMessage ?? result.ResultCode.Humanize(),
            });
        }

        private string returnApiResult(APIResult result, object payload)
        {
            return JsonConvert.SerializeObject(
            new
            {
                ret = result.Successful() ? "Success" : "Error",
                msg = result.ResultMessage ?? result.ResultCode.Humanize(),
                result = payload,
            });
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
        public async Task<string> GetBalancesAsync()
        {
            if (string.IsNullOrWhiteSpace(LastAccountId))
                return returnError("Wallet not exists");

            var lasttx = await lyraApi.GetLastBlockAsync(LastAccountId);
            if (lasttx.Successful())
            {
                var balances = lasttx.As<TransactionBlock>().Balances.ToDecimalDict();
                return returnSuccess(balances.Select(kvp => new { token = kvp.Key, balance = kvp.Value }));
            }
            else
                return returnError(lasttx.ResultCode.Humanize());            
        }

        [JSInvokable("SearchDao")]
        public async Task<string> SearchDaoAsync(string q)
        {
            var daos = await lyraApi.FindDaosAsync(q);
            return daos;
        }

        [JSInvokable("SearchToken")]
        public async Task<string?> SearchTokenAsync(string? q, string? cat)
        {
            var tokens = await lyraApi.FindTokensAsync(q, cat);
            return tokens;
        }

        [JSInvokable("SearchTokenForAccount")]
        public async Task<string?> SearchTokenForAccountAsync(string? q, string? cat)
        {
            var tokens = await lyraApi.FindTokensForAccountAsync(LastAccountId, q, cat);
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

                    if (!walletState.Value.IsOpening) throw new InvalidOperationException("Wallet is not open");

                    var ret = await walletState.Value.wallet.CreateUniOrderAsync(order);
                    return returnApiResult(ret, ret.TxHash);
                }
                else
                {
                    throw new Exception("Invalid order data");
                }
            }
            catch(Exception ex)
            {
                return returnError(ex.Message);
            }
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
            var ret = await lyraApi.GetUniOrdersByOwnerAsync(LastAccountId);
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
                        status = (a.latest ?? a.gens).UOStatus.ToString(),
                        offering = ShortToken(a.gens.Order.offering),
                        biding = ShortToken(a.gens.Order.biding),
                        a.gens.Order.amount,
                        a.gens.Order.price,
                        limitmin = a.gens.Order.limitMin, 
                        limitmax = a.gens.Order.limitMax,
                        time = a.gens.TimeStamp.ToString(),
                        sold = a.gens.Order.amount - (a.latest ?? a.gens).Order.amount,
                        shelf = (a.latest ?? a.gens).Order.amount,
                    });

                return returnApiResult(ret, orders);
            }
            else
            {
                return returnApiResult(ret);
            }
        }

        [JSInvokable("GetTrades")]
        public async Task<string?> GetTradesAsync(string orderid)
        {
            // get all current trades
            var ret = await lyraApi.FindUniTradeForOrderAsync(orderid);
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
                        status = (a.latest ?? a.gens).UTStatus.ToString(),                     
                    });

                return returnApiResult(ret, trades);
            }

            return returnApiResult(ret);
        }

        [JSInvokable("MintToken")]
        public async Task<string?> MintToken(string name, string domain, string desc, decimal supply)
        {
            var ret = await walletState.Value.wallet.CreateTokenAsync(name, domain, desc, 8, supply, true,
                null, null, null, ContractTypes.Cryptocurrency, null);

            return returnApiResult(ret, ret.TxHash);
        }

        [JSInvokable("UploadFile")]
        public async Task<string?> UploadFileAsync(string fileName, string type, byte[] data)
        {
            var dealer = connMgr.GetDealer(null);
            var wallet = walletState.Value.wallet;

            try
            {
                int MAXALLOWEDSIZE = 5 * 1024 * 1024;      // 5MB

                if (data.Length > MAXALLOWEDSIZE)
                {
                    return returnError($"File too big. Max size {MAXALLOWEDSIZE}");
                }

                var imageData = data;

                string hash, signature;
                using (var sha = SHA256.Create())
                {
                    byte[] hash_bytes = sha.ComputeHash(imageData);
                    hash = Base58Encoding.Encode(hash_bytes);
                }
                signature = PortableSignatures.GetSignature(wallet.PrivateKey, hash);

                var ret = await dealer.UploadImageAsync(wallet.AccountId, signature, "-"/*tradeid*/,
                    fileName, imageData, type);
                if (ret.Successful())
                {
                    return returnSuccess(ret.Url);
                }
                else
                {
                    return returnError(ret.ResultCode.Humanize());
                }
            }
            catch (Exception ex)
            {
                return returnError(ex.Message);
            }
        }

        [JSInvokable("MintNFT")]
        public async Task<string?> MintNFTAsync(string name, string desc, int supply, string metaDataUrl)
        {
            var wallet = walletState.Value.wallet;

            var ret = await wallet.CreateNFTAsync(name, desc, supply, metaDataUrl);
            if(ret.Successful())
            {
                // get ticker
                var gens = wallet.GetLastSyncBlock() as TokenGenesisBlock;
                return returnSuccess(gens.Ticker);
            }

            return returnError(ret.ResultCode.Humanize());
        }

        // meta: one nft one meta
        // NFT genesis: one genesis multiple nft/meta
        // let's begin with the simplest.
        [JSInvokable("CreateNFTMetaData")]
        public async Task<string> CreateNFTMetaDataAsync(string name, string desc, string imageUrl)
        {
            try
            {
                var lsb = await lyraApi.GetLastServiceBlockAsync();
                var acac = new AcademyClient(Configuration["network"]);
                var wallet = walletState.Value.wallet;
                var input = $"{wallet.AccountId}:{lsb.GetBlock().Hash}:{imageUrl}";
                var signatures = Signatures.GetSignature(wallet.PrivateKey, input, wallet.AccountId);
                var ret = await acac.CreateNFTMetaHostedAsync(wallet.AccountId, signatures,
                    name, desc, imageUrl);
                dynamic qs = JObject.Parse(ret);
                if (qs.ret == "Success")
                {
                    Snackbar.Add($"Metadata created.", Severity.Success);

                    var url = qs.result.ToString();

                    // then we can submit a NFT genesis block.
                    var crret = await wallet.CreateNFTAsync(name, desc, 1, url);
                    if (crret.Successful())
                    {
                        return returnSuccess(url);
                    }
                    else
                        throw new Exception($"Error mint NFT: {crret.error}");
                }
                else
                {
                    throw new Exception($"Error create metadata: {qs.error}");
                }
            }
            catch(Exception ex)
            {
                return returnError(ex.Message);
            }
        }

        [JSInvokable("PrintFiat")]
        public async Task<string?> PrintFiatAsync(string fiatTicker, long amount)
        {
            var wallet = walletState.Value.wallet;

            var ret = await wallet.PrintFiatAsync(fiatTicker, amount);
            if (ret.Successful())
            {
                return returnSuccess(fiatTicker);
            }

            return returnError(ret.ResultCode.Humanize());
        }

        [JSInvokable("CreateTOT")]
        public async Task<string> CreateTotAsync(string type,
            string name,
            string description,
            int supply,
            string tradeSecretSignature
            )
        {
            var acac = new AcademyClient(Configuration["network"]);
            var wallet = walletState.Value.wallet;

            // try to sign the request
            var lsb = await lyraApi.GetLastServiceBlockAsync();
            var input = $"{wallet.AccountId}:{lsb.GetBlock().Hash}:{name}:{description}";
            var signature = Signatures.GetSignature(wallet.PrivateKey, input, wallet.AccountId);
            var totType = Enum.Parse<HoldTypes>(type);
            var retJson = await acac.CreateTotMetaAsync(wallet.AccountId, signature, totType, name, description);
            // the result format is compatible
            var dynret = JsonConvert.DeserializeObject<dynamic>(retJson);

            if(dynret.ret == "Success")
            {
                var metaUrl = dynret.result.ToString();
                APIResult ctret = await wallet.CreateTOTAsync(totType, name, description, supply, metaUrl, tradeSecretSignature);
                if(ctret.Successful())
                {
                    var totgen = wallet.GetLastSyncBlock() as TokenGenesisBlock;
                    return returnApiResult(ctret, totgen.Ticker);
                }
                else
                {
                    return returnApiResult(ctret);
                }
            }
            else
            {
                return retJson;
            }    
        }
    }
}