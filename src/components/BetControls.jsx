import { CircleDollarSign, Loader2 } from "lucide-react";

export const BetControls = ({
  balance,
  betAmount,
  setBetAmount,
  profitOnWin,
  setProfitOnWin,
  placeBet,
  isLoading,
  account,
  activeChain,
}) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <label className="text-gray-400">Bet Amount</label>
        <span className="text-gray-400 flex gap-1 items-center">
          <CircleDollarSign size={20} /> {balance ? balance.toFixed(2) : "0"} Gwei
        </span>
      </div>
      <div className="flex">
        <div className="flex-1 bg-slate-900 rounded-l-md border border-slate-700 flex items-center">
          <input
            type="number"
            min={0}
            max={balance}
            value={betAmount}
            onChange={(e) => {
              if (e.target.value < balance) {
                setBetAmount(e.target.value);
                setProfitOnWin(e.target.value * 2);
              }
            }}
            className="w-full bg-transparent px-4 py-3 outline-none"
          />
          <div className="px-2">
            <span className="flex items-center justify-center w-6 h-6 bg-yellow-500 rounded-full text-black text-xs">
              <CircleDollarSign size={20} />
            </span>
          </div>
        </div>
        <button className="px-4 py-3 bg-slate-700 rounded-r-md border border-slate-600">
          2×
        </button>
      </div>

      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <label className="text-gray-400">Profit on Win</label>
        </div>
        <div className="flex bg-slate-700 rounded-md border border-slate-600">
          <input
            type="number"
            value={profitOnWin}
            className="w-full bg-transparent px-4 py-3 outline-none"
            disabled
          />
          <div className="px-4 flex items-center">
            <span className="flex items-center justify-center w-6 h-6 bg-yellow-500 rounded-full text-black text-xs">
              <CircleDollarSign size={20} />
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={placeBet}
        className={`w-full py-4 ${
          !account.isConnected ||
          betAmount <= 0 ||
          activeChain != account.chain.id
            ? "bg-green-600 text-neutral-300"
            : "bg-green-500 cursor-pointer text-white"
        }  hover:bg-green-600  font-medium rounded-md transition-all`}
        disabled={
          !account.isConnected ||
          betAmount <= 0 ||
          activeChain != account.chain.id
        }
      >
        {isLoading ? (
          <div className="w-full h-full flex justify-center items-center ">
            <Loader2 className="animate-spin" />
          </div>
        ) : account.isConnected ? (
          activeChain == account.chain.id ? (
            "Bet"
          ) : (
            "change the chain"
          )
        ) : (
          "Please connect wallet"
        )}
      </button>
    </div>
  );
};