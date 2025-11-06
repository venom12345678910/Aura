import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const CrownIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path d="M11.983 1.904a1 1 0 00-1.966 0l-1.488 4.464-4.226.21a1 1 0 00-.733 1.704l3.23 2.738-1.03 4.31a1 1 0 001.52 1.098L10 14.15l3.709 2.23a1 1 0 001.52-1.098l-1.03-4.31 3.23-2.738a1 1 0 00-.733-1.704l-4.226-.21L11.983 1.904z" />
    </svg>
);
