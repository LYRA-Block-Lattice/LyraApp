using Fluxor;
using Fluxor.Exceptions;
using Microsoft.AspNetCore.Components;
using Microsoft.Extensions.Configuration;
using Microsoft.JSInterop;
using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserLibrary.Data
{
	public class JobExecutedEventArgs : EventArgs
	{
		public Dictionary<string, decimal> prices { get; set; }
	}

	/// <summary>
	/// Initializes the store for the current user. This should be placed in the App.razor component.
	/// </summary>
	public class AppGlobal : ComponentBase
	{
		[Inject]
		private IStore Store { get; set; }

		[Inject]
		IDispatcher _dispatcher { get; set; }

		[Inject]
		private IConfiguration Configuration { get; set; }

		[Inject] ConnectionMethodsWrapper wrapper { get; set; }

		private string MiddlewareInitializationScripts;
		private bool Disposed;
		private Exception ExceptionToThrow;

        /// <summary>
        /// Retrieves supporting JavaScript for any Middleware
        /// </summary>
        protected override async Task OnInitializedAsync()
        {
			if(!wrapper.IsStarted)
            {
				await wrapper.StartAsync();
			}

			await base.OnInitializedAsync();
        }

        protected override void OnAfterRender(bool firstRender)
		{
			base.OnAfterRender(firstRender);
			if (ExceptionToThrow is not null)
			{
				Exception exception = ExceptionToThrow;
				ExceptionToThrow = null;
				throw exception;
			}

			if(firstRender)
            {

			}
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

				}
				catch (Exception err)
				{
					throw new StoreInitializationException("AppGlobal error", err);
				}
			}
		}

    }
}
