import React from 'react';
import type { User, Room, Conversation, Gift, Rocket, StoreItem, Family, TargetCycle, Seat } from '../types';

// New 3D Gift Icons
import { RoseIcon } from '../components/icons/gifts/RoseIcon';
import { SportsCarIcon } from '../components/icons/gifts/SportsCarIcon';
import { PrivateJetIcon } from '../components/icons/gifts/PrivateJetIcon';
import { CastleIcon } from '../components/icons/gifts/CastleIcon';
import { DiamondRingIcon } from '../components/icons/gifts/DiamondRingIcon';
import { FireworksIcon } from '../components/icons/gifts/FireworksIcon';
import { GoldCoinIcon } from '../components/icons/gifts/GoldCoinIcon';
import { LollipopIcon } from '../components/icons/gifts/LollipopIcon';
import { CrownIcon as GiftCrownIcon } from '../components/icons/gifts/CrownIcon';
import { TeddyBearIcon } from '../components/icons/gifts/TeddyBearIcon';
import { LuckyCoinIcon } from '../components/icons/gifts/LuckyCoinIcon';
import { LuckyKeyIcon } from '../components/icons/gifts/LuckyKeyIcon';
import { LuckyJarIcon } from '../components/icons/gifts/LuckyJarIcon';
import { LuckyDoorIcon } from '../components/icons/gifts/LuckyDoorIcon';
import { TeddyLoveIcon } from '../components/icons/gifts/TeddyLoveIcon';
import { PinballIcon } from '../components/icons/gifts/PinballIcon';
import { UnicornIcon } from '../components/icons/gifts/UnicornIcon';
import { HeartDiamondIcon } from '../components/icons/gifts/HeartDiamondIcon';
import { MoneyGunIcon } from '../components/icons/gifts/MoneyGunIcon';
import { BombIcon } from '../components/icons/gifts/BombIcon';
import { IceCreamIcon } from '../components/icons/gifts/IceCreamIcon';
import { LoveLetterIcon } from '../components/icons/gifts/LoveLetterIcon';
import { TreasureChestIcon } from '../components/TreasureChestIcon';


const fifteenDaysFromNow = Date.now() + 15 * 24 * 60 * 60 * 1000;
const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
const oneHourAgo = Date.now() - 60 * 60 * 1000;

const createMockTargetCycle = (progress: number, target: number): TargetCycle => ({
    id: `cycle-${Math.random()}`,
    startDate: Date.now(),
    endDate: fifteenDaysFromNow,
    progress,
    target,
    isComplete: progress >= target,
    milestones: [
        { rewardCoins: 1000, target: 10000, claimed: progress >= 10000 },
        { rewardCoins: 5000, target: 50000, claimed: progress >= 50000 },
        { rewardCoins: 15000, target: 150000, claimed: progress >= 150000 },
    ],
});

