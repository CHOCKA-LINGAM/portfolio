"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Workflow, Database, Server, Cpu, Cloud, Layout, ArrowRight, Terminal, Code2, Box, Flame, Globe, Sparkles, Orbit } from "lucide-react";

const DOMAINS = [
  {
    id: "backend",
    label: "Backend Architecture",
    icon: <Server className="w-5 h-5 text-emerald-400" />,
    desc: "Building scalable APIs, distributed microservices, and async event queues to handle real-world scale.",
    skills: ["FastAPI", "Django", "Flask", "REST APIs", "Microservices", "Async Processing", "Clean Architecture"],
  },
  {
    id: "data",
    label: "Data Engineering",
    icon: <Database className="w-5 h-5 text-cyan-400" />,
    desc: "Multi-terabyte distributed data ingestion and lakehouse architectures using PySpark & Databricks.",
    skills: ["PySpark", "Databricks", "Apache Spark", "Delta Lake", "ETL Pipelines", "Databricks PyPI Package"],
  },
  {
    id: "ai",
    label: "AI / ML Workflows",
    icon: <Cpu className="w-5 h-5 text-purple-400" />,
    desc: "Enterprise foundation model workflows, prompt guardrails, and autonomous agent orchestration.",
    skills: ["OpenAI API", "AWS Bedrock", "LangChain", "LLM Workflows", "Multi-Agent Fallbacks", "Prompt Guardrails"],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    icon: <Cloud className="w-5 h-5 text-amber-400" />,
    desc: "Containerized deployments and automated zero-downtime CI/CD pipelines across Azure and AWS.",
    skills: ["Azure AKS", "Docker", "Kubernetes", "AWS", "CI/CD Pipelines", "Azure DevOps"],
  },
  {
    id: "databases",
    label: "Databases & Storage",
    icon: <Database className="w-5 h-5 text-blue-400" />,
    desc: "Relational data modeling, connection pooling, vector indexing, and memory cache tuning.",
    skills: ["PostgreSQL", "SQL Server", "Delta Lake", "Redis", "Vector DB"],
  },
  {
    id: "orchestration",
    label: "Orchestration & DAGs",
    icon: <Workflow className="w-5 h-5 text-pink-400" />,
    desc: "DAG-based execution flows and asynchronous distributed task scheduling.",
    skills: ["Apache Kafka", "Airflow", "DAG Engines", "Celery"],
  },
];

