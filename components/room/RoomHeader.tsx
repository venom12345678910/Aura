import React from 'react';
import type { Room, User } from '../../types';
import { ShareIcon } from '../icons/ShareIcon';
import { PowerIcon } from '../icons/PowerIcon';
import { MinimizeIcon } from '../icons/MinimizeIcon';
import { useToast } from '../Toast';
import { EyeSlashIcon } from '../icons/EyeSlashIcon';
import { ArrowPathIcon } from '../icons/ArrowPathIcon';
import { UsersIcon } from '../icons/UsersIcon';

interface RoomHeaderProps {
    room: Room;
    onLeaveRoom: () => void;
    onMinimizeRoom: () => void;
    isHost?: boolean;
    onOpenSettings?: () => void;
}

export const RoomHeader: React.FC<RoomHeaderProps> = ({ room, onLeaveRoom, onMinimizeRoom, isHost, onOpenSettings }) => {
    const { addToast } = useToast();
    const { host, participantCount } = room;

    const handleShare = () => {
        const roomLink = `https://aura-voice.chat/join?roomId=${host.ownRoomId || '12345'}`;
        navigator.clipboard.writeText(roomLink).then(() => {
            addToast('Room link copied to clipboard!', 'success');
        }).catch(() => {
            addToast('Could not copy link.', 'error');
        });
    };
    
    return (
        <header className="flex-shrink-0 flex items-center justify-between p-2 text-white">
            <div className="flex items-center gap-2 p-1 rounded-full bg-black/40 max-w-[60%]">
                <img src={host.avatarUrl} alt={host.displayName} className="w-10 h-10 rounded-full" />
                <div className="overflow-hidden">
                    <p className="font-semibold text-sm truncate">{host.displayName}</p>
                    <p className="text-xs text-gray-300">ID: {host.numericId}</p>
                </div>
                <div className="ml-2 pr-2 flex items-center text-xs gap-1 text-gray-200 font-semibold">
                    <UsersIcon className="w-4 h-4 text-gray-400" />
                    <span>{participantCount}</span>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <button onClick={() => addToast('Observe mode TBD', 'info')} className="p-2 rounded-full bg-black/40"><EyeSlashIcon className="w-5 h-5" /></button>
                <button onClick={() => window.location.reload()} className="p-2 rounded-full bg-black/40"><ArrowPathIcon className="w-5 h-5" /></button>
                <button onClick={onLeaveRoom} className="p-2 rounded-full bg-black/40"><PowerIcon className="w-5 h-5" /></button>
            </div>
        </header>
    );
};