import React from 'react';
import { ArrowRight, Film } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

export const AboutSection: React.FC = () => {
  const { playHoverSound, playClickSound } = useAudio();

  return (
    <section id="about" className="relative py-24 sm:py-32 px-4 sm:px-12 md:px-16 z-10 select-none">
      <div className="max-w-6xl mx-auto w-full">
        {/* Clean Luxury Editorial Manifesto */}
        <div className="p-8 sm:p-16 rounded-[2.5rem] bg-[#0c0a12]/80 border border-white/15 backdrop-blur-2xl shadow-2xl space-y-8">
          <div className="flex items-center space-x-2.5 text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
            <Film className="w-4 h-4" />
            <span>EDITORIAL PHILOSOPHY // RHYTHM & VISION</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.18] max-w-5xl drop-shadow-md">
            Editing isn't just cutting footage—it is shaping <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 font-extrabold drop-shadow-[0_2px_16px_rgba(245,158,11,0.4)]">human emotion</span>, designing <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-400 font-extrabold drop-shadow-[0_2px_16px_rgba(6,182,212,0.4)]">visual pacing</span>, and making every second <span className="text-white font-extrabold underline decoration-amber-400/50 decoration-wavy">unforgettable</span>.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 border-t border-white/10 text-zinc-300 text-base sm:text-lg leading-relaxed">
            <p className="md:col-span-6 font-normal">
              Specializing in high-octane commercials, viral vertical content, and cinematic music videos. Every frame is graded for rich atmospheric tonality and synced to custom Foley sound design.
            </p>
            <div className="md:col-span-6 flex flex-col justify-between space-y-6">
              <p className="font-normal text-zinc-400">
                Operating on DaVinci Resolve Studio, Adobe Premiere Pro, and After Effects with industry-standard calibrated color pipelines and rapid turnaround times.
              </p>
              <div>
                <button
                  onClick={() => {
                    playClickSound();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  onMouseEnter={playHoverSound}
                  className="inline-flex items-center space-x-2.5 px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95 group"
                >
                  <span>Start a Collaboration</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

