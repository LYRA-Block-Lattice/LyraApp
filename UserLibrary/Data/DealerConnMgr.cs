using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Net;
using System.Reflection;
using System.Threading.Tasks;
using Lyra.Core.API;
using Lyra.Data.API;
using Microsoft.AspNetCore.SignalR.Client;
using Microsoft.Extensions.Configuration;

namespace UserLibrary.Data
{
    public class DealerConnMgr : IAsyncDisposable
    {
        // dealerID -> hub's connectionID
        private Dictionary<string, HubConnection> _conns;
        private Dictionary<string, DealerClient> _dealerClients;
        string _priceFeeder;

        IConfiguration _config;

        private static bool _started = false;

        public bool IsStarted => _started;
        public DealerConnMgr(IConfiguration config)
        {
            _config = config;

            _conns = new Dictionary<string, HubConnection>();
            _dealerClients = new Dictionary<string, DealerClient>();
        }

        private HubConnection CreateConnection(Uri url)
            => new HubConnectionBuilder()
                .WithUrl(url, options =>
                {
                    options.HttpMessageHandlerFactory = (message) =>
                    {
                        if (message is HttpClientHandler clientHandler)
                            if (Environment.OSVersion.Platform == PlatformID.Win32NT)
                            {
                                // always verify the SSL certificate
                                clientHandler.ServerCertificateCustomValidationCallback +=
                                    (sender, certificate, chain, sslPolicyErrors) => { return true; };
                            }
                        return message;
                    };
                })
                .WithAutomaticReconnect()
                .Build();

        public async Task SwitchDealerAsync(Dictionary<string, Uri> dealers, string priceFeederID)
        {
            _priceFeeder = priceFeederID;
            foreach(var conn in _conns.Values)
            {
                if (conn.State == HubConnectionState.Connected)
                {
                    await conn.StopAsync();
                    await conn.DisposeAsync();
                }
            }
            _conns.Clear();
            _dealerClients.Clear();

            foreach(var kvp in dealers)
            {
                var conn = CreateConnection(new Uri(kvp.Value, "/hub"));
                _conns.Add(kvp.Key, conn);

                var dc = new DealerClient(new Uri(kvp.Value, "/api/dealer/"));
                _dealerClients.Add(kvp.Key, dc);

                conn.Closed += _connection_Closed;
                conn.Reconnected += _connection_Reconnected;
                conn.Reconnecting += _connection_Reconnecting;

                try
                {
                    await conn.StartAsync();
                }
                catch { }
            }            
        }

        public DealerClient GetDealer()
        {
            return _dealerClients[_priceFeeder];
        }
        public DealerClient GetDealer(string dealerId)
        {
            if (string.IsNullOrEmpty(dealerId))
                return GetDealer();

            return _dealerClients[dealerId];
        }

        private Task _connection_Reconnecting(Exception? arg)
        {
            Console.WriteLine($"Reconnecting: {arg}");
            return Task.CompletedTask;
        }

        private Task _connection_Reconnected(string? arg)
        {
            Console.WriteLine($"Reconnected: {arg}");
            return Task.CompletedTask;
        }

        private Task _connection_Closed(Exception? arg)
        {
            Console.WriteLine($"Connection closed. {arg?.Message}");
            return Task.CompletedTask;
        }

        public void RegisterOnChat(Action<RespContainer> msg)
        {
            foreach (var conn in _conns.Values)
            {
                conn.BindOnInterface(x => x.OnChat, msg);
            }
        }

        public void RegisterOnEvent(Action<NotifyContainer> msg)
        {
            foreach (var kvp in _conns)
            {
                if(kvp.Key == _priceFeeder)
                    kvp.Value.BindOnInterface(x => x.OnEvent, msg);
            }
        }

        public void RegisterOnPinned(Action<PinnedMessage> msg)
        {
            foreach (var conn in _conns.Values)
            {
                conn.BindOnInterface(x => x.OnPinned, msg);
            }
        }

        public bool IsConnected => _conns[_priceFeeder].State == HubConnectionState.Connected;

        public async ValueTask DisposeAsync()
        {
            foreach(var conn in _conns.Values)
            {
                await conn.DisposeAsync();
            }
        }

        public async Task Join(JoinRequest req)
        {
            foreach(var conn in _conns.Values)
            {
                await conn.InvokeAsync(nameof(IHubInvokeMethods.Join), req);
            }
        }

        public async Task Leave(JoinRequest req)
        {
            foreach (var conn in _conns.Values)
            {
                await conn.InvokeAsync(nameof(IHubInvokeMethods.Leave), req);
            }
        }

        public Task Chat(string dealerId, ChatMessage msg)
        {
            if (!_conns.ContainsKey(dealerId ?? _priceFeeder))
                throw new InvalidDataException("Dealer not exists in list.");

            return _conns[dealerId ?? _priceFeeder].InvokeAsync(nameof(IHubInvokeMethods.Chat), msg);
        }

        public Task SendFile(string dealerId, FileMessage msg)
        {
            if (!_conns.ContainsKey(dealerId ?? _priceFeeder))
                throw new InvalidDataException("Dealer not exists in list.");

            return _conns[dealerId ?? _priceFeeder].InvokeAsync(nameof(IHubInvokeMethods.SendFile), msg);
        }

        public Task<JoinRoomResponse> JoinRoom(string dealerId, JoinRoomRequest req)
        {
            if (!_conns.ContainsKey(dealerId ?? _priceFeeder))
                throw new InvalidDataException("Dealer not exists in list.");

            return _conns[dealerId ?? _priceFeeder].InvokeAsync<JoinRoomResponse>(nameof(IHubInvokeMethods.JoinRoom), req);
        }
    }

    /// <summary> Extension class enables Client code to bind onto the method names and parameters on <see cref="IHubPushMethods"/> with a guarantee of correct method names. </summary>
    public static class HubConnectionBindExtensions
    {
        public static IDisposable BindOnInterface<T>(this HubConnection connection, Expression<Func<IHubPushMethods, Func<T, Task>>> boundMethod, Action<T> handler)
            => connection.On<T>(_GetMethodName(boundMethod), handler);

        public static IDisposable BindOnInterface<T1, T2>(this HubConnection connection, Expression<Func<IHubPushMethods, Func<T1, T2, Task>>> boundMethod, Action<T1, T2> handler)
            => connection.On<T1, T2>(_GetMethodName(boundMethod), handler);

        public static IDisposable BindOnInterface<T1, T2, T3>(this HubConnection connection, Expression<Func<IHubPushMethods, Func<T1, T2, T3, Task>>> boundMethod, Action<T1, T2, T3> handler)
            => connection.On<T1, T2, T3>(_GetMethodName(boundMethod), handler);

        private static string _GetMethodName<T>(Expression<T> boundMethod)
        {
            var unaryExpression = (UnaryExpression)boundMethod.Body;
            var methodCallExpression = (MethodCallExpression)unaryExpression.Operand;
            var methodInfoExpression = (ConstantExpression)methodCallExpression.Object;
            var methodInfo = (MethodInfo)methodInfoExpression.Value;
            return methodInfo.Name;
        }
    }
}
