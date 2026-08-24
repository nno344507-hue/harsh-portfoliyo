import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  toggleSound: () => void;
  playClickSound: () => void;
  playHoverSound: () => void;
  getFrequencyData: () => Uint8Array | null;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const ambientOscRef = useRef<OscillatorNode | null>(null);
  const ambientGainRef = useRef<GainNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.04, ctx.currentTime);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, ctx.currentTime);

      gain.connect(filter);
      filter.connect(analyser);
      analyser.connect(ctx.destination);

      audioCtxRef.current = ctx;
      analyserRef.current = analyser;
      ambientGainRef.current = gain;
      filterRef.current = filter;
    }
  };

  const startAmbient = () => {
    if (!audioCtxRef.current || !ambientGainRef.current) return;
    try {
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      // Create warm harmonic drone
      const osc = audioCtxRef.current.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(55, audioCtxRef.current.currentTime); // A1 note

      const osc2 = audioCtxRef.current.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(110.5, audioCtxRef.current.currentTime); // A2 + beat frequency

      const subGain = audioCtxRef.current.createGain();
      subGain.gain.setValueAtTime(0.5, audioCtxRef.current.currentTime);

      osc.connect(ambientGainRef.current);
      osc2.connect(subGain);
      subGain.connect(ambientGainRef.current);

      osc.start();
      osc2.start();
      ambientOscRef.current = osc;
    } catch {
      // Audio autoplay policy catch
    }
  };

  const stopAmbient = () => {
    if (ambientOscRef.current) {
      try {
        ambientOscRef.current.stop();
        ambientOscRef.current.disconnect();
      } catch {
        // already stopped
      }
      ambientOscRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
      audioCtxRef.current.suspend();
    }
  };

  const toggleSound = () => {
    initAudio();
    if (isPlaying) {
      stopAmbient();
      setIsPlaying(false);
    } else {
      startAmbient();
      setIsPlaying(true);
      playClickSound();
    }
  };

  const playClickSound = useCallback(() => {
    if (!isPlaying || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // ignore audio glitch
    }
  }, [isPlaying]);

  const playHoverSound = useCallback(() => {
    if (!isPlaying || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // ignore
    }
  }, [isPlaying]);

  const getFrequencyData = useCallback((): Uint8Array | null => {
    if (!analyserRef.current) return null;
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyserRef.current.getByteFrequencyData(dataArray);
    return dataArray;
  }, []);

  useEffect(() => {
    return () => {
      stopAmbient();
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <AudioContext.Provider value={{ isPlaying, toggleSound, playClickSound, playHoverSound, getFrequencyData }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
