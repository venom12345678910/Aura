import React from 'react';
export const Lucky777GameIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" className="w-16 h-16" {...props}>
        <rect x="10" y="10" width="80" height="80" rx="10" fill="#d32f2f"/>
        <text x="50" y="70" fontFamily="Impact" fontSize="70" fill="white" textAnchor="middle">777</text>
    </svg>
);