export const mockUsers: User[] = [
    { id: 'user-0', numericId: '10001', displayName: 'Aisha', avatarUrl: 'https://i.postimg.cc/k4BE63s2/female1.jpg', bio: 'Just chilling & vibing. DM for collabs.', followers: 1250, following: 320, visitors: 4500, level: 12, currentExp: 1250, totalExp: 2000, coinsBalance: 1500000, diamondsBalance: 5000, trophyCount: 15, familyId: 'family-1', familyRole: 'admin', gender: 'Female', isSvip: true, friends: ['user-2', 'user-3'], targetCycle: createMockTargetCycle(65000, 150000), equippedEntryEffectId: 'entry-dragon', equippedFrameId: 'frame-gold', role: 'admin', lastSeen: 'online' },
    { id: 'user-1', numericId: '12096412', displayName: 'Hamza Bin Khalid', avatarUrl: 'https://i.postimg.cc/PqYp5dJ7/male1.jpg', bio: 'Welcome to my room, let\'s chat together!', followers: 10000, following: 1, visitors: 150000, level: 99, currentExp: 100, totalExp: 1000, coinsBalance: 1095, diamondsBalance: 999999, trophyCount: 0, gender: 'Male', isSvip: true, friends: [], targetCycle: createMockTargetCycle(1000, 10000), lastSeen: 'online' },
    { id: 'user-2', numericId: '10003', displayName: 'Sana', avatarUrl: 'https://i.postimg.cc/9F0ttG90/female2.jpg', bio: 'Singing my heart out 🎶', followers: 5600, following: 800, visitors: 12000, level: 25, currentExp: 3000, totalExp: 5000, coinsBalance: 250000, diamondsBalance: 12000, trophyCount: 5, gender: 'Female', isSvip: false, friends: ['user-0'], targetCycle: createMockTargetCycle(160000, 150000), equippedFrameId: 'frame-neon', lastSeen: 'online' },
    { id: 'user-3', numericId: '10004', displayName: 'Ali', avatarUrl: 'https://i.postimg.cc/L8gZ1PDB/male2.jpg', bio: 'Pro gamer. Challenger in all games.', followers: 8900, following: 50, visitors: 25000, level: 31, currentExp: 8000, totalExp: 10000, coinsBalance: 80000, diamondsBalance: 3000, trophyCount: 8, familyId: 'family-1', familyRole: 'owner', gender: 'Male', isSvip: false, friends: ['user-0'], targetCycle: createMockTargetCycle(25000, 100000), lastSeen: fiveMinutesAgo },
    { id: 'user-4', numericId: '10005', displayName: 'Bilal', avatarUrl: 'https://i.postimg.cc/sXb4YVpC/male3.jpg', bio: 'Just a panda in a rogue world.', followers: 200, following: 400, visitors: 1200, level: 8, currentExp: 50, totalExp: 800, coinsBalance: 5000, diamondsBalance: 100, trophyCount: 1, gender: 'Male', isSvip: false, friends: [], targetCycle: createMockTargetCycle(500, 50000), lastSeen: oneHourAgo },
    { id: 'user-5', numericId: '10006', displayName: 'Fatima', avatarUrl: 'https://i.postimg.cc/x8K23RJF/female3.jpg', bio: 'Stargazer and dream weaver.', followers: 12000, following: 10, visitors: 8000, level: 18, currentExp: 1500, totalExp: 3000, coinsBalance: 120000, diamondsBalance: 8000, trophyCount: 22, familyId: 'family-2', familyRole: 'owner', gender: 'Female', isSvip: false, friends: [], targetCycle: createMockTargetCycle(80000, 150000), lastSeen: 'online' },
    { id: 'user-6', numericId: '10007', displayName: 'Reseller', avatarUrl: 'https://i.postimg.cc/J0k2Wz2q/reseller.jpg', bio: 'Official Coin Reseller', followers: 500, following: 0, visitors: 1000, level: 50, currentExp: 0, totalExp: 1000, coinsBalance: 10000000, diamondsBalance: 0, trophyCount: 0, gender: 'Private', isSvip: true, friends: [], targetCycle: createMockTargetCycle(0, 1000), role: 'reseller', lastSeen: 'online' },
];

export const mockAvatarOptions: string[] = [
    'https://i.postimg.cc/k4BE63s2/female1.jpg', 'https://i.postimg.cc/9F0ttG90/female2.jpg', 'https://i.postimg.cc/x8K23RJF/female3.jpg', 'https://i.postimg.cc/Y0M1G2Y4/female4.jpg',
    'https://i.postimg.cc/PqYp5dJ7/male1.jpg', 'https://i.postimg.cc/L8gZ1PDB/male2.jpg', 'https://i.postimg.cc/sXb4YVpC/male3.jpg', 'https://i.postimg.cc/B6fD32hS/male4.jpg',
    'https://i.postimg.cc/W3sTqjFj/animal1.jpg', 'https://i.postimg.cc/kXXVz9bK/animal2.jpg', 'https://i.postimg.cc/q7b4BGHh/animal3.jpg', 'https://i.postimg.cc/tJnB8WJc/animal4.jpg',
];

