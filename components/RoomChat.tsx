import React, { useState, useEffect, useRef } from 'react';
import type { ChatMessage } from '../types';
import { SendIcon } from './icons/SendIcon';

interface RoomChatProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
}

const ChatBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
    if (message.isSystemMessage) {
        return (
            <div className="text-center my-2">
                <p className="text-xs text-cyan-300 bg-cyan-900/50 rounded-full px-3 py-1 inline-block">{message.text}</p>
            </div>
        )
    }

    return (
        <div className="flex items-start my-2">
            <img src={message.senderAvatar} alt={message.senderName} className="w-6 h-6 rounded-full mr-2 flex-shrink-0" />
            <div className="flex flex-col">
                <p className="text-xs text-gray-400">{message.senderName}</p>
                <div className="bg-slate-700/80 p-2 rounded-lg rounded-tl-none">
                    <p className="text-sm text-white">{message.text}</p>
                </div>
            </div>
        </div>
    );
};

export const RoomChat: React.FC<RoomChatProps> = ({ messages, onSendMessage }) => {
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim()) {
            onSendMessage(newMessage.trim());
            setNewMessage('');
        }
    };

    return (
        <div className="h-full w-full glassmorphism rounded-xl flex flex-col p-2">
            <div className="flex-grow overflow-y-auto pr-2">
                {messages.map((msg) => (
                    <ChatBubble key={msg.id} message={msg} />
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSend} className="flex items-center mt-2">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Say something..."
                    className="w-full bg-slate-900/70 text-sm px-3 py-2 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                />
                <button type="submit" className="ml-2 p-2 bg-cyan-500 rounded-full text-black">
                    <SendIcon className="w-4 h-4" />
                </button>
            </form>
        </div>
    );
};