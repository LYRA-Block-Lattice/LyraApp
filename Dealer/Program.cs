using Dealer.Server.Hubs;
using Dealer.Server.Model;
using Dealer.Server.Services;
using Lyra.Core.API;
using Lyra.Data.API;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.AspNetCore.SignalR;
using RestSharp;
using Serilog;
using Serilog.Events;
using System.Net;

var config = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json", optional: false)
    .Build();

var path = config.GetValue<string>("logPath");

Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
    .Enrich.FromLogContext()
    .WriteTo.File(path)
    .CreateLogger();

var builder = WebApplication.CreateBuilder(args);
builder.Configuration.AddEnvironmentVariables(prefix: "DEALER_");

builder.Logging.AddSerilog(Log.Logger);

builder.Services.Configure<DealerDbSettings>(
    builder.Configuration.GetSection("DealerDb"));

builder.Services.AddScoped<ILyraAPI>(provider =>
                {
                    var networkid = builder.Configuration["network"];
                    var nodeAddr = builder.Configuration["lyraNode"];
                    
                    string url;
                    if (networkid == "mainnet")
                        url = $"https://mainnet.lyra.live/api/Node/";
                    else if (networkid == "testnet")
                        url = $"https://testnet.lyra.live/api/Node/";
                    else
                        url = $"https://devnet.lyra.live/api/Node/";

                    if (!string.IsNullOrWhiteSpace(nodeAddr))
                    {
                        url = $"https://{nodeAddr}/api/Node/";
                        return LyraRestClient.Create(networkid, Environment.OSVersion.ToString(), "Dealer", "1.0", url);
                    }

                    var lcx = LyraRestClient.Create(networkid, Environment.OSVersion.ToString(), "Dealer", "1.0", url);
                    return lcx;
                });

// Add services to the container.
builder.Services.AddSingleton<DealerDb>();
builder.Services.AddSignalR(hubOptions =>
    {
        //hubOptions.AddFilter<SigFilter>();      //https://docs.microsoft.com/en-us/aspnet/core/signalr/hub-filters?view=aspnetcore-6.0
    }
);
//builder.Services.AddSingleton<SigFilter>();
builder.Services.AddTransient<Dealeamon>();

builder.Services.AddControllersWithViews();
builder.Services.AddRazorPages();
builder.Services.AddResponseCompression(opts =>
{
    opts.MimeTypes = ResponseCompressionDefaults.MimeTypes.Concat(
        new[] { "application/octet-stream" });
});

builder.Services.AddSwaggerGen();

var nodeAddr = builder.Configuration["lyraNode"];
var rc = new RestClient($"https://{nodeAddr}/api/EC");
ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;
builder.Services.AddSingleton(rc);

builder.Services.AddSingleton<Keeper>();
builder.Services.AddHostedService<Keeper>(provider => provider.GetService<Keeper>());

var app = builder.Build();

app.UseWebSockets();
app.UseResponseCompression();

if (app.Environment.IsDevelopment())
{
    app.UseWebAssemblyDebugging();
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

//app.UseCors(builder =>
//    builder
//    .WithOrigins(
//        "https://dealertestnet.lyra.live",
//        "https://dealer.lyra.live",
//        "https://localhost:8098",
//        "http://localhost:3000",
//        "https://lyra.live",
//        "https://apptestnet.lyra.live",
//        "https://app.lyra.live"
//        )
//    .AllowAnyOrigin()
//    .AllowAnyHeader()
//    .AllowAnyMethod()
//    );
app.UseCors(x => x
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .SetIsOriginAllowed(origin => true) // allow any origin
                    .AllowCredentials()); // allow credentials

// disable to allow reverse proxy
//app.UseHttpsRedirection();
app.UseBlazorFrameworkFiles();
app.UseStaticFiles();

app.UseRouting();

//app.UseAuthentication();
//app.UseAuthorization();

app.MapRazorPages();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    endpoints.MapHub<DealerHub>("/hub");
});

app.MapFallbackToFile("index.html");

app.Run();
