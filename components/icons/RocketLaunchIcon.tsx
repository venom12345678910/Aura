import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const RocketLaunchIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
            <linearGradient id="rocketBodyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d1d5db" />
                <stop offset="50%" stopColor="#f9fafb" />
                <stop offset="100%" stopColor="#d1d5db" />
            </linearGradient>
            <linearGradient id="rocketFlameGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="50%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
        </defs>
        
        {/* Flames */}
        <path d="M 80 180 C 60 220, 140 220, 120 180 Q 100 160, 80 180 Z" fill="url(#rocketFlameGradient)" />
        <path d="M 90 180 C 80 210, 120 210, 110 180 Q 100 170, 90 180 Z" fill="#fef3c7" />

        {/* Fins */}
        <path d="M 70 120 L 40 180 L 80 160 Z" fill="#991b1b" />
        <path d="M 130 120 L 160 180 L 120 160 Z" fill="#991b1b" />

        {/* Body */}
        <path d="M 70 170 C 70 120, 130 120, 130 170 L 110 180 L 90 180 Z" fill="url(#rocketBodyGradient)" />
        
        {/* Main rocket body */}
        <ellipse cx="100" cy="100" rx="30" ry="80" fill="url(#rocketBodyGradient)" />

        {/* Tip */}
        <path d="M 100 20 L 130 60 L 70 60 Z" fill="#dc2626" />

        {/* Window */}
        <circle cx="100" cy="80" r="15" fill="#60a5fa" />
        <circle cx="100" cy="80" r="12" fill="#3b82f6" />
        <path d="M 95 75 A 10 10 0 0 1 105 85" fill="none" stroke="#e0f2fe" strokeWidth="2" />
    </svg>
);
