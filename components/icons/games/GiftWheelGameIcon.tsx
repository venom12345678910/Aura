import React from 'react';
export const GiftWheelGameIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" className="w-16 h-16" {...props}>
        <circle cx="50" cy="50" r="40" fill="#ffc107"/>
        <path d="M50 10 L 50 90 M 10 50 L 90 50" stroke="#f57f17" strokeWidth="5"/>
    </svg>
);
