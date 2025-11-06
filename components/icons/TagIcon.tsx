import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const TagIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6.75l-9 9m9 0l-9-9" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.938 2.743.666l4.288-1.562a2.25 2.25 0 001.591-2.743l-1.562-4.288c-.272-.963-.033-2.044.666-2.743L18.409 3.66A2.25 2.25 0 0016.158 3H9.568z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
  </svg>
);
