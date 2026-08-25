import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';
import { SplineScene } from '../ui/splite';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MenuOverlay: React.FC<MenuOverlayProps> = ({ isOpen, onClose }) => {
  const { playHoverSound, playClickSound } = useAudio();
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  const navLinks = [
    { name: 'Home', target: 'hero' },
    { name: 'About us', target: 'about' },
    { name: 'Projects', target: 'projects' },
    { name: 'Showreel', target: 'reel' },
    { name: 'Labs', target: 'labs' },
    { name: 'Contact', target: 'contact' },
  ];

  const handleNavClick = (targetId: string) => {
    playClickSound();
    onClose();
    setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onMouseMove={handleMouseMove}
          className="fixed inset-0 z-50 bg-[#050507]/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-12 md:p-16 pt-20 sm:pt-24 overflow-hidden select-none"
        >
          {/* Full-Screen 3D Interactive Robot Spline Canvas - covers entire screen to track cursor over text */}
          <div className="absolute inset-0 w-full h-full pointer-events-auto z-0 overflow-hidden">
            <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full scale-100 sm:scale-105 md:scale-115 lg:scale-125 translate-x-0 sm:translate-x-16 md:translate-x-32 lg:translate-x-44"
            />
          </div>

          {/* Smooth, Unbounded Full-Screen Follow-Mouse Spotlight (No sharp boxes or cutoffs) */}
          <div
            className="pointer-events-none absolute inset-0 z-[1] transition-opacity duration-300"
            style={{
              background: `radial-gradient(750px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.15), rgba(245, 158, 11, 0.05), transparent 70%)`,
            }}
          />

          {/* Subtle Left Vignette for Nav Contrast */}
          <div className="absolute inset-0 pointer-events-none z-[2] bg-gradient-to-r from-[#050507]/90 via-[#050507]/40 to-transparent w-full md:w-1/2" />

          {/* Main Content: Nav Links Floating Elegantly */}
          <div className="max-w-7xl mx-auto w-full relative z-10 flex items-center my-auto pointer-events-none">
            {/* Nav Links Column */}
            <div className="flex flex-col space-y-3 sm:space-y-6 pointer-events-auto max-w-xl">
              {navLinks.map((link, idx) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + idx * 0.04, duration: 0.35 }}
                  onClick={() => handleNavClick(link.target)}
                  onMouseEnter={playHoverSound}
                  className="group flex items-center justify-between text-left text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-white/80 hover:text-white transition-all duration-300 py-1"
                >
                  <span className="relative overflow-hidden inline-block">
                    <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full">
                      {link.name}
                    </span>
                    <span className="absolute top-0 left-0 inline-block transition-transform duration-500 translate-y-full group-hover:translate-y-0 text-amber-400">
                      {link.name}
                    </span>
                  </span>
                  <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 ml-6 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-amber-400" />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Bottom Footer Info */}
          <div className="max-w-7xl mx-auto w-full pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/40 gap-4 relative z-10 pointer-events-auto">
            <div>© {new Date().getFullYear()} Harsh Portfolio. All rights reserved.</div>
            <div className="flex space-x-6">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Twitter / X</a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="mailto:harshdhiman332@gmail.com" className="hover:text-amber-400 transition-colors">harshdhiman332@gmail.com</a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
