import React, { useEffect, useRef } from 'react';
import type { ChatMessage } from '../types';

interface EmbeddedRoomChatProps {
  messages: ChatMessage[];
  onClick: () => void;
}

export const EmbeddedRoomChat: React.FC<EmbeddedRoomChatProps> = ({ messages, onClick }) => {
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const displayedMessages = messages.slice(-5);

  return (
    <div 
        onClick={onClick}
        className="absolute bottom-24 left-2 w-3/5 max-w-sm h-40 bg-black/30 backdrop-blur-sm rounded-lg p-2 flex flex-col justify-end chat-feed-mask cursor-pointer"
    >
        <div className="overflow-y-hidden">
            {displayedMessages.map((msg, index) => (
                <div key={`${msg.id}-${index}`} className="text-sm my-0.5 animate-fade-in">
                    {msg.isSystemMessage ? (
                        <span className="text-cyan-300">{msg.text}</span>
                    ) : (
                        <span>
                            <span className="font-semibold text-gray-400">{msg.senderName}: </span>
                            <span className="text-white">{msg.text}</span>
                        </span>
                    )}
                </div>
            ))}
            <div ref={chatEndRef} />
        </div>
    </div>
  );
};