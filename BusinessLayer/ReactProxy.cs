using Fluxor;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.JSInterop;
using Nebula.Store.WebWalletUseCase;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Runtime.Versioning;
using System.Text;
using System.Text.Json.Serialization.Metadata;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BusinessLayer
{
    [SupportedOSPlatform("browser")]
    public class ReactProxy
    {
        private readonly IStore _store;
        private readonly IState<WebWalletState> _state;
        private readonly IDispatcher _dispatcher;
        public static ReactProxy Singleton { get; private set; }

        [DynamicDependency(DynamicallyAccessedMemberTypes.PublicMethods, typeof(JsonTypeInfo))]
        [DynamicDependency(DynamicallyAccessedMemberTypes.PublicMethods, typeof(JsonSerializerContext))]
        static ReactProxy()
        {
        }

        //public ReactProxy(IStore store, IState<WebWalletState> state, IDispatcher dispatcher)
        //{
        //    _store = store;
        //    _state = state;
        //    _dispatcher = dispatcher;
        //}

        //[JSInvokable("OpenIt")]
        //public static Task<string> OpenIt(string name, string password)
        //{
        //    return Task.FromResult($"wanna open wallet {name} with password {password}?");
        //}

        //[JSInvokable("Redir")]
        //public static Task<string> Redir(string path)
        //{
        //    Singleton.Navigate($"/{path}");
        //    return Task.FromResult($"wanna redirect to Blazor url /{path}?");
        //}

        //public void Navigate(string url)
        //{
        //    _dispatcher.Dispatch(new RedirectUrlAction { Url = url });
        //}
    }

}
