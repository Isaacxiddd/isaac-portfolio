import { useState, useCallback, useEffect } from "react";
import NavigationManager from "../lib/NavigationManager";

export default function useNavigation() {
  const [navigationManager] = useState(() => new NavigationManager());
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActive = useCallback((newIndex: number) => {
    const updatedIndex = navigationManager.setIndex(newIndex);
    setActiveIndex(updatedIndex);
  }, [navigationManager]);

  const handleNext = useCallback(() => {
    const newIndex = navigationManager.next();
    setActiveIndex(newIndex);
  }, [navigationManager]);

  const handlePrevious = useCallback(() => {
    const newIndex = navigationManager.previous();
    setActiveIndex(newIndex);
  }, [navigationManager]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (navigationManager.handleKeyboardNavigation(e.key)) {
        e.preventDefault();
        setActiveIndex(navigationManager.getCurrentIndex());
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigationManager]);

  useEffect(() => {
    let touchStartX: number | null = null;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartX === null) return;
      
      const deltaX = e.changedTouches[0].clientX - touchStartX;
      const threshold = 60;

      if (Math.abs(deltaX) > threshold) {
        if (deltaX < 0) {
          handleNext();
        } else {
          handlePrevious();
        }
      }
      
      touchStartX = null;
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleNext, handlePrevious]);

  return {
    activeIndex,
    setActive: updateActive,
    next: handleNext,
    previous: handlePrevious
  };
}
