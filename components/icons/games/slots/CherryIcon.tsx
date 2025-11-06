import React from 'react';

export const CherryIcon: React.FC = () => (
    <svg width="80" height="80" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(5, 5)">
            <path d="M 40 20 C 30 10, 50 10, 50 25 L 45 35" stroke="#4caf50" strokeWidth="6" fill="none" strokeLinecap="round"/>
            <circle cx="35" cy="60" r="20" fill="#d32f2f" />
            <circle cx="65" cy="55" r="20" fill="#e53935" />
            <ellipse cx="30" cy="50" rx="5" ry="10" fill="white" fillOpacity="0.7" transform="rotate(-30 30 50)"/>
            <ellipse cx="60" cy="45" rx="5" ry="10" fill="white" fillOpacity="0.7" transform="rotate(-30 60 45)"/>
        </g>
    </svg>
);
