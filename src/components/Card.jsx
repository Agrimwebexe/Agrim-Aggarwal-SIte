import React from 'react';

export const Card = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`relative bg-surface-container-low border border-solid border-[#21262D] overflow-hidden ${className}`}
      style={{ borderRadius: '0px' }}
      {...props}
    >
      {/* Decorative coordinate markers */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-outline-variant opacity-50"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-outline-variant opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-outline-variant opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-outline-variant opacity-50"></div>
      
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-b border-solid border-[#21262D] ${className}`}>
    {children}
  </div>
);

export const CardBody = ({ children, className = '' }) => (
  <div className={`px-6 py-6 ${className}`}>
    {children}
  </div>
);
