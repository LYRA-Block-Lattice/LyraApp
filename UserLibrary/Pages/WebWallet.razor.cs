using Blazored.LocalStorage;
using Fluxor;
using Lyra.Core.API;
using Lyra.Core.Blocks;
using Lyra.Data.Crypto;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.Extensions.Localization;
using Microsoft.JSInterop;
using MudBlazor;
using Nebula.Store.WebWalletUseCase;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using UserLibrary.Components;
using UserLibrary.Data;

namespace UserLibrary.Pages
{
    public partial class WebWallet
    {
        [Inject]
        private IState<WebWalletState> walletState { get; set; }

        [Inject]
        private IDispatcher Dispatcher { get; set; }

        [Inject]
        private IJSRuntime JS { get; set; }

        [Inject] ISnackbar Snackbar { get; set; }

        [Inject] ILocalStorageService localStorage { get; set; }
        [Inject] NebulaConsts _consts { get; set; }
        [Inject] IStringLocalizer<WebWallet> localizer { get; set; }
        [Inject] HttpClient http { get; set; }

        [Parameter]
        public string action { get; set; }
        [Parameter]
        public string target { get; set; }

        MudTabs? tabs;

        bool busy;

        // for settings
        public string voteAddr { get; set; }

        public string altDisplay { get; set; }

        record nftdesc
        {
            public TokenGenesisBlock gen;
            public string metaurl;
            public string name;
            public string desc;
            public nftmeta meta;
        }
        record nftmeta
        {
            public string name;
            public string description;
            public string image;
        }
        Dictionary<string, nftdesc> NFTImages = new Dictionary<string, nftdesc>();

        protected override void OnInitialized()
        {
            SubscribeToAction<WebWalletGotSendToMeAction>(a =>
            {
                InvokeAsync(StateHasChanged);
            });

            base.OnInitialized();
        }

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {          
            if(firstRender)
            {
                if (walletState.Value.wallet == null)
                {
                    Navigation.NavigateTo("login");
                }

                //if (action == "send" && target != null)
                //{
                //    dstAddr = target;
                //    tabs.ActivatePanel(1);
                //}

                Dispatcher.Dispatch(new WebWalletChangeTitleAction { title = localizer["Lyra Wallet"] });

                Refresh();
            }
            else
            {
                WalletChanged(null, null);
            }

            await base.OnAfterRenderAsync(firstRender);
        }

        private async Task LoadNFTImages()
        {
            foreach (var kvp in walletState.Value.wallet.GetLastSyncBlock().Balances)
            {
                if (!kvp.Key.StartsWith("nft/") || NFTImages.ContainsKey(kvp.Key))
                    continue;

                try
                {
                    var secs = kvp.Key.Split("#"); // make sure no serial number
                    var nftgenret = await lyraClient.GetTokenGenesisBlockAsync("a", secs[0], "b");
                    if (nftgenret.Successful())
                    {
                        var gb = nftgenret.GetBlock() as TokenGenesisBlock;
                        var nft = new nftdesc
                        {
                            gen = gb,
                            name = gb.Custom1,
                            desc = gb.Description,
                            metaurl = $"{gb.Custom2}" + (secs.Length == 2 ? $"/{secs[1]}" : ""),    // ticker use #, but the url use /
                        };

                        var json = await http.GetStringAsync(nft.metaurl);
                        Console.WriteLine($"meta json for {kvp.Key} is {json}");
                        nft.meta = JsonConvert.DeserializeObject<nftmeta>(json);
                        NFTImages.Add(kvp.Key, nft);

                        StateHasChanged();
                        await Task.Delay(1);
                    }
                }
                catch(Exception ex)
                {
                    Console.WriteLine("Error fetch metadat: " + ex.ToString());
                    Snackbar.Add($"Error fetch metadat for nft: {kvp.Key} for error: {ex.Message}", Severity.Error);
                }
            }
        }

        private void WalletChanged(object sender, WebWalletState wallet)
        {
            if(busy)
                busy = false;

            if (!string.IsNullOrWhiteSpace(walletState.Value.error))
            {
                //Snackbar.Add(walletState.Value.error, Severity.Error);
                return;
            }            
        }

        private Task OnSelectedTabChanged(string name)
        {
            if (name == "free")
            {
                Dispatcher.Dispatch(new WebWalletSendMeFreeTokenAction
                {
                    wallet = walletState.Value.wallet,
                    faucetPvk = Configuration["faucetPvk"]
                });
            }

            if (name == "NFT")
            {
                tabs.ActivatePanel(1);
            }

            return Task.CompletedTask;
        }

        public WebWallet()
        {            
            altDisplay = "************";
        }

        private void Refresh()
        {
            busy = true;
            Dispatcher.Dispatch(new WebWalletRefreshBalanceAction { wallet = walletState.Value.wallet });
        }

        private async Task OnClickPost()
        {
            Dispatcher.Dispatch(new WebWalletSendMeFreeTokenAction
            {
                wallet = walletState.Value.wallet,
                faucetPvk = Configuration["faucetPvk"]
            });
            return;
        }

        private async Task SendX(string name)
        {
            Navigation.NavigateTo($"/send?token={HttpUtility.UrlEncode(name)}");
        }

        private void Return(MouseEventArgs e)
        {
            Dispatcher.Dispatch(new WebWalletCancelSaveSettingsAction { });
        }

    }
}
