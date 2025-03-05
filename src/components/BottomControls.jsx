import { ScrollArea } from "./ui/scroll-area";

export const BottomControls = ({ recentTransactions }) => {
	return (
		<div className="p-4 pt-3 grid grid-cols-1 gap-4 mt-auto bg-slate-800 rounded-sm">
			<div>
				<label className="block text-gray-400 mb-2">Recent Transactions</label>
				<ScrollArea className="bg-slate-900 border border-slate-700 rounded-md">
					<div className="flex flex-col max-h-48">
						{recentTransactions.length === 0 ? (
							<p className="text-gray-400 px-4 py-3">No recent transactions</p>
						) : (
							recentTransactions.map((tx, index) => (
								<a
									key={index}
									href={tx.url}
									target="_blank"
									rel="noopener noreferrer"
									className="px-4 py-3 text-blue-400 hover:text-blue-300 transition-colors"
								>
									<div className="flex justify-between items-center">
										<span className="truncate">{tx.hash}</span>
										<span
											className={`text-sm ${
												tx.status === "success"
													? "text-green-500"
													: tx.status === "failed"
													? "text-red-500"
													: "text-yellow-500"
											}`}
										>
											{tx.status === "success" ? `Tx ${tx.status}` : ""}
										</span>
									</div>
								</a>
							))
						)}
					</div>
				</ScrollArea>
			</div>
		</div>
	);
};
