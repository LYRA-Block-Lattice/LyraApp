using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Net;
using System.Reflection;
using System.Threading.Tasks;
using Lyra.Core.API;
using Microsoft.AspNetCore.SignalR.Client;

namespace UserLibrary.Data
{
    public class ConnectionFactoryHelper
    {
        public static HubConnection CreateConnection(Uri url, ICollection<Cookie> cookies)
            => new HubConnectionBuilder()
                .WithUrl(url, options =>
                {
                    //foreach (var cookie in cookies)
                    //{
                    //    options.Cookies.Add(cookie);
                    //}
                })
                .Build();
    }

    public class ConnectionMethodsWrapper : IHubInvokeMethods, IAsyncDisposable
    {
        private readonly HubConnection _connection;

        public ConnectionMethodsWrapper(HubConnection connection)
        {
            _connection = connection;
            _connection.Closed += _connection_Closed;
            _connection.Reconnected += _connection_Reconnected;
            _connection.Reconnecting += _connection_Reconnecting;
        }

        public async Task StartAsync()
        {
            await _connection.StartAsync();
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

        public Task InvokeFoo(string payload)
            => _connection.InvokeAsync(nameof(IHubInvokeMethods.InvokeFoo), payload);

        public Task<BarResult> InvokeBar(double number, double cost)
            => _connection.InvokeAsync<BarResult>(nameof(IHubInvokeMethods.InvokeBar), number, cost);

        public IDisposable RegisterOnFoo(Action<FooData> onFoo)
            => _connection.BindOnInterface(x => x.OnFoo, onFoo);

        public IDisposable RegisterOnBar(Action<string, BarData> onBar)
            => _connection.BindOnInterface(x => x.OnBar, onBar);

        public bool IsConnected => _connection.State == HubConnectionState.Connected;

        public ValueTask DisposeAsync()
        {
            return _connection.DisposeAsync();
        }

        public Task<APIResult> JoinRoom(JoinRoomRequest req)
        {
            return _connection.InvokeAsync<APIResult>(nameof(IHubInvokeMethods.JoinRoom), req);
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
