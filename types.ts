import React from 'react';

export type Tab = 'Home' | 'Message' | 'Me';
export type Theme = 'aura' | 'midnight' | 'crimson';

export type Screen =
  | 'home'
  | 'messages'
  | 'profile'
  | 'room'
  | 'chat'
  | 'missions'
  | 'ranking'
  | 'wallet'
  | 'invite'
  | 'medal'
  | 'svip'
  | 'level'
  | 'family'
  | 'store'
  | 'items'
  | 'settings'
  | 'user-list'
  | 'friends'
  | 'system-chat'
  | 'target'
  | 'rocket-event'
  | 'room-settings'
  | 'profile-edit'
  | 'admin-panel'
  | 'reseller-panel'
  | 'family-list'
  | 'create-family'
  | 'legal'
  | 'events'
  | 'pairs'
  | 'account'
  | 'privacy'
  | 'about'
  | 'contact'
  | 'earnings';

export interface TargetCycle {
  id: string;
  startDate: number; // timestamp
  endDate: number; // timestamp
  progress: number;
  target: number;
  isComplete: boolean;
  milestones: { rewardCoins: number; target: number; claimed: boolean }[];
}

export interface User {
  id: string;
  numericId: string;
  displayName: string;
  avatarUrl: string;
  bio: string;
  followers: number;
  following: number;
  visitors: number;
  level: number;
  currentExp: number;
  totalExp: number;
  coinsBalance: number;
  diamondsBalance: number;
  trophyCount: number;
  familyId?: string;
  familyRole?: 'owner' | 'admin' | 'member';
  gender: 'Male' | 'Female' | 'Private';
  isSvip: boolean;
  friends?: string[];
  targetCycle: TargetCycle;
  equippedEntryEffectId?: string;
  equippedFrameId?: string;
  role?: 'admin' | 'reseller';
  ownRoomId?: string;
  lastSeen: 'online' | number;
}

export interface Seat {
  seatIndex: number;
  user?: User;
  isLocked: boolean;
}

export interface Rocket {
  level: number;
  status: 'active' | 'locked' | 'launched';
  currentAmount: number;
  targetAmount: number;
  contributions?: { userId: string; amount: number }[];
}

export interface PKState {
  opponentHost: User;
  myScore: number;
  opponentScore: number;
  endTime: number; // timestamp
}

export interface LuckyBag {
    id: string;
    creator: User;
    totalCoins: number;
    totalBags: number;
    bagsLeft: number;
    endTime: number; // timestamp
    claimedBy: { [userId: string]: number };
}

export type RocketEventState = 'idle' | 'pending' | 'countdown' | 'launched';

export interface Room {
  id: string;
  title: string;
  topic?: string;
  host: User;
  participants: User[];
  participantCount: number;
  isLocked: boolean;
  password?: string;
  decoration?: 'crown' | 'butterfly' | 'rocket';
  seats: Seat[];
  rockets: Rocket[];
  coHosts?: string[];
  allowGifts: boolean;
  allowChat: boolean;
  isSuperMic: boolean;
  isMuted: boolean;
  pinnedMessage?: string;
  pkState?: PKState;
  backgroundImageUrl?: string;
  announcement?: string;
  activeLuckyBag?: LuckyBag;
  rocketEventState?: RocketEventState;
  rocketEventEndsAt?: number; // timestamp for pending/countdown end
}

export interface ChatMessage {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  timestamp: Date;
  isSystemMessage?: boolean;
  isDeleted?: boolean;
  emojiCharacter?: string;
}

export interface Conversation {
  id: string;
  participants: User[];
  messages: ChatMessage[];
  lastMessage: ChatMessage;
  unreadCount: number;
}

export interface Gift {
  id: string;
  name: string;
  icon: React.ReactNode;
  coinValue: number;
  isPremium?: boolean;
}

export interface GiftEvent {
    id: string;
    gift: Gift;
    sender: User;
    receiver: User;
}

export interface Emoji {
  id: string;
  character: string;
}

export interface EmojiEvent {
    id: string;
    emoji: Emoji;
    sender: User;
}

export type RoomEvent = 
  | { type: 'chat'; data: ChatMessage }
  | { type: 'gift'; data: GiftEvent }
  | { type: 'join'; data: { user: User, entryEffectId?: string } }
  | { type: 'emoji'; data: EmojiEvent }
  | { type: 'lucky_bag_created', data: LuckyBag }
  | { type: 'delete_message', data: { messageId: string, deletedBy: string }};


export interface StoreItem {
  id: string;
  name: string;
  type: 'Frame' | 'Entrance Effect' | 'Chat Bubble';
  imageUrl: string;
  price: number;
  durationDays: number;
}

export interface Family {
  id: string;
  name: string;
  badgeUrl: string;
  level: number;
  description: string;
  ownerId: string;
  adminIds: string[];
  members: User[];
}

export interface RocketReward {
    mainReward: {
        name: string;
        icon: string;
    };
    leaderboard: {
        user: User;
        rank: number;
        rewards: { type: 'coins' | 'exp', amount: number }[];
    }[];
}


// Reducer Types
export type Action =
  | { type: 'SET_LOGGED_IN'; payload: boolean }
  | { type: 'SET_USERS'; payload: User[] }
  | { type: 'UPDATE_USER'; payload: { userId: string, updates: Partial<User> } }
  | { type: 'SET_ROOMS'; payload: Room[] }
  | { type: 'ADD_ROOM'; payload: Room }
  | { type: 'SET_CONVERSATIONS'; payload: Conversation[] }
  | { type: 'ADD_CONVERSATION'; payload: Conversation }
  | { type: 'ADD_CHAT_MESSAGE'; payload: { conversationId: string; message: ChatMessage } };

export interface AppState {
    isLoggedIn: boolean;
    users: User[];
    rooms: Room[];
    conversations: Conversation[];
    currentUser: User;
}