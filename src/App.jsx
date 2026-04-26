import React from 'react';
import { GridOverlay } from './components/GridOverlay';
import { Navigation } from './components/Navigation';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Connect } from './sections/Connect';

function App() {
  return (
    <div className="relative min-h-screen text-on-surface font-inter">
      <GridOverlay />
      <Navigation />
      
      <main>
        <Hero />
        <About />
        <Connect />
      </main>
      
      <footer className="border-t border-[#21262D] py-8 text-center bg-surface-container-lowest">
        <p className="font-space-grotesk text-xs text-on-surface-variant uppercase tracking-widest">
          © {new Date().getFullYear()} AGRIM AGGARWAL. SYSTEM NORMAL.
        </p>
      </footer>
    </div>
  );
}

export default App;
