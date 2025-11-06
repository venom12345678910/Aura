import React from 'react';
import { TeenPattiIcon } from './icons/TeenPattiIcon';
import { LuckyBagIcon } from './icons/LuckyBagIcon';
import { MusicToolIcon } from './icons/MusicToolIcon';
import { EffectIcon } from './icons/EffectIcon';
import { CleanChatIcon } from './icons/CleanChatIcon';
import { MyItemsIcon } from './icons/MyItemsIcon';
import { GreedyBabyGameIcon } from './icons/games/GreedyBabyGameIcon';
import { Lucky77ProGameIcon } from './icons/games/Lucky77ProGameIcon';
import { Lucky777GameIcon } from './icons/games/Lucky777GameIcon';
import { LuckyFruitGameIcon } from './icons/games/LuckyFruitGameIcon';
import { FishingGameIcon } from './icons/games/FishingGameIcon';
import { GiftWheelGameIcon } from './icons/games/GiftWheelGameIcon';
import { Screen } from '../types';
import { StoreIcon } from './icons/StoreIcon';
import { useToast } from './Toast';

interface GamesAndToolsModalProps {
  onClose: () => void;
  onSelectGame: (gameId: string) => void;
  onClearChat: () => void;
  onNavigate: (screen: Screen) => void;
  onOpenLuckyBag: () => void;
}

const ItemButton: React.FC<{ icon: React.ReactNode; name: string; onClick: () => void; isNew?: boolean }> = ({ icon, name, onClick, isNew = false }) => {
    return (
        <button onClick={onClick} className="relative flex flex-col items-center justify-start gap-1 p-1 group">
            <div className="w-16 h-16 flex items-center justify-center rounded-2xl">
                {icon}
            </div>
            <span className="text-xs font-semibold text-gray-300">{name}</span>
            {isNew && <span className="absolute top-0 right-0 text-xs font-bold text-white bg-red-500 px-1.5 rounded-full">NEW</span>}
        </button>
    );
};


export const GamesAndToolsModal: React.FC<GamesAndToolsModalProps> = ({ onClose, onSelectGame, onClearChat, onNavigate, onOpenLuckyBag }) => {
  const { addToast } = useToast();
  
  return (
    <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose}>
        <div 
            className="absolute bottom-0 left-0 right-0 bg-slate-800/90 backdrop-blur-lg rounded-t-2xl p-4 animate-slide-up border-t border-slate-700"
            onClick={e => e.stopPropagation()}
        >
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-white">Party Game</h3>
                <button onClick={onClose} className="text-2xl text-gray-400">&times;</button>
            </div>
            
            <div className="mb-4">
                <div className="grid grid-cols-4 gap-2">
                    <ItemButton icon={<GreedyBabyGameIcon />} name="GreedyBaby" onClick={() => { onSelectGame('greedy-baby'); onClose(); }} />
                    <ItemButton icon={<Lucky77ProGameIcon />} name="Lucky77 Pro" onClick={() => { onSelectGame('slots'); onClose(); }} />
                    <ItemButton icon={<Lucky777GameIcon />} name="Lucky777" onClick={() => { onSelectGame('slots'); onClose(); }} />
                    <ItemButton icon={<LuckyFruitGameIcon />} name="LuckyFruit" onClick={() => { onSelectGame('greedy'); onClose(); }} />
                    <ItemButton icon={<FishingGameIcon />} name="Fishing" onClick={() => onSelectGame('fishing')} />
                    <ItemButton icon={<TeenPattiIcon className="w-12 h-12 text-blue-300" />} name="TeenPatti" onClick={() => onSelectGame('teen-patti')} />
                    <ItemButton icon={<GiftWheelGameIcon className="w-12 h-12 text-purple-300" />} name="Gift&Wheel" isNew onClick={() => onSelectGame('gift-wheel')} />
                </div>
            </div>

            <div>
                <h4 className="text-sm font-semibold text-gray-400 mb-2 px-1">Party Game</h4>
                 <div className="grid grid-cols-4 gap-2">
                    <ItemButton icon={<LuckyBagIcon className="w-12 h-12 text-red-400" />} name="Lucky Bag" isNew onClick={onOpenLuckyBag} />
                </div>
            </div>
            
            <div className="mt-4">
                <h4 className="text-sm font-semibold text-gray-400 mb-2 px-1">Tools</h4>
                <div className="grid grid-cols-5 gap-2">
                     <ItemButton icon={<MusicToolIcon className="w-10 h-10 text-green-300"/>} name="Music" onClick={() => addToast('Music coming soon!', 'info')} />
                     <ItemButton icon={<StoreIcon className="w-10 h-10 text-orange-300"/>} name="Store" onClick={() => { onClose(); onNavigate('store'); }} />
                     <ItemButton icon={<EffectIcon className="w-10 h-10 text-purple-300"/>} name="Effect" onClick={() => addToast('Effects coming soon!', 'info')} />
                     <ItemButton icon={<MyItemsIcon className="w-10 h-10 text-yellow-300"/>} name="My Items" onClick={() => { onClose(); onNavigate('items'); }} />
                     <ItemButton icon={<CleanChatIcon className="w-10 h-10 text-red-300"/>} name="Clean Chat" onClick={() => { onClearChat(); onClose(); }} />
                </div>
            </div>
        </div>
    </div>
  );
};