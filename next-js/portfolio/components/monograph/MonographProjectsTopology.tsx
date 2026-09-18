"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Network, GitCommit, ArrowRight, Layers, Workflow, ExternalLink, Github } from "lucide-react";
import { PROJECTS, type Project } from "@/data/index";

const DOMAINS = ["All", "Data", "AI / ML", "Backend", "Systems"];

export function MonographProjectsTopology({
  onSelectProject,
}: {
  onSelectProject: (p: Project) => void;
}) {
  const projects = PROJECTS as Project[];
  const [selectedDomain, setSelectedDomain] = useState("All");
  const [activeProject, setActiveProject] = useState(projects[0]);

  const filteredProjects = projects.filter((p) => {
    if (selectedDomain === "All") return true;
    if (selectedDomain === "Data" && (p.tags.includes("data") || p.stack.includes("PySpark"))) return true;
    if (selectedDomain === "AI / ML" && (p.tags.includes("ai") || p.stack.includes("OpenAI"))) return true;
    if (selectedDomain === "Backend" && p.stack.includes("FastAPI")) return true;
    return p.tags.some((t) => t.toLowerCase().includes(selectedDomain.toLowerCase()));
  });

  return (
    <section id="section-projects" className="relative w-full min-h-[90vh] rounded-3xl overflow-hidden border border-slate-200 bg-[#f8fafc] text-slate-900 shadow-2xl p-6 sm:p-12 lg:p-16 my-8 flex flex-col justify-between scroll-mt-24">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-300 bg-white text-slate-700 text-xs font-mono font-bold tracking-widest w-max shadow-sm">
            <Network className="w-3.5 h-3.5 text-cyan-600" />
            <span>03 / PROJECTS — SYSTEM TOPOLOGY</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-slate-950 tracking-tight">
            Real systems. Real impact.
          </h2>
        </div>

        <p className="text-xs sm:text-sm font-sans text-slate-600 max-w-md">
          A collection of projects across data, AI and backend systems. Each one solves a meaningful real-world problem.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 my-4">
        {DOMAINS.map((domain) => {
          const isActive = selectedDomain === domain;
          return (
            <button
              key={domain}
              onClick={() => setSelectedDomain(domain)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all border cursor-pointer ${
                isActive
                  ? "bg-slate-950 text-white border-slate-950 shadow-md"
                  : "bg-white text-slate-600 border-slate-300 hover:text-slate-950 hover:border-slate-400"
              }`}
            >
              {domain}
            </button>
          );
        })}
      </div>

      {/* Main Content Grid: Topology Constellation Canvas */}
      <div className="relative w-full h-[380px] sm:h-[460px] rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden p-6 flex items-center justify-center my-4">
        
        {/* Glowing Radial Lines SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <circle cx="50%" cy="50%" r="90" fill="none" stroke="rgba(2, 132, 199, 0.15)" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="50%" cy="50%" r="160" fill="none" stroke="rgba(124, 58, 237, 0.15)" strokeWidth="1.5" />

          {/* Radial Rays from Center */}
          <line x1="50%" y1="50%" x2="25%" y2="25%" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
          <line x1="50%" y1="50%" x2="75%" y2="22%" stroke="#7c3aed" strokeWidth="1.5" opacity="0.6" />
          <line x1="50%" y1="50%" x2="20%" y2="75%" stroke="#059669" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
          <line x1="50%" y1="50%" x2="80%" y2="78%" stroke="#0284c7" strokeWidth="1.5" opacity="0.6" />
          <line x1="50%" y1="50%" x2="88%" y2="48%" stroke="#d97706" strokeWidth="1.5" opacity="0.6" />
        </svg>

        {/* Central SYSTEMS Node matching Mockup 03 */}
        <div
          className="absolute z-20 px-5 py-2.5 rounded-full bg-slate-950 text-white font-mono text-xs font-extrabold shadow-[0_0_30px_rgba(2,6,23,0.3)] border border-slate-700 tracking-wider"
          style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        >
          SYSTEMS
        </div>

        {/* Project Satellite Nodes positioned around Central Node */}
        {filteredProjects.map((p, idx) => {
          const isSelected = activeProject.id === p.id;
          const coords = [
            { top: "25%", left: "25%" },
            { top: "22%", left: "75%" },
            { top: "75%", left: "20%" },
            { top: "78%", left: "80%" },
            { top: "48%", left: "88%" },
            { top: "85%", left: "48%" },
          ];
          const pos = coords[idx % coords.length];

          return (
            <motion.button
              key={p.id}
              onClick={() => {
                setActiveProject(p);
                onSelectProject(p);
              }}
              whileHover={{ scale: 1.08 }}
              className={`absolute z-30 px-3.5 py-2 rounded-2xl border font-mono text-xs font-bold transition-all cursor-pointer backdrop-blur-md shadow-lg flex items-center gap-2 ${
                isSelected
                  ? "bg-slate-950 text-white border-slate-950 shadow-2xl scale-110 z-40"
                  : "bg-white/90 text-slate-800 border-slate-300 hover:border-slate-950"
              }`}
              style={{
                top: pos.top,
                left: pos.left,
                transform: "translate(-50%, -50%)",
              }}
            >
              <span className={`w-2 h-2 rounded-full ${isSelected ? "bg-cyan-400 animate-ping" : "bg-slate-400"}`} />
              <span className="truncate max-w-[150px]">{p.title}</span>
            </motion.button>
          );
        })}

      </div>

      {/* Footer Instructions matching Panel 03 */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 text-xs font-mono text-slate-500">
        <span>Click a node to explore — Each project is a system.</span>
        <span>03 / 09</span>
      </div>
    </section>
  );
}
