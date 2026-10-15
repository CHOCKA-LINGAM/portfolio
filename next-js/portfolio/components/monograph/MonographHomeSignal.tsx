"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, FileText, HelpCircle } from "lucide-react";
import { getExperienceYearsLabel } from "@/data/index";
import {
  PythonBrandIcon,
  DatabricksBrandIcon,
  PySparkBrandIcon,
} from "@/components/ui/TechBrandIcons";

const ROTATING_WORDS = ["data pipelines", "DAG engines", "AI workflows", "backend APIs"];

// Cycles through what I build; reduced-motion users get the CSS-level animation cut-off
function RotatingWord() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % ROTATING_WORDS.length), 2400);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="relative inline-grid align-baseline overflow-hidden pb-[0.14em] -mb-[0.14em]" aria-live="off">
      {ROTATING_WORDS.map((w) => (
        <span key={w} aria-hidden="true" className="invisible col-start-1 row-start-1 whitespace-nowrap">
          {w}
        </span>
      ))}
      <AnimatePresence mode="wait">
        <motion.span
          key={ROTATING_WORDS[idx]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="absolute inset-0 whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-sky-600 to-emerald-600"
        >
          {ROTATING_WORDS[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function MonographHomeSignal({
  onExplore,
  onOpenResume,
  onOpenRecruiterQA,
}: {
  onExplore: () => void;
  onOpenResume?: () => void;
  onOpenRecruiterQA?: () => void;
}) {
  const expYears = getExperienceYearsLabel();

  return (
    <section className="relative w-full rounded-3xl overflow-hidden border border-slate-200 bg-[#f8fafc] text-slate-900 shadow-2xl p-4 sm:p-10 lg:p-16 my-4 flex flex-col justify-between">
      {/* ── TOP TAG HEADER WITH 5+ YEARS EXPERIENCE BADGE STRIP ── */}
      <div className="flex flex-wrap items-center justify-between w-full gap-3 relative z-10">
        <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-300 bg-white text-slate-700 text-xs font-mono font-bold tracking-wider shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>01 // HOME</span>
          <span className="text-slate-300">•</span>
          <span className="px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-800 font-extrabold text-[11px] border border-cyan-300 shadow-sm">
            {expYears} Years Exp
          </span>
        </div>
      </div>

      {/* ── MAIN HERO GRID: LEFT HEADLINE, RIGHT BRANCHING FLOW VECTOR ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-6 sm:py-10 relative z-10">
        
        {/* Left Column: Giant Headline & Responsive Bio */}
        <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6 max-w-2xl">
          <div className="flex flex-col gap-3">
            <p className="font-mono text-xs sm:text-sm font-bold text-slate-700 tracking-wider uppercase">
              Chockalingam Balan · Senior Software Engineer · Chennai, India
            </p>
            <h1 className="text-3xl sm:text-5xl xl:text-6xl font-display font-extrabold tracking-tight text-slate-950 leading-[1.08]">
              I build <RotatingWord /> that hold up in production.
            </h1>
          </div>

          <p className="text-sm sm:text-base font-sans text-slate-700 leading-relaxed font-normal max-w-xl bg-white/90 p-4 rounded-2xl border border-slate-200 shadow-sm backdrop-blur-sm">
            Senior Software Engineer building automated data pipelines, backend APIs, and intelligent AI microservices — backed by{" "}
            <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
              <PythonBrandIcon className="w-3.5 h-3.5" /> Python
            </span>
            ,{" "}
            <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              <DatabricksBrandIcon className="w-3.5 h-3.5" /> Databricks
            </span>
            , and{" "}
            <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              <PySparkBrandIcon className="w-3.5 h-3.5" /> PySpark
            </span>{" "}
            — with a focus on reliability &amp; performance.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-2 font-mono w-full">
            <button
              onClick={onExplore}
              className="px-6 py-3 rounded-2xl font-bold text-xs text-white bg-slate-950 hover:bg-slate-800 transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
            >
              <span>See my experience</span>
              <ArrowDown className="w-3.5 h-3.5 text-cyan-400" />
            </button>

            {onOpenResume && (
              <button
                onClick={onOpenResume}
                className="px-5 py-3 rounded-2xl font-bold text-xs text-slate-900 bg-white hover:bg-slate-100 border border-slate-300 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-600" />
                <span>View Resume</span>
              </button>
            )}

            {onOpenRecruiterQA && (
              <button
                onClick={onOpenRecruiterQA}
                className="px-5 py-3 rounded-2xl font-bold text-xs text-cyan-900 bg-cyan-50 hover:bg-cyan-100 border border-cyan-300 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
              >
                <HelpCircle className="w-3.5 h-3.5 text-cyan-600" />
                <span>Recruiter Q&amp;A</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Dynamic SVG Branching Graph with Zero Mobile Clipping */}
        <div aria-hidden="true" className="lg:col-span-5 relative w-full h-[300px] sm:h-[340px] lg:h-[360px] hidden sm:flex items-center justify-center px-2 sm:px-6">
          
          {/* Root Origin Node on Left: SYSTEM badge */}
          <div
            className="absolute z-20 top-1/2 left-0 -translate-y-1/2 sm:left-[20%] sm:-translate-x-full px-3 py-1.5 rounded-full bg-slate-950 text-white font-mono text-[11px] sm:text-xs font-bold shadow-xl border border-slate-700 flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>SYSTEM</span>
          </div>

          {/* Curved SVG Line Harness matching percentage coordinates */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
            <defs>
              <linearGradient id="flowGrad1" x1="0%" y1="50%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#020617" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.95" />
              </linearGradient>
              <linearGradient id="flowGrad2" x1="0%" y1="50%" x2="100%" y2="33%">
                <stop offset="0%" stopColor="#020617" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.95" />
              </linearGradient>
              <linearGradient id="flowGrad3" x1="0%" y1="50%" x2="100%" y2="66%">
                <stop offset="0%" stopColor="#020617" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0.95" />
              </linearGradient>
              <linearGradient id="flowGrad4" x1="0%" y1="50%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#020617" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#d97706" stopOpacity="0.95" />
              </linearGradient>
            </defs>

            {/* Main Source Stem extending horizontally from SYSTEM badge */}
            <path d="M 20,50 L 36,50" stroke="#020617" strokeWidth="1.2" strokeLinecap="round" />

            {/* Branch 1 to Data (Target = 62%, 10%) */}
            <path d="M 36,50 C 50,50 54,10 62,10" stroke="url(#flowGrad1)" strokeWidth="0.8" />

            {/* Branch 2 to AI (Target = 62%, 36.6%) */}
            <path d="M 36,50 C 50,50 54,36.6 62,36.6" stroke="url(#flowGrad2)" strokeWidth="0.8" />

            {/* Branch 3 to Backend (Target = 62%, 63.3%) */}
            <path d="M 36,50 C 50,50 54,63.3 62,63.3" stroke="url(#flowGrad3)" strokeWidth="0.8" />

            {/* Branch 4 to Fullstack (Target = 62%, 90%) */}
            <path d="M 36,50 C 50,50 54,90 62,90" stroke="url(#flowGrad4)" strokeWidth="0.8" />
          </svg>

          {/* Node Chips Positioned Directly at Target Endpoints (62% Left) */}
          <div
            className="absolute flex items-center gap-1.5 p-1 px-2.5 sm:px-3.5 rounded-full bg-white border border-sky-300 shadow-md font-mono text-[11px] sm:text-xs font-bold text-sky-950 backdrop-blur-md z-20"
            style={{ left: "62%", top: "10%", transform: "translate(0, -50%)" }}
          >
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-sky-500 animate-pulse" />
            <span>Data</span>
          </div>

          <div
            className="absolute flex items-center gap-1.5 p-1 px-2.5 sm:px-3.5 rounded-full bg-white border border-purple-300 shadow-md font-mono text-[11px] sm:text-xs font-bold text-purple-950 backdrop-blur-md z-20"
            style={{ left: "62%", top: "36.6%", transform: "translate(0, -50%)" }}
          >
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-500 animate-pulse" />
            <span>AI</span>
          </div>

          <div
            className="absolute flex items-center gap-1.5 p-1 px-2.5 sm:px-3.5 rounded-full bg-white border border-emerald-300 shadow-md font-mono text-[11px] sm:text-xs font-bold text-emerald-950 backdrop-blur-md z-20"
            style={{ left: "62%", top: "63.3%", transform: "translate(0, -50%)" }}
          >
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Backend</span>
          </div>

          <div
            className="absolute flex items-center gap-1.5 p-1 px-2.5 sm:px-3.5 rounded-full bg-white border border-amber-300 shadow-md font-mono text-[11px] sm:text-xs font-bold text-amber-950 backdrop-blur-md z-20"
            style={{ left: "62%", top: "90%", transform: "translate(0, -50%)" }}
          >
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>Fullstack</span>
          </div>

        </div>

      </div>

    </section>
  );
}
