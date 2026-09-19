"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Terminal, ArrowRight } from "lucide-react";

const GENERIC_BENCHMARKS = [
  {
    id: "asyncio-bench",
    title: "AsyncIO Event Loop Benchmark",
    desc: "Performance & latency benchmark evaluating Python asyncio event loops against multi-threaded worker pools for high-throughput pipeline execution.",
    tech: ["Python", "AsyncIO", "Multiprocessing", "Benchmarking"],
    output: "STATUS: COMPLETED [Event Loop Benchmark]\n> AsyncIO loop handling 10,000 concurrent tasks in 42ms.\n> Zero memory leak observed across 1M simulated execution iterations.",
  },
  {
    id: "ast-introspect",
    title: "AST Introspection & Cycle Detection",
    desc: "Abstract Syntax Tree (AST) visitor engine for static code graph cycle detection and safety classification.",
    tech: ["Python AST", "Static Analysis", "Graph Theory"],
    output: "STATUS: VERIFIED [Static Analysis Module]\n> AST Visitor parsing 500-line Python module in 8ms.\n> Cycle detection algorithm identifying recursive execution dependencies in 4ms.",
  },
  {
    id: "vector-rag",
    title: "Vector Retrieval & Confidence Scoring",
    desc: "Generic RAG retrieval benchmark evaluating vector search precision, token distance metrics, and confidence scoring filters.",
    tech: ["Vector DB", "RAG", "Python", "FastAPI"],
    output: "STATUS: BENCHMARKED [Vector Search Engine]\n> Retrieval precision: 96.8% top-k relevance score.\n> Query latency: 85ms across 100k indexed vector embeddings.",
  },
  {
    id: "hpo-engine",
    title: "Hyperparameter Search Optimization",
    desc: "Parallel hyperparameter optimization benchmark comparing Bayesian search vs Random Search across gradient boosted models.",
    tech: ["Python", "XGBoost", "Optuna", "MLOps"],
    output: "STATUS: OPTIMIZED [Hyperparameter Tuning]\n> Optuna Bayesian sampler evaluating 200 trials in 14.2s.\n> Automated search convergence achieved with 99.1% validation score.",
  },
];

export function MonographPlayLabExperiments() {
  const [activeExp, setActiveExp] = useState(GENERIC_BENCHMARKS[0]);

  return (
    <section
      id="section-playlab"
      className="relative w-full min-h-[85vh] rounded-3xl overflow-hidden border border-cyan-500/20 bg-slate-950 text-white shadow-2xl p-6 sm:p-12 lg:p-16 my-8 flex flex-col justify-between scroll-mt-24"
    >
      {/* Top Header Tag */}
      <div className="flex flex-col gap-2 border-b border-white/10 pb-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/60 text-cyan-300 text-xs font-mono font-bold tracking-widest w-max backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>06 // PLAYLAB — SYSTEMS BENCHMARKS</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-white tracking-tight">
          Systems &amp; Benchmarks.
        </h2>
        <p className="text-sm font-sans text-slate-400 max-w-xl">
          Open performance profiling, static code analysis benchmarks, and system optimization experiments.
        </p>
      </div>

      {/* Main Grid: Left Experiment List, Right Terminal Execution Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 my-auto py-8">
        
        {/* Left Column: Benchmark Navigation List */}
        <div className="lg:col-span-5 flex flex-col gap-3 font-mono">
          {GENERIC_BENCHMARKS.map((exp) => {
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
        </div>

        {/* Right Column: Live Terminal Output Panel */}
        <div className="lg:col-span-7 relative min-h-[360px] p-6 rounded-2xl bg-slate-900/90 border border-white/15 backdrop-blur-2xl shadow-2xl flex flex-col justify-between overflow-hidden">
          
          <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10">
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-300 font-bold">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>BENCHMARK STREAM OUTPUT</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono font-bold">
              VERIFIED
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeExp.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-4 relative z-10 my-auto py-4"
            >
              <h3 className="text-2xl font-display font-extrabold text-white">
                {activeExp.title}
              </h3>
              <p className="text-xs sm:text-sm font-sans text-slate-300 leading-relaxed bg-slate-950/80 p-4 rounded-xl border border-white/10">
                {activeExp.desc}
              </p>

              <div className="p-4 rounded-xl bg-slate-950/90 border border-cyan-500/30 font-mono text-xs text-cyan-300 shadow-inner">
                <span className="text-[10px] text-slate-500 font-bold uppercase block mb-1">// TELEMETRY &amp; BENCHMARK PROFILE</span>
                <pre className="whitespace-pre-wrap font-mono text-[11px] text-emerald-300">
                  {activeExp.output}
                </pre>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="pt-4 border-t border-white/10 text-xs font-mono text-slate-400 text-center relative z-10">
            PUBLIC SYSTEMS PROFILING &amp; PERFORMANCE BENCHMARKS
          </div>
        </div>

      </div>

      {/* Footer Tag */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-mono text-slate-400 relative z-10">
        <span>PUBLIC ENGINEERING BENCHMARKS</span>
        <span>06 / 07</span>
      </div>
    </section>
  );
}
