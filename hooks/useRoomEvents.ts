import { useState, useEffect, useRef, useCallback } from 'react';
import type { Room, User, ChatMessage, RoomEvent, Gift, LuckyBag } from '../types';
import mockRoomSocketService from '../services/mockRoomSocketService';
import { useToast } from '../components/Toast';

export const useRoomEvents = (initialRoom: Room, currentUser: User, onUpdateUser: (updates: Partial<User>) => void) => {
    const [currentRoom, setCurrentRoom] = useState(initialRoom);
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [entryQueue, setEntryQueue] = useState<(RoomEvent & { type: 'join' })['data'][]>([]);
    const [combo, setCombo] = useState<{ userId: string; giftId: string; count: number; key: number } | null>(null);
    const [pkResult, setPkResult] = useState<'win' | 'loss' | 'tie' | null>(null);
    const [activeLuckyBag, setActiveLuckyBag] = useState<LuckyBag | undefined>(initialRoom.activeLuckyBag);
    const [speakingParticipants, setSpeakingParticipants] = useState<Set<string>>(new Set());
    const comboTimeoutRef = useRef<number | null>(null);
    const { addToast } = useToast();

    const initialSystemMessages = useRef([
        { id: 'system-1', text: 'Welcome to Aura! Please respect each other and talk politely.', senderId: 'system', senderName: 'System', senderAvatar: '', timestamp: new Date(), isSystemMessage: true },
        { id: 'system-2', text: `Announcement: ${initialRoom.announcement}`, senderId: 'system', senderName: 'System', senderAvatar: '', timestamp: new Date(), isSystemMessage: true },
    ]);

    const processNextEntry = useCallback(() => {
        setEntryQueue(q => q.slice(1));
    }, []);

    useEffect(() => {
        setChatMessages(initialSystemMessages.current);

        const handleUpdateRoom = (updatedRoom: Room) => setCurrentRoom(updatedRoom);
        const handleChatMessage = (message: ChatMessage) => setChatMessages(prev => [...prev.slice(-50), message]);
        
        const handleGift = (event: (RoomEvent & { type: 'gift' })['data'] & { updatedRoom: Room }) => {
            if (comboTimeoutRef.current) clearTimeout(comboTimeoutRef.current);
            setCombo(prev => {
                if (prev && prev.userId === event.sender.id && prev.giftId === event.gift.id) {
                    return { ...prev, count: prev.count + 1 };
                }
                return { userId: event.sender.id, giftId: event.gift.id, count: 1, key: Date.now() };
            });
            comboTimeoutRef.current = window.setTimeout(() => setCombo(null), 3000);
            setCurrentRoom(event.updatedRoom); // Update room state from gift event
        };

        const handleJoin = (data: (RoomEvent & {type: 'join'})['data']) => {
            if(data.entryEffectId) setEntryQueue(prev => [...prev, data]);
            setCurrentRoom(prev => ({...prev, participants: [...prev.participants, data.user], participantCount: prev.participantCount + 1}));
            addToast(`Welcome, ${data.user.displayName}!`, 'info');
        }

        const handleLeave = (user: User) => {
            setCurrentRoom(prev => ({...prev, participants: prev.participants.filter(p => p.id !== user.id), participantCount: prev.participantCount - 1}));
            addToast(`${user.displayName} has left the room.`, 'info');
        }
        
        const handleDeleteMessage = ({ messageId, deletedBy }: { messageId: string, deletedBy: string }) => {
            setChatMessages(prev => prev.map(msg => msg.id === messageId ? { ...msg, isDeleted: true, text: 'This message was deleted by the sender.' } : msg));
        };

        const handleSpeaking = ({ userId, isSpeaking }: { userId: string, isSpeaking: boolean }) => {
            setSpeakingParticipants(prev => {
                const newSet = new Set(prev);
                if (isSpeaking) newSet.add(userId);
                else newSet.delete(userId);
                return newSet;
            });
        };

        const handleLuckyBagCreated = (bag: LuckyBag) => {
            setActiveLuckyBag(bag);
            addToast(`${bag.creator.displayName} dropped a Lucky Bag!`, 'success');
        };

        const handleLuckyBagClaimed = ({ bag, user, amount }: { bag: LuckyBag, user: User, amount: number }) => {
             setActiveLuckyBag(prev => prev && prev.id === bag.id ? bag : prev);
             if (user.id === currentUser.id) {
                 onUpdateUser({ coinsBalance: currentUser.coinsBalance + amount });
                 addToast(`You claimed ${amount} coins from the lucky bag!`, 'success');
             }
        };
        const handleLuckyBagFinished = () => setActiveLuckyBag(undefined);

        mockRoomSocketService.connect(initialRoom, { 
            onRoomUpdate: handleUpdateRoom, 
            onChatMessage: handleChatMessage, 
            onGiftReceived: handleGift, 
            onParticipantJoin: handleJoin, 
            onParticipantLeave: handleLeave, 
            onParticipantSpeaking: handleSpeaking, 
            onLuckyBagCreated: handleLuckyBagCreated, 
            onLuckyBagClaimed: handleLuckyBagClaimed, 
            onLuckyBagFinished: handleLuckyBagFinished,
            onDeleteMessage: handleDeleteMessage,
        });

        return () => mockRoomSocketService.disconnect();
    }, [initialRoom, addToast, currentUser.id, onUpdateUser]);

    useEffect(() => {
        if (currentRoom.pkState) {
            const timer = setInterval(() => {
                if (Date.now() >= currentRoom.pkState!.endTime) {
                    clearInterval(timer);
                    const { myScore, opponentScore } = currentRoom.pkState!;
                    if(myScore > opponentScore) setPkResult('win');
                    else if (opponentScore > myScore) setPkResult('loss');
                    else setPkResult('tie');
                    setTimeout(() => {
                        setPkResult(null);
                        setCurrentRoom(r => ({...r, pkState: undefined}));
                    }, 4000);
                }
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [currentRoom.pkState]);

    const handleSendMessage = useCallback((text: string) => {
        const message: ChatMessage = { id: `msg-${Date.now()}`, text, senderId: currentUser.id, senderName: currentUser.displayName, senderAvatar: currentUser.avatarUrl, timestamp: new Date() };
        setChatMessages(prev => [...prev.slice(-50), message]);
        mockRoomSocketService.sendMessage(message);
    }, [currentUser]);

    const handleSendGift = useCallback((gift: Gift, quantity: number) => {
        for (let i = 0; i < quantity; i++) {
          mockRoomSocketService.sendGift(gift, currentUser);
        }
    }, [currentUser]);
    
    const deleteMessage = useCallback((messageId: string) => {
        mockRoomSocketService.deleteMessage(messageId, currentUser.id);
    }, [currentUser.id]);

    const clearChat = useCallback(() => {
        const clearMessage: ChatMessage = { id: 'system-clear', text: 'Chat has been cleared by the host.', senderId: 'system', senderName: 'System', senderAvatar: '', timestamp: new Date(), isSystemMessage: true };
        setChatMessages([...initialSystemMessages.current, clearMessage]);
        // In a real app, this would also be a socket event to clear for everyone.
    }, []);

    const claimLuckyBag = useCallback(() => {
        mockRoomSocketService.claimLuckyBag(currentUser);
    }, [currentUser]);

    return {
        currentRoom,
        chatMessages,
        entryQueue,
        processNextEntry,
        combo,
        pkResult,
        activeLuckyBag,
        speakingParticipants,
        handleSendMessage,
        handleSendGift,
        deleteMessage,
        clearChat,
        claimLuckyBag,
    };
};