export const mockCurrentUser: User = { ...mockUsers.find(u => u.id === 'user-0')!, ownRoomId: 'room-my-own' };

export const generateMockRockets = (): Rocket[] => [
    { level: 1, status: 'active', currentAmount: 15000, targetAmount: 50000, contributions: [{ userId: 'user-2', amount: 10000 }, { userId: 'user-0', amount: 5000 }, { userId: 'user-3', amount: 12000 }, { userId: 'user-5', amount: 8000 }] },
    { level: 2, status: 'locked', currentAmount: 0, targetAmount: 100000 },
    { level: 3, status: 'locked', currentAmount: 0, targetAmount: 250000 },
    { level: 4, status: 'locked', currentAmount: 0, targetAmount: 500000 },
    { level: 5, status: 'locked', currentAmount: 0, targetAmount: 1000000 },
];

const generateMockSeats = (micCount: number, occupants: User[]): Seat[] => {
    const seats: Seat[] = Array.from({ length: micCount }, (_, i) => ({
        seatIndex: i,
        isLocked: false,
    }));
    occupants.forEach((user, i) => {
        if (i < micCount) seats[i].user = user;
    });
    return seats;
}

const roomBg = 'https://i.postimg.cc/tJnB8WJc/animal4.jpg';

export const mockRooms: Room[] = [
    { id: 'room-my-own', title: 'My Cozy Corner', host: mockCurrentUser, participants: [mockCurrentUser], participantCount: 1, isLocked: false, decoration: 'crown', seats: generateMockSeats(12, [mockCurrentUser]), rockets: generateMockRockets(), allowGifts: true, allowChat: true, isSuperMic: false, isMuted: false, topic: 'Welcome!', backgroundImageUrl: roomBg, announcement: `Welcome to my room, let's chat together!` },
    { id: 'room-1', title: '👑 Sana\'s Live Show', topic: 'Music', host: mockUsers[2], participants: mockUsers.slice(0, 4), participantCount: 154, isLocked: false, decoration: 'crown', seats: generateMockSeats(12, mockUsers.slice(2, 5)), rockets: generateMockRockets(), allowGifts: true, allowChat: true, isSuperMic: true, isMuted: false, pinnedMessage: 'Welcome! Send a 🚀 to get a shoutout!', backgroundImageUrl: roomBg, announcement: `Singing & Shayari lovers ko Dil se wc 🥰🍓`, rocketEventState: 'countdown', rocketEventEndsAt: Date.now() + 8000, pkState: { opponentHost: mockUsers[5], myScore: 125000, opponentScore: 110000, endTime: Date.now() + 180000 } },
    { id: 'room-2', title: 'Ali\'s Pro Gameplay', topic: 'Gaming', host: mockUsers[3], participants: mockUsers.slice(2, 5), participantCount: 231, isLocked: false, decoration: 'rocket', seats: generateMockSeats(12, [mockUsers[3], mockUsers[2], mockUsers[4]]), rockets: generateMockRockets(), allowGifts: true, allowChat: true, isSuperMic: false, isMuted: false, backgroundImageUrl: roomBg, announcement: `Watch Ali dominate the game!`
    },
    { id: 'room-3', title: '🦋 Late Night Chats', topic: 'Chit-Chat', host: mockUsers[5], participants: mockUsers.slice(1, 3), participantCount: 88, isLocked: false, decoration: 'butterfly', seats: generateMockSeats(12, mockUsers.slice(1, 3)), rockets: generateMockRockets(), allowGifts: true, allowChat: true, isSuperMic: false, isMuted: false, backgroundImageUrl: roomBg, announcement: `Let's talk about anything!` },
    { id: 'room-4', title: 'Study with Me', topic: 'Study', host: mockUsers[4], participants: mockUsers.slice(0, 2), participantCount: 42, isLocked: true, seats: generateMockSeats(12, mockUsers.slice(0, 2)), rockets: generateMockRockets(), allowGifts: false, allowChat: true, isSuperMic: false, isMuted: false, backgroundImageUrl: roomBg, announcement: `Lofi beats for studying.` },
    { id: 'room-5', title: 'Hamza\'s Room', host: mockUsers[1], participants: mockUsers.slice(0, 5), participantCount: 1, isLocked: false, decoration: 'crown', seats: generateMockSeats(12, [mockUsers[1]]), rockets: generateMockRockets(), allowGifts: true, allowChat: true, isSuperMic: false, isMuted: false, topic: 'Official Room', backgroundImageUrl: 'https://i.postimg.cc/G2j7g4f7/room-bg.jpg', announcement: `Welcome to my room, let's chat together!` },
];

