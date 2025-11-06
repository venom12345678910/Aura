import React, { useState } from 'react';
import type { Emoji } from '../types';

interface EmojiPanelProps {
    onSendEmoji: (emoji: Emoji) => void;
    onClose: () => void;
}

const emojiCategories: { name: string, emojis: Emoji[] }[] = [
    {
        name: 'Popular',
        emojis: [
            { id: 'laugh', character: '😂' }, { id: 'love', character: '❤️' }, { id: 'fire', character: '🔥' },
            { id: 'clap', character: '👏' }, { id: 'wow', character: '😮' }, { id: 'thumbsup', character: '👍' },
            { id: 'party', character: '🎉' }, { id: 'money', character: '💸' },
        ],
    },
    {
        name: 'Love', // CP Emojis
        emojis: [
            { id: 'kiss', character: '😘' }, { id: 'hearteyes', character: '😍' }, { id: 'blush', character: '😊' },
            { id: 'couple', character: '💑' }, { id: 'rose', character: '🌹' }, { id: 'ring', character: '💍' },
            { id: 'hug', character: '🤗' }, { id: 'wink', character: '😉' },
        ],
    },
    {
        name: 'Party',
        emojis: [
            { id: 'dance', character: '💃' }, { id: 'music', character: '🎶' }, { id: 'mic', character: '🎤' },
            { id: 'confetti', character: '🎊' }, { id: 'crown', character: '👑' }, { id: 'cheers', character: '🍻' },
            { id: 'rocket', character: '🚀' }, { id: 'star', character: '⭐' },
        ],
    },
];

const EmojiTab: React.FC<{ label: string, isActive: boolean, onClick: () => void }> = ({ label, isActive, onClick }) => (
    <button onClick={onClick} className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors ${isActive ? 'text-cyan-300' : 'text-gray-400'}`}>
        {label}
        {isActive && <div className="w-4 h-0.5 bg-cyan-300 mx-auto mt-0.5 rounded-full" />}
    </button>
);


export const EmojiPanel: React.FC<EmojiPanelProps> = ({ onSendEmoji, onClose }) => {
    const [activeTab, setActiveTab] = useState(emojiCategories[0].name);

    return (
        <div 
            className="absolute bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-lg rounded-t-2xl animate-slide-up border-t border-cyan-400/20 flex flex-col z-40"
            onClick={e => e.stopPropagation()}
        >
            <div className="flex items-center justify-start gap-2 px-2 overflow-x-auto border-b border-slate-700">
                {emojiCategories.map(cat => (
                    <EmojiTab key={cat.name} label={cat.name} isActive={activeTab === cat.name} onClick={() => setActiveTab(cat.name)} />
                ))}
            </div>
            <div className="p-4 grid grid-cols-4 gap-4 max-h-52 overflow-y-auto">
                {emojiCategories.find(c => c.name === activeTab)?.emojis.map(emoji => (
                    <button 
                        key={emoji.id}
                        onClick={() => onSendEmoji(emoji)}
                        className="flex flex-col items-center p-2 rounded-lg transition-transform active:scale-90 hover:bg-white/10"
                    >
                        <span className="text-5xl drop-shadow-lg">{emoji.character}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};