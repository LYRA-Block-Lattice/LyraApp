using Fluxor;
using Fluxor.Blazor.Web.Components;
using Fluxor.Exceptions;
using Lyra.Data.API;
using Microsoft.AspNetCore.Components;
using Microsoft.Extensions.Configuration;
using Microsoft.JSInterop;
using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserLibrary.Store.NotificationUseCase;

namespace UserLibrary.Data
{
	public class JobExecutedEventArgs : EventArgs
	{
		public Dictionary<string, decimal> prices { get; set; }
	}

	/// <summary>
	/// Initializes the store for the current user. This should be placed in the App.razor component.
	/// </summary>
	public class AppGlobal : FluxorComponent
    {
		[Inject]
		private IStore Store { get; set; }

		[Inject]
		IDispatcher Dispatcher { get; set; }

		[Inject]
		private IConfiguration Configuration { get; set; }

		[Inject] ConnectionMethodsWrapper wrapper { get; set; }

		private string MiddlewareInitializationScripts;
		private bool Disposed;

        /// <summary>
        /// Retrieves supporting JavaScript for any Middleware
        /// </summary>
        protected override async Task OnInitializedAsync()
        {
			if(!wrapper.IsStarted)
            {
				await wrapper.StartAsync();

                wrapper.RegisterOnChat(a => Dispatcher.Dispatch(a));
                wrapper.RegisterOnPinned(a => Dispatcher.Dispatch(a));
                wrapper.RegisterOnEvent(a => Dispatcher.Dispatch(a));

                SubscribeToAction<NotifyContainer>(evtc =>
                {
                    var evt = evtc.Get();

                    if (evt is AccountChangedEvent achgevt)
                    {
						Dispatcher.Dispatch(achgevt);
					}
                    else if (evt is WorkflowEvent wfevt)
                    {
                        Dispatcher.Dispatch(wfevt);
                    }
                    else if (evt is RespQuote quote)
                    {
                        Dispatcher.Dispatch(new HotUpdateResultAction
                        {
                            LatestPrices = quote.Prices
                        });
                    }
                    else
                    {
						// unknown?
                    }
                });
            }

			await base.OnInitializedAsync();
        }

		/// <summary>
		/// Executes any supporting JavaScript required for Middleware
		/// </summary>
		protected override async Task OnAfterRenderAsync(bool firstRender)
		{
			await base.OnAfterRenderAsync(firstRender);
			if (firstRender)
			{
				try
				{
                    Dispatcher.Dispatch(new HotUpdateAction());
				}
				catch (Exception err)
				{
					throw new StoreInitializationException("AppGlobal error", err);
				}
			}
		}

    }
}
