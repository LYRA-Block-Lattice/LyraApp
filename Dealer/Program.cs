using Dealer.Server.Hubs;
using Dealer.Server.Model;
using Dealer.Server.Services;
using Lyra.Core.API;
using Lyra.Data.API;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.AspNetCore.SignalR;
using Serilog;
using Serilog.Events;

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
builder.Logging.AddSerilog(Log.Logger);

builder.Services.Configure<DealerDbSettings>(
    builder.Configuration.GetSection("DealerDb"));

builder.Services.AddTransient<ILyraAPI>(provider =>
                {
                    var networkid = builder.Configuration["network"];
                    var url = $"https://seed1.testnet.lyra.live:4504/api/Node/";
                    if (networkid == "mainnet")
                        url = $"https://seed1.mainnet.lyra.live:5504/api/Node/";
                    else if (networkid == "devnet")
                        url = $"https://devnet.lyra.live:4504/api/Node/";

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
builder.Services.AddHostedService<Keeper>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    builder.WithOrigins(
        "https://localhost:8098",
        "https://lyra.live",
        "https://apptestnet.lyra.live",
        "https://app.lyra.live"
        )
    .AllowAnyHeader()
    .AllowAnyMethod());
});

var app = builder.Build();

app.UseResponseCompression();

if (app.Environment.IsDevelopment())
{
    app.UseWebAssemblyDebugging();
}
else
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseBlazorFrameworkFiles();
app.UseStaticFiles();

app.UseRouting();
app.UseCors();

//app.UseAuthentication();
//app.UseAuthorization();

app.MapRazorPages();
app.MapControllers();
app.UseEndpoints(endpoints =>
{
    endpoints.MapHub<DealerHub>("/hub");
});

app.MapFallbackToFile("index.html");

app.Run();
