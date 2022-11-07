using Blazored.LocalStorage;
using Fluxor;
using Lyra.Core.API;
using Lyra.Data.API;
using Lyra.Data.Crypto;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.SignalR.Client;
using MudBlazor;
using MudBlazor.Services;
using System.Globalization;
using UserLibrary.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();
builder.Services.AddServerSideBlazor();
builder.Services.AddCors();
builder.Services.AddHttpClient();

builder.Services.AddLocalization(options =>
{
    options.ResourcesPath = "Resources";
});

Signatures.Switch(true);

builder.Services.AddBlazoredLocalStorage();
var networkid = builder.Configuration["network"];
builder.Services.AddScoped<ILyraAPI>(a => LyraRestClient.Create(networkid, Environment.OSVersion.ToString(), "LyraWebApp", "1.0"));
//builder.Services.AddScoped<DealerClient>(a => new DealerClient(networkid));

var currentAssembly = typeof(Program).Assembly;
var libAssembly = typeof(UserLibrary.Data.WalletView).Assembly;
builder.Services.AddFluxor(options => options.ScanAssemblies(libAssembly, currentAssembly));

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
// manage in app
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

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseCors(builder =>
    builder
    .WithOrigins(
        "https://dealertestnet.lyra.live",
        "https://dealer.lyra.live",
        "https://lyra.live",
        "https://apptestnet.lyra.live",
        "https://app.lyra.live",
        "https://starttestnet.lyra.live",
        "https://start.lyra.live")
    .AllowAnyOrigin()
    .AllowAnyHeader()
    .AllowAnyMethod()
    );

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseRouting();
// must follow router immediately
app.UseRequestLocalization(new RequestLocalizationOptions
    {
        ApplyCurrentCultureToResponseHeaders = true,
    }
    .AddSupportedCultures(new[] { "en-US", "zh-CN" })
    .AddSupportedUICultures(new[] { "en-US", "zh-CN" })
    );

app.MapBlazorHub();
app.MapFallbackToPage("/_Host");

app.Run();
