import React from 'react';
import type { Seat } from '../types';
import { LockIcon } from './icons/LockIcon';
import { MicrophoneIcon } from './icons/MicrophoneIcon';

interface MicSeatProps {
  seat: Seat;
  isSpeaking: boolean;
  isHost?: boolean;
  onPress: (seat: Seat, anchor: HTMLElement) => void;
}

export const MicSeat: React.FC<MicSeatProps> = ({ seat, isSpeaking, onPress }) => {
  const handlePress = (e: React.MouseEvent<HTMLButtonElement>) => {
    onPress(seat, e.currentTarget);
  };
  
  const borderClass = isSpeaking ? 'border-cyan-400 speaking-pulse' : 'border-transparent';
  
  return (
    <button onClick={handlePress} className="relative flex flex-col items-center justify-center gap-1 group">
        <div className="relative w-16 h-16 rounded-full flex items-center justify-center bg-black/30 backdrop-blur-sm group-hover:bg-black/50 transition-colors">
            <div className={`absolute inset-0 rounded-full border-2 ${borderClass} transition-colors`}></div>
            {seat.user ? (
                <>
                    <img src={seat.user.avatarUrl} alt={seat.user.displayName} className="w-full h-full rounded-full object-cover p-1" />
                </>
            ) : seat.isLocked ? (
                <LockIcon className="w-7 h-7 text-yellow-400" />
            ) : (
                <MicrophoneIcon className="w-8 h-8 text-gray-500" />
            )}
        </div>
        <div className="bg-black/20 px-2 py-0.5 rounded-full text-center max-w-[5rem]">
         <p className="text-xs font-semibold text-gray-300 truncate">
          {`No.${seat.seatIndex + 1}`}
        </p>
        </div>
    </button>
  );
};