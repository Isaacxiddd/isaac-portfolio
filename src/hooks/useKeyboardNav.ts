import { useEffect } from "react";

export function useKeyboardNav(len: number, active: number, setActive: (n:number)=>void) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (["ArrowDown","ArrowRight"].includes(e.key)) {
        e.preventDefault();
        setActive((active + 1) % len);
      } else if (["ArrowUp","ArrowLeft"].includes(e.key)) {
        e.preventDefault();
        setActive((active - 1 + len) % len);
      } else if (e.key === "Home") {
        setActive(0);
      } else if (e.key === "End") {
        setActive(len - 1);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [len, active, setActive]);
}
