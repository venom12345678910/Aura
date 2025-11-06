import React, { useState } from 'react';
import { SubScreenWrapper } from './SubScreenWrapper';
import type { User } from '../../../types';
import { useToast } from '../../Toast';

interface CreateFamilyScreenProps {
  onBack: () => void;
  user: User;
  onUpdateUser: (updates: Partial<User>) => void;
}

const badgeOptions = ['🛡️', '🌌', '⚔️', '🔥', '👑', '💎', '🚀', '🌟'];

export const CreateFamilyScreen: React.FC<CreateFamilyScreenProps> = ({ onBack, user, onUpdateUser }) => {
    const { addToast } = useToast();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [badge, setBadge] = useState(badgeOptions[0]);

    const handleCreate = () => {
        const creationCost = 1000000;
        if (user.level < 30) {
            addToast('You must be level 30 or higher to create a family.', 'error');
            return;
        }
        if (user.coinsBalance < creationCost) {
            addToast(`You need ${creationCost.toLocaleString()} coins to create a family.`, 'error');
            return;
        }
        if (name.trim().length < 3 || name.trim().length > 20) {
            addToast('Family name must be between 3 and 20 characters.', 'error');
            return;
        }
        if (description.trim().length > 100) {
            addToast('Description cannot exceed 100 characters.', 'error');
            return;
        }

        // TODO: In a real app, this would be a backend call.
        // We simulate it here by updating the user.
        onUpdateUser({
            coinsBalance: user.coinsBalance - creationCost,
            familyId: `family-${Date.now()}`,
            familyRole: 'owner',
        });
        addToast(`Congratulations! Family "${name}" has been created!`, 'success');
        onBack();
    };


    return (
        <SubScreenWrapper title="Create Family" onBack={onBack}>
            <div className="p-6 space-y-6 text-white">
                 <div>
                    <label className="font-semibold text-gray-300 mb-2 block text-center">Choose a Badge</label>
                    <div className="flex justify-center flex-wrap gap-3 bg-slate-800/50 p-3 rounded-lg">
                        {badgeOptions.map(b => (
                            <button key={b} onClick={() => setBadge(b)} className={`w-12 h-12 text-3xl rounded-full flex items-center justify-center transition-all ${badge === b ? 'bg-cyan-500 scale-110' : 'bg-slate-700'}`}>
                                {b}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="font-semibold text-gray-300 mb-1 block">Family Name</label>
                    <input 
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Your epic family name"
                        maxLength={20}
                        className="w-full bg-slate-700/50 px-3 py-2 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                </div>
                <div>
                    <label className="font-semibold text-gray-300 mb-1 block">Description</label>
                    <textarea 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        rows={3}
                        maxLength={100}
                        placeholder="A short description for your family"
                        className="w-full bg-slate-700/50 px-3 py-2 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                </div>
                <div className="text-center text-sm text-gray-400">
                    <p>Cost to create: <span className="font-bold text-yellow-400">1,000,000 Coins</span></p>
                    <p>Requirement: <span className="font-bold text-purple-400">Level 30+</span></p>
                </div>
                 <button onClick={handleCreate} className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-black font-bold py-3 rounded-full text-lg">
                    Create Family
                </button>
            </div>
        </SubScreenWrapper>
    );
};