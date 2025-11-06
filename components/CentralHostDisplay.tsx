import React from 'react';
import type { User } from '../types';
import { CrownIcon } from './icons/CrownIcon';

interface CentralHostDisplayProps {
    user: User;
    onClick: (user: User) => void;
}

export const CentralHostDisplay: React.FC<CentralHostDisplayProps> = ({ user, onClick }) => {
    return (
        <button onClick={() => onClick(user)} className="relative flex flex-col items-center gap-2 group">
            <div className="relative">
                <img src={user.avatarUrl} alt={user.displayName} className="w-20 h-20 rounded-full border-4 border-yellow-400 shadow-lg" />
                 {user.isSvip && <img src="https://i.ibb.co/3s7zXG9/starburst-light.png" className="w-28 h-28 absolute -top-4 -left-4 pointer-events-none" alt="SVIP" />}
            </div>
            <div className="bg-black/40 backdrop-blur-sm px-4 py-1 rounded-full text-center">
                <p className="font-bold text-white text-sm truncate max-w-[150px]">{user.displayName}</p>
            </div>
        </button>
    );
};