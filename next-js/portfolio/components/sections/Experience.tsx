"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  MapPin,
  Building2,
  CheckCircle2,
  ChevronRight,
  Award,
  Zap,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { EXPERIENCE, type ExperienceItem } from "@/data/index";
import SectionLayout from "@/components/layout/SectionLayout";
import { SectionInsightBar } from "@/components/ui/NarratorStrip";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export default function Experience() {
  const experiences = EXPERIENCE as ExperienceItem[];

  return (
    <SectionLayout label="Career History" title="Professional Experience" scrollable={false} sectionNumber="02 / 05">
      <div className="w-full flex-1 flex flex-col gap-3 max-w-full">
        {/* ── SECTION INSIGHT BAR ── */}
        <SectionInsightBar
          tag="CAREER OVERVIEW"
          quote="5+ year career journey across enterprise tech leaders — building resilient data engines at iLink Digital & Standard Chartered."
        />
        
        {/* ─── Top Career Metrics Bar ─── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 p-2.5 sm:p-3 rounded-2xl bg-[var(--surface-1)] border border-[var(--border-strong)] backdrop-blur-md shadow-lg max-w-full flex-shrink-0">
          <div className="p-2.5 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] flex items-center gap-2.5 min-w-0">
            <Award className="w-4.5 h-4.5 text-[var(--accent)] flex-shrink-0" />
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-mono text-[var(--muted)] uppercase font-bold truncate">Total Exp.</span>
              <span className="text-xs sm:text-sm font-bold text-[var(--text)] font-mono truncate">5+ Years</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] flex items-center gap-2.5 min-w-0">
            <Building2 className="w-4.5 h-4.5 text-emerald-400 flex-shrink-0" />
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-mono text-[var(--muted)] uppercase font-bold truncate">Companies</span>
              <span className="text-xs sm:text-sm font-bold text-[var(--text)] font-sans truncate">3 Tech Enterprises</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] flex items-center gap-2.5 min-w-0">
            <TrendingUp className="w-4.5 h-4.5 text-amber-500 flex-shrink-0" />
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-mono text-[var(--muted)] uppercase font-bold truncate">Impact</span>
              <span className="text-xs sm:text-sm font-bold text-emerald-500 font-mono truncate">40% Latency Cut</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] flex items-center gap-2.5 min-w-0">
            <Zap className="w-4.5 h-4.5 text-purple-400 flex-shrink-0" />
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-mono text-[var(--text-muted)] uppercase font-bold truncate">Primary Domain</span>
              <span className="text-xs sm:text-sm font-bold text-[var(--text)] truncate font-sans">Backend, Data & AI</span>
            </div>
          </div>
        </div>

        {/* ─── CONTINUOUS CAREER TIMELINE CARDS ─── */}
        <div className="flex flex-col gap-4 w-full">
          {experiences.map((exp, idx) => {
            const isCurrent = exp.status?.toLowerCase().includes("active") || exp.period.toLowerCase().includes("present");

            return (
              <SpotlightCard
                key={exp.id}
                tilt={idx % 2 === 0 ? "left" : "right"}
                className="w-full p-5 sm:p-6 flex flex-col gap-3.5 relative"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border)] pb-3.5">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono border ${
                        isCurrent ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-sky-500/20 text-sky-300 border-sky-500/30"
                      }`}>
                        {exp.period}
                      </span>
                      <span className="text-xs font-mono text-[var(--text-muted)] flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[var(--muted)]" />
                        {exp.location}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-display font-extrabold text-[var(--text)] tracking-tight mt-1">
                      {exp.role}
                    </h3>
                    <span className="text-xs sm:text-sm font-bold text-sky-400 flex items-center gap-1.5 font-sans">
                      <Building2 className="w-4 h-4 text-sky-400" />
                      {exp.company}
                    </span>
                  </div>
                </div>

                {/* Role Description */}
                <div className="flex flex-col gap-1.5">
                  <h4 className="text-xs font-sans font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Role Summary & Architectural Impact
                  </h4>
                  <p className="text-xs sm:text-sm text-[var(--text)] leading-relaxed bg-[var(--surface-2)] p-4 rounded-xl border border-[var(--border)] font-sans">
                    {exp.description}
                  </p>
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-col gap-1.5 pt-1">
                  <h4 className="text-xs font-sans font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    Technologies & Core Competencies
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono px-3 py-1.5 rounded-lg bg-[var(--surface-2)] text-[var(--text)] border border-[var(--border)] flex items-center gap-1.5 font-medium shadow-sm hover:border-sky-400/50 transition-colors"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </SectionLayout>
  );
}


