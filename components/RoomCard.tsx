import React from 'react';
import type { Room } from '../types';
import { UsersIcon } from './icons/UsersIcon';
import { LockIcon } from './icons/LockIcon';
import { FlagPKIcon } from './icons/FlagPKIcon';
import { CrownIcon } from './icons/CrownIcon';
import { TagIcon } from './icons/TagIcon';
import { StarIcon } from './icons/StarIcon';

interface RoomCardProps {
  room: Room;
  onJoin: (room: Room) => void;
  size?: 'normal' | 'small';
}

const RoomCardComponent: React.FC<RoomCardProps> = ({ room, onJoin, size = 'normal' }) => {
  const isSmall = size === 'small';

  return (
    <div
      className={`relative rounded-xl shadow-lg transition-shadow duration-200 bg-[var(--md-color-surface-tint-1)] hover:shadow-2xl overflow-hidden cursor-pointer ${isSmall ? 'w-40 flex-shrink-0' : ''}`}
      onClick={() => onJoin(room)}
    >
      {/* Background Image */}
      <img src={room.backgroundImageUrl || room.host.avatarUrl} alt="" className="absolute inset-0 w-full h-full object-cover rounded-xl opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--md-color-surface-tint-1)] via-transparent to-transparent rounded-xl"></div>
      
      <div className={`relative z-10 p-3 flex flex-col justify-end text-white w-full ${isSmall ? 'aspect-[2/3]' : 'aspect-[3/4]'}`}>
        {/* Top Tags */}
        <div className="absolute top-2 left-2 flex flex-col gap-1.5">
          {room.isLocked && (
            <div className="flex items-center gap-1 bg-black/50 px-1.5 py-0.5 rounded-full text-xs font-bold backdrop-blur-sm">
              <LockIcon className="w-3 h-3 text-yellow-300" />
            </div>
          )}
          {room.pkState && (
             <div className="flex items-center gap-1 bg-black/50 text-red-400 px-1.5 py-0.5 rounded-full text-xs font-bold backdrop-blur-sm">
              <FlagPKIcon className="w-3 h-3" />
              <span className="text-white">PK</span>
            </div>
          )}
           {room.isSuperMic && (
             <div className="flex items-center gap-1 bg-purple-500/70 text-purple-200 px-1.5 py-0.5 rounded-full text-xs font-bold backdrop-blur-sm">
              <StarIcon className="w-3 h-3" />
            </div>
          )}
        </div>
        
         {/* Participant Count */}
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/50 text-white px-2 py-0.5 rounded-full text-xs backdrop-blur-sm">
            <UsersIcon className="w-3 h-3" />
            <span>{room.participantCount}</span>
        </div>
        
        {/* Bottom Info */}
        <div className="relative">
          <div className="flex items-center gap-1.5 mb-1.5">
            <img src={room.host.avatarUrl} alt={room.host.displayName} className={`rounded-full border-2 border-slate-500 ${isSmall ? 'w-7 h-7' : 'w-8 h-8'}`} />
            {room.decoration === 'crown' && <CrownIcon className={`text-yellow-400 ${isSmall ? 'w-4 h-4' : 'w-5 h-5'}`} />}
          </div>
          <h3 className={`font-bold leading-tight truncate ${isSmall ? 'text-base' : 'text-lg'}`}>{room.title}</h3>
          {room.topic && (
             <div className="flex items-center gap-1 text-gray-300 mt-1">
              <TagIcon className="w-3 h-3" />
              <p className="text-xs truncate">{room.topic}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const RoomCard = React.memo(RoomCardComponent);
