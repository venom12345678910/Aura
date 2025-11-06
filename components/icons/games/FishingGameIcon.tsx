import React from 'react';
export const FishingGameIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" className="w-16 h-16" {...props}>
        <path d="M10 90 L 50 10 L 50 90" stroke="#8d6e63" strokeWidth="5" fill="none"/>
        <path d="M50 20 L 80 50" stroke="#78909c" strokeWidth="3"/>
    </svg>
);
