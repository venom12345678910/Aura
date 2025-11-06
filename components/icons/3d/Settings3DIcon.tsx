import React from 'react';
export const Settings3DIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" {...props}>
        <circle cx="50" cy="50" r="35" fill="#b0bec5" stroke="#546e7a" strokeWidth="3"/>
        <circle cx="50" cy="50" r="15" fill="#78909c"/>
        <path d="M50 15 V 85 M 15 50 H 85 M 28 28 L 72 72 M 28 72 L 72 28" stroke="#546e7a" strokeWidth="5"/>
    </svg>
);