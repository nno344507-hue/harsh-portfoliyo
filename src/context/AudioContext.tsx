import React, { createContext, useContext, useState, useCallback } from 'react';

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

  const toggleSound = () => {
    setIsPlaying(!isPlaying);
  };

  const playClickSound = useCallback(() => {
    // Pure silence inside website as requested
  }, []);

  const playHoverSound = useCallback(() => {
    // Pure silence inside website as requested
  }, []);

  const getFrequencyData = useCallback((): Uint8Array | null => {
    return null;
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
