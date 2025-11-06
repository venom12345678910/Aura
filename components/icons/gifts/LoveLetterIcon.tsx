import React from 'react';

export const LoveLetterIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" className="w-16 h-16" {...props}>
        <rect x="10" y="20" width="80" height="60" fill="#fffde7" stroke="#fbc02d" strokeWidth="3"/>
        <path d="M 10 20 L 50 50 L 90 20" fill="none" stroke="#fbc02d" strokeWidth="3" />
        <path d="M50,45 C 40,60 20,50 20,35 C 20,25 40,25 50,35 C 60,25 80,25 80,35 C 80,50 60,60 50,45" fill="#e53935"/>
    </svg>
);
