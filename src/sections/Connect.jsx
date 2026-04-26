import React from 'react';
import { Button } from '../components/Button';
import { Mail } from 'lucide-react';

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export const Connect = () => {
  return (
    <section id="connect" className="py-32 px-6 max-w-[1280px] mx-auto border-t border-[#21262D]">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-inter font-semibold leading-[1.2] tracking-[-0.01em] text-on-surface mb-6">
          READY TO DEPLOY YOUR NEXT PROJECT?
        </h2>
        
        <p className="text-lg font-space-grotesk text-on-surface-variant mb-12 uppercase tracking-widest">
          System status: <span className="text-secondary">READY_FOR_INPUT</span>. Currently accepting new collaborations.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
          <a href="mailto:aggarwalagrim72@gmail.com">
            <Button variant="primary" className="gap-3 w-full sm:w-auto">
              <Mail className="w-5 h-5" /> INITIATE CONTACT
            </Button>
          </a>
        </div>
        
        <div className="flex items-center justify-center gap-8">
          <a href="https://www.linkedin.com/in/agrim-aggarwal-898830312" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 font-space-grotesk text-sm font-semibold tracking-widest uppercase">
            <LinkedinIcon /> LinkedIn
          </a>
          <a href="https://www.instagram.com/agrim.web.exe" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 font-space-grotesk text-sm font-semibold tracking-widest uppercase">
            <InstagramIcon /> Instagram
          </a>
        </div>
      </div>
    </section>
  );
};
