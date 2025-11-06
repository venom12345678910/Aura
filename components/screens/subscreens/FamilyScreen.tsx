import React from 'react';
import { SubScreenWrapper } from './SubScreenWrapper';
import type { User, Screen } from '../../../types';
import { mockFamilies } from '../../../data/mock';

interface FamilyScreenProps {
  onBack: () => void;
  user: User;
  onNavigate: (screen: Screen) => void;
}

export const FamilyScreen: React.FC<FamilyScreenProps> = ({ onBack, user, onNavigate }) => {
  const family = mockFamilies.find(f => f.id === user.familyId);

  if (!family) {
    return (
      <SubScreenWrapper title="Family" onBack={onBack}>
        <div className="p-8 flex flex-col items-center justify-center h-full text-center">
          <div className="text-5xl mb-6">👨‍👩‍👧‍👦</div>
          <h2 className="text-2xl font-bold text-white">You are not in a Family</h2>
          <p className="mt-2 text-gray-300 max-w-sm">Join a family to connect with friends, participate in events, and climb the leaderboards together!</p>
          <button onClick={() => onNavigate('family-list')} className="mt-6 bg-cyan-500 text-black font-bold py-3 px-6 rounded-full transition-colors hover:bg-cyan-400">
            Join or Create a Family
          </button>
        </div>
      </SubScreenWrapper>
    );
  }

  return (
    <SubScreenWrapper title={family.name} onBack={onBack}>
      <div>
        <div className="p-6 flex flex-col items-center text-center bg-slate-800/50 border-b border-[var(--color-border)]">
          <div className="text-6xl mb-4">{family.badgeUrl}</div>
          <h2 className="text-2xl font-bold text-white">{family.name}</h2>
          <div className="bg-purple-500/30 text-purple-200 text-sm font-bold px-3 py-1 rounded-full mt-2">
            Level {family.level}
          </div>
          <p className="text-gray-300 mt-4 max-w-md">{family.description}</p>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-white mb-2">Members ({family.members.length})</h3>
          <div className="space-y-2">
            {family.members.map(member => (
              <div key={member.id} className="flex items-center p-2 bg-slate-800/50 rounded-lg">
                <img src={member.avatarUrl} alt={member.displayName} className="w-10 h-10 rounded-full" />
                <div className="ml-3">
                  <p className="font-semibold text-white">{member.displayName}</p>
                  <p className="text-xs text-gray-400">Lv.{member.level}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SubScreenWrapper>
  );
};
