import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const StopIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="6" y="6" width="12" height="12" fill="#f44336" stroke="none" />
    </svg>
);
