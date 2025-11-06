import React, { useState } from 'react';
import type { Room, User, Seat } from '../types';
import { useToast } from './Toast';
import { mockCurrentUser, generateMockRockets } from '../data/mock';

interface CreateRoomModalProps {
  onClose: () => void;
  onCreate: (newRoom: Room) => void;
}

export const CreateRoomModal: React.FC<CreateRoomModalProps> = ({ onClose, onCreate }) => {
  const { addToast } = useToast();
  const [roomName, setRoomName] = useState('');
  const [isLocked, setIsLocked] = useState(false);

  const handleCreate = () => {
    if (roomName.trim().length < 3) {
      addToast('Room name must be at least 3 characters long.', 'error');
      return;
    }
    
    const seats: Seat[] = Array.from({ length: 9 }, (_, i) => ({
        seatIndex: i,
        isLocked: false,
    }));
    seats[0].user = mockCurrentUser;


    const newRoom: Room = {
      id: `room-${Date.now()}`,
      title: roomName.trim(),
      host: mockCurrentUser,
      participants: [mockCurrentUser],
      participantCount: 1,
      isLocked,
      seats: seats,
      rockets: generateMockRockets(),
      allowGifts: true,
      allowChat: true,
      isSuperMic: false,
      isMuted: false,
      pinnedMessage: `Welcome to ${roomName.trim()}!`,
    };
    
    onCreate(newRoom);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center animate-fade-in" onClick={onClose}>
      <div 
        className="aurora-bg glassmorphism rounded-2xl p-6 w-full max-w-sm m-4 text-white shadow-lg"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-cyan-300">Create Room</h2>
          <button onClick={onClose} className="text-2xl text-gray-400 hover:text-white transition-colors">&times;</button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-300 mb-1 block">Room Name</label>
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="Your awesome room name"
              className="w-full bg-slate-700/50 px-3 py-2 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </div>

        <button 
          onClick={handleCreate}
          className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold py-3 px-4 rounded-full transition-opacity hover:opacity-90"
        >
          Create & Enter
        </button>
      </div>
    </div>
  );
};