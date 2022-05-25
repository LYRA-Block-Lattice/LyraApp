using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserLibrary.Data
{
    public class NebulaConsts
    {
        IConfiguration _config { get; init; }
        public NebulaConsts(IConfiguration configuration)
        {
            _config = configuration;
        }
        public string NebulaStorName => $"nebdat_{_config["network"]}";
        public string ContactStorName => $"nebcontacts_{_config["network"]}";

        public string[] TrustedDealerIds => _config["network"] switch
        {
            "devnet" => new[]
                {
                "L9vh5kuijpaDiqYAaHoV6EejAL3qUXF15JrSR1LvHien3h4fHR3B9p65ubF9AgQnnMzUxdLbDTPtjwpbxB5SPPtSaF4wMr"
                //"LDLRr2a1TUgV6ccaoP3tKh9LuarGq3Ksxi7RKWnXv6zmPoNqjXDK2MxL81xP99aVDtMDCvUVtAw7BLUXUnUKuqGk9aSYHP"
                },
            _ => new string[] { },
        };            
    }
}
