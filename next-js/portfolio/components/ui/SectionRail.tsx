"use client";

import React from "react";
import { PAGES, type Page } from "@/hooks/useNav";

const LABELS: Record<Page, string> = {
  home: "Home",
  about: "About",
  experience: "Experience",
  skills: "Skills",
  projects: "Projects",
  contact: "Contact",
};

// Desktop-only dot rail: shows where you are on the page and jumps to any section
export function SectionRail({
  current,
  onNavigate,
}: {
  current: string;
  onNavigate: (page: Page) => void;
}) {
  return (
    <nav
      aria-label="Page sections"
      className="hidden xl:flex fixed right-3 top-1/2 -translate-y-1/2 z-40 flex-col gap-1 p-1.5 rounded-full bg-slate-950/75 border border-white/10 backdrop-blur-md shadow-xl"
    >
      {PAGES.map((page) => {
        const isActive = current === page;
        return (
          <button
            key={page}
            onClick={() => onNavigate(page)}
            aria-label={`Go to ${LABELS[page]}`}
            aria-current={isActive ? "true" : undefined}
            className="group relative w-5 h-5 flex items-center justify-center cursor-pointer"
          >
            <span
              className={`rounded-full transition-all ${
                isActive ? "w-2.5 h-2.5 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" : "w-1.5 h-1.5 bg-slate-500 group-hover:bg-white"
              }`}
            />
            <span className="pointer-events-none absolute right-full mr-3 px-2 py-1 rounded-md bg-slate-950 border border-white/10 text-[11px] font-mono font-bold text-slate-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              {LABELS[page]}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
