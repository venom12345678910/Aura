import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const AdminIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5.002L2.002 5.002A2 2 0 00.002 7.002v5.001a2 2 0 002 2h.001a11.954 11.954 0 0115.832 3.056L18 17.002a2 2 0 002-2v-5.001a2 2 0 00-2-2h-.001A11.954 11.954 0 0110 1.944zM8.5 7.5a1 1 0 10-2 0v5a1 1 0 102 0v-5zm3.5 0a1 1 0 10-2 0v5a1 1 0 102 0v-5z" clipRule="evenodd" />
  </svg>
);