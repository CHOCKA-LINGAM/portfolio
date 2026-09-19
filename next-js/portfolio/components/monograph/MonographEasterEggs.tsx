"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Send,
  Moon,
  X,
  ArrowRight,
  Sun,
  Activity,
  Zap,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";
import { Page } from "@/hooks/useNav";
import { getExperienceYearsLabel } from "@/data/index";

export function MonographEasterEggs({
  isOpen,
  onClose,
  onNavigate,
}: {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (sectionId: Page) => void;
}) {
  const [cmdInput, setCmdInput] = useState("");
  const [outputLog, setOutputLog] = useState<string[]>([
    "ChockaOS v2.4.0 Interactive Console",
    "Type 'help', 'about', 'skills', 'coffee', 'matrix', or 'whoami'",
  ]);

  // Card 2 & 3 state for inline cards
  const [isSecret2Revealed, setIsSecret2Revealed] = useState(false);
  const [isSecret3Revealed, setIsSecret3Revealed] = useState(false);

  // Interactive Moon Overlay state
  const [moonPhase, setMoonPhase] = useState<"supermoon" | "crescent" | "eclipse" | "new">("supermoon");
  const [clicksCount, setClicksCount] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);

  const secretQuotes = [
    "\"Curiosity is the engine of achievement. Great software is built with passion.\"",
    "\"Data flows like water. Systems are designed to give it direction.\"",
    "\"Simple code scale best. Precision over complexity.\"",
    "\"Thanks for exploring behind the scenes! Keep building forward.\"",
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const executeCmd = (commandText: string) => {
    const cmd = commandText.trim().toLowerCase();
    let res = "";
    if (cmd === "help") {
      res = "Available commands: help, about, skills, coffee, matrix, whoami, clear";
    } else if (cmd === "about") {
      res = `Chockalingam Balan — Technical Specialist @ iLink Digital Inc. ${getExperienceYearsLabel()} Years Exp.`;
    } else if (cmd === "skills") {
      res = "Python 3.11, PySpark, Databricks, AWS Bedrock, OpenAI, Docker, Microservices.";
    } else if (cmd === "coffee") {
      res = "☕ Brewing fresh coffee... 100% developer energy restored!";
    } else if (cmd === "matrix") {
      res = "01000011 01001000 01001111 01000011 01001011 01000001 // SYSTEM ACTIVE";
    } else if (cmd === "whoami") {
      res = "guest@chocka-dev :: You found the Secret Lunar Console!";
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

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cmdInput) return;
    executeCmd(cmdInput);
  };

  const handleMoonClick = () => {
    setClicksCount((prev) => prev + 1);
    setQuoteIndex((prev) => (prev + 1) % secretQuotes.length);
  };

  return (
    <>
      {/* ── INLINE SECTION AT BOTTOM OF PAGE ── */}
      <section id="section-easteregg" className="relative w-full rounded-3xl overflow-hidden border border-purple-500/20 bg-slate-950 text-white shadow-2xl p-6 sm:p-12 my-8 flex flex-col justify-between scroll-mt-24">
        
        {/* Background Glow */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-10 right-10 w-[450px] h-[450px] bg-purple-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[140px]" />
        </div>

        {/* Top Header */}
        <div className="flex flex-col gap-2 border-b border-white/10 pb-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-950/60 text-purple-300 text-xs font-mono font-bold tracking-widest w-max backdrop-blur-md">
            <Moon className="w-3.5 h-3.5 text-amber-300" />
            <span>EASTER EGGS</span>
          </div>
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight max-w-full break-words">
            Hidden Delights
          </h2>
        </div>

        {/* 3 Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-auto py-8 relative z-10 font-mono">
          
          {/* Card 1: Interactive Terminal Prompt */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/30 backdrop-blur-2xl shadow-xl flex flex-col justify-between min-h-[340px]">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs text-cyan-300 font-bold">
              <span className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                &gt; try typing...
              </span>
              <span className="text-[10px] text-slate-400">SECRET 01</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/90 border border-white/10 text-[11px] text-emerald-300 h-32 overflow-y-auto my-3 font-mono leading-relaxed">
              {outputLog.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>

            {/* Quick Command Chips */}
            <div className="flex flex-wrap gap-1 mb-3">
              {["help", "about", "skills", "coffee", "matrix", "clear"].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => executeCmd(cmd)}
                  className="px-2 py-0.5 rounded bg-slate-950 border border-cyan-500/30 text-[10px] text-cyan-300 hover:bg-cyan-500/20 transition-all cursor-pointer"
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
                placeholder="type help..."
                className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-white/20 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
              />
              <button type="submit" className="p-1.5 rounded-xl bg-cyan-500 text-slate-950 font-bold cursor-pointer">
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Card 2: Navbar Secret Dot Card */}
          <div
            onClick={() => setIsSecret2Revealed((prev) => !prev)}
            className={`p-6 rounded-2xl border backdrop-blur-2xl shadow-xl flex flex-col justify-between items-center text-center min-h-[340px] cursor-pointer transition-all ${
              isSecret2Revealed
                ? "bg-amber-950/90 border-amber-400 text-white shadow-[0_0_30px_rgba(251,191,36,0.3)]"
                : "bg-slate-900/90 border-amber-500/30 hover:border-amber-400"
            }`}
          >
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-lg">
              <Moon className="w-8 h-8 animate-pulse" />
            </div>

            <div className="flex flex-col gap-2 my-auto">
              <h4 className="font-display font-extrabold text-base text-white">
                Navbar Secret Dot
              </h4>
              <p className="text-xs font-sans text-slate-300 leading-relaxed">
                Click the glowing cyan dot in the top navigation header 🤫
              </p>

              {isSecret2Revealed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-3 rounded-xl bg-slate-950/90 border border-amber-400 text-amber-200 text-xs font-serif-italic mt-2"
                >
                  &quot;Curiosity is the engine of achievement. Great developers love surprises!&quot;
                </motion.div>
              ) : (
                <span className="text-[11px] text-amber-300 font-mono font-bold mt-1">
                  [ Click to inspect secret ]
                </span>
              )}
            </div>

            <span className="text-[11px] text-amber-300 font-bold">
              SECRET DISCOVERY // 02
            </span>
          </div>

          {/* Card 3: Moon Phase Explorer */}
          <div
            onClick={() => setIsSecret3Revealed((prev) => !prev)}
            className={`p-6 rounded-2xl border backdrop-blur-2xl shadow-xl flex flex-col justify-between items-center text-center min-h-[340px] cursor-pointer transition-all ${
              isSecret3Revealed
                ? "bg-purple-950/90 border-purple-400 text-white shadow-[0_0_30px_rgba(168,85,247,0.3)]"
                : "bg-slate-900/90 border-purple-500/30 hover:border-purple-400"
            }`}
          >
            <div className="w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/40 flex items-center justify-center text-purple-400 shadow-lg">
              <Moon className="w-8 h-8 animate-pulse" />
            </div>

            <div className="flex flex-col gap-2 my-auto">
              <h4 className="font-display font-extrabold text-base text-white">
                Interactive Lunar Mode
              </h4>
              <p className="text-xs font-sans text-slate-300 leading-relaxed">
                Click the moon phase widget in the footer bar 🌙
              </p>

              {isSecret3Revealed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-3 rounded-xl bg-slate-950/90 border border-purple-400 text-purple-200 text-xs font-serif-italic mt-2"
                >
                  &quot;Same sky. Bigger dreams. Keep building forward!&quot;
                </motion.div>
              ) : (
                <span className="text-[11px] text-purple-300 font-mono font-bold mt-1">
                  [ Click to explore moon ]
                </span>
              )}
            </div>

            <span className="text-[11px] text-purple-300 font-bold">
              SECRET DISCOVERY // 03
            </span>
          </div>

        </div>

        {/* Footer Tag */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-mono text-slate-400 relative z-10">
          <span>Small surprises for curious minds.</span>
          <span>Thanks for exploring — C B</span>
        </div>
      </section>

      {/* ── FULL-SCREEN INTERACTIVE LUNAR NIGHT SKY OVERLAY ── */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex flex-col justify-between bg-slate-950/95 backdrop-blur-2xl p-4 sm:p-8 text-white overflow-y-auto">
            
            {/* Ambient Starfield Effects */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
              <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[180px]" />
              <div className="absolute bottom-1/4 right-1/3 w-[600px] h-[600px] bg-cyan-500/15 rounded-full blur-[180px]" />
              <div className="absolute top-10 right-20 w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              <div className="absolute bottom-20 left-10 w-2 h-2 rounded-full bg-amber-300 animate-pulse" />
            </div>

            {/* Top Control Bar */}
            <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4 max-w-5xl mx-auto w-full">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300">
                  <Moon className="w-5 h-5 animate-pulse" />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-xs font-bold text-amber-300 uppercase tracking-widest">
                    INTERACTIVE LUNAR CANVAS
                  </span>
                  <span className="text-xs font-sans text-slate-400">
                    Real-time Moon Phase &amp; System Starlight
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="px-4 py-2 rounded-full bg-slate-900 border border-white/20 text-slate-200 hover:text-white hover:border-amber-400 transition-all cursor-pointer flex items-center gap-2 font-mono text-xs font-bold shadow-lg"
              >
                <span>Exit Night Sky</span>
                <X className="w-4 h-4 text-amber-400" />
              </button>
            </div>

            {/* Center Interactive 3D Moon & Controls */}
            <div className="relative z-10 my-auto py-8 max-w-4xl mx-auto w-full flex flex-col items-center gap-8">
              
              {/* Dynamic Interactive Moon Sphere */}
              <motion.div
                onClick={handleMoonClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative w-48 h-48 sm:w-64 sm:h-64 rounded-full cursor-pointer transition-all duration-700 flex items-center justify-center select-none shadow-[0_0_80px_rgba(251,191,36,0.35)] ${
                  moonPhase === "supermoon"
                    ? "bg-gradient-to-tr from-amber-100 via-slate-100 to-amber-300 border-4 border-amber-300 ring-8 ring-amber-400/20"
                    : moonPhase === "crescent"
                    ? "bg-gradient-to-tr from-slate-950 via-slate-900 to-amber-200 border-2 border-amber-400/60"
                    : moonPhase === "eclipse"
                    ? "bg-gradient-to-tr from-rose-950 via-red-900 to-amber-600 border-4 border-rose-500 shadow-[0_0_90px_rgba(244,63,94,0.5)]"
                    : "bg-slate-950 border-2 border-slate-700 shadow-inner"
                }`}
              >
                {/* Surface Crater Patterns */}
                <div className="absolute w-12 h-12 rounded-full bg-slate-400/10 top-8 left-10 blur-[1px]" />
                <div className="absolute w-16 h-16 rounded-full bg-slate-400/10 bottom-10 right-12 blur-[1px]" />
                <div className="absolute w-8 h-8 rounded-full bg-slate-400/10 top-16 right-16 blur-[1px]" />

                <div className="flex flex-col items-center justify-center text-center p-4">
                  <Moon className="w-6 h-6 text-slate-950 mb-1" />
                  <span className="font-display font-extrabold text-slate-950 text-sm tracking-wider uppercase">
                    {moonPhase}
                  </span>
                  <span className="font-mono text-[10px] text-slate-800 font-bold">
                    Click Moon ({clicksCount})
                  </span>
                </div>
              </motion.div>

              {/* Interactive Moon Phase Selector */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 font-mono text-xs">
                <button
                  onClick={() => setMoonPhase("supermoon")}
                  className={`px-4 py-2 rounded-2xl border transition-all cursor-pointer flex items-center gap-2 ${
                    moonPhase === "supermoon"
                      ? "bg-amber-400 text-slate-950 font-bold border-amber-300 shadow-lg"
                      : "bg-slate-900 text-slate-300 border-white/10 hover:border-amber-400"
                  }`}
                >
                  <span>Supermoon 🌕</span>
                </button>

                <button
                  onClick={() => setMoonPhase("crescent")}
                  className={`px-4 py-2 rounded-2xl border transition-all cursor-pointer flex items-center gap-2 ${
                    moonPhase === "crescent"
                      ? "bg-amber-400 text-slate-950 font-bold border-amber-300 shadow-lg"
                      : "bg-slate-900 text-slate-300 border-white/10 hover:border-amber-400"
                  }`}
                >
                  <span>Crescent 🌒</span>
                </button>

                <button
                  onClick={() => setMoonPhase("eclipse")}
                  className={`px-4 py-2 rounded-2xl border transition-all cursor-pointer flex items-center gap-2 ${
                    moonPhase === "eclipse"
                      ? "bg-rose-500 text-white font-bold border-rose-400 shadow-lg"
                      : "bg-slate-900 text-slate-300 border-white/10 hover:border-rose-400"
                  }`}
                >
                  <span>Eclipse 🔴</span>
                </button>

                <button
                  onClick={() => setMoonPhase("new")}
                  className={`px-4 py-2 rounded-2xl border transition-all cursor-pointer flex items-center gap-2 ${
                    moonPhase === "new"
                      ? "bg-slate-800 text-white font-bold border-slate-600 shadow-lg"
                      : "bg-slate-900 text-slate-300 border-white/10 hover:border-slate-500"
                  }`}
                >
                  <span>New Moon 🌑</span>
                </button>
              </div>

              {/* Dynamic Secret Quote Display */}
              <motion.div
                key={quoteIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 rounded-2xl bg-slate-900/90 border border-amber-500/30 text-center max-w-lg shadow-xl backdrop-blur-md"
              >
                <p className="font-serif-italic text-sm sm:text-base text-amber-200 leading-relaxed">
                  {secretQuotes[quoteIndex]}
                </p>
                <span className="font-mono text-[10px] text-slate-400 mt-2 block font-bold">
                  (Click the Moon sphere to cycle quotes)
                </span>
              </motion.div>

              {/* Quick Navigation Teleport Shortcuts */}
              <div className="flex flex-col gap-2 font-mono text-xs w-full max-w-md pt-2">
                <span className="text-slate-400 font-bold uppercase text-center">// QUICK SECTION TELEPORT</span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => {
                      onClose();
                      if (onNavigate) onNavigate("home");
                    }}
                    className="p-3 rounded-xl bg-slate-900 border border-white/10 text-cyan-300 hover:border-cyan-400 font-bold transition-all text-center"
                  >
                    Home 🏠
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      if (onNavigate) onNavigate("projects");
                    }}
                    className="p-3 rounded-xl bg-slate-900 border border-white/10 text-emerald-300 hover:border-emerald-400 font-bold transition-all text-center"
                  >
                    Projects 🚀
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      if (onNavigate) onNavigate("experience");
                    }}
                    className="p-3 rounded-xl bg-slate-900 border border-white/10 text-purple-300 hover:border-purple-400 font-bold transition-all text-center"
                  >
                    Experience 💼
                  </button>
                </div>
              </div>

            </div>

            {/* Bottom Footer Bar */}
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-white/10 pt-4 max-w-5xl mx-auto w-full font-mono text-xs text-slate-400">
              <span className="text-amber-300 font-bold">
                CHOCKA.dev // Secret Starlight Canvas Active
              </span>
              <span>Press ESC to return</span>
            </div>

          </div>
        )}
      </AnimatePresence>
    </>
  );
}
