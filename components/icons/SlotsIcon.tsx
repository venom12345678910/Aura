import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const SlotsIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" {...props}>
         <defs>
            <linearGradient id="slots777Bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c62828" />
                <stop offset="100%" stopColor="#d32f2f" />
            </linearGradient>
            <filter id="slots777Glow">
                <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
        <rect x="5" y="5" width="90" height="90" rx="15" fill="url(#slots777Bg)" />
         <g filter="url(#slots777Glow)">
             <text x="50" y="60" fontFamily="Impact, sans-serif" fontSize="70" fill="#fff" stroke="#b71c1c" strokeWidth="3" textAnchor="middle" dominantBaseline="middle">777</text>
        </g>
    </svg>
);