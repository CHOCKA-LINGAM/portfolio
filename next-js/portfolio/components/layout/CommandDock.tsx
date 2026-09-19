"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Monitor,
  Radar,
  Workflow,
  Layers,
  Send,
  Terminal,
  Volume2,
  VolumeX,
  Palette,
  Sparkles,
} from "lucide-react";

export type ModuleId = "workstation" | "radar" | "topology" | "blueprints" | "dispatch";

interface CommandDockProps {
  activeModule: ModuleId;
  setActiveModule: (id: ModuleId) => void;
  onOpenCmdPalette: () => void;
}

const MODULES: { id: ModuleId; label: string; icon: React.ReactNode; num: string }[] = [
  { id: "workstation", label: "Workstation", icon: <Monitor className="w-4 h-4" />, num: "01" },
  { id: "radar", label: "Career Radar", icon: <Radar className="w-4 h-4" />, num: "02" },
  { id: "topology", label: "System Topology", icon: <Workflow className="w-4 h-4" />, num: "03" },
  { id: "blueprints", label: "Blueprints", icon: <Layers className="w-4 h-4" />, num: "04" },
  { id: "dispatch", label: "Dispatch Console", icon: <Send className="w-4 h-4" />, num: "05" },
];

export function CommandDock({ activeModule, setActiveModule, onOpenCmdPalette }: CommandDockProps) {
  const [muted, setMuted] = React.useState(false);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[900] flex items-center gap-2 p-2 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-1)]/95 shadow-2xl backdrop-blur-2xl max-w-[95vw] overflow-x-auto select-none">
      {/* Module Switcher Buttons */}
      <div className="flex items-center gap-1">
        {MODULES.map((m) => {
          const isActive = activeModule === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setActiveModule(m.id)}
              className={`relative px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                isActive
                  ? "text-slate-950 shadow-lg"
                  : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]"
              }`}
              style={{
                backgroundColor: isActive ? "var(--accent)" : "transparent",
              }}
            >
              <span>{m.icon}</span>
              <span className="hidden sm:inline">{m.label}</span>
              <span className="text-[10px] opacity-70">[{m.num}]</span>
            </button>
          );
        })}
      </div>

      <div className="h-5 w-px bg-[var(--border)] mx-1 hidden md:block" />

      {/* Quick Action Tools */}
      <div className="hidden md:flex items-center gap-1.5">
        <button
          onClick={onOpenCmdPalette}
          className="px-3 py-2 rounded-xl text-xs font-mono text-[var(--text-muted)] border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--text)] transition-all flex items-center gap-1.5 bg-[var(--surface-2)] cursor-pointer"
          title="Open Developer Command Palette (Cmd + K)"
        >
          <Terminal className="w-3.5 h-3.5 text-[var(--accent)]" />
          <span>Cmd+K</span>
        </button>

        <button
          onClick={() => setMuted(!muted)}
          className="p-2 rounded-xl text-xs text-[var(--text-muted)] border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--text)] transition-all bg-[var(--surface-2)] cursor-pointer"
          title={muted ? "Unmute Audio FX" : "Mute Audio FX"}
        >
          {muted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
        </button>
      </div>
    </div>
  );
}
