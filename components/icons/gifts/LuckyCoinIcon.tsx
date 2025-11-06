import React from 'react';

export const LuckyCoinIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" className="w-12 h-12" {...props}>
        <defs>
            <radialGradient id="luckyCoinGrad" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#ffee58" />
                <stop offset="100%" stopColor="#fbc02d" />
            </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="45" fill="url(#luckyCoinGrad)" stroke="#f57f17" strokeWidth="5" />
        <text x="50" y="68" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="50" fill="#f57f17" textAnchor="middle">
            $
        </text>
    </svg>
);
