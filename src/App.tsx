import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
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
import { BrokenByDesign } from './components/ui/broken-by-design';
import { GlitchOverlay } from './components/ui/GlitchOverlay';

export const App: React.FC = () => {
  const [isEntered, setIsEntered] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [timecode, setTimecode] = useState('00:00:00:00');

  const handleEnterSite = () => {
    setIsEntered(true);
    setIsGlitching(true);
  };

  // Mouse torch lighting
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  const smoothMouseX = useSpring(mouseX, { damping: 30, stiffness: 200 });
  const smoothMouseY = useSpring(mouseY, { damping: 30, stiffness: 200 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Live Video Editor Timeline Timecode Ticker
    let frame = 0;
    const interval = setInterval(() => {
      frame = (frame + 1) % 60;
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      const f = String(frame).padStart(2, '0');
      setTimecode(`${h}:${m}:${s}:${f}`);
    }, 1000 / 30);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, [mouseX, mouseY]);

  return (
    <AudioProvider>
      {/* Cybernetic Glitch Transition on Website Reveal */}
      <GlitchOverlay active={isGlitching} onComplete={() => setIsGlitching(false)} />

      {/* 3D Broken Glass Entry Gate */}
      <AnimatePresence>
        {!isEntered && (
          <motion.div
            key="glass-gate"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
            className="fixed inset-0 z-[100]"
          >
            <BrokenByDesign
              title="VIEW HARSH PORTFOLIO"
              onEnter={handleEnterSite}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <SmoothScroll>
        <div className="relative min-h-screen bg-[#060608] text-white selection:bg-amber-400 selection:text-black overflow-x-hidden">
          {/* Subtle noise grain texture overlay */}
          <div className="fixed inset-0 pointer-events-none z-[1] bg-noise opacity-25" />

          {/* Dynamic Follow-Mouse Torch / Spotlight Aura */}
          <motion.div
            className="fixed inset-0 pointer-events-none z-[2] opacity-40 hidden sm:block"
            style={{
              background: `radial-gradient(700px circle at ${smoothMouseX.get()}px ${smoothMouseY.get()}px, rgba(245, 158, 11, 0.12), rgba(56, 189, 248, 0.08), transparent 75%)`,
            }}
          />

          {/* Ambient Glowing Aurora Blobs in Background */}
          <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden">
            {/* Top Amber Glow */}
            <div className="absolute -top-40 -right-40 w-[35rem] h-[35rem] rounded-full bg-amber-500/10 blur-[130px] animate-pulse" />
            {/* Middle Cyan Glow */}
            <div className="absolute top-1/3 -left-40 w-[32rem] h-[32rem] rounded-full bg-cyan-500/10 blur-[120px]" />
            {/* Bottom Purple/Pink Glow */}
            <div className="absolute -bottom-40 right-1/4 w-[38rem] h-[38rem] rounded-full bg-purple-600/10 blur-[140px]" />
          </div>

          {/* Video Editor Ambient HUD Overlay (REC & Timecode ticker) */}
          <div className="fixed bottom-4 left-6 pointer-events-none z-[5] hidden md:flex items-center space-x-3 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
            <span className="flex items-center space-x-1.5 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>TIMELINE ACTIVE</span>
            </span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-400">{timecode}</span>
            <span className="text-zinc-600">|</span>
            <span>4K 60FPS DCI-P3</span>
          </div>

          {/* Vignette backdrop overlay for maximum text readability */}
          <div className="fixed inset-0 pointer-events-none z-[3] bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(6,6,8,0.75)_100%)]" />

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
