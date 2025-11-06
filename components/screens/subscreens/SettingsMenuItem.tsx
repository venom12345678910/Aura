import React from 'react';
import { ChevronRightIcon } from '../../icons/ChevronRightIcon';

export const SettingsMenuItem: React.FC<{
    label: string;
    info?: string;
    onClick?: () => void;
    destructive?: boolean;
}> = ({ label, info, onClick, destructive = false }) => (
    <button 
        onClick={onClick}
        className={`flex items-center w-full p-3.5 hover:bg-white/5 transition-colors ${destructive ? 'text-red-500' : ''}`}
    >
        <span className="font-medium text-gray-200">{label}</span>
        <div className="ml-auto flex items-center">
            {info && <span className="text-sm text-gray-400 mr-2">{info}</span>}
            <ChevronRightIcon className="w-5 h-5 text-gray-400" />
        </div>
    </button>
);
