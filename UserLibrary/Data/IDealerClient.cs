using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserLibrary.Data
{
    // Define the hub methods
    //public interface IDealerClientxxx
    //{
    //    Task Publish(string user, string message);
    //    Task History(List<string> messages);
    //    Task Whisper(string message);

    //    Task OnPublish(string user, string message);
    //}

    public class FooData
    {
        public string FooPayload { get; set; }
    }

    public class BarData
    {
        public double Number { get; set; }
        public double Cost { get; set; }
    }

    public class BarResult
    {
        public string Id { get; set; }
    }

    /// <summary> SignalR Hub push interface (signature for Hub pushing notifications to Clients) </summary>
    public interface IHubPushMethods
    {
        Task OnFoo(FooData fodData);
        Task OnBar(string id, BarData barData);
    }

    /// <summary> SignalR Hub invoke interface (signature for Clients invoking methods on server Hub) </summary>
    public interface IHubInvokeMethods
    {
        Task InvokeFoo(string payload);
        Task<BarResult> InvokeBar(double number, double cost);
    }
}
