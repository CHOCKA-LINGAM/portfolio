"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Mail, ArrowRight, ShieldCheck, Zap, Terminal, Database, Cpu, Box, Flame, Download, Sparkles, Globe } from "lucide-react";
import { PERSONAL } from "@/data/index";
import { Page } from "@/hooks/useNav";

const HOME_TECH_STACK = [
  { name: "Python", icon: <Terminal className="w-3.5 h-3.5 text-yellow-400" /> },
  { name: "FastAPI", icon: <Globe className="w-3.5 h-3.5 text-emerald-400" /> },
  { name: "Databricks", icon: <Flame className="w-3.5 h-3.5 text-orange-400" /> },
  { name: "PySpark", icon: <Database className="w-3.5 h-3.5 text-sky-400" /> },
  { name: "OpenAI", icon: <Cpu className="w-3.5 h-3.5 text-purple-400" /> },
  { name: "AWS Bedrock", icon: <Cpu className="w-3.5 h-3.5 text-indigo-400" /> },
  { name: "Azure AKS", icon: <Box className="w-3.5 h-3.5 text-amber-400" /> },
  { name: "Docker", icon: <Box className="w-3.5 h-3.5 text-cyan-400" /> },
  { name: "PostgreSQL", icon: <Database className="w-3.5 h-3.5 text-blue-400" /> },
];

export default function Home({ goTo }: { goTo: (p: Page) => void }) {
  const [titleIdx, setTitleIdx] = useState(0);
  const titles = ["Senior Software Engineer", "Backend & AI Architect", "Data Systems Specialist"];

  useEffect(() => {
    const t = setInterval(() => setTitleIdx((i) => (i + 1) % titles.length), 2800);
    return () => clearInterval(t);
  }, [titles.length]);

  return (
    <div className="w-full min-h-full grid grid-cols-1 lg:grid-cols-[1.15fr_.85fr] gap-6 lg:gap-10 items-center justify-center py-4 pb-12">
      
      {/* ── LEFT HERO COLUMN: Identity & Vision ── */}
      <div className="flex flex-col gap-4 max-w-full">
        <div className="flex items-center gap-3">
          <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-sky-400/60 shadow-lg shadow-sky-500/20 ring-4 ring-sky-400/10 flex-shrink-0">
            <Image src="/avatar.png" alt={PERSONAL.name} fill className="object-cover" priority />
          </div>
          <div className="flex flex-col">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold w-max backdrop-blur-xl"
              style={{ background: "rgba(52, 211, 153, 0.08)" }}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {PERSONAL.role}
            </div>
            <span className="text-xs text-slate-400 font-mono mt-1">Based in Chennai, India</span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.05] break-words">
          {PERSONAL.name}
        </h1>

        <div className="flex items-center gap-2 font-mono text-sm sm:text-lg font-bold text-sky-400">
          <span>&gt; {titles[titleIdx]}</span>
          <span className="w-2.5 h-5 bg-sky-400 animate-pulse" />
        </div>

        <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
          Architecting resilient backend microservices, distributed data ingestion engines, and production AI workflow automation. 5+ years shipping high-performance systems with measurable enterprise business impact.
        </p>

        {/* CTA Action Buttons */}
        <div className="flex gap-3 flex-wrap mt-2">
          <a
            href={`mailto:${PERSONAL.email}`}
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs text-slate-950 bg-sky-400 hover:bg-sky-300 transition-all shadow-lg shadow-sky-400/20"
          >
            Get in Touch <Mail size={14} />
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs text-white border border-sky-500/30 bg-sky-500/10 hover:bg-sky-500/20 hover:border-sky-400 transition-all shadow-md"
          >
            Download Resume <Download size={14} className="text-sky-400" />
          </a>
          <button
            onClick={() => goTo("experience")}
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs text-slate-200 border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-sky-500/40 transition-all"
          >
            View Career History <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* ── RIGHT HERO COLUMN: Executive Profile & Tech Chips Panel ── */}
      <div className="rounded-2xl p-5 sm:p-6 border border-white/10 bg-[#070914] shadow-2xl backdrop-blur-xl flex flex-col gap-4 max-w-full overflow-hidden">
        
        {/* Status Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Executive Profile
            </span>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
            AVAILABLE FOR WORK
          </span>
        </div>

        {/* 3 Impact Metrics */}
        <div className="grid grid-cols-3 gap-2.5">
          <div className="p-3 rounded-xl bg-[#0c1022] border border-white/10 flex flex-col min-w-0">
            <span className="text-lg sm:text-2xl font-black text-white font-mono truncate">5+ Yrs</span>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5 truncate">Experience</span>
          </div>
          <div className="p-3 rounded-xl bg-[#0c1022] border border-white/10 flex flex-col min-w-0">
            <span className="text-lg sm:text-2xl font-black text-emerald-400 font-mono truncate">40%</span>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5 truncate">ETL Speedup</span>
          </div>
          <div className="p-3 rounded-xl bg-[#0c1022] border border-white/10 flex flex-col min-w-0">
            <span className="text-lg sm:text-2xl font-black text-sky-400 font-mono truncate">90%+</span>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5 truncate">QA Automation</span>
          </div>
        </div>

        {/* Primary Technology Chips Panel */}
        <div className="flex flex-col gap-2 pt-1">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-bold flex items-center gap-1.5 font-mono">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Primary Technology Stack
          </span>

          <div className="flex flex-wrap gap-1.5">
            {HOME_TECH_STACK.map((tech) => (
              <span
                key={tech.name}
                className="px-2.5 py-1 rounded-lg bg-white/[0.05] text-slate-100 border border-white/10 text-xs font-mono font-medium flex items-center gap-1.5 shadow-sm hover:border-sky-400/40 transition-colors"
              >
                {tech.icon}
                {tech.name}
              </span>
            ))}
          </div>
        </div>

        {/* Current Role Info */}
        <div className="p-2.5 sm:p-3 rounded-xl bg-[#04050a] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-mono gap-1">
          <span className="text-slate-400">Current Role:</span>
          <span className="text-sky-400 font-bold truncate">Tech Specialist @ iLink Digital</span>
        </div>
      </div>
    </div>
  );
}

