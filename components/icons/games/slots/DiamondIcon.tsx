import React from 'react';

export const DiamondIcon: React.FC = () => (
    <svg width="80" height="80" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="diamondGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#4fc3f7"/>
                <stop offset="100%" stopColor="#039be5"/>
            </linearGradient>
        </defs>
        <g>
            <path d="M 50 10 L 90 40 L 50 90 L 10 40 Z" fill="url(#diamondGrad)" stroke="#01579b" strokeWidth="4"/>
            <path d="M 50 10 L 10 40 L 50 45 L 90 40 Z" fill="#b3e5fc" opacity="0.8"/>
            <path d="M 10 40 L 50 90 L 50 45 Z" fill="#81d4fa" opacity="0.8"/>
        </g>
    </svg>
);
