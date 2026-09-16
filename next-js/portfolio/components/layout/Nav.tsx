"use client";

import { motion } from "framer-motion";
import { PAGES, type Page } from "@/hooks/useNav";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";

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
      {/* ── UNIFIED NAV FLOATING PILL (Visible & Accessible Across ALL Screen Sizes) ── */}
      <nav
        className="fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 z-[999]
                   flex items-center gap-2 sm:gap-3 lg:gap-4
                   px-3 sm:px-4 py-1.5 rounded-full
                   shadow-[0_20px_48px_-12px_rgba(0,0,0,.75)]
                   transition-all duration-300 max-w-[96vw] sm:max-w-none"
        style={{
          background: "var(--surface-1)",
          border: "1px solid var(--border-strong)",
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
              className={`relative text-xs sm:text-sm font-semibold px-2.5 sm:px-4 py-1.5 rounded-full capitalize tracking-wide transition-colors duration-200 z-10 whitespace-nowrap ${
                current === p ? "text-[var(--text)] font-bold" : "text-[var(--muted)] hover:text-[var(--text)]"
              }`}
            >
              {current === p && (
                <motion.div
                  layoutId="unified-nav-pill"
                  className="absolute inset-0 rounded-full z-[-1]"
                  style={{
                    background: "var(--ag)",
                    border: "1px solid var(--border-strong)",
                    boxShadow: "0 0 16px var(--ag)",
                  }}
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              {label(p)}
            </button>
          ))}
        </div>

        {/* Theme Switcher & Status Indicator */}
        <div className="flex items-center gap-2 sm:gap-2.5 pl-2 sm:pl-3 border-l border-[var(--border)]">
          <ThemeSwitcher />
          
          <span className="font-mono text-xs font-bold text-[var(--accent)] tabular-nums whitespace-nowrap hidden sm:inline">
            {num}/{String(PAGES.length).padStart(2, "0")}
          </span>
        </div>
      </nav>
    </>
  );
}
