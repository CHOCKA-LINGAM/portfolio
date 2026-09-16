"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Database,
  Server,
  Cpu,
  Cloud,
  Layout,
  ArrowRight,
  Terminal,
  Code2,
  Box,
  Flame,
  Globe,
  GitBranch,
  ShieldCheck,
  Workflow,
  LineChart,
  Search,
  X,
} from "lucide-react";
import skillsData from "@/data/skills.json";
import SectionLayout from "@/components/layout/SectionLayout";
import { NarratorStrip } from "@/components/ui/NarratorStrip";

function getSkillIcon(skill: string) {
  const s = skill.toLowerCase();
  if (s.includes("python")) return <Terminal className="w-3.5 h-3.5 text-yellow-400" />;
  if (s.includes("fastapi") || s.includes("django") || s.includes("flask"))
    return <Server className="w-3.5 h-3.5 text-emerald-400" />;
  if (s.includes("databricks") || s.includes("pyspark"))
    return <Flame className="w-3.5 h-3.5 text-orange-400" />;
  if (s.includes("postgresql") || s.includes("sql"))
    return <Database className="w-3.5 h-3.5 text-sky-400" />;
  if (s.includes("openai") || s.includes("bedrock") || s.includes("langchain"))
    return <Cpu className="w-3.5 h-3.5 text-purple-400" />;
  if (s.includes("azure") || s.includes("docker") || s.includes("kubernetes"))
    return <Box className="w-3.5 h-3.5 text-amber-400" />;
  if (s.includes("github") || s.includes("ci/cd"))
    return <GitBranch className="w-3.5 h-3.5 text-slate-300" />;
  if (s.includes("next.js") || s.includes("react"))
    return <Globe className="w-3.5 h-3.5 text-cyan-400" />;
  if (s.includes("typescript")) return <Code2 className="w-3.5 h-3.5 text-blue-400" />;
  if (s.includes("power bi") || s.includes("analytics"))
    return <LineChart className="w-3.5 h-3.5 text-yellow-400" />;
  if (s.includes("guardrails") || s.includes("fallback"))
    return <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />;
  return <Workflow className="w-3.5 h-3.5 text-indigo-400" />;
}

const STAGE_ICONS: Record<string, React.ReactNode> = {
  Database: <Database className="w-4 h-4 text-emerald-400" />,
  Server: <Server className="w-4 h-4 text-sky-400" />,
  Cpu: <Cpu className="w-4 h-4 text-purple-400" />,
  Cloud: <Cloud className="w-4 h-4 text-amber-400" />,
  Layout: <Layout className="w-4 h-4 text-indigo-400" />,
};

const STAGE_THEMES: Record<string, { border: string; glow: string; text: string; badge: string }> = {
  "layer-data": {
    border: "border-emerald-500/40 hover:border-emerald-500/70",
    glow: "rgba(52, 211, 153, 0.15)",
    text: "#34d399",
    badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  },
  "layer-backend": {
    border: "border-sky-500/40 hover:border-sky-500/70",
    glow: "rgba(56, 189, 248, 0.15)",
    text: "#38bdf8",
    badge: "bg-sky-500/15 text-sky-400 border-sky-500/30",
  },
  "layer-ai": {
    border: "border-purple-500/40 hover:border-purple-500/70",
    glow: "rgba(192, 132, 252, 0.15)",
    text: "#c084fc",
    badge: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  },
  "layer-infra": {
    border: "border-amber-500/40 hover:border-amber-500/70",
    glow: "rgba(251, 191, 36, 0.15)",
    text: "#fbbf24",
    badge: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  },
  "layer-ui": {
    border: "border-indigo-500/40 hover:border-indigo-500/70",
    glow: "rgba(129, 140, 248, 0.15)",
    text: "#818cf8",
    badge: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
  },
};

