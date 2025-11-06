import React from 'react';

export const LuckyKeyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" className="w-12 h-12" {...props}>
        <defs>
            <linearGradient id="luckyKeyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fdd835" />
                <stop offset="100%" stopColor="#f57f17" />
            </linearGradient>
        </defs>
        <g transform="rotate(45 50 50)">
            <circle cx="50" cy="25" r="20" fill="none" stroke="url(#luckyKeyGrad)" strokeWidth="8"/>
            <rect x="45" y="40" width="10" height="45" fill="url(#luckyKeyGrad)" />
            <rect x="35" y="75" width="30" height="10" fill="url(#luckyKeyGrad)" />
            <rect x="35" y="60" width="10" height="10" fill="url(#luckyKeyGrad)" />
        </g>
    </svg>
);
