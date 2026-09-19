"use client";
import { useEffect, useRef } from "react";

export default function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let ticking = false;
    const fn = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (ref.current) {
            ref.current.style.setProperty("--mx", (e.clientX / innerWidth * 100) + "%");
            ref.current.style.setProperty("--my", (e.clientY / innerHeight * 100) + "%");
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("mousemove", fn, { passive: true });
    return () => window.removeEventListener("mousemove", fn);
  }, []);
  return (
    <div ref={ref} className="fixed inset-0 z-0 pointer-events-none opacity-45 will-change-transform"
      style={{background:"radial-gradient(circle at var(--mx,50%) var(--my,50%), var(--ag) 0%, transparent 52%)"}} />
  );
}
