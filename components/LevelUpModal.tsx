
import React, { useEffect } from 'react';

interface LevelUpModalProps {
  newLevel: number;
  onComplete: () => void;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({ newLevel, onComplete }) => {

  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center" onClick={onComplete}>
      <div className="relative text-center text-white animate-level-up-burst" onClick={e => e.stopPropagation()}>
        <div className="absolute -inset-8 animate-spin-slow opacity-50">
            <img src="https://i.ibb.co/3s7zXG9/starburst-light.png" alt="burst" />
        </div>
        <div className="relative p-8 rounded-full bg-slate-900/50 border-4 border-yellow-400 shadow-2xl" style={{animation: 'level-up-glow 1.5s ease-in-out infinite'}}>
            <h1 className="text-3xl font-bold gold-text-glow">LEVEL UP!</h1>
            <div className="my-2 text-9xl font-bold gold-text-glow">
                {newLevel}
            </div>
            <p className="text-lg text-gray-200">You've unlocked new rewards!</p>
        </div>
      </div>
    </div>
  );
};