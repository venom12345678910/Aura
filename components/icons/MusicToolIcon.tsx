import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const MusicToolIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 12a4 4 0 1 0 4-4"/>
        <path d="M12 12a4 4 0 1 1-4 4"/>
    </svg>
);