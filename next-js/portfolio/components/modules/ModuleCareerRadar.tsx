"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Radar, Briefcase, Calendar, MapPin, Building2, TrendingUp, Award, Zap, CheckCircle2 } from "lucide-react";
import { EXPERIENCE, type ExperienceItem } from "@/data/index";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export function ModuleCareerRadar() {
  const experiences = EXPERIENCE as ExperienceItem[];
  const [selectedIndex, setSelectedIndex] = useState(0);

  const activeExp = experiences[selectedIndex] || experiences[0];

  return (
    <div className="w-full flex flex-col gap-6 py-2">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Radar className="w-5 h-5 text-[var(--accent)] animate-spin-slow" />
          <span className="text-xs font-mono font-bold text-[var(--accent)] uppercase tracking-[0.2em]">
            MODULE 02 // CAREER FLIGHT RECORDER & RADAR
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[var(--text)]">
          Engineering Mission Trajectory
        </h2>
        <p className="text-sm text-[var(--text-muted)] max-w-2xl font-sans">
          Scrub through the flight recorder radar below to analyze career trajectories, team leadership, and production metrics.
        </p>
      </div>

      {/* Timeline Radar Scrubber */}
      <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-1)] p-4 sm:p-6 shadow-2xl backdrop-blur-xl flex flex-col gap-5">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
          <span className="text-xs font-mono text-[var(--accent)] font-bold">
            FLIGHT RECORDER SCRUBBER (CLICK MILESTONE)
          </span>
          <span className="text-xs font-mono text-emerald-400 font-bold">
            MISSION STATUS: ACTIVE
          </span>
        </div>

        {/* Milestone Buttons Scrubber Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {experiences.map((exp, idx) => {
            const isSelected = selectedIndex === idx;
            return (
              <button
                key={exp.id}
                onClick={() => setSelectedIndex(idx)}
                className={`p-4 rounded-xl border font-mono text-xs text-left transition-all cursor-pointer flex flex-col gap-1 ${
                  isSelected
                    ? "bg-[var(--surface-2)] border-[var(--accent)] text-[var(--text)] shadow-lg ring-1 ring-[var(--accent)]"
                    : "bg-[var(--surface-1)] border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[var(--accent)]">PHASE 0{idx + 1}</span>
                  <span className="text-[10px] opacity-80">{exp.period}</span>
                </div>
                <span className="font-display font-bold text-sm text-[var(--text)]">{exp.role}</span>
                <span className="text-[11px] text-sky-400">{exp.company}</span>
              </button>
            );
          })}
        </div>

        {/* Active Mission Log Box */}
        <SpotlightCard tilt="none" className="p-5 sm:p-6 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border)] pb-4">
            <div>
              <span className="px-3 py-1 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30 text-xs font-mono font-bold">
                {activeExp.period}
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-[var(--text)] mt-2">
                {activeExp.role}
              </h3>
              <span className="text-sm font-bold text-sky-400 flex items-center gap-1.5 font-sans mt-0.5">
                <Building2 className="w-4 h-4 text-sky-400" />
                {activeExp.company} · {activeExp.location}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] font-mono text-xs text-emerald-400 font-bold self-start sm:self-center">
              <span>IMPACT: 40% ETL SPEEDUP</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="text-xs font-mono font-bold text-[var(--accent)] uppercase tracking-wider">
              // MISSION LOG & ARCHITECTURAL SUMMARY
            </h4>
            <p className="text-sm text-[var(--text)] leading-relaxed font-sans bg-[var(--surface-2)] p-4 rounded-xl border border-[var(--border)]">
              {activeExp.description}
            </p>
          </div>

          <div className="flex flex-col gap-2 pt-1">
            <h4 className="text-xs font-mono font-bold text-[var(--text-muted)] uppercase tracking-wider">
              // STACK & COMPETENCIES
            </h4>
            <div className="flex flex-wrap gap-2">
              {activeExp.tags.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-lg bg-[var(--surface-2)] text-[var(--text)] border border-[var(--border)] text-xs font-mono font-medium flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
}
