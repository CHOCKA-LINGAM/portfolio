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
  Info,
  Compass,
} from "lucide-react";
import { Page } from "@/hooks/useNav";

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
  const [moonData, setMoonData] = useState<LiveMoonData>(calculateLiveMoonData());
  const [ celestialClicks, setCelestialClicks] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [localTimeStr, setLocalTimeStr] = useState("");
  const [isDaytime, setIsDaytime] = useState(false);
  const [activeSkyMode, setActiveSkyMode] = useState<"day" | "night">("day");

  const dayQuotes = [
    "\"Every morning brings new code, fresh perspectives, and unlimited architectural potential.\"",
    "\"Daylight fuels deep focus, clear execution, and elegant system designs.\"",
    "\"Sunlight reveals the structure of things. Build with clarity and precision.\"",
    "\"Under the bright sun, turning complex problems into simple, scalable solutions.\"",
  ];

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
    "ChockaOS v2.4.0 Developer Terminal Active",
    "Type 'help', 'pyspark', 'fastapi', 'ai', or 'schema-shield'",
  ]);

  useEffect(() => {
    const now = new Date();
    const currentHour = now.getHours();
    const daytimeActive = currentHour >= 6 && currentHour < 18;
    setIsDaytime(daytimeActive);
    setActiveSkyMode(daytimeActive ? "day" : "night");
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
      res = "Available commands: help, pyspark, fastapi, ai, schema-shield, clear";
    } else if (cmd === "pyspark") {
      res = "⚡ PySpark ETL: Processing 1.2M rows/sec with Delta Lake ACID transactions.";
    } else if (cmd === "fastapi") {
      res = "🚀 FastAPI Backend: P95 API Latency < 18ms with async connection pooling.";
    } else if (cmd === "ai") {
      res = "🤖 AI Agents: RAG Vector Indexing + Autonomous LLM Tool Calling Engine.";
    } else if (cmd === "schema-shield") {
      res = "🛡️ schema-shield PyPI: pip install schema-shield (Runtime schema assertion).";
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

  const currentQuotes = activeSkyMode === "day" ? dayQuotes : nightQuotes;

  return (
    <>
      {/* ── INLINE TERMINAL SECTION AT BOTTOM OF PAGE ── */}
      <section id="section-easteregg" className="relative w-full rounded-3xl overflow-hidden border border-cyan-500/20 bg-slate-950 text-white shadow-2xl p-6 sm:p-12 my-8 flex flex-col justify-between scroll-mt-24">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-10 right-10 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-purple-500/10 rounded-full blur-[150px]" />
        </div>

        <div className="flex flex-col gap-2 border-b border-white/10 pb-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/60 text-cyan-300 text-xs font-mono font-bold tracking-widest w-max backdrop-blur-md">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>DEVELOPER CLI &amp; INSIGHTS</span>
          </div>
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight max-w-full break-words">
            System Terminal
          </h2>
        </div>

        <div className="my-auto py-8 relative z-10 font-mono max-w-4xl mx-auto w-full">
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/30 backdrop-blur-2xl shadow-xl flex flex-col justify-between min-h-[320px]">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs text-cyan-300 font-bold">
              <span className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                chocka-dev :: system-console v2.4
              </span>
              <span className="text-[11px] text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30">
                ACTIVE
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/90 border border-white/10 text-xs text-emerald-300 h-40 overflow-y-auto my-4 font-mono leading-relaxed space-y-1">
              {outputLog.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
              <div ref={logEndRef} />
            </div>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {["help", "pyspark", "fastapi", "ai", "schema-shield", "clear"].map((cmd) => (
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
                placeholder="Type command (e.g. 'help', 'pyspark', 'ai')..."
                className="w-full min-w-0 px-4 py-2 rounded-xl bg-slate-950 border border-white/20 text-base sm:text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
              />
              <button type="submit" className="px-4 py-2 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs cursor-pointer flex items-center gap-1 hover:bg-cyan-300 transition-all">
                <Send className="w-3.5 h-3.5" /> Send
              </button>
            </form>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-mono text-slate-400 relative z-10">
          <span>Clean code. Scalable pipelines. High performance.</span>
          <span>CHOCKA.dev</span>
        </div>
      </section>

      {/* ── FULL-SCREEN DYNAMIC CELESTIAL SKY OVERLAY (DAYTIME SUN / NIGHTTIME SUPERMOON) ── */}
      <AnimatePresence>
        {isOpen && (
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Live sky radar"
            className="fixed inset-0 z-[5000] flex items-center justify-center p-3 sm:p-6 bg-slate-950/92 backdrop-blur-2xl"
          >
            {/* Backdrop click exit */}
            <div
              className="absolute inset-0 z-0 cursor-pointer"
              onClick={handleClose}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className={`relative z-10 w-full max-w-2xl rounded-3xl bg-slate-950 text-white shadow-2xl p-5 sm:p-8 flex flex-col justify-between min-h-[min(520px,92dvh)] max-h-[92dvh] overflow-y-auto border ${
                activeSkyMode === "day"
                  ? "border-amber-400/40 shadow-[0_0_80px_rgba(251,191,36,0.2)]"
                  : "border-cyan-500/30 shadow-[0_0_80px_rgba(34,211,238,0.15)]"
              }`}
            >
              {/* Top Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 gap-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl border shrink-0 ${
                    activeSkyMode === "day"
                      ? "bg-amber-950/80 border-amber-500/40 text-amber-300"
                      : "bg-cyan-950/80 border-cyan-500/40 text-cyan-300"
                  }`}>
                    {activeSkyMode === "day" ? (
                      <Sun className="w-5 h-5 animate-spin-slow text-amber-400" />
                    ) : (
                      <Moon className="w-5 h-5 animate-pulse text-amber-300" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className={`font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 ${
                      activeSkyMode === "day" ? "text-amber-400" : "text-cyan-400"
                    }`}>
                      {activeSkyMode === "day" ? "LIVE DAYTIME SOLAR TRANSIT ☀️" : "LIVE CELESTIAL SUPERMOON 🌙"}
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    </span>
                    <span className="text-xs font-sans text-slate-300">
                      Real-time astronomical sky synced to {moonData.userLocationLabel}
                    </span>
                  </div>
                </div>

                {/* Day / Night Toggle Pill & Exit Button */}
                <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
                  <div className="flex items-center gap-1 p-1 rounded-full bg-slate-900 border border-white/10 font-mono text-xs">
                    <button
                      onClick={() => setActiveSkyMode("day")}
                      className={`touch-manipulation px-3 py-1.5 sm:py-1 rounded-full font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        activeSkyMode === "day"
                          ? "bg-amber-400 text-slate-950 shadow-md"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <Sun className="w-3.5 h-3.5 text-slate-950" />
                      <span>Daylight ☀️</span>
                    </button>

                    <button
                      onClick={() => setActiveSkyMode("night")}
                      className={`touch-manipulation px-3 py-1.5 sm:py-1 rounded-full font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        activeSkyMode === "night"
                          ? "bg-cyan-400 text-slate-950 shadow-md"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <Moon className="w-3.5 h-3.5 text-slate-950" />
                      <span>Night Moon 🌙</span>
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

              {/* AUTOMATIC DAY/NIGHT LOCAL TIME NOTICE */}
              <div className="mt-3 p-3 rounded-xl bg-slate-900/90 border border-white/10 text-xs font-mono text-slate-300 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-cyan-300">Local Sky Sync:</strong> It is currently <strong className="text-amber-300">{isDaytime ? "DAYTIME" : "NIGHTTIME"} ({localTimeStr || "Now"})</strong> in <span className="text-emerald-400 font-bold">{moonData.userLocationLabel}</span>. {isDaytime ? "The sky radar displays the Golden Solar Transit during daylight hours." : "The sky radar displays the live astronomical Supermoon at night."} You can also use the toggle to preview night moon or day sun anytime!
                </span>
              </div>

              {/* ── DAYTIME SKY CANVAS (SOLAR TRANSIT ☀️) ── */}
              {activeSkyMode === "day" && (
                <div className="my-auto py-5 flex flex-col items-center gap-6 text-center">
                  <div className="relative group cursor-pointer">
                    {/* Golden Sun Ambient Rays */}
                    <div className="absolute inset-0 rounded-full blur-3xl bg-amber-400/30 animate-pulse pointer-events-none" />

                    <motion.div
                      onClick={() => {
                        setCelestialClicks((prev) => prev + 1);
                        setQuoteIndex((prev) => (prev + 1) % dayQuotes.length);
                      }}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-amber-300 shadow-[0_0_80px_rgba(251,191,36,0.6)] flex items-center justify-center bg-gradient-to-tr from-amber-300 via-amber-400 to-yellow-200 select-none"
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.4)_0%,transparent_70%)] animate-pulse" />
                      
                      <div className="relative z-10 flex flex-col items-center justify-center p-3 text-slate-950">
                        <Sun className="w-8 h-8 text-slate-950 mb-1 animate-spin-slow" />
                        <span className="font-display font-extrabold text-xs tracking-wider uppercase drop-shadow">
                          DAYLIGHT TRANSIT
                        </span>
                        <span className="font-mono text-[11px] font-bold text-slate-900">
                          100% Solar Active
                        </span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Live Solar Telemetry Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full font-mono text-xs">
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-amber-500/20 flex flex-col gap-1 text-left">
                      <span className="text-[11px] text-slate-400 font-bold flex items-center gap-1">
                        <Sun className="w-3 h-3 text-amber-400" /> SKY CYCLE
                      </span>
                      <span className="text-xs font-bold text-amber-300">
                        {isDaytime ? "Daylight Transit ☀️" : "Dusk / Night 🌙"}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/90 border border-amber-500/20 flex flex-col gap-1 text-left">
                      <span className="text-[11px] text-slate-400 font-bold flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-400" /> SOLAR INTENSITY
                      </span>
                      <span className="text-xs font-bold text-emerald-400">
                        100% Daylight Peak
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/90 border border-amber-500/20 flex flex-col gap-1 text-left">
                      <span className="text-[11px] text-slate-400 font-bold flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-cyan-400" /> OBSERVER LOCATION
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

                  {/* Daytime Starlight Quote Box */}
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-amber-500/30 text-center max-w-md w-full shadow-lg">
                    <p className="font-serif-italic text-sm text-amber-200 leading-relaxed">
                      {currentQuotes[quoteIndex]}
                    </p>
                    <span className="block mt-1.5 text-[11px] font-mono text-slate-400">
                      Tap Sun to reflect ({celestialClicks} clicks)
                    </span>
                  </div>
                </div>
              )}

              {/* ── NIGHTTIME SKY CANVAS (CELESTIAL SUPERMOON 🌙) ── */}
              {activeSkyMode === "night" && (
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
                  <span>Close Celestial Sky</span>
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
