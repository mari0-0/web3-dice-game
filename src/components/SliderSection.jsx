import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Dices } from "lucide-react";
import { useRef } from "react";

export const SliderSection = ({ rolledNumber }) => {
  const dice = useRef(null);

  const diceIcons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];

  const positions = [
    "100%",
    "83.33%",
    "66.66%",
    "33.33%",
    "16.66%",
    "0%",
  ];

  
  useGSAP(() => {
    console.log(rolledNumber)
    if (rolledNumber !== null) {
      gsap.to(dice.current, {
        right: positions[rolledNumber - 1], 
        translateX: positions[rolledNumber - 1], 
        duration: 1, 
        ease: "power2.out", 
      });
    }
  }, [rolledNumber]);

  return (
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
                          after:content-['1'] after:font-semibold after:absolute after:-top-6 after:left-1/2 after:-translate-x-1/2"
            ></div>
            <div
              className=" absolute top-[-20px] right-5/6 translate-x-5/6 w-0 h-0 
                          border-l-[10px] border-l-transparent 
                          border-r-[10px] border-r-transparent 
                          border-b-[10px] border-b-slate-600
                          after:content-['2'] after:font-semibold after:absolute after:-top-6 after:left-1/2 after:-translate-x-1/2"
            ></div>

            <div
              className=" absolute top-[-20px] right-4/6 translate-x-4/6 w-0 h-0 
                          border-l-[10px] border-l-transparent 
                          border-r-[10px] border-r-transparent 
                          border-b-[10px] border-b-slate-600
                          after:content-['3'] after:font-semibold after:absolute after:-top-6 after:left-1/2 after:-translate-x-1/2"
            ></div>
            <div
              className=" absolute top-[-20px] right-2/6 translate-x-3/6 w-0 h-0 
                          border-l-[10px] border-l-transparent 
                          border-r-[10px] border-r-transparent 
                          border-b-[10px] border-b-slate-600
                          after:content-['4'] after:font-semibold after:absolute after:-top-6 after:left-1/2 after:-translate-x-1/2"
            ></div>
            <div
              className=" absolute top-[-20px] right-1/6 -translate-x-2/6 w-0 h-0 
                          border-l-[10px] border-l-transparent 
                          border-r-[10px] border-r-transparent 
                          border-b-[10px] border-b-slate-600
                          after:content-['5'] after:font-semibold after:absolute after:-top-6 after:left-1/2 after:-translate-x-1/2"
            ></div>
            <div
              className=" absolute top-[-20px] right-0 -translate-x-1/2 w-0 h-0 
                          border-l-[10px] border-l-transparent 
                          border-r-[10px] border-r-transparent 
                          border-b-[10px] border-b-slate-600
                          after:content-['6'] after:font-semibold after:absolute after:-top-6 after:left-1/2 after:-translate-x-1/2"
            ></div>
          </>

          {/* Dice */}
          <div
            ref={dice}
            className="w-12 h-12 absolute z-10 -top-1/4 right-1/2 translate-x-1/2 bg-slate-500 rounded-md flex items-center justify-center"
          >
            {rolledNumber === null ? (
              <Dices className="w-full h-full" /> 
            ) : (
              (() => {
                const DiceIcon = diceIcons[rolledNumber - 1];
                return <DiceIcon className="w-full h-full" />;
              })()
            )}
          </div>

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
      </div>
    </div>
  );
};
