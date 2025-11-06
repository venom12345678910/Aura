import React from 'react';

export const BombIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" className="w-16 h-16" {...props}>
        <circle cx="50" cy="60" r="30" fill="#212121"/>
        <rect x="45" y="20" width="10" height="20" fill="#757575"/>
        <path d="M50 20 L 60 10" stroke="#ffeb3b" strokeWidth="5" />
    </svg>
);
