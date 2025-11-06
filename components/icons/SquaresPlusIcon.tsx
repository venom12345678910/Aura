import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const SquaresPlusIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5H6.75A2.25 2.25 0 004.5 6.75v10.5A2.25 2.25 0 006.75 19.5h10.5A2.25 2.25 0 0019.5 17.25V15M9 4.5v3.75m0 0h3.75m-3.75 0l3.75 3.75M9 4.5l3.75 3.75m0 0l3.75-3.75m-3.75 3.75V15" />
  </svg>
);