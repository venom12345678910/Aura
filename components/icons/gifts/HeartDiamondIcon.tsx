import React from 'react';

export const HeartDiamondIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" className="w-16 h-16" {...props}>
        <defs>
            <linearGradient id="hd-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#81d4fa"/>
                <stop offset="100%" stopColor="#039be5"/>
            </linearGradient>
        </defs>
        <path d="M50,30 C 40,10 10,20 10,40 C 10,70 50,90 50,90 C 50,90 90,70 90,40 C 90,20 60,10 50,30 Z" fill="url(#hd-grad)" stroke="#01579b" strokeWidth="4"/>
    </svg>
);
