import { useRef, useEffect } from "react";

import { Theme } from "../types";

const PS3Ribbons: React.FC<{ theme: Theme }> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const ribbons = Array.from({ length: 18 }, (_, i) => ({
      baseY: (window.innerHeight / 18) * (i + 0.5),
      amplitude: 12 + Math.random() * 65,
      wavelength: 280 + Math.random() * 620,
      speed: 0.12 + Math.random() * 0.42,
      width: 0.4 + Math.random() * 2.2,
      alpha: 0.028 + Math.random() * 0.082,
      phase: Math.random() * Math.PI * 2,
    }));

    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isPS3 = theme === 'ps3';
      for (const r of ribbons) {
        ctx.beginPath();
        ctx.lineWidth = r.width;
        ctx.strokeStyle = isPS3
          ? `rgba(18, 72, 178, ${r.alpha})`
          : `rgba(14, 165, 255, ${r.alpha * 0.9})`;
        const freq = (2 * Math.PI) / r.wavelength;
        for (let x = 0; x <= canvas.width + 6; x += 4) {
          const y = r.baseY + Math.sin(x * freq + t * r.speed + r.phase) * r.amplitude;
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      t += 0.011;
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: theme === 'ps3' ? 0.85 : 0.55 }}
      aria-hidden
    />
  );
};

export default PS3Ribbons;
