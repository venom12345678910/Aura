import React, { useState } from 'react';
import type { User } from '../types';
import { useToast } from './Toast';
import { CoinIcon } from './icons/CoinIcon';

interface CreateLuckyBagModalProps {
  user: User;
  onClose: () => void;
  onCreate: (totalCoins: number, totalBags: number) => void;
}

export const CreateLuckyBagModal: React.FC<CreateLuckyBagModalProps> = ({ user, onClose, onCreate }) => {
  const { addToast } = useToast();
  const [totalCoins, setTotalCoins] = useState('');
  const [totalBags, setTotalBags] = useState('');

  const handleCreate = () => {
    const coins = parseInt(totalCoins, 10);
    const bags = parseInt(totalBags, 10);

    if (isNaN(coins) || coins <= 0) {
      addToast('Please enter a valid coin amount.', 'error');
      return;
    }
    if (isNaN(bags) || bags <= 0) {
      addToast('Please enter a valid number of bags.', 'error');
      return;
    }
    if (coins < bags) {
      addToast('Total coins must be at least equal to the number of bags.', 'error');
      return;
    }
    if (user.coinsBalance < coins) {
      addToast('You do not have enough coins.', 'error');
      return;
    }

    onCreate(coins, bags);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center animate-fade-in" onClick={onClose}>
      <div 
        className="bg-slate-800/80 border border-red-400/20 rounded-2xl p-6 w-full max-w-sm m-4 text-white shadow-lg"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-red-300">Create Lucky Bag</h2>
          <button onClick={onClose} className="text-2xl text-gray-400 hover:text-white transition-colors">&times;</button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-300 mb-1 block">Total Coins</label>
            <input
              type="number"
              value={totalCoins}
              onChange={(e) => setTotalCoins(e.target.value)}
              placeholder="e.g., 10000"
              className="w-full bg-slate-700/50 px-3 py-2 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-300 mb-1 block">Number of Bags</label>
            <input
              type="number"
              value={totalBags}
              onChange={(e) => setTotalBags(e.target.value)}
              placeholder="e.g., 10"
              className="w-full bg-slate-700/50 px-3 py-2 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        <button 
          onClick={handleCreate}
          className="w-full mt-6 bg-gradient-to-r from-red-500 to-orange-600 text-white font-bold py-3 px-4 rounded-full transition-opacity hover:opacity-90"
        >
          Drop the Bag!
        </button>
      </div>
    </div>
  );
};
