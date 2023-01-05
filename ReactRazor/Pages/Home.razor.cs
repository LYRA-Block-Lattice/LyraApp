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
using System.Runtime.InteropServices.JavaScript;
using System.Diagnostics.CodeAnalysis;
using System.Runtime.Versioning;
using System.Text.Json.Serialization.Metadata;
using System.Text.Json.Serialization;
using System.ComponentModel;

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
        [Inject] NavigationManager Navigation { get; set; }

        private string LastAccountId { get; set; }

        protected override async Task OnInitializedAsync()
        {
            LastAccountId = await localStorage.GetItemAsync<string>(_consts.AccountIdStorName);
            if (OperatingSystem.IsBrowser())
            {
                await JSHost.ImportAsync("ReactRazor", "../_content/ReactRazor/Pages/Home.razor.js");
                await Interop.OnInit(this);
            }
        }

        [SupportedOSPlatform("browser")]
        public partial class Interop
        {
            [DynamicDependency(DynamicallyAccessedMemberTypes.PublicMethods, typeof(JsonTypeInfo))]
            [DynamicDependency(DynamicallyAccessedMemberTypes.PublicMethods, typeof(JsonSerializerContext))]
            static Interop()
            {
            }

            [JSImport("onInit", "ReactRazor")]
            internal static partial Task OnInit([JSMarshalAs<JSType.Any>] object component);

            [JSExport]
            public static Task<string> RedirAsync([JSMarshalAs<JSType.Any>] object component, string path)
            {
                var home = (Home)component;
                home.navigator.NavigateTo($"/{path}", false, true);
                return Task.FromResult($"wanna redirect to Blazor url /{path}?");
            }

            [JSExport]
            public static Task<string> AlertAsync([JSMarshalAs<JSType.Any>] object component, string severity, string message)
            {
                var home = (Home)component;
                var svt = Severity.Info;
                if (Enum.TryParse(severity, out Severity svtx))
                    svt = svtx;

                home.Snackbar.Add(message, svt);
                return Task.FromResult("");
            }

            [JSExport]
            public static async Task<string> GetBalancesAsync([JSMarshalAs<JSType.Any>] object component)
            {
                var home = (Home)component;

                if (string.IsNullOrWhiteSpace(home.LastAccountId))
                    return returnError("Wallet not exists");

                var lasttx = await home.lyraApi.GetLastBlockAsync(home.LastAccountId);
                if (lasttx.Successful())
                {
                    var balances = lasttx.As<TransactionBlock>().Balances.ToDecimalDict();
                    return returnSuccess(balances.Select(kvp => new { token = kvp.Key, balance = kvp.Value }));
                }
                else
                    return returnError(lasttx.ResultCode.Humanize());
            }

            [JSExport]
            public static async Task<string> GetWalletNamesAsync([JSMarshalAs<JSType.Any>] object component)
            {
                var home = (Home)component;
                var wcjson = await home.localStorage.GetItemAsync<string>(home._consts.NebulaStorName);
                var wc = new WalletContainer(wcjson);

                var walletNames = wc.Names;
                //if (walletNames.Length == 1)
                //    curname = walletNames[0];
                //else if (walletNames.Contains(localizer["Default"]))
                //    curname = localizer["Default"];

                return returnSuccess(walletNames);
            }

            [JSExport]
            public static Task<string> OpenWalletAsync([JSMarshalAs<JSType.Any>] object component, string name, string password)
            {
                var home = (Home)component;
                home.Dispatcher.Dispatch(new WebWalletOpenAction { store = home._consts.NebulaStorName, name = name, password = password });
                return Task.FromResult($"Opening...");
            }

            [JSExport]
            public static async Task<string> CreateWalletAsync([JSMarshalAs<JSType.Any>] object component, string walletName, string password, bool usePvk, string prvKey)
            {
                var home = (Home)component;
                if (string.IsNullOrWhiteSpace(walletName))
                {
                    return returnError(home.localizer["Please specify the name of wallet."]);
                }

                var wcjson = await home.localStorage.GetItemAsync<string>(home._consts.NebulaStorName);
                var wc = new WalletContainer(wcjson);
                if (wc.Names.Contains(walletName))
                {
                    return returnError(home.localizer["Wallet name exists. Please pick another one."]);
                }

                if (string.IsNullOrWhiteSpace(password))
                {
                    return returnError(home.localizer["Password can't be empty."]);
                }

                byte[] data;
                var aib = new AccountInBuffer();
                if (usePvk)
                {
                    if (!Signatures.ValidatePrivateKey(prvKey))
                    {
                        return returnError(home.localizer["Invalid private key."]);
                    }

                    Wallet.Create(aib, walletName, password, home.Configuration["network"], prvKey);
                    data = aib.GetBuffer(password);
                }
                else
                {
                    Wallet.Create(aib, walletName, password, home.Configuration["network"]);
                    data = aib.GetBuffer(password);
                }

                var meta = new WalletContainer.WalletData
                {
                    Name = walletName,
                    Data = data,
                    Backup = false,
                    Note = home.localizer["Created: {0}", DateTime.Now],
                };
                wc.Add(meta);

                await home.localStorage.SetItemAsync(home._consts.NebulaStorName, wc.ToString());

                return returnSuccess("");
            }

            [JSExport]
            public static async Task<string> SearchDaoAsync([JSMarshalAs<JSType.Any>] object component, string q)
            {
                var home = (Home)component;
                var daos = await home.lyraApi.FindDaosAsync(q);
                return daos;
            }

            [JSExport]
            public static async Task<string?> SearchTokenAsync([JSMarshalAs<JSType.Any>] object component, string? q, string? cat)
            {
                var home = (Home)component;
                var tokens = await home.lyraApi.FindTokensAsync(q, cat);
                return tokens;
            }

            [JSExport]
            public static async Task<string?> SearchTokenForAccountAsync([JSMarshalAs<JSType.Any>] object component, string? q, string? cat)
            {
                var home = (Home)component;

                if (string.IsNullOrWhiteSpace(home.LastAccountId))
                    return returnError("Wallet not exists");

                var tokens = await home.lyraApi.FindTokensForAccountAsync(home.LastAccountId, q, cat);
                return tokens;
            }

            [JSExport]
            public static async Task<string?> GetCurrentDealerAsync([JSMarshalAs<JSType.Any>] object component)
            {
                var home = (Home)component;
                var storStr = await home.localStorage.GetItemAsync<string>(home._consts.PrefStorName) ?? "{}";
                var pc = JsonConvert.DeserializeObject<PreferenceContainer>(storStr);
                return pc.PriceFeedingDealerID;
            }

            [JSExport]
            public static async Task<string?> CreateOrderAsync([JSMarshalAs<JSType.Any>] object component, string json)
            {
                var home = (Home)component;
                try
                {
                    var wallet = GetOpeningWallet(component);
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

                        var ret = await wallet.CreateUniOrderAsync(order);
                        return returnApiResult(ret, ret.TxHash);
                    }
                    else
                    {
                        throw new Exception("Invalid order data");
                    }
                }
                catch (Exception ex)
                {
                    return returnError(ex.Message);
                }
            }

            public static string ShortToken(string addr)
            {
                if (string.IsNullOrWhiteSpace(addr) || addr.Length < 12)
                {
                    return addr;
                }

                return addr.Substring(0, 4) + "..." + addr.Substring(addr.Length - 6, 6);
            }

            [JSExport]
            public static async Task<string?> GetOrdersAsync([JSMarshalAs<JSType.Any>] object component)
            {
                // get all current trades
                var home = (Home)component;

                if (string.IsNullOrWhiteSpace(home.LastAccountId))
                    return returnError("Wallet not exists");

                var ret = await home.lyraApi.GetUniOrdersByOwnerAsync(home.LastAccountId);
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

            [JSExport]
            public static async Task<string?> GetTradesAsync([JSMarshalAs<JSType.Any>] object component, string orderid)
            {
                // get all current trades
                var home = (Home)component;
                var ret = await home.lyraApi.FindUniTradeForOrderAsync(orderid);
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

            [JSExport]
            public static async Task<string?> MintToken([JSMarshalAs<JSType.Any>] object component, string name, string domain, string desc, double supply)
            {
                var home = (Home)component;
                var ret = await GetOpeningWallet(component).CreateTokenAsync(name, domain, desc, 8, (decimal)supply, true,
                    null, null, null, ContractTypes.Cryptocurrency, null);

                return returnApiResult(ret, ret.TxHash);
            }

            [JSExport]
            public static async Task<string?> UploadFileAsync([JSMarshalAs<JSType.Any>] object component, string fileName, string type, byte[] data)
            {
                var home = (Home)component;
                var dealer = home.connMgr.GetDealer(null);
                var wallet = GetOpeningWallet(component);

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

            [JSExport]
            public static async Task<string?> MintNFTAsync([JSMarshalAs<JSType.Any>] object component, string name, string desc, int supply, string metaDataUrl)
            {
                var home = (Home)component;
                var wallet = GetOpeningWallet(component);

                var ret = await wallet.CreateNFTAsync(name, desc, supply, metaDataUrl);
                if (ret.Successful())
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
            [JSExport]
            public static async Task<string> CreateNFTMetaDataAsync([JSMarshalAs<JSType.Any>] object component, string name, string desc, string imageUrl)
            {
                var home = (Home)component;
                try
                {
                    var lsb = await home.lyraApi.GetLastServiceBlockAsync();
                    var acac = new AcademyClient(home.Configuration["network"]);
                    var wallet = GetOpeningWallet(component);
                    var input = $"{wallet.AccountId}:{lsb.GetBlock().Hash}:{imageUrl}";
                    var signatures = Signatures.GetSignature(wallet.PrivateKey, input, wallet.AccountId);
                    var ret = await acac.CreateNFTMetaHostedAsync(wallet.AccountId, signatures,
                        name, desc, imageUrl);
                    dynamic qs = JObject.Parse(ret);
                    if (qs.ret == "Success")
                    {
                        home.Snackbar.Add($"Metadata created.", Severity.Success);

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
                catch (Exception ex)
                {
                    return returnError(ex.Message);
                }
            }

            [JSExport]
            public static async Task<string?> PrintFiatAsync([JSMarshalAs<JSType.Any>] object component, string fiatTicker, double amount)
            {
                var home = (Home)component;
                var wallet = GetOpeningWallet(component);

                var ret = await wallet.PrintFiatAsync(fiatTicker, (long)amount);
                if (ret.Successful())
                {
                    return returnSuccess(fiatTicker);
                }

                return returnError(ret.ResultCode.Humanize());
            }

            [JSExport]
            public static async Task<string> CreateTotAsync([JSMarshalAs<JSType.Any>] object component, string type,
                string name,
                string description,
                int supply,
                string tradeSecretSignature
                )
            {
                var home = (Home)component;
                var acac = new AcademyClient(home.Configuration["network"]);
                var wallet = GetOpeningWallet(component);

                // try to sign the request
                var lsb = await home.lyraApi.GetLastServiceBlockAsync();
                var input = $"{wallet.AccountId}:{lsb.GetBlock().Hash}:{name}:{description}";
                var signature = Signatures.GetSignature(wallet.PrivateKey, input, wallet.AccountId);
                var totType = Enum.Parse<HoldTypes>(type);
                var retJson = await acac.CreateTotMetaAsync(wallet.AccountId, signature, totType, name, description);
                // the result format is compatible
                var dynret = JsonConvert.DeserializeObject<dynamic>(retJson);

                if (dynret.ret == "Success")
                {
                    var metaUrl = dynret.result.ToString();
                    APIResult ctret = await wallet.CreateTOTAsync(totType, name, description, supply, metaUrl, tradeSecretSignature);
                    if (ctret.Successful())
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

            [JSExport]
            public static Task<string> SignTradeSecretAsync([JSMarshalAs<JSType.Any>] object component, string tradeSecret)
            {
                var home = (Home)component;
                var wallet = GetOpeningWallet(component);
                var sign = Signatures.GetSignature(wallet.PrivateKey, tradeSecret, wallet.AccountId);
                return Task.FromResult(returnSuccess(sign));
            }

            [JSExport]
            public static Task<string> VerifyTradeSecretAsync([JSMarshalAs<JSType.Any>] object component, string tradeSecret, string signature)
            {
                var home = (Home)component;
                var wallet = GetOpeningWallet(component);
                var ok = Signatures.VerifyAccountSignature(tradeSecret, signature, wallet.AccountId);
                if (ok)
                    return Task.FromResult(returnSuccess(ok));
                else
                    return Task.FromResult(returnError("Bad signature or wrong trade secret."));
            }

            private static Wallet GetOpeningWallet([JSMarshalAs<JSType.Any>] object component)
            {
                var home = (Home)component;
                if (!home.walletState.Value.IsOpening || home.walletState.Value.wallet == null)
                {
                    home.Navigation.NavigateTo("/open-wallet");
                    return null;
                }
                else
                {
                    return home.walletState.Value.wallet;
                }
            }

            private static string returnError(string errorMsg)
            {
                return JsonConvert.SerializeObject(
                new
                {
                    ret = "Error",
                    msg = errorMsg
                });
            }

            private static string returnSuccess(object result)
            {
                return JsonConvert.SerializeObject(
                new
                {
                    ret = "Success",
                    result
                });
            }

            private static string returnApiResult(APIResult result)
            {
                return JsonConvert.SerializeObject(
                new
                {
                    ret = result.Successful() ? "Success" : "Error",
                    msg = result.ResultMessage ?? result.ResultCode.Humanize(),
                });
            }

            private static string returnApiResult(APIResult result, object payload)
            {
                return JsonConvert.SerializeObject(
                new
                {
                    ret = result.Successful() ? "Success" : "Error",
                    msg = result.ResultMessage ?? result.ResultCode.Humanize(),
                    result = payload,
                });
            }
        }
    }
}