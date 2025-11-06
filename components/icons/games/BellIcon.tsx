import React from 'react';
export const BellIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg width="64" height="64" viewBox="0 0 100 100" {...props}>
        <path d="M20,60 Q50,20 80,60 L 80,70 L 20,70 Z" fill="#ffeb3b" stroke="#fbc02d" strokeWidth="4"/>
        <circle cx="50" cy="80" r="8" fill="#fbc02d"/>
    </svg>
);
