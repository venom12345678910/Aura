
import React, { useState } from 'react';
import { SubScreenWrapper } from './SubScreenWrapper';
import { mockFamilies } from '../../../data/mock';
import type { Screen } from '../../../types';
import { useToast } from '../../Toast';

interface FamilyListScreenProps {
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
}

const FamilyListItem: React.FC<{ family: typeof mockFamilies[0] }> = ({ family }) => {
    const { addToast } = useToast();
    const handleJoin = () => {
        addToast(`Join request sent to ${family.name}!`, 'success');
    };

    return (
        <div className="flex items-center p-3 bg-slate-800/50 hover:bg-slate-700/50 transition-colors rounded-lg">
            <div className="text-4xl w-12 h-12 flex items-center justify-center">{family.badgeUrl}</div>
            <div className="ml-3 flex-grow">
                <p className="font-bold text-white">{family.name}</p>
                <p className="text-sm text-gray-400">{family.members.length} Members | Lv.{family.level}</p>
            </div>
            <button onClick={handleJoin} className="bg-cyan-500 text-black font-semibold px-4 py-1.5 rounded-full text-sm">Join</button>
        </div>
    );
};

export const FamilyListScreen: React.FC<FamilyListScreenProps> = ({ onBack, onNavigate }) => {
    const [search, setSearch] = useState('');
    const filteredFamilies = mockFamilies.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <SubScreenWrapper title="Join a Family" onBack={onBack}>
            <div className="flex flex-col h-full">
                <div className="p-4 bg-slate-900/50 border-b border-[var(--color-border)]">
                    <input 
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search for a family by name"
                        className="w-full bg-slate-800/50 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-gray-400"
                    />
                </div>
                <div className="flex-grow overflow-y-auto p-2">
                    <div className="space-y-2">
                        {filteredFamilies.map(family => (
                            <FamilyListItem key={family.id} family={family} />
                        ))}
                    </div>
                </div>
                <div className="p-4 bg-slate-900/50 border-t border-[var(--color-border)]">
                    <button onClick={() => onNavigate('create-family')} className="w-full bg-purple-500 text-white font-bold py-3 rounded-full hover:bg-purple-600 transition-colors">
                        Create My Family
                    </button>
                </div>
            </div>
        </SubScreenWrapper>
    );
};
