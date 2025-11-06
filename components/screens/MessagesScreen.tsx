import React from 'react';
import type { Conversation, User, Screen } from '../../types';
import { EnvelopeIcon } from '../icons/EnvelopeIcon';
import { UsersIcon } from '../icons/UsersIcon';
import { BellIcon } from '../icons/BellIcon';
import { ActivityIcon } from '../icons/ActivityIcon';
import { formatLastSeen } from '../../utils/time';

interface MessagesScreenProps {
  conversations: Conversation[];
  currentUser: User;
  onSelectConversation: (conversationId: string) => void;
  onNavigate: (screen: Screen, params?: any) => void;
}

const ConversationItem: React.FC<{
  conversation: Conversation;
  currentUser: User;
  onClick: () => void;
}> = ({ conversation, currentUser, onClick }) => {
  const otherUser = conversation.participants.find(p => p.id !== currentUser.id)!;
  const isSenderCurrentUser = conversation.lastMessage.senderId === currentUser.id;
  const isOnline = otherUser.lastSeen === 'online';

  return (
    <button onClick={onClick} className="w-full flex items-center p-3 hover:bg-white/10 transition-colors text-left rounded-lg">
      <div className="relative">
        <img src={otherUser.avatarUrl} alt={otherUser.displayName} className="w-14 h-14 rounded-full" />
        {isOnline && (
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-[var(--color-background-deep)]"></div>
        )}
        {conversation.unreadCount > 0 && (
          <span className="absolute -top-0 -right-0 block h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold border-2 border-[var(--color-background-deep)]">
            {conversation.unreadCount > 9 ? '9+' : conversation.unreadCount}
          </span>
        )}
      </div>
      <div className="ml-4 flex-1 overflow-hidden">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-white truncate">{otherUser.displayName}</h3>
          <p className="text-xs text-gray-400 flex-shrink-0">
            {conversation.lastMessage.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
        <p className="text-sm text-gray-400 truncate">
          {isSenderCurrentUser && 'You: '}{conversation.lastMessage.text}
        </p>
      </div>
    </button>
  );
};

const MemoizedConversationItem = React.memo(ConversationItem);


const SystemAction: React.FC<{ icon: React.ReactNode, label: string, onClick: () => void, badgeCount?: number }> = ({ icon, label, onClick, badgeCount }) => (
    <button onClick={onClick} className="flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-white/10 transition-colors">
        <div className="relative">
            <div className="w-14 h-14 rounded-full glassmorphism border-cyan-400/20 flex items-center justify-center">{icon}</div>
            {badgeCount && badgeCount > 0 && (
                <span className="absolute -top-1 -right-1 block h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold border-2 border-[var(--color-background-deep)]">
                    {badgeCount > 9 ? '9+' : badgeCount}
                </span>
            )}
        </div>
        <span className="text-xs text-gray-300">{label}</span>
    </button>
);


export const MessagesScreen: React.FC<MessagesScreenProps> = ({
  conversations,
  currentUser,
  onSelectConversation,
  onNavigate
}) => {
  return (
    <div className="pb-24 min-h-full">
      <header className="sticky top-0 z-10 p-4 pt-8 backdrop-blur-md bg-black/20">
        <h1 className="text-2xl font-bold text-white text-center cyan-text-glow">Messages</h1>
      </header>
      <div className="p-3">
        <div className="grid grid-cols-3 gap-3 mb-3">
            <SystemAction icon={<UsersIcon className="w-7 h-7 text-cyan-300" />} label="Friends" onClick={() => onNavigate('friends', {})} badgeCount={1} />
            <SystemAction icon={<BellIcon className="w-7 h-7 text-yellow-300" />} label="System" onClick={() => onNavigate('system-chat', {type: 'system'})} badgeCount={2} />
            <SystemAction icon={<ActivityIcon className="w-7 h-7 text-purple-300" />} label="Activity" onClick={() => onNavigate('system-chat', {type: 'activity'})} />
        </div>

        <div className="p-2 glassmorphism rounded-lg">
            {conversations.length > 0 ? (
            conversations.map(convo => (
                <MemoizedConversationItem
                key={convo.id}
                conversation={convo}
                currentUser={currentUser}
                onClick={() => onSelectConversation(convo.id)}
                />
            ))
            ) : (
            <div className="flex flex-col items-center justify-center text-center py-20 text-gray-500">
                <EnvelopeIcon className="w-16 h-16" />
                <h2 className="mt-4 text-lg font-semibold">No Messages Yet</h2>
                <p className="mt-1 text-sm">Start a conversation to see it here.</p>
            </div>
            )}
        </div>
      </div>
    </div>
  );
};