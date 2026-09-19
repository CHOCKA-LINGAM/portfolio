"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Send, Moon, Sparkles, X, ArrowRight, CheckCircle2 } from "lucide-react";

export function MonographEasterEggs({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [cmdInput, setCmdInput] = useState("");
  const [outputLog, setOutputLog] = useState<string[]>([
    "ChockaOS v2.4.0 Interactive Console",
    "Type 'help', 'about', 'skills', 'coffee', or 'whoami'",
  ]);
  const [activeSecretToast, setActiveSecretToast] = useState<string | null>(null);

  const executeCmd = (commandText: string) => {
    const cmd = commandText.trim().toLowerCase();
    let res = "";
    if (cmd === "help") {
      res = "Available commands: help, about, skills, coffee, whoami, clear";
    } else if (cmd === "about") {
      res = "Chockalingam Balan — Technical Specialist @ iLink Digital Inc. 5+ Years Exp.";
    } else if (cmd === "skills") {
      res = "Python 3.11, FastAPI, PySpark, Databricks, AWS Bedrock, OpenAI, Docker, AKS.";
    } else if (cmd === "coffee") {
      res = "☕ Brewing fresh coffee... 100% developer energy restored!";
    } else if (cmd === "whoami") {
      res = "guest@chocka-dev :: You found Secret #01 (Interactive Terminal)!";
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

  const triggerToast = (msg: string) => {
    setActiveSecretToast(msg);
    setTimeout(() => setActiveSecretToast(null), 4000);
  };

  const renderContent = (isModal = false) => (
    <div className="flex flex-col justify-between w-full h-full relative z-10">
      {/* Background Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-[450px] h-[450px] bg-purple-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[140px]" />
      </div>

      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6 relative z-10">
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-950/60 text-purple-300 text-xs font-mono font-bold tracking-widest w-max backdrop-blur-md">
            <Moon className="w-3.5 h-3.5 text-amber-300" />
            <span>09 // EASTER EGGS — HIDDEN DELIGHTS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Hidden Delights.
          </h2>
          <p className="text-xs sm:text-sm font-sans text-slate-400">
            Small surprises for curious minds.
          </p>
        </div>

        {isModal && (
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-slate-900 border border-white/20 text-slate-300 hover:text-white transition-all cursor-pointer shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Secret Toast Alert */}
      <AnimatePresence>
        {activeSecretToast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3.5 rounded-xl bg-amber-950/90 border border-amber-500/50 text-amber-200 font-mono text-xs shadow-2xl flex items-center justify-between my-2 relative z-20"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
              <span>{activeSecretToast}</span>
            </div>
            <button onClick={() => setActiveSecretToast(null)} className="text-amber-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3 Interactive Cards matching Panel 09 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-auto py-6 relative z-10 font-mono">
        
        {/* Card 1: Interactive Terminal Prompt */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/30 backdrop-blur-2xl shadow-xl flex flex-col justify-between min-h-[320px]">
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
            {["help", "about", "skills", "coffee", "whoami", "clear"].map((cmd) => (
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
          onClick={() => triggerToast("✨ Secret #2 Unlocked! 'Curiosity is the engine of achievement. Great developers love surprises!'")}
          className="p-6 rounded-2xl bg-slate-900/90 border border-amber-500/30 backdrop-blur-2xl shadow-xl flex flex-col justify-between items-center text-center min-h-[320px] cursor-pointer hover:border-amber-400 transition-all group"
        >
          <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-lg group-hover:scale-110 transition-transform">
            <Sparkles className="w-8 h-8 animate-pulse" />
          </div>

          <div className="flex flex-col gap-2 my-auto">
            <h4 className="font-display font-extrabold text-base text-white">
              Navbar Secret Dot
            </h4>
            <p className="text-xs font-sans text-slate-300 leading-relaxed">
              Click the glowing dot in the top navigation bar 🤫
            </p>
            <span className="text-[11px] text-amber-300 font-mono font-bold mt-1">
              [ Click to Test Secret ]
            </span>
          </div>

          <span className="text-[11px] text-amber-300 font-bold">
            SECRET DISCOVERY // 02
          </span>
        </div>

        {/* Card 3: Moon Footer Discovery */}
        <div
          onClick={() => {
            triggerToast("🌙 Secret #3 Unlocked! 'Same sky. Bigger dreams. Keep building forward.'");
            const footer = document.querySelector("footer");
            if (footer) footer.scrollIntoView({ behavior: "smooth" });
          }}
          className="p-6 rounded-2xl bg-slate-900/90 border border-purple-500/30 backdrop-blur-2xl shadow-xl flex flex-col justify-between items-center text-center min-h-[320px] cursor-pointer hover:border-purple-400 transition-all group"
        >
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-purple-400 shadow-xl group-hover:scale-110 transition-transform">
            <Image
              src="/avatars/3d-cartoon.png"
              alt="Chocka Explorer Avatar"
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-2 my-auto">
            <h4 className="font-display font-extrabold text-base text-white">
              Moon Explorer
            </h4>
            <p className="text-xs font-sans text-slate-300 leading-relaxed">
              Scroll to the very bottom of any page 🌙
            </p>
            <span className="text-[11px] text-purple-300 font-mono font-bold mt-1">
              [ Click to Explore ]
            </span>
          </div>

          <span className="text-[11px] text-purple-300 font-bold">
            SECRET DISCOVERY // 03
          </span>
        </div>

      </div>

      {/* Footer Tag matching Panel 09 */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-mono text-slate-400 relative z-10">
        <span>Small surprises for curious minds.</span>
        <span>Thanks for exploring — C B</span>
      </div>
    </div>
  );

  return (
    <>
      {/* 1. Inline Panel 09 Section on page */}
      <section id="section-easteregg" className="relative w-full rounded-3xl overflow-hidden border border-purple-500/20 bg-slate-950 text-white shadow-2xl p-6 sm:p-12 my-8 flex flex-col justify-between scroll-mt-24">
        {renderContent(false)}
      </section>

      {/* 2. Modal Overlay Triggered by isOpen */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-2xl overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-5xl rounded-3xl overflow-hidden border border-purple-500/40 shadow-2xl bg-slate-950 p-6 sm:p-10 text-white my-auto"
            >
              {renderContent(true)}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
