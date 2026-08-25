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

          {/* Bottom Holographic Chromatic Prism Nebula Dock (Completely Fresh & Vibrant Aesthetic) */}
          <div className="max-w-7xl mx-auto w-full pt-4 relative z-20 pointer-events-auto">
            {/* Outer Rotating Chromatic Spectrum Laser Perimeter */}
            <div className="relative rounded-2xl sm:rounded-full p-[1.5px] overflow-hidden shadow-[0_0_50px_rgba(236,72,153,0.3)]">
              {/* Rotating Prismatic Laser Beam (Violet -> Hot Pink -> Solar Amber -> Emerald) */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
                className="absolute -inset-[200%] bg-[conic-gradient(from_0deg,_transparent_0_280deg,_#8b5cf6_310deg,_#ec4899_335deg,_#f59e0b_350deg,_#10b981_360deg)] pointer-events-none"
              />

              {/* Inner Obsidian Liquid Capsule Surface */}
              <div className="relative rounded-[calc(1rem-1.5px)] sm:rounded-full overflow-hidden border border-white/15 bg-[#06040a]/90 backdrop-blur-2xl">
                {/* Chromatic Liquid Aurora Nebula Background Layer */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                  {/* Fluid Blobs: Violet / Purple */}
                  <motion.div 
                    animate={{ 
                      x: [-50, 60, -50],
                      y: [-10, 10, -10],
                      scale: [1, 1.35, 1],
                      opacity: [0.4, 0.75, 0.4]
                    }}
                    transition={{ repeat: Infinity, duration: 6.5, ease: "easeInOut" }}
                    className="absolute top-1/2 left-[5%] -translate-y-1/2 w-80 h-40 bg-violet-600/40 blur-3xl rounded-full" 
                  />

                  {/* Fluid Blobs: Hot Magenta / Fuchsia */}
                  <motion.div 
                    animate={{ 
                      x: [50, -50, 50],
                      y: [12, -12, 12],
                      scale: [1.3, 0.9, 1.3],
                      opacity: [0.35, 0.7, 0.35]
                    }}
                    transition={{ repeat: Infinity, duration: 7.5, ease: "easeInOut" }}
                    className="absolute top-1/2 left-[45%] -translate-y-1/2 w-96 h-40 bg-fuchsia-500/35 blur-3xl rounded-full" 
                  />

                  {/* Fluid Blobs: Solar Amber / Gold */}
                  <motion.div 
                    animate={{ 
                      x: [-40, 50, -40],
                      scale: [0.95, 1.25, 0.95],
                      opacity: [0.3, 0.65, 0.3]
                    }}
                    transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
                    className="absolute top-0 right-[5%] w-80 h-36 bg-amber-500/35 blur-3xl rounded-full" 
                  />

                  {/* Fluid Blobs: Emerald Cyan Sparkle */}
                  <motion.div 
                    animate={{ 
                      opacity: [0.2, 0.5, 0.2],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut" }}
                    className="absolute bottom-0 right-[30%] w-64 h-24 bg-cyan-400/25 blur-2xl rounded-full" 
                  />

                  {/* Organic Multi-Chromatic Harmonic Waves */}
                  <svg
                    className="absolute inset-0 w-[140%] -left-[20%] h-full opacity-80"
                    preserveAspectRatio="none"
                    viewBox="0 0 1400 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      {/* Violet to Hot Pink to Amber Gradient */}
                      <linearGradient id="chromaGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2" />
                        <stop offset="30%" stopColor="#ec4899" stopOpacity="0.95" />
                        <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.95" />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
                      </linearGradient>

                      {/* Cyan to Fuchsia to Gold Gradient */}
                      <linearGradient id="chromaGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2" />
                        <stop offset="40%" stopColor="#d946ef" stopOpacity="0.9" />
                        <stop offset="80%" stopColor="#fbbf24" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#ec4899" stopOpacity="0.2" />
                      </linearGradient>

                      <filter id="chromaGlow" x="-20%" y="-50%" width="140%" height="200%">
                        <feGaussianBlur stdDeviation="3.5" result="blur1" />
                        <feGaussianBlur stdDeviation="7" result="blur2" />
                        <feMerge>
                          <feMergeNode in="blur2" />
                          <feMergeNode in="blur1" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Chromatic Wave 1: Flowing Magenta/Amber Wave */}
                    <motion.path
                      animate={{
                        x: [-60, 45, -60],
                        y: [-5, 6, -5],
                      }}
                      transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                      d="M-50,60 C140,-15 300,115 500,25 C700,-35 840,105 1040,35 C1180,-10 1300,90 1450,45"
                      stroke="url(#chromaGrad1)"
                      strokeWidth="3.8"
                      filter="url(#chromaGlow)"
                    />

                    {/* Chromatic Wave 2: Cyan/Fuchsia Intersecting Curve */}
                    <motion.path
                      animate={{
                        x: [45, -55, 45],
                        y: [6, -6, 6],
                      }}
                      transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
                      d="M-50,25 C180,95 340,-25 540,65 C740,125 880,-5 1040,75 C1200,125 1320,-15 1450,65"
                      stroke="url(#chromaGrad2)"
                      strokeWidth="3.2"
                      filter="url(#chromaGlow)"
                    />

                    {/* Chromatic Wave 3: Pure White Shimmer Core Beam */}
                    <motion.path
                      animate={{
                        x: [-40, 50, -40],
                      }}
                      transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                      d="M-50,42 C180,8 360,80 560,40 C760,12 890,70 1030,28 C1230,68 1330,18 1450,42"
                      stroke="#ffffff"
                      strokeOpacity="0.85"
                      strokeWidth="1.2"
                    />
                  </svg>

                  {/* Traversing Chromatic Rainbow Shimmer Flare */}
                  <motion.div
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{
                      repeat: Infinity,
                      duration: 3.8,
                      ease: "easeInOut",
                      repeatDelay: 0.6
                    }}
                    className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-fuchsia-400/25 to-transparent blur-md pointer-events-none"
                  />

                  {/* Frosted Obsidian Glass Shade to ensure 100% crystal legibility */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#06040a]/80 via-[#06040a]/40 to-[#06040a]/80 backdrop-blur-[1px]" />
                </div>

                {/* Inner Content Surface */}
                <div className="relative z-10 w-full px-6 sm:px-8 py-3.5 sm:py-4 flex flex-col md:flex-row items-center justify-between gap-4">
                  {/* Left Status: Holographic Live Pulse */}
                  <div className="text-xs sm:text-sm font-mono text-zinc-100 flex items-center space-x-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-gradient-to-tr from-amber-400 via-pink-500 to-violet-500 shadow-[0_0_14px_#ec4899]" />
                    </span>
                    <span className="font-semibold tracking-wide">
                      © {new Date().getFullYear()} Harsh Portfolio. <span className="text-fuchsia-300/80 hidden sm:inline">// IMMERSIVE DIGITAL EXPERIENCE</span>
                    </span>
                  </div>

                  {/* Right Social & Contact Chromatic Capsules */}
                  <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                    {/* Twitter / X (Violet Glow) */}
                    <motion.a
                      whileHover={{ y: -3, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href="https://twitter.com"
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={playHoverSound}
                      className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/[0.07] hover:bg-violet-600 border border-white/15 hover:border-violet-400 text-xs font-mono font-bold text-zinc-100 hover:text-white transition-all duration-300 shadow-md shadow-black/40 hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] group"
                    >
                      <span>Twitter / X</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-violet-300 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </motion.a>

                    {/* Instagram (Hot Pink / Sunset Glow) */}
                    <motion.a
                      whileHover={{ y: -3, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href="https://instagram.com"
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={playHoverSound}
                      className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/[0.07] hover:bg-gradient-to-r hover:from-pink-500 hover:to-rose-500 border border-white/15 hover:border-pink-400 text-xs font-mono font-bold text-zinc-100 hover:text-white transition-all duration-300 shadow-md shadow-black/40 hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] group"
                    >
                      <Instagram className="w-3.5 h-3.5 text-pink-300 group-hover:text-white transition-colors" />
                      <span>Instagram</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-pink-300 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </motion.a>

                    {/* LinkedIn (Electric Cyan / Azure Glow) */}
                    <motion.a
                      whileHover={{ y: -3, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={playHoverSound}
                      className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/[0.07] hover:bg-sky-500 border border-white/15 hover:border-sky-400 text-xs font-mono font-bold text-zinc-100 hover:text-white transition-all duration-300 shadow-md shadow-black/40 hover:shadow-[0_0_20px_rgba(14,165,233,0.5)] group"
                    >
                      <Linkedin className="w-3.5 h-3.5 text-sky-300 group-hover:text-white transition-colors" />
                      <span>LinkedIn</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-sky-300 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </motion.a>

                    {/* Direct Email (Luminous Molten Gold & Fuchsia Gradient Badge) */}
                    <motion.a
                      whileHover={{ y: -3, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href="mailto:harshdhiman332@gmail.com"
                      onMouseEnter={playHoverSound}
                      className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400/20 via-pink-500/20 to-violet-500/20 hover:bg-gradient-to-r hover:from-amber-400 hover:via-pink-500 hover:to-violet-500 border border-amber-400/50 hover:border-amber-300 text-xs font-mono font-bold text-amber-200 hover:text-black transition-all duration-300 shadow-[0_0_25px_rgba(245,158,11,0.35)] group"
                    >
                      <Mail className="w-3.5 h-3.5 text-amber-300 group-hover:text-black transition-colors" />
                      <span>harshdhiman332@gmail.com</span>
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
