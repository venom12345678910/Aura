import React from 'react';

export const EarningIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" />
    </svg>
  </div>
);
