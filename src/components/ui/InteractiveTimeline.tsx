import React, { useState, useEffect } from 'react';
import { Play, Pause, Scissors, Sparkles, Volume2, Film, RotateCcw } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

export const InteractiveTimeline: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playheadPos, setPlayheadPos] = useState(25);
  const [activeClip, setActiveClip] = useState<string | null>(null);
  const { playHoverSound, playClickSound } = useAudio();

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setPlayheadPos((prev) => {
          if (prev >= 98) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.5;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    playClickSound();
    setIsPlaying(!isPlaying);
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = Math.max(0, Math.min((clickX / rect.width) * 100, 100));
    setPlayheadPos(percent);
    playClickSound();
  };

  const clips = [
    { id: 'v1-1', track: 'V1', name: '01_HERO_HOOK.MOV', start: 0, width: 28, color: 'bg-amber-500/30 border-amber-400/60 text-amber-300' },
    { id: 'v1-2', track: 'V1', name: '02_SPEED_RAMP.MOV', start: 29, width: 32, color: 'bg-amber-500/30 border-amber-400/60 text-amber-300' },
    { id: 'v1-3', track: 'V1', name: '03_CLIMAX_DROP.MOV', start: 62, width: 36, color: 'bg-amber-500/30 border-amber-400/60 text-amber-300' },
    
    { id: 'v2-1', track: 'V2', name: 'TITLES_3D_MOTION.AEP', start: 10, width: 20, color: 'bg-purple-500/30 border-purple-400/60 text-purple-300' },
    { id: 'v2-2', track: 'V2', name: 'CYBER_GLITCH_VFX', start: 58, width: 22, color: 'bg-pink-500/30 border-pink-400/60 text-pink-300' },

    { id: 'a1-1', track: 'A1', name: 'VO_STUDIO_MIC.WAV', start: 0, width: 98, color: 'bg-cyan-500/30 border-cyan-400/60 text-cyan-300' },
    { id: 'a2-1', track: 'A2', name: 'FOLEY_SWOOSH_RISER.WAV', start: 24, width: 14, color: 'bg-emerald-500/30 border-emerald-400/60 text-emerald-300' },
    { id: 'a2-2', track: 'A2', name: 'HYBRID_808_BASS_DROP.WAV', start: 60, width: 38, color: 'bg-emerald-500/30 border-emerald-400/60 text-emerald-300' },
  ];

  return (
    <div className="w-full my-12 p-6 sm:p-10 rounded-3xl bg-[#0b0a10]/95 border border-white/15 backdrop-blur-2xl shadow-2xl">
      {/* Timeline Controls & Transport Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4 mb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-amber-400 font-bold mb-1">
            <Film className="w-4 h-4" />
            <span>Interactive NLE Sequence Editor</span>
          </div>
          <h4 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Multi-Track Timeline & Beat-Sync Pacing
          </h4>
        </div>

        {/* Transport Bar Controls */}
        <div className="flex items-center space-x-3">
          <button
            onClick={togglePlay}
            onMouseEnter={playHoverSound}
            className={`inline-flex items-center space-x-2 px-5 py-2 rounded-full font-mono text-xs uppercase font-bold transition-all shadow-lg ${
              isPlaying
                ? 'bg-red-500 text-white shadow-red-500/30'
                : 'bg-amber-400 hover:bg-amber-300 text-black shadow-amber-400/30'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            <span>{isPlaying ? 'Pause Sequence' : 'Play Timeline'}</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              setPlayheadPos(0);
              setIsPlaying(false);
            }}
            onMouseEnter={playHoverSound}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all"
            title="Reset to 00:00"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <div className="hidden sm:flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{(playheadPos * 0.6).toFixed(1)}s / 60.0s</span>
          </div>
        </div>
      </div>

      {/* Multi-Track Editor Timeline Container */}
      <div className="relative rounded-2xl bg-black/80 border border-white/15 p-4 sm:p-6 overflow-hidden select-none">
        {/* Ruler Bar on top */}
        <div className="relative h-6 border-b border-white/15 flex items-center justify-between text-[10px] font-mono text-zinc-500 mb-4 px-1">
          <span>00:00</span>
          <span>00:15</span>
          <span>00:30</span>
          <span>00:45</span>
          <span>01:00</span>
        </div>

        {/* Tracks Canvas (Clickable to move playhead) */}
        <div
          onClick={handleTimelineClick}
          className="relative space-y-3 cursor-pointer py-1"
        >
          {/* Playhead Red Needle Indicator */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-30 pointer-events-none flex flex-col items-center shadow-[0_0_12px_#ef4444]"
            style={{ left: `${playheadPos}%` }}
          >
            <div className="w-3 h-3.5 bg-red-500 -mt-1 transform rotate-45 border border-white" />
          </div>

          {/* Track V2: Motion & VFX */}
          <div className="relative h-9 rounded-lg bg-white/[0.02] border border-white/5 flex items-center px-2">
            <span className="text-[10px] font-mono font-bold text-purple-400 mr-3 w-6">V2</span>
            {clips.filter(c => c.track === 'V2').map(clip => (
              <div
                key={clip.id}
                onMouseEnter={() => {
                  setActiveClip(clip.name);
                  playHoverSound();
                }}
                onMouseLeave={() => setActiveClip(null)}
                className={`absolute h-7 rounded-md border text-[10px] font-mono font-bold flex items-center px-2.5 truncate cursor-pointer transition-transform hover:scale-[1.02] shadow-md ${clip.color}`}
                style={{ left: `${clip.start}%`, width: `${clip.width}%` }}
              >
                {clip.name}
              </div>
            ))}
          </div>

          {/* Track V1: 4K Master Cuts */}
          <div className="relative h-9 rounded-lg bg-white/[0.02] border border-white/5 flex items-center px-2">
            <span className="text-[10px] font-mono font-bold text-amber-400 mr-3 w-6">V1</span>
            {clips.filter(c => c.track === 'V1').map(clip => (
              <div
                key={clip.id}
                onMouseEnter={() => {
                  setActiveClip(clip.name);
                  playHoverSound();
                }}
                onMouseLeave={() => setActiveClip(null)}
                className={`absolute h-7 rounded-md border text-[10px] font-mono font-bold flex items-center px-2.5 truncate cursor-pointer transition-transform hover:scale-[1.02] shadow-md ${clip.color}`}
                style={{ left: `${clip.start}%`, width: `${clip.width}%` }}
              >
                {clip.name}
              </div>
            ))}
          </div>

          {/* Track A1: Dialogue & Vocals */}
          <div className="relative h-9 rounded-lg bg-white/[0.02] border border-white/5 flex items-center px-2">
            <span className="text-[10px] font-mono font-bold text-cyan-400 mr-3 w-6">A1</span>
            {clips.filter(c => c.track === 'A1').map(clip => (
              <div
                key={clip.id}
                onMouseEnter={() => {
                  setActiveClip(clip.name);
                  playHoverSound();
                }}
                onMouseLeave={() => setActiveClip(null)}
                className={`absolute h-7 rounded-md border text-[10px] font-mono font-bold flex items-center px-2.5 truncate cursor-pointer transition-transform hover:scale-[1.02] shadow-md ${clip.color}`}
                style={{ left: `${clip.start}%`, width: `${clip.width}%` }}
              >
                <Volume2 className="w-3 h-3 mr-1 flex-shrink-0" />
                {clip.name}
              </div>
            ))}
          </div>

          {/* Track A2: Foley & 808 SFX */}
          <div className="relative h-9 rounded-lg bg-white/[0.02] border border-white/5 flex items-center px-2">
            <span className="text-[10px] font-mono font-bold text-emerald-400 mr-3 w-6">A2</span>
            {clips.filter(c => c.track === 'A2').map(clip => (
              <div
                key={clip.id}
                onMouseEnter={() => {
                  setActiveClip(clip.name);
                  playHoverSound();
                }}
                onMouseLeave={() => setActiveClip(null)}
                className={`absolute h-7 rounded-md border text-[10px] font-mono font-bold flex items-center px-2.5 truncate cursor-pointer transition-transform hover:scale-[1.02] shadow-md ${clip.color}`}
                style={{ left: `${clip.start}%`, width: `${clip.width}%` }}
              >
                <Sparkles className="w-3 h-3 mr-1 flex-shrink-0" />
                {clip.name}
              </div>
            ))}
          </div>
        </div>

        {/* Hovered Clip Inspection Tooltip */}
        <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between text-xs font-mono text-zinc-400">
          <div>
            <span className="text-zinc-500">SELECTED CLIP: </span>
            <span className="text-white font-bold">{activeClip || 'HOVER ON ANY CLIP TO INSPECT'}</span>
          </div>
          <div className="flex items-center space-x-2 text-[11px] text-amber-400 font-semibold">
            <Scissors className="w-3.5 h-3.5" />
            <span>FRAME-ACCURATE BEAT SLICING</span>
          </div>
        </div>
      </div>
    </div>
  );
};
