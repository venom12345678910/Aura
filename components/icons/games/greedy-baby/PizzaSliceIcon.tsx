import React from 'react';
export const PizzaSliceIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg width="64" height="64" viewBox="0 0 100 100" {...props}>
        <path d="M 50 10 L 10 80 C 30 90, 70 90, 90 80 Z" fill="#ffc107"/>
        <circle cx="40" cy="50" r="5" fill="#d32f2f"/>
    </svg>
);