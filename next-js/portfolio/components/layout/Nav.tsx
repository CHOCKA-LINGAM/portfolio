"use client";

import { motion } from "framer-motion";
import { PAGES, type Page } from "@/hooks/useNav";

interface NavProps {
  current: Page;
  goTo: (page: Page) => void;
}

export default function Nav({ current, goTo }: NavProps) {
  const num = String(PAGES.indexOf(current) + 1).padStart(2, "0");

  const label = (p: Page) => {
    switch (p) {
      case "home": return "Home";
      case "experience": return "Experience";
      case "skills": return "Skills";
      case "projects": return "Projects";
      case "contact": return "Contact";
    }
  };

  return (
    <>
      {/* ── UNIFIED NAV FLOATING PILL (Visible & Accessible Across ALL Screen Sizes: Mobile, Tablet, Laptop, Desktop, 4K TV) ── */}
      <nav
        className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-[999]
                   flex items-center gap-2 sm:gap-3 lg:gap-4
                   px-2.5 sm:px-3.5 py-1.5 rounded-full
                   shadow-[0_20px_48px_-12px_rgba(0,0,0,.75)]
                   transition-all duration-300 max-w-[94vw] sm:max-w-none"
        style={{
          background: "rgba(4,5,10,.94)",
          border: "1px solid rgba(255,255,255,.1)",
          backdropFilter: "blur(28px)",
        }}
      >
        {/* Nav Link Buttons */}
        <div className="relative flex items-center gap-0.5 sm:gap-1" role="tablist" aria-label="Navigation Tabs">
          {PAGES.map((p) => (
            <button
              key={p}
              data-p={p}
              onClick={() => goTo(p)}
              id={`tab-${p}-pill`}
              role="tab"
              aria-selected={current === p}
              aria-controls="portfolio-main-panel"
              className={`relative text-[11px] sm:text-xs font-bold px-2.5 sm:px-3.5 py-1.5 rounded-full lowercase tracking-[.4px] transition-colors duration-200 z-10 whitespace-nowrap ${
                current === p ? "text-white font-black" : "text-[var(--muted)] hover:text-white"
              }`}
            >
              {current === p && (
                <motion.div
                  layoutId="unified-nav-pill"
                  className="absolute inset-0 rounded-full z-[-1]"
                  style={{
                    background: "rgba(143,178,255,.14)",
                    border: "1px solid rgba(143,178,255,.25)",
                    boxShadow: "0 0 12px rgba(143,178,255,0.2)",
                  }}
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              {label(p)}
            </button>
          ))}
        </div>

        {/* Status Indicator & Page Counter */}
        <div className="flex items-center gap-2 sm:gap-2.5 pl-2 sm:pl-3 border-l border-white/[.1]">
          <span
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-[3px] rounded-full text-[9px] font-extrabold tracking-[.8px] text-[var(--green)] whitespace-nowrap"
            style={{ background: "rgba(74,222,128,.1)", border: "1px solid rgba(74,222,128,.25)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] animate-pulse-ring flex-shrink-0" />
            OPEN TO WORK
          </span>
          <span className="font-mono text-[10px] sm:text-[11px] font-bold text-[var(--accent)] tabular-nums whitespace-nowrap">
            {num}/{String(PAGES.length).padStart(2, "0")}
          </span>
        </div>
      </nav>
    </>
  );
}
