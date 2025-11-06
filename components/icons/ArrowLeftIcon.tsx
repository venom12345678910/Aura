import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const ArrowLeftIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
     <defs>
        <filter id="arrowGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
        </filter>
     </defs>
    <g filter="url(#arrowGlow)">
      <path fill="currentColor" d="M11.28 15.7l-4.59-4.59a.996.996 0 010-1.41l4.59-4.59a.996.996 0 111.41 1.41L9.41 11H17c.55 0 1 .45 1 1s-.45 1-1 1H9.41l3.28 3.29c.39.39.39 1.02 0 1.41a.996.996 0 01-1.41 0z"/>
    </g>
  </svg>
);