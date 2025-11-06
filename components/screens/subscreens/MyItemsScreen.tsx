import React from 'react';
import { SubScreenWrapper } from './SubScreenWrapper';
import type { StoreItem } from '../../../types';
import { mockStoreItems } from '../../../data/mock';
import { useToast } from '../../Toast';

interface MyItemsScreenProps {
  onBack: () => void;
}

const OwnedItemCard: React.FC<{ item: StoreItem }> = ({ item }) => {
    const { addToast } = useToast();
    const handleEquip = () => {
        addToast(`${item.name} equipped!`, 'success');
    };
    return (
        <div className="rounded-lg overflow-hidden bg-slate-800/50 border border-[var(--color-border)] flex flex-col">
            <div className="relative h-32 bg-black/20 flex items-center justify-center">
                <img src={item.imageUrl} alt={item.name} className="max-h-full max-w-full" />
                <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">{item.type}</div>
            </div>
            <div className="p-3">
                <h3 className="font-bold text-white">{item.name}</h3>
                <p className="text-xs text-gray-400">Expires in {item.durationDays} Days</p>
                <button onClick={handleEquip} className="mt-2 w-full bg-green-500 text-white text-sm font-semibold py-1.5 rounded-full hover:bg-green-600 transition-colors">
                    Equip
                </button>
            </div>
        </div>
    );
}

export const MyItemsScreen: React.FC<MyItemsScreenProps> = ({ onBack }) => {
    // Mock owned items as a subset of store items
    const ownedItems = mockStoreItems.slice(0, 2);

  return (
    <SubScreenWrapper title="My Items" onBack={onBack}>
      <div className="p-4">
        {ownedItems.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {ownedItems.map(item => (
                    <OwnedItemCard key={item.id} item={item} />
                ))}
            </div>
        ) : (
            <div className="text-center py-20">
                <p className="text-gray-400">You don't own any items yet.</p>
                <button className="mt-4 text-cyan-400 font-semibold hover:underline">Go to Store</button>
            </div>
        )}
      </div>
    </SubScreenWrapper>
  );
};
