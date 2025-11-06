import React from 'react';

interface MainActionButtonProps {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    hasBadge?: boolean;
}

export const MainActionButton: React.FC<MainActionButtonProps> = ({ icon, label, onClick, hasBadge }) => {
    return (
        <button onClick={onClick} className="relative flex flex-col items-center justify-center gap-1.5 p-1 text-white">
            <div className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-slate-600/50">
                {icon}
            </div>
            <span className="text-xs font-semibold">{label}</span>
            {hasBadge && <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-[var(--color-background-deep)]"></div>}
        </button>
    );
};