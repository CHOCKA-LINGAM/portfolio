"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Terminal, Send, Moon, Sparkles, X, ArrowRight } from "lucide-react";

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

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = cmdInput.trim().toLowerCase();
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
      res = "guest@chocka-dev :: You found the secret terminal easter egg!";
    } else if (cmd === "clear") {
      setOutputLog([]);
      setCmdInput("");
      return;
    } else {
      res = `Command not found: '${cmd}'. Try 'help'.`;
    }

    setOutputLog((prev) => [...prev, `> ${cmdInput}`, res]);
    setCmdInput("");
  };

  return (
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
          <span>09 // EASTER EGGS — HIDDEN DELIGHTS</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
          Hidden Delights.
        </h2>
        <p className="text-sm font-sans text-slate-400">
          Small surprises for curious minds.
        </p>
      </div>

      {/* 3 Interactive Cards matching Panel 09 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-auto py-8 relative z-10 font-mono">
        
        {/* Card 1: Interactive Terminal Prompt */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/30 backdrop-blur-2xl shadow-xl flex flex-col justify-between min-h-[300px]">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs text-cyan-300 font-bold">
            <span className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              &gt; try typing...
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/90 border border-white/10 text-[11px] text-emerald-300 h-36 overflow-y-auto my-3 font-mono">
            {outputLog.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>

          <form onSubmit={handleCommand} className="flex items-center gap-2">
            <input
              type="text"
              value={cmdInput}
              onChange={(e) => setCmdInput(e.target.value)}
              placeholder="type help..."
              className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-white/20 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
            />
            <button type="submit" className="p-1.5 rounded-xl bg-cyan-500 text-slate-950 font-bold">
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Card 2: Navbar Secret Dot */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-amber-500/30 backdrop-blur-2xl shadow-xl flex flex-col justify-between items-center text-center min-h-[300px]">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-lg">
            <Sparkles className="w-8 h-8 animate-pulse" />
          </div>

          <div className="flex flex-col gap-2 my-auto">
            <h4 className="font-display font-extrabold text-base text-white">
              Navbar Secret Dot
            </h4>
            <p className="text-xs font-sans text-slate-300 leading-relaxed">
              Click the glowing dot in the top navigation bar 🤫
            </p>
          </div>

          <span className="text-[11px] text-amber-300 font-bold">
            SECRET DISCOVERY // 02
          </span>
        </div>

        {/* Card 3: Moon Footer Discovery */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-purple-500/30 backdrop-blur-2xl shadow-xl flex flex-col justify-between items-center text-center min-h-[300px]">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-purple-400 shadow-xl">
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
    </section>
  );
}
