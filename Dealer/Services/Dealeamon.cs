using Lyra.Core.API;
using Lyra.Core.Blocks;
using Lyra.Data.API;
using Lyra.Data.API.WorkFlow;
using Microsoft.AspNetCore.SignalR;
using UserLibrary.Data;

namespace Dealer.Server.Services
{
    public class PendingMessage
    {
        public string groupName { get; set; }
        public object Response { get; set; }
    }
    public class Dealeamon
    {
        DealerDb _db;
        public Dealeamon(DealerDb db)
        {
            _db = db;
        }

        public async Task<PendingMessage[]> WorkflowFinished(WorkflowEvent wfevt)
        {
            return new PendingMessage[0];
        }
    }
}
