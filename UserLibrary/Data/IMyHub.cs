using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserLibrary.Data
{
    // Define the hub methods
    public interface IMyHub
    {
        Task Publish(string user, string message);
        Task History(List<string> messages);
        Task Whisper(string message);

        Task OnPublish(string user, string message);
    }
}
