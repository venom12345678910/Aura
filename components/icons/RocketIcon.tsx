import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const RocketIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path d="M10.89 2.227a2.25 2.25 0 00-1.78 0l-4.5 2.25a2.25 2.25 0 00-1.11 1.956V14.5a2.25 2.25 0 002.25 2.25h8.5a2.25 2.25 0 002.25-2.25V6.433a2.25 2.25 0 00-1.11-1.956l-4.5-2.25z" />
    </svg>
);
