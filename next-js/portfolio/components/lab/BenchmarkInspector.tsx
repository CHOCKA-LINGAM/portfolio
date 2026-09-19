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
    id: "etl-latency",
    title: "Databricks & PySpark Ingestion Latency",
    category: "Data Processing",
    before: "14.2 Minutes per 3.2TB Batch",
    after: "8.5 Minutes per 3.2TB Batch",
    improvement: "40% Runtime Speedup",
    tech: "PySpark Partitioning & Delta Lake ACID",
    summary: "Refactored legacy single-node processing into multi-tenant distributed PySpark partition nodes with automated Delta Lake caching.",
    impact: "$42k Annual Cloud Compute Savings",
  },
  {
    id: "qa-coverage",
    title: "Automated Microservice QA Suite",
    category: "QA & Reliability",
    before: "35% Manual Test Coverage",
    after: "90%+ Automated Coverage",
    improvement: "15x Regression Defect Cut",
    tech: "pytest-asyncio, Mock Fixtures & GitHub Actions",
    summary: "Engineered automated unit & integration test suites for FastAPI microservices with simulated async network latency.",
    impact: "Zero Critical Defect Leaks in Production",
  },
  {
    id: "api-throughput",
    title: "FastAPI Connection Pooling & Redis Caching",
    category: "Backend Microservices",
    before: "180ms Response Latency (SQL Bottleneck)",
    after: "sub-45ms Response Latency",
    improvement: "4x Throughput Gain",
    tech: "FastAPI, asyncpg, Redis LRU Cache",
    summary: "Replaced synchronous ORM queries with raw asyncpg connection pools and Redis cache invalidation hooks.",
    impact: "Sustained 5,000+ Requests/Sec peak load",
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
            Empirical before-and-after benchmarks measured across iLink Digital &amp; Standard Chartered systems.
          </p>
        </div>
        <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 w-max">
          EMPIRICAL METRICS
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
