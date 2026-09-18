"use client";

import React from "react";
import { Terminal, Sparkles, Command } from "lucide-react";
import { Page } from "@/hooks/useNav";

interface TopNavHeaderProps {
  current: Page;
  goTo: (p: Page) => void;
  onOpenCmdPalette: () => void;
}

const NAV_ITEMS: { id: Page; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "playlab", label: "PlayLab" },
  { id: "contact", label: "Contact" },
];

export function TopNavHeader({ current, goTo, onOpenCmdPalette }: TopNavHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-[900] bg-[var(--surface-1)]/90 border-b border-[var(--border)] backdrop-blur-xl px-4 sm:px-8 py-3 flex items-center justify-between">
      {/* Brand Logo */}
      <button
        onClick={() => goTo("home")}
        className="flex items-center gap-2 font-display font-extrabold text-lg sm:text-xl text-[var(--text)] tracking-tight cursor-pointer"
      >
        <span className="text-[var(--accent)] font-mono">&gt;</span>
        <span>CHOCKA<span className="text-[var(--accent)]">.dev</span></span>
      </button>

      {/* Nav Links */}
      <nav className="hidden md:flex items-center gap-1.5 font-mono text-xs font-bold">
        {NAV_ITEMS.map((item) => {
          const isActive = current === item.id;
          return (
            <button
              key={item.id}
              onClick={() => goTo(item.id)}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                isActive
                  ? "bg-[var(--accent)] text-slate-950 font-bold shadow-sm"
                  : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Status Badge & Cmd+K */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenCmdPalette}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-xs font-mono text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--text)] transition-all cursor-pointer"
        >
          <Command className="w-3.5 h-3.5 text-[var(--accent)]" />
          <span>Cmd+K</span>
        </button>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="hidden sm:inline">AVAILABLE</span>
        </div>
      </div>
    </header>
  );
}
