import React from 'react';
export const StrawberryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg width="64" height="64" viewBox="0 0 100 100" {...props}>
        <path d="M50 20 C 80 30, 80 70, 50 90 C 20 70, 20 30, 50 20" fill="#f44336"/>
        <path d="M40 10 L 60 10 L 50 25 Z" fill="#4caf50" />
    </svg>
);
