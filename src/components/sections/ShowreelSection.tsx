import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, ArrowRight, Film, Smartphone, Monitor } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

export const ShowreelSection: React.FC = () => {
  const [isPlayingReel, setIsPlayingReel] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const { playHoverSound, playClickSound } = useAudio();

  const handleOpenReel = () => {
    playClickSound();
    setIsPlayingReel(true);
  };

  const handleCloseReel = () => {
    playClickSound();
    setIsPlayingReel(false);
  };

  return (
    <section id="reel" className="relative py-20 sm:py-28 px-4 sm:px-12 md:px-16 z-10">
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14 p-8 rounded-3xl bg-black/50 border border-white/15 backdrop-blur-xl shadow-2xl">
          <div className="lg:col-span-5">
            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-amber-400 font-bold mb-3">
              <Film className="w-4 h-4" />
              <span>Director's Showreel // 2026</span>
            </div>
            <h4 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight drop-shadow-lg">
              Raw Footage.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 font-extrabold drop-shadow-[0_2px_16px_rgba(245,158,11,0.4)]">
                Cinematic Art.
              </span>
            </h4>
          </div>

          <div className="lg:col-span-7 flex flex-col space-y-6">
            <p className="text-base sm:text-xl text-zinc-200 font-normal leading-relaxed drop-shadow-md">
              From high-energy commercial edits and viral short-form retention hooks to award-winning music videos and master-grade color grading. Every frame is cut with purpose, rhythm, and emotional weight.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              {/* Aspect Ratio Toggles */}
              <div className="flex items-center space-x-1 p-1 rounded-full bg-white/[0.08] border border-white/15 backdrop-blur-md">
                <button
                  onClick={() => {
                    playClickSound();
                    setAspectRatio('16:9');
                  }}
                  className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-mono transition-all ${
                    aspectRatio === '16:9'
                      ? 'bg-amber-400 text-black font-bold shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>16:9 Cinema</span>
                </button>
                <button
                  onClick={() => {
                    playClickSound();
                    setAspectRatio('9:16');
                  }}
                  className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-mono transition-all ${
                    aspectRatio === '9:16'
                      ? 'bg-amber-400 text-black font-bold shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>9:16 Viral Reels</span>
                </button>
              </div>

              <button
                onClick={() => {
                  playClickSound();
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                }}
                onMouseEnter={playHoverSound}
                className="inline-flex items-center space-x-2 px-5 py-2 rounded-full border border-white/20 bg-white/10 hover:bg-white hover:text-black transition-all text-xs uppercase tracking-wider font-semibold text-white group shadow-md"
              >
                <span>Editorial Stack</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Cinematic Video Reel Container with Technical HUD */}
        <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-black/85 shadow-2xl group">
          {/* Top HUD decoration bar */}
          <div className="flex items-center justify-between px-6 py-3.5 border-b border-white/10 bg-zinc-950/90 text-[11px] font-mono text-zinc-300 uppercase tracking-widest">
            <div className="flex items-center space-x-3">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <span className="font-bold text-white">REC // 4K PRORES 4444</span>
            </div>
            <div className="hidden sm:flex items-center space-x-4 text-zinc-400">
              <span>COLOR: REC.709 FILM LUT</span>
              <span>•</span>
              <span>AUDIO: -14 LUFS MIXED</span>
            </div>
            <div className="flex items-center space-x-2 text-amber-400 font-semibold">
              <span>FORMAT: {aspectRatio}</span>
            </div>
          </div>

          {/* Reel Interactive Canvas / Poster */}
          <div
            onClick={handleOpenReel}
            onMouseEnter={playHoverSound}
            data-cursor-text="PLAY"
            className={`relative w-full cursor-pointer flex items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-900 via-neutral-900 to-black transition-all duration-500 ${
              aspectRatio === '9:16' ? 'h-[520px] sm:h-[620px]' : 'h-[360px] sm:h-[480px] md:h-[560px]'
            }`}
          >
            {/* Background cinematic preview poster */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent z-10" />
            <img
              src={
                aspectRatio === '9:16'
                  ? 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1080&q=80'
                  : 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1800&q=80'
              }
              alt="Editorial Showreel"
              className="absolute inset-0 w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 opacity-65 filter contrast-125 brightness-95"
            />

            {/* Ambient glowing radial effect */}
            <div className="absolute w-96 h-96 rounded-full bg-amber-500/25 blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

            {/* Play Button Indicator with Pulse Ring */}
            <div className="relative z-20 flex flex-col items-center space-y-4">
              <motion.div
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.95 }}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-white/40 bg-black/70 backdrop-blur-xl flex items-center justify-center text-white group-hover:bg-amber-400 group-hover:text-black group-hover:border-amber-400 shadow-2xl transition-colors duration-300"
              >
                <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1" />
              </motion.div>
              <span className="text-xs font-mono uppercase tracking-widest text-white font-bold bg-black/70 px-5 py-2 rounded-full border border-white/20 backdrop-blur-md shadow-lg">
                Play {aspectRatio === '9:16' ? 'Viral Reel Master' : 'Cinematic Commercial Reel'} (01:30)
              </span>
            </div>
          </div>

          {/* Bottom HUD decoration bar - Audio & Timeline Tracks */}
          <div className="flex flex-wrap items-center justify-between px-6 py-3.5 border-t border-white/10 bg-zinc-950/90 text-[10px] font-mono text-zinc-400 uppercase tracking-widest gap-2">
            <div className="flex items-center space-x-3">
              <span className="text-amber-400 font-bold">V1: 4K CUT</span>
              <span>|</span>
              <span className="text-cyan-400 font-bold">A1: DIALOGUE</span>
              <span>|</span>
              <span className="text-pink-400 font-bold">A2: FOLEY SFX</span>
              <span>|</span>
              <span className="text-emerald-400 font-bold">A3: 808 BEAT</span>
            </div>
            <div className="flex items-center space-x-1.5">
              {[...Array(8)].map((_, i) => (
                <span key={i} className="inline-block w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal Player */}
      <AnimatePresence>
        {isPlayingReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
          >
            <button
              onClick={handleCloseReel}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white hover:text-black transition-all z-50"
              aria-label="Close video"
            >
              <X className="w-6 h-6" />
            </button>

            <div className={`relative w-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black ${
              aspectRatio === '9:16' ? 'max-w-md aspect-[9/16]' : 'max-w-5xl aspect-video'
            }`}>
              <iframe
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0&controls=1"
                title="Harsh Editor Showreel"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
