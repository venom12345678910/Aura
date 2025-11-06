import React from 'react';

interface MissionsWidgetProps {
    onNavigate: () => void;
}

export const MissionsWidget: React.FC<MissionsWidgetProps> = ({ onNavigate }) => {
    return (
        <button onClick={onNavigate} className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-purple-600/80 to-indigo-700/80 rounded-lg shadow-lg text-white border border-purple-400/30 transition-transform hover:scale-[1.02]">
            <div className="flex items-center">
                <div className="text-4xl mr-4 p-2 bg-black/20 rounded-lg">🎯</div>
                <div>
                    <h3 className="font-bold text-lg">Missions Center</h3>
                    <p className="text-sm text-purple-200">Claim your daily rewards!</p>
                </div>
            </div>
            <div className="bg-yellow-400 text-black text-sm font-bold px-4 py-2 rounded-full flex items-center hover:bg-yellow-300 transition-colors">
                <span>View</span>
                <span className="relative flex h-2 w-2 ml-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
            </div>
        </button>
    );
};