import React from 'react';
export const FruitBasketIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg width="64" height="64" viewBox="0 0 100 100" {...props}>
        <path d="M20 50 L 10 90 H 90 L 80 50 Z" fill="#8d6e63" />
        <path d="M50 40 A 30 10 0 0 0 50 40" stroke="#5d4037" strokeWidth="8" fill="none"/>
        <circle cx="40" cy="50" r="10" fill="#f44336"/>
        <circle cx="60" cy="50" r="10" fill="#ffeb3b"/>
        <circle cx="50" cy="40" r="10" fill="#4caf50"/>
    </svg>
);