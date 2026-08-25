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

          {/* Bottom Dock with Cyan Electric Neon Plasma Wave Interior (Matching User Reference Image) */}
          <div className="max-w-7xl mx-auto w-full pt-4 relative z-20 pointer-events-auto">
            {/* Outer Container with Cyan Neon Glow & Border */}
            <div className="relative rounded-2xl sm:rounded-full border border-cyan-400/50 shadow-[0_0_35px_rgba(6,182,212,0.35),inset_0_0_25px_rgba(6,182,212,0.2)] overflow-hidden">
              
              {/* Electric Cyan Plasma Wave / Caustics Background Layer (Live Flowing Animation) */}
              <div className="absolute inset-0 bg-[#021319] z-0 pointer-events-none overflow-hidden">
                {/* Live Animated Ambient Radial Cyan Glow Spots */}
                <motion.div 
                  animate={{ 
                    x: [-40, 50, -40], 
                    scale: [1, 1.25, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                  className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-36 bg-cyan-400/35 blur-3xl rounded-full" 
                />
                <motion.div 
                  animate={{ 
                    x: [40, -50, 40], 
                    scale: [1.2, 0.9, 1.2],
                    opacity: [0.25, 0.5, 0.25]
                  }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-36 bg-teal-400/30 blur-3xl rounded-full" 
                />
                <motion.div 
                  animate={{ 
                    x: [-30, 40, -30],
                    opacity: [0.3, 0.65, 0.3]
                  }}
                  transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                  className="absolute top-0 right-10 w-56 h-28 bg-cyan-300/40 blur-2xl rounded-full" 
                />
                
                {/* Live Luminous Flowing Organic SVG Laser Waves */}
                <svg
                  className="absolute inset-0 w-[140%] -left-[20%] h-full opacity-90"
                  preserveAspectRatio="none"
                  viewBox="0 0 1400 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="neonCyanGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00f5d4" stopOpacity="0.1" />
                      <stop offset="25%" stopColor="#00e5ff" stopOpacity="0.95" />
                      <stop offset="50%" stopColor="#38bdf8" stopOpacity="1" />
                      <stop offset="75%" stopColor="#00ffff" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#00f5d4" stopOpacity="0.1" />
                    </linearGradient>
                    <linearGradient id="neonCyanGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2" />
                      <stop offset="35%" stopColor="#00ffff" stopOpacity="1" />
                      <stop offset="65%" stopColor="#06b6d4" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#00e5ff" stopOpacity="0.1" />
                    </linearGradient>
                    <filter id="neonGlow" x="-20%" y="-50%" width="140%" height="200%">
                      <feGaussianBlur stdDeviation="3.5" result="blur1" />
                      <feGaussianBlur stdDeviation="7" result="blur2" />
                      <feMerge>
                        <feMergeNode in="blur2" />
                        <feMergeNode in="blur1" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Live Animated Wave 1: Left-to-Right Floating Motion */}
                  <motion.path
                    animate={{
                      x: [-60, 40, -60],
                      y: [-4, 6, -4],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 6,
                      ease: "easeInOut"
                    }}
                    d="M-50,60 C150,-20 300,120 500,30 C700,-40 850,110 1050,40 C1200,-10 1350,90 1450,50"
                    stroke="url(#neonCyanGrad1)"
                    strokeWidth="4"
                    filter="url(#neonGlow)"
                  />

                  {/* Live Animated Wave 2: Opposing Counter Phase Floating Wave */}
                  <motion.path
                    animate={{
                      x: [50, -60, 50],
                      y: [6, -5, 6],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 7,
                      ease: "easeInOut"
                    }}
                    d="M-50,20 C180,100 350,-30 550,70 C750,130 880,0 1050,80 C1220,130 1350,-20 1450,70"
                    stroke="url(#neonCyanGrad2)"
                    strokeWidth="3.5"
                    filter="url(#neonGlow)"
                  />

                  {/* Live Animated Wave 3: Deep Harmonic Caustics Curve */}
                  <motion.path
                    animate={{
                      x: [-30, 30, -30],
                      y: [3, -4, 3],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 5,
                      ease: "easeInOut"
                    }}
                    d="M-50,85 C220,10 400,95 650,20 C850,-10 950,90 1200,30 C1350,80 1450,40 1450,60"
                    stroke="#00ffff"
                    strokeOpacity="0.6"
                    strokeWidth="2"
                    filter="url(#neonGlow)"
                  />

                  {/* Live Animated Wave 4: Ultra Fine Bright Core Laser Beam */}
                  <motion.path
                    animate={{
                      x: [-40, 50, -40],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 5.5,
                      ease: "easeInOut"
                    }}
                    d="M-50,45 C200,5 380,85 580,45 C780,15 900,75 1050,30 C1250,70 1350,20 1450,45"
                    stroke="#ffffff"
                    strokeOpacity="0.95"
                    strokeWidth="1.2"
                  />
                </svg>

                {/* Live Electric Light Pulse Shimmer Flare traversing continuously across the pill */}
                <motion.div
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3.5,
                    ease: "easeInOut",
                    repeatDelay: 0.5
                  }}
                  className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent blur-md pointer-events-none"
                />

                {/* Subtle dark vignette overlay to ensure text stays 100% crisp */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-black/55 backdrop-blur-[1.5px]" />
              </div>

              {/* Inner Content Surface */}
              <div className="relative z-10 w-full px-6 sm:px-8 py-3 sm:py-3.5 flex flex-col md:flex-row items-center justify-between gap-3.5">
                {/* Left Copyright */}
                <div className="text-xs sm:text-sm font-mono text-cyan-100 flex items-center space-x-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_12px_#00ffff] animate-pulse" />
                  <span className="font-semibold tracking-wide">
                    © {new Date().getFullYear()} Harsh Portfolio. All rights reserved.
                  </span>
                </div>

                {/* Right Social & Contact Links */}
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                  {/* Twitter / X */}
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={playHoverSound}
                    className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-black/65 hover:bg-cyan-400 border border-cyan-400/40 hover:border-cyan-300 text-xs font-mono font-bold text-cyan-100 hover:text-black transition-all duration-300 shadow-[0_0_12px_rgba(6,182,212,0.2)] group"
                  >
                    <span>Twitter / X</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-cyan-300 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={playHoverSound}
                    className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-black/65 hover:bg-cyan-400 border border-cyan-400/40 hover:border-cyan-300 text-xs font-mono font-bold text-cyan-100 hover:text-black transition-all duration-300 shadow-[0_0_12px_rgba(6,182,212,0.2)] group"
                  >
                    <Instagram className="w-3.5 h-3.5 text-cyan-300 group-hover:text-black transition-colors" />
                    <span>Instagram</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-cyan-300 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={playHoverSound}
                    className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-black/65 hover:bg-cyan-400 border border-cyan-400/40 hover:border-cyan-300 text-xs font-mono font-bold text-cyan-100 hover:text-black transition-all duration-300 shadow-[0_0_12px_rgba(6,182,212,0.2)] group"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-cyan-300 group-hover:text-black transition-colors" />
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-cyan-300 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>

                  {/* Direct Email */}
                  <a
                    href="mailto:harshdhiman332@gmail.com"
                    onMouseEnter={playHoverSound}
                    className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-cyan-400/25 hover:bg-cyan-400 border border-cyan-300/60 hover:border-cyan-200 text-xs font-mono font-bold text-cyan-100 hover:text-black transition-all duration-300 shadow-[0_0_16px_rgba(0,255,255,0.35)] group"
                  >
                    <Mail className="w-3.5 h-3.5 text-cyan-300 group-hover:text-black transition-colors" />
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
