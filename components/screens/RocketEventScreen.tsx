import React from 'react';
import { SubScreenWrapper } from './subscreens/SubScreenWrapper';
import type { User, Room } from '../../types';
import { mockUsers } from '../../data/mock';
import { CoinIcon } from '../icons/CoinIcon';
import { ExpBar } from '../ExpBar'; // Assuming ExpBar is a component for EXP display
import { RocketLaunchIcon } from '../icons/RocketLaunchIcon';

interface RocketEventScreenProps {
  onBack: () => void;
  room: Room;
}

const leaderboardData = (room: Room) => {
    const activeRocket = room.rockets.find(r => r.status === 'active') || room.rockets[room.rockets.length - 1];
    return [...(activeRocket?.contributions || [])]
        .map(c => ({
            user: mockUsers.find(u => u.id === c.userId)!,
            contribution: c.amount,
        }))
        .filter(item => item.user)
        .sort((a, b) => b.contribution - a.contribution);
}


const LeaderboardItem: React.FC<{ rank: number; user: User; contribution: number }> = ({ rank, user, contribution }) => {
  const rankFrames = [
    'border-yellow-400 bg-yellow-400/10',
    'border-gray-300 bg-gray-300/10',
    'border-yellow-600 bg-yellow-600/10',
  ];
  return (
    <div className={`flex items-center p-2 bg-slate-800/50 rounded-lg border-2 ${rankFrames[rank - 1] || 'border-transparent'}`}>
      <div className="w-8 h-8 flex items-center justify-center text-lg font-bold text-white">
        {rank}
      </div>
      <img src={user.avatarUrl} alt={user.displayName} className="w-12 h-12 rounded-full ml-2 border-2 border-slate-500" />
      <div className="ml-3 flex-grow">
        <p className="font-semibold text-white">{user.displayName}</p>
        <div className="text-white text-xs font-bold px-2 py-0.5 rounded-full inline-block mt-1">
          Lv.{user.level}
        </div>
      </div>
      <div className="ml-auto text-right">
        <p className="font-bold text-yellow-400">{contribution.toLocaleString()}</p>
        <p className="text-xs text-gray-400">Contribution</p>
      </div>
    </div>
  );
};

export const RocketEventScreen: React.FC<RocketEventScreenProps> = ({ onBack, room }) => {
  const topUsers = leaderboardData(room);

  return (
    <SubScreenWrapper title="Fighter Launch" onBack={onBack}>
      <div className="min-h-full bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white">
        <div className="p-4 flex flex-col items-center justify-center relative">
            <RocketLaunchIcon className="w-48 h-48" />
            <div className="absolute bottom-4 left-4 space-y-2">
                {room.rockets.slice(0,3).map(r => (
                     <div key={r.level} className={`px-2 py-1 rounded-md text-xs font-bold ${r.status === 'active' ? 'bg-cyan-500 text-black animate-pulse' : 'bg-slate-700/50'}`}>LV.{r.level}</div>
                ))}
            </div>
             <div className="absolute bottom-4 right-4 space-y-2 text-right">
                 {room.rockets.slice(3,5).map(r => (
                     <div key={r.level} className={`px-2 py-1 rounded-md text-xs font-bold ${r.status === 'active' ? 'bg-cyan-500 text-black animate-pulse' : 'bg-slate-700/50'}`}>LV.{r.level}</div>
                ))}
            </div>
            <div className="w-full h-4 bg-black/30 rounded-full mt-2 border-2 border-cyan-500/50">
                <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" style={{width: '32%'}}></div>
            </div>
             <p className="text-xs text-gray-400 mt-1">Reset countdown: 06 : 25 : 59</p>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-bold text-cyan-300 text-center mb-2">Reward</h3>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-slate-800/50 p-2 rounded-lg">
                <p className="text-xs font-semibold text-yellow-400">TOP 1</p>
                <div className="my-1 text-2xl">🖼️</div>
                <p className="text-xs">200000</p>
            </div>
             <div className="bg-slate-800/50 p-2 rounded-lg">
                <p className="text-xs font-semibold text-gray-300">TOP 2</p>
                <div className="my-1 text-2xl">💰</div>
                <p className="text-xs">120000</p>
            </div>
             <div className="bg-slate-800/50 p-2 rounded-lg">
                <p className="text-xs font-semibold text-yellow-600">TOP 3</p>
                <div className="my-1 text-2xl">⚡</div>
                <p className="text-xs">3000000 EXP</p>
            </div>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-bold text-cyan-300 text-center mb-3">Ranking</h3>
          <div className="flex justify-around items-end mb-4">
              {topUsers.length > 1 && (
                <div className="text-center">
                  <img src={topUsers[1].user.avatarUrl} className="w-16 h-16 rounded-full border-4 border-gray-300 mx-auto"/>
                  <p className="text-sm mt-1 font-semibold">{topUsers[1].user.displayName}</p>
                  <p className="text-xs text-yellow-400">{topUsers[1].contribution.toLocaleString()}</p>
                </div>
              )}
               {topUsers.length > 0 && (
                <div className="text-center">
                  <img src={topUsers[0].user.avatarUrl} className="w-20 h-20 rounded-full border-4 border-yellow-400 mx-auto"/>
                   <p className="text-sm mt-1 font-semibold">{topUsers[0].user.displayName}</p>
                  <p className="text-xs text-yellow-400">{topUsers[0].contribution.toLocaleString()}</p>
                </div>
              )}
               {topUsers.length > 2 && (
                <div className="text-center">
                  <img src={topUsers[2].user.avatarUrl} className="w-16 h-16 rounded-full border-4 border-yellow-600 mx-auto"/>
                   <p className="text-sm mt-1 font-semibold">{topUsers[2].user.displayName}</p>
                  <p className="text-xs text-yellow-400">{topUsers[2].contribution.toLocaleString()}</p>
                </div>
              )}
          </div>
          <div className="space-y-2">
            {topUsers.slice(3).map((item, index) => (
              <LeaderboardItem key={item.user.id} rank={index + 4} user={item.user} contribution={item.contribution} />
            ))}
          </div>
        </div>
      </div>
    </SubScreenWrapper>
  );
};