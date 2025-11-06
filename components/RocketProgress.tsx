import React from 'react';
import type { Rocket } from '../types';
import { FireIcon } from './icons/FireIcon';
import { LockIcon } from './icons/LockIcon';
import { RocketIcon } from './icons/RocketIcon';

interface RocketProgressProps {
  rockets: Rocket[];
  compact?: boolean;
  onLaunchClick: () => void;
}

const RocketStatusIcon: React.FC<{ status: Rocket['status'] }> = ({ status }) => {
  switch (status) {
    case 'launched':
      return <RocketIcon className="w-5 h-5 text-green-400" />;
    case 'active':
      return <FireIcon className="w-5 h-5 text-yellow-400" />;
    case 'locked':
      return <LockIcon className="w-5 h-5 text-gray-500" />;
    default:
      return null;
  }
};

const formatNumber = (num: number) => {
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(0)}K`;
    return num.toString();
}

export const RocketProgress: React.FC<RocketProgressProps> = ({ rockets, compact = false, onLaunchClick }) => {
  const activeRocket = rockets.find(r => r.status === 'active');
  const progressPercent = activeRocket ? (activeRocket.currentAmount / activeRocket.targetAmount) * 100 : 0;

  if (compact) {
    const launchedCount = rockets.filter(r => r.status === 'launched').length;
    return (
        <button onClick={onLaunchClick} className="flex items-center gap-2 mt-2 w-full text-left">
            <div className="w-full bg-slate-700/50 rounded-full h-2 relative overflow-hidden">
                <div 
                    className="bg-gradient-to-r from-cyan-400 to-purple-500 h-2 rounded-full transition-all duration-500 ease-out" 
                    style={{ width: `${progressPercent}%` }}
                ></div>
            </div>
            <div className="flex items-center text-sm font-semibold">
                <RocketIcon className="w-4 h-4 text-yellow-300" />
                <span className="ml-1 text-white">{launchedCount}/5</span>
            </div>
        </button>
    );
  }

  return (
    <button onClick={onLaunchClick} className="w-full p-4 bg-slate-800/50 backdrop-blur-sm rounded-lg border border-cyan-400/20 text-left">
      <h3 className="text-lg font-bold mb-3 text-cyan-300">Fighter Launch</h3>
      <div className="flex justify-between items-center mb-2 px-2">
        {rockets.slice(0, 5).map(rocket => (
          <div key={rocket.level} className="flex flex-col items-center">
            <RocketStatusIcon status={rocket.status} />
            <span className={`text-xs mt-1 ${rocket.status === 'active' ? 'text-yellow-300 font-bold' : 'text-gray-400'}`}>
              Lv {rocket.level}
            </span>
          </div>
        ))}
      </div>
      <div className="w-full bg-slate-700/50 rounded-full h-4 relative overflow-hidden my-3 border border-slate-600">
        <div 
            className="bg-gradient-to-r from-cyan-400 to-purple-500 h-full rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-2" 
            style={{ width: `${progressPercent}%` }}
        >
        </div>
      </div>
      {activeRocket && (
        <div className="text-center text-sm">
          <span className="font-semibold text-white">{formatNumber(activeRocket.currentAmount)}</span>
          <span className="text-gray-400"> / {formatNumber(activeRocket.targetAmount)} Coins</span>
        </div>
      )}
       {!activeRocket && (
        <div className="text-center text-sm font-semibold text-green-400">
          All Fighters Launched! 🎉
        </div>
      )}
    </button>
  );
};
