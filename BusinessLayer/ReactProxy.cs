using Fluxor;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.JSInterop;
using Nebula.Store.WebWalletUseCase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer
{
    public class ReactProxy
    {
        private readonly IStore _store;
        private readonly IState<WebWalletState> _state;
        private readonly IDispatcher _dispatcher;
        public static ReactProxy Singleton { get; private set; }

        public ReactProxy(IStore store, IState<WebWalletState> state, IDispatcher dispatcher)
        {
            _store = store;
            _state = state;
            _dispatcher = dispatcher;
        }

        [JSInvokable("OpenIt")]
        public static Task<string> OpenIt(string name, string password)
        {
            return Task.FromResult($"wanna open wallet {name} with password {password}?");
        }

        [JSInvokable("Redir")]
        public static Task<string> Redir(string path)
        {
            Singleton.Navigate($"/{path}");
            return Task.FromResult($"wanna redirect to Blazor url /{path}?");
        }

        public void Navigate(string url)
        {
            _dispatcher.Dispatch(new RedirectUrlAction { Url = url });
        }
    }

}
