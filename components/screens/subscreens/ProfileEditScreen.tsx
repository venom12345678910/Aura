import React, { useState } from 'react';
import { SubScreenWrapper } from './SubScreenWrapper';
import type { User } from '../../../types';
import { mockAvatarOptions } from '../../../data/mock';
import { useToast } from '../../Toast';

interface ProfileEditScreenProps {
  user: User;
  onBack: () => void;
  onSave: (updates: Partial<User>) => void;
}

export const ProfileEditScreen: React.FC<ProfileEditScreenProps> = ({ user, onBack, onSave }) => {
    const { addToast } = useToast();
    const [avatar, setAvatar] = useState(user.avatarUrl);
    const [displayName, setDisplayName] = useState(user.displayName);
    const [bio, setBio] = useState(user.bio);
    const [gender, setGender] = useState(user.gender);

    const handleSave = () => {
        if (displayName.trim().length < 3) {
            addToast('Display name must be at least 3 characters.', 'error');
            return;
        }
        onSave({ avatarUrl: avatar, displayName, bio, gender });
        addToast('Profile updated successfully!', 'success');
    };

    return (
        <SubScreenWrapper title="Edit Profile" onBack={onBack}>
            <div className="absolute top-4 right-4 z-10">
                <button onClick={handleSave} className="bg-cyan-500 text-black font-bold py-2 px-4 rounded-full text-sm">Save</button>
            </div>
            <div className="p-6 space-y-6">
                <div className="flex flex-col items-center">
                    <img src={avatar} alt="Avatar" className="w-24 h-24 rounded-full border-4 border-yellow-400" />
                </div>

                <div>
                    <h3 className="font-semibold text-gray-300 mb-2">Change Avatar</h3>
                    <div className="grid grid-cols-4 gap-3">
                        {mockAvatarOptions.map(option => (
                            <img 
                                key={option}
                                src={option}
                                alt="Avatar option"
                                className={`w-16 h-16 rounded-full cursor-pointer border-2 transition-all ${avatar === option ? 'border-cyan-400 scale-110' : 'border-transparent'}`}
                                onClick={() => setAvatar(option)}
                            />
                        ))}
                    </div>
                </div>

                <div>
                    <label className="font-semibold text-gray-300 mb-1 block">Display Name</label>
                    <input 
                        type="text"
                        value={displayName}
                        onChange={e => setDisplayName(e.target.value)}
                        className="w-full bg-slate-700/50 px-3 py-2 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                </div>
                <div>
                    <label className="font-semibold text-gray-300 mb-1 block">Bio</label>
                    <textarea 
                        value={bio}
                        onChange={e => setBio(e.target.value)}
                        rows={3}
                        className="w-full bg-slate-700/50 px-3 py-2 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                </div>
                 <div>
                    <label className="font-semibold text-gray-300 mb-2 block">Gender</label>
                    <div className="flex gap-3">
                        {(['Male', 'Female', 'Private'] as const).map(g => (
                            <button
                                key={g}
                                onClick={() => setGender(g)}
                                className={`px-4 py-2 rounded-full font-semibold text-sm ${gender === g ? 'bg-cyan-500 text-black' : 'bg-slate-700 text-white'}`}
                            >
                                {g}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </SubScreenWrapper>
    );
};