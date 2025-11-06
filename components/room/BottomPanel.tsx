import React, { useState } from 'react';
import type { Emoji, Gift, Screen } from '../../types';
import { useData } from '../../contexts/DataContext';
import { useToast } from '../../components/Toast';
import { GiftPanel } from '../GiftPanel';
import { GamesAndToolsModal } from '../GamesAndToolsModal';
import { CreateLuckyBagModal } from '../CreateLuckyBagModal';
import mockRoomSocketService from '../../services/mockRoomSocketService';
import { useScreenRecorder } from '../../hooks/useScreenRecorder';
import { SoundOnIcon } from '../icons/games/greedy-baby/SoundOnIcon';
import { FaceSmileIcon } from '../icons/FaceSmileIcon';
import { EnvelopeIcon } from '../icons/EnvelopeIcon';
import { GiftBoxIcon } from '../icons/GiftBoxIcon';
import { SquaresPlusIcon } from '../icons/SquaresPlusIcon';
import { EmojiPanel } from '../EmojiPanel';

interface BottomPanelProps {
    onSendMessage: (text: string) => void;
    onSendEmoji: (emoji: Emoji) => void;
    onSendGift: (gift: Gift, quantity: number) => void;
    onNavigate: (screen: Screen) => void;
    onSelectGame: (gameId: string) => void;
    onClearChat: () => void;
    screenRecorder: ReturnType<typeof useScreenRecorder>;
    onOpenChat: () => void;
}

export const BottomPanel: React.FC<BottomPanelProps> = ({
    onSendEmoji,
    onSendGift,
    onNavigate,
    onSelectGame,
    onClearChat,
    onOpenChat,
}) => {
    const { currentUser, updateUser } = useData();
    const { addToast } = useToast();
    const [activeModal, setActiveModal] = useState<'games' | 'luckyBag' | 'gifts' | 'emoji' | null>(null);

    const handleCreateLuckyBag = (totalCoins: number, totalBags: number) => {
        mockRoomSocketService.createLuckyBag(currentUser, totalCoins, totalBags);
        updateUser(currentUser.id, { coinsBalance: currentUser.coinsBalance - totalCoins });
        setActiveModal(null);
        addToast('Lucky Bag created!', 'success');
    }

    const handleEmojiSelect = (emoji: Emoji) => {
        onSendEmoji(emoji);
        setActiveModal(null);
    }

    const ActionButton: React.FC<{ icon: React.ReactNode, onClick: () => void }> = ({ icon, onClick }) => (
        <button onClick={onClick} className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center transition-all hover:bg-black/60">
            {icon}
        </button>
    );

    return (
        <footer className="absolute bottom-0 left-0 right-0 z-20">
            <div className="p-3">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <ActionButton icon={<SoundOnIcon className="w-6 h-6 text-white"/>} onClick={() => addToast('Sound control TBD', 'info')} />
                        <ActionButton icon={<FaceSmileIcon className="w-6 h-6 text-white"/>} onClick={() => setActiveModal('emoji')} />
                        <ActionButton icon={<EnvelopeIcon className="w-6 h-6 text-white"/>} onClick={onOpenChat} />
                    </div>

                    <div className="flex items-center gap-2">
                         <ActionButton icon={<GiftBoxIcon className="w-6 h-6 text-white"/>} onClick={() => setActiveModal('gifts')} />
                         <ActionButton icon={<SquaresPlusIcon className="w-6 h-6 text-white"/>} onClick={() => setActiveModal('games')} />
                    </div>
                </div>
            </div>
            
            {activeModal === 'gifts' && (
                <GiftPanel 
                    onSendGift={onSendGift}
                    onClose={() => setActiveModal(null)}
                    currentUserCoins={currentUser.coinsBalance}
                />
            )}

            {activeModal === 'games' && (
                <GamesAndToolsModal
                    onClose={() => setActiveModal(null)}
                    onSelectGame={onSelectGame}
                    onClearChat={onClearChat}
                    onNavigate={onNavigate}
                    onOpenLuckyBag={() => setActiveModal('luckyBag')}
                />
            )}

            {activeModal === 'luckyBag' && (
                <CreateLuckyBagModal 
                    user={currentUser}
                    onClose={() => setActiveModal('games')} // Go back to games modal
                    onCreate={handleCreateLuckyBag}
                />
            )}
            
            {activeModal === 'emoji' && (
                 <div className="absolute inset-0" onClick={() => setActiveModal(null)}>
                    <EmojiPanel onSendEmoji={handleEmojiSelect} onClose={() => setActiveModal(null)} />
                </div>
            )}
        </footer>
    );
};