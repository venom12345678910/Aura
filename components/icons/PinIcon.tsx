import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const PinIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-1.5m0-1.5v-1.5m0-1.5V15m0-1.5V12m0-1.5V9m0-1.5V6m0-1.5V3" />
  </svg>
);