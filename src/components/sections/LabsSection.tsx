import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Film } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

export const LabsSection: React.FC = () => {
  const { playHoverSound, playClickSound } = useAudio();

  const suites = [
    {
      id: 'suite-davinci',
      title: 'DaVinci Resolve Studio',
      desc: 'Master-grade cinematic color grading, custom LUT design, HDR dynamic mastering, Fusion VFX node setups, and precision timeline pacing.',
      tag: 'COLOR GRADING & FINISHING',
      accent: '#f43f5e',
      badgeBg: 'from-rose-500/20 to-amber-500/20',
      badgeBorder: 'border-rose-500/40',
      icon: (
        // DaVinci Resolve 3-Petal Color Wheel Icon
        <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
          <circle cx="16" cy="11" r="5" fill="#f43f5e" />
          <circle cx="11.5" cy="19" r="5" fill="#38bdf8" />
          <circle cx="20.5" cy="19" r="5" fill="#fbbf24" />
        </svg>
      ),
      pillText: 'DaVinci 19 Pro',
    },
    {
      id: 'suite-premiere',
      title: 'Adobe Premiere Pro',
      desc: 'Rhythm-driven narrative cuts, seamless multi-cam sync, dynamic audio pacing, sound design ducking, and rapid high-fidelity sequence assembly.',
      tag: 'NLE & NARRATIVE PACING',
      accent: '#818cf8',
      badgeBg: 'from-indigo-500/20 to-violet-500/20',
      badgeBorder: 'border-indigo-500/40',
      icon: (
        // Adobe Premiere Pro "Pr" Badge
        <div className="w-7 h-7 rounded-lg bg-[#00005b] border border-[#9999ff]/50 flex items-center justify-center font-bold text-xs tracking-tighter text-[#9999ff]">
          Pr
        </div>
      ),
      pillText: 'Premiere 2026',
    },
    {
      id: 'suite-aftereffects',
      title: 'Adobe After Effects',
      desc: 'Fluid kinetic typography, 3D camera projection mapping, bespoke visual effects compositing, procedural particle simulations, and dynamic transitions.',
      tag: 'MOTION GRAPHICS & VFX',
      accent: '#c084fc',
      badgeBg: 'from-purple-500/20 to-pink-500/20',
      badgeBorder: 'border-purple-500/40',
      icon: (
        // Adobe After Effects "Ae" Badge
        <div className="w-7 h-7 rounded-lg bg-[#00003c] border border-[#d291ff]/50 flex items-center justify-center font-bold text-xs tracking-tighter text-[#d291ff]">
          Ae
        </div>
      ),
      pillText: 'After Effects Pro',
    },
  ];

  return (
    <section id="labs" className="relative py-20 sm:py-28 px-4 sm:px-12 md:px-16 z-10">
      <div className="max-w-6xl mx-auto w-full">
        {/* Post Production Arsenal Header Card */}
        <div className="p-8 sm:p-14 rounded-3xl bg-[#111116]/95 border border-amber-500/30 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-2xl backdrop-blur-2xl">
          <div className="flex items-start space-x-6">
            {/* Editor Film Slate Avatar Icon */}
            <div className="w-16 h-16 rounded-3xl bg-amber-400/20 border border-amber-400/50 flex-shrink-0 flex items-center justify-center text-amber-300 shadow-lg">
              <Film className="w-8 h-8" />
            </div>

            <div>
              <div className="flex items-center space-x-3 mb-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-amber-400 text-black font-bold">
                  Editing Arsenal
                </span>
                <span className="text-xs font-mono text-zinc-400 font-medium">Industry Standard</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2 drop-shadow-md">
                Post-Production & Motion Suite
              </h3>
              <p className="text-base text-zinc-200 max-w-xl font-normal">
                Crafting visual rhythm, cinematic color grading, and hyper-fluid motion design with industry-leading post-production software.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playClickSound();
              document.getElementById('reel')?.scrollIntoView({ behavior: 'smooth' });
            }}
            onMouseEnter={playHoverSound}
            className="flex-shrink-0 inline-flex items-center space-x-2 px-7 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs uppercase tracking-widest transition-all shadow-xl group"
          >
            <span>Watch Showreel</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* 3 Dedicated Software Columns: DaVinci, Premiere Pro, After Effects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {suites.map((suite, idx) => (
            <motion.div
              key={suite.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onMouseEnter={playHoverSound}
              className="p-8 rounded-3xl bg-[#0f0f13]/95 border border-white/15 hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between group shadow-xl backdrop-blur-xl"
            >
              <div>
                {/* Top Badge & Software Tag */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${suite.badgeBg} border ${suite.badgeBorder} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}
                  >
                    {suite.icon}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-300 font-bold bg-white/5 border border-white/10 px-2.5 py-1 rounded-md">
                    {suite.tag}
                  </span>
                </div>

                <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                  {suite.title}
                </h4>
                <p className="text-sm text-zinc-300 leading-relaxed font-normal">{suite.desc}</p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
                <span className="font-semibold text-zinc-300">{suite.pillText}</span>
                <span className="text-amber-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  Mastered ↗
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
