"use client";

import React, { useState, useEffect } from "react";
import { Command, Sparkles, Moon } from "lucide-react";
import { Page } from "@/hooks/useNav";

export function MonographNavHeader({
  currentSection,
  onNavigate,
  onOpenCmdPalette,
  onTriggerEasterEgg,
}: {
  currentSection: string;
  onNavigate: (sectionId: Page) => void;
  onOpenCmdPalette: () => void;
  onTriggerEasterEgg: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "playlab", label: "PlayLab" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/85 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-2xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 flex items-center justify-between">
        {/* Monogram Logo */}
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-slate-900 border border-white/20 flex items-center justify-center font-display font-extrabold text-sm text-white group-hover:border-cyan-400 group-hover:text-cyan-300 transition-all shadow-md">
            C B
          </div>
          <span className="hidden sm:inline-block font-mono text-xs font-bold text-slate-300 group-hover:text-white tracking-widest uppercase">
            CHOCKA.dev
          </span>
        </button>

        {/* Center Nav Items */}
        <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-slate-900/80 border border-white/10 backdrop-blur-md font-mono text-xs shadow-lg">
          {navItems.map((item) => {
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id as Page)}
                className={`px-4 py-1.5 rounded-full transition-all cursor-pointer font-medium ${
                  isActive
                    ? "bg-white text-slate-950 font-bold shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right CTA / Cmd+K & Easter Egg Secret Dot */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCmdPalette}
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-white/15 text-slate-300 hover:text-white hover:border-cyan-400 font-mono text-xs transition-all cursor-pointer shadow-md"
          >
            <Command className="w-3.5 h-3.5 text-cyan-400" />
            <span>Cmd + K</span>
          </button>

          {/* Secret Easter Egg Trigger Dot matching Mockup 09 */}
          <button
            onClick={onTriggerEasterEgg}
            title="Secret Easter Egg discovery 🤫"
            className="w-8 h-8 rounded-full bg-slate-900 border border-white/15 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-400/50 transition-all cursor-pointer shadow-md group relative"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 group-hover:bg-amber-400 animate-ping absolute" />
            <span className="w-2 h-2 rounded-full bg-cyan-400 group-hover:bg-amber-400 relative" />
          </button>
        </div>
      </div>
    </header>
  );
}
