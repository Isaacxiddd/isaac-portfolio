import { useState, useCallback, useRef, useEffect } from "react";

export function useBocaAudio() {
  const [isActive, setIsActive] = useState(() =>
    typeof document !== 'undefined' && document.documentElement.classList.contains('boca-mode')
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isToggling = useRef(false);

  const syncFromDOM = useCallback(() => {
    const hasClass = document.documentElement.classList.contains('boca-mode');
    setIsActive(hasClass);
    if (!hasClass && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
      setIsPlaying(false);
    }
  }, []);

  const toggle = useCallback(() => {
    if (isToggling.current) return;
    isToggling.current = true;

    const willBeActive = !document.documentElement.classList.contains('boca-mode');
    document.documentElement.classList.toggle('boca-mode');

    if (willBeActive) {
      if (!audioRef.current) {
        audioRef.current = new Audio('/trompetas%20de%20la%2012.mp3');
        audioRef.current.loop = true;
      }
      audioRef.current.play().catch(() => {}).finally(() => {
        setIsActive(true);
        setIsPlaying(true);
        isToggling.current = false;
      });
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
      setIsActive(false);
      setIsPlaying(false);
      isToggling.current = false;
    }
  }, []);

  const pause = useCallback(() => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    document.documentElement.classList.remove('boca-mode');
    setIsActive(false);
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return { isActive, isPlaying, toggle, pause, stop, syncFromDOM };
}
