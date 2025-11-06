import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const LuckyBagIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 6.4a2.4 2.4 0 0 0-2.4 2.4V18a2.4 2.4 0 0 0 2.4 2.4h0a2.4 2.4 0 0 0 2.4-2.4V8.8A2.4 2.4 0 0 0 12 6.4Z"/>
        <path d="M12 6.4a2.4 2.4 0 0 1 2.4 2.4V18a2.4 2.4 0 0 1-2.4 2.4h0a2.4 2.4 0 0 1-2.4-2.4V8.8A2.4 2.4 0 0 1 12 6.4Z"/>
        <path d="M14.4 20.4a2.4 2.4 0 0 0 2.4-2.4V8.8a2.4 2.4 0 1 0-4.8 0V18a2.4 2.4 0 0 0 2.4 2.4Z"/>
        <path d="M9.6 20.4a2.4 2.4 0 0 1-2.4-2.4V8.8a2.4 2.4 0 1 1 4.8 0V18a2.4 2.4 0 0 1-2.4 2.4Z"/>
        <path d="M12 20.4v-4.8"/>
        <path d="m12 6.4-1.6-3.2a2.4 2.4 0 0 1 4.8 0L12 6.4Z"/>
    </svg>
);