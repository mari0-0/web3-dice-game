import { Dices } from "lucide-react";
import { useChains } from "wagmi";

export const Header = ({ activeChain, handleBlockchainChange }) => {
  const chains = useChains();

  return (
    <>
      <h1 className="mb-6 font-bold text-2xl flex items-center justify-center gap-1">
        <Dices /> DICE GAME
      </h1>

      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <label className="text-gray-400">Blockchain</label>
        </div>
        <div className="flex pr-4 bg-slate-900 rounded-md border border-slate-600">
          <select
            value={activeChain}
            onChange={handleBlockchainChange}
            className="w-full px-3 py-3 rounded-md outline-none text-white bg-slate-900"
          >
            {chains.map((chain) => (
              <option
                key={chain.id}
                value={chain.id}
                className="bg-slate-800 text-white"
              >
                {chain.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};
