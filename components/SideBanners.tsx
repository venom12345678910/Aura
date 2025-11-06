import React from 'react';
import type { Room, User } from '../types';
import { UsersIcon } from './icons/UsersIcon';
import { TagIcon } from './icons/TagIcon';

interface SideBannersProps {
    room: Room;
    onViewUserList: (title: string, users: User[]) => void;
}

const ParticipantIcon: React.FC<{ user: User }> = ({ user }) => (
    <div className="relative">
        <img src={user.avatarUrl} alt={user.displayName} className="w-8 h-8 rounded-full border-2 border-slate-500" />
        {user.lastSeen === 'online' && (
             <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-slate-800"></div>
        )}
    </div>
);

export const SideBanners: React.FC<SideBannersProps> = ({ room, onViewUserList }) => {
    const displayedParticipants = room.participants.slice(0, 4);

    return (
        <div className="absolute top-28 right-2 flex flex-col gap-3">
            <div className="p-2 rounded-lg bg-black/40 backdrop-blur-sm flex flex-col items-center">
                <div className="flex -space-x-2">
                    {displayedParticipants.map(p => <ParticipantIcon key={p.id} user={p} />)}
                </div>
                <button onClick={() => onViewUserList('Participants', room.participants)} className="mt-2 flex items-center gap-1 text-xs text-white font-semibold">
                    <UsersIcon className="w-4 h-4" />
                    <span>{room.participantCount}</span>
                </button>
            </div>
            
            {room.topic && (
                 <div className="p-2 rounded-lg bg-black/40 backdrop-blur-sm flex items-center gap-1.5 text-xs text-white font-semibold">
                    <TagIcon className="w-4 h-4" />
                    <span>{room.topic}</span>
                </div>
            )}
        </div>
    )
}