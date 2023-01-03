using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Lib
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
        public string PrefStorName => $"pref_{_config["network"]}";
        public string AccountIdStorName => $"AccountId_{_config["network"]}";

        public string[] TrustedDealerIds => _config["network"] switch
        {
            "mainnet" => new [] 
            {
                "L7hfFpQTndpjUDLwUodRNLbo27BDEu6xPyQF6kcVxHw4u7BamLKXXHB8fnx9mai1mAR725bQd3TeTvkiDDz8KbWsfsYA79"
            },
            "testnet" => new[]
            {
                "L9YsTcVwnff8JgqynoVGnMP2ePfiKPrqiyDEAiVY842pQaC3uxwzK7jyck3JiHw7tBoMS3G4o3EHDESvUb2yodCHNYf9rT"
            },
            "devnet" => new[]
                {
                "LACbpXEdp85NFbyu6gH9Z4XDDHPRdugBXE7dwbomkiUaZoWkitJ1PFP9hTqPc3qdR1d7xo594TST8xQwW5EEfNZgZ2bxru",
                },
            _ => throw new Exception($"unknown network id: {_config["network"]}")
        };            
    }
}
