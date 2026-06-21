"use client";
import { useEffect, useRef } from "react";

export default function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      ref.current?.style.setProperty("--mx", (e.clientX / innerWidth * 100) + "%");
      ref.current?.style.setProperty("--my", (e.clientY / innerHeight * 100) + "%");
    };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);
  return (
    <div ref={ref} className="fixed inset-0 z-0 pointer-events-none opacity-45"
      style={{background:"radial-gradient(circle at var(--mx,50%) var(--my,50%), var(--ag) 0%, transparent 52%)"}} />
  );
}
