import { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useBalance } from "wagmi";
import { contractABI, contractAddresses, hashURLs } from "@/lib/contractData";
import { ethers } from "ethers";
import { Header } from "./components/Header";
import { BetControls } from "./components/BetControls";
import { GameHistory } from "./components/GameHistory";
import { SliderSection } from "./components/SliderSection";
import { BottomControls } from "./components/BottomControls";
import { toast } from "sonner";
import { Toaster } from "./components/ui/sonner";

export default function App() {
	const account = useAccount();
	const balanceObj = useBalance({ address: account.address });
	const [balance, setBalance] = useState(null);
	const [betAmount, setBetAmount] = useState(0);
	const [profitOnWin, setProfitOnWin] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [activeChain, setActiveChain] = useState(null);
	const [contractAddress, setContractAddress] = useState(
		contractAddresses.sepolia
	);
	const [gameResults, setGameResults] = useState([]);
	const [rolledNumber, setRolledNumber] = useState(null);
	const [recentTransactions, setRecentTransactions] = useState([]);

	const handleBlockchainChange = (event) => {
		const selectedChain = event.target.value;
		setActiveChain(selectedChain);
		setContractAddress(contractAddresses[selectedChain]);
		console.log(contractAddresses[selectedChain]);
	};

	const placeBet = async () => {
		if (!window.ethereum) return alert("Please install MetaMask!");
		if (!betAmount || betAmount <= 0) return alert("Enter a valid bet amount!");

		setIsLoading(true);
		try {
			console.log(contractAddress, contractABI);
			const provider = new ethers.BrowserProvider(window.ethereum);
			const signer = await provider.getSigner();
			const contract = new ethers.Contract(
				contractAddress,
				contractABI,
				signer
			);

			const tx = await contract.placeBet({
				value: ethers.parseUnits(betAmount.toString(), "gwei"),
			});

			console.log("Transaction Sent! Hash:", tx.hash);

			setRecentTransactions((prev) => [
				{
					hash: tx.hash,
					url: `${hashURLs[account.chain.id]}${tx.hash}`, // Generate the URL based on the chain
					status: "pending",
				},
				...prev,
			]);

			const receipt = await tx.wait();
			console.log("Transaction Confirmed!", receipt);

			setRecentTransactions((prev) =>
				prev.map((t) => (t.hash === tx.hash ? { ...t, status: "success" } : t))
			);

			receipt.logs.forEach((log) => {
				try {
					const parsedLog = contract.interface.parseLog(log);
					if (parsedLog.name === "BetPlaced") {
						console.log(
							`BetPlaced: Player=${parsedLog.args.player}, Amount=${parsedLog.args.betAmount}`
						);
					}
					if (parsedLog.name === "DiceRolled") {
						console.log(
							`DiceRolled: Player=${parsedLog.args.player}, Result=${parsedLog.args.result}, Win=${parsedLog.args.win}`
						);
						setRolledNumber(Number(parsedLog.args.result));
						setGameResults((prev) => [...prev, parsedLog.args.win ? 1 : 0]);
					}
				} catch (error) {
					console.log("Log parsing error:", error);
					setRecentTransactions((prev) =>
						prev.map((t) =>
							t.hash === tx.hash ? { ...t, status: "failed" } : t
						)
					);
				}
			});
			balanceObj.refetch();
		} catch (error) {
			if (error.reason != "rejected") {
				toast("Bet Placement Failed", {
					description: "Please try again",
					action: {
						label: "Close",
					},
					classNames: "bg-slate-100",
				});
			} else {
				toast("You Rejected The Transaction.", {
					description: "Please try again",
					action: {
						label: "Close",
					},
					classNames: "bg-slate-100",
				});
			}
			console.error("Bet placement failed:", error);
		}
		setIsLoading(false);
	};

	useEffect(() => {
		if (account.isConnected) {
			if (account.chain) {
				setActiveChain(account.chain.id);
				setContractAddress(contractAddresses[account.chain.id]);
			}
		}
	}, [account]);

	useEffect(() => {
		if (balanceObj.isFetched) {
			setBalance(parseFloat(Number(balanceObj.data.value) / 10 ** 9));
		}
	}, [balanceObj]);

	return (
		<div className="flex flex-col lg:flex-row w-full min-h-screen bg-slate-900 text-white">
			{/* Left Panel */}
			<div className="w-full lg:w-[400px] p-6 bg-slate-800 border-r border-slate-700">
				<Header
					activeChain={activeChain}
					handleBlockchainChange={handleBlockchainChange}
				/>

				<BetControls
					balance={balance}
					betAmount={betAmount}
					setBetAmount={setBetAmount}
					profitOnWin={profitOnWin}
					setProfitOnWin={setProfitOnWin}
					placeBet={placeBet}
					isLoading={isLoading}
					account={account}
					activeChain={activeChain}
				/>

				<GameHistory gameResults={gameResults} />
			</div>
			{/* Right Panel */}
			<div className="flex-1 p-6 flex flex-col gap-16">
				<div className="w-full flex justify-end">
					<ConnectButton />
				</div>

				{/* Slider Section */}
				<SliderSection rolledNumber={rolledNumber} />

				{/* Bottom Controls */}
				<BottomControls recentTransactions={recentTransactions} />
				<Toaster />
			</div>
		</div>
	);
}
