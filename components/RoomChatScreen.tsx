import React, { useState, useEffect, useRef } from 'react';
import type { ChatMessage, User } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { SendIcon } from './icons/SendIcon';

interface RoomChatScreenProps {
  messages: ChatMessage[];
  currentUser: User;
  onSendMessage: (text: string) => void;
  onDeleteMessage: (messageId: string) => void;
  onClose: () => void;
}

interface MessageBubbleProps {
    message: ChatMessage;
    isCurrentUser: boolean;
    onLongPress: (message: ChatMessage, target: HTMLElement) => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isCurrentUser, onLongPress }) => {
    const longPressTimer = useRef<number>();

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        longPressTimer.current = window.setTimeout(() => {
            onLongPress(message, e.currentTarget);
        }, 500); // 500ms for long press
    };

    const handleTouchEnd = () => {
        if (longPressTimer.current) {
            clearTimeout(longPressTimer.current);
        }
    };
    
    if (message.isSystemMessage) {
        return (
            <div className="text-center my-2 px-4">
                <p className="text-xs text-cyan-300 bg-cyan-900/50 rounded-full px-3 py-1 inline-block">{message.text}</p>
            </div>
        )
    }

    return (
        <div 
            className="flex items-start my-2 px-4"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onContextMenu={(e) => { e.preventDefault(); onLongPress(message, e.currentTarget); }}
        >
            <img src={message.senderAvatar} alt={message.senderName} className="w-8 h-8 rounded-full mr-2 flex-shrink-0" />
            <div className="flex flex-col max-w-[80%]">
                <p className="text-xs text-gray-400">{message.senderName}</p>
                <div className={`p-2 rounded-lg text-sm ${isCurrentUser ? 'bg-cyan-600/70 text-white rounded-tl-lg' : 'bg-slate-700/80 text-white rounded-tr-lg'}`}>
                    <p className="break-words">{message.text}</p>
                </div>
            </div>
        </div>
    );
};


export const RoomChatScreen: React.FC<RoomChatScreenProps> = ({ messages, currentUser, onSendMessage, onDeleteMessage, onClose }) => {
    const [newMessage, setNewMessage] = useState('');
    const [contextMenu, setContextMenu] = useState<{ messageId: string, anchor: HTMLElement } | null>(null);
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
    
    const handleLongPress = (message: ChatMessage, anchor: HTMLElement) => {
        if (message.senderId === currentUser.id && !message.isDeleted) {
            setContextMenu({ messageId: message.id, anchor });
        }
    };

    const handleDelete = () => {
        if (contextMenu) {
            onDeleteMessage(contextMenu.messageId);
            setContextMenu(null);
        }
    };

    return (
        <div className="absolute inset-0 z-30 bg-black/80 backdrop-blur-md flex flex-col animate-fade-in">
            <header className="flex items-center p-4 bg-black/30 flex-shrink-0 z-10">
                <button onClick={onClose} className="p-1 mr-3 text-white">
                  <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h2 className="text-lg font-bold text-white">Room Chat</h2>
            </header>
            
             <div className="flex-grow overflow-y-auto py-2" onClick={() => setContextMenu(null)}>
                {messages.map(msg => (
                    <MessageBubble 
                        key={msg.id} 
                        message={msg} 
                        isCurrentUser={msg.senderId === currentUser.id}
                        onLongPress={handleLongPress}
                    />
                ))}
                <div ref={messagesEndRef} />
            </div>

             <footer className="bg-black/30 p-4 flex-shrink-0">
                <form onSubmit={handleSend} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Say something..."
                    className="w-full bg-slate-900/50 px-4 py-3 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 border border-transparent"
                  />
                  <button type="submit" className="flex-shrink-0 w-12 h-12 bg-cyan-500 rounded-full text-black disabled:bg-gray-500 hover:bg-cyan-400 active:scale-95 transition-all flex items-center justify-center">
                    <SendIcon className="w-6 h-6" />
                  </button>
                </form>
            </footer>

            {contextMenu && (
                <div 
                    className="absolute p-2 bg-slate-700 rounded-lg shadow-lg"
                    style={{ top: contextMenu.anchor.getBoundingClientRect().bottom + 4, left: contextMenu.anchor.getBoundingClientRect().left }}
                >
                    <button onClick={handleDelete} className="text-red-400 font-semibold text-sm">Delete</button>
                </div>
            )}

        </div>
    );
};