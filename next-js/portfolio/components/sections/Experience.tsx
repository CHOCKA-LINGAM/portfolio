"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Calendar,
  MapPin,
  Building2,
  CheckCircle2,
  ChevronRight,
  Award,
  Zap,
  TrendingUp,
} from "lucide-react";
import { EXPERIENCE, type ExperienceItem } from "@/data/index";
import SectionLayout from "@/components/layout/SectionLayout";

export default function Experience() {
  const experiences = EXPERIENCE as ExperienceItem[];
  const [selectedId, setSelectedId] = useState<string>(experiences[0]?.id || "ilink");

  const activeExp = experiences.find((e) => e.id === selectedId) || experiences[0];

  return (
    <SectionLayout label="Career History" title="Professional Experience" scrollable={false}>
      <div className="w-full flex-1 min-h-0 flex flex-col gap-3.5">
        
        {/* ─── Top Career Summary Metrics Bar ─── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-3 rounded-2xl bg-[#080b18]/90 border border-white/10 backdrop-blur-md shadow-xl">
          <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2.5">
            <Award className="w-4 h-4 text-sky-400 flex-shrink-0" />
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Total Exp.</span>
              <span className="text-xs font-bold text-white font-mono">5+ Years</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2.5">
            <Building2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Companies</span>
              <span className="text-xs font-bold text-white font-mono">3 Tech Enterprises</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2.5">
            <TrendingUp className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Impact</span>
              <span className="text-xs font-bold text-emerald-400 font-mono">40% Latency Cut</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2.5">
            <Zap className="w-4 h-4 text-purple-400 flex-shrink-0" />
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Primary Domain</span>
              <span className="text-xs font-bold text-slate-200">Backend, Data & AI</span>
            </div>
          </div>
        </div>

        {/* ─── 100% Fit Split-Pane Experience Workspace (ZERO SCROLL, ZERO OVERFLOW) ─── */}
        <div className="w-full h-[450px] sm:h-[480px] rounded-2xl border border-white/10 bg-[#060812] shadow-2xl overflow-hidden flex flex-col md:flex-row">
          
          {/* LEFT PANEL: Role Navigator (1/3 Width) */}
          <div className="w-full md:w-[310px] lg:w-[340px] bg-[#090c18] border-r border-white/10 p-3 flex flex-col gap-2 overflow-y-auto flex-shrink-0">
            <div className="px-2 py-1 flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-[11px] font-mono text-sky-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-sky-400" />
                Career Roles ({experiences.length})
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              {experiences.map((exp) => {
                const isSelected = exp.id === activeExp.id;
                const isCurrent = exp.status.toLowerCase().includes("active") || exp.period.toLowerCase().includes("present");

                return (
                  <motion.div
                    key={exp.id}
                    onClick={() => setSelectedId(exp.id)}
                    whileHover={{ x: 2 }}
                    className={`p-3 rounded-xl cursor-pointer border transition-all duration-200 flex items-center justify-between group ${
                      isSelected
                        ? "bg-[#0f152a] border-sky-500/40 shadow-lg ring-1 ring-sky-500/30"
                        : "bg-[#060812]/80 border-white/5 hover:border-white/15 hover:bg-[#0b0e20]"
                    }`}
                  >
                    <div className="flex flex-col gap-1 min-w-0 pr-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold border ${
                          isCurrent ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-slate-800 text-slate-400 border-slate-700"
                        }`}>
                          {isCurrent ? "CURRENT" : "PREVIOUS"}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 truncate">{exp.period}</span>
                      </div>
                      <h4 className={`text-xs font-bold truncate ${isSelected ? "text-white" : "text-slate-300 group-hover:text-white"}`}>
                        {exp.role}
                      </h4>
                      <p className="text-[11px] text-sky-400 font-semibold truncate">
                        {exp.company}
                      </p>
                    </div>

                    <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-transform ${isSelected ? "text-sky-400 translate-x-0.5" : "text-slate-600 group-hover:text-slate-400"}`} />
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* RIGHT PANEL: Role Inspector (2/3 Width) */}
          <div className="flex-1 bg-[#050712] p-5 sm:p-6 flex flex-col justify-between overflow-y-auto relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeExp.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="flex flex-col gap-4"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3.5">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-mono text-[10px] font-bold border border-sky-500/30">
                        {activeExp.period}
                      </span>
                      <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {activeExp.location}
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-white tracking-tight mt-0.5">
                      {activeExp.role}
                    </h3>
                    <span className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-sky-400" />
                      {activeExp.company}
                    </span>
                  </div>
                </div>

                {/* Role Description */}
                <div className="flex flex-col gap-1.5">
                  <h4 className="text-[11px] font-mono font-bold text-sky-400 uppercase tracking-widest">
                    Role Summary & Architectural Impact
                  </h4>
                  <p className="text-xs text-slate-200 leading-relaxed bg-[#090d1a] p-3.5 rounded-xl border border-white/10">
                    {activeExp.description}
                  </p>
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-col gap-1.5">
                  <h4 className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                    Technologies & Core Competencies
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeExp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono px-2.5 py-1 rounded-lg bg-white/[0.05] text-slate-100 border border-white/10 flex items-center gap-1.5 font-medium shadow-sm"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
}
