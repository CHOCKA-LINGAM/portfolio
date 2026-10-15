"use client";

import React, { useState, useEffect, useRef } from "react";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Send,
  Moon,
  Sun,
  X,
  Sparkles,
  Clock,
  MapPin,
} from "lucide-react";
import { Page } from "@/hooks/useNav";
import { PERSONAL, getExperienceYearsLabel } from "@/data/index";

interface LiveMoonData {
  phaseName: string;
  illuminationPct: number;
  moonAgeDays: number;
  isWaxing: boolean;
  isSupermoon: boolean;
  hemisphere: "Northern" | "Southern";
  userLocationLabel: string;
}

// Synodic Month Calculation based on baseline New Moon epoch
function calculateLiveMoonData(): LiveMoonData {
  const now = new Date();
  const knownNewMoonEpochMs = 1704974220000; // Jan 11, 2024 11:57 UTC
  const synodicMonthDays = 29.53058770576;
  const synodicMonthMs = synodicMonthDays * 86400 * 1000;

  const diffMs = now.getTime() - knownNewMoonEpochMs;
  const currentCycleProgressMs = ((diffMs % synodicMonthMs) + synodicMonthMs) % synodicMonthMs;
  const moonAgeDays = currentCycleProgressMs / (86400 * 1000);

  // Illumination calculation (0 to 100%)
  const phaseAngle = (moonAgeDays / synodicMonthDays) * 2 * Math.PI;
  const illuminationPct = Math.round(((1 - Math.cos(phaseAngle)) / 2) * 100);

  const isWaxing = moonAgeDays < synodicMonthDays / 2;

  let phaseName = "New Moon";
  if (moonAgeDays < 1.845) phaseName = "New Moon 🌑";
  else if (moonAgeDays < 5.537) phaseName = "Waxing Crescent 🌒";
  else if (moonAgeDays < 9.228) phaseName = "First Quarter 🌓";
  else if (moonAgeDays < 12.919) phaseName = "Waxing Gibbous 🌔";
  else if (moonAgeDays < 16.611) phaseName = "Full Supermoon 🌕";
  else if (moonAgeDays < 20.302) phaseName = "Waning Gibbous 🌖";
  else if (moonAgeDays < 23.993) phaseName = "Third Quarter 🌗";
  else if (moonAgeDays < 27.685) phaseName = "Waning Crescent 🌘";
  else phaseName = "New Moon 🌑";

  const isSupermoon = illuminationPct >= 95 || phaseName.includes("Full");

  // Determine user timezone & hemisphere
  let userLocationLabel = "Chennai, India";
  let hemisphere: "Northern" | "Southern" = "Northern";

  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (timeZone) {
      userLocationLabel = timeZone.replace("_", " ");
      if (
        timeZone.startsWith("Australia") ||
        timeZone.startsWith("Pacific/Auckland") ||
        timeZone.startsWith("America/Argentina") ||
        timeZone.startsWith("Africa/Johannesburg")
      ) {
        hemisphere = "Southern";
      }
    }
  } catch {
    // Fallback default
  }

  return {
    phaseName,
    illuminationPct,
    moonAgeDays: Math.round(moonAgeDays * 10) / 10,
    isWaxing,
    isSupermoon,
    hemisphere,
    userLocationLabel,
  };
}

