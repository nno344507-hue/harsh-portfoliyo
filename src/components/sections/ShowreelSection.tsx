import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, ArrowRight } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

export const ShowreelSection: React.FC = () => {
  const [isPlayingReel, setIsPlayingReel] = useState(false);
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16 p-8 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-xl">
          <div className="lg:col-span-5">
            <h4 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight drop-shadow-lg">
              Raw Footage,<br />
              <span className="text-amber-400 font-extrabold drop-shadow-[0_2px_12px_rgba(245,158,11,0.3)]">
                Brought to Life
              </span>
            </h4>
          </div>

          <div className="lg:col-span-7 flex flex-col space-y-6">
            <p className="text-base sm:text-xl text-zinc-200 font-normal leading-relaxed drop-shadow-md">
              I turn raw footage into clean, engaging, and high-retention content with seamless cuts, punchy sound effects, smooth transitions, and vibrant color correction. From YouTube videos and viral Reels to commercial promos, I edit videos that hook viewers and tell your story.
            </p>

            <div>
              <button
                onClick={() => {
                  playClickSound();
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                }}
                onMouseEnter={playHoverSound}
                className="inline-flex items-center space-x-2.5 px-5 py-2.5 rounded-full border border-white/20 bg-white/10 hover:bg-amber-400 hover:text-black hover:border-amber-400 transition-all text-xs uppercase tracking-widest font-semibold text-white group shadow-md"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 group-hover:bg-black transition-colors" />
                <span>My Editing Workflow</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Cinematic Video Reel Container with Technical HUD */}
        <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-black/80 shadow-2xl group">
          {/* Top HUD decoration bar */}
          <div className="flex items-center justify-between px-6 py-3.5 border-b border-white/10 bg-zinc-950/80 text-[11px] font-mono text-zinc-300 uppercase tracking-widest">
            <div className="flex items-center space-x-3">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <span className="font-semibold text-white">REC // 4K 60FPS</span>
            </div>
            <div className="hidden sm:flex items-center space-x-4 text-zinc-400">
              <span>LATENCY: 12MS</span>
              <span>•</span>
              <span>RENDER: WEBGL 2.0</span>
            </div>
            <div className="flex items-center space-x-2 text-zinc-300">
              <div className="tech-cross scale-75" />
              <span className="font-semibold">THE HARSH EDITOR // SHOWREEL 2026</span>
            </div>
          </div>

          {/* Reel Interactive Canvas / Poster */}
          <div
            onClick={handleOpenReel}
            onMouseEnter={playHoverSound}
            data-cursor-text="PLAY"
            className="relative h-[340px] sm:h-[480px] md:h-[560px] w-full cursor-pointer flex items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-900 via-neutral-900 to-black"
          >
            {/* Background cinematic preview poster */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10" />
            <img
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1800&q=80"
              alt="Lusion Showreel"
              className="absolute inset-0 w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 opacity-60 filter contrast-125"
            />

            {/* Ambient glowing radial effect */}
            <div className="absolute w-96 h-96 rounded-full bg-amber-500/20 blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

            {/* Play Button Indicator */}
            <div className="relative z-20 flex flex-col items-center space-y-4">
              <motion.div
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.95 }}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-white/40 bg-black/60 backdrop-blur-xl flex items-center justify-center text-white group-hover:bg-amber-400 group-hover:text-black group-hover:border-amber-400 shadow-2xl transition-colors duration-300"
              >
                <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1" />
              </motion.div>
              <span className="text-xs font-mono uppercase tracking-widest text-white font-semibold bg-black/60 px-4 py-1.5 rounded-full border border-white/20 backdrop-blur-md">
                Play Studio Reel (01:45)
              </span>
            </div>
          </div>

          {/* Bottom HUD decoration bar */}
          <div className="flex items-center justify-between px-6 py-3 border-t border-white/10 bg-zinc-950/80 text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
            <div className="flex items-center space-x-2">
              <span>AUDIO: SYNTH STEREO</span>
            </div>
            <div className="flex items-center space-x-1.5">
              {[...Array(6)].map((_, i) => (
                <span key={i} className="inline-block w-1.5 h-1.5 bg-amber-400 rounded-full" />
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
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
          >
            <button
              onClick={handleCloseReel}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white hover:text-black transition-all z-50"
              aria-label="Close video"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black">
              <iframe
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0&controls=1"
                title="Lusion Studio Showreel"
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
