import React from 'react';
import type { Rocket, User, Gift } from '../types';
import { CoinIcon } from './icons/CoinIcon';
import { mockUsers } from '../../data/mock';

interface LaunchRocketModalProps {
  activeRocket: Rocket | undefined;
  user: User;
  onSendGift: (gift: Gift) => void;
  onClose: () => void;
  onShowEvent: () => void;
}

const formatNumber = (num: number) => {
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(0)}K`;
    return num.toString();
}

const ContributionButton: React.FC<{
  amount: number;
  label?: string;
  userBalance: number;
  onContribute: (amount: number) => void;
}> = ({ amount, label, userBalance, onContribute }) => {
  const canAfford = userBalance >= amount;
  return (
    <button
      onClick={() => onContribute(amount)}
      disabled={!canAfford}
      className="flex items-center justify-between w-full p-3 bg-slate-700/50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600/50 transition-colors"
    >
      <div className="flex items-center">
        <span className="text-2xl mr-3">🚀</span>
        <span className="font-semibold">{label || `Launch ${formatNumber(amount)}`}</span>
      </div>
      <div className="flex items-center text-yellow-400 font-bold">
        <CoinIcon className="w-4 h-4 mr-1" />
        <span>{formatNumber(amount)}</span>
      </div>
    </button>
  );
};

const Contributor: React.FC<{ user: User, amount: number, rank: number}> = ({ user, amount, rank }) => (
    <div className="flex items-center gap-2 text-xs">
        <span className="font-bold">{rank}.</span>
        <img src={user.avatarUrl} alt={user.displayName} className="w-5 h-5 rounded-full"/>
        <span className="font-semibold text-gray-300 truncate">{user.displayName}</span>
        <span className="ml-auto font-bold text-yellow-400">{formatNumber(amount)}</span>
    </div>
)

export const LaunchRocketModal: React.FC<LaunchRocketModalProps> = ({ activeRocket, user, onSendGift, onClose, onShowEvent }) => {
  if (!activeRocket) {
    return (
      <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center animate-fade-in" onClick={onClose}>
          <div className="bg-slate-800/80 border border-cyan-400/20 rounded-2xl p-6 w-full max-w-sm m-4 text-white shadow-lg flex flex-col items-center" onClick={e => e.stopPropagation()}>
            <h2 className="text-2xl font-bold text-center text-green-400 mb-4">All Fighters Launched!</h2>
            <p className="text-center text-gray-300 mb-6">This room is at maximum rocket power! 🎉</p>
            <button 
              onClick={onClose}
              className="w-full bg-cyan-500 text-black font-bold py-3 px-4 rounded-full transition-colors hover:bg-cyan-400"
            >
                Awesome!
            </button>
          </div>
      </div>
    );
  }

  const progressPercent = (activeRocket.currentAmount / activeRocket.targetAmount) * 100;
  const remaining = activeRocket.targetAmount - activeRocket.currentAmount;

  const handleContribute = (amount: number) => {
    const fuelGift: Gift = {
      id: `fuel-${amount}`,
      name: `🚀 Rocket Fuel`,
      icon: '🚀',
      coinValue: amount,
    };
    onSendGift(fuelGift);
  };
  
  const contributionOptions = [1000, 10000, 50000].filter(opt => opt < remaining);

  const topContributors = [...(activeRocket.contributions || [])]
    .sort((a,b) => b.amount - a.amount)
    .slice(0,3)
    .map(c => ({...c, user: mockUsers.find(u => u.id === c.userId)}));

  return (
    <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center animate-fade-in" onClick={onClose}>
      <div className="bg-slate-800/80 border border-cyan-400/20 rounded-2xl p-6 w-full max-w-sm m-4 text-white shadow-lg" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-cyan-300">Launch Fighter Lv. {activeRocket.level}</h2>
            <button onClick={onClose} className="text-2xl text-gray-400">&times;</button>
        </div>

        <p className="text-sm text-center text-gray-400 mb-2">Contribute coins to launch the fighter and boost the room!</p>
        
        <div className="w-full bg-slate-700/50 rounded-full h-4 relative overflow-hidden my-4 border border-slate-600">
            <div 
                className="bg-gradient-to-r from-cyan-400 to-purple-500 h-full rounded-full transition-all duration-500 ease-out flex items-center justify-center text-xs font-bold" 
                style={{ width: `${progressPercent}%` }}
            >
              {progressPercent > 10 && `${Math.floor(progressPercent)}%`}
            </div>
        </div>
        <div className="text-center text-sm mb-4">
            <span className="font-semibold text-white">{formatNumber(activeRocket.currentAmount)}</span>
            <span className="text-gray-400"> / {formatNumber(activeRocket.targetAmount)} Coins</span>
        </div>
        
        {topContributors.length > 0 && (
            <div className="mb-4 p-2 bg-black/20 rounded-md space-y-1">
                <h4 className="text-xs font-bold text-center text-gray-400 mb-1">Top Contributors</h4>
                {topContributors.map((c, i) => c.user && <Contributor key={c.user.id} user={c.user} amount={c.amount} rank={i+1} />)}
            </div>
        )}
        
        <div className="space-y-3 mb-4">
            {contributionOptions.map(amount => (
                <ContributionButton key={amount} amount={amount} userBalance={user.coinsBalance} onContribute={handleContribute} />
            ))}
             {remaining > 0 && (
                 <ContributionButton label="Complete Launch" amount={remaining} userBalance={user.coinsBalance} onContribute={handleContribute} />
             )}
        </div>

        <div className="text-center text-sm text-gray-400">
          Your balance: <span className="font-bold text-yellow-400">{user.coinsBalance.toLocaleString()} Coins</span>
        </div>
        <div className="mt-4 text-center">
            <button onClick={onShowEvent} className="text-sm text-cyan-400 hover:text-cyan-300 underline">
                View Event Leaderboard
            </button>
        </div>
      </div>
    </div>
  );
};