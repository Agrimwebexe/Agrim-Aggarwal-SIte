import React from 'react';

export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 font-space-grotesk text-sm font-semibold tracking-widest uppercase transition-all duration-300 border border-solid focus:outline-none";
  
  const variants = {
    primary: "bg-transparent text-primary border-primary glow-primary hover:bg-primary hover:text-surface-lowest",
    secondary: "bg-transparent text-secondary border-secondary hover:bg-secondary hover:text-surface-lowest",
    ghost: "bg-transparent text-on-surface border-transparent hover:border-outline-variant hover:text-primary",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      style={{ borderRadius: '0px' }} // Sharp corners as per design
      {...props}
    >
      {children}
    </button>
  );
};
