"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Check } from "lucide-react";

export type ThemeId =
  | "midnight"
  | "emerald"
  | "light"
  | "noir"
  | "cyberpunk"
  | "amber"
  | "nordic"
  | "synthwave";

export interface ThemeOption {
  id: ThemeId;
  name: string;
  badgeColor: string;
  bgHex: string;
}

export const themeOptions: ThemeOption[] = [
  { id: "midnight", name: "Midnight Slate", badgeColor: "bg-sky-400", bgHex: "#06080f" },
  { id: "emerald", name: "Emerald Tech", badgeColor: "bg-emerald-400", bgHex: "#080d0a" },
  { id: "light", name: "Studio Light", badgeColor: "bg-blue-600", bgHex: "#f8fafc" },
  { id: "noir", name: "Executive Noir", badgeColor: "bg-zinc-200", bgHex: "#09090b" },
  { id: "cyberpunk", name: "Tokyo Cyberpunk", badgeColor: "bg-purple-500", bgHex: "#0b0e14" },
  { id: "amber", name: "Amber Sunset", badgeColor: "bg-amber-400", bgHex: "#0f0c08" },
  { id: "nordic", name: "Nordic Polar", badgeColor: "bg-cyan-400", bgHex: "#0b1320" },
  { id: "synthwave", name: "Synthwave 80s", badgeColor: "bg-pink-500", bgHex: "#12091f" },
];

export const ThemeSwitcher: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<ThemeId>("midnight");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("portfolio_theme") as ThemeId;
    if (saved && themeOptions.some((t) => t.id === saved)) {
      setCurrentTheme(saved);
      if (saved === "midnight") {
        document.documentElement.removeAttribute("data-theme");
      } else {
        document.documentElement.setAttribute("data-theme", saved);
      }
    }
  }, []);

  const changeTheme = (theme: ThemeId) => {
    setCurrentTheme(theme);
    setIsOpen(false);
    localStorage.setItem("portfolio_theme", theme);
    if (theme === "midnight") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
  };

  const activeOption = themeOptions.find((t) => t.id === currentTheme) || themeOptions[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[var(--surface-2)] text-[var(--text)] border border-[var(--border)] hover:border-sky-400/50 transition-all shadow-sm active:scale-95"
        title="Change Portfolio Theme"
        aria-label="Change Portfolio Theme"
      >
        <Palette className="w-3.5 h-3.5 text-sky-400" />
        <span className="hidden md:inline font-sans">{activeOption.name}</span>
        <span className={`w-2 h-2 rounded-full ${activeOption.badgeColor}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-52 max-h-[340px] overflow-y-auto rounded-xl bg-[var(--surface-1)] border border-[var(--border-strong)] p-1.5 shadow-2xl z-[1000] backdrop-blur-2xl"
          >
            <div className="px-2 py-1 mb-1 border-b border-[var(--border)] text-[10px] font-bold text-[var(--muted)] uppercase tracking-wider">
              Select Theme (8 Presets)
            </div>
            {themeOptions.map((t) => (
              <button
                key={t.id}
                onClick={() => changeTheme(t.id)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  currentTheme === t.id
                    ? "bg-[var(--surface-2)] text-white border border-sky-500/30"
                    : "text-[var(--text)] hover:bg-[var(--surface-2)]/60"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${t.badgeColor}`} />
                  <span>{t.name}</span>
                </div>
                {currentTheme === t.id && <Check className="w-3.5 h-3.5 text-sky-400" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
