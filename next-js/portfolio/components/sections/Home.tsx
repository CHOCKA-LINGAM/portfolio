"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Mail, ArrowRight, ShieldCheck, Zap, Terminal, Database, Cpu, Box, Flame, Download, Globe } from "lucide-react";
import { PERSONAL } from "@/data/index";
import { Page } from "@/hooks/useNav";
import { NarratorStrip } from "@/components/ui/NarratorStrip";

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
    <div className="w-full flex flex-col gap-4 py-1">
      {/* ── NARRATOR STRIP ── */}
      <NarratorStrip
        quote="Hey, I'm Chockalingam — I architect high-throughput backend engines, distributed architectures, and AI-powered data pipelines."
        details={[
          { label: "Core Architecture", text: "Microservices, Distributed Data Processing, AI Workflow Automation" },
          { label: "Production Impact", text: "40% latency reduction across data pipelines, 90%+ automated test coverage" }
        ]}
      />

      <div className="w-full grid grid-cols-1 lg:grid-cols-[1.15fr_.85fr] gap-6 lg:gap-10 items-center justify-center py-2 sm:py-3">
        {/* ── LEFT HERO COLUMN: Identity & Vision ── */}
        <div className="flex flex-col gap-4 max-w-full">
          <div className="flex items-center gap-3.5">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border border-sky-500/40 ring-4 ring-sky-500/20 shadow-xl flex-shrink-0 bg-slate-900 transition-all duration-300">
              <Image src="/avatars/in-workspace.png" alt={PERSONAL.name} fill className="object-cover rounded-full" priority />
            </div>

            <div className="flex flex-col">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide w-max backdrop-blur-xl"
                style={{ background: "rgba(52, 211, 153, 0.12)" }}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {PERSONAL.role}
              </div>
              <span className="text-xs text-slate-300 font-sans mt-1">Based in Chennai, India</span>
            </div>
          </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.05] break-words">
          {PERSONAL.name}
        </h1>

        <div className="flex items-center gap-2 text-base sm:text-xl font-bold text-sky-400 font-sans">
          <span>&gt; {titles[titleIdx]}</span>
          <span className="w-2.5 h-5 bg-sky-400 animate-pulse" />
        </div>

        <p className="text-base text-slate-200 leading-relaxed max-w-xl font-sans font-normal">
          Architecting resilient backend microservices, distributed data ingestion engines, and production AI workflow automation. 5+ years shipping high-performance systems with measurable enterprise business impact.
        </p>

        {/* CTA Action Buttons */}
        <div className="flex gap-3 flex-wrap mt-2">
          <a
            href={`mailto:${PERSONAL.email}`}
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-slate-950 bg-sky-400 hover:bg-sky-300 transition-all shadow-lg shadow-sky-400/20"
          >
            Get in Touch <Mail size={16} />
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-white border border-sky-500/40 bg-sky-500/15 hover:bg-sky-500/25 hover:border-sky-400 transition-all shadow-md"
          >
            Download Resume <Download size={16} className="text-sky-400" />
          </a>
          <button
            onClick={() => goTo("experience")}
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-slate-200 border border-white/15 bg-white/[0.05] hover:bg-white/[0.1] hover:border-sky-400/40 transition-all"
          >
            View Career History <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* ── RIGHT HERO COLUMN: Executive Profile & Tech Chips Panel ── */}
      <div className="rounded-2xl p-5 sm:p-6 border border-[var(--border-strong)] bg-[var(--surface-1)] shadow-2xl backdrop-blur-xl flex flex-col gap-4 max-w-full overflow-hidden">
        
        {/* Status Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            <span className="text-xs font-semibold text-white uppercase tracking-wider font-sans">
              Executive Profile
            </span>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-sans">
            AVAILABLE FOR WORK
          </span>
        </div>

        {/* 3 Impact Metrics */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] flex flex-col min-w-0">
            <span className="text-lg sm:text-2xl font-black text-white font-mono truncate">5+ Yrs</span>
            <span className="text-xs text-slate-300 uppercase tracking-wider mt-0.5 truncate font-sans">Experience</span>
          </div>
          <div className="p-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] flex flex-col min-w-0">
            <span className="text-lg sm:text-2xl font-black text-emerald-400 font-mono truncate">40%</span>
            <span className="text-xs text-slate-300 uppercase tracking-wider mt-0.5 truncate font-sans">ETL Speedup</span>
          </div>
          <div className="p-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] flex flex-col min-w-0">
            <span className="text-lg sm:text-2xl font-black text-sky-400 font-mono truncate">90%+</span>
            <span className="text-xs text-slate-300 uppercase tracking-wider mt-0.5 truncate font-sans">QA Automation</span>
          </div>
        </div>

        {/* Primary Technology Chips Panel */}
        <div className="flex flex-col gap-2 pt-1">
          <span className="text-xs text-slate-300 uppercase tracking-wider font-semibold flex items-center gap-1.5 font-sans">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Primary Technology Stack
          </span>

          <div className="flex flex-wrap gap-2">
            {HOME_TECH_STACK.map((tech) => (
              <span
                key={tech.name}
                className="px-3 py-1 rounded-lg bg-[var(--surface-2)] text-slate-100 border border-[var(--border)] text-xs font-mono font-medium flex items-center gap-1.5 shadow-sm hover:border-sky-400/50 transition-colors"
              >
                {tech.icon}
                {tech.name}
              </span>
            ))}
          </div>
        </div>

        {/* Current Role Info */}
        <div className="p-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs sm:text-sm gap-1.5 font-sans">
          <span className="text-slate-400">Current Role:</span>
          <span className="text-sky-400 font-bold truncate">Tech Specialist @ iLink Digital</span>
        </div>
      </div>
    </div>
    </div>
  );
}


