import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';
import { SplineScene } from '../ui/splite';
import { Spotlight } from '../ui/spotlight';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MenuOverlay: React.FC<MenuOverlayProps> = ({ isOpen, onClose }) => {
  const { playHoverSound, playClickSound } = useAudio();

  const navLinks = [
    { name: 'Home', target: 'hero' },
    { name: 'About us', target: 'about' },
    { name: 'Projects', target: 'projects' },
    { name: 'Showreel', target: 'reel' },
    { name: 'Labs', target: 'labs' },
    { name: 'Contact', target: 'contact' },
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-50 bg-[#050507]/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-12 md:p-16 pt-20 sm:pt-24 overflow-y-auto select-none"
        >
          {/* Main Side-by-Side Grid Content */}
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto relative z-10">
            {/* Left Nav Links Column */}
            <div className="lg:col-span-5 flex flex-col space-y-3 sm:space-y-6">
              {navLinks.map((link, idx) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + idx * 0.04, duration: 0.35 }}
                  onClick={() => handleNavClick(link.target)}
                  onMouseEnter={playHoverSound}
                  className="group flex items-center justify-between text-left text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-white/75 hover:text-white transition-all duration-300 py-1"
                >
                  <span className="relative overflow-hidden inline-block">
                    <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full">
                      {link.name}
                    </span>
                    <span className="absolute top-0 left-0 inline-block transition-transform duration-500 translate-y-full group-hover:translate-y-0 text-amber-400">
                      {link.name}
                    </span>
                  </span>
                  <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 ml-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-amber-400" />
                </motion.button>
              ))}
            </div>

            {/* Right Side: 3D Robot directly beside the text */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="lg:col-span-7 relative w-full h-[380px] sm:h-[480px] lg:h-[600px] flex items-center justify-center pointer-events-auto"
            >
              <Spotlight
                className="-top-20 left-10 md:left-24"
                fill="white"
              />
              <SplineScene 
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </motion.div>
          </div>

          {/* Bottom Footer Info */}
          <div className="max-w-7xl mx-auto w-full pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/40 gap-4 relative z-10">
            <div>© {new Date().getFullYear()} Harsh Portfolio. All rights reserved.</div>
            <div className="flex space-x-6">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Twitter / X</a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="mailto:harshdhiman332@gmail.com" className="hover:text-amber-400 transition-colors">harshdhiman332@gmail.com</a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
