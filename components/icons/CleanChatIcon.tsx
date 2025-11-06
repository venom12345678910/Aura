import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const CleanChatIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M5 18a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z"/>
        <path d="M5 14h14"/>
        <path d="M12 6v8"/>
        <path d="M9 6v8"/>
        <path d="M15 6v8"/>
    </svg>
);