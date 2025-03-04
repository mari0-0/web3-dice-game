import { ScrollArea, ScrollBar } from "./ui/scroll-area";

export const GameHistory = ({ gameResults }) => {
  return (
    <div className="mt-12 w-full flex flex-col gap-6">
      <div className="w-full flex flex-col gap-2">
        <div className="w-full flex gap-2 items-center ">
          <div className="w-4 h-4 rounded-sm bg-green-500" />
          <p className="font-semibold text-slate-300">
            Wins : {gameResults.filter((result) => result === 1).length}
          </p>
        </div>
        <div className="w-full flex gap-2 items-center ">
          <div className="w-4 h-4 rounded-sm bg-red-500" />
          <p className="font-semibold text-slate-300">
            Loses : {gameResults.filter((result) => result === 0).length}
          </p>
        </div>
      </div>

      <div className="w-full">
        <h4 className="mb-3 font-semibold text-lg text-slate-300">History</h4>
        <ScrollArea className="w-full h-36">
          <div className="flex flex-wrap gap-2 content-start">
            {gameResults.map((result, i) => (
              <div
                key={i}
                className={`w-4 h-4 rounded-sm ${
                  result === 1 ? "bg-green-500" : "bg-red-500"
                }`}
              />
            ))}
          </div>
          <ScrollBar className="bg-slate-700" />
        </ScrollArea>
      </div>
    </div>
  );
};