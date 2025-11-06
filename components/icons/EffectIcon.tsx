import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const EffectIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 3v2"/>
        <path d="m5 5 1.5 1.5"/>
        <path d="M3 12h2"/>
        <path d="m5 19 1.5-1.5"/>
        <path d="M12 21v-2"/>
        <path d="m19 19-1.5-1.5"/>
        <path d="M21 12h-2"/>
        <path d="m19 5-1.5 1.5"/>
        <path d="M12 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
        <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
    </svg>
);