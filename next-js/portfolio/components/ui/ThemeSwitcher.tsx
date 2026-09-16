"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Check, Sun, Moon } from "lucide-react";

export type ThemeId =
  | "midnight"
  | "emerald"
  | "noir"
  | "cyberpunk"
  | "amber"
  | "nordic"
  | "synthwave"
  | "light"
  | "snow"
  | "mint-light"
  | "sand-light"
  | "rose-light"
  | "porcelain"
  | "newsprint";

export interface ThemeOption {
  id: ThemeId;
  name: string;
  badgeColor: string;
  category: "dark" | "light";
}

export const themeOptions: ThemeOption[] = [
  // 🌙 Dark & Cyber Themes
  { id: "midnight", name: "Midnight Slate", badgeColor: "bg-sky-400", category: "dark" },
  { id: "emerald", name: "Emerald Tech Lead", badgeColor: "bg-emerald-400", category: "dark" },
  { id: "noir", name: "Executive Noir", badgeColor: "bg-zinc-200", category: "dark" },
  { id: "cyberpunk", name: "Tokyo Cyberpunk", badgeColor: "bg-purple-500", category: "dark" },
  { id: "amber", name: "Amber Sunset", badgeColor: "bg-amber-400", category: "dark" },
  { id: "nordic", name: "Nordic Polar Dark", badgeColor: "bg-cyan-400", category: "dark" },
  { id: "synthwave", name: "Synthwave 80s", badgeColor: "bg-pink-500", category: "dark" },
  
  // ☀️ Light & Subtle Themes (7 Presets with High Contrast Readability)
  { id: "light", name: "Studio Light", badgeColor: "bg-blue-600", category: "light" },
  { id: "snow", name: "Nordic Snow White", badgeColor: "bg-sky-600", category: "light" },
  { id: "mint-light", name: "Emerald Mint Light", badgeColor: "bg-emerald-600", category: "light" },
  { id: "sand-light", name: "Warm Sand Linen", badgeColor: "bg-amber-600", category: "light" },
  { id: "rose-light", name: "Rose Pastel Light", badgeColor: "bg-rose-500", category: "light" },
  { id: "porcelain", name: "Porcelain Studio", badgeColor: "bg-stone-700", category: "light" },
  { id: "newsprint", name: "Newsprint Minimalist", badgeColor: "bg-zinc-900", category: "light" },
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

  const darkThemes = themeOptions.filter((t) => t.category === "dark");
  const lightThemes = themeOptions.filter((t) => t.category === "light");

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
            className="absolute right-0 top-full mt-2 w-56 max-h-[400px] overflow-y-auto rounded-xl bg-[var(--surface-1)] border border-[var(--border-strong)] p-2 shadow-2xl z-[1000] backdrop-blur-2xl"
          >
            {/* Dark Themes */}
            <div className="px-2 py-1 text-[10px] font-bold text-[var(--muted)] uppercase tracking-wider flex items-center gap-1">
              <Moon className="w-3 h-3 text-sky-400" />
              <span>Dark &amp; Cyber Themes ({darkThemes.length})</span>
            </div>
            {darkThemes.map((t) => (
              <button
                key={t.id}
                onClick={() => changeTheme(t.id)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 my-0.5 rounded-lg text-xs font-semibold transition-colors ${
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

            {/* Light Themes */}
            <div className="px-2 py-1 mt-2.5 pt-2 border-t border-[var(--border)] text-[10px] font-bold text-[var(--muted)] uppercase tracking-wider flex items-center gap-1">
              <Sun className="w-3 h-3 text-amber-500" />
              <span>Subtle &amp; Light Themes ({lightThemes.length})</span>
            </div>
            {lightThemes.map((t) => (
              <button
                key={t.id}
                onClick={() => changeTheme(t.id)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 my-0.5 rounded-lg text-xs font-semibold transition-colors ${
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
