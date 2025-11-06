import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const ChatDotsIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM6 10a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0zm4 2a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
  </svg>
);