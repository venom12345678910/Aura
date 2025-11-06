import React, { useState, useEffect } from 'react';
import type { PKState, User } from '../types';
import { VersusIcon } from './icons/VersusIcon';

interface PKBattleDisplayProps {
  pkState: PKState;
  myHost: User;
  onViewProfile: (user: User) => void;
}

const PKProgressBar: React.FC<{
  score: number;
  totalScore: number;
  isOpponent: boolean;
}> = ({ score, totalScore, isOpponent }) => {
  const percentage = totalScore > 0 ? (score / totalScore) * 100 : 0;
  const gradient = isOpponent
    ? 'from-red-500 to-pink-500'
    : 'from-blue-500 to-cyan-400';
  const textAlignment = isOpponent ? 'text-right' : 'text-left';

  return (
    <div className={`relative w-full h-6 bg-black/30 rounded-full overflow-hidden border-2 border-slate-600`}>
      <div
        className={`absolute top-0 h-full bg-gradient-to-r ${gradient} transition-all duration-500 ease-linear`}
        style={{ width: `${percentage}%`, left: isOpponent ? 'auto' : 0, right: isOpponent ? 0 : 'auto' }}
      ></div>
      <div className={`absolute inset-0 px-2 flex items-center ${isOpponent ? 'justify-end' : 'justify-start'}`}>
          <span className="font-bold text-white text-sm drop-shadow-md">{score.toLocaleString()}</span>
      </div>
    </div>
  );
};

const PKTimer: React.FC<{ endTime: number }> = ({ endTime }) => {
    const [timeLeft, setTimeLeft] = useState(Math.max(0, endTime - Date.now()));

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(Math.max(0, endTime - Date.now()));
        }, 1000);
        return () => clearInterval(interval);
    }, [endTime]);

    const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);
    const isEnding = timeLeft <= 10000;

    return (
        <div className={`text-2xl font-bold text-white transition-colors ${isEnding ? 'text-red-400 animate-pk-timer-pulse' : ''}`}>
            {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </div>
    );
}

export const PKBattleDisplay: React.FC<PKBattleDisplayProps> = ({ pkState, myHost, onViewProfile }) => {
  const { opponentHost, myScore, opponentScore, endTime } = pkState;
  const totalScore = Math.max(1, myScore + opponentScore);

  return (
    <div className="w-full flex flex-col items-center gap-2 animate-fade-in">
        <div className="relative w-full flex justify-between items-center px-4">
            {/* My Host */}
            <div className="flex flex-col items-center gap-2">
                <img src={myHost.avatarUrl} alt={myHost.displayName} className="w-16 h-16 rounded-full border-4 border-cyan-400" onClick={() => onViewProfile(myHost)} />
                <PKProgressBar score={myScore} totalScore={totalScore} isOpponent={false} />
            </div>

            {/* VS Icon & Timer */}
            <div className="flex flex-col items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <VersusIcon className="w-20 h-20" />
                <PKTimer endTime={endTime} />
            </div>

            {/* Opponent Host */}
            <div className="flex flex-col items-center gap-2">
                <img src={opponentHost.avatarUrl} alt={opponentHost.displayName} className="w-16 h-16 rounded-full border-4 border-red-400" onClick={() => onViewProfile(opponentHost)}/>
                 <PKProgressBar score={opponentScore} totalScore={totalScore} isOpponent={true} />
            </div>
        </div>
    </div>
  );
};
