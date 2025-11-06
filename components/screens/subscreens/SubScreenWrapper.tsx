import React from 'react';
import { ArrowLeftIcon } from '../../icons/ArrowLeftIcon';

interface SubScreenWrapperProps {
  title: string;
  onBack: () => void;
  children: React.ReactNode;
  showBorder?: boolean;
}

export const SubScreenWrapper: React.FC<SubScreenWrapperProps> = ({ title, onBack, children, showBorder = true }) => {
  return (
    <div className="h-full flex flex-col app-bg text-[var(--md-color-on-surface)]">
      <header 
        className="p-4 flex-shrink-0"
        style={{
            background: 'var(--md-color-surface-tint-2)',
            boxShadow: showBorder ? '0 2px 5px rgba(0,0,0,0.3)' : 'none'
        }}
      >
         <div className="flex items-center">
            <button onClick={onBack} className="p-2 mr-2 rounded-full hover:bg-white/10">
                <ArrowLeftIcon className="w-6 h-6"/>
            </button>
            <h1 className="text-xl font-medium text-white">{title}</h1>
         </div>
      </header>
      <div className="flex-grow overflow-y-auto">
        {children}
      </div>
    </div>
  );
};