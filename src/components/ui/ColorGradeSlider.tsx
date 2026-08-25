import React, { useState, useRef, useCallback } from 'react';
import { Sliders } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

export const ColorGradeSlider: React.FC = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { playHoverSound, playClickSound } = useAudio();

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPos(percent);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging || e.buttons === 1) {
      handleMove(e.clientX);
    }
  };

  return (
    <div className="w-full my-12 p-6 sm:p-10 rounded-3xl bg-black/60 border border-white/15 backdrop-blur-2xl shadow-2xl">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4 mb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-amber-400 font-bold mb-1.5">
            <Sliders className="w-4 h-4" />
            <span>Interactive Tool // DaVinci Resolve Color Suite</span>
          </div>
          <h4 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Raw Camera LOG vs. Master Cinematic Grade
          </h4>
        </div>
        <div className="flex items-center space-x-2 text-xs font-mono text-zinc-400 bg-white/5 border border-white/10 px-4 py-2 rounded-full self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>DRAG SLIDER TO COMPARE</span>
        </div>
      </div>

      {/* Interactive Drag Comparison Canvas */}
      <div
        ref={containerRef}
        onMouseDown={() => {
          setIsDragging(true);
          playClickSound();
        }}
        onMouseUp={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseEnter={playHoverSound}
        className="relative h-[340px] sm:h-[460px] w-full rounded-2xl overflow-hidden cursor-ew-resize select-none border border-white/20 shadow-2xl group"
      >
        {/* Right Side: Graded Film Output (Full Viewport) */}
        <div className="absolute inset-0 w-full h-full bg-zinc-950 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1800&q=80"
            alt="Master Cinematic Grade"
            className="w-full h-full object-cover filter contrast-125 saturate-125 brightness-105"
          />
          {/* Graded Film Grain & Halation Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-cyan-500/10 pointer-events-none" />
          {/* Label Badge */}
          <div className="absolute bottom-5 right-5 z-10 px-4 py-1.5 rounded-full bg-amber-400/90 text-black font-mono font-black text-xs uppercase tracking-wider shadow-lg">
            ✓ DAVINCI MASTER GRADE (KODAK 2383)
          </div>
        </div>

        {/* Left Side: Raw Flat LOG (Clipped by slider position) */}
        <div
          className="absolute inset-0 h-full overflow-hidden bg-zinc-900 border-r-2 border-white"
          style={{ width: `${sliderPos}%` }}
        >
          <img
            src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1800&q=80"
            alt="Raw Flat LOG"
            className="absolute top-0 left-0 h-full object-cover filter grayscale-[40%] contrast-75 brightness-110"
            style={{ width: containerRef.current ? containerRef.current.clientWidth : '100%' }}
          />
          {/* Flat LOG Label Badge */}
          <div className="absolute bottom-5 left-5 z-10 px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-zinc-300 font-mono font-bold text-xs uppercase tracking-wider shadow-lg">
            RAW 10-BIT FLAT LOG
          </div>
        </div>

        {/* Draggable Divider Handle Line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white z-20 pointer-events-none flex items-center justify-center shadow-[0_0_15px_#ffffff]"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="w-10 h-10 -ml-5 rounded-full bg-amber-400 text-black border-2 border-white flex items-center justify-center shadow-2xl">
            <Sliders className="w-4 h-4 rotate-90" />
          </div>
        </div>
      </div>

      {/* Footer Specs of the Grade */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10 text-xs font-mono">
        <div>
          <span className="text-zinc-500 block">COLOR SPACE:</span>
          <span className="text-white font-bold">DaVinci Wide Gamut / Rec.709</span>
        </div>
        <div>
          <span className="text-zinc-500 block">DYNAMIC RANGE:</span>
          <span className="text-emerald-400 font-bold">14.5+ Stops Preserved</span>
        </div>
        <div>
          <span className="text-zinc-500 block">SKIN TONES:</span>
          <span className="text-amber-400 font-bold">Spectral Vector Calibrated</span>
        </div>
        <div>
          <span className="text-zinc-500 block">FILM GRAIN:</span>
          <span className="text-cyan-400 font-bold">35mm Organic 500T Stock</span>
        </div>
      </div>
    </div>
  );
};
