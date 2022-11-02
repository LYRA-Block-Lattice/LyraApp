using Blazored.LocalStorage;
using Fluxor;
using Lyra.Core.API;
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
using System.Text;
using System.Threading.Tasks;
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

        [Parameter]
        public string action { get; set; }
        [Parameter]
        public string target { get; set; }

        MudTabs tabs;

        bool busy, busysend;

        // for send
        public string dstAddr { get; set; }
        public string tokenName { get; set; }
        public decimal amount { get; set; }

        public List<ContactItem> contacts { get; set; }

        // for settings
        public string voteAddr { get; set; }

        public string altDisplay { get; set; }

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

                if (action == "send" && target != null)
                {
                    dstAddr = target;
                    tabs.ActivatePanel(1);
                }

                Dispatcher.Dispatch(new WebWalletChangeTitleAction { title = localizer["Lyra Wallet"] });

                var storStr = await localStorage.GetItemAsync<string>(_consts.ContactStorName) ?? "[]";
                contacts = JsonConvert.DeserializeObject<List<ContactItem>>(storStr);

                Refresh();
            }
            else
            {
                WalletChanged(null, null);
            }

            await base.OnAfterRenderAsync(firstRender);
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

        private async Task SendTokenAsync()
        {
            busysend = true;
            Snackbar.Add(localizer["Refresh balance..."]);
            StateHasChanged();

            try
            {
                var result = await walletState.Value.wallet.SyncAsync(null);
                if (result != Lyra.Core.Blocks.APIResultCodes.Success)
                {
                    Snackbar.Add(localizer["Unable to refresh balance: {0}. Abort send.", result], Severity.Error);
                    busysend = false;
                    StateHasChanged();
                    return;
                }

                var oldbalance = walletState.Value.wallet.GetLastSyncBlock().Balances.ToDecimalDict();

                Snackbar.Add(localizer["Current balance is {0} {1}", oldbalance[tokenName], tokenName]);
                Snackbar.Add(localizer["Sending {0} {1}", amount, tokenName]);

                var result2 = await walletState.Value.wallet.SendAsync(amount, dstAddr, tokenName);
                if (!result2.Successful())
                {
                    Snackbar.Add(localizer["Unable to send token: {0}.", result2.ResultCode], Severity.Error);
                    busysend = false;
                    StateHasChanged();
                    return;
                }

                Snackbar.Add(localizer["Seccess send {0} {1}.", amount, tokenName], Severity.Success);
                Snackbar.Add(localizer["Refresh balance..."]);
                var result3 = await walletState.Value.wallet.SyncAsync(null);
                if (result3 != Lyra.Core.Blocks.APIResultCodes.Success)
                {
                    Snackbar.Add(localizer["Unable to refresh balance: {0}.", result3], Severity.Error);
                    busysend = false;
                    StateHasChanged();
                    return;
                }

                var newbalance = walletState.Value.wallet.GetLastSyncBlock().Balances.ToDecimalDict();
                var changed = oldbalance[tokenName] - newbalance[tokenName];
                Snackbar.Add(localizer["The latest balance is {0} {1} Changed: -{2} {1}", newbalance[tokenName], tokenName, changed]);
                busysend = false;
                StateHasChanged();
            }
            catch(Exception ex)
            {
                Snackbar.Add(localizer["Unexpected Error: {0}.", ex.Message], Severity.Error);
                busysend = false;
                StateHasChanged();
            }

            Dispatcher.Dispatch(new WebWalletRefreshBalanceAction { wallet = walletState.Value.wallet });
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

            if (name == "send")
            {
                dstAddr = target;
                tabs.ActivatePanel(1);
            }

            return Task.CompletedTask;
        }

        public WebWallet()
        {
            tokenName = "LYR";
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
            tokenName = name;
            tabs.ActivatePanel(1);
        }

        void OnContact(ContactItem value)
        {
            dstAddr = value.address;
        }

        private void Return(MouseEventArgs e)
        {
            Dispatcher.Dispatch(new WebWalletCancelSaveSettingsAction { });
        }

    }
}