const lastMessage1 = { id: 'm1-2', text: 'Hey, are you free tonight?', senderId: 'user-2', senderName: 'Sana', senderAvatar: mockUsers[2].avatarUrl, timestamp: new Date(Date.now() - 1000 * 60 * 5) };
const lastMessage2 = { id: 'm2-2', text: 'Yeah, let\'s team up!', senderId: 'user-0', senderName: 'You', senderAvatar: mockCurrentUser.avatarUrl, timestamp: new Date(Date.now() - 1000 * 60 * 30) };

export const mockConversations: Conversation[] = [
    { id: 'convo-1', participants: [mockCurrentUser, mockUsers[2]], messages: [{ id: 'm1-1', text: 'Hi there!', senderId: 'user-0', senderName: 'You', senderAvatar: mockCurrentUser.avatarUrl, timestamp: new Date(Date.now() - 1000 * 60 * 6) }, lastMessage1], lastMessage: lastMessage1, unreadCount: 1 },
    { id: 'convo-2', participants: [mockCurrentUser, mockUsers[3]], messages: [{ id: 'm2-1', text: 'Wanna play?', senderId: 'user-3', senderName: 'Ali', senderAvatar: mockUsers[3].avatarUrl, timestamp: new Date(Date.now() - 1000 * 60 * 31) }, lastMessage2], lastMessage: lastMessage2, unreadCount: 0 },
    { id: 'convo-3', participants: [mockCurrentUser, mockUsers[5]], messages: [{ id: 'm3-1', text: 'Loved your room!', senderId: 'user-0', senderName: 'You', senderAvatar: mockCurrentUser.avatarUrl, timestamp: new Date(Date.now() - 1000 * 60 * 120) }, { id: 'm3-2', text: 'Thanks for stopping by!', senderId: 'user-5', senderName: 'Fatima', senderAvatar: mockUsers[5].avatarUrl, timestamp: new Date(Date.now() - 1000 * 60 * 115) }], lastMessage: { id: 'm3-2', text: 'Thanks for stopping by!', senderId: 'user-5', senderName: 'Fatima', senderAvatar: mockUsers[5].avatarUrl, timestamp: new Date(Date.now() - 1000 * 60 * 115) }, unreadCount: 1 },

];

