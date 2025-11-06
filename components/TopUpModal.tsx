import React from 'react';
import { useToast } from './Toast';
import { CoinIcon } from './icons/CoinIcon';

interface TopUpModalProps {
  onClose: () => void;
  onTopUp: (coinAmount: number) => void;
}

const packages = [
  { coins: 10000, price: 0.99, bonus: 0 },
  { coins: 50000, price: 4.99, bonus: 5000 },
  { coins: 100000, price: 9.99, bonus: 15000 },
  { coins: 500000, price: 49.99, bonus: 100000 },
  { coins: 1000000, price: 99.99, bonus: 250000 },
  { coins: 5000000, price: 499.99, bonus: 1500000 },
];

export const TopUpModal: React.FC<TopUpModalProps> = ({ onClose, onTopUp }) => {
    const { addToast } = useToast();
    
    const handlePurchase = (pkg: typeof packages[0]) => {
        onTopUp(pkg.coins + pkg.bonus);
        addToast(`Added ${ (pkg.coins + pkg.bonus).toLocaleString() } coins to your wallet!`, 'success');
        onClose();
    };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center animate-fade-in" onClick={onClose}>
      <div 
        className="w-full max-w-sm bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl shadow-2xl border-2 border-yellow-400/50 p-4 text-white animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-yellow-300">Top Up Coins</h2>
          <button onClick={onClose} className="text-2xl opacity-70 hover:opacity-100">&times;</button>
        </header>
        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {packages.map(pkg => (
                <button 
                    key={pkg.coins} 
                    onClick={() => handlePurchase(pkg)}
                    className="w-full p-3 bg-slate-700/50 rounded-lg flex items-center justify-between hover:bg-slate-600/50 transition-colors border border-transparent hover:border-yellow-400"
                >
                    <div className="flex items-center gap-3">
                        <CoinIcon className="w-8 h-8" />
                        <div>
                            <p className="font-bold text-lg text-white">{pkg.coins.toLocaleString()} Coins</p>
                            {pkg.bonus > 0 && <p className="text-xs text-green-400">+{pkg.bonus.toLocaleString()} Bonus!</p>}
                        </div>
                    </div>
                    <div className="px-4 py-2 bg-green-500 text-white font-bold rounded-lg text-sm">${pkg.price}</div>
                </button>
            ))}
        </div>
      </div>
    </div>
  );
};
