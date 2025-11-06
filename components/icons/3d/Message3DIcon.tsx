import React from 'react';
export const Message3DIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" {...props}>
        <rect x="10" y="20" width="80" height="60" rx="10" fill="#42a5f5" stroke="#1e88e5" strokeWidth="2"/>
        <path d="M10 25 L50 55 L90 25" stroke="white" strokeWidth="5" fill="none" />
    </svg>
);
