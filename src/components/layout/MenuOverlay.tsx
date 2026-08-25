import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Instagram, Linkedin, Mail } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';
import { SplineScene } from '../ui/splite';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MenuOverlay: React.FC<MenuOverlayProps> = ({ isOpen, onClose }) => {
  const { playHoverSound, playClickSound } = useAudio();
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const navLinks = [
    { num: '01', name: 'Home', tag: 'DISCOVER THE HUB', target: 'hero' },
    { num: '02', name: 'About us', tag: 'THE VISION & STORY', target: 'about' },
    { num: '03', name: 'Projects', tag: 'FEATURED WORKS', target: 'projects' },
    { num: '04', name: 'Showreel', tag: '4K CINEMATIC REEL', target: 'reel' },
    { num: '05', name: 'Labs', tag: 'EDITING ARSENAL', target: 'labs' },
    { num: '06', name: 'Contact', tag: 'START A PROJECT', target: 'contact' },
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
          <div className="absolute inset-0 pointer-events-none z-[2] bg-gradient-to-r from-[#050507]/95 via-[#050507]/60 to-transparent w-full md:w-3/5" />

          {/* Main Content: Nav Links Floating Elegantly */}
          <div className="max-w-7xl mx-auto w-full relative z-10 flex items-center my-auto pointer-events-none">
            {/* Nav Links Column */}
            <div 
              onMouseLeave={() => setHoveredIdx(null)}
              className="flex flex-col space-y-2 sm:space-y-4 pointer-events-auto max-w-2xl"
            >
              {navLinks.map((link, idx) => {
                const isItemHovered = hoveredIdx === idx;
                const isDimmed = hoveredIdx !== null && !isItemHovered;

                return (
                  <motion.button
                    key={link.name}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ 
                      opacity: isDimmed ? 0.28 : 1, 
                      x: isItemHovered ? 16 : 0 
                    }}
                    transition={{ 
                      duration: 0.3,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    onClick={() => handleNavClick(link.target)}
                    onMouseEnter={() => {
                      setHoveredIdx(idx);
                      playHoverSound();
                    }}
                    className="group relative flex flex-col items-start text-left py-1.5 transition-all duration-300 focus:outline-none"
                  >
                    <div className="flex items-center space-x-3 sm:space-x-5">
                      {/* Numeric Index Tag */}
                      <span className={`font-mono text-xs sm:text-sm tracking-widest transition-colors duration-300 ${
                        isItemHovered ? 'text-amber-400 font-bold' : 'text-zinc-500'
                      }`}>
                        [{link.num}]
                      </span>

                      {/* Main Title with Luminous Metallic Radiant Glow */}
                      <span className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight uppercase transition-all duration-300 ${
                        isItemHovered
                          ? 'bg-clip-text text-transparent bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500 drop-shadow-[0_0_28px_rgba(245,158,11,0.65)]'
                          : 'text-white/80'
                      }`}>
                        {link.name}
                      </span>

                      {/* Golden Arrow indicator that glides in */}
                      <ArrowRight className={`w-5 h-5 sm:w-7 sm:h-7 text-amber-400 transition-all duration-300 ${
                        isItemHovered 
                          ? 'opacity-100 translate-x-2' 
                          : 'opacity-0 -translate-x-3'
                      }`} />
                    </div>

                    {/* Micro Tech Tag Subtitle on hover */}
                    <div className="flex items-center space-x-2 pl-9 sm:pl-14 h-4 overflow-hidden mt-0.5">
                      {isItemHovered && (
                        <motion.span
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.2 }}
                          className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-cyan-400 font-bold flex items-center space-x-1.5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping mr-1" />
                          <span>// {link.tag}</span>
                        </motion.span>
                      )}
                    </div>

                    {/* Laser Underline Accent that expands smoothly */}
                    <div className={`h-[2px] bg-gradient-to-r from-amber-400 via-cyan-400 to-transparent transition-all duration-500 rounded-full mt-1 ${
                      isItemHovered ? 'w-full opacity-100' : 'w-0 opacity-0'
                    }`} />
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Bottom High-Contrast Frosted Glass Footer Bar */}
          <div className="max-w-7xl mx-auto w-full pt-4 relative z-20 pointer-events-auto">
            <div className="w-full bg-[#0b0c12]/92 backdrop-blur-2xl border border-white/20 px-5 sm:px-8 py-3 sm:py-3.5 rounded-2xl sm:rounded-full flex flex-col md:flex-row items-center justify-between shadow-2xl shadow-black/95 gap-3.5">
              {/* Left Copyright */}
              <div className="text-xs sm:text-sm font-mono text-zinc-200 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-medium">© {new Date().getFullYear()} Harsh Portfolio. All rights reserved.</span>
              </div>

              {/* Right Social & Contact Badges */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                {/* Twitter / X */}
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={playHoverSound}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-amber-400/20 border border-white/20 hover:border-amber-400 text-xs font-mono font-bold text-white hover:text-amber-300 transition-all duration-300 shadow-md group"
                >
                  <span>Twitter / X</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-300 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={playHoverSound}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-pink-500/20 border border-white/20 hover:border-pink-400 text-xs font-mono font-bold text-white hover:text-pink-300 transition-all duration-300 shadow-md group"
                >
                  <Instagram className="w-3.5 h-3.5 text-pink-400" />
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-300 group-hover:text-pink-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={playHoverSound}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-sky-500/20 border border-white/20 hover:border-sky-400 text-xs font-mono font-bold text-white hover:text-sky-300 transition-all duration-300 shadow-md group"
                >
                  <Linkedin className="w-3.5 h-3.5 text-sky-400" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-300 group-hover:text-sky-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                {/* Direct Email */}
                <a
                  href="mailto:harshdhiman332@gmail.com"
                  onMouseEnter={playHoverSound}
                  className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-amber-400/20 hover:bg-amber-400 border border-amber-400/50 hover:border-amber-400 text-xs font-mono font-bold text-amber-300 hover:text-black transition-all duration-300 shadow-lg shadow-amber-400/10 group"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-400 group-hover:text-black transition-colors" />
                  <span>harshdhiman332@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
