import React, { useEffect, useRef } from 'react';
import { useAudio } from '../../context/AudioContext';

export const SoundVisualizer: React.FC = () => {
  const { isPlaying, toggleSound, getFrequencyData } = useAudio();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barCount = 4;
      const barWidth = 2;
      const gap = 3;
      const startX = (canvas.width - (barCount * barWidth + (barCount - 1) * gap)) / 2;

      const freqData = isPlaying ? getFrequencyData() : null;

      for (let i = 0; i < barCount; i++) {
        let height = 4;
        if (isPlaying) {
          if (freqData && freqData.length > i * 4) {
            height = 4 + (freqData[i * 4] / 255) * 14;
          } else {
            // Organic pseudo wave if analyser data is building
            height = 4 + Math.sin(Date.now() * 0.01 + i * 1.5) * 6 + 4;
          }
        }

        const x = startX + i * (barWidth + gap);
        const y = (canvas.height - height) / 2;

        ctx.fillStyle = isPlaying ? '#ffffff' : 'rgba(255, 255, 255, 0.4)';
        ctx.fillRect(x, y, barWidth, height);
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isPlaying, getFrequencyData]);

  return (
    <button
      onClick={toggleSound}
      aria-label="Toggle Sound"
      className="relative group flex items-center justify-center w-9 h-9 rounded-full border border-white/15 bg-white/5 backdrop-blur-md hover:border-white/40 hover:bg-white/10 transition-all duration-300 active:scale-95"
      title={isPlaying ? "Mute Audio" : "Play Interactive Audio"}
    >
      <canvas ref={canvasRef} width={24} height={20} className="pointer-events-none" />
      <span className="sr-only">{isPlaying ? 'Sound On' : 'Sound Off'}</span>
    </button>
  );
};
