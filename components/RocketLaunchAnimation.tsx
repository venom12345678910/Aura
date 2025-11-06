import React, { useEffect, useMemo, useState } from 'react';
import type { Room, User } from '../types';
import { mockUsers } from '../data/mock';
import { useToast } from './Toast';

interface RocketLaunchAnimationProps {
  room: Room;
  launchedLevel: number;
  onComplete: () => void;
  onUpdateUser: (updates: Partial<User>) => void;
}

const findUser = (id: string) => mockUsers.find(u => u.id === id);

const Countdown: React.FC<{ onComplete: () => void, initialCount: number }> = ({ onComplete, initialCount }) => {
    const [count, setCount] = useState(initialCount);

    useEffect(() => {
        if (count === 0) {
            onComplete();
            return;
        }
        const timer = setTimeout(() => setCount(c => c - 1), 1000);
        return () => clearTimeout(timer);
    }, [count, onComplete]);
    
    if (count <= 0) return null;

    return (
        <div key={count} className="absolute inset-0 flex items-center justify-center animate-countdown-zoom-effect">
            <span 
                className="text-[256px] font-black text-yellow-300"
                style={{
                    WebkitTextStroke: '8px #c2410c',
                    textShadow: '0 0 35px #fbbf24',
                }}
            >
                {count}
            </span>
        </div>
    );
};

const TopContributorAnimation: React.FC<{ user: User }> = ({ user }) => (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center animate-top-user-frame-fly-in" style={{ animationDuration: '2s', animationDelay: '1s' }}>
        <div className="relative w-64 h-64 flex items-center justify-center">
            <img src="https://i.postimg.cc/vTcwzJFC/frame-royal.png" alt="Top 1 Frame" className="absolute w-full h-auto animate-spin-slow" style={{animationDuration: '20s'}}/>
            <img src={user.avatarUrl} alt={user.displayName} className="w-32 h-32 rounded-full" />
             <div className="absolute top-4 bg-gradient-to-b from-cyan-400 to-blue-600 px-4 py-1 rounded-full text-white font-bold text-xl shadow-lg">Top 1</div>
        </div>
    </div>
);


export const RocketLaunchAnimation: React.FC<RocketLaunchAnimationProps> = ({ room, launchedLevel, onComplete, onUpdateUser }) => {
    const { addToast } = useToast();
    const [stage, setStage] = useState<'countdown' | 'launch'>('countdown');

    const launchedRocket = room.rockets.find(r => r.level === launchedLevel);
    const countdownStart = room.rocketEventState === 'countdown' && room.rocketEventEndsAt ? Math.ceil((room.rocketEventEndsAt - Date.now())/1000) : 10;

    const topContributor = useMemo(() => {
        if (!launchedRocket?.contributions || launchedRocket.contributions.length === 0) return room.host;
        const top = [...launchedRocket.contributions].sort((a, b) => b.amount - a.amount)[0];
        return findUser(top.userId) || room.host;
    }, [launchedRocket, room.host]);
    
    useEffect(() => {
        if (stage === 'launch') {
            const rewardsTimeout = setTimeout(() => {
                if(topContributor.id === 'user-0') {
                    addToast(`You were the top contributor!`, 'success');
                }
            }, 3000);

            const timeout = setTimeout(onComplete, 8000);
            return () => {
                clearTimeout(timeout);
                clearTimeout(rewardsTimeout);
            };
        }
    }, [stage, onComplete, topContributor, onUpdateUser, addToast]);
    
    // Create a random star background for the launch
    const stars = useMemo(() => Array.from({ length: 50 }).map(() => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 2 + 1}s`,
    })), []);

    return (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center overflow-hidden">
             {stars.map((style, i) => (
                <div key={i} className="absolute w-1 h-1 bg-white rounded-full animate-star-flash" style={style} />
            ))}

            {stage === 'countdown' && <Countdown onComplete={() => setStage('launch')} initialCount={countdownStart} />}
            
            {stage === 'launch' && (
                <>
                    <img src="https://i.postimg.cc/Y0xK3pQd/rocket-main.png" alt="Rocket" className="w-72 h-auto animate-rocket-fly-up-main" style={{ animationDuration: '6s', filter: 'drop-shadow(0 0 20px #22d3ee)' }}/>
                    <TopContributorAnimation user={topContributor} />
                </>
            )}
        </div>
    );
};