import React from 'react';
import type { Room } from '../types';
import { useData } from '../contexts/DataContext';
import { RoomCard } from './RoomCard';
import { PlusIcon } from './icons/games/greedy-baby/PlusIcon';
import { HomeIcon } from './icons/HomeIcon';
import { HistoryIcon } from './icons/HistoryIcon';

interface HomeMenuProps {
  onClose: () => void;
  onCreateRoom: () => void;
  onJoinRoom: (room: Room) => void;
  allRooms: Room[];
}

export const HomeMenu: React.FC<HomeMenuProps> = ({ onClose, onCreateRoom, onJoinRoom, allRooms }) => {
  const { currentUser } = useData();
  const myRoom = allRooms.find(r => r.id === currentUser.ownRoomId);
  const recentRooms = allRooms.slice(1, 5);

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 animate-fade-in" onClick={onClose}></div>
      
      {/* Menu */}
      <div className="relative w-4/5 max-w-sm h-full bg-[var(--color-background-deep)] shadow-2xl animate-slide-in-left flex flex-col pt-12">
        <div className="p-4 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-3">
            <img src={currentUser.avatarUrl} alt={currentUser.displayName} className="w-14 h-14 rounded-full border-2 border-cyan-400" />
            <div>
              <h2 className="text-xl font-bold text-white">{currentUser.displayName}</h2>
              <p className="text-sm text-gray-400">ID: {currentUser.numericId}</p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {myRoom && (
            <button onClick={() => onJoinRoom(myRoom)} className="w-full text-left p-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 transition-transform hover:scale-105">
                <div className="flex items-center gap-2">
                    <HomeIcon className="w-6 h-6 text-white"/>
                    <h3 className="font-bold text-lg text-white">My Room</h3>
                </div>
                <p className="text-sm text-purple-200 mt-1">{myRoom.title}</p>
            </button>
          )}

           <button onClick={onCreateRoom} className="w-full text-left p-3 rounded-lg bg-slate-800/70 hover:bg-slate-700/70">
                <div className="flex items-center gap-2">
                    <PlusIcon className="w-6 h-6 text-cyan-400"/>
                    <h3 className="font-bold text-lg text-white">Create Room</h3>
                </div>
            </button>
        </div>

        <div className="p-4 flex-grow flex flex-col">
            <h3 className="font-bold text-lg text-white mb-2 flex items-center gap-2"><HistoryIcon className="w-5 h-5"/> Recent</h3>
            <div className="flex-grow overflow-y-auto space-y-3 pr-2">
                {recentRooms.map(room => (
                    <div key={room.id} onClick={() => onJoinRoom(room)} className="flex items-center gap-3 p-2 rounded-lg bg-slate-800/50 cursor-pointer hover:bg-slate-700/50">
                        <img src={room.host.avatarUrl} alt={room.host.displayName} className="w-12 h-12 rounded-lg object-cover" />
                        <div className="overflow-hidden">
                            <p className="font-semibold text-white truncate">{room.title}</p>
                            <p className="text-xs text-gray-400">Host: {room.host.displayName}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
};
