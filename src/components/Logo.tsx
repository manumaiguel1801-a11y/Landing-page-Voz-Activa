import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <img 
      src="public/logoapp.png" 
      alt="VozActiva Logo" 
      className={className} 
    />
  );
};
