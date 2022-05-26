using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserLibrary.Data
{
    public class PreferenceContainer
    {
        public string PriceFeedingDealerID { get; set; }
        public List<string> PublicTrustedDealerIDs { get; set; }
        public List<string> PrivateTrustedDealerIDs { get; set; }

        public List<string> GetAllTrusted() => PublicTrustedDealerIDs.Concat(PrivateTrustedDealerIDs).ToList();
    }
}