export default function Skills() {
  const authenticNodes = skillsData.nodes;
  const [selectedLayer, setSelectedLayer] = useState<string>("layer-backend");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("Core Services");

  const activeData = authenticNodes.find((l) => l.id === selectedLayer) || authenticNodes[1];
  const activeTheme = STAGE_THEMES[activeData.id] || STAGE_THEMES["layer-backend"];

  const q = searchQuery.toLowerCase().trim();

  const isMatch = (skillName: string) => {
    if (!q) return true;
    return skillName.toLowerCase().includes(q);
  };

  const handleCardClick = (node: (typeof authenticNodes)[0]) => {
    setSelectedLayer(node.id);
    setSelectedCategoryFilter(node.category);
  };

  const handleCategoryChipClick = (cat: string) => {
    setSelectedCategoryFilter(cat);
    if (cat === "All") return;
    const matchingLayer = authenticNodes.find((l) => l.category.includes(cat) || cat.includes(l.category));
    if (matchingLayer) {
      setSelectedLayer(matchingLayer.id);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    const val = value.toLowerCase().trim();

    if (val) {
      const matchingLayer = authenticNodes.find((layer) =>
        layer.skills.some((skill) => skill.toLowerCase().includes(val))
      );
      if (matchingLayer) {
        setSelectedLayer(matchingLayer.id);
        setSelectedCategoryFilter(matchingLayer.category);
      }
    }
  };

  const categories = ["All", "Data", "Core Services", "AI Engine", "DevOps & Cloud", "UI"];

  return (
    <SectionLayout
      label="Skills & Expertise"
      title="System Architecture Pipeline"
      scrollable={false}
    >
      {/* ── NARRATOR STRIP ── */}
      <NarratorStrip
        quote="This is my technology pipeline — structured from raw data ingestion engines down to cloud orchestration and web interfaces."
        details={[
          { label: "5 Layer Pipeline", text: "Data Processing → Backend Microservices → AI Orchestration → Cloud & DevOps → Frontend" },
          { label: "Production Stack", text: "Python, PySpark, Databricks, FastAPI, PostgreSQL, AWS Bedrock, Azure AKS" }
        ]}
      />

      <div className="w-full flex-1 flex flex-col gap-3 max-w-full">
        {/* ─── Search & Category Filter Bar ─── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 bg-[var(--surface-1)] p-2.5 sm:p-3 rounded-2xl border border-[var(--border-strong)] backdrop-blur-md shadow-lg max-w-full flex-shrink-0">
          {/* Search Bar */}
          <div className="relative flex-1 min-w-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Filter skills (e.g. Python, Databricks, Docker, Bedrock)..."
              className="w-full pl-10 pr-9 py-2 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] text-xs sm:text-sm text-white placeholder-slate-400 outline-none focus:border-sky-500/60 transition-all font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => handleSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Filter Badges */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 max-w-full">
            {categories.map((cat) => {
              const isActive = selectedCategoryFilter === cat || selectedCategoryFilter.includes(cat);
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChipClick(cat)}
                  className={`px-3 py-1 rounded-xl text-xs whitespace-nowrap transition-all border font-semibold font-sans ${
                    isActive
                      ? "bg-sky-500/20 text-sky-300 border-sky-500/50 shadow-md ring-1 ring-sky-500/30"
                      : "bg-[var(--surface-2)] text-slate-300 border-[var(--border)] hover:text-white hover:bg-white/10"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── Pipeline Grid Container ─── */}
        <div className="relative w-full rounded-2xl p-3.5 sm:p-4.5 border border-[var(--border-strong)] bg-[var(--surface-1)] shadow-2xl flex flex-col gap-3.5 max-w-full">
          {/* Ambient Glow */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none transition-all duration-500"
            style={{
              background: `radial-gradient(circle at 50% 20%, ${activeTheme.glow}, transparent 70%)`,
            }}
          />

          {/* 5 Stage Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative z-10 max-w-full">
            {authenticNodes.map((node, idx) => {
              const isSelected = selectedLayer === node.id;
              const hasMatchingSkill = q && node.skills.some((s) => isMatch(s));
              const isFiltered =
                selectedCategoryFilter !== "All" &&
                !selectedCategoryFilter.includes(node.category) &&
                !node.category.includes(selectedCategoryFilter);
              const theme = STAGE_THEMES[node.id] || STAGE_THEMES["layer-backend"];

              return (
                <motion.div
                  key={node.id}
                  onClick={() => handleCardClick(node)}
                  whileHover={{ y: -3 }}
                  className={`relative rounded-xl p-4 cursor-pointer border backdrop-blur-xl transition-all duration-300 flex flex-col justify-between select-none max-w-full ${theme.border} ${
                    isSelected ? "ring-2 ring-sky-400 bg-[var(--surface-2)] shadow-xl" : "bg-[var(--surface-1)]"
                  } ${hasMatchingSkill ? "!border-amber-400/80 ring-2 ring-amber-400/80 shadow-[0_0_20px_rgba(251,191,36,0.3)]" : ""} ${
                    isFiltered && !isSelected ? "opacity-50" : "opacity-100"
                  }`}
                  style={{
                    boxShadow: isSelected
                      ? `0 12px 32px -4px ${theme.glow}, inset 0 1px 0 rgba(255,255,255,0.12)`
                      : "0 4px 16px -4px rgba(0,0,0,0.5)",
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-white/10">
                      <div className="p-1.5 rounded-lg bg-white/[0.05] border border-white/10">
                        {STAGE_ICONS[node.icon] || <Database className="w-4 h-4 text-sky-400" />}
                      </div>
                      <span className="text-xs font-sans font-bold text-slate-300">
                        0{idx + 1}
                      </span>
                    </div>

                    <span
                      className={`text-xs font-sans font-bold tracking-wider uppercase px-2 py-0.5 rounded border inline-block truncate max-w-full ${theme.badge}`}
                    >
                      {node.category}
                    </span>
                    <h3 className="text-sm font-bold text-white mt-1.5 leading-snug">
                      {node.label}
                    </h3>
                  </div>

                  {/* Skills Pills */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {node.skills.map((skill) => {
                      const matched = isMatch(skill);
                      return (
                        <span
                          key={skill}
                          className={`text-xs font-mono px-2 py-0.5 rounded transition-all flex items-center gap-1 font-medium border ${
                            q && matched
                              ? "bg-amber-400/20 text-amber-300 border-amber-400/60 font-bold scale-105"
                              : q && !matched
                              ? "opacity-30 bg-white/[0.02] text-slate-400 border-white/5"
                              : "bg-[var(--surface-2)] text-slate-200 border-[var(--border)]"
                          }`}
                        >
                          {getSkillIcon(skill)}
                          <span>{skill}</span>
                        </span>
                      );
                    })}
                  </div>

                  {/* Flow Arrow */}
                  {idx < authenticNodes.length - 1 && (
                    <div className="hidden lg:flex items-center justify-between mt-3 pt-2 border-t border-white/[0.08] text-xs font-sans text-slate-400">
                      <span>Pipeline</span>
                      <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* ─── Layer Inspector Box ─── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeData.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="relative z-10 rounded-xl p-4 sm:p-5 border border-[var(--border-strong)] bg-[var(--surface-2)] backdrop-blur-xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-full"
            >
              {/* Layer Title & Badge */}
              <div className="flex flex-col gap-1 min-w-[220px]">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-sans font-bold px-2.5 py-0.5 rounded border ${activeTheme.badge}`}>
                    {activeData.category}
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-white">
                    {activeData.label}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {activeData.desc}
                </p>
              </div>

              {/* Skillset Matrix */}
              <div className="flex-1 flex flex-wrap gap-2 justify-start md:justify-end border-t md:border-t-0 md:border-l border-white/10 pt-3 md:pt-0 md:pl-5">
                {activeData.skills.map((skill) => {
                  const matched = isMatch(skill);
                  return (
                    <span
                      key={skill}
                      className={`text-xs font-mono px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-2 font-medium border shadow-sm ${
                        q && matched
                          ? "bg-amber-400/20 text-amber-300 border-amber-400/60 font-bold scale-105"
                          : q && !matched
                          ? "opacity-30 bg-white/[0.03] text-slate-400 border-white/5"
                          : "bg-[var(--surface-1)] text-slate-100 border-[var(--border-strong)]"
                      }`}
                    >
                      {getSkillIcon(skill)}
                      <span className="font-semibold text-white">{skill}</span>
                    </span>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </SectionLayout>
  );
}


