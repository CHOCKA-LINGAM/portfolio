"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Server, Database, Cloud, Sparkles, Workflow, CheckCircle2 } from "lucide-react";

export function MonographSkillsCapability() {
  const categories = [
    {
      id: "backend",
      title: "Backend",
      icon: <Server className="w-4 h-4 text-emerald-400" />,
      skills: ["Python", "FastAPI", "Django", "APIs", "Microservices", "SQL"],
    },
    {
      id: "data",
      title: "Data Engineering",
      icon: <Database className="w-4 h-4 text-cyan-400" />,
      skills: ["Databricks", "PySpark", "ETL", "Data Pipelines", "Airflow", "Delta Lake"],
    },
    {
      id: "ai",
      title: "AI / ML",
      icon: <Cpu className="w-4 h-4 text-purple-400" />,
      skills: ["OpenAI", "Claude", "AWS Bedrock", "LLM Pipelines", "Model Evaluation", "Computer Vision"],
    },
    {
      id: "cloud",
      title: "Cloud & DevOps",
      icon: <Cloud className="w-4 h-4 text-amber-400" />,
      skills: ["Azure", "AWS", "Docker", "Kubernetes", "CI/CD", "Scalable Systems"],
    },
  ];

  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <section id="section-skills" className="relative w-full min-h-[90vh] rounded-3xl overflow-hidden border border-purple-500/20 bg-slate-950 text-white shadow-2xl p-6 sm:p-12 lg:p-16 my-8 flex flex-col justify-between scroll-mt-24">
      {/* Background Orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[140px]" />
      </div>

      {/* Top Header Tag */}
      <div className="flex flex-col gap-2 border-b border-white/10 pb-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-950/60 text-purple-300 text-xs font-mono font-bold tracking-widest w-max backdrop-blur-md">
          <Workflow className="w-3.5 h-3.5 text-purple-400" />
          <span>06 // SKILLS — CAPABILITY MAP</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-white tracking-tight">
          A blend that delivers.
        </h2>
        <p className="text-sm font-sans text-slate-400 max-w-xl">
          Technologies, frameworks and platforms I use to build, scale and ship meaningful solutions.
        </p>
      </div>

      {/* Main Content: SYSTEMS Root Tree Taxonomy matching Panel 06 */}
      <div className="relative z-10 my-auto py-8 flex flex-col gap-8">
        
        {/* Top SYSTEMS Root Node */}
        <div className="self-center px-6 py-2 rounded-full bg-cyan-950/90 border border-cyan-400 text-cyan-300 text-xs font-mono font-bold tracking-widest shadow-[0_0_30px_rgba(34,211,238,0.4)]">
          SYSTEMS CORE
        </div>

        {/* Branching Category Columns matching Panel 06 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const isSelected = activeCategory.id === cat.id;
            return (
              <motion.div
                key={cat.id}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ y: -4 }}
                className={`p-6 rounded-2xl border text-left font-mono transition-all cursor-pointer backdrop-blur-xl flex flex-col gap-4 ${
                  isSelected
                    ? "bg-slate-900/90 border-cyan-400 text-white shadow-[0_0_30px_rgba(34,211,238,0.3)]"
                    : "bg-slate-950/60 border-white/10 text-slate-300 hover:border-white/30"
                }`}
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-display font-extrabold text-base text-white flex items-center gap-2">
                    {cat.icon}
                    {cat.title}
                  </span>
                  <span className="text-[10px] text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30">
                    {cat.skills.length} TECHS
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  {cat.skills.map((s) => (
                    <div key={s} className="flex items-center gap-2 text-xs font-sans text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Footer Tag matching Panel 06 */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-mono text-slate-400 relative z-10">
        <span className="tracking-widest font-bold text-slate-300">
          ALWAYS LEARNING. ALWAYS EXPLORING.
        </span>
        <span>06 / 09</span>
      </div>
    </section>
  );
}
