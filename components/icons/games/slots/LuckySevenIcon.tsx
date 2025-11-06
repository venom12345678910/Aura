import React from 'react';

export const LuckySevenIcon: React.FC = () => (
    <svg width="80" height="80" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="lucky7Grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f44336" />
                <stop offset="100%" stopColor="#b71c1c" />
            </linearGradient>
            <filter id="lucky7Glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
        <g filter="url(#lucky7Glow)">
            <text 
                x="50" y="60" 
                fontFamily="'Arial Black', Impact, sans-serif" 
                fontSize="90" 
                fill="url(#lucky7Grad)"
                stroke="#4a0b0b"
                strokeWidth="5"
                textAnchor="middle" 
                dominantBaseline="middle"
                paintOrder="stroke"
            >
                7
            </text>
             <text 
                x="50" y="60" 
                fontFamily="'Arial Black', Impact, sans-serif" 
                fontSize="90" 
                fill="url(#lucky7Grad)"
                textAnchor="middle" 
                dominantBaseline="middle"
            >
                7
            </text>
        </g>
    </svg>
);
