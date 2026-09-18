"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Mail, ArrowRight, ShieldCheck, Zap, Terminal, Database, Cpu, Box, Flame, Download, Globe, Play, Eye } from "lucide-react";
import { PERSONAL } from "@/data/index";
import { Page } from "@/hooks/useNav";
import { NarratorStrip } from "@/components/ui/NarratorStrip";
import { InteractiveAvatar } from "@/components/ui/InteractiveAvatar";

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

export default function Home({
  goTo,
  onOpenStory,
  onOpenResume,
}: {
  goTo: (p: Page) => void;
  onOpenStory?: () => void;
  onOpenResume?: () => void;
}) {
  const [titleIdx, setTitleIdx] = useState(0);
  const titles = ["Senior Software Engineer", "Backend & AI Architect", "Data Systems Specialist"];

  useEffect(() => {
    const t = setInterval(() => setTitleIdx((i) => (i + 1) % titles.length), 2800);
    return () => clearInterval(t);
  }, [titles.length]);

  return (
    <div className="w-full flex flex-col gap-4 py-1">
      {/* ── NARRATOR STRIP (HOME TAILORED) ── */}
      <NarratorStrip
        quote="Welcome to my engineering portfolio! I architect resilient backend microservices, PySpark ETL ingestion engines, and production AI workflow automation."
        details={[
          { label: "Core Vision", text: "Building high-concurrency, fault-tolerant backend systems with enterprise business impact." },
          { label: "Key Strengths", text: "Python, PySpark, Databricks, FastAPI, Apache Kafka, AWS Bedrock & Kubernetes" }
        ]}
        qaPairs={[
          { question: "What is your main engineering role?", answer: "Senior Software Engineer & Backend AI Architect with 5+ years shipping high-throughput systems." },
          { question: "What is your current availability?", answer: "Based in Chennai, India and open for Senior Backend, Tech Lead & Systems Architect roles globally." }
        ]}
      />

      <div className="w-full grid grid-cols-1 lg:grid-cols-[1.15fr_.85fr] gap-6 lg:gap-10 items-center justify-center py-2 sm:py-3">
        {/* ── LEFT HERO COLUMN: Identity & Vision ── */}
        <div className="flex flex-col gap-4 max-w-full">
          <div className="flex items-center gap-4">
            {/* INSTAGRAM / SNAPCHAT STYLE INTERACTIVE STORY AVATAR */}
            <InteractiveAvatar size="lg" onClick={onOpenStory} showBadge />

            <div className="flex flex-col gap-1 pl-1">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide w-max backdrop-blur-xl"
                style={{ background: "rgba(52, 211, 153, 0.12)" }}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {PERSONAL.role}
              </div>
              <span className="text-xs text-[var(--muted)] font-sans">Based in Chennai, India</span>
              <button
                onClick={onOpenStory}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:text-sky-300 transition-colors pt-0.5"
              >
                <Play className="w-3 h-3 fill-sky-400 text-sky-400" />
                <span>Tap to Play Story Highlights</span>
              </button>
            </div>
          </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--text)] leading-[1.05] break-words">
          {PERSONAL.name}
        </h1>

        <div className="flex items-center gap-2 text-base sm:text-xl font-bold text-sky-400 font-sans">
          <span>&gt; {titles[titleIdx]}</span>
          <span className="w-2.5 h-5 bg-sky-400 animate-pulse" />
        </div>

        <p className="text-base text-[var(--text-muted)] leading-relaxed max-w-xl font-sans font-normal">
          Architecting resilient backend microservices, distributed data ingestion engines, and production AI workflow automation. 5+ years shipping high-performance systems with measurable enterprise business impact.
        </p>

        {/* CTA Action Buttons */}
        <div className="flex gap-3 flex-wrap mt-2">
          <a
            href={`mailto:${PERSONAL.email}`}
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-slate-950 transition-all shadow-lg hover:opacity-90 cursor-pointer"
            style={{ backgroundColor: "var(--accent)" }}
          >
            Get in Touch <Mail size={16} />
          </a>
          <button
            onClick={onOpenResume}
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-[var(--text)] border border-[var(--border-strong)] bg-[var(--surface-2)] hover:bg-[var(--surface-1)] hover:border-[var(--accent)] transition-all shadow-md cursor-pointer"
          >
            <Eye size={16} className="text-[var(--accent)]" />
            Preview Resume
          </button>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-[var(--text)] border border-sky-500/40 bg-sky-500/15 hover:bg-sky-500/25 hover:border-sky-400 transition-all shadow-md"
          >
            Download <Download size={16} className="text-sky-400" />
          </a>
          <button
            onClick={() => goTo("experience")}
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-[var(--text-muted)] border border-[var(--border)] bg-[var(--surface-2)] hover:bg-[var(--surface-1)] hover:border-sky-400/40 transition-all cursor-pointer"
          >
            View Career History <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* ── RIGHT HERO COLUMN: Executive Profile & Tech Chips Panel ── */}
      <div className="rounded-2xl p-5 sm:p-6 border border-[var(--border-strong)] bg-[var(--surface-1)] shadow-2xl backdrop-blur-xl flex flex-col gap-4 max-w-full overflow-hidden">
        
        {/* Status Header */}
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-3.5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            <span className="text-xs font-semibold text-[var(--text)] uppercase tracking-wider font-sans">
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
            <span className="text-lg sm:text-2xl font-black text-[var(--text)] font-mono truncate">5+ Yrs</span>
            <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider mt-0.5 truncate font-sans">Experience</span>
          </div>
          <div className="p-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] flex flex-col min-w-0">
            <span className="text-lg sm:text-2xl font-black text-emerald-400 font-mono truncate">40%</span>
            <span className="text-xs text-[var(--muted)] uppercase tracking-wider mt-0.5 truncate font-sans">ETL Speedup</span>
          </div>
          <div className="p-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] flex flex-col min-w-0">
            <span className="text-lg sm:text-2xl font-black text-sky-400 font-mono truncate">90%+</span>
            <span className="text-xs text-[var(--muted)] uppercase tracking-wider mt-0.5 truncate font-sans">QA Automation</span>
          </div>
        </div>

        {/* Primary Technology Chips Panel */}
        <div className="flex flex-col gap-2 pt-1">
          <span className="text-xs text-[var(--muted)] uppercase tracking-wider font-semibold flex items-center gap-1.5 font-sans">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Primary Technology Stack
          </span>

          <div className="flex flex-wrap gap-2">
            {HOME_TECH_STACK.map((tech) => (
              <span
                key={tech.name}
                className="px-3 py-1 rounded-lg bg-[var(--surface-2)] text-[var(--text)] border border-[var(--border)] text-xs font-mono font-medium flex items-center gap-1.5 shadow-sm hover:border-sky-400/50 transition-colors"
              >
                {tech.icon}
                {tech.name}
              </span>
            ))}
          </div>
        </div>

        {/* Current Role Info */}
        <div className="p-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs sm:text-sm gap-1.5 font-sans">
          <span className="text-[var(--muted)]">Current Role:</span>
          <span className="text-sky-400 font-bold truncate">Tech Specialist @ iLink Digital</span>
        </div>
      </div>
    </div>
    </div>
  );
}


