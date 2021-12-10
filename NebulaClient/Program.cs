using Blazored.LocalStorage;
using Blazorise;
using Blazorise.Bootstrap5;
using Blazorise.Icons.FontAwesome;
using Fluxor;
using Lyra.Core.API;
using Lyra.Data.API;
using Lyra.Data.Crypto;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using NebulaClient;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });

Signatures.Switch(true);

builder.Services.AddBlazoredLocalStorage();
var networkid = builder.Configuration["network"];
builder.Services.AddTransient<ILyraAPI>(a => LyraRestClient.Create(networkid, Environment.OSVersion.ToString(), "Nebula", "1.0"/*, $"http://nebula.{networkid}.lyra.live:{Neo.Settings.Default.P2P.WebAPI}/api/Node/"*/));

builder.Services.AddBlazorise(options =>
{
	options.ChangeTextOnKeyPress = true; // optional
})
  .AddBootstrap5Providers()
  .AddFontAwesomeIcons();

var currentAssembly = typeof(Program).Assembly;
var libAssembly = typeof(UserLibrary.Data.WalletView).Assembly;
builder.Services.AddFluxor(options => options.ScanAssemblies(libAssembly, currentAssembly));

await builder.Build().RunAsync();
