
import React from 'react';
import type { Rocket } from '../types';

interface RocketDisplayProps {
  rockets: Rocket[];
}

const RocketItem: React.FC<{ rocket: Rocket }> = ({ rocket }) => {
  const { level, status, currentAmount, targetAmount } = rocket;
  const progressPercent = status === 'launched' ? 100 : (currentAmount / targetAmount) * 100;

  const getIcon = () => {
    switch (status) {
      case 'launched': return <span className="text-2xl">🚀</span>;
      case 'active': return <span className="text-2xl animate-pulse">🔥</span>;
      case 'locked': return <span className="text-2xl text-gray-500">🔒</span>;
    }
  };

  const getBorderColor = () => {
    switch (status) {
      case 'launched': return 'border-green-400';
      case 'active': return 'border-yellow-400 animate-pulse';
      case 'locked': return 'border-slate-600';
    }
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-black/30 border-2 ${getBorderColor()}`}>
        {getIcon()}
      </div>
      <div className="w-full bg-slate-700/50 rounded-full h-1.5 relative overflow-hidden border border-slate-900">
        <div 
          className="bg-gradient-to-r from-cyan-400 to-purple-500 h-full rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
      <span className="text-[10px] text-gray-300 font-semibold">Lv.{level}</span>
    </div>
  );
};

export const RocketDisplay: React.FC<RocketDisplayProps> = ({ rockets }) => {
  return (
    <div className="w-full p-2 bg-black/40 backdrop-blur-md rounded-xl border border-cyan-400/20">
      <div className="grid grid-cols-6 gap-2">
        {rockets.map(rocket => (
          <RocketItem key={rocket.level} rocket={rocket} />
        ))}
      </div>
    </div>
  );
};
