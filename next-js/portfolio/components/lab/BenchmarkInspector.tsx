"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, ShieldCheck, Zap, ArrowRight, Check } from "lucide-react";

interface BenchmarkCase {
  id: string;
  title: string;
  category: string;
  before: string;
  after: string;
  improvement: string;
  tech: string;
  summary: string;
  impact: string;
}

const BENCHMARKS: BenchmarkCase[] = [
  {
    id: "claims-api",
    title: "AI Claims API Response Time",
    category: "Backend & AI",
    before: "25 seconds per claims request",
    after: "10 seconds per claims request",
    improvement: "25s → 10s",
    tech: "Python, FastAPI, AI-assisted claims workflow",
    summary: "Reworked the AI claims API request path to cut end-to-end response time.",
    impact: "Faster claims turnaround for end users",
  },
  {
    id: "qa-cycle",
    title: "QA Validation Cycle",
    category: "QA & Reliability",
    before: "Manual validation cycles",
    after: "Direct model-validation workflow",
    improvement: ">90% cycle-time cut",
    tech: "Django, model validation",
    summary: "Replaced manual QA passes with direct model-validation workflows on the multi-tenant Django platform.",
    impact: "10–12 markets validated on one codebase",
  },
  {
    id: "dag-planning",
    title: "DAG Planning API",
    category: "Data Platform",
    before: "Planning handled outside the API",
    after: "Sub-5s DAG planning API",
    improvement: "sub-5s planning",
    tech: "Python, FastAPI, PySpark, Azure Databricks",
    summary: "Built a planning API for pipeline DAGs as part of migrating legacy Pandas pipelines to distributed PySpark.",
    impact: "Faster pipeline setup and scheduling",
  },
];

export const BenchmarkInspector: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<BenchmarkCase>(BENCHMARKS[0]);

  return (
    <div className="w-full flex flex-col gap-4 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-1)] p-4 sm:p-6 shadow-2xl backdrop-blur-xl font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[var(--border)] pb-3.5 gap-2">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <h3 className="text-base sm:text-lg font-bold text-[var(--text)]">
              Engineering Benchmark Inspector
            </h3>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            Before-and-after results taken from my resume.
          </p>
        </div>
        <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 w-max">
          RESUME-BACKED
        </span>
      </div>

      {/* Case Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {BENCHMARKS.map((b) => (
          <button
            key={b.id}
            onClick={() => setSelectedCase(b)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border flex items-center gap-2 cursor-pointer ${
              selectedCase.id === b.id
                ? "bg-sky-500/20 text-sky-300 border-sky-400 shadow-md font-bold"
                : "bg-[var(--surface-2)] text-[var(--muted)] border-[var(--border)] hover:text-[var(--text)]"
            }`}
          >
            <span>{b.title}</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-mono text-[10px]">
              {b.improvement}
            </span>
          </button>
        ))}
      </div>

      {/* Benchmark Display Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCase.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18 }}
          className="p-5 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] shadow-xl flex flex-col gap-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border)] pb-3">
            <div>
              <span className="text-xs font-mono text-sky-400 font-bold uppercase tracking-wider block">
                {selectedCase.category}
              </span>
              <h4 className="text-lg font-extrabold text-[var(--text)] mt-0.5">
                {selectedCase.title}
              </h4>
            </div>
            <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-mono font-bold text-xs border border-emerald-500/40 w-max">
              ⚡ {selectedCase.improvement}
            </span>
          </div>

          {/* Before vs After Metric Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex flex-col gap-1">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">
                BEFORE (Legacy Architecture)
              </span>
              <span className="text-sm font-bold text-[var(--text)]">{selectedCase.before}</span>
            </div>

            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col gap-1">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">
                AFTER (Optimized Production Architecture)
              </span>
              <span className="text-sm font-bold text-[var(--text)]">{selectedCase.after}</span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 pt-1">
            <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
              Technical Optimization Strategy:
            </span>
            <p className="text-xs sm:text-sm text-[var(--text)] leading-relaxed">
              {selectedCase.summary}
            </p>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--surface-1)] border border-[var(--border)] text-xs font-mono">
            <span className="text-[var(--muted)]">Stack: {selectedCase.tech}</span>
            <span className="text-emerald-400 font-bold">Impact: {selectedCase.impact}</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
