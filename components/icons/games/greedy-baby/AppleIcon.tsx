import React from 'react';
export const AppleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg width="64" height="64" viewBox="0 0 100 100" {...props}>
        <circle cx="50" cy="60" r="30" fill="#f44336"/>
        <path d="M50 30 C 60 20, 70 30, 60 40" stroke="#4caf50" strokeWidth="5" fill="none"/>
    </svg>
);
