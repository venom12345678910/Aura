
import React, { useState } from 'react';
import { SubScreenWrapper } from './subscreens/SubScreenWrapper';
import { mockUsers } from '../../data/mock';
import type { User } from '../../types';
import { CrownIcon } from '../icons/CrownIcon';

interface RankingScreenProps {
  onBack: () => void;
}

const mockRankings = {
    gifting: [...mockUsers].sort(() => 0.5 - Math.random()).map(u => ({ ...u, value: Math.floor(Math.random() * 5000000) })),
    wealth: [...mockUsers].sort((a,b) => b.coinsBalance - a.coinsBalance).map(u => ({ ...u, value: u.coinsBalance })),
    charm: [...mockUsers].sort(() => 0.5 - Math.random()).map(u => ({ ...u, value: Math.floor(Math.random() * 1000000) })),
};

type RankingType = 'gifting' | 'wealth' | 'charm';

const LeaderboardItem: React.FC<{ rank: number, user: User, value: number, type: RankingType }> = ({ rank, user, value, type }) => {
    const rankColors = [
        'bg-yellow-400 text-black',
        'bg-gray-300 text-black',
        'bg-yellow-600 text-white'
    ];
    return (
        <div className="flex items-center p-3 glassmorphism rounded-lg">
            <div className={`w-8 h-8 flex items-center justify-center rounded-full text-lg font-bold ${rankColors[rank-1] || 'bg-slate-700 text-gray-300'}`}>
                {rank}
            </div>
            <img src={user.avatarUrl} alt={user.displayName} className="w-12 h-12 rounded-full ml-3" />
            <div className="ml-3 flex-grow">
                <p className="font-semibold text-white">{user.displayName}</p>
                 <div className="bg-orange-400 text-white text-xs font-bold px-2 py-0.5 rounded-full inline-block mt-1">
                    Lv.{user.level}
                </div>
            </div>
            <div className="ml-auto text-right">
                <p className="font-bold text-purple-400">{value.toLocaleString()}</p>
                <p className="text-xs text-gray-400">{type.charAt(0).toUpperCase() + type.slice(1)}</p>
            </div>
        </div>
    );
};

export const RankingScreen: React.FC<RankingScreenProps> = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState<RankingType>('gifting');
    const rankings = mockRankings[activeTab];

    return (
        <SubScreenWrapper title="Leaderboards" onBack={onBack}>
            <div className="min-h-full">
                <div className="p-4 bg-[var(--color-surface-1)] border-b border-[var(--color-border)]">
                    <div className="flex bg-slate-900/50 rounded-full p-1">
                        <button onClick={() => setActiveTab('gifting')} className={`w-1/3 py-2 rounded-full font-semibold transition-colors ${activeTab === 'gifting' ? 'bg-slate-700 shadow text-white' : 'text-gray-400'}`}>
                            Gifting
                        </button>
                         <button onClick={() => setActiveTab('wealth')} className={`w-1/3 py-2 rounded-full font-semibold transition-colors ${activeTab === 'wealth' ? 'bg-slate-700 shadow text-white' : 'text-gray-400'}`}>
                            Wealth
                        </button>
                        <button onClick={() => setActiveTab('charm')} className={`w-1/3 py-2 rounded-full font-semibold transition-colors ${activeTab === 'charm' ? 'bg-slate-700 shadow text-white' : 'text-gray-400'}`}>
                            Charm
                        </button>
                    </div>
                </div>

                <div className="p-4 space-y-3">
                    {rankings.map((r, i) => <LeaderboardItem key={r.id} rank={i+1} user={r} value={r.value} type={activeTab} />)}
                </div>
            </div>
        </SubScreenWrapper>
    );
};