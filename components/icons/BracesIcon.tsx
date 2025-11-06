import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const BracesIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3.75H6.375a1.5 1.5 0 00-1.5 1.5v13.5a1.5 1.5 0 001.5 1.5h1.875m9.75-15h1.875a1.5 1.5 0 011.5 1.5v13.5a1.5 1.5 0 01-1.5 1.5h-1.875" />
    </svg>
);
