import React from 'react';
export const FishIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg width="64" height="64" viewBox="0 0 100 100" {...props}>
        <path d="M20 50 C 60 20, 60 80, 20 50" fill="#90caf9"/>
        <path d="M20 50 C 80 30, 80 70, 20 50" fill="#42a5f5"/>
        <circle cx="70" cy="50" r="5" fill="black"/>
    </svg>
);
