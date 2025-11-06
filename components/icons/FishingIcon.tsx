import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const FishingIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M18 8c-3.23 0-5.73 2.5-6 5.5S10 21 16 21s8-2 8-2-1.5-3.5-6-3.5"/>
        <path d="M18 8V6a3.5 3.5 0 0 0-7 0v2"/>
        <path d="M18 8a3.5 3.5 0 1 1-7 0"/>
        <path d="M14.5 5a3.5 3.5 0 1 0-5 0"/>
        <path d="m11 14 3 3"/>
        <path d="M17 17c-2.5-1.5-5-1.5-5 0"/>
        <path d="m2 14 2-2 2 2"/>
        <path d="m5 17 3 3"/>
    </svg>
);