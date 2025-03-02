"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Percent, RefreshCw, X } from "lucide-react";

export default function App() {
  const [betAmount, setBetAmount] = useState("0.00");
  const [profitOnWin, setProfitOnWin] = useState("0.00");
  const [sliderValue, setSliderValue] = useState(68.71);
  const [mode, setMode] = useState("Manual");
  const [isDragging, setIsDragging] = useState(false);

  const multiplier = ((100 / (100 - sliderValue))).toFixed(4);
  const rollOver = sliderValue.toFixed(2);
  const winChance = (100 - sliderValue).toFixed(4);

  const sliderTrackRef = useRef(null);

  const handleSliderMouseDown = (e) => {
    setIsDragging(true);
    updateSliderValue(e);
  };

  const handleSliderMouseMove = (e) => {
    if (isDragging) {
      updateSliderValue(e);
    }
  };

  const handleSliderMouseUp = () => {
    setIsDragging(false);
  };

  const updateSliderValue = (e) => {
    if (!sliderTrackRef.current) return;

    const rect = sliderTrackRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 2), 98);
    setSliderValue(percentage);
  };

  const smoothSliderValue = (value) => {
    if (value > 50) {
      return value - Math.pow((50 - value) / 50, 2) * 3;
    } else {
      return value + Math.pow((value - 50) / 50, 2) * 3;
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleSliderMouseMove);
      window.addEventListener("mouseup", handleSliderMouseUp);
      window.addEventListener("touchmove", handleSliderMouseMove);
      window.addEventListener("touchend", handleSliderMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleSliderMouseMove);
      window.removeEventListener("mouseup", handleSliderMouseUp);
      window.removeEventListener("touchmove", handleSliderMouseMove);
      window.removeEventListener("touchend", handleSliderMouseUp);
    };
  }, [isDragging, handleSliderMouseMove, handleSliderMouseUp]);

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-slate-900 text-white">
      {/* Left Panel */}
      <div className="w-full md:w-[400px] p-6 bg-slate-800 border-r border-slate-700">
        {/* Mode Toggle */}
        <div className="bg-slate-900 rounded-full p-2 flex mb-6 items-center gap-2">
          <button
            className={`flex-1 w-12 h-12 py-2 px-4 rounded-full text-center ${
              mode === "Manual" ? "bg-slate-700 text-white" : "text-gray-400"
            }`}
            onClick={() => setMode("Manual")}
          >
            Manual
          </button>
          <button
            className={`flex-1 w-12 h-12 py-2 px-4 rounded-full text-center hover:bg-slate-700 ${
              mode === "Auto" ? "bg-slate-700 text-white" : "text-gray-400"
            }`}
            onClick={() => setMode("Auto")}
          >
            Auto
          </button>
          <button
            className={`w-12 h-12 rounded-full text-center hover:bg-slate-700 flex justify-center items-center ${
              mode === "Strategy" ? "bg-slate-700 text-white" : "text-gray-400"
            }`}
            onClick={() => setMode("Strategy")}
          >
            <Bot size={20} />
          </button>
        </div>

        {/* Bet Amount */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <label className="text-gray-400">Bet Amount</label>
            <span className="text-gray-400">₹0.00</span>
          </div>
          <div className="flex">
            <div className="flex-1 bg-slate-900 rounded-l-md border border-slate-700 flex items-center">
              <input
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                className="w-full bg-transparent px-4 py-3 outline-none"
              />
              <div className="px-2">
                <span className="flex items-center justify-center w-6 h-6 bg-yellow-500 rounded-full text-black text-xs">
                  ₹
                </span>
              </div>
            </div>
            <button className="px-4 py-3 bg-slate-700 border-t border-b border-slate-600">
              ½
            </button>
            <button className="px-4 py-3 bg-slate-700 rounded-r-md border border-slate-600">
              2×
            </button>
          </div>
        </div>

        {/* Profit on Win */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <label className="text-gray-400">Profit on Win</label>
            <span className="text-gray-400">₹0.00</span>
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
                ₹
              </span>
            </div>
          </div>
        </div>

        {/* Bet Button */}
        <button className="w-full py-4 bg-[#5cff5c] hover:bg-[#4eee4e] text-black font-medium rounded-md">
          Bet
        </button>
      </div>

      {/* Right Panel */}
      <div className="flex-1 p-6 flex flex-col">
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
                          after:content-['0'] after:font-semibold after:absolute after:-top-6 after:left-1/2 after:-translate-x-1/2
                          "
                ></div>
                <div
                  className=" absolute top-[-20px] right-3/4 translate-x-3/4 w-0 h-0 
                          border-l-[10px] border-l-transparent 
                          border-r-[10px] border-r-transparent 
                          border-b-[10px] border-b-slate-600
                          after:content-['25'] after:font-semibold after:absolute after:-top-6 after:left-1/2 after:-translate-x-1/2
                          "
                ></div>

                <div
                  className=" absolute top-[-20px] right-1/2 translate-x-1/2 w-0 h-0 
                          border-l-[10px] border-l-transparent 
                          border-r-[10px] border-r-transparent 
                          border-b-[10px] border-b-slate-600
                          after:content-['50'] after:font-semibold after:absolute after:-top-6 after:left-1/2 after:-translate-x-1/2
                          "
                ></div>
                <div
                  className=" absolute top-[-20px] right-1/4 translate-x-2/5 w-0 h-0 
                          border-l-[10px] border-l-transparent 
                          border-r-[10px] border-r-transparent 
                          border-b-[10px] border-b-slate-600
                          after:content-['75'] after:font-semibold after:absolute after:-top-6 after:left-1/2 after:-translate-x-1/2
                          "
                ></div>
                <div
                  className=" absolute top-[-20px] right-0 -translate-x-1/2 w-0 h-0 
                          border-l-[10px] border-l-transparent 
                          border-r-[10px] border-r-transparent 
                          border-b-[10px] border-b-slate-600
                          after:content-['100'] after:font-semibold after:absolute after:-top-6 after:left-1/2 after:-translate-x-1/2
                          "
                ></div>
              </>
            
              {/* Slider Track */}
              <div
                ref={sliderTrackRef}
                className="p-3 bg-[#2a3a4a] overflow-hidden relative rounded-xl cursor-pointer flex justify-center items-center"
                onMouseDown={handleSliderMouseDown}
                onTouchStart={handleSliderMouseDown}
              >
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderValue}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer outline-none transition-all"
                  style={{
                    background: `linear-gradient(to right, #E9113C ${sliderValue}%, #00E701 ${sliderValue}%)`,
                  }}
                />
              </div>
            </div>
            {/* Slider Thumb */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-8 h-8 lg:h-10 lg:w-10 bg-blue-400 flex items-center justify-center cursor-pointer rounded-sm select-none"
              style={{
                left: `calc(${smoothSliderValue(sliderValue)}% - 20px)`,
              }}
              onMouseDown={(e) => {
                e.stopPropagation();
                setIsDragging(true);
              }}
              onTouchStart={(e) => {
                e.stopPropagation();
                setIsDragging(true);
              }}
            >
              <div className="text-sky-600 font-bold">|||</div>
            </div>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="p-4 pt-3 grid grid-cols-3 gap-4 mt-auto bg-slate-800 rounded-sm">
          <div>
            <label className="block text-gray-400 mb-2">Multiplier</label>
            <div className="flex bg-slate-900 rounded-md border border-slate-700">
              <input
                type="text"
                value={multiplier}
                className="w-full bg-transparent px-4 py-3 outline-none"
                readOnly
              />
              <div className="px-4 flex items-center">
                <span className="text-gray-400">
                  <X size={20} className="text-gray-400" />
                </span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Roll Over</label>
            <div className="flex bg-slate-900 rounded-md border border-slate-700">
              <input
                type="text"
                value={rollOver}
                className="w-full bg-transparent px-4 py-3 outline-none"
                readOnly
              />
              <div className="px-4 flex items-center">
                <RefreshCw size={20} className="text-gray-400" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Win Chance</label>
            <div className="flex bg-slate-900 rounded-md border border-slate-700">
              <input
                type="text"
                value={winChance}
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
