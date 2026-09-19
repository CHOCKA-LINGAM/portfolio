"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Command,
  ArrowRight,
  User,
  Workflow,
  Play,
  Palette,
  Mail,
  FileText,
  X,
  Terminal,
} from "lucide-react";
import { Page } from "@/hooks/useNav";
import { themeOptions, ThemeId } from "@/components/ui/ThemeSwitcher";
import { PERSONAL } from "@/data/index";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  goTo: (page: Page) => void;
  onOpenStory: () => void;
  onOpenResumeModal: () => void;
}

interface CommandItem {
  id: string;
  category: "Navigation" | "Themes" | "Actions";
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  goTo,
  onOpenStory,
  onOpenResumeModal,
}) => {
  const [query, setQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setSelectedIdx(0);
    }
  }, [isOpen]);

  const changeTheme = (theme: ThemeId) => {
    localStorage.setItem("portfolio_theme", theme);
    if (theme === "midnight") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
    onClose();
  };

  // Build command items list
  const navCommands: CommandItem[] = [
    {
      id: "nav-home",
      category: "Navigation",
      title: "Jump to Home",
      subtitle: "Overview & identity",
      icon: <Terminal className="w-4 h-4 text-sky-400" />,
      action: () => { goTo("home"); onClose(); },
    },
    {
      id: "nav-about",
      category: "Navigation",
      title: "Jump to About Core",
      subtitle: "Curiosity, discipline & core values",
      icon: <User className="w-4 h-4 text-cyan-400" />,
      action: () => { goTo("about"); onClose(); },
    },
    {
      id: "nav-exp",
      category: "Navigation",
      title: "Jump to Professional Experience",
      subtitle: "Career timeline @ iLink Digital & Standard Chartered",
      icon: <ArrowRight className="w-4 h-4 text-emerald-400" />,
      action: () => { goTo("experience"); onClose(); },
    },
    {
      id: "nav-skills",
      category: "Navigation",
      title: "Jump to Skills Capability Map",
      subtitle: "Backend, Data Engineering, AI/ML & Cloud Stack",
      icon: <Command className="w-4 h-4 text-amber-400" />,
      action: () => { goTo("skills"); onClose(); },
    },
    {
      id: "nav-projects",
      category: "Navigation",
      title: "Jump to Featured Projects",
      subtitle: "schema-shield PyPI, AI workflows, RAG engines",
      icon: <Workflow className="w-4 h-4 text-purple-400" />,
      action: () => { goTo("projects"); onClose(); },
    },
    {
      id: "nav-contact",
      category: "Navigation",
      title: "Jump to Contact & Outreach",
      subtitle: "Direct message & availability info",
      icon: <Mail className="w-4 h-4 text-blue-400" />,
      action: () => { goTo("contact"); onClose(); },
    },
    {
      id: "nav-lab",
      category: "Navigation",
      title: "Open Interactive UI Laboratory (/lab)",
      subtitle: "Chock CLI terminal, live pipeline canvas & benchmarks",
      icon: <Terminal className="w-4 h-4 text-amber-400" />,
      action: () => { window.location.href = "/lab"; onClose(); },
    },
  ];

  const actionCommands: CommandItem[] = [
    {
      id: "act-story",
      category: "Actions",
      title: "Watch Developer Story Highlights",
      subtitle: "Interactive Instagram-style reel",
      icon: <Play className="w-4 h-4 text-amber-400" />,
      action: () => { onOpenStory(); onClose(); },
    },
    {
      id: "act-resume",
      category: "Actions",
      title: "Preview Resume PDF Modal",
      subtitle: "Inline document viewer & print options",
      icon: <FileText className="w-4 h-4 text-sky-400" />,
      action: () => { onOpenResumeModal(); onClose(); },
    },
    {
      id: "act-email",
      category: "Actions",
      title: "Copy Email to Clipboard",
      subtitle: PERSONAL.email,
      icon: <Mail className="w-4 h-4 text-emerald-400" />,
      action: () => {
        navigator.clipboard.writeText(PERSONAL.email);
        onClose();
      },
    },
  ];

  const themeCommands: CommandItem[] = themeOptions.map((t) => ({
    id: `theme-${t.id}`,
    category: "Themes",
    title: `Switch Theme: ${t.name}`,
    subtitle: t.category === "dark" ? "Dark Theme" : "Light Theme",
    icon: <Palette className="w-4 h-4 text-sky-400" />,
    action: () => changeTheme(t.id),
  }));

  const allCommands = [...navCommands, ...actionCommands, ...themeCommands];

  const filteredCommands = allCommands.filter((cmd) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase().trim();
    return (
      cmd.title.toLowerCase().includes(q) ||
      (cmd.subtitle && cmd.subtitle.toLowerCase().includes(q)) ||
      cmd.category.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIdx((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIdx((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[selectedIdx]) {
          filteredCommands[selectedIdx].action();
        }
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredCommands, selectedIdx, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        role="dialog"
        aria-modal="true"
        aria-label="Developer Command Palette"
        className="fixed inset-0 z-[3000] flex items-start justify-center pt-16 sm:pt-24 p-3 bg-slate-950/80 backdrop-blur-xl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.18 }}
          className="relative w-full max-w-xl rounded-2xl bg-[var(--surface-1)] border border-[var(--border-strong)] shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Input Header */}
          <div className="flex items-center px-4 py-3.5 border-b border-[var(--border)] gap-3">
            <Search className="w-5 h-5 text-sky-400 shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIdx(0);
              }}
              placeholder="Type a command or search (e.g. 'home', 'projects', 'cyberpunk', 'resume')..."
              className="w-full bg-transparent text-sm text-[var(--text)] placeholder-[var(--text-muted)] outline-none font-sans"
            />
            <button
              onClick={onClose}
              className="p-1 rounded-lg bg-[var(--surface-2)] text-[var(--muted)] hover:text-[var(--text)] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results List */}
          <div className="max-h-[360px] overflow-y-auto p-2 flex flex-col gap-1">
            {filteredCommands.length === 0 ? (
              <div className="p-8 text-center text-xs text-[var(--muted)] font-sans">
                No matching commands found for &ldquo;{query}&rdquo;.
              </div>
            ) : (
              filteredCommands.map((cmd, idx) => {
                const isSelected = idx === selectedIdx;
                return (
                  <button
                    key={cmd.id}
                    onClick={cmd.action}
                    onMouseEnter={() => setSelectedIdx(idx)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all text-left font-sans cursor-pointer ${
                      isSelected
                        ? "bg-[var(--surface-2)] text-[var(--text)] border border-sky-500/40 shadow-sm"
                        : "text-[var(--text-muted)] hover:bg-[var(--surface-2)]/50"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2 rounded-lg bg-[var(--surface-1)] border border-[var(--border)]">
                        {cmd.icon}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-bold text-[var(--text)] truncate">
                          {cmd.title}
                        </span>
                        {cmd.subtitle && (
                          <span className="text-[11px] text-[var(--muted)] truncate">
                            {cmd.subtitle}
                          </span>
                        )}
                      </div>
                    </div>

                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[var(--surface-1)] border border-[var(--border)] text-[var(--muted)] shrink-0">
                      {cmd.category}
                    </span>
                  </button>
                );
              })
            )}
          </div>

          {/* Footer Shortcuts Info */}
          <div className="px-4 py-2.5 bg-[var(--surface-2)] border-t border-[var(--border)] flex items-center justify-between text-[11px] text-[var(--muted)] font-mono">
            <div className="flex items-center gap-3">
              <span>↑↓ Navigate</span>
              <span>↵ Select</span>
              <span>ESC Close</span>
            </div>
            <span>Cmd + K</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
