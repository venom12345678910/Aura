import React, { useEffect } from 'react';
import type { RoomEvent } from '../types';
import { mockStoreItems } from '../data/mock';

interface EntryEffectAnimationProps {
  event: (RoomEvent & { type: 'join' })['data'];
  onComplete: () => void;
}

export const EntryEffectAnimation: React.FC<EntryEffectAnimationProps> = ({ event, onComplete }) => {
  const { user, entryEffectId } = event;
  const effect = mockStoreItems.find(item => item.id === entryEffectId);

  useEffect(() => {
    const timer = setTimeout(onComplete, 2000); // Animation duration is 2s
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!effect) return null;

  return (
    <div 
      className="absolute inset-0 z-[90] flex flex-col items-center justify-center bg-black/30 pointer-events-none animate-entry-effect"
      aria-live="polite"
    >
        <img 
            src={effect.imageUrl}
            alt={effect.name}
            className="w-48 h-48 object-contain drop-shadow-lg"
        />
        <div className="mt-4 text-center p-2 bg-black/40 rounded-lg">
            <p className="text-xl font-bold text-yellow-300 drop-shadow-md">{user.displayName}</p>
            <p className="text-sm text-white">has arrived!</p>
        </div>
    </div>
  );
};