export function MonographEasterEggs({
  isOpen,
  onClose,
  onNavigate,
}: {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (sectionId: Page) => void;
}) {
  useBodyScrollLock(isOpen);
  const logEndRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  useFocusTrap(isOpen, dialogRef);
  const [moonData, setMoonData] = useState<LiveMoonData>(calculateLiveMoonData);
  const [ celestialClicks, setCelestialClicks] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [localTimeStr, setLocalTimeStr] = useState("");
  const [activeTab, setActiveTab] = useState<"terminal" | "moon">("terminal");

  // Always open on the career pipeline
  useEffect(() => {
    if (isOpen) setActiveTab("terminal");
  }, [isOpen]);

  const nightQuotes = [
    "\"Curiosity is the engine of achievement. Great software is built with passion.\"",
    "\"Data flows like water. Systems are designed to give it direction.\"",
    "\"Simple code scales best. Precision over complexity.\"",
    "\"Same sky. Bigger dreams. Keep building forward!\"",
    "\"Under the starlit moon, building code that powers global platforms.\"",
  ];

  // Terminal state for inline bottom section
  const [cmdInput, setCmdInput] = useState("");
  const [outputLog, setOutputLog] = useState<string[]>([
    "chocka-dev console — answers come from my real experience",
    "Type 'help' to list commands (try 'impact' or 'whoami')",
  ]);

  useEffect(() => {
    setMoonData(calculateLiveMoonData());

    const updateTime = () => {
      const t = new Date();
      setLocalTimeStr(t.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  const handleClose = (e?: React.SyntheticEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Terminal Execution
  const executeCmd = (commandText: string) => {
    const cmd = commandText.trim().toLowerCase();
    let res = "";
    if (cmd === "help") {
      res = "Commands: whoami, impact, stack, experience, pyspark, fastapi, ai, schema-shield, contact, clear";
    } else if (cmd === "whoami") {
      res = `Chockalingam Balan — Senior Software Engineer, ${getExperienceYearsLabel()} yrs. Backend, data platforms & AI. Chennai, India.`;
    } else if (cmd === "impact") {
      res = "10–12 markets on one codebase • >90% QA cycle-time cut (direct model validation) • AI claims API 25s → 10s • sub-5s DAG planning API";
    } else if (cmd === "stack") {
      res = "Python, FastAPI, Django, PySpark, Azure Databricks, Airflow, Celery, AWS Bedrock / OpenAI, Docker, AKS, React.";
    } else if (cmd === "experience") {
      res = "iLink Digital (2025–now) → Tiger Analytics (2023–2025) → KAAR Technologies (2020–2023).";
    } else if (cmd === "pyspark") {
      res = "⚡ PySpark: migrated legacy Pandas pipelines to distributed Spark on Azure Databricks.";
    } else if (cmd === "fastapi") {
      res = "🚀 FastAPI: orchestration service at iLink for DAG generation & execution planning, under 5s.";
    } else if (cmd === "ai") {
      res = "🤖 AI: LLM accelerators (OpenAI, Claude, AWS Bedrock); AI claims API latency 25s → 10s.";
    } else if (cmd === "schema-shield") {
      res = "🛡️ schema-shield (PyPI): schema compatibility & transfer-safety utility; classifies changes as SAFE / WARNING / BREAKING. pip install schema-shield";
    } else if (cmd === "contact") {
      res = `📬 ${PERSONAL.email} — open to global remote / relocation.`;
    } else if (cmd === "clear") {
      setOutputLog([]);
      setCmdInput("");
      return;
    } else {
      res = `Command not found: '${cmd}'. Try 'help'.`;
    }

    setOutputLog((prev) => [...prev, `> ${commandText}`, res]);
    setCmdInput("");
  };

  // Keep newest terminal output in view
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ block: "nearest" });
  }, [outputLog]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cmdInput) return;
    executeCmd(cmdInput);
  };

  const currentQuotes = nightQuotes;

  return (
    <>

      {/* ── FULL-SCREEN CAREER PIPELINE OVERLAY (+ LIVE MOON PHASE BONUS TAB) ── */}
      <AnimatePresence>
        {isOpen && (
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="System terminal and moon phase"
            className="fixed inset-0 z-[5000] flex items-center justify-center p-3 sm:p-6 bg-slate-950/92 backdrop-blur-2xl"
          >
            {/* Backdrop click exit */}
            <div className="absolute inset-0 z-0 cursor-pointer" onClick={handleClose} />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="relative z-10 w-full max-w-3xl rounded-3xl bg-slate-950 text-white shadow-2xl p-5 sm:p-8 flex flex-col justify-between min-h-[min(520px,92dvh)] max-h-[92dvh] overflow-y-auto border border-cyan-500/30 shadow-[0_0_80px_rgba(34,211,238,0.15)]"
            >
              {/* Top Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl border shrink-0 bg-cyan-950/80 border-cyan-500/40 text-cyan-300">
                    {activeTab === "terminal" ? (
                      <Terminal className="w-5 h-5 text-cyan-400" />
                    ) : (
                      <Moon className="w-5 h-5 animate-pulse text-amber-300" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 text-cyan-400">
                      {activeTab === "terminal" ? "SYSTEM TERMINAL // LIVE" : "LIVE MOON PHASE 🌙"}
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    </span>
                    <span className="text-xs font-sans text-slate-300">
                      {activeTab === "terminal"
                        ? "Ask about my work — answers come from my real experience"
                        : `Real-time lunar phase synced to ${moonData.userLocationLabel}`}
                    </span>
                  </div>
                </div>

                {/* Tabs & Exit Button */}
                <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
                  <div role="tablist" className="flex items-center gap-1 p-1 rounded-full bg-slate-900 border border-white/10 font-mono text-xs">
                    <button
                      role="tab"
                      aria-selected={activeTab === "terminal"}
                      onClick={() => setActiveTab("terminal")}
                      className={`touch-manipulation px-3 py-1.5 sm:py-1 rounded-full font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        activeTab === "terminal" ? "bg-cyan-400 text-slate-950 shadow-md" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <Terminal className="w-3.5 h-3.5" />
                      <span>Terminal</span>
                    </button>

                    <button
                      role="tab"
                      aria-selected={activeTab === "moon"}
                      onClick={() => setActiveTab("moon")}
                      className={`touch-manipulation px-3 py-1.5 sm:py-1 rounded-full font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        activeTab === "moon" ? "bg-amber-400 text-slate-950 shadow-md" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <Moon className="w-3.5 h-3.5" />
                      <span>Moon 🌙</span>
                    </button>
                  </div>

                  {/* EXIT / CLOSE BUTTON */}
                  <button
                    onClick={handleClose}
                    className="p-2 rounded-full bg-slate-900 border border-white/20 text-slate-300 hover:bg-slate-800 hover:text-white transition-all cursor-pointer shadow-lg shrink-0 min-w-[36px] min-h-[36px] flex items-center justify-center"
                    aria-label="Close Overlay"
                    title="Close (ESC)"
                  >
                    <X className="w-4 h-4 text-cyan-400" />
                  </button>
                </div>
              </div>

              {/* ── CAREER PIPELINE ── */}
              {activeTab === "terminal" && (
                <div className="my-auto py-5 font-mono flex flex-col gap-3">
                  <div
                    aria-live="polite"
                    className="p-4 rounded-xl bg-slate-900/90 border border-white/10 text-xs text-emerald-300 h-48 overflow-y-auto leading-relaxed space-y-1"
                  >
                    {outputLog.map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                    <div ref={logEndRef} />
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {["help", "whoami", "impact", "stack", "experience", "schema-shield", "contact", "clear"].map((cmd) => (
                      <button
                        key={cmd}
                        onClick={() => executeCmd(cmd)}
                        className="touch-manipulation px-3 py-1.5 sm:px-2.5 sm:py-1 rounded-lg bg-slate-950 border border-cyan-500/30 text-xs text-cyan-300 hover:bg-cyan-500/20 transition-all cursor-pointer font-bold"
                      >
                        {cmd}
                      </button>
                    ))}
                  </div>

                  <form onSubmit={handleCommandSubmit} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={cmdInput}
                      onChange={(e) => setCmdInput(e.target.value)}
                      placeholder="Type a command (e.g. 'help', 'impact', 'whoami')..."
                      className="w-full min-w-0 px-4 py-2 rounded-xl bg-slate-950 border border-white/20 text-base sm:text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
                    />
                    <button type="submit" className="px-4 py-2 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs cursor-pointer flex items-center gap-1 hover:bg-cyan-300 transition-all">
                      <Send className="w-3.5 h-3.5" /> Send
                    </button>
                  </form>
                </div>
              )}

              {/* ── NIGHTTIME SKY CANVAS (CELESTIAL SUPERMOON 🌙) ── */}
              {activeTab === "moon" && (
                <div className="my-auto py-5 flex flex-col items-center gap-6 text-center">
                  <div className="relative group cursor-pointer">
                    <div
                      className="absolute inset-0 rounded-full blur-2xl transition-all duration-700 pointer-events-none opacity-80"
                      style={{
                        background: `radial-gradient(circle, rgba(251, 191, 36, ${
                          moonData.illuminationPct / 100
                        }) 0%, rgba(245, 158, 11, 0.15) 70%, transparent 100%)`,
                      }}
                    />

                    <motion.div
                      onClick={() => {
                        setCelestialClicks((prev) => prev + 1);
                        setQuoteIndex((prev) => (prev + 1) % nightQuotes.length);
                      }}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-amber-300/80 shadow-[0_0_60px_rgba(251,191,36,0.4)] flex items-center justify-center bg-gradient-to-tr from-amber-100 via-amber-200 to-amber-400 select-none"
                    >
                      <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#78350f_1.5px,transparent_1.5px)] [background-size:16px_16px]" />
                      <div className="absolute top-6 left-10 w-12 h-12 rounded-full bg-amber-700/20 blur-sm" />
                      <div className="absolute bottom-8 right-12 w-16 h-16 rounded-full bg-amber-800/25 blur-sm" />
                      <div className="absolute top-1/2 right-6 w-8 h-8 rounded-full bg-amber-900/20 blur-sm" />

                      <div
                        className="absolute inset-0 bg-slate-950/92 transition-all duration-500 pointer-events-none"
                        style={{
                          clipPath: moonData.isWaxing
                            ? `inset(0 0 0 ${moonData.illuminationPct}%)`
                            : `inset(0 ${moonData.illuminationPct}% 0 0)`,
                        }}
                      />

                      <div className="relative z-10 flex flex-col items-center justify-center p-3 text-slate-950">
                        <Sparkles className="w-5 h-5 text-slate-950 mb-0.5 animate-pulse" />
                        <span className="font-display font-extrabold text-xs tracking-wider uppercase drop-shadow">
                          {moonData.phaseName.split(" ")[0]}
                        </span>
                        <span className="font-mono text-[11px] font-bold text-slate-900">
                          {moonData.illuminationPct}% Lit
                        </span>
                      </div>
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full font-mono text-xs">
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-amber-500/20 flex flex-col gap-1 text-left">
                      <span className="text-[11px] text-slate-400 font-bold flex items-center gap-1">
                        <Moon className="w-3 h-3 text-amber-400" /> LIVE PHASE
                      </span>
                      <span className="text-xs font-bold text-amber-300 truncate">
                        {moonData.phaseName}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/90 border border-amber-500/20 flex flex-col gap-1 text-left">
                      <span className="text-[11px] text-slate-400 font-bold flex items-center gap-1">
                        <Sun className="w-3 h-3 text-amber-400" /> ILLUMINATION
                      </span>
                      <span className="text-xs font-bold text-emerald-400">
                        {moonData.illuminationPct}% (Age: {moonData.moonAgeDays}d)
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/90 border border-amber-500/20 flex flex-col gap-1 text-left">
                      <span className="text-[11px] text-slate-400 font-bold flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-cyan-400" /> LOCATION
                      </span>
                      <span className="text-xs font-bold text-cyan-300 truncate" title={moonData.userLocationLabel}>
                        {moonData.userLocationLabel}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/90 border border-amber-500/20 flex flex-col gap-1 text-left">
                      <span className="text-[11px] text-slate-400 font-bold flex items-center gap-1">
                        <Clock className="w-3 h-3 text-purple-400" /> LOCAL TIME
                      </span>
                      <span className="text-xs font-bold text-purple-300">
                        {localTimeStr || "Syncing..."}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-amber-500/30 text-center max-w-md w-full shadow-lg">
                    <p className="font-serif-italic text-sm text-amber-200 leading-relaxed">
                      {currentQuotes[quoteIndex]}
                    </p>
                    <span className="block mt-1.5 text-[11px] font-mono text-slate-400">
                      Tap Moon to reflect ({celestialClicks} clicks)
                    </span>
                  </div>
                </div>
              )}

              {/* Bottom Footer */}
              <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Teleport:</span>
                  <button
                    onClick={(e) => {
                      handleClose(e);
                      if (onNavigate) setTimeout(() => onNavigate("projects"), 120);
                    }}
                    className="touch-manipulation px-3 py-2 sm:py-1 rounded-lg bg-slate-900 border border-white/10 text-cyan-300 hover:border-cyan-400 font-bold cursor-pointer"
                  >
                    Projects 🚀
                  </button>
                  <button
                    onClick={(e) => {
                      handleClose(e);
                      if (onNavigate) setTimeout(() => onNavigate("experience"), 120);
                    }}
                    className="touch-manipulation px-3 py-2 sm:py-1 rounded-lg bg-slate-900 border border-white/10 text-emerald-300 hover:border-emerald-400 font-bold cursor-pointer"
                  >
                    Experience 💼
                  </button>
                </div>

                <button
                  onClick={handleClose}
                  className="w-full sm:w-auto px-5 py-2 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs hover:bg-cyan-300 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-lg"
                >
                  <span>Close</span>
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
