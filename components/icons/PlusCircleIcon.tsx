import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const PlusCircleIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <defs>
      <linearGradient id="plusCircleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.6"/>
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.9"/>
      </linearGradient>
    </defs>
    <path fill="url(#plusCircleGrad)" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
    <path fill="#FFFFFF" opacity="0.5" d="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm-1 13v-4H7v-2h4V7h2v4h4v2h-4v4h-2z"/>
  </svg>
);