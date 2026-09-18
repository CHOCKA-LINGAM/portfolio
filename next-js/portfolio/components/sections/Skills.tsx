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
import { SectionInsightBar } from "@/components/ui/NarratorStrip";

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

const CORE_SKILLS = new Set(["Python", "PySpark", "Databricks", "FastAPI", "OpenAI API", "AWS Bedrock", "Docker", "PostgreSQL", "Kafka", "Azure AKS"]);

const SKILL_DETAILS: Record<string, { usage: string; impact: string }> = {
  Python: { usage: "Core language for backend microservices, PySpark ETL scripts, & GenAI agents", impact: "5+ years enterprise production code" },
  FastAPI: { usage: "High-performance async REST & GraphQL microservice APIs with Pydantic v2 validation", impact: "Sub-50ms latency endpoints" },
  Databricks: { usage: "Multi-tenant cloud lakehouse infrastructure & automated notebook workflow deployments", impact: "Built PyPI package databricks-bundle" },
  PySpark: { usage: "Distributed data frame transformation & ETL ingestion over multi-terabyte datasets", impact: "40% processing speedup" },
  PostgreSQL: { usage: "Relational data modeling, connection pooling, and indexing optimization", impact: "Zero query bottlenecks under high concurrency" },
  "OpenAI API": { usage: "GPT-4 multi-step reasoning, prompt guardrails, and tool calling workflows", impact: "Production GenAI orchestration" },
  "AWS Bedrock": { usage: "Enterprise foundation model API integration & multi-agent failover fallbacks", impact: "99.99% system availability" },
  "Azure AKS": { usage: "Kubernetes container cluster deployment, pod autoscaling, & Azure DevOps pipelines", impact: "Automated zero-downtime rollouts" },
  Docker: { usage: "Containerized microservice packaging with multi-stage production Dockerfiles", impact: "Standardized dev & prod environments" },
  Kafka: { usage: "Real-time event-driven message queuing & stream processing pipelines", impact: "High-concurrency async event bus" },
  LangChain: { usage: "Agent memory vector integration, retrieval guardrails, & tool orchestration", impact: "Autonomous multi-agent workflows" },
};

