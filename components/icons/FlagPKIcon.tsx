import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const FlagPKIcon: React.FC<IconProps> = (props) => (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" {...props}>
    <rect width="900" height="600" fill="#006645"/>
    <rect width="225" height="600" fill="#fff"/>
    <circle cx="562.5" cy="300" r="135" fill="#fff"/>
    <circle cx="600" cy="300" r="120" fill="#006645"/>
    <path d="M675,202.5l13.1,84.1-71.2-52.1h88L633.8,286.6z" fill="#fff"/>
</svg>
);