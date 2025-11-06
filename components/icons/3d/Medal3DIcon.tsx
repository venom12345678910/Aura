import React from 'react';
export const Medal3DIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" {...props}>
        <defs>
             <linearGradient id="medal3d-ribbon" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#d32f2f"/><stop offset="100%" stopColor="#f44336"/></linearGradient>
        </defs>
        <circle cx="50" cy="60" r="30" fill="#fbc02d" stroke="#f57f17" strokeWidth="3" />
        <path d="M30 30 L 40 10 L 60 10 L 70 30 Z" fill="url(#medal3d-ribbon)" />
    </svg>
);