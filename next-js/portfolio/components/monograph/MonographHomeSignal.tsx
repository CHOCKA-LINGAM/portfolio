"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, Sparkles, Terminal, Activity } from "lucide-react";

export function MonographHomeSignal({
  onExplore,
}: {
  onExplore: () => void;
}) {
  return (
    <section className="relative w-full min-h-[92vh] rounded-3xl overflow-hidden border border-slate-200 bg-[#f8fafc] text-slate-900 shadow-2xl p-6 sm:p-12 lg:p-16 my-4 flex flex-col justify-between">
      {/* ── TOP TAG ── */}
      <div className="flex items-center justify-between w-full relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-300 bg-white text-slate-700 text-xs font-mono font-bold tracking-wider shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Software Engineer • Backend • Data • AI</span>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-500">
          <Activity className="w-3.5 h-3.5 text-cyan-600 animate-spin" style={{ animationDuration: "10s" }} />
          <span>System Signal // Online</span>
        </div>
      </div>

      {/* ── MAIN HERO GRID: LEFT HEADLINE, RIGHT BRANCHING FLOW VECTOR ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-10 relative z-10">
        
        {/* Left Column: Giant Headline */}
        <div className="lg:col-span-7 flex flex-col gap-6 max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-display font-extrabold tracking-tight text-slate-950 leading-[0.95]"
          >
            I build <br />
            systems <br />
            that matter.
          </motion.h1>

          <p className="text-base sm:text-xl font-sans text-slate-600 leading-relaxed font-normal">
            Turning complex problems into simple, scalable solutions.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onExplore}
              className="px-7 py-3.5 rounded-2xl font-mono font-bold text-xs text-white bg-slate-950 hover:bg-slate-800 transition-all shadow-xl flex items-center gap-2 cursor-pointer"
            >
              Explore Topology <ArrowDown className="w-3.5 h-3.5 text-cyan-400" />
            </button>
            <span className="text-xs font-mono text-slate-500">
              Chockalingam Balan — 5+ Years Exp
            </span>
          </div>
        </div>

        {/* Right Column: Dynamic SVG Branching Flow Lines to 4 Nodes matching Panel 01 */}
        <div className="lg:col-span-5 relative w-full h-[320px] sm:h-[400px] flex items-center justify-center">
          
          {/* Curved SVG Line Harness */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 350" fill="none">
            <defs>
              <linearGradient id="flowGrad1" x1="0%" y1="50%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#020617" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="flowGrad2" x1="0%" y1="50%" x2="100%" y2="33%">
                <stop offset="0%" stopColor="#020617" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="flowGrad3" x1="0%" y1="50%" x2="100%" y2="66%">
                <stop offset="0%" stopColor="#020617" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="flowGrad4" x1="0%" y1="50%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#020617" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#d97706" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            {/* Main Source Stem */}
            <path d="M 20,280 C 60,280 80,175 140,175" stroke="#020617" strokeWidth="3" strokeLinecap="round" />

            {/* Branch to Data */}
            <path d="M 140,175 C 220,175 260,45 330,45" stroke="url(#flowGrad1)" strokeWidth="2.5" />
            {/* Branch to AI */}
            <path d="M 140,175 C 220,175 260,125 330,125" stroke="url(#flowGrad2)" strokeWidth="2.5" />
            {/* Branch to Backend */}
            <path d="M 140,175 C 220,175 260,215 330,215" stroke="url(#flowGrad3)" strokeWidth="2.5" />
            {/* Branch to Impact */}
            <path d="M 140,175 C 220,175 260,305 330,305" stroke="url(#flowGrad4)" strokeWidth="2.5" />
          </svg>

          {/* Node Pills Floating at Right Coordinates */}
          <div className="absolute right-4 top-[8%] flex items-center gap-2.5 p-2 px-3.5 rounded-full bg-white border border-sky-200 shadow-md font-mono text-xs font-bold text-sky-950">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-ping" />
            <span>Data</span>
          </div>

          <div className="absolute right-4 top-[31%] flex items-center gap-2.5 p-2 px-3.5 rounded-full bg-white border border-purple-200 shadow-md font-mono text-xs font-bold text-purple-950">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
            <span>AI</span>
          </div>

          <div className="absolute right-4 top-[56%] flex items-center gap-2.5 p-2 px-3.5 rounded-full bg-white border border-emerald-200 shadow-md font-mono text-xs font-bold text-emerald-950">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Backend</span>
          </div>

          <div className="absolute right-4 top-[81%] flex items-center gap-2.5 p-2 px-3.5 rounded-full bg-white border border-amber-200 shadow-md font-mono text-xs font-bold text-amber-950">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>Impact</span>
          </div>

        </div>

      </div>

      {/* ── FOOTER BAR ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-6 border-t border-slate-200 text-xs font-mono text-slate-500 relative z-10">
        <span>Chennai, India</span>

        <button
          onClick={onExplore}
          className="flex items-center gap-1.5 text-slate-900 font-bold hover:text-cyan-600 transition-colors cursor-pointer self-center"
        >
          <span>Scroll to explore</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </button>

        <span>Always Learning // Always Building</span>
      </div>
    </section>
  );
}
