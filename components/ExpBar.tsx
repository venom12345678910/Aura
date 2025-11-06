
import React from 'react';

interface ExpBarProps {
  currentExp: number;
  totalExp: number;
  level: number;
  darkText?: boolean;
}

const formatNumber = (num: number) => {
  if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1)}B`;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toString();
};

export const ExpBar: React.FC<ExpBarProps> = ({ currentExp, totalExp, level, darkText = false }) => {
  const progressPercent = totalExp > 0 ? (currentExp / totalExp) * 100 : 0;

  return (
    <div className="flex items-center gap-2 w-full">
      <div className={`bg-orange-400 ${darkText ? 'text-black' : 'text-white'} text-xs font-bold px-2 py-0.5 rounded-full`}>
        Lv.{level}
      </div>
      <div className="flex-1 bg-slate-700/50 rounded-full h-3 relative overflow-hidden border border-slate-600">
        <div 
            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-2" 
            style={{ width: `${progressPercent}%` }}
        ></div>
        <div className={`absolute inset-0 flex items-center justify-center text-[10px] font-bold ${darkText ? 'text-gray-800' : 'text-white'}`}>
            {formatNumber(currentExp)} / {formatNumber(totalExp)}
        </div>
      </div>
    </div>
  );
};
