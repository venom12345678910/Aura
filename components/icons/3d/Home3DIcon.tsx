import React from 'react';
export const Home3DIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" {...props}>
        <defs>
            <linearGradient id="home3d-roof" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#f44336"/><stop offset="100%" stopColor="#d32f2f"/></linearGradient>
            <linearGradient id="home3d-wall" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#ffccbc"/><stop offset="100%" stopColor="#ffab91"/></linearGradient>
        </defs>
        <path d="M10 40 L50 10 L90 40 L90 90 L10 90 Z" fill="url(#home3d-wall)" stroke="#bf360c" strokeWidth="2" />
        <path d="M10 40 L50 10 L90 40" fill="url(#home3d-roof)" stroke="#bf360c" strokeWidth="2" />
        <rect x="40" y="60" width="20" height="30" fill="#8d6e63"/>
    </svg>
);
