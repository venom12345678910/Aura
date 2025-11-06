import React from 'react';
export const GrapeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg width="64" height="64" viewBox="0 0 100 100" {...props}>
        <circle cx="50" cy="60" r="20" fill="#673ab7"/>
        <circle cx="35" cy="45" r="15" fill="#7e57c2"/>
        <circle cx="65" cy="45" r="15" fill="#7e57c2"/>
        <path d="M50 25 L 50 10" stroke="#4caf50" strokeWidth="5"/>
    </svg>
);
