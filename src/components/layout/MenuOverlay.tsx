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

          {/* Bottom Luxury Cyber-Aurora Plasma Dock (Master-Level Studio Polish) */}
          <div className="max-w-7xl mx-auto w-full pt-4 relative z-20 pointer-events-auto">
            {/* Outer Container with Ambient Glow & Precision Border */}
            <div className="relative rounded-2xl sm:rounded-full border border-cyan-400/40 shadow-[0_0_35px_rgba(6,182,212,0.25),inset_0_1px_2px_rgba(255,255,255,0.2)] overflow-hidden">
              
              {/* Multi-Layered Fluid Cyber-Aurora Neon Plasma Background Layer */}
              <div className="absolute inset-0 bg-[#020d12] z-0 pointer-events-none overflow-hidden">
                {/* Harmonic Atmospheric Aurora Nodes */}
                <motion.div 
                  animate={{ 
                    x: [-30, 40, -30],
                    y: [-8, 8, -8],
                    scale: [1, 1.2, 1],
                    opacity: [0.35, 0.6, 0.35]
                  }}
                  transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
                  className="absolute top-0 left-1/6 w-80 h-32 bg-cyan-400/25 blur-3xl rounded-full" 
                />
                <motion.div 
                  animate={{ 
                    x: [40, -40, 40],
                    y: [6, -6, 6],
                    scale: [1.15, 0.95, 1.15],
                    opacity: [0.3, 0.55, 0.3]
                  }}
                  transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                  className="absolute bottom-0 right-1/4 w-96 h-36 bg-teal-400/25 blur-3xl rounded-full" 
                />
                <motion.div 
                  animate={{ 
                    opacity: [0.25, 0.5, 0.25],
                    scale: [0.95, 1.15, 0.95]
                  }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                  className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/30 via-transparent to-transparent" 
                />

                {/* Fluid Harmonic Organic SVG Laser Waves */}
                <svg
                  className="absolute inset-0 w-[130%] -left-[15%] h-full opacity-90"
                  preserveAspectRatio="none"
                  viewBox="0 0 1300 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="auroraGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00f5d4" stopOpacity="0.1" />
                      <stop offset="20%" stopColor="#00e5ff" stopOpacity="0.9" />
                      <stop offset="50%" stopColor="#38bdf8" stopOpacity="1" />
                      <stop offset="80%" stopColor="#00ffff" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#00f5d4" stopOpacity="0.1" />
                    </linearGradient>
                    <linearGradient id="auroraGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.15" />
                      <stop offset="30%" stopColor="#00ffff" stopOpacity="0.95" />
                      <stop offset="70%" stopColor="#06b6d4" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#00e5ff" stopOpacity="0.1" />
                    </linearGradient>
                    <filter id="auroraGlow" x="-20%" y="-50%" width="140%" height="200%">
                      <feGaussianBlur stdDeviation="3" result="blur1" />
                      <feGaussianBlur stdDeviation="6" result="blur2" />
                      <feMerge>
                        <feMergeNode in="blur2" />
                        <feMergeNode in="blur1" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Primary Flowing Sine Ribbon */}
                  <motion.path
                    animate={{
                      x: [-40, 30, -40],
                      y: [-3, 4, -3],
                    }}
                    transition={{ repeat: Infinity, duration: 6.5, ease: "easeInOut" }}
                    d="M-50,55 C120,-10 280,115 480,25 C680,-35 820,105 1020,35 C1150,-5 1250,85 1350,45"
                    stroke="url(#auroraGrad1)"
                    strokeWidth="3.5"
                    filter="url(#auroraGlow)"
                  />

                  {/* Counter-Harmonic Cyan Ribbon */}
                  <motion.path
                    animate={{
                      x: [35, -45, 35],
                      y: [4, -4, 4],
                    }}
                    transition={{ repeat: Infinity, duration: 7.5, ease: "easeInOut" }}
                    d="M-50,25 C160,95 320,-25 520,65 C720,125 860,-5 1020,75 C1180,120 1280,-15 1350,65"
                    stroke="url(#auroraGrad2)"
                    strokeWidth="3"
                    filter="url(#auroraGlow)"
                  />

                  {/* Deep Ambient Caustics Curve */}
                  <motion.path
                    animate={{
                      x: [-25, 25, -25],
                    }}
                    transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
                    d="M-50,80 C180,15 360,90 600,20 C800,-5 920,85 1150,25 C1250,75 1300,35 1350,55"
                    stroke="#00ffff"
                    strokeOpacity="0.5"
                    strokeWidth="1.8"
                    filter="url(#auroraGlow)"
                  />

                  {/* Diamond-White Core Laser Beam */}
                  <motion.path
                    animate={{
                      x: [-30, 40, -30],
                    }}
                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                    d="M-50,42 C180,8 350,80 550,40 C750,12 880,70 1020,28 C1200,65 1280,18 1350,42"
                    stroke="#ffffff"
                    strokeOpacity="0.9"
                    strokeWidth="1"
                  />
                </svg>

                {/* Shimmer Light Pulse traversing across the dock */}
                <motion.div
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut",
                    repeatDelay: 0.8
                  }}
                  className="absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent blur-md pointer-events-none"
                />

                {/* Subtle Contrast Shield Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#020d12]/75 via-[#020d12]/40 to-[#020d12]/75 backdrop-blur-[1px]" />
              </div>

              {/* Inner Surface Content */}
              <div className="relative z-10 w-full px-6 sm:px-8 py-3 sm:py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Left Copyright with Live Cyber Pulse */}
                <div className="text-xs sm:text-sm font-mono text-cyan-50 flex items-center space-x-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_12px_#00ffff] animate-pulse" />
                  <span className="font-semibold tracking-wide">
                    © {new Date().getFullYear()} Harsh Portfolio. <span className="text-cyan-400/80 hidden sm:inline">// ALL RIGHTS RESERVED</span>
                  </span>
                </div>

                {/* Right Social & Contact Capsule Badges */}
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                  {/* Twitter / X */}
                  <motion.a
                    whileHover={{ y: -2, scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={playHoverSound}
                    className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-black/55 hover:bg-cyan-400 border border-cyan-400/35 hover:border-cyan-300 text-xs font-mono font-bold text-cyan-100 hover:text-black transition-all duration-300 shadow-md shadow-black/40 group"
                  >
                    <span>Twitter / X</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-cyan-300 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </motion.a>

                  {/* Instagram */}
                  <motion.a
                    whileHover={{ y: -2, scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={playHoverSound}
                    className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-black/55 hover:bg-cyan-400 border border-cyan-400/35 hover:border-cyan-300 text-xs font-mono font-bold text-cyan-100 hover:text-black transition-all duration-300 shadow-md shadow-black/40 group"
                  >
                    <Instagram className="w-3.5 h-3.5 text-cyan-300 group-hover:text-black transition-colors" />
                    <span>Instagram</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-cyan-300 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </motion.a>

                  {/* LinkedIn */}
                  <motion.a
                    whileHover={{ y: -2, scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={playHoverSound}
                    className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-black/55 hover:bg-cyan-400 border border-cyan-400/35 hover:border-cyan-300 text-xs font-mono font-bold text-cyan-100 hover:text-black transition-all duration-300 shadow-md shadow-black/40 group"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-cyan-300 group-hover:text-black transition-colors" />
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-cyan-300 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </motion.a>

                  {/* Direct Email with Luminous Cyan Badge */}
                  <motion.a
                    whileHover={{ y: -2, scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    href="mailto:harshdhiman332@gmail.com"
                    onMouseEnter={playHoverSound}
                    className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyan-400/25 hover:bg-cyan-400 border border-cyan-300/60 hover:border-cyan-200 text-xs font-mono font-bold text-cyan-100 hover:text-black transition-all duration-300 shadow-[0_0_16px_rgba(0,255,255,0.3)] group"
                  >
                    <Mail className="w-3.5 h-3.5 text-cyan-300 group-hover:text-black transition-colors" />
                    <span>harshdhiman332@gmail.com</span>
                  </motion.a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
