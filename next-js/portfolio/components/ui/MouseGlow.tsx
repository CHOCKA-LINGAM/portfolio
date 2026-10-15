"use client";
import { useEffect, useRef } from "react";

const SIZE = 900;

// Cursor-following glow. Moves a fixed-size layer with transform (compositor only)
// instead of repainting a full-viewport gradient on every mouse move.
export default function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let frame = 0;
    let x = 0;
    let y = 0;
    const fn = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (ref.current) {
          ref.current.style.opacity = "0.45";
          ref.current.style.transform = `translate3d(${x - SIZE / 2}px, ${y - SIZE / 2}px, 0)`;
        }
      });
    };
    window.addEventListener("mousemove", fn, { passive: true });
    return () => {
      window.removeEventListener("mousemove", fn);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed top-0 left-0 z-0 pointer-events-none opacity-0 transition-opacity duration-500 will-change-transform"
      style={{
        width: SIZE,
        height: SIZE,
        background: "radial-gradient(circle closest-side, var(--ag), transparent)",
      }}
    />
  );
}
