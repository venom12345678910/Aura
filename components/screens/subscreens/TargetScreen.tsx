import React, { useState, useEffect } from 'react';
import { SubScreenWrapper } from './SubScreenWrapper';
import type { User } from '../../../types';
import { useToast } from '../../Toast';
import { CoinIcon } from '../../icons/CoinIcon';

interface TargetScreenProps {
  onBack: () => void;
  user: User;
  onUpdateUser: (updates: Partial<User>) => void;
}

const CountdownTimer: React.FC<{ endDate: number }> = ({ endDate }) => {
    const calculateTimeLeft = () => {
        const difference = endDate - Date.now();
        let timeLeft = { days: 0, hours: 0, minutes: 0 };

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 60000);
        return () => clearTimeout(timer);
    });

    return (
        <div className="text-sm text-yellow-300 font-semibold">
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m left
        </div>
    );
};

export const TargetScreen: React.FC<TargetScreenProps> = ({ onBack, user, onUpdateUser }) => {
    const { addToast } = useToast();
    const { targetCycle } = user;
    const progressPercent = Math.min((targetCycle.progress / targetCycle.target) * 100, 100);

    const handleClaimMilestone = (milestoneIndex: number) => {
        const milestone = targetCycle.milestones[milestoneIndex];
        if (targetCycle.progress >= milestone.target && !milestone.claimed) {
            const newMilestones = [...targetCycle.milestones];
            newMilestones[milestoneIndex].claimed = true;
            
            const updatedUser = {
                ...user,
                coinsBalance: user.coinsBalance + milestone.rewardCoins,
                targetCycle: { ...targetCycle, milestones: newMilestones }
            };
            onUpdateUser(updatedUser);
            addToast(`Claimed ${milestone.rewardCoins.toLocaleString()} coins!`, 'success');
        }
    };
    
    const handleWithdraw = () => {
        if (!targetCycle.isComplete) {
            addToast('Target not yet completed!', 'error');
            return;
        }
        // In a real app, this would open a withdrawal provider interface
        addToast('Withdrawal initiated!', 'success');
        // Here you would reset the target cycle for the user
    };

    return (
        <SubScreenWrapper title="15-Day Target" onBack={onBack}>
            <div className="p-4 space-y-4 min-h-full bg-gradient-to-b from-slate-900 to-[var(--color-background-start)]">
                <div className="p-6 rounded-lg glassmorphism text-white text-center shadow-lg border border-purple-400/50">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-purple-300">Current Target</h2>
                        <CountdownTimer endDate={targetCycle.endDate} />
                    </div>
                    <div className="w-full bg-black/30 rounded-full h-6 relative overflow-hidden border-2 border-slate-700">
                        <div className="absolute inset-0 flex items-center justify-center z-10 text-sm font-bold text-shadow">
                            {targetCycle.progress.toLocaleString()} / {targetCycle.target.toLocaleString()} EXP
                        </div>
                        <div 
                            className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${progressPercent}%` }}
                        ></div>
                    </div>
                </div>

                <div className="space-y-3">
                    <h3 className="font-bold text-gray-300 text-lg">Milestone Rewards</h3>
                    {targetCycle.milestones.map((milestone, index) => {
                        const canClaim = targetCycle.progress >= milestone.target && !milestone.claimed;
                        return (
                             <div key={index} className="glassmorphism p-3 rounded-lg flex justify-between items-center">
                                <div>
                                    <p className="font-bold text-white flex items-center gap-1.5"><CoinIcon className="w-5 h-5 text-yellow-400"/> +{milestone.rewardCoins.toLocaleString()} Coins</p>
                                    <p className="text-xs text-gray-400">Reach {milestone.target.toLocaleString()} EXP</p>
                                </div>
                                <button
                                    onClick={() => handleClaimMilestone(index)}
                                    disabled={!canClaim}
                                    className={`px-4 py-2 rounded-full font-bold text-sm transition-colors
                                        ${milestone.claimed ? 'bg-slate-700 text-gray-400 cursor-default' : ''}
                                        ${canClaim ? 'bg-yellow-400 text-black animate-pulse' : ''}
                                        ${!canClaim && !milestone.claimed ? 'bg-slate-600 text-gray-300 opacity-50' : ''}
                                    `}
                                >
                                    {milestone.claimed ? 'Claimed' : 'Claim'}
                                </button>
                            </div>
                        );
                    })}
                </div>

                <div className="pt-4">
                    <button 
                        onClick={handleWithdraw}
                        disabled={!targetCycle.isComplete}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-4 px-4 rounded-lg transition-all shadow-lg disabled:opacity-50 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed hover:scale-105"
                    >
                        {targetCycle.isComplete ? 'Withdraw Earnings' : `Complete Target to Withdraw`}
                    </button>
                    <p className="text-center text-xs text-gray-500 mt-2">Complete your 15-day target to unlock withdrawal options.</p>
                </div>

            </div>
        </SubScreenWrapper>
    );
};