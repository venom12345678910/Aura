import React from 'react';
import { SubScreenWrapper } from './SubScreenWrapper';
import { useToast } from '../../Toast';

export const ContactScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { addToast } = useToast();
  const handleContact = (method: string) => {
    addToast(`Contacting via ${method} is not available yet.`, 'info');
  };

  return (
    <SubScreenWrapper title="Contact Us" onBack={onBack}>
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold text-white">Get in Touch</h2>
        <p className="mt-2 text-gray-400">Have questions or feedback? We'd love to hear from you.</p>

        <div className="mt-8 space-y-4">
            <button onClick={() => handleContact('Email')} className="w-full p-4 rounded-lg bg-slate-800/50 hover:bg-slate-700/50">
                <p className="font-semibold text-white">Email Support</p>
                <p className="text-sm text-cyan-400">support@aura-voice.chat</p>
            </button>
             <button onClick={() => handleContact('Community')} className="w-full p-4 rounded-lg bg-slate-800/50 hover:bg-slate-700/50">
                <p className="font-semibold text-white">Join our Discord</p>
                <p className="text-sm text-cyan-400">discord.gg/AuraChat</p>
            </button>
        </div>
      </div>
    </SubScreenWrapper>
  );
};
