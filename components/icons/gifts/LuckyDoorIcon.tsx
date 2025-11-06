import React from 'react';

export const LuckyDoorIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" className="w-12 h-12" {...props}>
        <rect x="20" y="10" width="60" height="80" rx="5" fill="#8d6e63" stroke="#5d4037" strokeWidth="4"/>
        <rect x="25" y="15" width="50" height="70" fill="#a1887f"/>
        <circle cx="70" cy="50" r="5" fill="#fbc02d"/>
        <text x="50" y="60" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="40" fill="#fbc02d" textAnchor="middle">?</text>
    </svg>
);
