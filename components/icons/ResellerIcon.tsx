import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const ResellerIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path d="M8 8a3 3 0 100-6 3 3 0 000 6zM8 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z" />
    <path fillRule="evenodd" d="M17 10a5 5 0 11-10 0 5 5 0 0110 0zm-2-1a1 1 0 10-2 0v2h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
  </svg>
);