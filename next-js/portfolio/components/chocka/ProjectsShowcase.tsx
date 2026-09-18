"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  Sparkles,
  Workflow,
  Layers,
  Database,
  Terminal,
  Cpu,
  Box,
  LayoutGrid,
  List,
  Search,
  CheckCircle2,
  ArrowRight,
  Play,
  Network,
  GitCommit,
  GitBranch,
} from "lucide-react";
import { PROJECTS, type Project } from "@/data/index";

const DOMAINS = [
  "All Projects",
  "Data Engineering",
  "AI / LLM",
  "Backend Systems",
  "Fullstack",
  "Computer Vision",
  "Analytics / BI",
];

export function ProjectsShowcase() {
  const projects = PROJECTS as Project[];
  const [selectedDomain, setSelectedDomain] = useState("All Projects");
  const [activeProject, setActiveProject] = useState(projects[0]);
  const [viewMode, setViewMode] = useState<"system" | "list">("system");
  const [activeTab, setActiveTab] = useState<"overview" | "architecture" | "stack">("architecture");

  const filteredProjects = projects.filter((p) => {
    if (selectedDomain === "All Projects") return true;
    if (selectedDomain === "Data Engineering" && (p.tags.includes("data") || p.stack.includes("PySpark"))) return true;
    if (selectedDomain === "AI / LLM" && (p.tags.includes("ai") || p.stack.includes("OpenAI"))) return true;
    if (selectedDomain === "Backend Systems" && p.stack.includes("FastAPI")) return true;
    return p.tags.some((t) => t.toLowerCase().includes(selectedDomain.toLowerCase()));
  });

  return (
    <section id="section-projects" className="relative w-full min-h-[90vh] rounded-3xl overflow-hidden border border-cyan-500/20 bg-slate-950/90 shadow-2xl p-6 sm:p-10 lg:p-12 my-8 flex flex-col justify-between">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/60 text-cyan-300 text-xs font-mono font-bold tracking-widest w-max backdrop-blur-md">
            <Network className="w-3.5 h-3.5 text-cyan-400" />
            <span>03 // PROJECTS (INTERACTIVE SHOWCASE & SYSTEM MAP)</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-white tracking-tight">
            Real Systems. Real Impact.
          </h2>
          <p className="text-sm font-serif-italic text-cyan-300">
            Not cards — an interactive ecosystem of real production systems.
          </p>
        </div>

        {/* System vs List View Switcher */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-900 border border-white/15 font-mono text-xs shrink-0 shadow-lg">
          <button
            onClick={() => setViewMode("system")}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer font-bold ${
              viewMode === "system"
                ? "bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 shadow-[0_0_20px_rgba(52,211,153,0.4)]"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Workflow className="w-4 h-4" />
            System View
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer font-bold ${
              viewMode === "list"
                ? "bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 shadow-[0_0_20px_rgba(52,211,153,0.4)]"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <List className="w-4 h-4" />
            List View
          </button>
        </div>
      </div>

      {/* Main Content Grid: System Constellation Graph & Architectural DAG Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-auto py-6">
        
        {/* Left Column: Interactive System Network Constellation Graph (Matching Mockup 3) */}
        <div className="lg:col-span-5 flex flex-col gap-5 p-6 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-xl shadow-2xl">
          
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              // SYSTEM NETWORK MAP
            </span>
            <span className="text-[11px] font-mono text-slate-400">Click node to inspect</span>
          </div>

          {/* Domain Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {DOMAINS.map((domain) => {
              const isActive = selectedDomain === domain;
              return (
                <button
                  key={domain}
                  onClick={() => setSelectedDomain(domain)}
                  className={`px-3 py-1 rounded-xl text-[11px] font-mono font-bold transition-all border cursor-pointer ${
                    isActive
                      ? "bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-sm"
                      : "bg-slate-950/60 text-slate-400 border-white/10 hover:text-white"
                  }`}
                >
                  {domain}
                </button>
              );
            })}
          </div>

          {/* Connected Constellation System Map Nodes with Deterministic SVG Line Connections */}
          <div className="relative w-full h-[320px] rounded-xl bg-slate-950/90 border border-cyan-500/20 overflow-hidden p-4">
            {/* SVG Glowing Line Connectors */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <line x1="22%" y1="25%" x2="48%" y2="48%" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.7" />
              <line x1="72%" y1="22%" x2="48%" y2="48%" stroke="#34d399" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.7" />
              <line x1="18%" y1="72%" x2="48%" y2="48%" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.7" />
              <line x1="68%" y1="78%" x2="48%" y2="48%" stroke="#34d399" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.7" />
              <line x1="82%" y1="50%" x2="48%" y2="48%" stroke="#fde047" strokeWidth="1.5" opacity="0.6" />
              <line x1="22%" y1="25%" x2="72%" y2="22%" stroke="#34d399" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
              <line x1="18%" y1="72%" x2="68%" y2="78%" stroke="#a855f7" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
            </svg>

            {/* Central Core System Label */}
            <div
              className="absolute z-10 px-3 py-1.5 rounded-full bg-cyan-950/95 border border-cyan-400 text-cyan-300 text-[10px] font-mono font-bold shadow-[0_0_20px_rgba(34,211,238,0.5)]"
              style={{ top: "48%", left: "48%", transform: "translate(-50%, -50%)" }}
            >
              SYSTEMS CORE
            </div>

            {/* Project Nodes positioned at precise coordinates */}
            {filteredProjects.map((p, idx) => {
              const isSelected = activeProject.id === p.id;
              // Coordinates for node layout
              const coords = [
                { top: "25%", left: "22%" },
                { top: "22%", left: "72%" },
                { top: "72%", left: "18%" },
                { top: "78%", left: "68%" },
                { top: "50%", left: "82%" },
                { top: "85%", left: "40%" },
              ];
              const pos = coords[idx % coords.length];

              return (
                <button
                  key={p.id}
                  onClick={() => setActiveProject(p)}
                  className={`absolute z-20 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl border text-[11px] font-mono font-bold transition-all cursor-pointer backdrop-blur-md shadow-lg flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 border-white scale-110 shadow-[0_0_25px_rgba(52,211,153,0.6)] z-30"
                      : "bg-slate-900/90 text-slate-200 border-white/15 hover:border-cyan-400 hover:scale-105 z-20"
                  }`}
                  style={{
                    top: pos.top,
                    left: pos.left,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <GitCommit className="w-3 h-3 text-cyan-400 shrink-0" />
                  <span className="truncate max-w-[110px]">{p.title}</span>
                </button>
              );
            })}
          </div>

          {/* Project Selector Cards */}
          <div className="flex flex-col gap-2 pt-1">
            {filteredProjects.map((p, idx) => {
              const isSelected = activeProject.id === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveProject(p)}
                  className={`p-3 rounded-xl border text-left font-mono text-xs transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? "bg-slate-950 border-emerald-400 text-white shadow-md font-bold"
                      : "bg-slate-950/50 border-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-emerald-400">0{idx + 1}</span>
                    <span className="truncate max-w-[180px]">{p.title}</span>
                  </div>
                  <span className="text-[10px] text-cyan-400">{p.status}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Right Column: Deep Dive Architectural View (Matching Mockup 04) */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-slate-950/90 border border-cyan-500/30 backdrop-blur-2xl shadow-2xl flex flex-col gap-6 justify-between min-h-[460px]">
          
          {/* Top Title & Links */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-mono text-emerald-400 font-bold">
                04 // PROJECT DETAIL (DEEP DIVE ARCHITECTURE)
              </span>
              <h3 className="text-3xl font-display font-extrabold text-white mt-1">
                {activeProject.title}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              {activeProject.link && (
                <a
                  href={activeProject.link}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl text-xs font-mono font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(52,211,153,0.4)] cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                </a>
              )}
              {activeProject.github && (
                <a
                  href={activeProject.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl text-xs font-mono font-bold text-white border border-white/20 bg-slate-900 hover:bg-slate-800 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Github className="w-3.5 h-3.5 text-cyan-400" /> View Code
                </a>
              )}
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-white/10 pb-3 font-mono text-xs">
            <button
              onClick={() => setActiveTab("architecture")}
              className={`px-3.5 py-1.5 rounded-xl cursor-pointer transition-all ${
                activeTab === "architecture"
                  ? "bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Architecture (DAG Flow)
            </button>
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-3.5 py-1.5 rounded-xl cursor-pointer transition-all ${
                activeTab === "overview"
                  ? "bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Overview & Features
            </button>
            <button
              onClick={() => setActiveTab("stack")}
              className={`px-3.5 py-1.5 rounded-xl cursor-pointer transition-all ${
                activeTab === "stack"
                  ? "bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Tech Stack
            </button>
          </div>

          {/* Tab 1: Architecture DAG Execution Flow matching Mockup 04 */}
          {activeTab === "architecture" && (
            <div className="flex flex-col gap-5 font-mono text-xs">
              <span className="text-emerald-400 font-bold flex items-center gap-2">
                <Workflow className="w-4 h-4" />
                // END-TO-END PIPELINE ARCHITECTURE (DAG FLOW)
              </span>

              {/* Main Execution Flow Diagram */}
              <div className="p-6 rounded-2xl bg-slate-900/90 border border-white/15 flex flex-wrap items-center justify-between gap-3 text-center shadow-inner">
                <div className="p-3.5 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 flex flex-col shadow-lg">
                  <span className="font-bold">Tableau Prep Flow</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">(JSON Ingestion)</span>
                </div>
                
                <span className="text-emerald-400 font-bold text-lg">→</span>
                
                <div className="p-3.5 rounded-xl bg-purple-950/80 border border-purple-500/40 text-purple-300 flex flex-col shadow-lg">
                  <span className="font-bold">Parser & Compiler</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">(AST Generation)</span>
                </div>

                <span className="text-emerald-400 font-bold text-lg">→</span>

                <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 flex flex-col shadow-lg">
                  <span className="font-bold">DAG Engine</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">(Task Graph)</span>
                </div>

                <span className="text-emerald-400 font-bold text-lg">→</span>

                <div className="p-3.5 rounded-xl bg-amber-950/80 border border-amber-500/40 text-amber-300 flex flex-col shadow-lg">
                  <span className="font-bold">Databricks Execution</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">(PySpark Parallel)</span>
                </div>
              </div>

              {/* Side Pillars: LLM Transformation & Validation Testing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/30 flex flex-col gap-1">
                  <span className="text-purple-300 font-bold">LLM (OpenAI / Claude)</span>
                  <span className="text-[11px] text-slate-300 font-sans">Automated SQL transformation & PySpark translation</span>
                </div>
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex flex-col gap-1">
                  <span className="text-emerald-300 font-bold">Validation & Testing</span>
                  <span className="text-[11px] text-slate-300 font-sans">Automated schema validation & zero-data-loss verification</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Overview */}
          {activeTab === "overview" && (
            <div className="flex flex-col gap-4 font-sans text-xs">
              <p className="text-sm font-sans text-slate-200 leading-relaxed bg-slate-900/80 p-5 rounded-2xl border border-white/10">
                {activeProject.desc}
              </p>

              <div className="flex flex-col gap-2 pt-2">
                <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-widest">// KEY FEATURES & CAPABILITIES</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-sans">
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-white/10 flex items-center gap-2.5 text-slate-200 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>DAG-based execution engine</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-white/10 flex items-center gap-2.5 text-slate-200 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>AI-powered migration accelerators</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-white/10 flex items-center gap-2.5 text-slate-200 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Automated testing & validation</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-white/10 flex items-center gap-2.5 text-slate-200 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Scalable with Azure Databricks</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Tech Stack */}
          {activeTab === "stack" && (
            <div className="flex flex-col gap-3 font-mono text-xs">
              <span className="text-cyan-400 font-bold">// TECH STACK BADGES</span>
              <div className="flex flex-wrap gap-2.5">
                {activeProject.stack.map((s) => (
                  <span
                    key={s}
                    className="px-4 py-2 rounded-xl bg-slate-900 text-cyan-200 border border-cyan-500/30 font-bold flex items-center gap-2 shadow-md"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </section>
  );
}

