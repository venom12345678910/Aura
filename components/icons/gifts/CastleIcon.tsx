import React from 'react';

export const CastleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 64 64" className="w-16 h-16" {...props}>
        <path d="M 12,24 L 12,60 L 52,60 L 52,24 L 44,24 L 44,16 L 36,16 L 36,24 L 28,24 L 28,16 L 20,16 L 20,24 Z" fill="#c5cae9" stroke="#5c6bc0" strokeWidth="2" />
        <path d="M 12,24 L 8,20 L 16,20 Z" fill="#7986cb" />
        <path d="M 52,24 L 48,20 L 56,20 Z" fill="#7986cb" />
        <rect x="28" y="44" width="8" height="16" fill="#7986cb" />
    </svg>
);
