import React from 'react';
import { SubScreenWrapper } from './SubScreenWrapper';
import { SvipIcon } from '../../icons/SvipIcon';

interface SvipScreenProps {
  onBack: () => void;
}

const Perk: React.FC<{ icon: string, title: string, description: string }> = ({ icon, title, description }) => (
    <div className="flex items-start text-left p-3 glassmorphism rounded-lg">
        <div className="text-3xl mr-4">{icon}</div>
        <div>
            <h3 className="font-semibold text-yellow-300">{title}</h3>
            <p className="text-sm text-gray-300">{description}</p>
        </div>
    </div>
);

export const SvipScreen: React.FC<SvipScreenProps> = ({ onBack }) => {
  return (
    <SubScreenWrapper title="SVIP" onBack={onBack}>
      <div className="p-6 flex flex-col items-center text-center bg-gradient-to-b from-purple-900 via-slate-900 to-yellow-900/50">
        <div className="p-3 bg-yellow-400/20 rounded-full my-4 shadow-lg border-2 border-yellow-400/50">
          <SvipIcon className="w-20 h-20 text-yellow-300" />
        </div>
        <h2 className="text-3xl font-bold gold-text-glow">Become an SVIP</h2>
        <p className="mt-2 text-gray-300 max-w-sm">Unlock exclusive perks and stand out from the crowd!</p>

        <div className="my-8 w-full max-w-md space-y-4">
            <Perk icon="✨" title="Exclusive Profile Frame" description="Show off your status with a stunning, animated profile frame." />
            <Perk icon="🚀" title="Unique Entrance Effect" description="Make a grand entrance every time you join a room." />
            <Perk icon="🎁" title="SVIP-Only Gifts" description="Send exclusive gifts that only SVIP members can access." />
            <Perk icon="👑" title="Priority Display" description="Your name will be highlighted in chat and user lists." />
        </div>

        <div className="w-full max-w-sm mt-4 space-y-3">
             <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-400 text-black font-bold py-3 px-4 rounded-full transition-transform hover:scale-105 shadow-md">
                1 Month - $9.99
            </button>
             <button className="w-full bg-gradient-to-r from-yellow-600 to-orange-500 text-white font-bold py-3 px-4 rounded-full transition-transform hover:scale-105 shadow-lg">
                12 Months - $99.99 (Save 16%)
            </button>
        </div>
      </div>
    </SubScreenWrapper>
  );
};
