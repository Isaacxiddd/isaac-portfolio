import React, { useRef, useEffect } from "react";

export default function Starfield() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let w = canvas.width = window.innerWidth * devicePixelRatio;
    let h = canvas.height = window.innerHeight * devicePixelRatio;
    const stars = Array.from({length: 120}, ()=>({
      x: Math.random()*w, y: Math.random()*h, z: Math.random()*1.5 + 0.2
    }));
    let raf = 0;
    function loop(){
      ctx.clearRect(0,0,w,h);
      for (const s of stars){
        const x = s.x, y = s.y, r = s.z;
        ctx.fillStyle = `rgba(14,165,255,${0.03 + r*0.3})`;
        ctx.fillRect(x, y, r*1.6, r*1.6);
        s.x -= (0.15 * r * devicePixelRatio);
        if (s.x < 0) { s.x = w; s.y = Math.random()*h; }
      }
      raf = requestAnimationFrame(loop);
    }
    loop();
    const onResize = () => { w = canvas.width = window.innerWidth * devicePixelRatio; h = canvas.height = window.innerHeight * devicePixelRatio; };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={ref} className="fixed inset-0 pointer-events-none -z-10" />;
}
