using Lyra.Core.API;
using Lyra.Data.API;
using Lyra.Data.API.WorkFlow;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserLibrary.Data
{
    public class UPOTCOrders
    {
        public ContainerAPIResult container { get; set; } = null!;
        public List<UserStats> users { get; set; } = null!;
    }
}
