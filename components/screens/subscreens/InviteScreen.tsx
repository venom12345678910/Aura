import React from 'react';
import { SubScreenWrapper } from './SubScreenWrapper';
import { useToast } from '../../Toast';

export const InviteScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const { addToast } = useToast();

    const handleCopy = () => {
        navigator.clipboard.writeText('AURA1234');
        addToast('Code copied to clipboard!', 'success');
    };

    return (
        <SubScreenWrapper title="Invite Friends" onBack={onBack}>
            <div className="p-6 flex flex-col items-center text-center h-full">
                <div className="p-8 bg-yellow-400/20 rounded-full my-6">
                    <span className="text-6xl">🎉</span>
                </div>
                <h2 className="text-2xl font-bold text-white">Invite Friends, Earn Rewards!</h2>
                <p className="mt-2 text-gray-300">Share your invitation code with friends. When they sign up and top up, you both get coins!</p>
                
                <div className="my-8 w-full max-w-xs">
                    <p className="text-sm text-gray-400 mb-2">Your Invitation Code</p>
                    <div className="flex items-center justify-center p-3 bg-slate-700/50 border-2 border-dashed border-slate-600 rounded-lg">
                        <span className="text-2xl font-bold tracking-widest text-gray-200">AURA1234</span>
                        <button onClick={handleCopy} className="ml-auto bg-slate-600 text-gray-200 text-xs font-bold px-3 py-1 rounded">COPY</button>
                    </div>
                </div>

                <button className="w-full max-w-xs bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-4 rounded-full transition-colors">
                    Invite Now
                </button>
            </div>
        </SubScreenWrapper>
    );
};
