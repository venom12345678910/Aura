import React from 'react';

export const DiamondRingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 64 64" className="w-16 h-16" {...props}>
        <path d="M 32,36 m -20,0 a 20,20 0 1,0 40,0 a 20,20 0 1,0 -40,0" fill="#fbc02d" stroke="#f57f17" strokeWidth="3" />
        <path d="M 32,36 m -14,0 a 14,14 0 1,0 28,0 a 14,14 0 1,0 -28,0" fill="none" stroke="#fff59d" strokeWidth="2" />
        <path d="M 32,10 L 42,24 L 22,24 Z" fill="#81d4fa" stroke="#0277bd" strokeWidth="2" />
    </svg>
);
