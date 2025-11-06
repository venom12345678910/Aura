import React from 'react';
export const RankOneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" {...props}>
        <circle cx="50" cy="50" r="40" fill="#fbc02d" />
        <text x="50" y="70" fontFamily="Impact" fontSize="50" fill="white" textAnchor="middle">1</text>
    </svg>
);