export function SkillsGalaxy() {
  const [selectedDomain, setSelectedDomain] = useState(DOMAINS[0]);

  return (
    <section id="section-skills" className="relative w-full min-h-[85vh] rounded-3xl overflow-hidden border border-purple-500/20 bg-slate-950/90 shadow-2xl p-6 sm:p-10 lg:p-12 my-8 flex flex-col justify-between scroll-mt-24">
      
      {/* Top Header */}
      <div className="flex flex-col gap-2 border-b border-white/10 pb-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-950/60 text-purple-300 text-xs font-mono font-bold tracking-widest w-max backdrop-blur-md">
          <Orbit className="w-3.5 h-3.5 text-purple-400 animate-spin" style={{ animationDuration: "20s" }} />
          <span>06 // SKILLS & TECHNOLOGIES (INTERACTIVE GALAXY)</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-white tracking-tight">
          Skills & Technologies
        </h2>
        <p className="text-sm font-serif-italic text-cyan-300">
          More than a list. Explore by domain.
        </p>
      </div>

      {/* Main Content Grid: Left Astronomy Orbit Diagram, Right Skill Inspector Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 my-auto py-6">
        
        {/* Left Column: Astronomy Concentric Orbit System with User Avatar Core */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="relative w-full h-[380px] sm:h-[440px] rounded-2xl border border-white/10 bg-slate-950/80 p-4 shadow-2xl flex items-center justify-center overflow-hidden">
            
            {/* Background Concentric SVG Rings with Glowing Orbits */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
              <circle cx="200" cy="200" r="70" fill="none" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="1.5" strokeDasharray="4 4" />
              <circle cx="200" cy="200" r="130" fill="none" stroke="rgba(168, 85, 247, 0.25)" strokeWidth="1.5" strokeDasharray="6 6" />
              <circle cx="200" cy="200" r="175" fill="none" stroke="rgba(52, 211, 153, 0.2)" strokeWidth="1.5" />
            </svg>

            {/* Central Sun Core featuring Chocka's Own Avatar */}
            <div className="relative z-20 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-emerald-500 via-cyan-500 to-purple-600 p-[2px] shadow-[0_0_50px_rgba(56,189,248,0.5)] animate-pulse">
              <div className="relative w-full h-full rounded-full bg-slate-950 overflow-hidden flex flex-col items-center justify-center text-center p-2">
                <Image
                  src="/avatars/3d-cartoon.png"
                  alt="Chocka Core Avatar"
                  fill
                  className="object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="relative z-10 flex flex-col items-center mt-auto pb-1">
                  <span className="text-[10px] font-display font-extrabold text-white leading-tight">CHOCKA</span>
                  <span className="text-[8px] font-mono text-cyan-300 font-bold">CORE</span>
                </div>
              </div>
            </div>

            {/* Orbiting Satellite Orbs positioned relative to center */}
            {DOMAINS.map((domain, i) => {
              const angle = (i * (360 / DOMAINS.length) * Math.PI) / 180;
              const radius = 135; // px radius adapted for fluid viewports
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              const isSelected = selectedDomain.id === domain.id;

              return (
                <motion.button
                  key={domain.id}
                  initial={false}
                  animate={{ scale: isSelected ? 1.15 : 1 }}
                  onClick={() => setSelectedDomain(domain)}
                  className={`absolute z-30 px-3 py-2 rounded-2xl border flex items-center gap-2 font-mono text-xs font-bold transition-all cursor-pointer backdrop-blur-xl shadow-xl ${
                    isSelected
                      ? "bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 border-white shadow-[0_0_25px_rgba(52,211,153,0.6)] z-40"
                      : "bg-slate-900/90 text-white border-white/15 hover:border-cyan-400 hover:bg-slate-900"
                  }`}
                  style={{
                    top: `calc(50% + ${y}px)`,
                    left: `calc(50% + ${x}px)`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="p-1 rounded-lg bg-slate-950/40">{domain.icon}</div>
                  <span className="truncate max-w-[110px] sm:max-w-none">{domain.label}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Domain Pills Row for Mobile & Quick Navigation */}
          <div className="flex flex-wrap gap-1.5 justify-center">
            {DOMAINS.map((domain) => {
              const isSelected = selectedDomain.id === domain.id;
              return (
                <button
                  key={domain.id}
                  onClick={() => setSelectedDomain(domain)}
                  className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all border cursor-pointer ${
                    isSelected
                      ? "bg-purple-500/30 text-purple-300 border-purple-400 shadow-md"
                      : "bg-slate-900/60 text-slate-400 border-white/10 hover:text-white"
                  }`}
                >
                  {domain.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Domain Inspector Matrix Panel */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-slate-950/90 border border-purple-500/30 backdrop-blur-2xl shadow-2xl flex flex-col justify-between min-h-[420px] gap-6">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDomain.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-5"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-500/40">
                    {selectedDomain.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                      {selectedDomain.label}
                    </h3>
                    <span className="text-xs font-mono text-emerald-400 font-bold">
                      PRODUCTION STACK
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono text-cyan-400 font-bold px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30">
                  {selectedDomain.skills.length} MODULES
                </span>
              </div>

              <p className="text-sm font-sans text-slate-300 leading-relaxed bg-slate-900/80 p-4 rounded-xl border border-white/10">
                {selectedDomain.desc}
              </p>

              <div className="flex flex-col gap-3 pt-2">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  // ENTERPRISE TECH MATRIX
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {selectedDomain.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-cyan-200 border border-cyan-500/30 text-xs font-mono font-bold shadow-md hover:border-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom Quote note */}
          <div className="pt-4 border-t border-white/10 text-xs font-serif-italic text-slate-400 text-center">
            &quot;Architecting systems that scale with business impact.&quot;
          </div>
        </div>

      </div>

    </section>
  );
}


