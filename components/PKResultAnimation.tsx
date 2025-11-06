import React from 'react';

interface PKResultAnimationProps {
  result: 'win' | 'loss' | 'tie';
}

export const PKResultAnimation: React.FC<PKResultAnimationProps> = ({ result }) => {
  if (result === 'win') {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none bg-black/50 backdrop-blur-sm animate-fade-in">
        <div className="relative animate-pk-win-banner-in">
           <img src="https://i.postimg.cc/bN3r4LSk/big-win-banner.png" alt="Winner" className="w-96 h-auto" />
            <h1 className="absolute inset-0 flex items-center justify-center text-7xl font-black text-yellow-300 gold-text-glow" style={{ WebkitTextStroke: '2px #a16207' }}>
                WINNER
            </h1>
        </div>
      </div>
    );
  }

  if (result === 'loss' || result === 'tie') {
    const text = result === 'loss' ? 'DEFEAT' : 'TIE';
    return (
       <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none bg-black/50 backdrop-blur-sm animate-fade-in">
        <div className="relative animate-pk-lose-banner-in">
            <h1 className="text-8xl font-black text-gray-400" style={{ WebkitTextStroke: '3px #4b5563', textShadow: '0 4px 8px rgba(0,0,0,0.5)' }}>
                {text}
            </h1>
        </div>
      </div>
    );
  }

  return null;
};