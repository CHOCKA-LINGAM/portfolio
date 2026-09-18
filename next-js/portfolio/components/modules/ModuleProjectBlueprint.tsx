"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Layers, ExternalLink, Github, Sparkles, Sliders, Code2, Database, Terminal, Cpu, Flame, Box, Check } from "lucide-react";
import { PROJECTS, type Project } from "@/data/index";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export function ModuleProjectBlueprint() {
  const projects = PROJECTS as Project[];
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [layerMode, setLayerMode] = useState<"schematic" | "benchmark" | "code">("schematic");
  const [concurrencyVal, setConcurrencyVal] = useState(5000);

  return (
    <div className="w-full flex flex-col gap-6 py-2">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-[var(--accent)]" />
          <span className="text-xs font-mono font-bold text-[var(--accent)] uppercase tracking-[0.2em]">
            MODULE 04 // ARCHITECTURAL BLUEPRINT DESK
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[var(--text)]">
          Systems & PyPI Projects
        </h2>
        <p className="text-sm text-[var(--text-muted)] max-w-2xl font-sans">
          Select a system blueprint below to inspect architectural schematics, test live load parameters, or view open-source code repositories.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6 items-start">
        {/* Left Column: Project Selector Cards */}
        <div className="flex flex-col gap-3">
          {projects.map((p, idx) => {
            const isSelected = selectedProject.id === p.id;
            return (
              <SpotlightCard
                key={p.id}
                onClick={() => setSelectedProject(p)}
                tilt={idx % 2 === 0 ? "left" : "right"}
                className={`cursor-pointer transition-all ${
                  isSelected
                    ? "ring-2 ring-[var(--accent)] bg-[var(--surface-2)] shadow-2xl"
                    : "hover:border-[var(--accent)]/50"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-[var(--accent)] font-bold">
                    BLUEPRINT 0{idx + 1}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/30">
                    {p.status}
                  </span>
                </div>
                <h3 className="text-lg font-display font-bold text-[var(--text)]">
                  {p.title}
                </h3>
                <p className="text-xs text-[var(--text-muted)] line-clamp-2 mt-1 font-sans">
                  {p.desc}
                </p>
              </SpotlightCard>
            );
          })}
        </div>

        {/* Right Column: Multi-Layer Blueprint Viewer */}
        <SpotlightCard tilt="none" className="p-5 sm:p-6 flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border)] pb-4">
            <div>
              <span className="text-xs font-mono text-[var(--accent)] font-bold">
                SCHEMATIC LAYERS
              </span>
              <h3 className="text-2xl font-display font-extrabold text-[var(--text)] mt-1">
                {selectedProject.title}
              </h3>
            </div>

            {/* Layer Mode Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] font-mono text-xs">
              <button
                onClick={() => setLayerMode("schematic")}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  layerMode === "schematic" ? "bg-[var(--accent)] text-slate-950 font-bold" : "text-[var(--muted)]"
                }`}
              >
                Schematic
              </button>
              <button
                onClick={() => setLayerMode("benchmark")}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  layerMode === "benchmark" ? "bg-[var(--accent)] text-slate-950 font-bold" : "text-[var(--muted)]"
                }`}
              >
                Benchmark
              </button>
            </div>
          </div>

          {layerMode === "schematic" ? (
            <div className="flex flex-col gap-3 font-sans text-xs">
              <div className="p-4 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] leading-relaxed text-sm text-[var(--text)]">
                {selectedProject.desc}
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <span className="font-mono text-xs text-[var(--accent)] font-bold uppercase">
                  // TECHNOLOGIES & STACK
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.stack.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1.5 rounded-lg bg-[var(--surface-2)] text-[var(--text)] border border-[var(--border)] font-mono text-xs font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4 font-mono text-xs">
              <div className="flex flex-col gap-2 p-4 rounded-xl bg-[var(--surface-2)] border border-[var(--border)]">
                <div className="flex justify-between font-bold">
                  <span>CONCURRENCY STRESS-TEST SLIDER</span>
                  <span className="text-[var(--accent)]">{concurrencyVal} req/sec</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="50000"
                  step="1000"
                  value={concurrencyVal}
                  onChange={(e) => setConcurrencyVal(Number(e.target.value))}
                  className="w-full accent-[var(--accent)] cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold flex flex-col">
                  <span>P99 LATENCY</span>
                  <span className="text-lg">{(12 + concurrencyVal / 1000).toFixed(1)} ms</span>
                </div>
                <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 font-bold flex flex-col">
                  <span>SYSTEM AVAILABILITY</span>
                  <span className="text-lg">99.99%</span>
                </div>
              </div>
            </div>
          )}

          {/* Action Links */}
          <div className="flex items-center gap-3 pt-3 border-t border-[var(--border)]">
            {selectedProject.github && (
              <a
                href={selectedProject.github}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] text-xs font-mono font-bold text-[var(--text)] hover:border-[var(--accent)] transition-all flex items-center gap-2"
              >
                <Github className="w-4 h-4 text-sky-400" />
                Source Repository
              </a>
            )}
            {selectedProject.link && (
              <a
                href={selectedProject.link}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl font-mono font-bold text-xs text-slate-950 flex items-center gap-2 transition-all shadow-md"
                style={{ backgroundColor: "var(--accent)" }}
              >
                <ExternalLink className="w-4 h-4" />
                View Production Site
              </a>
            )}
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
}
