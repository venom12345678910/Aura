import React from 'react';

export const UnicornIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" className="w-16 h-16" {...props}>
        <path d="M 50,10 L 55,30 L 70,25 Z" fill="#fdd835" />
        <path d="M 70,25 C 90,30 95,50 80,60 L 60,80 C 40,90 20,70 30,50 L 50,20 C 55,25 60,25 70,25" fill="white" stroke="#e1bee7" strokeWidth="3"/>
        <circle cx="75" cy="40" r="5" fill="#42a5f5"/>
    </svg>
);
