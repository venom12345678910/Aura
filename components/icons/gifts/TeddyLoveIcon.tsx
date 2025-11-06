import React from 'react';

export const TeddyLoveIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" className="w-16 h-16" {...props}>
        <circle cx="30" cy="25" r="10" fill="#a1887f"/>
        <circle cx="70" cy="25" r="10" fill="#a1887f"/>
        <circle cx="50" cy="45" r="25" fill="#a1887f"/>
        <circle cx="42" cy="40" r="5" fill="black"/>
        <circle cx="58" cy="40" r="5" fill="black"/>
        <path d="M45 55 Q50 60 55 55" stroke="black" strokeWidth="2" fill="none"/>
        <path d="M50 80 C 20 110, 80 110, 50 80" fill="none"/>
        <path d="M50,65 C 40,90 20,70 20,50 C 20,30 40,30 50,45 C 60,30 80,30 80,50 C 80,70 60,90 50,65" fill="#e53935"/>
    </svg>
);
