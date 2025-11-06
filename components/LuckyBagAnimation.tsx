import React, { useState, useEffect } from 'react';
import type { LuckyBag, User } from '../types';

interface LuckyBagAnimationProps {
  bag: LuckyBag;
  currentUser: User;
  onClaim: () => void;
}

const CountdownTimer: React.FC<{ endTime: number }> = ({ endTime }) => {
    const calculateTimeLeft = () => Math.max(0, endTime - Date.now());
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(interval);
    }, [endTime]);
    
    const seconds = Math.floor((timeLeft / 1000) % 60);
    return (
        <div className="absolute top-[-4px] left-[-4px] w-6 h-6 flex items-center justify-center bg-red-600 text-white text-sm font-bold rounded-full border-2 border-yellow-300">
            {seconds}
        </div>
    );
}

export const LuckyBagAnimation: React.FC<LuckyBagAnimationProps> = ({ bag, currentUser, onClaim }) => {
  const canClaim = bag.creator.id !== currentUser.id && bag.claimedBy[currentUser.id] === undefined && bag.bagsLeft > 0;
  
  // This component will now render the banner from the other images
  if (bag.endTime - Date.now() <= 0) return null;

  return (
    <div className="fixed top-[110px] right-2 z-50 flex items-center gap-2 animate-fade-in-down pointer-events-auto">
      <div className="flex items-center gap-2 p-1 pl-3 rounded-full bg-gradient-to-r from-red-600 to-orange-500 border-2 border-yellow-400 shadow-lg">
          <div className="relative">
            <img src="https://i.postimg.cc/bN3r4LSk/big-win-banner.png" alt="Lucky Bag" className="w-12 h-auto" />
             <CountdownTimer endTime={bag.endTime} />
          </div>
          <div className="text-white text-sm font-semibold">
            <p>{bag.totalCoins.toLocaleString()} coins Lucky Bag</p>
          </div>
          <button 
            onClick={onClaim}
            disabled={!canClaim}
            className="px-6 py-2 rounded-full bg-yellow-400 text-red-800 font-bold disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            Go
          </button>
      </div>
    </div>
  );
};