import React from 'react';
import type { Rocket } from '../types';
import { RocketFooterIcon } from './icons/RocketFooterIcon';

interface VerticalRocketProgressProps {
  rockets: Rocket[];
  onLaunchClick: () => void;
}

const formatNumber = (num: number) => {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(0)}K`;
  return num.toString();
};

export const VerticalRocketProgress: React.FC<VerticalRocketProgressProps> = ({ rockets, onLaunchClick }) => {
  const activeRocket = rockets.find(r => r.status === 'active');
  const progressPercent = activeRocket ? (activeRocket.currentAmount / activeRocket.targetAmount) * 100 : 0;
  const launchedCount = rockets.filter(r => r.status === 'launched').length;

  return (
    <button onClick={onLaunchClick} className="w-16 h-48 bg-slate-800/50 backdrop-blur-sm rounded-lg border border-cyan-400/20 flex flex-col items-center p-2 text-left">
      <div className="flex-grow w-full flex flex-col items-center">
        <div className="flex-grow w-4 bg-slate-700/50 rounded-full relative overflow-hidden my-1 border border-slate-600">
          <div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-cyan-400 to-purple-500 rounded-full transition-all duration-500 ease-out"
            style={{ height: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      <div className="flex-shrink-0 flex flex-col items-center">
        <RocketFooterIcon className="w-8 h-8 text-yellow-300" />
        <span className="text-xs font-semibold text-white mt-1">{launchedCount}/{rockets.length}</span>
      </div>
    </button>
  );
};