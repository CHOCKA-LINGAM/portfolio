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

export default function Experience() {
  const experiences = EXPERIENCE as ExperienceItem[];
  const [selectedId, setSelectedId] = useState<string>(experiences[0]?.id || "ilink");

  const activeExp = experiences.find((e) => e.id === selectedId) || experiences[0];

  return (
    <SectionLayout label="Career History" title="Professional Experience" scrollable={false}>
      <div className="w-full flex-1 flex flex-col gap-3 max-w-full pb-4">
        
        {/* ─── Top Career Metrics Bar ─── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 p-2.5 sm:p-3 rounded-2xl bg-[#080b18]/90 border border-white/10 backdrop-blur-md shadow-lg max-w-full flex-shrink-0">
          <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2.5 min-w-0">
            <Award className="w-4 h-4 text-sky-400 flex-shrink-0" />
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-mono text-slate-400 uppercase font-bold truncate">Total Exp.</span>
              <span className="text-xs sm:text-sm font-bold text-white font-mono truncate">5+ Years</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2.5 min-w-0">
            <Building2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-mono text-slate-400 uppercase font-bold truncate">Companies</span>
              <span className="text-xs sm:text-sm font-bold text-white font-mono truncate">3 Tech Enterprises</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2.5 min-w-0">
            <TrendingUp className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-mono text-slate-400 uppercase font-bold truncate">Impact</span>
              <span className="text-xs sm:text-sm font-bold text-emerald-400 font-mono truncate">40% Latency Cut</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2.5 min-w-0">
            <Zap className="w-4 h-4 text-purple-400 flex-shrink-0" />
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-mono text-slate-400 uppercase font-bold truncate">Primary Domain</span>
              <span className="text-xs sm:text-sm font-bold text-slate-200 truncate">Backend, Data & AI</span>
            </div>
          </div>
        </div>

        {/* ─── Experience Timeline & Role Inspector ─── */}
        <div className="w-full rounded-2xl border border-white/10 bg-[#060812] p-4 sm:p-5 shadow-2xl flex flex-col lg:flex-row gap-4 max-w-full">
          
          {/* LEFT PANEL: Interactive Timeline Role Navigator */}
          <div className="w-full lg:w-[320px] xl:w-[350px] flex flex-col gap-2 flex-shrink-0">
            <div className="px-1 py-0.5 flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs font-mono text-sky-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-sky-400" />
                Career Timeline ({experiences.length})
              </span>
            </div>

            <div className="relative flex flex-col gap-2 pl-3 border-l-2 border-slate-800/80 my-1 max-h-[360px] lg:max-h-[460px] overflow-y-auto pr-1.5">
              {experiences.map((exp, idx) => {
                const isSelected = exp.id === activeExp.id;
                const isCurrent = exp.status?.toLowerCase().includes("active") || exp.period.toLowerCase().includes("present");

                return (
                  <motion.div
                    key={exp.id}
                    onClick={() => setSelectedId(exp.id)}
                    whileHover={{ x: 3 }}
                    className={`relative p-3.5 rounded-xl cursor-pointer border transition-all duration-200 flex items-center justify-between group max-w-full ${
                      isSelected
                        ? "bg-[#0f152a] border-sky-500/50 shadow-md ring-1 ring-sky-500/30"
                        : "bg-[#060812]/80 border-white/5 hover:border-white/15 hover:bg-[#0b0e20]"
                    }`}
                  >
                    {/* Timeline Node Icon */}
                    <span
                      className={`absolute -left-[19px] top-4 w-3.5 h-3.5 rounded-full border-2 transition-all ${
                        isSelected
                          ? "bg-sky-400 border-sky-300 ring-4 ring-sky-400/20"
                          : isCurrent
                          ? "bg-emerald-400 border-emerald-300 ring-2 ring-emerald-400/20"
                          : "bg-slate-700 border-slate-900"
                      }`}
                    />

                    <div className="flex flex-col gap-1 min-w-0 pr-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border ${
                          isCurrent ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" : "bg-slate-800/80 text-slate-400 border-slate-700/60"
                        }`}>
                          {isCurrent ? "ACTIVE ROLE" : exp.period.split("—")[1]?.trim() || "PREVIOUS"}
                        </span>
                      </div>
                      <h4 className={`text-xs sm:text-sm font-bold truncate ${isSelected ? "text-white" : "text-slate-300 group-hover:text-white"}`}>
                        {exp.role}
                      </h4>
                      <p className="text-xs text-sky-400 font-semibold truncate">
                        {exp.company}
                      </p>
                    </div>

                    <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-transform ${isSelected ? "text-sky-400 translate-x-0.5" : "text-slate-600 group-hover:text-slate-400"}`} />
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* RIGHT PANEL: Role Inspector Card */}
          <div className="flex-1 bg-[#050712] p-5 sm:p-6 rounded-xl border border-white/10 flex flex-col justify-between gap-4 relative max-w-full">
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
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 font-mono text-xs font-bold border border-sky-500/30">
                        {activeExp.period}
                      </span>
                      <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {activeExp.location}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                      {activeExp.role}
                    </h3>
                    <span className="text-xs sm:text-sm font-bold text-sky-400 flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-sky-400" />
                      {activeExp.company}
                    </span>
                  </div>
                </div>

                {/* Role Description */}
                <div className="flex flex-col gap-1.5">
                  <h4 className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Role Summary & Architectural Impact
                  </h4>
                  <p className="text-sm text-slate-200 leading-relaxed bg-[#090d1a] p-4 rounded-xl border border-white/10">
                    {activeExp.description}
                  </p>
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-col gap-1.5">
                  <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                    Technologies & Core Competencies
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeExp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white/[0.05] text-slate-100 border border-white/10 flex items-center gap-1.5 font-medium shadow-sm hover:border-sky-400/40 transition-colors"
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

