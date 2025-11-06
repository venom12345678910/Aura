import React, { useState } from 'react';
import { ChevronRightIcon } from '../../icons/ChevronRightIcon';
import { useToast } from '../../Toast';
import { Screen, Theme } from '../../../types';
import { SubScreenWrapper } from './SubScreenWrapper';
import { useTheme } from '../../contexts/ThemeContext';

interface SettingsScreenProps {
  onBack: () => void;
  onLogout: () => void;
  onNavigate: (type: 'tos' | 'privacy') => void;
}

const SettingsMenuItem: React.FC<{
    label: string;
    info?: string;
    onClick?: () => void;
}> = ({ label, info, onClick }) => (
    <button onClick={onClick} className="flex items-center w-full p-3.5 hover:bg-white/5 transition-colors">
        <span className="font-medium text-gray-200">{label}</span>
        <div className="ml-auto flex items-center">
            {info && <span className="text-sm text-gray-400 mr-2">{info}</span>}
            <ChevronRightIcon className="w-5 h-5 text-gray-400" />
        </div>
    </button>
);

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

    const handleComingSoon = () => {
        addToast('This feature is coming soon!', 'info');
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
                <SettingsMenuItem label="Account" onClick={handleComingSoon} />
                <SettingsMenuItem label="Privacy Settings" onClick={() => onNavigate('privacy')} />
            </div>
            <div className="rounded-lg glassmorphism divide-y divide-[var(--color-border)] overflow-hidden">
                <SettingsMenuItem label="Clean Cache" info={cacheSize} onClick={handleCleanCache} />
            </div>
            <div className="rounded-lg glassmorphism divide-y divide-[var(--color-border)] overflow-hidden">
                <SettingsMenuItem label="Term of Service" onClick={() => onNavigate('tos')} />
                <SettingsMenuItem label="Privacy Policy" onClick={() => onNavigate('privacy')} />
                <SettingsMenuItem label="Refund Policy" onClick={handleComingSoon} />
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