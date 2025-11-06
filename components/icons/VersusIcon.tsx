import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const VersusIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 200 100" {...props}>
        <defs>
            <linearGradient id="vs-grad-v" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <linearGradient id="vs-grad-s" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#be123c" />
            </linearGradient>
            <filter id="vs-glow">
                <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#fefce8" />
            </filter>
        </defs>
        <g filter="url(#vs-glow)">
            <text 
                x="40" y="80" 
                fontFamily="Impact, sans-serif" 
                fontSize="100" 
                fill="url(#vs-grad-v)"
                stroke="#083344"
                strokeWidth="5"
                textAnchor="middle"
            >
                V
            </text>
            <text 
                x="160" y="80" 
                fontFamily="Impact, sans-serif" 
                fontSize="100" 
                fill="url(#vs-grad-s)"
                stroke="#4c0519"
                strokeWidth="5"
                textAnchor="middle"
            >
                S
            </text>
        </g>
    </svg>
);