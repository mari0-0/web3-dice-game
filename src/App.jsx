import { useEffect, useState } from "react";
import { CircleDollarSign, Dices, Loader2, Percent } from "lucide-react";
import { ScrollArea, ScrollBar } from "./components/ui/scroll-area";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useBalance } from "wagmi";
import { contractABI, contractAddresses } from "@/data";
import { ethers } from "ethers";


const CONTRACT_ADDRESS = contractAddresses.sepolia;
const CONTRACT_ABI = contractABI

export default function App() {
  const account = useAccount();
  const balanceObj = useBalance({
    address: account.address,
  });
  const [balance, setBalance] = useState(null)
  const [betAmount, setBetAmount] = useState(0);
  const [profitOnWin, setProfitOnWin] = useState(0);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (balanceObj.isFetched) {
      setBalance(parseFloat(Number(balanceObj.data.value) / 10 ** 9));
    }
  }, [balanceObj])

  const placeBet = async () => {
    if (!window.ethereum) return alert("Please install MetaMask!");
    if (!betAmount || betAmount <= 0) return alert("Enter a valid bet amount!");

    setIsLoading(true)
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const tx = await contract.placeBet({
        value: ethers.parseUnits(betAmount.toString(), "gwei"),
      });

      console.log("Transaction Sent! Hash:", tx.hash);
      // alert(`Transaction sent! Hash: ${tx.hash}`);

      const receipt = await tx.wait(); // Wait for the transaction to be mined
      console.log("Transaction Confirmed!", receipt);

      // Extract logs from events
      receipt.logs.forEach((log) => {
        try {
          const parsedLog = contract.interface.parseLog(log);
          if (parsedLog.name === "BetPlaced") {
            console.log(`BetPlaced: Player=${parsedLog.args.player}, Amount=${parsedLog.args.betAmount}`);
          }
          if (parsedLog.name === "DiceRolled") {
            console.log(`DiceRolled: Player=${parsedLog.args.player}, Result=${parsedLog.args.result}, Win=${parsedLog.args.win}`);
            alert(`Dice Roll: ${parsedLog.args.result} | ${parsedLog.args.win ? "You won!" : "You lost!"}`);
          }
        } catch (error) {
          console.log("Log parsing error:", error);
        }
      });
      balanceObj.refetch()
    } catch (error) {
      console.error("Bet placement failed:", error);
      alert("Transaction failed!");
    }
    setIsLoading(false)
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-slate-900 text-white">
      {/* Left Panel */}
      <div className="w-full md:w-[400px] p-6 bg-slate-800 border-r border-slate-700">
        <h1 className="mb-6 font-bold text-2xl flex items-center justify-center gap-1">
          <Dices /> DICE GAME
        </h1>

        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <label className="text-gray-400">Blockchain</label>
          </div>
          <div className="flex pr-4 bg-slate-900 rounded-md border border-slate-600">
            <select className="w-full px-3 py-3 rounded-md outline-none  text-white bg-slate-900">
              <option className="bg-slate-800 text-white" value="option1">
                Sepolia
              </option>
              <option className="bg-slate-800 text-white" value="option2">
                Gorelia
              </option>
              <option className="bg-slate-800 text-white" value="option3">
                Polygon
              </option>
            </select>
          </div>
        </div>

        {/* Bet Amount */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <label className="text-gray-400">Bet Amount</label>
            <span className="text-gray-400 flex gap-1 items-center">
              <CircleDollarSign size={20} /> {balance ? balance.toFixed(2) : '0'} Gwei
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
        </div>

        {/* Profit on Win */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <label className="text-gray-400">Profit on Win</label>
          </div>
          <div className="flex bg-slate-700 rounded-md border border-slate-600    ">
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

        {/* Bet Button */}
        <button
          onClick={placeBet}
          className="w-full py-4 bg-green-500 hover:bg-green-600 text-black font-medium rounded-md transition-all"
          disabled={!account.isConnected || betAmount <= 0}
        >
          {isLoading 
          ? (
            <div className="w-full h-full flex justify-center items-center text-white">
              <Loader2 className="animate-spin" />
            </div>) 
            :
            'Bet'}
        </button>

        <div className="mt-12 w-full flex flex-col gap-6">
          <div className="w-full flex flex-col gap-2">
            <div className="w-full flex gap-2 items-center ">
              <div className="w-4 h-4 rounded-sm bg-green-500" />
              <p className="font-semibold text-slate-300">Wins : 12</p>
            </div>
            <div className="w-full flex gap-2 items-center ">
              <div className="w-4 h-4 rounded-sm bg-red-500" />
              <p className="font-semibold text-slate-300">Loses : 12</p>
            </div>
          </div>

          <div className="w-full">
            <h4 className="mb-3 font-semibold text-lg text-slate-300">
              History
            </h4>
            <ScrollArea className="w-full h-36 ">
              <div className="flex flex-wrap gap-2 content-start">
                {Array.from({ length: 140 }).map((_, i) => (
                  <div key={i} className="w-4 h-4 rounded-sm bg-green-500" />
                ))}
              </div>
              <ScrollBar className="bg-slate-700" />
            </ScrollArea>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 p-6 flex flex-col">
        <div className="w-full flex justify-end">
          <ConnectButton />
        </div>
        {/* Slider Section */}
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="relative p-3 w-10/12 bg-slate-600 rounded-full">
            <div className="relative">
              {/* Numbers */}
              <>
                <div
                  className=" absolute top-[-20px] left-0 translate-x-1/2 w-0 h-0 
                          border-l-[10px] border-l-transparent 
                          border-r-[10px] border-r-transparent 
                          border-b-[10px] border-b-slate-600
                          after:content-['1'] after:font-semibold after:absolute after:-top-6 after:left-1/2 after:-translate-x-1/2
                          "
                ></div>
                <div
                  className=" absolute top-[-20px] right-5/6 translate-x-5/6 w-0 h-0 
                          border-l-[10px] border-l-transparent 
                          border-r-[10px] border-r-transparent 
                          border-b-[10px] border-b-slate-600
                          after:content-['2'] after:font-semibold after:absolute after:-top-6 after:left-1/2 after:-translate-x-1/2
                          "
                ></div>

                <div
                  className=" absolute top-[-20px] right-4/6 translate-x-4/6 w-0 h-0 
                          border-l-[10px] border-l-transparent 
                          border-r-[10px] border-r-transparent 
                          border-b-[10px] border-b-slate-600
                          after:content-['3'] after:font-semibold after:absolute after:-top-6 after:left-1/2 after:-translate-x-1/2
                          "
                ></div>
                <div
                  className=" absolute top-[-20px] right-2/6 translate-x-3/6 w-0 h-0 
                          border-l-[10px] border-l-transparent 
                          border-r-[10px] border-r-transparent 
                          border-b-[10px] border-b-slate-600
                          after:content-['4'] after:font-semibold after:absolute after:-top-6 after:left-1/2 after:-translate-x-1/2
                          "
                ></div>
                <div
                  className=" absolute top-[-20px] right-1/6 -translate-x-2/6 w-0 h-0 
                          border-l-[10px] border-l-transparent 
                          border-r-[10px] border-r-transparent 
                          border-b-[10px] border-b-slate-600
                          after:content-['5'] after:font-semibold after:absolute after:-top-6 after:left-1/2 after:-translate-x-1/2
                          "
                ></div>
                <div
                  className=" absolute top-[-20px] right-0 -translate-x-1/2 w-0 h-0 
                          border-l-[10px] border-l-transparent 
                          border-r-[10px] border-r-transparent 
                          border-b-[10px] border-b-slate-600
                          after:content-['6'] after:font-semibold after:absolute after:-top-6 after:left-1/2 after:-translate-x-1/2
                          "
                ></div>
              </>

              {/* Slider Track */}
              <div className="p-3 bg-[#2a3a4a] overflow-hidden relative rounded-xl cursor-pointer flex justify-center items-center">
                <input
                  type="range"
                  min="0"
                  max="100"
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer outline-none transition-all"
                  style={{
                    background: `linear-gradient(to right, #E9113C 50%, #00E701 50%)`,
                  }}
                  disabled
                />
              </div>
            </div>
            {/* Slider Thumb */}
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="p-4 pt-3 grid grid-cols-3 gap-4 mt-auto bg-slate-800 rounded-sm">
          <div>
            <label className="block text-gray-400 mb-2">Win Chance</label>
            <div className="flex bg-slate-900 rounded-md border border-slate-700">
              <input
                type="text"
                value={90}
                className="w-full bg-transparent px-4 py-3 outline-none"
                readOnly
              />
              <div className="px-4 flex items-center">
                <span className="text-gray-400">
                  <Percent size={20} className="text-gray-400" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
