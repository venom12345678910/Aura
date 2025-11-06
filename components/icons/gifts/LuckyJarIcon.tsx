import React from 'react';

export const LuckyJarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" className="w-12 h-12" {...props}>
        {/* Jar Body */}
        <path d="M20 90 H80 V40 C80 20, 20 20, 20 40 Z" fill="rgba(173, 216, 230, 0.5)" stroke="#4fc3f7" strokeWidth="4"/>
        {/* Lid */}
        <rect x="15" y="15" width="70" height="10" rx="5" fill="#fbc02d" stroke="#f57f17" strokeWidth="2"/>
        {/* Coins */}
        <circle cx="50" cy="80" r="10" fill="#fdd835"/>
        <circle cx="35" cy="75" r="10" fill="#ffecb3"/>
        <circle cx="65" cy="75" r="10" fill="#ffecb3"/>
        <circle cx="50" cy="65" r="10" fill="#fdd835"/>
        <circle cx="40" cy="55" r="10" fill="#ffecb3"/>
        <circle cx="60" cy="55" r="10" fill="#fdd835"/>
    </svg>
);
