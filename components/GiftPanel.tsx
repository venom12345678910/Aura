import React, { useState } from 'react';
import { mockGifts } from '../data/mock';
import type { Gift } from '../types';
import { CoinIcon } from './icons/CoinIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';

interface GiftPanelProps {
    onSendGift: (gift: Gift, quantity: number) => void;
    onClose: () => void;
    currentUserCoins: number;
}

const GiftTab: React.FC<{ label: string, isActive: boolean, onClick: () => void }> = ({ label, isActive, onClick }) => (
    <button onClick={onClick} className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors ${isActive ? 'text-yellow-300' : 'text-gray-400'}`}>
        {label}
        {isActive && <div className="w-4 h-0.5 bg-yellow-300 mx-auto mt-0.5 rounded-full" />}
    </button>
);

export const GiftPanel: React.FC<GiftPanelProps> = ({ onSendGift, onClose, currentUserCoins }) => {
    const [activeTab, setActiveTab] = useState('Gifts');
    const [selectedGift, setSelectedGift] = useState<Gift | null>(mockGifts[0]);
    const [quantity, setQuantity] = useState(1);
    
    const tabs = ['Gifts', 'Customized', 'SVIP', 'CP', 'Country', 'Bagga'];

    const handleSend = () => {
        if (selectedGift) {
            onSendGift(selectedGift, quantity);
            onClose();
        }
    };
    
    return (
       <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose}>
            <div 
                className="absolute bottom-0 left-0 right-0 bg-slate-800/90 backdrop-blur-lg rounded-t-2xl animate-slide-up border-t border-slate-700 flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                <div className="p-2">
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg p-2 flex justify-between items-center text-black">
                        <span className="font-bold">Send a gift and win the jackpot</span>
                        <ChevronRightIcon className="w-6 h-6" />
                    </div>
                </div>
                
                <div className="flex items-center justify-start gap-2 px-2 overflow-x-auto border-b border-slate-700">
                    {tabs.map(tab => (
                        <GiftTab key={tab} label={tab} isActive={activeTab === tab} onClick={() => setActiveTab(tab)} />
                    ))}
                </div>

                <div className="grid grid-cols-4 gap-2 p-2 max-h-52 overflow-y-auto pr-2">
                    {mockGifts.map(gift => (
                        <button 
                            key={gift.id}
                            onClick={() => setSelectedGift(gift)}
                            className={`flex flex-col items-center p-1 rounded-lg transition-all ${selectedGift?.id === gift.id ? 'bg-yellow-500/20 border-yellow-400' : 'bg-slate-800/50 border-transparent'} border`}
                        >
                            <div className="w-14 h-14 flex items-center justify-center">{gift.icon}</div>
                            <span className="text-xs mt-1 text-white truncate">{gift.name}</span>
                            <div className="flex items-center text-xs text-yellow-400 mt-0.5">
                                <CoinIcon className="w-3 h-3 mr-0.5" />
                                <span>{gift.coinValue.toLocaleString()}</span>
                            </div>
                        </button>
                    ))}
                </div>

                <div className="p-3 bg-slate-900/50 border-t border-slate-700 flex items-center justify-between">
                    <button className="text-yellow-400 font-semibold text-sm">
                        {currentUserCoins.toLocaleString()} Recharge {'>'}
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center bg-black/30 rounded-full">
                           <input type="number" value={quantity} onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className="w-12 bg-transparent text-center font-bold" />
                           <button className="px-3 py-1 font-bold text-lg">^</button>
                        </div>
                        <button onClick={handleSend} className="px-6 py-2 bg-yellow-400 text-black font-bold rounded-full">
                            Send
                        </button>
                    </div>
                </div>
            </div>
       </div>
    );
};