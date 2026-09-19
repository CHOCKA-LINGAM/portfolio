"use client";

import React, { useState, useEffect } from "react";
import { Command, Sparkles, Moon, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  const handleMobileNav = (sectionId: Page) => {
    onNavigate(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/85 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-2xl"
          : "bg-slate-950/60 sm:bg-transparent py-4 sm:py-5 backdrop-blur-md sm:backdrop-blur-none"
      }`}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-10 flex items-center justify-between">
        {/* Monogram Logo */}
        <button
          onClick={() => {
            onNavigate("home");
            setMobileMenuOpen(false);
          }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-slate-900 border border-white/20 flex items-center justify-center font-display font-extrabold text-sm text-white group-hover:border-cyan-400 group-hover:text-cyan-300 transition-all shadow-md">
            C B
          </div>
          <span className="font-mono text-xs font-bold text-slate-300 group-hover:text-white tracking-widest uppercase">
            CHOCKA.dev
          </span>
        </button>

        {/* Center Nav Items (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-slate-900/80 border border-white/10 backdrop-blur-md font-mono text-xs shadow-lg">
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

        {/* Right Actions & Mobile Hamburger Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenCmdPalette}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-slate-900 border border-white/15 text-slate-300 hover:text-white hover:border-cyan-400 font-mono text-xs transition-all cursor-pointer shadow-md"
            title="Search & Command Palette"
          >
            <Command className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Cmd + K</span>
          </button>

          {/* Secret Easter Egg Trigger Dot */}
          <button
            onClick={onTriggerEasterEgg}
            title="Secret Easter Egg discovery 🤫"
            className="w-8 h-8 rounded-full bg-slate-900 border border-white/15 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-400/50 transition-all cursor-pointer shadow-md group relative"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 group-hover:bg-amber-400 animate-ping absolute" />
            <span className="w-2 h-2 rounded-full bg-cyan-400 group-hover:bg-amber-400 relative" />
          </button>

          {/* Mobile / Tablet Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="flex lg:hidden p-2 rounded-xl bg-slate-900 border border-white/15 text-slate-300 hover:text-white transition-all cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5 text-slate-300" />}
          </button>
        </div>
      </div>

      {/* Animated Mobile / Tablet Navigation Dropdown Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-slate-950/95 border-b border-white/10 backdrop-blur-2xl px-4 py-4 mt-2 font-mono"
          >
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest px-2 mb-1">
                // NAVIGATION SECTIONS
              </span>
              {navItems.map((item) => {
                const isActive = currentSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleMobileNav(item.id as Page)}
                    className={`px-4 py-2.5 rounded-xl text-left text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                      isActive
                        ? "bg-cyan-500/20 text-cyan-200 border border-cyan-400/50 shadow-md"
                        : "text-slate-300 hover:bg-slate-900 hover:text-white border border-transparent"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-[10px] text-slate-500 font-mono">0{navItems.indexOf(item) + 1}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
