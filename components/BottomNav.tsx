import React from 'react';
import { Tab } from '../types';
import { MessageIcon } from './icons/MessageIcon';
import { HomeIcon } from './icons/HomeIcon';
import { ProfileIcon } from './icons/ProfileIcon';
import { HomeSolidIcon } from './icons/HomeSolidIcon';
import { MessageSolidIcon } from './icons/MessageSolidIcon';
import { ProfileSolidIcon } from './icons/ProfileSolidIcon';


interface BottomNavProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  messageCount: number;
}

const NavItem: React.FC<{
  label: Tab;
  activeIcon: React.ReactNode;
  inactiveIcon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  badgeCount?: number;
}> = ({ label, activeIcon, inactiveIcon, isActive, onClick, badgeCount }) => {
  const activeClasses = 'text-[var(--md-color-on-secondary-container)]';
  const inactiveClasses = 'text-[var(--md-color-on-surface-variant)]';
  
  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 focus:outline-none group h-full`}
      aria-label={label}
    >
      <div className="relative">
        <div className={`w-8 h-8 transition-colors duration-300 ${isActive ? activeClasses : inactiveClasses}`}>
            {isActive ? activeIcon : inactiveIcon}
        </div>
        {badgeCount && badgeCount > 0 && (
          <span className="absolute -top-1 -right-2 block h-5 w-5 rounded-full bg-[var(--md-color-error)] text-[var(--md-color-on-error)] text-xs flex items-center justify-center font-bold border-2 border-[var(--md-color-surface)]">
            {badgeCount > 9 ? '9+' : badgeCount}
          </span>
        )}
      </div>
      <span className={`text-xs mt-1 font-semibold transition-colors ${isActive ? 'text-[var(--md-color-on-surface)]' : 'text-[var(--md-color-on-surface-variant)]'}`}>{label}</span>
      {isActive && (
        <div className="absolute bottom-2 w-4 h-1 bg-[var(--md-color-primary)] rounded-full"></div>
      )}
    </button>
  );
};

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab, messageCount }) => {
  return (
    <nav 
        className="fixed bottom-0 left-0 right-0 h-20 flex justify-around items-center z-50 max-w-2xl mx-auto"
        style={{
            background: 'var(--md-color-surface-tint-2)',
            boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.3)',
        }}
    >
      <NavItem
        label={'Home'}
        activeIcon={<HomeSolidIcon />}
        inactiveIcon={<HomeIcon />}
        isActive={activeTab === 'Home'}
        onClick={() => setActiveTab('Home')}
      />
      <NavItem
        label={'Message'}
        activeIcon={<MessageSolidIcon />}
        inactiveIcon={<MessageIcon />}
        isActive={activeTab === 'Message'}
        onClick={() => setActiveTab('Message')}
        badgeCount={messageCount}
      />
      <NavItem
        label={'Me'}
        activeIcon={<ProfileSolidIcon />}
        inactiveIcon={<ProfileIcon />}
        isActive={activeTab === 'Me'}
        onClick={() => setActiveTab('Me')}
      />
    </nav>
  );
};