import React from 'react';
export const PizzaIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg width="64" height="64" viewBox="0 0 100 100" {...props}>
        <circle cx="50" cy="50" r="40" fill="#ffc107"/>
        <circle cx="40" cy="40" r="5" fill="#d32f2f"/>
        <circle cx="60" cy="60" r="5" fill="#d32f2f"/>
        <circle cx="65" cy="35" r="5" fill="#d32f2f"/>
    </svg>
);
