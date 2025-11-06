import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const GiftWheelIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 2a10 10 0 1 0 10 10"/>
        <path d="m12 12 8-2.5"/>
        <path d="M12 12-2.5 10"/>
        <path d="M12 12 10 2.5"/>
        <path d="M12 12 2.5 14"/>
        <path d="M12 12 14 21.5"/>
        <path d="M12 12 21.5 14"/>
        <circle cx="12" cy="12" r="2"/>
    </svg>
);