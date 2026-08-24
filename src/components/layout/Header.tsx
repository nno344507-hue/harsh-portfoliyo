import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SoundVisualizer } from '../ui/SoundVisualizer';
import { useAudio } from '../../context/AudioContext';

interface HeaderProps {
  onOpenMenu: () => void;
  isMenuOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMenu, isMenuOpen }) => {
  const [scrolled, setScrolled] = useState(false);
  const { playHoverSound, playClickSound } = useAudio();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    playClickSound();
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40 px-3 sm:px-10 py-3 sm:py-6 transition-all duration-500">
      <div
        className={`max-w-7xl mx-auto flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? 'bg-[#0f0f13]/90 backdrop-blur-xl border border-white/20 px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-full shadow-2xl shadow-black/80'
            : 'bg-black/40 backdrop-blur-md border border-white/10 px-3.5 sm:px-5 py-2 sm:py-3 rounded-full'
        }`}
      >
        {/* THE HARSH EDITOR Brand Logo */}
        <a
          href="#"
          onMouseEnter={playHoverSound}
          onClick={playClickSound}
          className="group relative flex items-center space-x-2 text-white focus:outline-none"
          aria-label="The Harsh Editor Home"
        >
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-400 group-hover:scale-125 transition-transform shadow-[0_0_8px_#fbbf24]" />
          <span className="text-xs sm:text-base font-extrabold tracking-wider uppercase font-mono text-white group-hover:text-amber-400 transition-colors">
            THE HARSH <span className="text-amber-400 font-black">EDITOR</span>
          </span>
        </a>

        {/* Right side controls */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Sound wave visualizer button */}
          <SoundVisualizer />

          {/* Magnetic Let's Talk CTA button */}
          <button
            onClick={scrollToContact}
            onMouseEnter={playHoverSound}
            className="hidden sm:flex items-center space-x-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md hover:border-amber-400 hover:bg-amber-400 hover:text-black transition-all duration-300 text-xs tracking-wider uppercase group"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 group-hover:bg-black transition-colors animate-pulse" />
            <span className="font-semibold text-white group-hover:text-black transition-colors">Let's talk</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-white/80 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          {/* Menu button */}
          <button
            onClick={() => {
              playClickSound();
              onOpenMenu();
            }}
            onMouseEnter={playHoverSound}
            aria-label="Toggle menu"
            className="flex items-center space-x-2.5 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md hover:border-amber-400 hover:bg-white/20 transition-all duration-300 text-xs tracking-widest uppercase font-bold text-white group"
          >
            <span>{isMenuOpen ? 'Close' : 'Menu'}</span>
            <div className="flex flex-col space-y-1">
              <span
                className={`w-3.5 h-0.5 bg-white transition-transform duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-1' : ''
                }`}
              />
              <span
                className={`w-3.5 h-0.5 bg-white transition-transform duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-0.5' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
