import { useState, useEffect, useCallback } from "react";
import { Theme } from "../types";

export default function useToast(theme: Theme) {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!message) return;
    const id = setTimeout(() => setMessage(null), 1600);
    return () => clearTimeout(id);
  }, [message]);

  const toast = useCallback((msg: string) => setMessage(msg), []);

  const ToastNode = useCallback(() =>
    message ? (
      <div
        aria-live="polite"
        style={{
          position: "fixed",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          background: theme === 'ps3' ? "rgba(228,240,255,0.97)" : "#071028",
          padding: "10px 14px",
          borderRadius: 8,
          boxShadow: theme === 'ps3'
            ? "0 6px 30px rgba(0,80,200,0.25)"
            : "0 6px 30px rgba(0,0,0,0.6)",
          zIndex: 9999,
          fontFamily: "Inter, system-ui",
          fontSize: 12,
          color: theme === 'ps3' ? "#0c1e42" : "white",
          border: theme === 'ps3' ? "1px solid rgba(0,80,200,0.2)" : "none",
        }}
      >
        {message}
      </div>
    ) : null, [message, theme]);

  return { toast, ToastNode };
}
