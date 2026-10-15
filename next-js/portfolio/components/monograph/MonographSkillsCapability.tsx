"use client";

import React from "react";
import {
  Cpu,
  Server,
  Database,
  Cloud,
  Layout,
  Workflow,
} from "lucide-react";
import { getOriginalTechIcon } from "@/components/ui/TechBrandIcons";

const CATEGORIES = [
  {
    id: "backend",
    title: "Backend Systems",
    icon: <Server className="w-4 h-4 text-emerald-400" />,
    accent: "border-t-emerald-400/70",
    skills: ["Python", "FastAPI", "Django", "Async APIs", "Microservices", "SQL"],
  },
  {
    id: "data",
    title: "Data Engineering",
    icon: <Database className="w-4 h-4 text-cyan-400" />,
    accent: "border-t-cyan-400/70",
    skills: ["Databricks", "PySpark", "ETL Pipelines", "Apache Airflow", "Delta Lake", "SQL Server"],
  },
  {
    id: "ai",
    title: "AI / ML Systems",
    icon: <Cpu className="w-4 h-4 text-purple-400" />,
    accent: "border-t-purple-400/70",
    skills: ["OpenAI API", "Claude Sonnet/Opus", "AWS Bedrock", "LLM Pipelines", "XGBoost", "LightGBM"],
  },
  {
    id: "frontend",
    title: "Frontend & Web",
    icon: <Layout className="w-4 h-4 text-sky-400" />,
    accent: "border-t-sky-400/70",
    skills: ["React.js", "Angular", "JavaScript", "REST Integration"],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    icon: <Cloud className="w-4 h-4 text-amber-400" />,
    accent: "border-t-amber-400/70",
    skills: ["Azure", "Docker", "AKS / Kubernetes", "GCP", "Celery Tasks", "AWS Databricks"],
  },
];

export function MonographSkillsCapability() {
  return (
    <section id="section-skills" className="relative w-full md:min-h-[85dvh] rounded-3xl overflow-hidden border border-purple-500/20 bg-slate-950 text-white shadow-2xl p-5 sm:p-10 lg:p-16 flex flex-col justify-between scroll-mt-24">
      {/* Background Orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-[500px] h-[500px] rounded-full bg-[radial-gradient(closest-side,rgba(168,85,247,0.12),transparent)]" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] rounded-full bg-[radial-gradient(closest-side,rgba(34,211,238,0.12),transparent)]" />
      </div>

      {/* Top Header Tag */}
      <div className="flex flex-col gap-2 border-b border-white/10 pb-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-950/60 text-purple-300 text-xs font-mono font-bold tracking-widest w-max backdrop-blur-md">
          <Workflow className="w-3.5 h-3.5 text-purple-400" />
          <span>04 // SKILLS</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-display font-extrabold text-white tracking-tight leading-tight max-w-full break-words">
          Technical Skills
        </h2>
      </div>

      {/* Every category is visible at once so the full stack can be scanned without clicking */}
      <div className="relative z-10 my-auto pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-5">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            className={`p-4 sm:p-5 xl:p-6 rounded-2xl border border-white/10 border-t-2 ${cat.accent} bg-slate-900/60 backdrop-blur-xl flex flex-col gap-4`}
          >
            <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
              <h3 className="font-display font-extrabold text-sm sm:text-base text-white flex items-center gap-2 leading-tight">
                <span className="p-1 rounded bg-white/5 shrink-0">{cat.icon}</span>
                <span className="break-words">{cat.title}</span>
              </h3>
              <span className="text-[11px] font-mono text-slate-400 font-bold shrink-0">
                {cat.skills.length}
              </span>
            </div>

            <ul className="flex flex-wrap xl:flex-col gap-2">
              {cat.skills.map((s) => (
                <li
                  key={s}
                  className="flex items-center gap-2 text-xs font-sans text-slate-200 px-2.5 py-1.5 xl:px-0 xl:py-0 rounded-lg bg-white/5 xl:bg-transparent border border-white/10 xl:border-0"
                >
                  {getOriginalTechIcon(s, "w-4 h-4 shrink-0")}
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
