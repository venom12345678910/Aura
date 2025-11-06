import React from 'react';
export const ChickenIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg width="64" height="64" viewBox="0 0 100 100" {...props}>
        <path d="M30,80 L40,50 L50,80 Z" fill="#ffcc80" />
        <path d="M70,80 L60,50 L50,80 Z" fill="#ffcc80" />
        <path d="M20,50 a20,20 0 1,1 60,0" fill="#ffb74d" />
    </svg>
);
