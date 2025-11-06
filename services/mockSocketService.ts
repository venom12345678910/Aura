import type { ChatMessage } from '../types';
import { mockUsers } from '../data/mock';
import { generateChatReply } from './geminiService';

type MessageCallback = (message: ChatMessage | { type: 'typing', isTyping: boolean }) => void;

let onMessageCallback: MessageCallback | null = null;

// This service simulates a basic WebSocket connection for real-time chat.
export const mockSocketService = {
  /**
   * Connect to the mock socket and register a callback for incoming messages.
   * @param onMessage - The callback function to execute when a message is "received".
   */
  connect: (onMessage: MessageCallback) => {
    console.log('Mock WebSocket connected.');
    onMessageCallback = onMessage;
  },

  /**
   * Disconnect from the mock socket.
   */
  disconnect: () => {
    console.log('Mock WebSocket disconnected.');
    onMessageCallback = null;
  },

  /**
   * "Sends" a message. In this simulation, it triggers a delayed AI-generated reply.
   * @param text - The message text.
   * @param senderId - The ID of the user sending the message.
   * @param recipientId - The ID of the user receiving the message.
   */
  sendMessage: async (text: string, senderId: string, recipientId: string) => {
    console.log(`Sending message from ${senderId} to ${recipientId}: "${text}"`);

    // Simulate typing indicator
    if(onMessageCallback) {
        onMessageCallback({ type: 'typing', isTyping: true });
    }
    
    // Simulate an AI reply from the recipient after a short delay.
    setTimeout(async () => {
      if (onMessageCallback) {
        onMessageCallback({ type: 'typing', isTyping: false });
        const recipient = mockUsers.find(u => u.id === recipientId);
        if (!recipient) {
          console.error(`Could not find mock user with ID: ${recipientId}`);
          return;
        }

        const replyText = await generateChatReply(text);

        const reply: ChatMessage = {
          id: `msg-${Date.now()}`,
          text: replyText,
          senderId: recipientId,
          senderName: recipient.displayName,
          senderAvatar: recipient.avatarUrl,
          timestamp: new Date(),
        };
        onMessageCallback(reply);
      }
    }, 1200 + Math.random() * 1000);
  },
};