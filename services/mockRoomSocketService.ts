import type { Room, User, Gift, GiftEvent, ChatMessage, RoomEvent, Emoji, EmojiEvent, LuckyBag } from '../types';
import { mockUsers } from '../data/mock';
import { generateChatReply } from './geminiService';

type EventCallback<T> = (data: T) => void;

interface SpeakingEvent {
    userId: string;
    isSpeaking: boolean;
}

const mockEmojis: Emoji[] = [
    { id: 'laugh', character: '😂' },
    { id: 'love', character: '❤️' },
    { id: 'fire', character: '🔥' },
    { id: 'clap', character: '👏' },
    { id: 'wow', character: '😮' },
];

interface Callbacks {
  onParticipantJoin?: EventCallback<(RoomEvent & { type: 'join' })['data']>;
  onParticipantLeave?: EventCallback<User>;
  onGiftReceived?: EventCallback<GiftEvent & { updatedRoom: Room }>;
  onEmojiReceived?: EventCallback<EmojiEvent>;
  onParticipantSpeaking?: EventCallback<SpeakingEvent>;
  onRoomUpdate?: EventCallback<Room>;
  onChatMessage?: EventCallback<ChatMessage>;
  onLuckyBagCreated?: EventCallback<LuckyBag>;
  onLuckyBagClaimed?: EventCallback<{ bag: LuckyBag, user: User, amount: number }>;
  onLuckyBagFinished?: EventCallback<LuckyBag>;
  onDeleteMessage?: EventCallback<{ messageId: string, deletedBy: string }>;
}

let callbacks: Callbacks = {};
let activityInterval: number | null = null;
let currentRoom: Room | null = null;
let userPool: User[] = []; 
let currentlySpeaking: string | null = null;
let luckyBagTimeout: number | null = null;

