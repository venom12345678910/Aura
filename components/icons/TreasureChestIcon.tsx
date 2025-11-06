import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const TreasureChestIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="2" y="8" width="20" height="12" rx="2" ry="2"/>
        <path d="M2 8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2H2V8z"/>
        <path d="M12 14v-2"/>
        <path d="M8 4h8"/>
    </svg>
);