export default function Skills() {
  const authenticNodes = skillsData.nodes;
  const [selectedLayer, setSelectedLayer] = useState<string>("layer-backend");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("Core Services");
  const [activeSkillDetail, setActiveSkillDetail] = useState<string | null>(null);

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
    setActiveSkillDetail(null);
  };

  const handleCategoryChipClick = (cat: string) => {
    setSelectedCategoryFilter(cat);
    setActiveSkillDetail(null);
    if (cat === "All") return;
    const matchingLayer = authenticNodes.find((l) => l.category.includes(cat) || cat.includes(l.category));
    if (matchingLayer) {
      setSelectedLayer(matchingLayer.id);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setActiveSkillDetail(null);
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
      sectionNumber="03 / 05"
    >
      {/* ── SECTION INSIGHT BAR ── */}
      <SectionInsightBar
        tag="PIPELINE STACK"
        quote="Structured across 5 distinct architectural layers — from raw data ingestion to cloud orchestration & production AI APIs."
      />

      <div className="w-full flex-1 flex flex-col gap-3 max-w-full">
        {/* ─── Search & Category Filter Bar ─── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 bg-[var(--surface-1)] p-2.5 sm:p-3 rounded-2xl border border-[var(--border-strong)] backdrop-blur-md shadow-lg max-w-full flex-shrink-0">
          {/* Search Bar */}
          <div className="relative flex-1 min-w-0">
            <Search className="w-4 h-4 text-[var(--muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              aria-label="Filter skills"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Filter skills (e.g. Python, Databricks, Docker, Bedrock)..."
              className="w-full pl-10 pr-9 py-2 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] text-xs sm:text-sm text-[var(--text)] placeholder-[var(--text-muted)] outline-none focus:border-sky-500/60 transition-all font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => handleSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--text)]"
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
                      : "bg-[var(--surface-2)] text-[var(--muted)] border-[var(--border)] hover:text-[var(--text)] hover:bg-[var(--surface-1)]"
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
                    <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-[var(--border)]">
                      <div className="p-1.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border)]">
                        {STAGE_ICONS[node.icon] || <Database className="w-4 h-4 text-sky-400" />}
                      </div>
                      <span className="text-xs font-sans font-bold text-[var(--text-muted)]">
                        0{idx + 1}
                      </span>
                    </div>

                    <span
                      className={`text-xs font-sans font-bold tracking-wider uppercase px-2 py-0.5 rounded border inline-block truncate max-w-full ${theme.badge}`}
                    >
                      {node.category}
                    </span>
                    <h3 className="text-sm font-bold text-[var(--text)] mt-1.5 leading-snug">
                      {node.label}
                    </h3>
                  </div>

                  {/* Skills Pills */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {node.skills.map((skill) => {
                      const matched = isMatch(skill);
                      const isCore = CORE_SKILLS.has(skill);
                      return (
                        <span
                          key={skill}
                          className={`text-xs font-mono px-2 py-0.5 rounded transition-all flex items-center gap-1 font-medium border ${
                            q && matched
                              ? "bg-amber-400/20 text-amber-300 border-amber-400/60 font-bold scale-105"
                              : q && !matched
                              ? "opacity-30 bg-white/[0.02] text-[var(--text-muted)] border-white/5"
                              : isCore
                              ? "bg-[var(--surface-2)] text-[var(--text)] border-sky-400/40"
                              : "bg-[var(--surface-2)] text-[var(--text)] border-[var(--border)]"
                          }`}
                        >
                          {getSkillIcon(skill)}
                          <span>{skill}</span>
                          {isCore && <span className="w-1 h-1 rounded-full bg-sky-400 ml-0.5" title="Core Stack Competency" />}
                        </span>
                      );
                    })}
                  </div>

                  {/* Flow Arrow */}
                  {idx < authenticNodes.length - 1 && (
                    <div className="hidden lg:flex items-center justify-between mt-3 pt-2 border-t border-[var(--border)] text-xs font-sans text-[var(--text-muted)]">
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
                  <h4 className="text-sm sm:text-base font-bold text-[var(--text)]">
                    {activeData.label}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed font-sans">
                  {activeData.desc}
                </p>
              </div>

              {/* Skillset Matrix */}
              <div className="flex-1 flex flex-wrap gap-2 justify-start md:justify-end border-t md:border-t-0 md:border-l border-[var(--border)] pt-3 md:pt-0 md:pl-5">
                {activeData.skills.map((skill) => {
                  const matched = isMatch(skill);
                  const isSelectedSkill = activeSkillDetail === skill;

                  return (
                    <button
                      key={skill}
                      onClick={() => setActiveSkillDetail(isSelectedSkill ? null : skill)}
                      title={`Click to inspect ${skill} production architecture`}
                      className={`text-xs font-mono px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-2 font-medium border shadow-sm cursor-pointer ${
                        isSelectedSkill
                          ? "bg-sky-500/30 text-sky-200 border-sky-400 ring-2 ring-sky-400/50 scale-105"
                          : q && matched
                          ? "bg-amber-400/20 text-amber-300 border-amber-400/60 font-bold scale-105"
                          : q && !matched
                          ? "opacity-30 bg-white/[0.03] text-[var(--text-muted)] border-white/5"
                          : "bg-[var(--surface-1)] text-[var(--text)] border-[var(--border-strong)] hover:border-sky-400/50"
                      }`}
                    >
                      {getSkillIcon(skill)}
                      <span className="font-semibold text-[var(--text)]">{skill}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ─── Production Skill Architecture Detail Popover ─── */}
          <AnimatePresence>
            {activeSkillDetail && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: 4 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: 4 }}
                className="relative z-10 rounded-xl p-4 border border-sky-500/40 bg-[var(--surface-2)] shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-sky-400 flex items-center gap-1.5 font-sans text-sm">
                    ⚡ {activeSkillDetail} Architecture Snapshot:
                  </span>
                  <p className="text-[var(--text)] font-sans leading-relaxed">
                    {SKILL_DETAILS[activeSkillDetail]?.usage || `Production technology integrated across ${activeData.label} pipeline microservices.`}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center bg-[var(--surface-1)] px-3 py-2 rounded-lg border border-[var(--border)]">
                  <span className="font-semibold text-[var(--muted)] font-sans">Metrics & Impact:</span>
                  <span className="font-mono font-bold text-emerald-400">
                    {SKILL_DETAILS[activeSkillDetail]?.impact || "High-Throughput Production Node"}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SectionLayout>
  );
}


