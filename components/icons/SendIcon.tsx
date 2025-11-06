import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const SendIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <defs>
        <linearGradient id="sendGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
        </linearGradient>
    </defs>
    <path fill="url(#sendGrad)" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
  </svg>
);