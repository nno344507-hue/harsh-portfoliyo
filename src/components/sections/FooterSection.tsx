import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight, Copy, Check, ArrowUp, Sparkles, Send, MapPin, Mail, Globe, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAudio } from '../../context/AudioContext';

export const FooterSection: React.FC = () => {
  const [timeStr, setTimeStr] = useState('');
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { playHoverSound, playClickSound } = useAudio();

  const ctaRef = useRef<HTMLDivElement | null>(null);

  // Mouse spotlight coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 20, stiffness: 200 });
  const smoothMouseY = useSpring(mouseY, { damping: 20, stiffness: 200 });

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Europe/London',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      const formatted = new Intl.DateTimeFormat('en-GB', options).format(new Date());
      setTimeStr(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ctaRef.current) return;
    const rect = ctaRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleCopyPhone = () => {
    playClickSound();
    navigator.clipboard.writeText('+91 9084772597');
    setCopied(true);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#f59e0b', '#38bdf8', '#ffffff', '#ec4899'],
    });
    setTimeout(() => setCopied(false), 3000);
  };

  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative pt-28 pb-14 px-6 sm:px-12 md:px-16 border-t border-white/15 z-10 bg-transparent overflow-hidden">
      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Massive Interactive Spotlight "Let's Talk" Card with 3D Liquid Canvas shining through */}
        <motion.div
          ref={ctaRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => {
            setIsHovered(true);
            playHoverSound();
          }}
          onMouseLeave={() => setIsHovered(false)}
          className="relative mb-20 p-8 sm:p-16 rounded-[2.5rem] bg-[#0d0d14]/75 backdrop-blur-md border border-white/20 overflow-hidden shadow-2xl group hover:border-amber-400/60 transition-all duration-500"
        >
          {/* Dynamic Follow-Mouse Radial Aura Spotlight */}
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(600px circle at ${smoothMouseX.get()}px ${smoothMouseY.get()}px, rgba(245, 158, 11, 0.18), rgba(56, 189, 248, 0.1), transparent 70%)`,
            }}
          />

          {/* Floating Subtle Ambient Grid Crosshairs */}
          <div className="absolute top-6 right-6 pointer-events-none opacity-50">
            <div className="tech-cross" />
          </div>
          <div className="absolute bottom-6 left-6 pointer-events-none opacity-50">
            <div className="tech-cross" />
          </div>

          {/* Top Pill Tag */}
          <div className="flex items-center space-x-2.5 mb-6">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
              Have a project in mind?
            </span>
          </div>

          {/* Giant Magnetic Typography & Interactive Arrow */}
          <a
            href="mailto:harshdhiman332@gmail.com"
            onClick={playClickSound}
            data-cursor-text="CONTACT"
            className="group/cta relative inline-flex items-center space-x-4 sm:space-x-10 text-5xl sm:text-7xl md:text-8xl lg:text-[7.8rem] font-bold tracking-tighter text-white hover:text-amber-400 transition-colors duration-300 leading-none py-2"
          >
            <span className="relative z-10 drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
              Let's talk
            </span>

            {/* Glowing Magnetic Arrow Icon Orb */}
            <motion.div
              animate={{
                scale: isHovered ? 1.15 : 1,
                rotate: isHovered ? 45 : 0,
              }}
              transition={{ type: 'spring', damping: 15, stiffness: 250 }}
              className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-xl flex items-center justify-center text-white group-hover/cta:bg-amber-400 group-hover/cta:text-black group-hover/cta:border-amber-400 shadow-2xl transition-colors duration-300"
            >
              <ArrowUpRight className="w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12" />
            </motion.div>
          </a>

          {/* Quick Action Buttons Row */}
          <div className="mt-10 pt-8 border-t border-white/15 flex flex-wrap items-center gap-4">
            <button
              onClick={handleCopyPhone}
              onMouseEnter={playHoverSound}
              className="inline-flex items-center space-x-2.5 px-5 py-3 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-all active:scale-95 shadow-lg group/copy hover:border-amber-400/50"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400 animate-bounce" />
                  <span className="text-emerald-400 font-bold">Number Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-amber-400 group-hover/copy:scale-110 transition-transform" />
                  <span className="font-semibold">Copy: +91 9084772597</span>
                </>
              )}
            </button>

            <a
              href="mailto:harshdhiman332@gmail.com"
              onClick={playClickSound}
              onMouseEnter={playHoverSound}
              className="inline-flex items-center space-x-2 px-5 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Direct Email</span>
            </a>

            <div className="hidden sm:flex items-center space-x-2 text-xs font-mono text-zinc-300 ml-auto">
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
              <span>Direct Hotline: Available 24/7</span>
            </div>
          </div>
        </motion.div>

        {/* 4 Interactive Glowing Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-8 border-t border-white/15 text-xs font-mono">
          {/* Card 1: London Studio Time */}
          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            onMouseEnter={playHoverSound}
            className="p-6 rounded-3xl bg-[#0f0f14]/85 border border-white/15 hover:border-emerald-400/50 backdrop-blur-xl shadow-xl transition-colors duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-zinc-400 uppercase font-semibold">Studio Time</span>
                <Clock className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="flex items-center space-x-2.5 text-lg text-white font-bold mb-1">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_12px_#34d399]" />
                <span>{timeStr || '00:00:00'} GMT</span>
              </div>
              <p className="text-[11px] text-zinc-400">London & Bristol, UK</p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 text-[10px] text-emerald-400 font-semibold uppercase">
              • Studio Open for Booking
            </div>
          </motion.div>

          {/* Card 2: Headquarters */}
          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            onMouseEnter={playHoverSound}
            className="p-6 rounded-3xl bg-[#0f0f14]/85 border border-white/15 hover:border-cyan-400/50 backdrop-blur-xl shadow-xl transition-colors duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-zinc-400 uppercase font-semibold">Headquarters</span>
                <MapPin className="w-4 h-4 text-cyan-400" />
              </div>
              <p className="text-sm text-zinc-200 leading-relaxed font-semibold">
                Studio 4, Paintworks<br />
                Bath Road, Bristol<br />
                BS4 3EH, UK
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 text-[10px] text-cyan-400 font-semibold uppercase">
              Global Remote Available
            </div>
          </motion.div>

          {/* Card 3: Inquiries */}
          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            onMouseEnter={playHoverSound}
            className="p-6 rounded-3xl bg-[#0f0f14]/85 border border-white/15 hover:border-amber-400/50 backdrop-blur-xl shadow-xl transition-colors duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-zinc-400 uppercase font-semibold">Inquiries</span>
                <Mail className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-sm text-zinc-200 font-semibold leading-relaxed">
                +91 9084772597<br />
                harshdhiman332@gmail.com<br />
                Direct Editorial Inquiries
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 text-[10px] text-amber-400 font-semibold uppercase">
              New Projects Welcome
            </div>
          </motion.div>

          {/* Card 4: Social Channels */}
          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            onMouseEnter={playHoverSound}
            className="p-6 rounded-3xl bg-[#0f0f14]/85 border border-white/15 hover:border-rose-400/50 backdrop-blur-xl shadow-xl transition-colors duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-zinc-400 uppercase font-semibold">Social Channels</span>
                <Globe className="w-4 h-4 text-rose-400" />
              </div>
              <div className="flex flex-col space-y-2 text-sm text-zinc-200 font-semibold">
                <a href="https://twitter.com/lusionltd" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors flex items-center justify-between">
                  <span>X (Twitter)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </a>
                <a href="https://instagram.com/lusionltd" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors flex items-center justify-between">
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </a>
                <a href="https://linkedin.com/company/lusion" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors flex items-center justify-between">
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </a>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 text-[10px] text-rose-400 font-semibold uppercase">
              Follow Our Journey
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar & Scroll to Top */}
        <div className="pt-8 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-4">
          <p>© {new Date().getFullYear()} The Harsh Editor. Crafting the immersive web.</p>

          <button
            onClick={scrollToTop}
            onMouseEnter={playHoverSound}
            className="flex items-center space-x-2 hover:text-white transition-colors text-zinc-300 font-semibold px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-white/30"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </div>
    </footer>
  );
};
