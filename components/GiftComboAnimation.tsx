import React, { useEffect, useState } from 'react';

interface GiftComboAnimationProps {
  combo: {
    count: number;
    giftId: string;
    key: number;
  };
}

export const GiftComboAnimation: React.FC<GiftComboAnimationProps> = ({ combo }) => {
  const { count, key } = combo;
  const [displayCount, setDisplayCount] = useState(count);

  useEffect(() => {
    setDisplayCount(count);
  }, [count, key]);

  if (count <= 1) {
    return null;
  }

  return (
    <div
      key={key} // Use key to force re-mount and re-trigger animation on new combo
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[95] flex items-center justify-center text-white pointer-events-none"
      style={{ animation: 'combo-fade-out 1.5s 1.5s forwards' }}
    >
      <div className="flex items-end" style={{ animation: 'combo-scale-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
        <span
          className="text-9xl font-bold text-yellow-300 drop-shadow-[0_5px_10px_rgba(251,191,36,0.7)]"
          style={{
            WebkitTextStroke: '4px #c2410c',
            textShadow: '0 0 15px #fbbf24',
          }}
        >
          {displayCount}
        </span>
        <span className="text-6xl font-bold text-white drop-shadow-[0_3px_5px_rgba(0,0,0,0.5)] -ml-2 mb-2">
          x
        </span>
      </div>
      <style>{`
        @keyframes combo-scale-in {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes combo-fade-out {
          from { opacity: 1; transform: scale(1); }
          to { opacity: 0; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
};
