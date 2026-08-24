import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GlitchOverlayProps {
  active: boolean;
  onComplete?: () => void;
}

export const GlitchOverlay: React.FC<GlitchOverlayProps> = ({ active, onComplete }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (active) {
      setShow(true);

      const timer = setTimeout(() => {
        setShow(false);
        if (onComplete) onComplete();
      }, 650);

      return () => clearTimeout(timer);
    }
  }, [active, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 0.8, 1, 0.4, 0] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, times: [0, 0.2, 0.5, 0.8, 1] }}
          className="fixed inset-0 z-[150] pointer-events-none overflow-hidden"
        >
          {/* Cyber Scanline Slices */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.6)_50%)] bg-[length:100%_4px] z-10" />

          {/* RGB Split Slice 1 (Cyan shift) */}
          <motion.div
            animate={{
              x: [-15, 12, -8, 6, 0],
              y: [4, -4, 2, -2, 0],
              skewX: [-6, 6, -3, 3, 0],
            }}
            transition={{ duration: 0.5, repeat: 1 }}
            className="absolute inset-0 bg-cyan-500/20 mix-blend-screen"
          />

          {/* RGB Split Slice 2 (Magenta/Amber shift) */}
          <motion.div
            animate={{
              x: [15, -12, 8, -6, 0],
              y: [-4, 4, -2, 2, 0],
              skewX: [6, -6, 3, -3, 0],
            }}
            transition={{ duration: 0.5, repeat: 1 }}
            className="absolute inset-0 bg-amber-500/25 mix-blend-screen"
          />

          {/* Sliced Screen Glitch Bars */}
          <div className="absolute top-[20%] left-0 right-0 h-12 bg-white/10 backdrop-invert -skew-x-12 animate-pulse" />
          <div className="absolute top-[65%] left-0 right-0 h-8 bg-cyan-400/20 backdrop-invert skew-x-12 animate-pulse" />
          <div className="absolute top-[45%] left-0 right-0 h-16 bg-amber-400/15 backdrop-invert skew-x-6 animate-pulse" />

          {/* High-tech HUD Signal Locking Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-sm uppercase tracking-[0.35em] text-white bg-black/80 px-6 py-2 border border-amber-400 shadow-[0_0_20px_#f59e0b] animate-ping">
              SYSTEM ONLINE // HARSH PORTFOLIO
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
