import React, { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

export const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-surface/80 backdrop-blur-xl border-b border-[#21262D]' : 'bg-transparent'}`}>
      <div className="max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Terminal className="text-primary w-6 h-6" />
          <span className="font-space-grotesk font-bold tracking-widest text-sm text-on-surface">SYS.AGRIM</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 font-space-grotesk text-xs font-semibold tracking-widest">
          <a href="#home" className="text-on-surface-variant hover:text-primary transition-colors">01 // HOME</a>
          <a href="#about" className="text-on-surface-variant hover:text-primary transition-colors">02 // ABOUT</a>
          <a href="#connect" className="text-on-surface-variant hover:text-primary transition-colors">03 // CONNECT</a>
        </div>
      </div>
    </nav>
  );
};
