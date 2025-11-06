import React, { useState } from 'react';
import type { Emoji } from '../types';
import { SendIcon } from './icons/SendIcon';
import { EmoticonIcon } from './icons/EmoticonIcon';
import { BracesIcon } from './icons/BracesIcon';
import { EmojiPanel } from './EmojiPanel';

interface RoomChatPanelProps {
  onSendMessage: (text: string) => void;
  onSendEmoji: (emoji: Emoji) => void;
  onClose: () => void;
}

export const RoomChatPanel: React.FC<RoomChatPanelProps> = ({ onSendMessage, onSendEmoji, onClose }) => {
  const [message, setMessage] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
      onClose();
    }
  };

  const handleEmojiSelect = (emoji: Emoji) => {
    onSendEmoji(emoji);
    setShowEmoji(false);
    onClose();
  };

  return (
    <div className="absolute inset-0 z-40" onClick={onClose}>
        <div className="absolute bottom-0 left-0 right-0" onClick={e => e.stopPropagation()}>
            {showEmoji ? (
                 <EmojiPanel onSendEmoji={handleEmojiSelect} onClose={() => setShowEmoji(false)} />
            ) : (
                <div className="bg-slate-900/90 backdrop-blur-lg p-3 border-t border-cyan-400/20 animate-slide-up">
                    <form onSubmit={handleSubmit} className="flex items-center gap-2">
                        <button type="button" onClick={() => setShowEmoji(true)} className="w-12 h-12 bg-black/40 rounded-full flex items-center justify-center">
                            <EmoticonIcon className="w-7 h-7 text-yellow-300" />
                        </button>
                        <input
                            type="text"
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            placeholder="Say something..."
                            autoFocus
                            className="bg-black/40 w-full h-12 px-4 text-white placeholder-gray-400 focus:outline-none rounded-full"
                        />
                        <button type="submit" className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center text-black">
                            <SendIcon className="w-6 h-6" />
                        </button>
                    </form>
                </div>
            )}
        </div>
    </div>
  );
};