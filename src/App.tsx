import React, { useState } from 'react';
import { AudioProvider } from './context/AudioContext';
import { SmoothScroll } from './components/ui/SmoothScroll';
import { CustomCursor } from './components/ui/CustomCursor';
import { LusionScene } from './components/canvas/LusionScene';
import { Header } from './components/layout/Header';
import { MenuOverlay } from './components/layout/MenuOverlay';
import { HeroSection } from './components/sections/HeroSection';
import { ShowreelSection } from './components/sections/ShowreelSection';
import { FeaturedProjects } from './components/sections/FeaturedProjects';
import { AboutSection } from './components/sections/AboutSection';
import { LabsSection } from './components/sections/LabsSection';
import { FooterSection } from './components/sections/FooterSection';

export const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <AudioProvider>
      <SmoothScroll>
        <div className="relative min-h-screen bg-[#070709] text-white selection:bg-amber-400 selection:text-black overflow-x-hidden">
          {/* Subtle noise grain texture overlay */}
          <div className="fixed inset-0 pointer-events-none z-[1] bg-noise opacity-30" />

          {/* Vignette backdrop overlay for maximum text readability */}
          <div className="fixed inset-0 pointer-events-none z-[2] bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(6,6,8,0.7)_100%)]" />

          {/* Fluid Magnetic Cursor */}
          <CustomCursor />

          {/* Real-time 3D WebGL Three.js Canvas Scene */}
          <LusionScene />

          {/* Header Navigation */}
          <Header
            onOpenMenu={() => setIsMenuOpen(!isMenuOpen)}
            isMenuOpen={isMenuOpen}
          />

          {/* Fullscreen Animated Menu Drawer */}
          <MenuOverlay
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
          />

          {/* Page Sections */}
          <main className="relative z-10">
            <HeroSection />
            <ShowreelSection />
            <FeaturedProjects />
            <AboutSection />
            <LabsSection />
            <FooterSection />
          </main>
        </div>
      </SmoothScroll>
    </AudioProvider>
  );
};

export default App;
