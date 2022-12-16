using Microsoft.JSInterop;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer
{
    public class ReactProxy
    {
        [JSInvokable("OpenIt")]
        public static Task<string> OpenIt(string name, string password)
        {
            return Task.FromResult($"wanna open wallet {name} with password {password}?");
        }
    }
}
