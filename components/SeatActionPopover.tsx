import React from 'react';
import type { Room, Seat, User } from '../types';
import mockRoomSocketService from '../services/mockRoomSocketService';
import { useToast } from './Toast';
import { LockIcon } from './icons/LockIcon';
import { LockOpenIcon } from './icons/LockOpenIcon';

interface SeatActionPopoverProps {
    actionedSeat: Seat;
    anchorEl: HTMLElement;
    currentUser: User;
    room: Room;
    onClose: () => void;
    onUpdateRoom: (room: Room) => void;
    onViewProfile: (user: User) => void;
}

const ActionButton: React.FC<{ onClick: () => void, children: React.ReactNode, className?: string }> = ({ onClick, children, className }) => (
    <button onClick={onClick} className={`w-full text-left p-3 hover:bg-white/10 ${className}`}>
        {children}
    </button>
);

export const SeatActionPopover: React.FC<SeatActionPopoverProps> = ({ actionedSeat, anchorEl, currentUser, room, onClose, onUpdateRoom, onViewProfile }) => {
    const { addToast } = useToast();
    const user = actionedSeat.user;

    if (!user) {
        onClose();
        return null;
    }
    
    const rect = anchorEl.getBoundingClientRect();
    const style: React.CSSProperties = {
        position: 'fixed',
        top: `${rect.bottom + 8}px`,
        left: `${rect.left + rect.width / 2}px`,
        transform: 'translateX(-50%)',
        zIndex: 60,
    };
    
    const isSelf = user.id === currentUser.id;
    const isHost = room.host.id === currentUser.id;
    const isTargetHost = user.id === room.host.id;
    const canManage = isHost && !isTargetHost;

    const handleLeaveSeat = () => {
        const newSeats = room.seats.map(s => s.user?.id === currentUser.id ? { ...s, user: undefined } : s);
        mockRoomSocketService.updateRoomSettings({ ...room, seats: newSeats });
        onClose();
    };

    const handleKick = () => {
        const newSeats = room.seats.map(s => s.seatIndex === actionedSeat.seatIndex ? { ...s, user: undefined } : s);
        mockRoomSocketService.updateRoomSettings({ ...room, seats: newSeats });
        addToast(`${user.displayName} was removed from the seat.`, 'info');
        onClose();
    };
    
    const handleToggleLock = () => {
        const newSeats = room.seats.map(s => s.seatIndex === actionedSeat.seatIndex ? { ...s, isLocked: !s.isLocked } : s);
        mockRoomSocketService.updateRoomSettings({ ...room, seats: newSeats });
        addToast(`Seat ${actionedSeat.seatIndex + 1} has been ${actionedSeat.isLocked ? 'unlocked' : 'locked'}.`, 'info');
        onClose();
    };
    
    return (
        <div className="fixed inset-0 z-50" onClick={onClose}>
            <div 
                style={style} 
                className="w-48 bg-slate-800/80 backdrop-blur-md rounded-lg shadow-lg border border-cyan-400/20 animate-fade-in text-white text-sm font-semibold divide-y divide-cyan-400/20 overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                <ActionButton onClick={() => { onViewProfile(user); onClose(); }}>View Profile</ActionButton>
                
                {isSelf && !isTargetHost && (
                    <ActionButton onClick={handleLeaveSeat} className="text-yellow-400">Leave Seat</ActionButton>
                )}

                {canManage && (
                    <ActionButton onClick={handleKick} className="text-red-400">Kick from Seat</ActionButton>
                )}

                {isHost && (
                    <ActionButton onClick={handleToggleLock}>
                        <div className="flex items-center gap-2">
                            {actionedSeat.isLocked ? <><LockOpenIcon className="w-4 h-4" /> Unlock Seat</> : <><LockIcon className="w-4 h-4" /> Lock Seat</>}
                        </div>
                    </ActionButton>
                )}
            </div>
        </div>
    );
};