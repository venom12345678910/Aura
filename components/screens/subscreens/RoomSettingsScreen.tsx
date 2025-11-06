import React, { useState } from 'react';
import type { Room } from '../../../types';
import { ToggleSwitch } from '../../ToggleSwitch';
import { useToast } from '../../Toast';
import { presetRoomBackgrounds } from '../../../data/mock';
import mockRoomSocketService from '../../../services/mockRoomSocketService';
import { SettingsMenuItem } from './SettingsMenuItem';
import { SubScreenWrapper } from './SubScreenWrapper';

interface RoomSettingsScreenProps {
  room: Room;
  onBack: () => void;
  onEndRoom: () => void;
}

export const RoomSettingsScreen: React.FC<RoomSettingsScreenProps> = ({ room, onBack, onEndRoom }) => {
    const { addToast } = useToast();
    
    const handleUpdate = (updates: Partial<Room>) => {
      const updatedRoom = { ...room, ...updates };
      mockRoomSocketService.updateRoomSettings(updatedRoom);
    };
    
    const handleToggle = (key: keyof Room, value: boolean) => {
        handleUpdate({ [key]: value });
        const label = String(key).replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        addToast(`${label} ${value ? 'enabled' : 'disabled'}!`, 'success');
    };
    
    const handleEdit = (key: 'title' | 'announcement', promptText: string, currentValue: string | undefined) => {
      const newValue = prompt(promptText, currentValue);
      if (newValue !== null && newValue !== currentValue) {
        handleUpdate({ [key]: newValue as any });
        addToast(`${key === 'title' ? 'Room Name' : 'Announcement'} updated!`, 'success');
      }
    };

    const handleSetPassword = () => {
        const newPassword = prompt('Enter a password for the room (or leave blank to remove).', room.password || '');
        if (newPassword !== null) {
            handleUpdate({ isLocked: !!newPassword, password: newPassword });
            addToast(newPassword ? 'Password set!' : 'Password removed.', 'success');
        }
    };
    
    const handleEndRoom = () => {
        if(window.confirm('Are you sure you want to end this room for everyone?')) {
            addToast('Room has been closed.', 'info');
            onEndRoom();
        }
    };
    
    const handleComingSoon = () => addToast('This feature is coming soon!', 'info');

    return (
        <SubScreenWrapper title="Settings" onBack={onBack}>
            <div className="divide-y divide-slate-700/50 bg-slate-900">
                <SettingsMenuItem label="Room Name" info={room.title} onClick={() => handleEdit('title', 'Enter new room name:', room.title)} />
                <SettingsMenuItem label="Announcement" info={room.announcement} onClick={() => handleEdit('announcement', 'Enter new announcement:', room.announcement)} />
                <SettingsMenuItem label="Number of Mic" info="12 people" onClick={handleComingSoon} />
                <SettingsMenuItem label="Room Password" onClick={handleSetPassword} />
                <div className="flex items-center justify-between w-full p-3.5">
                    <span className="font-medium text-gray-200">Super Mic</span>
                    <ToggleSwitch initialValue={room.isSuperMic} onChange={(v) => handleToggle('isSuperMic', v)} />
                </div>
                <SettingsMenuItem label="Room Theme" onClick={handleComingSoon} />
                <SettingsMenuItem label="Administrators" onClick={handleComingSoon} />
                <SettingsMenuItem label="Blocked List" info="0" onClick={handleComingSoon} />
                <SettingsMenuItem label="Kick History" onClick={handleComingSoon} />
            </div>
        </SubScreenWrapper>
    );
};