import React, { useState } from 'react';
import { Volume2, Zap, Radio, Camera, Film, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

export const SoundBoard: React.FC = () => {
  const [activePad, setActivePad] = useState<string | null>(null);

  // Synthesize instant zero-latency SFX using Web Audio API
  const playSoundEffect = (type: string) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      setActivePad(type);
      setTimeout(() => setActivePad(null), 400);

      if (type === 'whoosh') {
        // Synthesized Whoosh Sound (Filter sweep over noise)
        const bufferSize = ctx.sampleRate * 0.4;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(200, ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(3200, ctx.currentTime + 0.2);
        filter.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.4);
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.01, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.15);
        gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start();
      } else if (type === 'impact') {
        // Cinematic Sub Bass Drop / 808 Hit
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.5);
        gain.gain.setValueAtTime(0.6, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.6);

        confetti({
          particleCount: 25,
          spread: 50,
          origin: { y: 0.7 },
          colors: ['#ef4444', '#f59e0b', '#00ffff'],
        });
      } else if (type === 'glitch') {
        // Cyber Glitch Zap
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(150, ctx.currentTime + 0.05);
        osc.frequency.linearRampToValueAtTime(1200, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.18);
      } else if (type === 'shutter') {
        // Camera Shutter Snap
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.4, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === 'slate') {
        // 1kHz SMPTE Slate Sync Beep
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1000, ctx.currentTime);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === 'riser') {
        // Tension Riser build-up
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(120, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.7);
        gain.gain.setValueAtTime(0.01, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.6);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.75);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.75);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const soundPads = [
    { id: 'whoosh', name: 'Cinematic Whoosh', icon: WindIcon, color: 'hover:bg-amber-400 hover:text-black border-amber-400/40 text-amber-300' },
    { id: 'impact', name: '808 Sub Drop Hit', icon: Flame, color: 'hover:bg-red-500 hover:text-white border-red-500/40 text-red-400' },
    { id: 'glitch', name: 'Cyber Glitch Zap', icon: Zap, color: 'hover:bg-cyan-400 hover:text-black border-cyan-400/40 text-cyan-300' },
    { id: 'shutter', name: 'Camera Shutter Snap', icon: Camera, color: 'hover:bg-pink-500 hover:text-white border-pink-500/40 text-pink-300' },
    { id: 'slate', name: 'SMPTE 1kHz Slate', icon: Film, color: 'hover:bg-emerald-400 hover:text-black border-emerald-400/40 text-emerald-300' },
    { id: 'riser', name: 'Tension Riser Build', icon: Radio, color: 'hover:bg-purple-500 hover:text-white border-purple-500/40 text-purple-300' },
  ];

  return (
    <div className="w-full my-12 p-6 sm:p-10 rounded-3xl bg-[#0e0c14]/95 border border-white/15 backdrop-blur-2xl shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4 mb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-amber-400 font-bold mb-1">
            <Volume2 className="w-4 h-4" />
            <span>Interactive Editorial Foley Soundboard</span>
          </div>
          <h4 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Click to Trigger Custom Sound FX & Risers
          </h4>
        </div>
        <div className="text-xs font-mono text-zinc-400 bg-white/5 border border-white/10 px-4 py-2 rounded-full self-start sm:self-auto">
          <span>REAL-TIME WEB AUDIO SYNTHESIS</span>
        </div>
      </div>

      {/* 6 Grid Sound FX Trigger Pads */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {soundPads.map((pad) => {
          const Icon = pad.icon;
          const isActive = activePad === pad.id;
          return (
            <button
              key={pad.id}
              onClick={() => playSoundEffect(pad.id)}
              className={`relative p-5 rounded-2xl border bg-black/60 backdrop-blur-md flex flex-col items-center justify-center text-center space-y-3 transition-all duration-200 active:scale-95 shadow-lg group ${
                pad.color
              } ${isActive ? 'scale-105 ring-2 ring-white' : ''}`}
            >
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono font-bold">{pad.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

function WindIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
      <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
      <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
    </svg>
  );
}
