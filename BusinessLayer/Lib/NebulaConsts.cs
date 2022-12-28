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
                "LACRviH1gA4Zhwk2UkGdtBG5Z9TMSqSwJiij3yMvdL3ERWb5sUNLrRtRiw4ZjGbwRtiBYbGFexLsSAWL77ePD8nctuKfY5",
                "L9ZapWEuzZH9nqD6qYEyTYsGKRa3Rif9foEMLC7VNaWcqRQQX41HLdXev6V5TR4ZMWoSWCSTz9pEHh4U8gG1H6HruyC5sC",
                "LACowvdpyLCZBBw12aUV7Yvse3yCqApMsuwPbrhwCK1AShqreQpwMdahX5rKrMYQ9EiURaCUxp7o8ESmZNeKq8ZogjsDZH"
                //"LEn8GndA1k4QJQ7jNp6Nm71DuQCnZLcCuTZcqSBaA8KS1Jm8RPixwrK79814gcGRXDW1Cf7Vh9fcyqah39ZDBPhtrgq2ew"
                },
            _ => throw new Exception($"unknown network id: {_config["network"]}")
        };            
    }
}