const mockRoomSocketService = {
  connect: (room: Room, cbs: Callbacks) => {
    console.log(`[Socket] Connecting to room: ${room.id}`);
    currentRoom = JSON.parse(JSON.stringify(room));
    callbacks = cbs;

    const participantIds = new Set(currentRoom.participants.map(p => p.id));
    userPool = mockUsers.filter(u => !participantIds.has(u.id));

    activityInterval = window.setInterval(() => {
      if (!currentRoom) return;

      const eventType = Math.random();
      const otherUsers = currentRoom.participants.filter(p => p.id !== currentRoom!.host.id && p.id !== 'user-0');
      
      if (otherUsers.length === 0) return;
      const randomUser = otherUsers[Math.floor(Math.random() * otherUsers.length)];

      if(eventType < 0.1) { // 10% chance to send an emoji
          const randomEmoji = mockEmojis[Math.floor(Math.random() * mockEmojis.length)];
          const emojiEvent: EmojiEvent = { id: `emoji-${Date.now()}`, emoji: randomEmoji, sender: randomUser };
          callbacks.onEmojiReceived?.(emojiEvent);
          return;
      }

      // Simulate opponent score in PK
      if(currentRoom.pkState && eventType < 0.5) {
        currentRoom.pkState.opponentScore += Math.floor(Math.random() * 5000);
        console.log(`[Socket] PK Update in room ${currentRoom.id}`);
        callbacks.onRoomUpdate?.(JSON.parse(JSON.stringify(currentRoom)));
        return;
      }


      // Event Type 1: Participant Join/Leave (30% chance)
      if (eventType < 0.3) {
        const isJoining = Math.random() > 0.5;

        if (isJoining && userPool.length > 0) {
          const userIndex = Math.floor(Math.random() * userPool.length);
          const joiningUser = userPool[userIndex];
          userPool.splice(userIndex, 1);
          currentRoom.participants.push(joiningUser);
          currentRoom.participantCount++;
          console.log(`[Socket] User ${joiningUser.displayName} joined room ${currentRoom.id}`);
          callbacks.onParticipantJoin?.({ user: joiningUser, entryEffectId: joiningUser.equippedEntryEffectId });
        } else if (!isJoining && currentRoom.participants.length > 2) {
          const leaveableParticipants = currentRoom.participants.filter(p => p.id !== currentRoom!.host.id && p.id !== 'user-0');
          if (leaveableParticipants.length > 0) {
            const userIndex = Math.floor(Math.random() * leaveableParticipants.length);
            const leavingUser = leaveableParticipants[userIndex];
            
            if (currentlySpeaking === leavingUser.id) {
              callbacks.onParticipantSpeaking?.({ userId: leavingUser.id, isSpeaking: false });
              currentlySpeaking = null;
            }

            currentRoom.participants = currentRoom.participants.filter(p => p.id !== leavingUser.id);
            currentRoom.participantCount--;
            userPool.push(leavingUser);
            console.log(`[Socket] User ${leavingUser.displayName} left room ${currentRoom.id}`);
            callbacks.onParticipantLeave?.(leavingUser);
          }
        }
      } 
      // Event Type 2: Participant starts speaking (if no one is speaking)
      else if (eventType >= 0.3 && !currentlySpeaking) {
        const potentialSpeakers = currentRoom.participants.filter(p => p.id !== 'user-0');
        if(potentialSpeakers.length > 0) {
            const speaker = potentialSpeakers[Math.floor(Math.random() * potentialSpeakers.length)];
            currentlySpeaking = speaker.id;
            
            console.log(`[Socket] ${speaker.displayName} started speaking.`);
            callbacks.onParticipantSpeaking?.({ userId: speaker.id, isSpeaking: true });

            setTimeout(() => {
                if (currentlySpeaking === speaker.id) {
                    console.log(`[Socket] ${speaker.displayName} stopped speaking.`);
                    callbacks.onParticipantSpeaking?.({ userId: speaker.id, isSpeaking: false });
                    currentlySpeaking = null;
                }
            }, 2000 + Math.random() * 4000); // Speak for 2-6 seconds
        }
      }
    }, 4000); // Activity every 4 seconds
  },

  disconnect: () => {
    console.log('[Socket] Disconnecting from room...');
    if (activityInterval) clearInterval(activityInterval);
    if (luckyBagTimeout) clearTimeout(luckyBagTimeout);
    activityInterval = null;
    luckyBagTimeout = null;
    callbacks = {};
    currentRoom = null;
    userPool = [];
    currentlySpeaking = null;
  },
  
  updateRoomSettings: (updatedRoom: Room) => {
    if (!currentRoom) return;
    currentRoom = { ...currentRoom, ...updatedRoom };
    console.log(`[Socket] Broadcasting room update for ${currentRoom.id}`);
    // Broadcast the full updated room object
    callbacks.onRoomUpdate?.(JSON.parse(JSON.stringify(currentRoom)));
  },

  sendMessage: (message: ChatMessage) => {
    if (!currentRoom || !callbacks.onChatMessage) return;
    console.log(`[Socket] Message sent in room ${currentRoom.id}: "${message.text}"`);
    
    // Simulate a reply from another user using AI
    setTimeout(async () => {
        const otherUsers = currentRoom?.participants.filter(p => p.id !== message.senderId && p.id !== 'user-0' && p.id !== currentRoom?.host.id);
        if(otherUsers && otherUsers.length > 0) {
            const randomUser = otherUsers[Math.floor(Math.random() * otherUsers.length)];
            const replyText = await generateChatReply(message.text);
            const reply: ChatMessage = {
                id: `msg-${Date.now()}`,
                text: replyText,
                senderId: randomUser.id,
                senderName: randomUser.displayName,
                senderAvatar: randomUser.avatarUrl,
                timestamp: new Date(),
            };
            callbacks.onChatMessage?.(reply);
        }
    }, 1500 + Math.random() * 2000);
  },

  sendGift: (gift: Gift, sender: User) => {
    if (!currentRoom || !callbacks.onGiftReceived) return;

    const activeRocket = currentRoom.rockets.find(r => r.status === 'active');
    if (activeRocket) {
        activeRocket.currentAmount += gift.coinValue;
        
        if (!activeRocket.contributions) activeRocket.contributions = [];
        const existingContribution = activeRocket.contributions.find(c => c.userId === sender.id);
        if (existingContribution) {
            existingContribution.amount += gift.coinValue;
        } else {
            activeRocket.contributions.push({ userId: sender.id, amount: gift.coinValue });
        }

        if (activeRocket.currentAmount >= activeRocket.targetAmount) {
            activeRocket.status = 'launched';
            const nextRocket = currentRoom.rockets.find(rk => rk.level === activeRocket.level + 1);
            if (nextRocket) {
                nextRocket.status = 'active';
            }
        }
    }
    
    // Update PK score if in a battle
    if (currentRoom.pkState) {
        currentRoom.pkState.myScore += gift.coinValue;
        console.log(`[Socket] PK score updated for ${currentRoom.host.displayName}: ${currentRoom.pkState.myScore}`);
    }

    const giftEvent: GiftEvent & { updatedRoom: Room } = {
        id: `gift-event-${Date.now()}`,
        gift,
        sender,
        receiver: currentRoom.host,
        updatedRoom: JSON.parse(JSON.stringify(currentRoom)),
    };
    
    console.log(`[Socket] Broadcasting gift: ${gift.name} from ${sender.displayName} in room ${currentRoom.id}`);
    callbacks.onGiftReceived(giftEvent);
  },
  
  sendEmoji: (emoji: Emoji, sender: User) => {
    if (!currentRoom || !callbacks.onEmojiReceived) return;
    const emojiEvent: EmojiEvent = { id: `emoji-${Date.now()}`, emoji, sender };
    console.log(`[Socket] Broadcasting emoji: ${emoji.character} from ${sender.displayName}`);
    callbacks.onEmojiReceived(emojiEvent);
  },

  deleteMessage: (messageId: string, deletedBy: string) => {
    if (!currentRoom || !callbacks.onDeleteMessage) return;
    console.log(`[Socket] Message ${messageId} deleted by ${deletedBy} in room ${currentRoom.id}`);
    callbacks.onDeleteMessage({ messageId, deletedBy });
  },

  createLuckyBag: (creator: User, totalCoins: number, totalBags: number) => {
    if (!currentRoom || currentRoom.activeLuckyBag) return;

    const newBag: LuckyBag = {
        id: `lb-${Date.now()}`,
        creator,
        totalCoins,
        totalBags,
        bagsLeft: totalBags,
        endTime: Date.now() + 25000,
        claimedBy: {},
    };

    currentRoom.activeLuckyBag = newBag;
    callbacks.onLuckyBagCreated?.(newBag);

    luckyBagTimeout = window.setTimeout(() => {
        if (currentRoom?.activeLuckyBag?.id === newBag.id) {
            console.log(`[Socket] Lucky Bag ${newBag.id} finished.`);
            callbacks.onLuckyBagFinished?.(currentRoom.activeLuckyBag);
            currentRoom.activeLuckyBag = undefined;
        }
    }, 25000);
  },

  claimLuckyBag: (user: User) => {
    if (!currentRoom?.activeLuckyBag || !callbacks.onLuckyBagClaimed) return;

    const bag = currentRoom.activeLuckyBag;
    if (user.id === bag.creator.id || bag.claimedBy[user.id] !== undefined || bag.bagsLeft <= 0) {
        return; // Cannot claim
    }

    let amount = 0;
    if (bag.bagsLeft === 1) {
        // Last person gets the rest
        const claimedTotal = Object.values(bag.claimedBy).reduce((sum, val) => sum + val, 0);
        amount = bag.totalCoins - claimedTotal;
    } else {
        // Random amount, ensuring it's not too skewed
        const remainingCoins = bag.totalCoins - Object.values(bag.claimedBy).reduce((sum, val) => sum + val, 0);
        const avgAmount = remainingCoins / bag.bagsLeft;
        amount = Math.floor(avgAmount * (Math.random() * 1.5 + 0.5)); // 50% to 200% of average
        amount = Math.max(1, Math.min(amount, remainingCoins - (bag.bagsLeft - 1))); // Ensure others can get at least 1 coin
    }
    
    bag.bagsLeft--;
    bag.claimedBy[user.id] = amount;
    
    callbacks.onLuckyBagClaimed({ bag, user, amount });

    if (bag.bagsLeft <= 0) {
        console.log(`[Socket] Lucky Bag ${bag.id} fully claimed.`);
        if(luckyBagTimeout) clearTimeout(luckyBagTimeout);
        callbacks.onLuckyBagFinished?.(bag);
        currentRoom.activeLuckyBag = undefined;
    }
  },
};

export default mockRoomSocketService;