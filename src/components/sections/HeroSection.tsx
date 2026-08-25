import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Film } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

export const HeroSection: React.FC = () => {
  const { playHoverSound, playClickSound } = useAudio();
  const [timecode, setTimecode] = useState('00:01:24:18');

  useEffect(() => {
    let frame = 18;
    let sec = 24;
    const interval = setInterval(() => {
      frame = (frame + 1) % 60;
      if (frame === 0) sec = (sec + 1) % 60;
      const fStr = frame.toString().padStart(2, '0');
      const sStr = sec.toString().padStart(2, '0');
      setTimecode(`00:01:${sStr}:${fStr}`);
    }, 1000 / 30);
    return () => clearInterval(interval);
  }, []);

  const handleScrollDown = () => {
    playClickSound();
    const reelEl = document.getElementById('reel');
    if (reelEl) {
      reelEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-[100dvh] flex flex-col justify-between pt-24 sm:pt-32 pb-8 sm:pb-12 px-4 sm:px-12 md:px-16 z-10 select-none">
      {/* Decorative Technical Crosshairs on 4 corners */}
      <div className="absolute top-28 left-4 sm:left-12 pointer-events-none opacity-40 sm:opacity-60">
        <div className="tech-cross" />
      </div>
      <div className="absolute top-28 right-4 sm:right-12 pointer-events-none opacity-40 sm:opacity-60">
        <div className="tech-cross" />
      </div>
      <div className="absolute bottom-16 left-4 sm:left-12 pointer-events-none opacity-40 sm:opacity-60">
        <div className="tech-cross" />
      </div>
      <div className="absolute bottom-16 right-4 sm:right-12 pointer-events-none opacity-40 sm:opacity-60">
        <div className="tech-cross" />
      </div>

      {/* Top Editorial Status & Timecode HUD */}
      <div className="max-w-6xl mx-auto w-full flex flex-wrap items-center justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full border border-amber-400/30 bg-black/70 backdrop-blur-xl text-[10px] sm:text-xs font-mono tracking-wider uppercase text-amber-300 shadow-lg shadow-black/40"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
          </span>
          <span className="font-extrabold text-white">THE HARSH EDITOR</span>
          <span className="text-amber-400/80">•</span>
          <span>DIRECTOR OF MOTION & EDIT</span>
        </motion.div>

        {/* Live Running Timecode Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hidden sm:inline-flex items-center space-x-3 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md text-xs font-mono text-zinc-300"
        >
          <Film className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-zinc-500">TIMECODE:</span>
          <span className="text-emerald-400 font-bold tracking-widest">{timecode}</span>
          <span className="text-zinc-500">// 60 FPS</span>
        </motion.div>
      </div>

      {/* Main Big Statement Headline with Cinematic Typography */}
      <div className="max-w-6xl mx-auto w-full my-auto py-8 sm:py-12">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-3xl sm:text-5xl md:text-7xl lg:text-[4.6rem] font-bold tracking-tighter leading-[1.12] text-white max-w-5xl drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] space-y-1.5 sm:space-y-2"
        >
          <span className="block text-zinc-300 font-medium">I cut the noise.</span>
          <span className="block">I pace the <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 font-extrabold drop-shadow-[0_2px_20px_rgba(245,158,11,0.4)]">rhythm & emotion</span>.</span>
          <span className="block">I craft <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-400 to-emerald-400 font-extrabold drop-shadow-[0_2px_20px_rgba(6,182,212,0.4)]">cinematic impact</span>.</span>
          <span className="block text-xl sm:text-2xl md:text-3xl font-mono text-zinc-400 font-normal tracking-normal pt-2">
            Commercials • Music Videos • High-Retention Shorts • Color Grading
          </span>
        </motion.h1>
      </div>

      {/* Bottom Row: Studio Stats & Scroll CTA */}
      <div className="max-w-6xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-end justify-between pt-8 border-t border-white/15 gap-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-zinc-300 font-mono drop-shadow-md"
        >
          <div>
            <span className="text-zinc-500 block text-[10px] uppercase font-bold tracking-wider">Software Mastered</span>
            <span className="text-white font-semibold">DaVinci Resolve Studio • Premiere • After Effects</span>
          </div>
          <div className="hidden sm:block h-6 w-[1px] bg-white/20" />
          <div>
            <span className="text-zinc-500 block text-[10px] uppercase font-bold tracking-wider">Turnaround Speed</span>
            <span className="text-amber-400 font-semibold">24h - 48h Express Delivery</span>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          onClick={handleScrollDown}
          onMouseEnter={playHoverSound}
          className="group flex items-center space-x-3 px-5 py-2.5 rounded-full bg-black/70 border border-white/20 backdrop-blur-xl hover:border-amber-400/80 hover:bg-amber-400 hover:text-black transition-all text-xs font-mono uppercase tracking-widest text-zinc-200 shadow-lg active:scale-95"
        >
          <span className="font-bold">Play Showreel</span>
          <Play className="w-3.5 h-3.5 fill-current text-amber-400 group-hover:text-black transition-colors" />
        </motion.button>
      </div>
    </section>
  );
};
