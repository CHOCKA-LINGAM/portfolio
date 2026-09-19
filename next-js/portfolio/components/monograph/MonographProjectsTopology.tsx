"use client";

import React from "react";
import { motion } from "framer-motion";
import { Workflow, Github, CheckCircle2, Terminal, ShieldCheck } from "lucide-react";
import { PROJECTS, type Project } from "@/data/index";

export function MonographProjectsTopology() {
  const allProjects = PROJECTS as Project[];
  
  // Spotlight schema-shield alone as the single active production flagship
  const flagshipProject = allProjects.find((p) => p.id === "05") || allProjects[0];

  return (
    <section
      id="section-projects"
      className="relative w-full rounded-3xl overflow-hidden border border-slate-200 bg-[#f8fafc] text-slate-900 shadow-2xl p-5 sm:p-10 lg:p-16 pt-8 sm:pt-14 my-8 flex flex-col justify-between scroll-mt-24"
    >
      {/* Background Soft Light Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-slate-300/20 rounded-full blur-[140px]" />
        
        {/* Subtle Light Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(15,23,42,0.8) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Header Bar */}
      <div className="flex flex-col gap-2 border-b border-slate-200 pb-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-300 bg-white text-slate-700 text-xs font-mono font-bold tracking-widest w-max shadow-sm">
          <Workflow className="w-3.5 h-3.5 text-cyan-600" />
          <span>05 // PROJECTS</span>
        </div>
        <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-extrabold text-slate-950 tracking-tight leading-tight max-w-full break-words">
          Featured Project
        </h2>
      </div>

      {/* ── SINGLE STANDALONE FLAGSHIP SPOTLIGHT (SCHEMA-SHIELD) ── */}
      <div className="relative z-10 my-8 flex justify-center">
        <motion.div
          whileHover={{ y: -3 }}
          className="w-full max-w-3xl p-6 sm:p-10 rounded-3xl border border-cyan-500/80 bg-white text-slate-900 shadow-xl ring-1 ring-cyan-400/20 flex flex-col gap-6 backdrop-blur-md"
        >
          {/* Top Status Bar */}
          <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[11px] font-mono font-extrabold tracking-wider text-slate-600 uppercase flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                ACTIVE OPEN SOURCE PRODUCTION PACKAGE
              </span>
            </div>

            <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
              {flagshipProject.status}
            </span>
          </div>

          {/* Title & Description */}
          <div className="flex flex-col gap-2 pt-1">
            <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-950 tracking-tight flex items-center justify-between">
              <span>{flagshipProject.title}</span>
              <ShieldCheck className="w-6 h-6 text-cyan-600 animate-pulse" />
            </h3>
            <p className="text-sm sm:text-base font-sans text-slate-700 leading-relaxed pt-1">
              {flagshipProject.desc}
            </p>
          </div>

          {/* Tech Stack Badges */}
          <div className="flex flex-wrap gap-2 pt-2">
            {flagshipProject.stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-xl text-xs font-mono font-semibold bg-slate-100 border border-slate-200 text-slate-800 flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                {tech}
              </span>
            ))}
          </div>

          {/* Working Links: PyPI & GitHub */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            {flagshipProject.link && (
              <a
                href={flagshipProject.link}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-2xl text-xs font-mono font-bold text-white bg-slate-950 hover:bg-slate-800 flex items-center gap-2.5 transition-all shadow-md cursor-pointer"
              >
                <Terminal className="w-4 h-4 text-emerald-400" /> PyPI Package (pip install schema-shield)
              </a>
            )}
            {flagshipProject.github && (
              <a
                href={flagshipProject.github}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-2xl text-xs font-mono font-bold text-slate-800 border border-slate-300 bg-slate-50 hover:bg-slate-100 transition-all flex items-center gap-2.5 cursor-pointer shadow-sm"
              >
                <Github className="w-4 h-4 text-cyan-600" /> View Source Repository
              </a>
            )}
          </div>

        </motion.div>
      </div>

      {/* Footer Tag */}
      <div className="flex items-center justify-end pt-4 border-t border-slate-200 text-xs font-mono text-slate-500 relative z-10">
        <span>05 / 06</span>
      </div>
    </section>
  );
}
