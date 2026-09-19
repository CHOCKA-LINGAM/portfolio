"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Milestone, Building2, CheckCircle2, ArrowUpRight, ChevronDown, Layers, ChevronRight } from "lucide-react";
import { EXPERIENCE, type ExperienceItem } from "@/data/index";

function TechCapabilitiesFixedPopover({ tags }: { tags: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const previewTech = tags.slice(0, 3).join(" • ");
  const remainingCount = Math.max(0, tags.length - 3);

  return (
    <div
      className="relative flex flex-col gap-1.5"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider">
          // TECH &amp; CAPABILITIES
        </span>
        <span className="text-[10px] font-mono text-emerald-600 font-bold flex items-center gap-1">
          <Layers className="w-3 h-3 text-emerald-500" />
          Hover to see all ({tags.length})
        </span>
      </div>

      <div
        onClick={() => setIsOpen(!isOpen)}
        className="group relative cursor-pointer p-3.5 rounded-xl bg-slate-950 text-slate-100 border border-slate-800 transition-all hover:border-emerald-500/50 hover:shadow-lg flex items-center justify-between gap-3 shadow-md select-none"
      >
        <div className="flex items-center gap-2.5 min-w-0 overflow-hidden">
          <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-ping" />
          <p className="font-mono text-xs text-slate-200 truncate font-medium">
            {previewTech}
          </p>
        </div>

        <div className="shrink-0 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-mono font-bold flex items-center gap-1.5 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all">
          <span>+{remainingCount > 0 ? remainingCount : tags.length} more</span>
          <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.96 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute bottom-full left-0 right-0 mb-2 z-50 p-4 rounded-2xl bg-slate-950 text-white border border-slate-700 shadow-2xl backdrop-blur-xl flex flex-col gap-3 pointer-events-auto"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-emerald-400" />
                  TECH STACK &amp; CAPABILITIES ({tags.length})
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  Hover to inspect
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                {tags.map((tech) => (
                  <div
                    key={tech}
                    className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/90 border border-slate-800/90 text-xs font-mono text-slate-200"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{tech}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function MonographExperienceJourney() {
  const experiences = EXPERIENCE as ExperienceItem[];
  const [selectedIdx, setSelectedIdx] = useState(0);

  const activeExp = experiences[selectedIdx] || experiences[0];

  return (
    <section id="section-experience" className="relative w-full min-h-[85vh] rounded-3xl overflow-hidden border border-slate-200 bg-[#f8fafc] text-slate-900 shadow-2xl p-5 sm:p-10 lg:p-16 my-8 flex flex-col justify-between scroll-mt-24">
      {/* Header Bar */}
      <div className="flex flex-col gap-2 border-b border-slate-200 pb-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-300 bg-white text-slate-700 text-xs font-mono font-bold tracking-widest w-max shadow-sm">
          <Milestone className="w-3.5 h-3.5 text-emerald-600" />
          <span>03 // EXPERIENCE</span>
        </div>
        <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-extrabold text-slate-950 tracking-tight leading-tight max-w-full break-words">
          Experience
        </h2>
      </div>

      {/* Main Content Layout */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-auto py-8">
        
        {/* Left Column */}
        <div className="lg:col-span-6 flex flex-col gap-3.5 relative">
          
          <svg className="hidden lg:block absolute left-6 top-4 bottom-4 w-1 pointer-events-none">
            <line x1="0" y1="0" x2="0" y2="100%" stroke="#020617" strokeWidth="2" strokeDasharray="4 4" opacity="0.3" />
          </svg>

          {experiences.map((exp, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <div key={exp.id} className="flex flex-col gap-2">
                <motion.button
                  onClick={() => setSelectedIdx(idx)}
                  whileHover={{ x: 4 }}
                  className={`relative z-10 p-4 rounded-2xl border text-left font-mono transition-all cursor-pointer flex items-center justify-between shadow-md ${
                    isSelected
                      ? "bg-slate-950 text-white border-slate-950 shadow-xl"
                      : "bg-white text-slate-800 border-slate-200 hover:border-slate-400 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3.5">
                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold w-max shrink-0 ${
                      isSelected ? "bg-emerald-500 text-slate-950" : "bg-slate-100 text-slate-700"
                    }`}>
                      {exp.period}
                    </span>

                    <div className="flex flex-col truncate">
                      <span className="font-display font-extrabold text-sm sm:text-base text-slate-950 truncate max-w-[260px] sm:max-w-full font-bold group-hover:text-cyan-600" style={{ color: isSelected ? "#ffffff" : undefined }}>
                        {exp.role}
                      </span>
                      <span className={`text-xs font-sans font-medium flex items-center gap-1.5 ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                        <Building2 className="w-3 h-3 text-emerald-500 shrink-0" />
                        {exp.company}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <ChevronDown className={`w-4 h-4 lg:hidden transition-transform duration-200 ${isSelected ? "rotate-180 text-emerald-400" : "text-slate-400"}`} />
                    <ArrowUpRight className={`hidden lg:block w-4 h-4 ${isSelected ? "text-emerald-400" : "text-slate-400"}`} />
                  </div>
                </motion.button>

                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="lg:hidden overflow-visible p-5 rounded-2xl bg-white border border-slate-200 shadow-xl flex flex-col gap-4 font-sans text-xs text-slate-700 my-1"
                    >
                      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                        <span className="px-2.5 py-1 rounded-full bg-slate-950 text-white font-mono font-bold text-[10px]">
                          {exp.period}
                        </span>
                        <span className="font-mono font-bold text-emerald-600 text-xs">
                          {exp.status}
                        </span>
                      </div>

                      <p className="leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-slate-800">
                        {exp.description}
                      </p>

                      <TechCapabilitiesFixedPopover tags={exp.tags} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Right Column (Desktop View >= lg) */}
        <div className="hidden lg:flex lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-2xl flex-col justify-between min-h-[420px] gap-6 relative">
          <div className="flex flex-col gap-3 border-b border-slate-200 pb-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-slate-950 text-white text-xs font-mono font-bold">
                {activeExp.period}
              </span>
              <span className="text-xs font-mono font-bold text-emerald-600">
                {activeExp.status}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-950">
              {activeExp.role}
            </h3>
            <span className="text-xs font-bold text-slate-600 flex items-center gap-2 font-sans">
              <Building2 className="w-4 h-4 text-slate-700" />
              {activeExp.company} · {activeExp.location}
            </span>
          </div>

          <p className="text-xs sm:text-sm font-sans text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
            {activeExp.description}
          </p>

          <TechCapabilitiesFixedPopover tags={activeExp.tags} />
        </div>

      </div>

      {/* Footer Tag */}
      <div className="flex items-center justify-end pt-4 border-t border-slate-200 text-xs font-mono text-slate-500 relative z-10">
        <span>03 / 06</span>
      </div>
    </section>
  );
}
