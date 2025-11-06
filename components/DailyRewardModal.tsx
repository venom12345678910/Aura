import React, { useState } from 'react';
import { useToast } from './Toast';
import { CoinIcon } from './icons/CoinIcon';
import { DiamondIcon } from './icons/DiamondIcon';
import { MyItemsIcon } from './icons/MyItemsIcon';
import { TreasureChestIcon } from './TreasureChestIcon';

interface DailyRewardModalProps {
  onClose: () => void;
  onClaimed: () => void;
}

const DayReward: React.FC<{ day: number; reward: string; icon: React.ReactNode; isClaimed: boolean; isToday: boolean }> = ({ day, reward, icon, isClaimed, isToday }) => {
    const baseClasses = 'relative flex flex-col items-center justify-center p-2 rounded-lg aspect-square text-center transition-all duration-300';
    const stateClasses = isClaimed 
        ? 'bg-slate-800/50 border-slate-700' 
        : isToday 
        ? 'bg-yellow-500/30 border-yellow-400 animate-pulse scale-105 shadow-lg shadow-yellow-500/20'
        : 'bg-slate-800/70 border-slate-600';

    return (
        <div className={`${baseClasses} ${stateClasses} border-2`}>
            <p className="absolute top-1 right-2 text-xs font-bold text-gray-400">Day {day}</p>
            <div className="text-3xl my-2 flex items-center justify-center h-8">
                {icon}
            </div>
            <p className="font-semibold text-white mt-1 text-xs truncate">{reward}</p>
            {isClaimed && (
                 <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center rounded-lg">
                    <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            )}
        </div>
    );
};


export const DailyRewardModal: React.FC<DailyRewardModalProps> = ({ onClose, onClaimed }) => {
    const { addToast } = useToast();
    const [today] = useState(3);
    const [claimedDays, setClaimedDays] = useState([1, 2]);

    const rewardsData = [
        { day: 1, reward: "+100 Coins", icon: <CoinIcon className="w-8 h-8"/> },
        { day: 2, reward: "+200 Coins", icon: <CoinIcon className="w-8 h-8"/> },
        { day: 3, reward: "+300 Coins", icon: <CoinIcon className="w-8 h-8"/> },
        { day: 4, reward: "Frame (3d)", icon: <MyItemsIcon className="w-8 h-8 text-cyan-400"/> },
        { day: 5, reward: "+500 Coins", icon: <CoinIcon className="w-8 h-8"/> },
        { day: 6, reward: "+10 Gems", icon: <DiamondIcon className="w-8 h-8"/> },
        { day: 7, reward: "Mystery Box", icon: <TreasureChestIcon className="w-8 h-8 text-purple-400"/> },
    ];

    const rewards = rewardsData.map(r => ({
        ...r,
        isClaimed: claimedDays.includes(r.day),
        isToday: r.day === today
    }));

    const isTodayClaimed = claimedDays.includes(today);

    const handleClaim = () => {
        if (isTodayClaimed) {
            onClose();
            return;
        }

        const rewardInfo = rewardsData.find(r => r.day === today);
        setClaimedDays([...claimedDays, today]);
        addToast(`Claimed ${rewardInfo?.reward}!`, 'success');
        onClaimed();
        
        setTimeout(onClose, 500);
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center animate-fade-in" onClick={onClose}>
            <div className="glassmorphism border-2 border-yellow-500 rounded-2xl p-6 w-full max-w-md m-4 text-white shadow-lg" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold text-center gold-text-glow mb-4">Daily Check-in</h2>
                <div className="grid grid-cols-4 gap-3 mb-6">
                    {rewards.map(reward => <DayReward key={reward.day} {...reward} />)}
                </div>
                <button 
                    onClick={handleClaim}
                    disabled={isTodayClaimed}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold py-3 px-4 rounded-full transition-all disabled:from-slate-600 disabled:to-slate-700 disabled:text-gray-400"
                    style={!isTodayClaimed ? { animation: 'gold-button-glow 2s infinite ease-in-out' } : {}}
                >
                    {isTodayClaimed ? 'Claimed Today' : 'Claim Reward'}
                </button>
            </div>
        </div>
    );
};
