import React from 'react';
import { SubScreenWrapper } from './SubScreenWrapper';
import { useAppState } from '../../../contexts/StateContext';
import { useToast } from '../../Toast';
import type { User } from '../../../types';
import { formatLastSeen } from '../../../utils/time';

interface FriendsScreenProps {
  onBack: () => void;
}

const FriendListItem: React.FC<{ user: User; onUnfriend: (user: User) => void }> = ({ user, onUnfriend }) => {
    const isOnline = user.lastSeen === 'online';

    return (
        <div className="flex items-center p-3 glassmorphism hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
            <div className="relative">
                <img src={user.avatarUrl} alt={user.displayName} className="w-12 h-12 rounded-full" />
                {isOnline && (
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-slate-800"></div>
                )}
            </div>
            <div className="ml-4 flex-grow overflow-hidden">
                <p className="font-semibold text-white truncate">{user.displayName}</p>
                 <div className={`text-xs font-bold ${isOnline ? 'text-green-400' : 'text-gray-500'}`}>
                    {isOnline ? 'Online' : formatLastSeen(user.lastSeen)}
                </div>
            </div>
            <button
                onClick={() => onUnfriend(user)}
                className="font-bold px-4 py-1.5 rounded-full text-sm transition-colors bg-slate-700 text-gray-300 hover:bg-red-500/80 hover:text-white"
            >
                Unfriend
            </button>
        </div>
    );
};

export const FriendsScreen: React.FC<FriendsScreenProps> = ({ onBack }) => {
    const { state, dispatch } = useAppState();
    const { currentUser, users } = state;
    const { addToast } = useToast();

    const friends = users.filter(u => currentUser.friends?.includes(u.id));

    const handleUnfriend = (userToUnfriend: User) => {
        if (window.confirm(`Are you sure you want to unfriend ${userToUnfriend.displayName}?`)) {
            const newFriends = currentUser.friends?.filter(friendId => friendId !== userToUnfriend.id);
            dispatch({ type: 'UPDATE_USER', payload: { userId: currentUser.id, updates: { friends: newFriends } } });
            addToast(`Unfriended ${userToUnfriend.displayName}`, 'info');
        }
    };
    
    return (
        <SubScreenWrapper title="Friends" onBack={onBack}>
            <div className="p-2 space-y-2">
                {friends.length > 0 ? (
                    friends.map(user => <FriendListItem key={user.id} user={user} onUnfriend={handleUnfriend} />)
                ) : (
                    <div className="text-center p-8 text-gray-400">
                        You haven't added any friends yet.
                    </div>
                )}
            </div>
        </SubScreenWrapper>
    );
};