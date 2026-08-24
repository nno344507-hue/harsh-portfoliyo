import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

export const HeroSection: React.FC = () => {
  const { playHoverSound, playClickSound } = useAudio();

  const handleScrollDown = () => {
    playClickSound();
    const reelEl = document.getElementById('reel');
    if (reelEl) {
      reelEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-between pt-32 pb-12 px-6 sm:px-12 md:px-16 z-10 select-none">
      {/* Decorative Technical Crosshairs on 4 corners */}
      <div className="absolute top-28 left-6 sm:left-12 pointer-events-none opacity-60">
        <div className="tech-cross" />
      </div>
      <div className="absolute top-28 right-6 sm:right-12 pointer-events-none opacity-60">
        <div className="tech-cross" />
      </div>
      <div className="absolute bottom-16 left-6 sm:left-12 pointer-events-none opacity-60">
        <div className="tech-cross" />
      </div>
      <div className="absolute bottom-16 right-6 sm:right-12 pointer-events-none opacity-60">
        <div className="tech-cross" />
      </div>

      {/* Top subtle badge */}
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full border border-white/20 bg-black/60 backdrop-blur-xl text-xs font-mono tracking-widest uppercase text-zinc-200 mb-8 shadow-lg shadow-black/40"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>THE HARSH EDITOR // 3D & MOTION DESIGN</span>
        </motion.div>
      </div>

      {/* Main Big Statement Headline with high contrast drop shadows */}
      <div className="max-w-6xl mx-auto w-full my-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[4.8rem] font-bold tracking-tighter leading-[1.12] text-white max-w-5xl drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] space-y-1"
        >
          <span className="block">I cut the story.</span>
          <span className="block">I shape the rhythm.</span>
          <span className="block">I design the <span className="text-amber-400 font-extrabold drop-shadow-[0_2px_16px_rgba(245,158,11,0.4)]">motion</span>.</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 font-extrabold">You remember the experience.</span>
        </motion.h1>
      </div>

      {/* Bottom Row: Studio Status & Scroll to Explore */}
      <div className="max-w-6xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-end justify-between pt-12 border-t border-white/15 gap-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center space-x-6 text-xs text-zinc-300 font-mono drop-shadow-md"
        >
          <div>
            <span className="text-zinc-400 block text-[10px] uppercase font-semibold">Based in</span>
            <span className="text-white font-medium">India // Remote Worldwide</span>
          </div>
          <div className="h-6 w-[1px] bg-white/20" />
          <div>
            <span className="text-zinc-400 block text-[10px] uppercase font-semibold">Disciplines</span>
            <span className="text-white font-medium">Video Editing / Reels / AI Videos / Sound</span>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          onClick={handleScrollDown}
          onMouseEnter={playHoverSound}
          className="group flex items-center space-x-3 px-5 py-2.5 rounded-full bg-black/60 border border-white/20 backdrop-blur-xl hover:border-amber-400/60 transition-all text-xs font-mono uppercase tracking-widest text-zinc-200 hover:text-white shadow-lg"
        >
          <span>scroll to explore</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-amber-400 group-hover:translate-y-0.5 transition-transform" />
        </motion.button>
      </div>
    </section>
  );
};
