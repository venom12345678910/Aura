import React from 'react';
import type { RocketReward } from '../types';

interface RocketRewardModalProps {
  reward: RocketReward;
  onClose: () => void;
}

export const RocketRewardModal: React.FC<RocketRewardModalProps> = ({ reward, onClose }) => {
  return (
    <div className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm flex items-center justify-center animate-fade-in" onClick={onClose}>
      <div 
        className="w-full max-w-sm bg-gradient-to-b from-teal-900 to-slate-900 rounded-2xl shadow-2xl border-2 border-cyan-400/50 p-4 text-white animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-cyan-300">Reward</h2>
            <button onClick={onClose} className="text-3xl text-gray-400">&times;</button>
        </div>
        
        <p className="text-sm text-gray-300 mt-1">You've got rewards below</p>

        <div className="my-4 flex flex-col items-center">
            <div className="w-28 h-28 rounded-lg bg-black/30 border-2 border-cyan-400 flex items-center justify-center p-2">
                <img src={reward.mainReward.icon} alt={reward.mainReward.name} className="w-full h-full object-contain" />
            </div>
            <p className="mt-2 font-semibold bg-black/30 px-3 py-1 rounded-full">{reward.mainReward.name}</p>
        </div>

        <div className="space-y-2">
            <p className="text-xs text-center text-gray-400">◆ {reward.leaderboard.length} person received reward ◆</p>
            {reward.leaderboard.map(({ user, rank, rewards }) => (
                <div key={user.id} className="flex items-center gap-3 p-1.5 bg-black/20 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-slate-700 flex flex-col items-center justify-center font-bold">
                        <span className="text-xs -mb-1">TOP</span>
                        <span className="text-lg">{rank}</span>
                    </div>
                    <img src={user.avatarUrl} alt={user.displayName} className="w-10 h-10 rounded-full" />
                    <p className="font-semibold flex-grow truncate">{user.displayName}</p>
                    <div className="flex flex-col items-end gap-1 text-xs font-semibold">
                        {rewards.map(r => (
                            <div key={r.type} className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${r.type === 'coins' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-orange-500/20 text-orange-300'}`}>
                                <span>{r.type === 'coins' ? '💰' : '✨'}</span>
                                <span>{r.amount.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>

      </div>
    </div>
  );
};