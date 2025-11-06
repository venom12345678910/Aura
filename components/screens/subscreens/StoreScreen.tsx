import React from 'react';
import { SubScreenWrapper } from './SubScreenWrapper';
import type { StoreItem, User } from '../../../types';
import { mockStoreItems } from '../../../data/mock';
import { CoinIcon } from '../../icons/CoinIcon';
import { useToast } from '../../Toast';

interface StoreScreenProps {
  onBack: () => void;
  user: User;
  onUpdateUser: (updates: Partial<User>) => void;
}

const StoreItemCard: React.FC<{ item: StoreItem, onPurchase: (item: StoreItem) => void }> = ({ item, onPurchase }) => (
    <div className="rounded-lg overflow-hidden bg-slate-800/50 border border-[var(--color-border)] flex flex-col">
        <div className="relative h-32 bg-black/20 flex items-center justify-center">
            <img src={item.imageUrl} alt={item.name} className="max-h-full max-w-full" />
            <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">{item.type}</div>
        </div>
        <div className="p-3 flex-grow flex flex-col">
            <h3 className="font-bold text-white">{item.name}</h3>
            <p className="text-xs text-gray-400">{item.durationDays} Days</p>
            <div className="mt-auto pt-2 flex justify-between items-center">
                <div className="flex items-center text-yellow-400 font-bold">
                    <CoinIcon className="w-4 h-4 mr-1" />
                    <span>{item.price.toLocaleString()}</span>
                </div>
                <button onClick={() => onPurchase(item)} className="bg-cyan-500 text-black text-sm font-semibold px-4 py-1.5 rounded-full hover:bg-cyan-400 transition-colors">
                    Buy
                </button>
            </div>
        </div>
    </div>
)

export const StoreScreen: React.FC<StoreScreenProps> = ({ onBack, user, onUpdateUser }) => {
    const { addToast } = useToast();

    const handlePurchase = (item: StoreItem) => {
        if (user.coinsBalance < item.price) {
            addToast('Not enough coins!', 'error');
            return;
        }
        if (window.confirm(`Purchase "${item.name}" for ${item.price.toLocaleString()} coins?`)) {
            onUpdateUser({ coinsBalance: user.coinsBalance - item.price });
            addToast(`Successfully purchased ${item.name}!`, 'success');
        }
    };
  return (
    <SubScreenWrapper title="Store" onBack={onBack}>
      <div className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {mockStoreItems.map(item => (
                <StoreItemCard key={item.id} item={item} onPurchase={handlePurchase} />
            ))}
        </div>
      </div>
    </SubScreenWrapper>
  );
};
