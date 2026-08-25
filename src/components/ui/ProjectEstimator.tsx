import React, { useState } from 'react';
import { Calculator, Send, CheckCircle2, Clock } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

export const ProjectEstimator: React.FC = () => {
  const { playHoverSound, playClickSound } = useAudio();
  const [projectType, setProjectType] = useState<'reels' | 'youtube' | 'commercial' | 'music'>('commercial');
  const [turnaround, setTurnaround] = useState<'standard' | 'rush'>('standard');
  const [includesColor, setIncludesColor] = useState(true);
  const [includesSound, setIncludesSound] = useState(true);
  const [includesVFX, setIncludesVFX] = useState(true);

  const projectPrices = {
    reels: { name: 'Viral Reels / TikToks (Pack of 5)', base: 250, time: '2-3 Days' },
    youtube: { name: 'YouTube Long-Form (10-15 Min)', base: 400, time: '3-4 Days' },
    commercial: { name: 'Commercial Promo (30s-60s 4K)', base: 650, time: '3-5 Days' },
    music: { name: 'Music Video & VFX Master', base: 850, time: '5-7 Days' },
  };

  const current = projectPrices[projectType];
  let totalEstimate = current.base;
  if (turnaround === 'rush') totalEstimate += 150;
  if (includesColor) totalEstimate += 50;
  if (includesSound) totalEstimate += 50;
  if (includesVFX) totalEstimate += 100;

  const handleBookNow = () => {
    playClickSound();
    const mailSubject = encodeURIComponent(`Editorial Project Booking: ${current.name}`);
    const mailBody = encodeURIComponent(
      `Hi Harsh,\n\nI want to book an editorial project with you:\n- Project Type: ${current.name}\n- Turnaround: ${turnaround === 'rush' ? '24-48h Rush Delivery' : 'Standard Delivery'}\n- Color Grading: ${includesColor ? 'Yes' : 'No'}\n- Sound Design & Foley: ${includesSound ? 'Yes' : 'No'}\n- Motion Graphics / VFX: ${includesVFX ? 'Yes' : 'No'}\n- Estimated Budget: ~$${totalEstimate}\n\nLet's connect and review my raw footage!`
    );
    window.location.href = `mailto:harshdhiman332@gmail.com?subject=${mailSubject}&body=${mailBody}`;
  };

  return (
    <div className="w-full my-12 p-6 sm:p-10 rounded-3xl bg-[#0e0c14]/95 border border-amber-500/30 backdrop-blur-2xl shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4 mb-8">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-amber-400 font-bold mb-1.5">
            <Calculator className="w-4 h-4" />
            <span>Instant Project Calculator // Scope of Work</span>
          </div>
          <h4 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Estimate Your Project & Reserve an Edit Slot
          </h4>
        </div>
        <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 bg-emerald-400/10 border border-emerald-400/30 px-4 py-2 rounded-full self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>INSTANT DIRECT BOOKING</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Options Picker */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Project Type */}
          <div>
            <label className="text-xs font-mono text-zinc-300 block mb-3 uppercase tracking-wider font-semibold">
              1. Select Project Type
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(['reels', 'youtube', 'commercial', 'music'] as const).map((key) => {
                const item = projectPrices[key];
                const isSelected = projectType === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      playClickSound();
                      setProjectType(key);
                    }}
                    onMouseEnter={playHoverSound}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'bg-amber-400/15 border-amber-400 text-white shadow-lg'
                        : 'bg-black/40 border-white/10 text-zinc-400 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    <span className="text-xs font-bold block mb-1">{item.name}</span>
                    <span className="text-[11px] font-mono text-amber-400 font-semibold">From ${item.base}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Turnaround Speed */}
          <div>
            <label className="text-xs font-mono text-zinc-300 block mb-3 uppercase tracking-wider font-semibold">
              2. Delivery Timeline
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setTurnaround('standard');
                }}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  turnaround === 'standard'
                    ? 'bg-amber-400/15 border-amber-400 text-white'
                    : 'bg-black/40 border-white/10 text-zinc-400'
                }`}
              >
                <span className="text-xs font-bold block mb-1">Standard Production</span>
                <span className="text-[11px] font-mono text-zinc-400">{current.time}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setTurnaround('rush');
                }}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  turnaround === 'rush'
                    ? 'bg-red-500/20 border-red-500 text-white'
                    : 'bg-black/40 border-white/10 text-zinc-400'
                }`}
              >
                <div className="flex items-center space-x-1 text-red-400 text-xs font-bold mb-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>24h-48h Express Rush</span>
                </div>
                <span className="text-[11px] font-mono text-zinc-400">+$150 Priority Cut</span>
              </button>
            </div>
          </div>

          {/* 3. Included Editorial Features */}
          <div>
            <label className="text-xs font-mono text-zinc-300 block mb-3 uppercase tracking-wider font-semibold">
              3. Creative Inclusions
            </label>
            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={() => setIncludesColor(!includesColor)}
                className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full border text-xs font-mono transition-all ${
                  includesColor ? 'bg-amber-400 text-black font-bold border-amber-400' : 'bg-black/40 border-white/10 text-zinc-400'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>DaVinci Color Grade</span>
              </button>

              <button
                type="button"
                onClick={() => setIncludesSound(!includesSound)}
                className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full border text-xs font-mono transition-all ${
                  includesSound ? 'bg-cyan-400 text-black font-bold border-cyan-400' : 'bg-black/40 border-white/10 text-zinc-400'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Custom Sound Foley & SFX</span>
              </button>

              <button
                type="button"
                onClick={() => setIncludesVFX(!includesVFX)}
                className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full border text-xs font-mono transition-all ${
                  includesVFX ? 'bg-purple-400 text-black font-bold border-purple-400' : 'bg-black/40 border-white/10 text-zinc-400'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Kinetic Titles & VFX</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Summary & Instant Booking CTA Card */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-black/80 border border-white/15 shadow-2xl flex flex-col justify-between space-y-6">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold block mb-2">
              Estimated Investment
            </span>
            <div className="flex items-baseline space-x-2 mb-4">
              <span className="text-4xl sm:text-5xl font-black text-amber-400 font-mono tracking-tight">
                ${totalEstimate}
              </span>
              <span className="text-xs font-mono text-zinc-400">USD (Estimated)</span>
            </div>

            <div className="space-y-2.5 text-xs font-mono text-zinc-300 border-t border-white/10 pt-4">
              <div className="flex justify-between">
                <span className="text-zinc-500">Service:</span>
                <span className="font-bold text-white">{current.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Timeline:</span>
                <span className="font-bold text-emerald-400">
                  {turnaround === 'rush' ? '24h - 48h Express' : current.time}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Revisions:</span>
                <span className="font-bold text-amber-400">Unlimited till 100% Satisfied</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleBookNow}
            onMouseEnter={playHoverSound}
            className="w-full py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-all shadow-xl active:scale-95 group"
          >
            <Send className="w-4 h-4" />
            <span>Book This Project with Harsh</span>
          </button>
        </div>
      </div>
    </div>
  );
};
