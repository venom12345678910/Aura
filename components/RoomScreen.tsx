import React, { useState, useEffect, useRef } from 'react';
import type { Room, User, Gift, ChatMessage, Screen, Seat, Emoji, LuckyBag } from '../types';
import { useVoiceConnection } from '../hooks/useVoiceConnection';
import { useToast } from './Toast';
import { UserProfileModal } from './UserProfileModal';
import { GiftComboAnimation } from './GiftComboAnimation';
import { PKResultAnimation } from './PKResultAnimation';
import { MicSeat } from './MicSeat';
import { SeatActionPopover } from './SeatActionPopover';
import { playSound } from '../services/soundService';
import { RoomHeader } from './room/RoomHeader';
import { JackpotBanner } from './room/JackpotBanner';
import { BottomPanel } from './room/BottomPanel';
import { EntryEffectAnimation } from '../EntryEffectAnimation';
import { PKBattleDisplay } from './PKBattleDisplay';
import { CentralHostDisplay } from './CentralHostDisplay';
import { SideBanners } from './SideBanners';
import { RocketProgress } from './RocketProgress';
import { LaunchRocketModal } from './LaunchRocketModal';
import { GreedyBabyGame } from './games/GreedyBabyGame';
import { Triple777Game } from './games/Triple777Game';
import { LuckyBagAnimation } from './LuckyBagAnimation';
import { useScreenRecorder } from '../hooks/useScreenRecorder';
import { GreedyGame } from './games/GreedyGame';
import { PinballGame } from './games/PinballGame';
import { useRoomEvents } from '../hooks/useRoomEvents';
import { PinnedMessage } from './room/PinnedMessage';
import { RoomChatScreen } from './RoomChatScreen';


interface RoomScreenProps {
  room: Room;
  currentUser: User;
  onCloseRoom: () => void;
  onMinimizeRoom: () => void;
  onUpdateUser: (updates: Partial<User>) => void;
  onViewUserList: (title: string, users: User[]) => void;
  onStartConversation: (string) => void;
  onNavigate: (screen: Screen) => void;
}

