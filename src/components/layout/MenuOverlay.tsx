import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Send, Sparkles } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MenuOverlay: React.FC<MenuOverlayProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
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

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    playClickSound();
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-50 bg-[#080808]/98 backdrop-blur-2xl flex flex-col justify-start sm:justify-between p-5 sm:p-10 md:p-14 pt-20 sm:pt-24 overflow-y-auto"
        >
          {/* Main Grid Content */}
          <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
            {/* Nav Links Column */}
            <div className="lg:col-span-7 flex flex-col space-y-2.5 sm:space-y-5">
              {navLinks.map((link, idx) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + idx * 0.04, duration: 0.35 }}
                  onClick={() => handleNavClick(link.target)}
                  onMouseEnter={playHoverSound}
                  className="group flex items-center justify-between text-left text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white/80 hover:text-white transition-all duration-300 py-1"
                >
                  <span className="relative overflow-hidden inline-block">
                    <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full">
                      {link.name}
                    </span>
                    <span className="absolute top-0 left-0 inline-block transition-transform duration-500 translate-y-full group-hover:translate-y-0 text-amber-400">
                      {link.name}
                    </span>
                  </span>
                  <ArrowRight className="w-5 h-5 sm:w-7 sm:h-7 opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-amber-400" />
                </motion.button>
              ))}
            </div>

            {/* Right Column: Labs & Newsletter */}
            <div className="lg:col-span-5 flex flex-col space-y-6 pt-4 lg:pt-0">
              {/* Lusion Labs Portal Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                onClick={() => handleNavClick('labs')}
                onMouseEnter={playHoverSound}
                className="group relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-amber-400/40 transition-all duration-500 cursor-pointer overflow-hidden shadow-xl"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Sparkles className="w-24 h-24 text-amber-400" />
                </div>
                <div className="flex items-center space-x-4 mb-4">
                  {/* Lucy Character Icon */}
                  <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 28 38">
                      <path stroke="currentColor" strokeWidth="4" d="M20.128 29.65C18.584 31.217 16.532 32 13.972 32c-2.56 0-4.612-.783-6.156-2.35C6.272 28.05 5.5 26 5.5 23.5c0-2.5.772-4.533 2.316-6.1 1.544-1.6 3.596-2.4 6.156-2.4 2.56 0 4.612.8 6.156 2.4C21.71 18.967 22.5 21 22.5 23.5c0 2.5-.79 4.55-2.372 6.15Z" />
                      <circle cx="20.25" cy="4.25" r="3.25" fill="currentColor" />
                      <circle cx="7.75" cy="4.25" r="3.25" fill="currentColor" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                      Lusion Labs
                    </h4>
                    <p className="text-xs text-white/50">Experimental 3D playground & R&D</p>
                  </div>
                </div>
                <p className="text-sm text-white/70">
                  Dive into our playground of generative WebGL shaders, realtime physics simulations, and audio reactive experiments.
                </p>
              </motion.div>

              {/* Newsletter Box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.4 }}
                className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md"
              >
                <h4 className="text-lg font-bold text-white mb-2">Subscribe to our newsletter</h4>
                <p className="text-xs text-white/50 mb-4">
                  Get notified when we drop new case studies, WebGL experiments, and studio insights.
                </p>
                <form onSubmit={handleNewsletterSubmit} className="relative flex items-center">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder-white/40 focus:outline-none focus:border-amber-400 transition-colors pr-12"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="absolute right-1.5 p-2 rounded-lg bg-amber-400 text-black hover:bg-amber-300 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
                {subscribed && (
                  <p className="text-xs text-emerald-400 mt-2 font-medium">
                    ✓ Thank you for subscribing! Welcome to Lusion.
                  </p>
                )}
              </motion.div>
            </div>
          </div>

          {/* Bottom Footer Info */}
          <div className="max-w-6xl mx-auto w-full pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/40 gap-4">
            <div>© {new Date().getFullYear()} Lusion Ltd. All rights reserved.</div>
            <div className="flex space-x-6">
              <a href="https://twitter.com/lusionltd" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Twitter / X</a>
              <a href="https://instagram.com/lusionltd" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram</a>
              <a href="https://linkedin.com/company/lusion" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="mailto:harshdhiman332@gmail.com" className="hover:text-amber-400 transition-colors">harshdhiman332@gmail.com</a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
