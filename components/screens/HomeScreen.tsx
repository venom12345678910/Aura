import React, { useState } from 'react';
import type { Room, Screen, User } from '../../types';
import { RoomCard } from '../RoomCard';
import { SearchIcon } from '../icons/SearchIcon';
import { useData } from '../../contexts/DataContext';
import { mockUsers } from '../../data/mock';

interface HomeScreenProps {
  rooms: Room[];
  onJoinRoom: (room: Room) => void;
  onNavigate: (screen: 'missions' | 'ranking' | 'events' | 'pairs' | 'room-list') => void;
  onOpenHomeMenu: () => void;
}

const HomeHeader: React.FC<{ 
  activeTab: 'mine' | 'popular';
  setActiveTab: (tab: 'mine' | 'popular') => void;
}> = ({ activeTab, setActiveTab }) => {
    return (
        <div 
            className="sticky top-0 z-40 px-3 pt-4 pb-2 flex items-center justify-between"
            style={{ background: 'var(--color-surface)' }}
        >
            <div className="flex items-center gap-6 font-bold text-xl">
                 <button onClick={() => setActiveTab('mine')} className={`relative py-2 transition-colors ${activeTab === 'mine' ? 'text-white' : 'text-gray-500'}`}>
                    Mine
                     {activeTab === 'mine' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-400 rounded-full"></div>}
                </button>
                <button onClick={() => setActiveTab('popular')} className={`relative py-2 transition-colors ${activeTab === 'popular' ? 'text-white' : 'text-gray-500'}`}>
                    Popular
                    {activeTab === 'popular' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-400 rounded-full"></div>}
                </button>
            </div>
            <button className="p-2 rounded-full hover:bg-white/10">
                <SearchIcon className="w-6 h-6" />
            </button>
        </div>
    );
};

const QuickActionCard: React.FC<{ name: string, iconUrl: string, onClick: () => void, children?: React.ReactNode }> = ({ name, iconUrl, onClick, children }) => (
    <div onClick={onClick} className="bg-white/10 rounded-xl p-2 flex flex-col items-center justify-center cursor-pointer h-full relative overflow-hidden">
        {children || <img src={iconUrl} alt={name} className="w-8 h-8"/>}
        <span className="text-xs font-semibold mt-1">{name}</span>
    </div>
);

const CPCard: React.FC<{onClick: () => void}> = ({onClick}) => (
    <div onClick={onClick} className="bg-gradient-to-br from-pink-500/50 to-purple-600/50 rounded-xl p-2 flex flex-col items-center justify-center cursor-pointer h-full relative overflow-hidden">
        <div className="relative w-12 h-8 flex items-center justify-center">
            <img src={mockUsers[2].avatarUrl} alt="user 1" className="absolute left-0 w-8 h-8 rounded-full border-2 border-white"/>
            <img src={mockUsers[3].avatarUrl} alt="user 2" className="absolute right-0 w-8 h-8 rounded-full border-2 border-white"/>
            <img src="https://i.postimg.cc/wTgL9T5h/heart-icon.png" alt="heart" className="absolute w-5 h-5 -top-1"/>
        </div>
        <img src="https://i.postimg.cc/WbN1gV3s/cp.png" alt="CP" className="w-10 h-auto -mt-1"/>
    </div>
);

const RocketEventBanner: React.FC<{onJoin: (roomId: string) => void}> = ({ onJoin }) => (
    <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-center p-2">
        <div className="w-full h-24 rounded-lg flex items-center justify-around px-2 relative" style={{background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.4))'}}>
            <div className="flex-1 text-white">
                <p className="text-xs">Room ID: 12085009</p>
                <p className="text-sm font-semibold truncate">The rocket is about to la..</p>
            </div>
            <div className="flex-shrink-0 mx-2 flex flex-col items-center">
                <img src="https://i.postimg.cc/Y0xK3pQd/rocket-main.png" alt="rocket" className="w-16 h-auto -mt-8"/>
                <div className="px-2 py-0.5 bg-black/50 rounded-full text-xs font-mono">00:02</div>
            </div>
            <div className="flex-1 text-white text-right">
                <p className="text-xs">Room ID: 11752092</p>
                <p className="text-sm font-semibold truncate">The rocket is about to la..</p>
            </div>
            <button onClick={() => onJoin('room-1')} className="absolute -right-2 top-1/2 -translate-y-1/2 bg-yellow-400 text-black font-bold px-4 py-1.5 rounded-full text-sm">Go</button>
             <button onClick={() => onJoin('room-2')} className="absolute -left-2 top-1/2 -translate-y-1/2 bg-yellow-400 text-black font-bold px-4 py-1.5 rounded-full text-sm">Go</button>
        </div>
    </div>
);

export const HomeScreen: React.FC<HomeScreenProps> = ({
  rooms,
  onJoinRoom,
  onNavigate,
  onOpenHomeMenu
}) => {
  const { currentUser } = useData();
  const [activeTab, setActiveTab] = useState<'mine' | 'popular'>('popular');

  const exploreRooms = activeTab === 'mine' 
    ? rooms.filter(room => currentUser.friends?.includes(room.host.id))
    : rooms;
    
  const showRocketEvent = true; // Mocking this to be always visible

  return (
    <div className="pb-20 min-h-full">
      <HomeHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="p-3">
        <div className="relative rounded-xl overflow-hidden mb-4 cursor-pointer" onClick={() => onNavigate('missions')}>
            <img src="https://i.postimg.cc/tJ0gq2sN/golden-pinball.png" alt="Golden Pinball" className="w-full h-auto"/>
        </div>
        
        <div className="grid grid-cols-3 gap-3 mb-4 h-20">
            <QuickActionCard name="Ranking" iconUrl="https://i.postimg.cc/d1Qv8B2Y/ranking.png" onClick={() => onNavigate('ranking')} />
            <QuickActionCard name="Room" iconUrl="https://i.postimg.cc/mD8T18g3/room.png" onClick={() => onNavigate('room-list')} />
            <CPCard onClick={() => onNavigate('pairs')} />
        </div>

        <div className="relative">
            {showRocketEvent && <RocketEventBanner onJoin={(id) => onJoinRoom(rooms.find(r => r.id === id)!)}/>}
            <div className={`grid grid-cols-2 gap-3 ${showRocketEvent ? 'pt-28' : ''}`}>
                {exploreRooms.map((room) => (
                    <RoomCard 
                      key={room.id} 
                      room={room} 
                      onJoin={onJoinRoom}
                    />
                ))}
            </div>
        </div>

        {exploreRooms.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            <p>No rooms found in this category.</p>
            <p className="text-sm">Follow your friends to see their rooms here!</p>
          </div>
        )}
      </main>
    </div>
  );
};

// Add to global style to hide scrollbar
const style = document.createElement('style');
style.innerHTML = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;
document.head.appendChild(style);