export const RoomScreen: React.FC<RoomScreenProps> = ({ room, currentUser, onCloseRoom, onMinimizeRoom, onUpdateUser, onViewUserList, onStartConversation, onNavigate }) => {
    const { 
        currentRoom, 
        chatMessages,
        entryQueue,
        processNextEntry,
        combo,
        pkResult,
        activeLuckyBag,
        speakingParticipants,
        handleSendMessage,
        handleSendGift: handleSendGiftFromHook,
        claimLuckyBag,
        deleteMessage,
        clearChat,
    } = useRoomEvents(room, currentUser, onUpdateUser);

    const [selectedUserForProfile, setSelectedUserForProfile] = useState<User | null>(null);
    const [popoverState, setPopoverState] = useState<{ seat: Seat, anchor: HTMLElement } | null>(null);
    const [activeModal, setActiveModal] = useState<'rocket' | 'greedy-baby' | 'slots' | 'greedy' | 'pinball' | null>(null);
    const [isPinnedMessageVisible, setIsPinnedMessageVisible] = useState(!!currentRoom.pinnedMessage);
    const [showFullScreenChat, setShowFullScreenChat] = useState(false);

    const { status: voiceStatus, connect, disconnect } = useVoiceConnection();
    const screenRecorder = useScreenRecorder();
    const { addToast } = useToast();

    const isHost = currentRoom.host.id === currentUser.id;

    useEffect(() => {
        connect();
        return () => disconnect();
    }, [connect, disconnect]);

    const handleSendGift = (gift: Gift, quantity: number) => {
        const totalCost = gift.coinValue * quantity;
        if (currentUser.coinsBalance < totalCost) {
            addToast("Not enough coins!", "error");
            return;
        }
        onUpdateUser({ coinsBalance: currentUser.coinsBalance - totalCost });
        handleSendGiftFromHook(gift, quantity);
        if(activeModal === 'rocket') setActiveModal(null);
    };
    
    const handleSendEmoji = (emoji: Emoji) => {
      playSound('pop');
      const message: ChatMessage = { id: `emoji-${Date.now()}`, text: emoji.character, senderId: currentUser.id, senderName: currentUser.displayName, senderAvatar: currentUser.avatarUrl, timestamp: new Date() };
      handleSendMessage(message.text);
    };
    
    const handleViewProfile = (user: User) => setSelectedUserForProfile(user);

    const handleSeatPress = (seat: Seat, anchor: HTMLElement) => {
        if (!seat.user) {
            addToast('Seat joining logic TBD.', 'info');
        } else {
            setPopoverState({ seat, anchor });
        }
    };
    
    const handleSelectGame = (gameId: string) => {
        switch (gameId) {
            case 'greedy-baby':
            case 'greedy': // for lucky fruit
                setActiveModal('greedy-baby');
                break;
            case 'slots':
                setActiveModal('slots');
                break;
            case 'pinball':
                setActiveModal('pinball');
                break;
            default:
                addToast(`${gameId} game coming soon!`, 'info');
        }
    };
    
    const handleClearChat = () => {
        clearChat();
        addToast('Chat has been cleared by the host.', 'info');
    };
    
    return (
        <div className="h-full w-full bg-cover bg-center text-white flex flex-col overflow-hidden" style={{backgroundImage: `url(${currentRoom.backgroundImageUrl})`}}>
            <div className="absolute inset-0 bg-black/70"></div>
            
            <div className="relative z-10 flex flex-col h-full">
                <RoomHeader 
                    room={currentRoom}
                    onLeaveRoom={onCloseRoom} 
                    onMinimizeRoom={onMinimizeRoom}
                    isHost={isHost}
                    onOpenSettings={() => onNavigate('room-settings')}
                />
                
                <main className="flex-1 px-2 py-1 flex flex-col justify-between items-center overflow-hidden">
                    <div className='flex items-center gap-2'>
                        <div className="bg-black/40 p-1 rounded-full text-yellow-300">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                           </svg>
                        </div>
                        <span className="text-yellow-300 font-bold text-sm">0</span>
                    </div>

                    {currentRoom.pkState ? (
                        <PKBattleDisplay pkState={currentRoom.pkState} myHost={currentRoom.host} onViewProfile={handleViewProfile} />
                    ) : (
                        <CentralHostDisplay user={currentRoom.host} onClick={handleViewProfile} />
                    )}

                     <div className="absolute top-[25%] w-full flex flex-col items-center justify-around h-2/5">
                        <div className="grid grid-cols-4 gap-x-2 w-full px-2">
                            {currentRoom.seats.slice(1, 5).map(seat => (
                                <MicSeat key={seat.seatIndex} seat={seat} isSpeaking={speakingParticipants.has(seat.user?.id || '')} onPress={handleSeatPress} />
                            ))}
                        </div>
                         <div className="grid grid-cols-4 gap-x-2 w-full px-2 mt-2">
                            {currentRoom.seats.slice(5, 9).map(seat => (
                                <MicSeat key={seat.seatIndex} seat={seat} isSpeaking={speakingParticipants.has(seat.user?.id || '')} onPress={handleSeatPress} />
                            ))}
                        </div>
                         <div className="grid grid-cols-4 gap-x-2 w-full px-2 mt-2">
                            {currentRoom.seats.slice(9, 13).map(seat => (
                                <MicSeat key={seat.seatIndex} seat={seat} isSpeaking={speakingParticipants.has(seat.user?.id || '')} onPress={handleSeatPress} />
                            ))}
                        </div>
                    </div>

                    <div className="w-full mt-auto flex flex-col items-start px-2">
                        <div className="text-left text-xs text-gray-300 bg-black/30 p-2 rounded-lg max-w-full">
                            <p>Welcome to Yari! Please respect each other and talk politely. Abusing, third-party advertising, fake official information and politically sensitive topics are strictly prohibited. Please report if you find these situations.</p>
                        </div>
                        <div className="font-semibold text-sm mt-2 flex items-center gap-1">
                            Announcement: <span className="text-gray-300">{currentRoom.announcement}</span> 
                            {isHost && <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>}
                        </div>
                    </div>

                </main>

                <div className="absolute top-28 right-2 flex flex-col gap-2">
                    <img src="https://i.postimg.cc/Kz8qfLgH/svip-banner.png" alt="svip" className="w-20 cursor-pointer" onClick={() => onNavigate('svip')} />
                    <img src="https://i.postimg.cc/c1h5T1qg/luckypro-banner.png" alt="lucky pro" className="w-20 cursor-pointer" onClick={() => handleSelectGame('slots')} />
                </div>
                
                <BottomPanel 
                    onSendMessage={handleSendMessage}
                    onSendEmoji={handleSendEmoji}
                    onSendGift={handleSendGift}
                    onNavigate={onNavigate}
                    onSelectGame={handleSelectGame}
                    onClearChat={handleClearChat}
                    screenRecorder={screenRecorder}
                    onOpenChat={() => setShowFullScreenChat(true)}
                />
            </div>
            
            {showFullScreenChat && (
                <RoomChatScreen
                    messages={chatMessages}
                    currentUser={currentUser}
                    onSendMessage={handleSendMessage}
                    onDeleteMessage={deleteMessage}
                    onClose={() => setShowFullScreenChat(false)}
                />
            )}
            {combo && <GiftComboAnimation combo={combo} />}
            {entryQueue[0] && <EntryEffectAnimation event={entryQueue[0]} onComplete={processNextEntry} />}
            {pkResult && <PKResultAnimation result={pkResult} />}
            {selectedUserForProfile && <UserProfileModal user={selectedUserForProfile} currentUser={currentUser} room={currentRoom} onClose={() => setSelectedUserForProfile(null)} onViewUserList={onViewUserList} onStartConversation={onStartConversation} />}
            {popoverState && <SeatActionPopover actionedSeat={popoverState.seat} anchorEl={popoverState.anchor} currentUser={currentUser} room={currentRoom} onClose={() => setPopoverState(null)} onViewProfile={(u) => { setPopoverState(null); handleViewProfile(u); }} onUpdateRoom={() => {}} />}

            {activeModal === 'rocket' && <LaunchRocketModal activeRocket={currentRoom.rockets.find(r => r.status === 'active')} user={currentUser} onSendGift={(g) => handleSendGift(g, 1)} onClose={() => setActiveModal(null)} onShowEvent={() => onNavigate('rocket-event')} />}
            {activeModal === 'greedy-baby' && <GreedyBabyGame user={currentUser} onClose={() => setActiveModal(null)} onUpdateUser={onUpdateUser} />}
            {activeModal === 'slots' && <Triple777Game user={currentUser} onClose={() => setActiveModal(null)} onUpdateUser={onUpdateUser} />}
            {activeModal === 'greedy' && <GreedyGame user={currentUser} onClose={() => setActiveModal(null)} onUpdateUser={onUpdateUser} />}
            {activeModal === 'pinball' && <PinballGame user={currentUser} onClose={() => setActiveModal(null)} onUpdateUser={onUpdateUser} />}
        </div>
    );
};