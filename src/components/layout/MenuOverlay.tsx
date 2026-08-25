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
    { num: '01', name: 'Home', target: 'hero' },
    { num: '02', name: 'About us', target: 'about' },
    { num: '03', name: 'Projects', target: 'projects' },
    { num: '04', name: 'Showreel', target: 'reel' },
    { num: '05', name: 'Labs', target: 'labs' },
    { num: '06', name: 'Contact', target: 'contact' },
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
          className="fixed inset-0 z-50 bg-[#060609]/98 backdrop-blur-3xl flex flex-col justify-between p-6 sm:p-12 md:p-16 pt-20 sm:pt-24 overflow-hidden select-none"
        >
          {/* Full-Screen 3D Interactive Robot Spline Canvas */}
          <div className="absolute inset-0 w-full h-full pointer-events-auto z-0 overflow-hidden">
            <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full scale-100 sm:scale-105 md:scale-115 lg:scale-125 translate-x-0 sm:translate-x-16 md:translate-x-32 lg:translate-x-44"
            />
          </div>

          {/* Luxury Minimalist Follow-Mouse Ambient Glow */}
          <div
            className="pointer-events-none absolute inset-0 z-[1] transition-opacity duration-500"
            style={{
              background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(245, 158, 11, 0.08), rgba(255, 255, 255, 0.03), transparent 70%)`,
            }}
          />

          {/* Left Dark Gradient Shield for Clean Typographic Legibility */}
          <div className="absolute inset-0 pointer-events-none z-[2] bg-gradient-to-r from-[#060609]/95 via-[#060609]/65 to-transparent w-full md:w-3/5" />

          {/* Main Content: Luxury Minimalist Navigation Links */}
          <div className="max-w-7xl mx-auto w-full relative z-10 flex items-center my-auto pointer-events-none">
            <div 
              onMouseLeave={() => setHoveredIdx(null)}
              className="flex flex-col space-y-1.5 sm:space-y-3 pointer-events-auto max-w-2xl"
            >
              {navLinks.map((link, idx) => {
                const isItemHovered = hoveredIdx === idx;
                const isDimmed = hoveredIdx !== null && !isItemHovered;

                return (
                  <motion.button
                    key={link.name}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ 
                      opacity: isDimmed ? 0.25 : 1, 
                      x: isItemHovered ? 14 : 0 
                    }}
                    transition={{ 
                      duration: 0.35,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    onClick={() => handleNavClick(link.target)}
                    onMouseEnter={() => {
                      setHoveredIdx(idx);
                      playHoverSound();
                    }}
                    className="group relative flex items-center text-left py-1.5 transition-all duration-300 focus:outline-none"
                  >
                    {/* Minimalist Index Number */}
                    <span className={`font-mono text-xs sm:text-sm mr-4 sm:mr-6 tracking-widest transition-colors duration-300 ${
                      isItemHovered ? 'text-amber-400 font-bold' : 'text-zinc-600'
                    }`}>
                      {link.num}
                    </span>

                    {/* Main Title - Clean Luxury Typography */}
                    <span className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter transition-all duration-300 ${
                      isItemHovered
                        ? 'text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]'
                        : 'text-zinc-400/80 hover:text-white'
                    }`}>
                      {link.name}
                    </span>

                    {/* Sleek Minimalist Arrow Indicator on Hover */}
                    <motion.div
                      animate={{
                        opacity: isItemHovered ? 1 : 0,
                        x: isItemHovered ? 8 : -8,
                      }}
                      transition={{ duration: 0.25 }}
                      className="ml-5 text-amber-400"
                    >
                      <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8" />
                    </motion.div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Bottom High-End Professional Studio Footer Bar */}
          <div className="max-w-7xl mx-auto w-full pt-4 relative z-20 pointer-events-auto">
            {/* Elegant Luxury Dual-Tone Hairline Border Frame */}
            <div className="relative p-[1px] rounded-2xl sm:rounded-full bg-gradient-to-r from-amber-400/40 via-white/20 to-cyan-400/40 shadow-[0_0_25px_rgba(245,158,11,0.12)]">
              {/* Refined Matte Obsidian Glass Container */}
              <div className="w-full bg-[#0a0a0f]/90 backdrop-blur-2xl px-6 sm:px-8 py-3 sm:py-3.5 rounded-[calc(1rem-1px)] sm:rounded-full flex flex-col md:flex-row items-center justify-between shadow-2xl gap-3.5">
                {/* Left Copyright */}
                <div className="text-xs sm:text-sm font-mono text-zinc-300 flex items-center space-x-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-400/90 shadow-[0_0_8px_#34d399]" />
                  <span className="font-medium tracking-wide">
                    © {new Date().getFullYear()} Harsh Portfolio. All rights reserved.
                  </span>
                </div>

                {/* Right Social & Contact Links - Studio Minimalist Design */}
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                  {/* Twitter / X */}
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={playHoverSound}
                    className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.14] border border-white/10 hover:border-amber-400/50 text-xs font-mono text-zinc-200 hover:text-white transition-all duration-300 group"
                  >
                    <span>Twitter / X</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={playHoverSound}
                    className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.14] border border-white/10 hover:border-pink-400/50 text-xs font-mono text-zinc-200 hover:text-white transition-all duration-300 group"
                  >
                    <Instagram className="w-3.5 h-3.5 text-zinc-400 group-hover:text-pink-400 transition-colors" />
                    <span>Instagram</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-pink-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={playHoverSound}
                    className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.14] border border-white/10 hover:border-cyan-400/50 text-xs font-mono text-zinc-200 hover:text-white transition-all duration-300 group"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-zinc-400 group-hover:text-cyan-400 transition-colors" />
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>

                  {/* Direct Email */}
                  <a
                    href="mailto:harshdhiman332@gmail.com"
                    onMouseEnter={playHoverSound}
                    className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-amber-400/15 hover:bg-amber-400 border border-amber-400/40 hover:border-amber-400 text-xs font-mono font-semibold text-amber-300 hover:text-black transition-all duration-300 shadow-sm group"
                  >
                    <Mail className="w-3.5 h-3.5 text-amber-400 group-hover:text-black transition-colors" />
                    <span>harshdhiman332@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
