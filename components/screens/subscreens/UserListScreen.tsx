
import React from 'react';
import type { User } from '../../../types';
import { SubScreenWrapper } from './SubScreenWrapper';
import { useToast } from '../../Toast';

interface UserListScreenProps {
  title: string;
  users: User[];
  onBack: () => void;
}

const UserListItem: React.FC<{ user: User }> = ({ user }) => {
  const { addToast } = useToast();
  const [isFollowing, setIsFollowing] = React.useState(Math.random() > 0.5);

  const handleFollow = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFollowing(!isFollowing);
    addToast(isFollowing ? `Unfollowed ${user.displayName}` : `Followed ${user.displayName}!`, 'success');
  }

  return (
    <div className="flex items-center p-3 glassmorphism hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
      <img src={user.avatarUrl} alt={user.displayName} className="w-12 h-12 rounded-full" />
      <div className="ml-4 flex-grow overflow-hidden">
        <p className="font-semibold text-white truncate">{user.displayName}</p>
        <div className="bg-orange-400 text-white text-xs font-bold px-2 py-0.5 rounded-full inline-block mt-1">
          Lv.{user.level}
        </div>
      </div>
      <button 
        onClick={handleFollow}
        className={`font-bold px-4 py-1.5 rounded-full text-sm transition-colors ${
          isFollowing 
            ? 'bg-slate-700 text-gray-300' 
            : 'bg-cyan-500 text-black'
        }`}
      >
        {isFollowing ? 'Following' : 'Follow'}
      </button>
    </div>
  );
};


export const UserListScreen: React.FC<UserListScreenProps> = ({ title, users, onBack }) => {
  return (
    <SubScreenWrapper title={title} onBack={onBack}>
    <div className="p-2 space-y-2">
        {users.length > 0 ? (
            users.map(user => <UserListItem key={user.id} user={user} />)
        ) : (
            <div className="text-center p-8 text-gray-400">
                No users to display.
            </div>
        )}
    </div>
    </SubScreenWrapper>
  );
};