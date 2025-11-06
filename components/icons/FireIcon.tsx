import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const FireIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M11.3 2.21a.75.75 0 011.4 0l1.65 3.312a.75.75 0 00.518.518l3.313 1.65a.75.75 0 010 1.4l-3.312 1.65a.75.75 0 00-.518.518l-1.65 3.313a.75.75 0 01-1.4 0l-1.65-3.312a.75.75 0 00-.518-.518L2.21 11.3a.75.75 0 010-1.4l3.312-1.65a.75.75 0 00.518-.518L7.7 2.21z" clipRule="evenodd" />
    </svg>
);
