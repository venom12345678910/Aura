import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const FaceSmileIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4.06 4.06 0 01-5.656 0M9 10.5h.008v.008H9v-.008zm6 0h.008v.008H15v-.008zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);