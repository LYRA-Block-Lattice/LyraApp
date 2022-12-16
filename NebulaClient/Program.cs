using Blazored.LocalStorage;
using Fluxor;
using Lyra.Core.API;
using Lyra.Data.API;
using Lyra.Data.Crypto;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.AspNetCore.SignalR.Client;
using MudBlazor;
using MudBlazor.Services;
using LyraWebPWA;
using UserLibrary.Data;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.Services.AddHttpClient();

builder.Services.AddLocalization(options =>
{
    options.ResourcesPath = "Resources";
});

builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });

Signatures.Switch(true);

builder.Services.AddCertificateManager();
builder.Services.AddBlazoredLocalStorage();
var networkid = builder.Configuration["network"];
builder.Services.AddScoped<ILyraAPI>(a => LyraRestClient.Create(networkid, Environment.OSVersion.ToString(), "Nebula", "1.0"/*, $"http://nebula.{networkid}.lyra.live:{Neo.Settings.Default.P2P.WebAPI}/api/Node/"*/));
//builder.Services.AddScoped<DealerClient>(a => new DealerClient(networkid));

var currentAssembly = typeof(Program).Assembly;
var libAssembly = typeof(UserLibrary.Data.WalletView).Assembly;
var blAssembly = typeof(BusinessLayer.ReactProxy).Assembly;
builder.Services.AddFluxor(options => options.ScanAssemblies(blAssembly, libAssembly, currentAssembly));

builder.Services.AddMudServices(config =>
{
    config.SnackbarConfiguration.PositionClass = Defaults.Classes.Position.BottomCenter;

    config.SnackbarConfiguration.PreventDuplicates = false;
    config.SnackbarConfiguration.NewestOnTop = false;
    config.SnackbarConfiguration.ShowCloseIcon = true;
    config.SnackbarConfiguration.VisibleStateDuration = 10000;
    config.SnackbarConfiguration.HideTransitionDuration = 500;
    config.SnackbarConfiguration.ShowTransitionDuration = 500;
    config.SnackbarConfiguration.SnackbarVariant = Variant.Filled;
});

builder.Services.AddTransient<NebulaConsts>();

// Register a preconfigure SignalR hub connection.
// Note the connection isnt yet started, this will be done as part of the App.razor component
// to avoid blocking the application startup in case the connection cannot be established
//builder.Services.AddSingleton<HubConnection>(sp => {
//    var eventUrl = "https://dealer.devnet.lyra.live:7070/hub";
//    if (networkid == "testnet")
//        eventUrl = "https://dealertestnet.lyra.live/hub";
//    else if (networkid == "mainnet")
//        eventUrl = "https://dealer.lyra.live/hub";
//    var hub = ConnectionFactoryHelper.CreateConnection(new Uri(eventUrl));

//    return hub;
//});

builder.Services.AddSingleton<DealerConnMgr>();

await builder.Build().RunAsync();
