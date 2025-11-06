import React, { useState } from 'react';
import { SubScreenWrapper } from './SubScreenWrapper';
import type { User } from '../../../types';
import { CoinIcon } from '../../icons/CoinIcon';
import { DiamondIcon } from '../../icons/DiamondIcon';
import { useToast } from '../../Toast';
import { TopUpModal } from '../../TopUpModal';
import { WithdrawModal } from '../../WithdrawModal';

interface WalletScreenProps {
  onBack: () => void;
  user: User;
  onUpdateUser: (updates: Partial<User>) => void;
  onNavigate: (screen: 'earnings') => void;
}

const TransactionItem: React.FC<{ type: 'in' | 'out'; description: string; amount: string; date: string }> = ({ type, description, amount, date }) => (
    <div className="flex items-center p-3 hover:bg-white/5 transition-colors">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${type === 'in' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {type === 'in' ? '↓' : '↑'}
        </div>
        <div className="ml-3 flex-grow">
            <p className="font-semibold text-white">{description}</p>
            <p className="text-xs text-gray-400">{date}</p>
        </div>
        <p className={`font-bold ${type === 'in' ? 'text-green-400' : 'text-red-400'}`}>{amount}</p>
    </div>
);

export const WalletScreen: React.FC<WalletScreenProps> = ({ onBack, user, onUpdateUser, onNavigate }) => {
  const { addToast } = useToast();
  const [showTopUp, setShowTopUp] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);

  const handleTopUp = (coinAmount: number) => {
    onUpdateUser({ coinsBalance: user.coinsBalance + coinAmount });
  };
  
  const handleWithdraw = (amount: number) => {
    // We'll simulate that 100 diamonds = $1, and we only withdraw from diamonds
    const diamondCost = amount * 100;
    if (user.diamondsBalance < diamondCost) {
        addToast('Not enough diamonds to withdraw this amount.', 'error');
        return;
    }
    onUpdateUser({ diamondsBalance: user.diamondsBalance - diamondCost });
  };

  // Convert diamonds to a dollar amount for withdrawal
  const availableWithdrawal = Math.floor(user.diamondsBalance / 100);


  return (
    <SubScreenWrapper title="My Wallet" onBack={onBack}>
      <div className="p-4 space-y-4">
        <div className="p-4 rounded-lg glassmorphism text-white">
            <div className="flex justify-between items-center mb-2">
                 <h3 className="text-sm font-semibold text-gray-400">Total Balance</h3>
                 <button onClick={() => onNavigate('earnings')} className="text-xs font-semibold text-cyan-300">Earnings {'>'}</button>
            </div>
            <div className="grid grid-cols-2 gap-4">
                 <div className="flex items-center gap-3">
                    <CoinIcon className="w-10 h-10" />
                    <div>
                        <p className="text-xl font-bold">{user.coinsBalance.toLocaleString()}</p>
                        <p className="text-xs text-gray-300">Coins</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-3">
                    <DiamondIcon className="w-10 h-10" />
                    <div>
                        <p className="text-xl font-bold">{user.diamondsBalance.toLocaleString()}</p>
                        <p className="text-xs text-gray-300">Diamonds</p>
                    </div>
                 </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
                <button onClick={() => setShowTopUp(true)} className="w-full bg-yellow-400 text-black font-bold py-2 rounded-lg hover:bg-yellow-300 transition-colors">Top Up</button>
                <button onClick={() => setShowWithdraw(true)} className="w-full bg-cyan-400 text-black font-bold py-2 rounded-lg hover:bg-cyan-300 transition-colors">Withdraw</button>
            </div>
        </div>

        <div className="p-4 rounded-lg glassmorphism">
            <h3 className="font-bold text-white mb-2">Recent Transactions</h3>
            <div className="space-y-1">
                <TransactionItem type="in" description="Daily Check-in Bonus" amount="+ 100 Coins" date="Today, 9:05 AM" />
                <TransactionItem type="out" description="Gift: Sports Car" amount="- 10,000 Coins" date="Yesterday, 8:32 PM" />
                <TransactionItem type="in" description="Diamond Exchange" amount="+ 5,000 Coins" date="Yesterday, 3:15 PM" />
                <TransactionItem type="out" description="Greedy Baby Bet" amount="- 500 Coins" date="Yesterday, 3:10 PM" />
            </div>
        </div>
      </div>
      {showTopUp && <TopUpModal onClose={() => setShowTopUp(false)} onTopUp={handleTopUp} />}
      {showWithdraw && <WithdrawModal onClose={() => setShowWithdraw(false)} onWithdraw={handleWithdraw} availableBalance={availableWithdrawal} />}
    </SubScreenWrapper>
  );
};