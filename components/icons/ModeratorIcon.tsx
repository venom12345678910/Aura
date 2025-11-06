import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const ModeratorIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path d="M10.75 2.75a.75.75 0 00-1.5 0V4.5h.75a.75.75 0 010 1.5H8.5a.75.75 0 010-1.5h.75V2.75h1.5z" />
        <path fillRule="evenodd" d="M2 5.25A3.25 3.25 0 015.25 2H14.75A3.25 3.25 0 0118 5.25v9.5A3.25 3.25 0 0114.75 18H5.25A3.25 3.25 0 012 14.75v-9.5zm7.25 2a.75.75 0 00-1.5 0v4.5a.75.75 0 001.5 0v-4.5zM13 9.25a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75v-.01z" clipRule="evenodd" />
    </svg>
);