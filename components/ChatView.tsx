import React, { useState, useEffect, useRef } from 'react';
import type { Conversation, User, ChatMessage } from '../types';
import { mockSocketService } from '../services/mockSocketService';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { SendIcon } from './icons/SendIcon';
import { formatLastSeen } from '../utils/time';

interface ChatViewProps {
  conversation: Conversation;
  currentUser: User;
  onBack: () => void;
}

const MessageBubble: React.FC<{ message: ChatMessage; isCurrentUser: boolean }> = ({ message, isCurrentUser }) => {
  const alignment = isCurrentUser ? 'items-end' : 'items-start';
  const bubbleStyles = isCurrentUser
    ? 'glassmorphism border-cyan-400/50 bg-cyan-500/10 text-white rounded-br-lg'
    : 'glassmorphism bg-white/5 text-gray-200 rounded-bl-lg';

  return (
    <div className={`flex flex-col w-full ${alignment} my-1.5`}>
      <div className={`px-4 py-2 rounded-2xl max-w-xs md:max-w-md ${bubbleStyles}`}>
        <p className="text-sm break-words">{message.text}</p>
      </div>
       <p className="text-xs text-gray-500 mt-1 px-1">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </p>
    </div>
  );
};

export const ChatView: React.FC<ChatViewProps> = ({ conversation, currentUser, onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(conversation.messages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const otherUser = conversation.participants.find(p => p.id !== currentUser.id)!;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleIncomingMessage = (message: ChatMessage | { type: 'typing', isTyping: boolean }) => {
        if ('type' in message && message.type === 'typing') {
            setIsTyping(message.isTyping);
            return;
        }

        if ('senderId' in message && message.senderId === otherUser.id) {
            setMessages(prev => [...prev, message]);
        }
    };
    
    mockSocketService.connect(handleIncomingMessage);

    return () => {
      mockSocketService.disconnect();
    };
  }, [otherUser.id]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const messageToSend: ChatMessage = {
      id: `msg-${Date.now()}`,
      text: newMessage.trim(),
      senderId: currentUser.id,
      senderName: currentUser.displayName,
      senderAvatar: currentUser.avatarUrl,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, messageToSend]);
    mockSocketService.sendMessage(messageToSend.text, currentUser.id, otherUser.id);
    setNewMessage('');
  };

  const statusText = isTyping 
    ? 'typing...'
    : otherUser.lastSeen === 'online' 
    ? 'Online'
    : formatLastSeen(otherUser.lastSeen);


  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <header className="flex items-center p-4 glassmorphism rounded-none flex-shrink-0 z-10">
        <button onClick={onBack} className="p-1 mr-3 text-white">
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <img src={otherUser.avatarUrl} alt={otherUser.displayName} className="w-10 h-10 rounded-full" />
        <div className="ml-3">
            <h2 className="text-lg font-bold text-white">{otherUser.displayName}</h2>
            <p className={`text-xs ${isTyping || otherUser.lastSeen === 'online' ? 'text-green-400' : 'text-gray-400'}`}>{statusText}</p>
        </div>
      </header>

      {/* Message List */}
      <div className="flex-grow p-4 overflow-y-auto">
        {messages.map(msg => (
          <MessageBubble key={msg.id} message={msg} isCurrentUser={msg.senderId === currentUser.id} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <footer className="glassmorphism rounded-none p-4 flex-shrink-0">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="w-full bg-slate-900/50 px-4 py-3 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 border border-transparent"
          />
          <button type="submit" className="flex-shrink-0 w-12 h-12 bg-cyan-500 rounded-full text-black disabled:bg-gray-500 hover:bg-cyan-400 active:scale-95 transition-all flex items-center justify-center">
            <SendIcon className="w-6 h-6" />
          </button>
        </form>
      </footer>
    </div>
  );
};