"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Building2, Award, TrendingUp, CheckCircle2, Sparkles, Compass, Milestone, Flag, ArrowUpRight } from "lucide-react";
import { EXPERIENCE, type ExperienceItem } from "@/data/index";

export function ExperienceJourneyMap() {
  const experiences = EXPERIENCE as ExperienceItem[];
  const [selectedIdx, setSelectedIdx] = useState(0); // Default to current active role: iLink Digital

  const activeExp = experiences[selectedIdx] || experiences[0];

  return (
    <section id="section-experience" className="relative w-full min-h-[90vh] rounded-3xl overflow-hidden border border-cyan-500/20 shadow-2xl my-8 scroll-mt-24">
      {/* ── CODE-RENDERED VECTOR MOUNTAIN BACKDROP ── */}
      <div className="absolute inset-0 z-0 bg-slate-950 pointer-events-none overflow-hidden">
        {/* Ambient Glow Orbs */}
        <div className="absolute -top-24 left-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px]" />
        <div className="absolute -bottom-20 left-1/3 w-[550px] h-[550px] bg-cyan-500/10 rounded-full blur-[130px]" />

        {/* Vector Mountain Silhouettes SVG */}
        <svg className="absolute bottom-0 w-full h-[60%] opacity-25" preserveAspectRatio="none" viewBox="0 0 1440 400">
          <defs>
            <linearGradient id="mountGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#020617" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="mountGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#34d399" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#020617" stopOpacity="0.95" />
            </linearGradient>
          </defs>
          <path d="M 0,220 L 180,140 L 360,240 L 540,120 L 720,200 L 900,100 L 1080,210 L 1260,130 L 1440,230 L 1440,400 L 0,400 Z" fill="url(#mountGrad1)" />
          <path d="M 0,280 L 240,200 L 480,310 L 720,180 L 960,260 L 1200,170 L 1440,290 L 1440,400 L 0,400 Z" fill="url(#mountGrad2)" />
        </svg>

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/80" />
      </div>

      {/* ── CONTENT CONTAINER ── */}
      <div className="relative z-10 w-full p-6 sm:p-10 lg:p-12 flex flex-col justify-between min-h-[90vh]">
        
        {/* Header Title */}
        <div className="flex flex-col gap-2 border-b border-white/10 pb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/60 text-emerald-400 text-xs font-mono font-bold tracking-widest w-max backdrop-blur-md">
            <Milestone className="w-3.5 h-3.5 text-emerald-400" />
            <span>05 // EXPERIENCE (INTERACTIVE CAREER LADDER)</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-white tracking-tight">
            Experience That Builds Forward
          </h2>
          <p className="text-sm font-serif-italic text-cyan-300">
            5+ years of engineering growth from core development to enterprise AI & DAG engines.
          </p>
        </div>

        {/* Main Content Grid: Left Vertical Career Ladder Trail, Right Narrative Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-auto py-6">
          
          {/* Left Column: Interactive Vertical Career Ladder Rungs */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                // CAREER LADDER MILESTONES
              </span>
              <span className="text-[11px] font-mono text-slate-400">Select rung to inspect</span>
            </div>

            {/* Vertical Stepped Career Ladder Pins */}
            <div className="flex flex-col gap-3 relative">
              {/* Connecting Vertical Neon Spine */}
              <div className="absolute left-[22px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-emerald-400 via-cyan-400 to-purple-500 opacity-40 z-0" />

              {experiences.map((exp, idx) => {
                const isSelected = selectedIdx === idx;
                const isCurrentRole = idx === 0;

                return (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    onClick={() => setSelectedIdx(idx)}
                    className={`relative z-10 p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between backdrop-blur-xl ${
                      isSelected
                        ? "bg-slate-950/90 border-emerald-400 text-white shadow-[0_0_30px_rgba(52,211,153,0.5)] scale-[1.02]"
                        : "bg-slate-900/80 border-white/10 text-slate-300 hover:border-cyan-400 hover:bg-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      {/* Waypoint Badge */}
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono text-xs font-bold shrink-0 border shadow-md ${
                        isSelected
                          ? "bg-gradient-to-br from-emerald-400 to-cyan-400 text-slate-950 border-white"
                          : "bg-slate-950 text-slate-300 border-white/20"
                      }`}>
                        0{experiences.length - idx}
                      </div>

                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono font-bold text-emerald-300 px-2 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-500/30">
                            {exp.period}
                          </span>
                          {isCurrentRole && (
                            <span className="text-[9px] font-mono font-bold text-slate-950 bg-emerald-400 px-2 py-0.5 rounded-md animate-pulse">
                              PRESENT ROLE
                            </span>
                          )}
                        </div>
                        <span className="font-display font-extrabold text-sm text-white mt-1">
                          {exp.role}
                        </span>
                        <span className="text-xs text-slate-400 font-sans">
                          {exp.company}
                        </span>
                      </div>
                    </div>

                    <ArrowUpRight className={`w-4 h-4 transition-transform ${isSelected ? "text-emerald-400 rotate-45" : "text-slate-500"}`} />
                  </motion.div>
                );
              })}
            </div>

            {/* Avatar Indicator Card */}
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-amber-500/30 backdrop-blur-md shadow-xl flex items-center gap-3 mt-2">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-amber-400 shrink-0">
                <Image
                  src="/avatars/3d-cartoon.png"
                  alt="Chocka Career Avatar"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white font-mono">Chocka Balan</span>
                <span className="text-[11px] text-amber-300 font-serif-italic">&quot;Same Curiosity, Bigger Problems, Greater Impact.&quot;</span>
              </div>
            </div>

          </div>

          {/* Right Column: Active Experience Narrative Glass Card */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeExp.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="p-6 sm:p-8 rounded-2xl bg-slate-950/90 border border-emerald-500/30 backdrop-blur-2xl shadow-2xl flex flex-col gap-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-emerald-400 shrink-0 shadow-lg">
                      <Image
                        src="/avatars/clean-professional.png"
                        alt="Chockalingam Balan"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold">
                        {activeExp.period}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1">
                        {activeExp.role}
                      </h3>
                      <span className="text-xs font-bold text-cyan-400 flex items-center gap-2 font-sans mt-0.5">
                        <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                        {activeExp.company} · {activeExp.location}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold self-start sm:self-center shadow-lg">
                    <span>{activeExp.status || "PRODUCTION NODE"}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">// ARCHITECTURAL CONTRIBUTION</span>
                  <p className="text-sm font-sans text-slate-200 leading-relaxed bg-slate-900/80 p-5 rounded-xl border border-white/10">
                    {activeExp.description}
                  </p>
                </div>

                <div className="flex flex-col gap-2 pt-1">
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">// TECH STACK & TOOLS</span>
                  <div className="flex flex-wrap gap-2.5">
                    {activeExp.tags.map((t) => (
                      <span
                        key={t}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-cyan-200 border border-cyan-500/30 text-xs font-mono font-medium flex items-center gap-1.5 shadow-md"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Quote */}
                <div className="pt-3 border-t border-white/10 text-xs font-serif-italic text-slate-400 text-center">
                  &quot;Every project taught me something. Every challenge made me better.&quot;
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>

    </section>
  );
}
