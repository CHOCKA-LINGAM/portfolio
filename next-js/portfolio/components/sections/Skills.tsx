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
    border: "border-emerald-500/30 hover:border-emerald-500/60",
    glow: "rgba(52, 211, 153, 0.15)",
    text: "#34d399",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  "layer-backend": {
    border: "border-sky-500/30 hover:border-sky-500/60",
    glow: "rgba(56, 189, 248, 0.15)",
    text: "#38bdf8",
    badge: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  },
  "layer-ai": {
    border: "border-purple-500/30 hover:border-purple-500/60",
    glow: "rgba(192, 132, 252, 0.15)",
    text: "#c084fc",
    badge: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  },
  "layer-infra": {
    border: "border-amber-500/30 hover:border-amber-500/60",
    glow: "rgba(251, 191, 36, 0.15)",
    text: "#fbbf24",
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  "layer-ui": {
    border: "border-indigo-500/30 hover:border-indigo-500/60",
    glow: "rgba(129, 140, 248, 0.15)",
    text: "#818cf8",
    badge: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  },
};

export default function Skills() {
  const authenticNodes = skillsData.nodes;
  const [selectedLayer, setSelectedLayer] = useState<string>("layer-backend");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("All");

  const activeData = authenticNodes.find((l) => l.id === selectedLayer) || authenticNodes[1];
  const activeTheme = STAGE_THEMES[activeData.id] || STAGE_THEMES["layer-backend"];

  const q = searchQuery.toLowerCase().trim();

  const isMatch = (skillName: string) => {
    if (!q) return true;
    return skillName.toLowerCase().includes(q);
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
      }
    }
  };

  const categories = ["All", "1. Data Layer", "2. Core Services", "3. AI Engine", "4. DevOps & Cloud", "5. User Interface"];

  return (
    <SectionLayout
      label="Skills & Expertise"
      title="System Architecture Pipeline"
      scrollable={false}
    >
      <div className="w-full flex flex-col gap-3.5 max-w-full">
        {/* ─── Search & Category Filter Bar ─── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#080b18]/80 p-3 rounded-2xl border border-white/10 backdrop-blur-md shadow-lg max-w-full">
          {/* Search Bar */}
          <div className="relative flex-1 min-w-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search authentic skills & tools (e.g. Python, Databricks, Docker, OpenAI, React)..."
              className="w-full pl-10 pr-9 py-2 rounded-xl bg-[#04050a] border border-white/10 text-xs text-white placeholder-slate-400 outline-none focus:border-sky-500/50 transition-all font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => handleSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Filter Badges */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 max-w-full">
            {categories.map((cat) => {
              const isActive = selectedCategoryFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategoryFilter(cat);
                    if (cat !== "All") {
                      const layer = authenticNodes.find((l) => l.category === cat);
                      if (layer) setSelectedLayer(layer.id);
                    }
                  }}
                  className={`px-3 py-1 rounded-xl text-[11px] font-mono whitespace-nowrap transition-all border ${
                    isActive
                      ? "bg-sky-500/20 text-sky-300 border-sky-500/40 font-bold shadow-md"
                      : "bg-white/[0.03] text-slate-400 border-white/10 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── Responsive Pipeline Container ─── */}
        <div className="relative w-full rounded-2xl p-4 border border-white/10 bg-[#050712] shadow-2xl flex flex-col gap-3.5 overflow-hidden max-w-full">
          {/* Ambient Glow */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none transition-all duration-500"
            style={{
              background: `radial-gradient(circle at 50% 20%, ${activeTheme.glow}, transparent 70%)`,
            }}
          />

          {/* Flow Track */}
          <div className="hidden lg:flex items-center justify-between px-8 relative z-0 mb-[-8px]">
            <div className="w-full h-0.5 bg-gradient-to-r from-emerald-500/40 via-sky-500/40 via-purple-500/40 via-amber-500/40 to-indigo-500/40 relative">
              <motion.div
                animate={{ x: ["0%", "100%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="w-12 h-1 bg-sky-400 rounded-full shadow-[0_0_12px_#38bdf8] absolute -top-0.5"
              />
            </div>
          </div>

          {/* 5 Stage Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 relative z-10 max-w-full">
            {authenticNodes.map((node, idx) => {
              const isSelected = selectedLayer === node.id;
              const hasMatchingSkill = q && node.skills.some((s) => isMatch(s));
              const isFiltered =
                selectedCategoryFilter !== "All" && selectedCategoryFilter !== node.category;
              const theme = STAGE_THEMES[node.id] || STAGE_THEMES["layer-backend"];

              return (
                <motion.div
                  key={node.id}
                  onClick={() => setSelectedLayer(node.id)}
                  whileHover={{ y: -2 }}
                  className={`relative rounded-xl p-3.5 cursor-pointer border backdrop-blur-xl transition-all duration-300 flex flex-col justify-between select-none max-w-full overflow-hidden ${theme.border} ${
                    isSelected ? "ring-2 ring-sky-400 bg-[#0c1022]" : "bg-[#080b18]/90"
                  } ${hasMatchingSkill ? "!border-amber-400/80 ring-2 ring-amber-400/80 shadow-[0_0_20px_rgba(251,191,36,0.3)]" : ""} ${
                    isFiltered ? "opacity-40" : "opacity-100"
                  }`}
                  style={{
                    boxShadow: isSelected
                      ? `0 10px 28px -4px ${theme.glow}, inset 0 1px 0 rgba(255,255,255,0.12)`
                      : "0 4px 16px -4px rgba(0,0,0,0.5)",
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-white/10">
                      <div className="p-1.5 rounded-lg bg-white/[0.05] border border-white/10">
                        {STAGE_ICONS[node.icon] || <Database className="w-4 h-4 text-sky-400" />}
                      </div>
                      <span className="text-[11px] font-mono font-bold text-slate-400">
                        0{idx + 1}
                      </span>
                    </div>

                    <span
                      className={`text-[9px] font-mono font-bold tracking-widest uppercase px-1.5 py-0.5 rounded border inline-block truncate ${theme.badge}`}
                    >
                      {node.category}
                    </span>
                    <h3 className="text-xs font-bold text-white mt-1 leading-tight truncate">
                      {node.label}
                    </h3>
                  </div>

                  {/* Authentic Skills Pills */}
                  <div className="flex flex-wrap gap-1 mt-2.5">
                    {node.skills.map((skill) => {
                      const matched = isMatch(skill);
                      return (
                        <span
                          key={skill}
                          className={`text-[10px] font-mono px-1.5 py-0.5 rounded transition-all flex items-center gap-1 font-medium border truncate ${
                            q && matched
                              ? "bg-amber-400/20 text-amber-300 border-amber-400/60 font-bold scale-105"
                              : q && !matched
                              ? "opacity-30 bg-white/[0.02] text-slate-400 border-white/5"
                              : "bg-white/[0.04] text-slate-200 border-white/10"
                          }`}
                        >
                          {getSkillIcon(skill)}
                          <span className="truncate">{skill}</span>
                        </span>
                      );
                    })}
                  </div>

                  {/* Flow Arrow */}
                  {idx < authenticNodes.length - 1 && (
                    <div className="hidden lg:flex items-center justify-between mt-2.5 pt-1.5 border-t border-white/[0.06] text-[9px] font-mono text-slate-500">
                      <span>Pipeline</span>
                      <ArrowRight className="w-3 h-3 text-sky-400 animate-pulse" />
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
              className="relative z-10 rounded-xl p-4 border border-white/10 bg-[#090d1e] backdrop-blur-xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-full overflow-hidden"
            >
              <div className="flex flex-col gap-1 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${activeTheme.badge}`}>
                    {activeData.category}
                  </span>
                  <h4 className="text-sm font-bold text-white">
                    {activeData.label}
                  </h4>
                </div>
                <p className="text-xs text-slate-300 leading-snug">
                  {activeData.desc}
                </p>
              </div>

              {/* Skillset Pills */}
              <div className="flex flex-wrap gap-1.5 md:max-w-md">
                {activeData.skills.map((skill) => {
                  const matched = isMatch(skill);
                  return (
                    <span
                      key={skill}
                      className={`text-xs font-mono px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 font-medium border ${
                        q && matched
                          ? "bg-amber-400/20 text-amber-300 border-amber-400/60 font-bold scale-105"
                          : q && !matched
                          ? "opacity-30 bg-white/[0.03] text-slate-400 border-white/5"
                          : "bg-white/[0.06] text-slate-100 border-white/10"
                      }`}
                    >
                      {getSkillIcon(skill)}
                      {skill}
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