export const mockGifts: Gift[] = [
    { id: 'gift-rose', name: 'Rose', icon: React.createElement(RoseIcon), coinValue: 10 },
    { id: 'gift-lollipop', name: 'Lollipop', icon: React.createElement(LollipopIcon), coinValue: 50 },
    { id: 'gift-ice-cream', name: 'Ice Cream', icon: React.createElement(IceCreamIcon), coinValue: 100 },
    { id: 'gift-teddy', name: 'Teddy', icon: React.createElement(TeddyBearIcon), coinValue: 500 },
    { id: 'gift-love-letter', name: 'Love Letter', icon: React.createElement(LoveLetterIcon), coinValue: 999 },
    { id: 'gift-pinball', name: 'Pinball', icon: React.createElement(PinballIcon), coinValue: 1000 },
    { id: 'gift-crown', name: 'Crown', icon: React.createElement(GiftCrownIcon), coinValue: 5000 },
    { id: 'gift-bomb', name: 'Bomb', icon: React.createElement(BombIcon), coinValue: 6666 },
    { id: 'gift-sports-car', name: 'Sports Car', icon: React.createElement(SportsCarIcon), coinValue: 10000, isPremium: true },
    { id: 'gift-unicorn', name: 'Unicorn', icon: React.createElement(UnicornIcon), coinValue: 25000 },
    { id: 'gift-heart-diamond', name: 'Heart Diamond', icon: React.createElement(HeartDiamondIcon), coinValue: 50000 },
    { id: 'gift-private-jet', name: 'Private Jet', icon: React.createElement(PrivateJetIcon), coinValue: 100000, isPremium: true },
    { id: 'gift-money-gun', name: 'Money Gun', icon: React.createElement(MoneyGunIcon), coinValue: 150000, isPremium: true },
    { id: 'gift-castle', name: 'Castle', icon: React.createElement(CastleIcon), coinValue: 500000, isPremium: true },
];

export const mockStoreItems: StoreItem[] = [
    { id: 'frame-gold', name: 'Golden Swirl', type: 'Frame', imageUrl: 'https://i.postimg.cc/J7Nq31nQ/frame-gold.png', price: 10000, durationDays: 30 },
    { id: 'entry-dragon', name: 'Dragon Entrance', type: 'Entrance Effect', imageUrl: 'https://i.postimg.cc/cCGc0gJc/entry-dragon.png', price: 50000, durationDays: 30 },
    { id: 'bubble-love', name: 'Love Bubble', type: 'Chat Bubble', imageUrl: 'https://i.postimg.cc/7Z01M1Kq/bubble-love.png', price: 5000, durationDays: 30 },
    { id: 'frame-neon', name: 'Neon Glow', type: 'Frame', imageUrl: 'https://i.postimg.cc/t4g7xG4s/frame-neon.png', price: 25000, durationDays: 30 },
    { id: 'entry-fire', name: 'Fireball Entrance', type: 'Entrance Effect', imageUrl: 'https://i.postimg.cc/Pq0wW9gT/entry-fire.png', price: 25000, durationDays: 30 },
    { id: 'frame-royal', name: 'Royal Diamond', type: 'Frame', imageUrl: 'https://i.postimg.cc/vTcwzJFC/frame-royal.png', price: 100000, durationDays: 30 },
];

export const mockFamilies: Family[] = [
    { id: 'family-1', name: 'The Round Table', badgeUrl: '🛡️', level: 5, description: 'Knights of Aura, united!', ownerId: 'user-3', adminIds: ['user-0'], members: [mockUsers[0], mockUsers[3]] },
    { id: 'family-2', name: 'Cosmic Dreamers', badgeUrl: '🌌', level: 3, description: 'Exploring the universe of voice.', ownerId: 'user-5', adminIds: [], members: [mockUsers[5]] },
];

// Fix: Export preset background arrays to resolve import errors.
export const presetAppBackgrounds: string[] = [
    'https://i.postimg.cc/G2j7g4f7/room-bg.jpg',
    'https://i.postimg.cc/k47tXz9W/ferris-wheel-bg.png',
    'https://i.postimg.cc/q7DypCg3/wheel-spokes.png',
    'https://i.postimg.cc/Y0xK3pQd/rocket-main.png',
    'https://i.postimg.cc/tJ0gq2sN/golden-pinball.png'
];

export const presetRoomBackgrounds: string[] = [
    'https://i.postimg.cc/G2j7g4f7/room-bg.jpg',
    'https://i.postimg.cc/k47tXz9W/ferris-wheel-bg.png',
    'https://i.postimg.cc/q7DypCg3/wheel-spokes.png',
    'https://i.postimg.cc/Y0xK3pQd/rocket-main.png',
    'https://i.postimg.cc/tJ0gq2sN/golden-pinball.png'
];