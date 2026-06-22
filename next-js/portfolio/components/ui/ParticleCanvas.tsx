"use client";
import { useEffect, useRef } from "react";

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.innerWidth < 768
    ) {
      return;
    }
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const mouse = { x: null as number | null, y: null as number | null, r: 150 };
    let particles: { x:number;y:number;vx:number;vy:number;s:number }[] = [];
    let raf: number;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    }

    function init() {
      const n = Math.min(90, Math.floor(canvas.width * canvas.height / 14000));
      particles = Array.from({ length: n }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - .5) * .18,
        vy: (Math.random() - .5) * .18,
        s: Math.random() * 1.5 + .7,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        if (mouse.x !== null) {
          const dx = p.x - mouse.x!, dy = p.y - mouse.y!, d = Math.hypot(dx, dy);
          if (d < mouse.r && d > 0) { const f = (mouse.r - d) / mouse.r; p.x += dx/d*f*.7; p.y += dy/d*f*.7; }
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(143,178,255,0.5)";
        ctx.shadowBlur = 7; ctx.shadowColor = "rgba(143,178,255,.18)";
        ctx.fill(); ctx.shadowBlur = 0;
      });
      for (let a = 0; a < particles.length; a++) for (let b = a+1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x, dy = particles[a].y - particles[b].y, d2 = dx*dx + dy*dy;
        if (d2 < 18000) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(143,178,255,${(1-d2/18000)*.055})`;
          ctx.lineWidth = .7;
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
      raf = requestAnimationFrame(draw);
    }

    const onMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onOut = () => { mouse.x = null; mouse.y = null; };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onOut);
    resize();
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseout", onOut); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none hidden md:block"
    />
  );
}
