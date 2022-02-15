using Fluxor;
using Lyra.Core.Accounts;
using Lyra.Core.Blocks;
using Lyra.Data.Blocks;
using System.Collections.Generic;

namespace Nebula.Store.WebWalletUseCase
{
	public enum UIStage { Entry, Main, Send, Settings, Transactions, FreeToken, SwapToken, SwapTLYR, Staking, DEX };

	[FeatureState]
	public class WebWalletState
	{
		public bool PendingRecv { get; set; } = false;
		public int PendingRecvCount { get; set; }
		public bool IsBackuped { get; set; } = true;
		public string Title { get; set; }
		public bool MenuNew { get; set; }
		private const string faucetKey = "freeLyraToken";
		// for faucet
		public int? freeTokenTimes { get; set; }

		public string error { get; set; }

		// staking
		public List<TransactionBlock> stkAccounts { get; set; }
		public List<ProfitingGenesis> pftAccounts { get; set; }
		public Dictionary<string, decimal> stkBalances { get; set; }
		public Dictionary<string, decimal> stkRewards { get; set; }

		public decimal pendingFunds { get; set; }
		public decimal pendingFees { get; set; }

		public bool IsLoading { get; set; }
		public UIStage stage { get; set; } = UIStage.Entry;
		public bool IsOpening { get; set; } = false;
		public Wallet wallet { get; set; } = null;
		public string balanceString { get; set; } = "<empty>";
		public List<string> txs { get; set; } = null;
		public decimal faucetBalance { get; set; } = 0m;
		public bool freeTokenSent { get; set; } = false;

		public bool ValidReCAPTCHA { get; set; } = false;

		public bool ServerVerificatiing { get; set; } = false;

		public bool DisablePostButton => !ValidReCAPTCHA || ServerVerificatiing;

		public bool LastOperationIsSuccess { get; set; }
		public string Message { get; set; }
	}
}
