import React from 'react';
import type { Room, User } from '../types';
import { useToast } from './Toast';
import mockRoomSocketService from '../services/mockRoomSocketService';
import { MessageIcon } from './icons/MessageIcon';
import { mockStoreItems } from '../data/mock';
import { formatLastSeen } from '../utils/time';

interface UserProfileModalProps {
  user: User;
  currentUser: User;
  room: Room;
  onClose: () => void;
  onViewUserList: (title: string) => void;
  onStartConversation: (userId: string) => void;
}

const Stat: React.FC<{ value: number; label: string; onClick: () => void }> = ({ value, label, onClick }) => (
  <button onClick={onClick} className="text-center p-2 rounded-lg transition-colors hover:bg-white/10 flex-1">
    <p className="text-lg font-bold text-white">{value.toLocaleString()}</p>
    <p className="text-sm text-gray-400">{label}</p>
  </button>
);

export const UserProfileModal: React.FC<UserProfileModalProps> = ({ user, currentUser, room, onClose, onViewUserList, onStartConversation }) => {
    const { addToast } = useToast();
    const frame = mockStoreItems.find(item => item.id === user.equippedFrameId);

    const isHost = currentUser.id === room.host.id;
    const isCurrentUserCoHost = room.coHosts?.includes(currentUser.id) ?? false;
    const isTargetUserCoHost = room.coHosts?.includes(user.id) ?? false;
    const canManage = (isHost || isCurrentUserCoHost) && user.id !== room.host.id && user.id !== currentUser.id;
    const isFriend = currentUser.friends?.includes(user.id);
    const isOnline = user.lastSeen === 'online';

    const handleFollow = () => {
        addToast(`Followed ${user.displayName}!`, 'success');
    };
    
    const handleStatClick = (title: string) => {
        onClose();
        onViewUserList(title);
    };

    const handleKick = () => {
        if (!canManage) return;
        const updatedRoom = { ...room, participants: room.participants.filter(p => p.id !== user.id), participantCount: room.participantCount - 1 };
        mockRoomSocketService.updateRoomSettings(updatedRoom);
        addToast(`${user.displayName} has been kicked from the room.`, 'info');
        onClose();
    };

    const handleToggleCoHost = () => {
        if (!isHost) return; // Only the main host can promote/demote
        let updatedCoHosts = room.coHosts ? [...room.coHosts] : [];
        if (isTargetUserCoHost) {
            updatedCoHosts = updatedCoHosts.filter(id => id !== user.id);
            addToast(`${user.displayName} has been demoted from co-host.`, 'info');
        } else {
            updatedCoHosts.push(user.id);
            addToast(`${user.displayName} has been promoted to co-host!`, 'success');
        }
        const updatedRoom = { ...room, coHosts: updatedCoHosts };
        mockRoomSocketService.updateRoomSettings(updatedRoom);
        onClose();
    };

    const handleMessage = () => {
        onClose();
        onStartConversation(user.id);
    }

    return (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center animate-fade-in" onClick={onClose}>
            <div className="bg-[var(--md-color-surface-tint-3)] border border-[var(--md-color-outline)] rounded-2xl p-6 w-full max-w-xs m-4 text-white shadow-lg flex flex-col items-center" onClick={e => e.stopPropagation()}>
                <div className="relative w-24 h-24">
                    <img src={user.avatarUrl} alt={user.displayName} className="w-full h-full rounded-full border-4 border-[var(--md-color-primary)]" />
                     {frame && (
                        <img src={frame.imageUrl} alt="Avatar Frame" className="absolute -inset-3 w-30 h-30 pointer-events-none" style={{width: '125%', height: '125%', top: '-12.5%', left: '-12.5%'}} />
                    )}
                    {isOnline && (
                        <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-[var(--md-color-surface-tint-3)] z-10"></div>
                    )}
                    {isFriend && <div className="absolute bottom-0 -left-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full border-2 border-[var(--md-color-surface)] z-10">Friend</div>}
                </div>
                <h2 className="text-xl font-bold mt-4">{user.displayName}</h2>
                 <p className={`text-xs mt-1 font-semibold ${isOnline ? 'text-green-400' : 'text-gray-400'}`}>
                    {isOnline ? 'Online' : formatLastSeen(user.lastSeen)}
                </p>
                <div className="bg-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full mt-2">
                    Lv.{user.level}
                </div>
                <p className="text-sm text-gray-400 mt-2 text-center h-10">{user.bio}</p>
                
                <div className="flex justify-around w-full my-4 bg-black/20 rounded-lg">
                    <Stat value={user.followers} label="Followers" onClick={() => handleStatClick('Followers')} />
                    <Stat value={user.following} label="Following" onClick={() => handleStatClick('Following')} />
                    <Stat value={user.visitors} label="Visitors" onClick={() => handleStatClick('Visitors')} />
                </div>
                
                <div className="flex w-full space-x-3">
                    <button onClick={handleFollow} className="flex-1 bg-[var(--md-color-primary-container)] text-[var(--md-color-on-primary-container)] font-bold py-2 px-4 rounded-full transition-all hover:opacity-90 active:scale-95">Follow</button>
                    {user.id !== currentUser.id && (
                        <button onClick={handleMessage} className="p-3 bg-[var(--md-color-secondary-container)] rounded-full transition-all hover:opacity-90 active:scale-95">
                            <MessageIcon className="w-5 h-5 text-[var(--md-color-on-secondary-container)]" />
                        </button>
                    )}
                </div>

                {canManage && (
                    <div className="w-full border-t border-[var(--md-color-outline)] mt-4 pt-4 flex flex-col space-y-2">
                        <h4 className="text-sm font-bold text-center text-gray-400 mb-1">Host Tools</h4>
                        <button onClick={handleKick} className="w-full bg-red-600 text-white font-semibold py-2 rounded-full hover:bg-red-700">Kick User</button>
                        {isHost && <button onClick={handleToggleCoHost} className="w-full bg-purple-600 text-white font-semibold py-2 rounded-full hover:bg-purple-700">{isTargetUserCoHost ? 'Demote Co-host' : 'Promote to Co-host'}</button>}
                    </div>
                )}

                <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 p-2 text-2xl">&times;</button>
            </div>
        </div>
    );
};