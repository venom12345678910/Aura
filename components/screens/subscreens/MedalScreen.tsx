import React from 'react';
import { SubScreenWrapper } from './SubScreenWrapper';

interface MedalScreenProps {
  onBack: () => void;
}

const Medal: React.FC<{ icon: string, name: string, description: string, achieved: boolean }> = ({ icon, name, description, achieved }) => (
    <div className={`p-4 rounded-lg flex flex-col items-center text-center border-2 ${achieved ? 'glassmorphism border-yellow-400/50' : 'bg-slate-800/50 border-slate-700'}`}>
        <div className={`text-5xl mb-2 ${achieved ? '' : 'filter grayscale opacity-50'}`}>{icon}</div>
        <h3 className={`font-bold ${achieved ? 'text-yellow-300' : 'text-gray-400'}`}>{name}</h3>
        <p className={`text-xs mt-1 ${achieved ? 'text-yellow-200/80' : 'text-gray-500'}`}>{description}</p>
        {!achieved && <p className="text-xs font-semibold mt-2 text-gray-600">Locked</p>}
    </div>
)

export const MedalScreen: React.FC<MedalScreenProps> = ({ onBack }) => {
    const medals = [
        { icon: '🥇', name: 'Top Gifter', description: 'Gift over 1,000,000 coins', achieved: true },
        { icon: '🎤', name: 'Chatterbox', description: 'Speak for 100 hours', achieved: true },
        { icon: '🚀', name: 'Rocket Launcher', description: 'Launch a Level 5 rocket', achieved: false },
        { icon: '💎', name: 'Wealthy', description: 'Hold 500,000 coins', achieved: true },
        { icon: '🤝', name: 'Socialite', description: 'Follow 100 users', achieved: false },
        { icon: '👑', name: 'Room King', description: 'Host a room with 200+ participants', achieved: false },
    ];
  return (
    <SubScreenWrapper title="Medals" onBack={onBack}>
      <div className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {medals.map(medal => (
                <Medal key={medal.name} {...medal} />
            ))}
        </div>
      </div>
    </SubScreenWrapper>
  );
};
