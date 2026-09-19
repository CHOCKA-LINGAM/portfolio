"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export const ScrollEnhancer: React.FC = () => {
  const progressBarRef = React.useRef<HTMLDivElement>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            const currentProgress = (window.scrollY / totalHeight) * 100;
            const progress = Math.min(100, Math.max(0, currentProgress));
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${progress}%`;
            }
          }
          setShowBackToTop(window.scrollY > 240);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* ── TOP SCROLL PROGRESS BAR ── */}
      <div className="fixed top-0 left-0 right-0 h-1 z-[1000] bg-slate-950/40 pointer-events-none">
        <div
          ref={progressBarRef}
          className="h-full bg-gradient-to-r from-sky-400 via-emerald-400 to-indigo-400 shadow-[0_0_10px_rgba(56,189,248,0.5)] transition-all duration-75 ease-out"
          style={{ width: "0%" }}
        />
      </div>

      {/* ── FLOATING BACK TO TOP BUTTON ── */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-[900] flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[var(--surface-1)]/90 backdrop-blur-xl border border-[var(--border-strong)] text-sky-400 text-xs font-semibold shadow-2xl hover:border-sky-400/50 hover:bg-[var(--surface-2)] transition-all cursor-pointer group"
            aria-label="Scroll to top"
            title="Scroll back to top"
          >
            <ArrowUp className="w-4 h-4 text-sky-400 group-hover:-translate-y-0.5 transition-transform" />
            <span className="hidden sm:inline text-[var(--text)]">Top</span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};
