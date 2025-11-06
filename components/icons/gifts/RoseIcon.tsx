import React from 'react';

export const RoseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" className="w-12 h-12" {...props}>
        <defs>
            <radialGradient id="rose-grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" style={{stopColor: '#ff8a80', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: '#d50000', stopOpacity: 1}} />
            </radialGradient>
        </defs>
        <path d="M50,90 C20,70 20,40 50,20 C80,40 80,70 50,90 Z" fill="url(#rose-grad)" />
        <path d="M50,70 C40,60 40,40 50,30 C60,40 60,60 50,70 Z" fill="#ffcdd2" opacity="0.5"/>
    </svg>
);
