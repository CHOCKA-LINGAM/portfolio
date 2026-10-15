"use client";

import React, { useState } from "react";
import { ShieldCheck, AlertTriangle, ShieldAlert } from "lucide-react";

type Level = "SAFE" | "WARNING" | "BREAKING";

const CHANGES: { label: string; level: Level; reason: string }[] = [
  { label: "Add a nullable column", level: "SAFE", reason: "Existing readers and writers keep working; the new column is optional." },
  { label: "Update a column description", level: "SAFE", reason: "Metadata only. No data or contract changes." },
  { label: "Widen a type (INT → BIGINT)", level: "WARNING", reason: "Existing data still fits, but strictly-typed consumers should be checked." },
  { label: "Make a column required", level: "WARNING", reason: "Writers that still send nulls will start to fail." },
  { label: "Rename a column", level: "BREAKING", reason: "Every downstream query and job referencing the old name breaks." },
  { label: "Drop a column", level: "BREAKING", reason: "Consumers that read the column lose data or fail outright." },
];

const STYLE: Record<Level, { box: string; icon: React.ReactNode }> = {
  SAFE: { box: "bg-emerald-50 border-emerald-300 text-emerald-900", icon: <ShieldCheck className="w-4 h-4 text-emerald-600" /> },
  WARNING: { box: "bg-amber-50 border-amber-300 text-amber-900", icon: <AlertTriangle className="w-4 h-4 text-amber-600" /> },
  BREAKING: { box: "bg-rose-50 border-rose-300 text-rose-900", icon: <ShieldAlert className="w-4 h-4 text-rose-600" /> },
};

// Illustrative playground for the SAFE / WARNING / BREAKING idea behind schema-shield
export function SchemaShieldDemo() {
  const [idx, setIdx] = useState(0);
  const active = CHANGES[idx];
  const style = STYLE[active.level];

  return (
    <div className="flex flex-col gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-[11px] font-mono font-bold text-slate-600 uppercase tracking-wider">
          Try it: pick a schema change
        </span>
        <span className="text-[11px] font-mono text-slate-500">illustrative demo</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {CHANGES.map((c, i) => (
          <button
            key={c.label}
            onClick={() => setIdx(i)}
            aria-pressed={i === idx}
            className={`touch-manipulation px-3 py-1.5 rounded-lg border text-xs font-mono font-semibold transition-all cursor-pointer ${
              i === idx
                ? "bg-slate-950 text-white border-slate-950 shadow-md"
                : "bg-white text-slate-700 border-slate-200 hover:border-slate-400"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className={`flex items-start gap-2.5 p-3 rounded-xl border ${style.box}`} aria-live="polite">
        <span className="mt-0.5 shrink-0">{style.icon}</span>
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-mono font-extrabold tracking-wide">{active.level}</span>
          <span className="text-xs font-sans leading-relaxed">{active.reason}</span>
        </div>
      </div>

      <p className="text-[11px] font-sans text-slate-500 leading-relaxed">
        A simplified view of how a compatibility guardrail thinks. The real package classifies changes for Databricks Delta Lake and PostgreSQL pipelines; its exact rules may differ.
      </p>
    </div>
  );
}
