import React from 'react';
import { TrophyIcon } from './icons/TrophyIcon';
import { StarIcon } from './icons/StarIcon';
import { UsersIcon } from './icons/UsersIcon';

const ActionCard: React.FC<{ name: string, icon: React.ReactNode, onClick: () => void, colors: string }> = ({ name, icon, onClick, colors }) => (
    <button
        onClick={onClick}
        className={`w-1/3 p-3 glassmorphism rounded-2xl text-white font-semibold flex flex-col items-start justify-between transition-transform hover:scale-105 hover:shadow-lg ${colors}`}
    >
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-black/20 mb-4">
            {icon}
        </div>
        <span className="text-sm">{name}</span>
    </button>
);

export const QuickActions: React.FC<{ onNavigate: (screen: 'ranking' | 'events' | 'pairs') => void; }> = ({ onNavigate }) => (
    <div className="flex items-stretch gap-3 my-4">
        <ActionCard name="Ranking" icon={<TrophyIcon className="w-5 h-5" />} onClick={() => onNavigate('ranking')} colors="border-yellow-400/50 text-yellow-300" />
        <ActionCard name="Events" icon={<StarIcon className="w-5 h-5" />} onClick={() => onNavigate('events')} colors="border-red-400/50 text-red-300" />
        <ActionCard name="Pairs" icon={<UsersIcon className="w-5 h-5" />} onClick={() => onNavigate('pairs')} colors="border-cyan-400/50 text-cyan-300" />
    </div>
);
