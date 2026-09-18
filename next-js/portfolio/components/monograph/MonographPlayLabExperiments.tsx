"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Terminal, Code2, Cpu, Play, ArrowRight, CheckCircle2 } from "lucide-react";

const EXPERIMENTS = [
  {
    id: "llm",
    title: "LLM Playground",
    desc: "Interactive prompt evaluation sandbox with multi-model fallback execution.",
    tech: ["Python", "FastAPI", "OpenAI", "Bedrock"],
    output: "Input: 'Summarize BI Pipeline'\nOutput: 'Transformed 14 Tableau Prep flows to PySpark DAGs in 4.2s with zero schema loss.'",
  },
  {
    id: "analyzer",
    title: "Text Analyzer",
    desc: "High-throughput AST parser extracting SQL queries and schema dependencies.",
    tech: ["Python AST", "PySpark", "SQLGlot"],
    output: "Analysis: 12 CTEs parsed, 4 window functions extracted, 0 syntax errors.",
  },
  {
    id: "processor",
    title: "Image Processor",
    desc: "PepIris computer vision inference pipeline for automated retail shelf audit.",
    tech: ["OpenCV", "PyTorch", "Django REST"],
    output: "Detection: 98.4% accuracy across 12 product categories. Processing time: 140ms.",
  },
  {
    id: "miniapps",
    title: "Mini Apps & Microservices",
    desc: "Collection of lightweight asyncio tools and custom CLI helpers published on PyPI.",
    tech: ["pyflow-engine", "schema-shield", "CLI"],
    output: "PyPI Package pyflow-engine v1.4.0 — 100% test coverage.",
  },
];

export function MonographPlayLabExperiments() {
  const [activeExp, setActiveExp] = useState(EXPERIMENTS[0]);

  return (
    <section id="section-playlab" className="relative w-full min-h-[90vh] rounded-3xl overflow-hidden border border-cyan-500/20 bg-slate-950 text-white shadow-2xl p-6 sm:p-12 lg:p-16 my-8 flex flex-col justify-between scroll-mt-24">
      {/* Background Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-10 right-10 w-[550px] h-[550px] bg-purple-500/10 rounded-full blur-[160px]" />
      </div>

      {/* Top Header Tag */}
      <div className="flex flex-col gap-2 border-b border-white/10 pb-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/60 text-cyan-300 text-xs font-mono font-bold tracking-widest w-max backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>07 // PLAYLAB — EXPERIMENTS & IDEAS</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-white tracking-tight">
          Ideas in progress.
        </h2>
        <p className="text-sm font-sans text-slate-400">
          A space to experiment, learn and explore what&apos;s possible.
        </p>
      </div>

      {/* Main Grid: Left Experiment List, Right Spirograph Canvas matching Panel 07 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 my-auto py-8">
        
        {/* Left Column: Bullet List matching Panel 07 */}
        <div className="lg:col-span-5 flex flex-col gap-3 font-mono">
          {EXPERIMENTS.map((exp) => {
            const isSelected = activeExp.id === exp.id;
            return (
              <motion.button
                key={exp.id}
                onClick={() => setActiveExp(exp)}
                whileHover={{ x: 6 }}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between backdrop-blur-xl ${
                  isSelected
                    ? "bg-slate-900 border-cyan-400 text-white shadow-[0_0_25px_rgba(34,211,238,0.3)]"
                    : "bg-slate-950/60 border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${isSelected ? "bg-cyan-400 animate-ping" : "bg-slate-600"}`} />
                  <span className="font-bold text-sm">{exp.title}</span>
                </div>
                <ArrowRight className={`w-4 h-4 ${isSelected ? "text-cyan-400" : "text-slate-600"}`} />
              </motion.button>
            );
          })}

          <div className="p-4 rounded-2xl border border-dashed border-white/10 text-slate-500 font-mono text-xs text-center">
            • More coming soon...
          </div>
        </div>

        {/* Right Column: Animated Spirograph Vortex Mesh & Live Terminal Execution Output */}
        <div className="lg:col-span-7 relative min-h-[380px] p-6 rounded-2xl bg-slate-900/90 border border-white/15 backdrop-blur-2xl shadow-2xl flex flex-col justify-between overflow-hidden">
          
          {/* Animated SVG Spirograph Mesh Backdrop */}
          <div className="absolute inset-0 pointer-events-none opacity-20 flex items-center justify-center">
            <svg className="w-[360px] h-[360px] animate-spin" style={{ animationDuration: "35s" }} viewBox="0 0 200 200">
              <defs>
                <linearGradient id="spiroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
              <circle cx="100" cy="100" r="80" fill="none" stroke="url(#spiroGrad)" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="100" cy="100" r="60" fill="none" stroke="url(#spiroGrad)" strokeWidth="1" />
              <ellipse cx="100" cy="100" rx="80" ry="30" fill="none" stroke="#22d3ee" strokeWidth="1" transform="rotate(30 100 100)" />
              <ellipse cx="100" cy="100" rx="80" ry="30" fill="none" stroke="#a855f7" strokeWidth="1" transform="rotate(60 100 100)" />
              <ellipse cx="100" cy="100" rx="80" ry="30" fill="none" stroke="#34d399" strokeWidth="1" transform="rotate(120 100 100)" />
            </svg>
          </div>

          <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10">
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-300 font-bold">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>LIVE EXPERIMENT ENGINE</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono font-bold">
              ACTIVE
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeExp.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4 relative z-10 my-auto py-4"
            >
              <h3 className="text-2xl font-display font-extrabold text-white">
                {activeExp.title}
              </h3>
              <p className="text-xs sm:text-sm font-sans text-slate-300 leading-relaxed bg-slate-950/80 p-4 rounded-xl border border-white/10">
                {activeExp.desc}
              </p>

              <div className="p-4 rounded-xl bg-slate-950/90 border border-cyan-500/30 font-mono text-xs text-cyan-300 shadow-inner">
                <span className="text-[10px] text-slate-500 font-bold uppercase block mb-1">// EXECUTION STREAM OUTPUT</span>
                <pre className="whitespace-pre-wrap font-mono text-[11px] text-emerald-300">
                  {activeExp.output}
                </pre>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="pt-4 border-t border-white/10 text-xs font-serif-italic text-slate-400 text-center relative z-10">
            &quot;Same curiosity. Different playground.&quot;
          </div>
        </div>

      </div>

      {/* Footer Tag matching Panel 07 */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-mono text-slate-400 relative z-10">
        <span>PLAYLAB EXPERIMENTAL MODULES</span>
        <span>07 / 09</span>
      </div>
    </section>
  );
}
