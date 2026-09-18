"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Milestone, Flag, Building2, CheckCircle2, ArrowUpRight } from "lucide-react";
import { EXPERIENCE, type ExperienceItem } from "@/data/index";

export function MonographExperienceJourney() {
  const experiences = EXPERIENCE as ExperienceItem[];
  const [selectedIdx, setSelectedIdx] = useState(0);

  const activeExp = experiences[selectedIdx] || experiences[0];

  const milestones = [
    { year: "2020", title: "Started my journey", desc: "ML, Early Systems", expIdx: 3 },
    { year: "2021", title: "Model Builder ML Platform", desc: "KAAR Technologies", expIdx: 3 },
    { year: "2022", title: "Scenario Builder", desc: "Financial Analytics", expIdx: 2 },
    { year: "2023", title: "Computer Vision", desc: "Image Processing", expIdx: 1 },
    { year: "2025 - Present", title: "Enterprise Systems", desc: "DAG Engine, AI, Data", expIdx: 0 },
  ];

  return (
    <section id="section-experience" className="relative w-full min-h-[90vh] rounded-3xl overflow-hidden border border-slate-200 bg-[#f8fafc] text-slate-900 shadow-2xl p-6 sm:p-12 lg:p-16 my-8 flex flex-col justify-between scroll-mt-24">
      {/* Ink Mountain Contour Line SVG Backdrop matching Panel 05 */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-15 overflow-hidden">
        <svg className="absolute bottom-0 w-full h-[65%]" preserveAspectRatio="none" viewBox="0 0 1440 400">
          <path d="M 0,220 L 200,120 L 400,240 L 600,100 L 800,220 L 1000,90 L 1200,200 L 1440,110 L 1440,400 L 0,400 Z" fill="#020617" />
          <path d="M 0,300 L 250,180 L 500,320 L 750,160 L 1000,280 L 1250,170 L 1440,290 L 1440,400 L 0,400 Z" fill="#020617" opacity="0.6" />
        </svg>
      </div>

      {/* Header Bar */}
      <div className="flex flex-col gap-2 border-b border-slate-200 pb-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-300 bg-white text-slate-700 text-xs font-mono font-bold tracking-widest w-max shadow-sm">
          <Milestone className="w-3.5 h-3.5 text-emerald-600" />
          <span>05 / EXPERIENCE — THE JOURNEY</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-slate-950 tracking-tight">
          A journey of building.
        </h2>
        <p className="text-sm font-sans text-slate-600">
          Different problems. A common purpose.
        </p>
      </div>

      {/* Main Content Grid: Diagonal Waypoint Trail (Panel 05 layout) */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-8">
        
        {/* Left Column: Stepped Waypoint Timeline Trail */}
        <div className="lg:col-span-6 flex flex-col gap-3 relative">
          
          {/* Diagonal SVG Pathway */}
          <svg className="absolute left-6 top-4 bottom-4 w-1 pointer-events-none">
            <line x1="0" y1="0" x2="0" y2="100%" stroke="#020617" strokeWidth="2" strokeDasharray="4 4" opacity="0.3" />
          </svg>

          {milestones.map((m, idx) => {
            const isSelected = selectedIdx === m.expIdx;
            return (
              <motion.button
                key={m.year + idx}
                onClick={() => setSelectedIdx(m.expIdx)}
                whileHover={{ x: 6 }}
                className={`relative z-10 p-4 rounded-2xl border text-left font-mono transition-all cursor-pointer flex items-center justify-between shadow-md ${
                  isSelected
                    ? "bg-slate-950 text-white border-slate-950 shadow-xl"
                    : "bg-white text-slate-800 border-slate-200 hover:border-slate-400"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                    isSelected ? "bg-emerald-500 text-slate-950" : "bg-slate-100 text-slate-700"
                  }`}>
                    {m.year}
                  </span>
                  <div className="flex flex-col">
                    <span className="font-display font-extrabold text-sm">{m.title}</span>
                    <span className={`text-xs font-sans ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                      {m.desc}
                    </span>
                  </div>
                </div>

                <ArrowUpRight className={`w-4 h-4 ${isSelected ? "text-emerald-400" : "text-slate-400"}`} />
              </motion.button>
            );
          })}
        </div>

        {/* Right Column: Selected Milestone Detail Card */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-2xl flex flex-col justify-between min-h-[380px] gap-6">
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
              <Building2 className="w-3.5 h-3.5 text-slate-700" />
              {activeExp.company} · {activeExp.location}
            </span>
          </div>

          <p className="text-xs sm:text-sm font-sans text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
            {activeExp.description}
          </p>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono font-bold text-slate-500 uppercase">
              // TECH & CAPABILITIES
            </span>
            <div className="flex flex-wrap gap-2">
              {activeExp.tags.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-mono font-semibold border border-slate-200 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Footer Quote matching Panel 05 */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 text-xs font-mono text-slate-500 relative z-10">
        <span className="font-serif-italic text-slate-700 font-semibold text-sm">
          &quot;Same curiosity. Bigger impact.&quot;
        </span>
        <span>05 / 09</span>
      </div>
    </section>
  );
}
