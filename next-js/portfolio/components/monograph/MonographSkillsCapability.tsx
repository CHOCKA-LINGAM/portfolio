"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  Server,
  Database,
  Cloud,
  Layout,
  Workflow,
} from "lucide-react";
import { getOriginalTechIcon } from "@/components/ui/TechBrandIcons";

export function MonographSkillsCapability() {
  const categories = [
    {
      id: "backend",
      title: "Backend Systems",
      icon: <Server className="w-4 h-4 text-emerald-400" />,
      skills: ["Python", "FastAPI", "Django", "Async APIs", "Microservices", "SQL"],
    },
    {
      id: "data",
      title: "Data Engineering",
      icon: <Database className="w-4 h-4 text-cyan-400" />,
      skills: ["Databricks", "PySpark", "ETL Pipelines", "Apache Airflow", "Delta Lake", "SQL Server"],
    },
    {
      id: "ai",
      title: "AI / ML Systems",
      icon: <Cpu className="w-4 h-4 text-purple-400" />,
      skills: ["OpenAI API", "Claude Sonnet/Opus", "AWS Bedrock", "LLM Pipelines", "XGBoost", "RAG Search"],
    },
    {
      id: "frontend",
      title: "Frontend & Web",
      icon: <Layout className="w-4 h-4 text-sky-400" />,
      skills: ["React.js", "Angular", "TypeScript / JS", "HTML5 / CSS3", "REST Integration"],
    },
    {
      id: "cloud",
      title: "Cloud & DevOps",
      icon: <Cloud className="w-4 h-4 text-amber-400" />,
      skills: ["Azure", "Docker", "AKS / Kubernetes", "GCP", "Celery Tasks", "CI/CD"],
    },
  ];

  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <section id="section-skills" className="relative w-full min-h-[85vh] rounded-3xl overflow-hidden border border-purple-500/20 bg-slate-950 text-white shadow-2xl p-5 sm:p-10 lg:p-16 my-8 flex flex-col justify-between scroll-mt-24">
      {/* Background Orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[140px]" />
      </div>

      {/* Top Header Tag */}
      <div className="flex flex-col gap-2 border-b border-white/10 pb-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-950/60 text-purple-300 text-xs font-mono font-bold tracking-widest w-max backdrop-blur-md">
          <Workflow className="w-3.5 h-3.5 text-purple-400" />
          <span>04 // SKILLS</span>
        </div>
        <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-extrabold text-white tracking-tight leading-tight max-w-full break-words">
          Technical Skills
        </h2>
      </div>

      {/* Main Content */}
      <div className="relative z-10 my-auto py-8 flex flex-col gap-6">
        
        {/* Mobile Horizontal Category Tab Selector Bar */}
        <div className="flex sm:hidden overflow-x-auto gap-2 pb-2 border-b border-white/10 no-scrollbar font-mono text-xs">
          {categories.map((cat) => {
            const isSelected = activeCategory.id === cat.id;
            return (
              <button
                key={`skills-tab-${cat.id}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer border ${
                  isSelected
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-md"
                    : "bg-slate-900/80 text-slate-300 border-white/10 hover:border-white/30"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* 5 Category Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-5">
          {categories.map((cat) => {
            const isSelected = activeCategory.id === cat.id;
            return (
              <motion.div
                key={cat.id}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ y: -4 }}
                className={`p-4 sm:p-5 xl:p-6 rounded-2xl border text-left font-mono transition-all cursor-pointer backdrop-blur-xl flex flex-col gap-4 ${
                  isSelected
                    ? "bg-slate-900/90 border-cyan-400 text-white shadow-[0_0_30px_rgba(34,211,238,0.3)] ring-1 ring-cyan-400/40"
                    : "bg-slate-950/60 border-white/10 text-slate-300 hover:border-white/30"
                }`}
              >
                <div className="flex items-start justify-between gap-2 border-b border-white/10 pb-3 min-h-[44px]">
                  <span className="font-display font-extrabold text-sm sm:text-base text-white flex items-center gap-2 leading-tight">
                    <span className="p-1 rounded bg-white/5 shrink-0">{cat.icon}</span>
                    <span className="break-words">{cat.title}</span>
                  </span>
                  <span className="text-[10px] text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30 shrink-0 mt-0.5">
                    {cat.skills.length} TECHS
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  {cat.skills.map((s) => (
                    <div key={s} className="flex items-center gap-2 text-xs font-sans text-slate-300">
                      {getOriginalTechIcon(s, "w-4 h-4 shrink-0")}
                      <span className="truncate">{s}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Footer Tag */}
      <div className="flex items-center justify-end pt-4 border-t border-white/10 text-xs font-mono text-slate-400 relative z-10">
        <span>04 / 06</span>
      </div>
    </section>
  );
}
