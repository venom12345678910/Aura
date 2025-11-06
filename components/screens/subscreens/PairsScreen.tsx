import React from 'react';
import { SubScreenWrapper } from './SubScreenWrapper';
import { mockUsers } from '../../../data/mock';
import { HeartIcon } from '../../icons/HeartIcon';
import { XMarkIcon } from '../../icons/XMarkIcon';

const PairCard: React.FC<{ user: typeof mockUsers[0] }> = ({ user }) => (
    <div className="relative rounded-2xl overflow-hidden glassmorphism w-full aspect-[3/4] shadow-lg">
        <img src={user.avatarUrl} alt={user.displayName} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4 text-white">
            <h3 className="font-bold text-2xl drop-shadow-md">{user.displayName}, {user.level}</h3>
            <p className="text-sm text-gray-200 drop-shadow">{user.bio}</p>
        </div>
    </div>
);

export const PairsScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    return (
        <SubScreenWrapper title="Find a Pair" onBack={onBack}>
            <div className="p-4 flex flex-col items-center justify-between h-full">
                <div className="w-full">
                    <PairCard user={mockUsers[2]} />
                </div>
                <div className="flex gap-8 items-center py-4">
                    <button className="w-20 h-20 rounded-full bg-white/10 text-white flex items-center justify-center backdrop-blur-sm border-2 border-red-500/50 shadow-lg transition-transform hover:scale-110">
                        <XMarkIcon className="w-10 h-10 text-red-400" />
                    </button>
                    <button className="w-24 h-24 rounded-full bg-white/10 text-white flex items-center justify-center backdrop-blur-sm border-2 border-green-400/50 shadow-lg transition-transform hover:scale-110">
                         <HeartIcon className="w-12 h-12 text-green-400" />
                    </button>
                </div>
            </div>
        </SubScreenWrapper>
    );
};
