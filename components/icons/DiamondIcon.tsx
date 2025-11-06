import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const DiamondIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 100 100" className="w-12 h-12" {...props}>
    <defs>
      <linearGradient id="diamondGrad2" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#4fc3f7"/>
        <stop offset="100%" stopColor="#039be5"/>
      </linearGradient>
    </defs>
    <g>
      <path d="M 50 10 L 90 40 L 50 90 L 10 40 Z" fill="url(#diamondGrad2)" stroke="#01579b" strokeWidth="4"/>
      <path d="M 50 10 L 10 40 L 50 45 L 90 40 Z" fill="#b3e5fc" opacity="0.8"/>
      <path d="M 10 40 L 50 90 L 50 45 Z" fill="#81d4fa" opacity="0.8"/>
    </g>
  </svg>
);
