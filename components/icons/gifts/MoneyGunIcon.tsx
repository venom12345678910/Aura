import React from 'react';

export const MoneyGunIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" className="w-16 h-16" {...props}>
        <rect x="10" y="30" width="80" height="40" rx="5" fill="#f44336" stroke="#b71c1c" strokeWidth="3" />
        <rect x="20" y="20" width="10" height="10" fill="#ffc107" />
    </svg>
);
