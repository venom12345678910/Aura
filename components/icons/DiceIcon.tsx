import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const DiceIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <defs>
            <linearGradient id="diceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f44336" />
                <stop offset="100%" stopColor="#d32f2f" />
            </linearGradient>
        </defs>
        <rect width="18" height="18" x="3" y="3" rx="3" fill="url(#diceGrad)" stroke="#b71c1c" strokeWidth="1.5" />
        <circle cx="8" cy="8" r="1.5" fill="white" />
        <circle cx="12" cy="12" r="1.5" fill="white" />
        <circle cx="16" cy="16" r="1.5" fill="white" />
    </svg>
);