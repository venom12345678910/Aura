import React from 'react';

export const PinballIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" className="w-16 h-16" {...props}>
        <rect x="10" y="10" width="80" height="80" rx="10" fill="#1a237e" stroke="#0d47a1" strokeWidth="3"/>
        <circle cx="30" cy="70" r="8" fill="#f44336"/>
        <circle cx="70" cy="70" r="8" fill="#f44336"/>
        <circle cx="50" cy="30" r="10" fill="#ffeb3b" className="animate-pulse"/>
    </svg>
);
