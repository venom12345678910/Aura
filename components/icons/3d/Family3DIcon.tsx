import React from 'react';
export const Family3DIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" {...props}>
        <circle cx="30" cy="45" r="10" fill="#78909c"/>
        <path d="M20 80 C 20 60, 40 60, 40 80Z" fill="#78909c"/>
        <circle cx="70" cy="45" r="10" fill="#78909c"/>
        <path d="M60 80 C 60 60, 80 60, 80 80Z" fill="#78909c"/>
        <circle cx="50" cy="35" r="12" fill="#90a4ae"/>
        <path d="M40 90 C 40 70, 60 70, 60 90Z" fill="#90a4ae"/>
    </svg>
);