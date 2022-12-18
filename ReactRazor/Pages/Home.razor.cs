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

namespace ReactRazor.Pages
{
    public partial class Home
    {
        [Inject]
        private IState<WebWalletState> walletState { get; set; }

        [Inject]
        private IDispatcher Dispatcher { get; set; }

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
    }
}