import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const ChatBubbleIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.72.372a3.527 3.527 0 01-3.72 0l-3.72-.372A2.122 2.122 0 013 15.182V10.9a2.122 2.122 0 011.803-2.096l3.72-.372a3.527 3.527 0 013.72 0l3.72.372z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l.75-1.5 1.5.75" />
  </svg>
);