using Fluxor;
using Fluxor.Blazor.Web.Components;
using Microsoft.AspNetCore.Components;
using Nebula.Store.WebWalletUseCase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserLibrary.Data
{
    public class PageWithContextMenu : FluxorComponent
    {
        protected string _title = "Lyra App";

        [Inject]
        private IDispatcher Dispatcher { get; set; }

        protected override void OnAfterRender(bool firstRender)
        {
            if(firstRender)
            {
                Dispatcher.Dispatch(new WebWalletChangeTitleAction
                {
                    title = _title,
                    menus = CreateContextMenu()
                });
            }

            base.OnAfterRender(firstRender);
        }

        protected virtual Dictionary<string, string> CreateContextMenu()
        {
            return null;
        }
    }

}
