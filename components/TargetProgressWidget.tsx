import React, { useState, useEffect } from 'react';
import type { TargetCycle } from '../types';
import { ChevronRightIcon } from './icons/ChevronRightIcon';

interface TargetProgressWidgetProps {
  targetCycle: TargetCycle;
  onNavigate: () => void;
}

const CountdownTimer: React.FC<{ endDate: number }> = ({ endDate }) => {
    const calculateTimeLeft = () => {
        const difference = endDate - Date.now();
        let timeLeft = { days: 0, hours: 0 };

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 3600000); // update every hour
        return () => clearInterval(timer);
    });

    return (
        <span className="text-xs font-semibold text-gray-200">
            {timeLeft.days}d {timeLeft.hours}h left
        </span>
    );
};

export const TargetProgressWidget: React.FC<TargetProgressWidgetProps> = ({ targetCycle, onNavigate }) => {
  const progressPercent = Math.min((targetCycle.progress / targetCycle.target) * 100, 100);

  return (
    <button onClick={onNavigate} className="w-full p-3 rounded-lg shadow-lg text-left transition-transform hover:scale-[1.02] bg-gradient-to-br from-purple-600/80 to-indigo-800/80 border border-purple-400/30">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold text-white">15-Day Target</h2>
        <CountdownTimer endDate={targetCycle.endDate} />
      </div>
      <div className="w-full bg-black/30 rounded-full h-4 relative overflow-hidden border border-slate-700">
        <div className="absolute inset-0 flex items-center justify-center z-10 text-xs font-bold text-shadow text-white">
          {targetCycle.progress.toLocaleString()} / {targetCycle.target.toLocaleString()}
        </div>
        <div 
          className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
       <div className="flex justify-end items-center mt-2 text-xs text-purple-300 font-semibold">
          View Details <ChevronRightIcon className="w-4 h-4" />
      </div>
    </button>
  );
};