import React, { useState } from 'react';
import { useToast } from '../../Toast';
import { Screen, Theme } from '../../../types';
import { SubScreenWrapper } from './SubScreenWrapper';
import { useTheme } from '../../../contexts/ThemeContext';
import { SettingsMenuItem } from './SettingsMenuItem';

interface SettingsScreenProps {
  onBack: () => void;
  onLogout: () => void;
  onNavigate: (type: Screen | 'tos' | 'privacy' | 'refund') => void;
}

const ThemeButton: React.FC<{ theme: Theme, name: string, active: boolean, onClick: () => void, colors: { bg: string, text: string } }> = ({ theme, name, active, onClick, colors }) => (
    <button onClick={onClick} className="text-center">
        <div className={`w-16 h-10 rounded-md flex items-center justify-center border-2 ${active ? 'border-cyan-400' : 'border-gray-600'}`} style={{ backgroundColor: colors.bg }}>
        </div>
        <p className={`mt-1 text-xs font-semibold ${active ? 'text-cyan-300' : 'text-gray-400'}`}>{name}</p>
    </button>
)

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack, onLogout, onNavigate }) => {
    const { addToast } = useToast();
    const { theme, setTheme } = useTheme();
    const [cacheSize, setCacheSize] = useState('3.1MB');

    const handleCleanCache = () => {
        addToast(`Cache cleared (${cacheSize} removed)!`, 'success');
        setCacheSize('0.0MB');
    };

  return (
    <SubScreenWrapper title="Settings" onBack={onBack}>
        <div className="p-4 space-y-4">
            <div className="rounded-lg glassmorphism p-3">
                <h3 className="font-semibold text-gray-300 mb-2 px-1">Appearance</h3>
                <div className="flex justify-around">
                    <ThemeButton theme="aura" name="Aura" active={theme === 'aura'} onClick={() => setTheme('aura')} colors={{bg: '#0f172a', text: '#e1e3e4'}} />
                    <ThemeButton theme="midnight" name="Midnight" active={theme === 'midnight'} onClick={() => setTheme('midnight')} colors={{bg: '#111318', text: '#dde1f9'}} />
                    <ThemeButton theme="crimson" name="Crimson" active={theme === 'crimson'} onClick={() => setTheme('crimson')} colors={{bg: '#1a1112', text: '#ffdad9'}} />
                </div>
            </div>

            <div className="rounded-lg glassmorphism divide-y divide-[var(--color-border)] overflow-hidden">
                <SettingsMenuItem label="Account" onClick={() => onNavigate('account')} />
                <SettingsMenuItem label="Privacy Settings" onClick={() => onNavigate('privacy')} />
            </div>
            <div className="rounded-lg glassmorphism divide-y divide-[var(--color-border)] overflow-hidden">
                <SettingsMenuItem label="Clean Cache" info={cacheSize} onClick={handleCleanCache} />
            </div>
            <div className="rounded-lg glassmorphism divide-y divide-[var(--color-border)] overflow-hidden">
                <SettingsMenuItem label="Term of Service" onClick={() => onNavigate('tos')} />
                <SettingsMenuItem label="Privacy Policy" onClick={() => onNavigate('privacy')} />
                <SettingsMenuItem label="Refund Policy" onClick={() => onNavigate('refund')} />
            </div>
             <div className="rounded-lg glassmorphism divide-y divide-[var(--color-border)] overflow-hidden">
                <SettingsMenuItem label="About Us" onClick={() => onNavigate('about')} />
                <SettingsMenuItem label="Contact Us" onClick={() => onNavigate('contact')} />
            </div>
            
            <div className="pt-4">
                <button onClick={onLogout} className="w-full bg-red-600/80 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                    Logout
                </button>
                <p className="text-center text-xs text-gray-500 mt-4">Version: 2.1.0</p>
            </div>
        </div>
    </SubScreenWrapper>
  );
};