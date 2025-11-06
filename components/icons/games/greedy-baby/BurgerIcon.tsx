import React from 'react';
export const BurgerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg width="64" height="64" viewBox="0 0 100 100" {...props}>
        <rect x="20" y="30" width="60" height="15" rx="7.5" fill="#d2691e"/>
        <rect x="20" y="45" width="60" height="10" fill="#4caf50"/>
        <rect x="20" y="55" width="60" height="15" rx="5" fill="#8d6e63"/>
        <rect x="20" y="70" width="60" height="15" rx="7.5" fill="#d2691e"/>
    </svg>
);
