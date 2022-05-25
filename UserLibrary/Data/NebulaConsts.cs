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
                "LDLrHpTVqzV1wMX4Bqrt1LJNiWymdeURUWV2paBUKAvisiUv6ojM1mig9YrAPNMwhxXy2X43gFxgEFTfuRDgkRTYmoRbvr"
                },
            _ => new string[] { },
        };            
    }
}
