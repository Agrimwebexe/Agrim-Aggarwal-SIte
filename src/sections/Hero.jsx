import React from 'react';
import { Button } from '../components/Button';
import { ArrowDown } from 'lucide-react';

export const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex flex-col justify-center pt-20 px-6 max-w-[1280px] mx-auto relative">
      {/* Decorative scanline */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-primary/10 -z-10 pointer-events-none"></div>
      
      <div className="max-w-4xl">
        <p className="font-space-grotesk text-secondary text-sm font-semibold tracking-[0.1em] mb-6 uppercase">
          &gt; System Status: Online
        </p>

        
        <h1 className="text-5xl md:text-7xl font-inter font-bold leading-[1.1] tracking-[-0.02em] text-on-surface mb-8">
          AGRIM AGGARWAL <br/>
          <span className="text-on-surface-variant">PORTFOLIO.</span>
        </h1>
        
        <p className="text-lg md:text-xl font-inter text-on-surface-variant mb-12 max-w-2xl leading-relaxed">
          Engineering the next digital frontier. Building performant, scalable architectures with a focus on immersive UX and technical precision.
        </p>
        
        <div className="flex flex-wrap gap-6">
          <a href="#about">
            <Button variant="primary" className="gap-3">
              INITIALIZE <ArrowDown className="w-4 h-4" />
            </Button>
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-12 left-6 font-space-grotesk text-xs text-outline-variant uppercase tracking-widest flex flex-col gap-2">
        <span>LAT: 28.7041° N</span>
        <span>LNG: 77.1025° E</span>
      </div>
    </section>
  );
};
