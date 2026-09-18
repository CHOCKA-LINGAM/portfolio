"use client";

import Link from "next/link";
import { Command, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { PAGES, type Page } from "@/hooks/useNav";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";

interface NavProps {
  current: Page;
  goTo: (page: Page) => void;
  onOpenCommandPalette?: () => void;
}

export default function Nav({ current, goTo, onOpenCommandPalette }: NavProps) {
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
              className={`relative text-xs sm:text-sm font-semibold px-2.5 sm:px-4 py-1.5 rounded-full capitalize tracking-wide transition-colors duration-200 z-10 whitespace-nowrap cursor-pointer ${
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

        {/* Theme Switcher, UI Lab Route Link & Command Palette */}
        <div className="flex items-center gap-2 sm:gap-2.5 pl-2 sm:pl-3 border-l border-[var(--border)]">
          <ThemeSwitcher />

          <Link
            href="/lab"
            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-sky-500/15 text-sky-400 hover:bg-sky-500/25 border border-sky-500/30 transition-all cursor-pointer whitespace-nowrap shadow-sm"
            title="Open Interactive UI Laboratory (/lab)"
          >
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span className="hidden md:inline font-sans">UI Lab</span>
          </Link>
          
          {onOpenCommandPalette && (
            <button
              onClick={onOpenCommandPalette}
              className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-mono font-bold bg-[var(--surface-2)] text-[var(--muted)] hover:text-[var(--text)] border border-[var(--border)] hover:border-sky-400/50 transition-all cursor-pointer"
              title="Open Command Palette (Cmd + K)"
              aria-label="Open Command Palette"
            >
              <Command className="w-3 h-3 text-sky-400" />
              <span className="hidden lg:inline text-[10px]">K</span>
            </button>
          )}

          <span className="font-mono text-xs font-bold text-[var(--accent)] tabular-nums whitespace-nowrap hidden sm:inline">
            {num}/{String(PAGES.length).padStart(2, "0")}
          </span>
        </div>
      </nav>
    </>
  );
}
