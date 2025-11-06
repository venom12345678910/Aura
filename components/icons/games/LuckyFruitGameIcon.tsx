import React from 'react';
export const LuckyFruitGameIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" className="w-16 h-16" {...props}>
        <circle cx="50" cy="60" r="30" fill="#f44336"/>
        <circle cx="30" cy="60" r="20" fill="#ffeb3b"/>
    </svg>
);
