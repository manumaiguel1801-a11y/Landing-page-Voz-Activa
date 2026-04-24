import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <rect width="100" height="100" rx="24" fill="#FDFBF7" />
      {/* V shape */}
      <path 
        d="M25 35L42 65L55 45" 
        stroke="#D4A017" 
        strokeWidth="9" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* Chart bars */}
      <path 
        d="M45 74V60M62 74V50M79 74V40" 
        stroke="#A67C00" 
        strokeWidth="9" 
        strokeLinecap="round" 
      />
      {/* Swoosh */}
      <path 
        d="M28 68C45 68 60 55 85 28" 
        stroke="#F2D06B" 
        strokeWidth="7" 
        strokeLinecap="round" 
      />
    </svg>
  );
};
