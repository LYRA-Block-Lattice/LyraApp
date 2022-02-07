using Lyra.Core.API;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserLibrary.Data
{
    public class UserStats
    {
        public string UserName { get; set; } = null!;
        public int Total { get; set; }
        public decimal Ratio { get; set; }
    }
}
