import { createContext, useContext, useRef, useState, useCallback } from "react";

const WeddingAudioContext = createContext(null);

export function WeddingAudioProvider({ src, loop = true, children }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return Promise.resolve();
    return audio
      .play()
      .then(() => setIsPlaying(true))
      .catch((err) => console.warn("Audio playback failed:", err));
  }, []);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    isPlaying ? pause() : play();
  }, [isPlaying, play, pause]);

  const handleTimeUpdate = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    setProgress(audio.currentTime / audio.duration);
  }, []);

  return (
    <WeddingAudioContext.Provider value={{ isPlaying, progress, play, pause, toggle }}>
      <audio
        ref={audioRef}
        src={src}
        loop={loop}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => { setIsPlaying(false); setProgress(0); }}
      />
      {children}
    </WeddingAudioContext.Provider>
  );
}

export function useWeddingAudio() {
  const ctx = useContext(WeddingAudioContext);
  if (!ctx) throw new Error("useWeddingAudio must be used within a WeddingAudioProvider");
  return ctx;
}