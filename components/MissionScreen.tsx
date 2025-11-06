
import React, { useState } from 'react';
import { SubScreenWrapper } from './screens/subscreens/SubScreenWrapper';
import { CoinIcon } from './icons/CoinIcon';
import { useToast } from './Toast';

interface Mission {
  id: string;
  title: string;
  description: string;
  reward: number;
  progress: number;
  target: number;
}

const mockDailyMissions: Mission[] = [
  { id: 'd1', title: 'Daily Check-in', description: 'Log in for the first time today.', reward: 100, progress: 1, target: 1 },
  { id: 'd2', title: 'Send a Gift', description: 'Send any gift in a room.', reward: 200, progress: 0, target: 1 },
  { id: 'd3', title: 'Talk for 10 mins', description: 'Be on mic in any room for 10 minutes.', reward: 300, progress: 3, target: 10 },
  { id: 'd4', title: 'Follow a User', description: 'Follow someone new.', reward: 50, progress: 0, target: 1 },
];

const mockWeeklyMissions: Mission[] = [
  { id: 'w1', title: 'Top Gifter', description: 'Gift a total of 50,000 coins.', reward: 5000, progress: 12000, target: 50000 },
  { id: 'w2', title: 'Room Hopper', description: 'Join 10 different rooms.', reward: 1000, progress: 4, target: 10 },
  { id: 'w3', title: 'Social Butterfly', description: 'Talk in rooms for 5 hours total.', reward: 2500, progress: 1, target: 5 },
];

const MissionItem: React.FC<{ mission: Mission }> = ({ mission }) => {
    const { addToast } = useToast();
    const isComplete = mission.progress >= mission.target;
    const [isClaimed, setIsClaimed] = useState(false);

    const handleClaim = () => {
        if(isComplete && !isClaimed) {
            setIsClaimed(true);
            addToast(`Claimed ${mission.reward} coins!`, 'success');
        }
    };

    return (
        <div className="p-4 glassmorphism rounded-lg shadow flex items-center">
            <div className="text-3xl mr-4">🎯</div>
            <div className="flex-grow">
                <h3 className="font-bold text-white">{mission.title}</h3>
                <p className="text-sm text-gray-400">{mission.description}</p>
                <div className="flex items-center gap-2 mt-2">
                    <div className="w-full bg-slate-900/70 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${Math.min(100, (mission.progress / mission.target) * 100)}%` }}></div>
                    </div>
                    <span className="text-xs font-semibold text-gray-300">{mission.progress}/{mission.target}</span>
                </div>
            </div>
            <button 
                onClick={handleClaim}
                disabled={!isComplete || isClaimed}
                className="ml-4 px-4 py-2 rounded-full font-bold text-sm transition-colors disabled:bg-slate-600 disabled:text-gray-400 bg-cyan-400 text-black hover:bg-cyan-300"
            >
                {isClaimed ? 'Claimed' : (isComplete ? 'Claim' : 'Go')}
            </button>
        </div>
    );
};

export const MissionScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState<'daily' | 'weekly'>('daily');

    return (
        <SubScreenWrapper title="Missions Center" onBack={onBack}>
            <div className="min-h-full">
                <div className="p-4 bg-[var(--color-surface-1)] border-b border-[var(--color-border)]">
                    <div className="flex bg-slate-900/50 rounded-full p-1">
                        <button onClick={() => setActiveTab('daily')} className={`w-1/2 py-2 rounded-full font-semibold transition-colors ${activeTab === 'daily' ? 'bg-slate-700 shadow text-white' : 'text-gray-400'}`}>
                            Daily
                        </button>
                        <button onClick={() => setActiveTab('weekly')} className={`w-1/2 py-2 rounded-full font-semibold transition-colors ${activeTab === 'weekly' ? 'bg-slate-700 shadow text-white' : 'text-gray-400'}`}>
                            Weekly
                        </button>
                    </div>
                </div>

                <div className="p-4 space-y-3">
                    {activeTab === 'daily' && mockDailyMissions.map(m => <MissionItem key={m.id} mission={m} />)}
                    {activeTab === 'weekly' && mockWeeklyMissions.map(m => <MissionItem key={m.id} mission={m} />)}
                </div>
            </div>
        </SubScreenWrapper>
    );
};