import React from 'react';
import { SubScreenWrapper } from './SubScreenWrapper';
import type { User } from '../../../types';
import { ExpBar } from '../../ExpBar';

interface LevelScreenProps {
  onBack: () => void;
  user: User;
}

const Perk: React.FC<{ level: number, text: string, achieved: boolean, isLast: boolean, align: 'left' | 'right' }> = ({ level, text, achieved, isLast, align }) => {
    const alignmentClasses = align === 'left' ? 'items-start' : 'items-end';
    const contentOrder = align === 'left' ? '' : 'flex-row-reverse';
    
    return (
        <div className={`relative flex ${alignmentClasses} w-full`}>
            <div className={`w-1/2 flex gap-4 ${contentOrder} items-center`}>
                <div className={`w-full max-w-[150px] p-3 rounded-lg ${achieved ? 'glassmorphism border-green-400/50' : 'bg-slate-800/50'}`}>
                    <p className={`font-bold ${achieved ? 'text-green-300' : 'text-gray-400'}`}>{text}</p>
                </div>
                <div className="relative">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm z-10 relative ${achieved ? 'bg-green-500 text-white' : 'bg-slate-700 text-gray-300'}`}>
                        {level}
                    </div>
                </div>
            </div>
            {!isLast && <div className="absolute top-5 left-1/2 -translate-x-1/2 h-full w-0.5 bg-slate-700"></div>}
        </div>
    );
}

export const LevelScreen: React.FC<LevelScreenProps> = ({ onBack, user }) => {
    const perks = [
        { level: 5, text: 'Unlock special chat bubble', achieved: user.level >= 5 },
        { level: 10, text: 'New profile frame', achieved: user.level >= 10 },
        { level: 15, text: 'Exclusive "Veteran" medal', achieved: user.level >= 15 },
        { level: 20, text: 'Unlock room background themes', achieved: user.level >= 20 },
        { level: 25, text: 'Unique entrance effect', achieved: user.level >= 25 },
        { level: 30, text: 'Create a Family', achieved: user.level >= 30 },
    ];
  return (
    <SubScreenWrapper title="Level" onBack={onBack}>
      <div className="p-6 flex flex-col items-center text-center min-h-full">
        <div className="text-6xl mb-4">🏆</div>
        <h2 className="text-2xl font-bold text-white">Level {user.level}</h2>
        <p className="text-gray-300">Keep participating to earn EXP and level up!</p>
        <div className="w-full max-w-sm my-6">
            <ExpBar currentExp={user.currentExp} totalExp={user.totalExp} level={user.level} />
        </div>

        <div className="w-full text-left mt-4">
            <h3 className="text-lg font-semibold text-white mb-3 text-center">Reward Path</h3>
            <div className="relative flex flex-col items-center w-full gap-8 py-4">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-0.5 bg-slate-700"></div>
                {perks.map((perk, index) => (
                    <Perk 
                        key={perk.level} 
                        {...perk} 
                        align={index % 2 === 0 ? 'left' : 'right'}
                        isLast={index === perks.length - 1}
                    />
                ))}
            </div>
        </div>
      </div>
    </SubScreenWrapper>
  );
};
