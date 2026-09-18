"use client";

import { useState } from "react";
import { ExternalLink, Github, Sparkles, Terminal, Flame, Database, Cpu, Globe, Box, LayoutGrid, List, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS, type Project } from "@/data/index";
import SectionLayout from "@/components/layout/SectionLayout";
import { SectionInsightBar } from "@/components/ui/NarratorStrip";

const DOMAIN_TABS = [
  { id: "all", label: "All Systems", count: 6 },
  { id: "ai", label: "AI & GenAI", count: 3 },
  { id: "data", label: "Data Pipelines & PyPI", count: 3 },
  { id: "fullstack", label: "Fullstack & APIs", count: 2 },
];

function getStackBadgeIcon(tech: string) {
  const t = tech.toLowerCase();
  if (t.includes("python") || t.includes("asyncio")) return <Terminal className="w-3.5 h-3.5 text-yellow-400" />;
  if (t.includes("fastapi") || t.includes("django")) return <Globe className="w-3.5 h-3.5 text-emerald-400" />;
  if (t.includes("databricks") || t.includes("pypi")) return <Flame className="w-3.5 h-3.5 text-orange-400" />;
  if (t.includes("postgresql") || t.includes("sql")) return <Database className="w-3.5 h-3.5 text-sky-400" />;
  if (t.includes("rag") || t.includes("ai") || t.includes("langchain")) return <Cpu className="w-3.5 h-3.5 text-purple-400" />;
  if (t.includes("aks") || t.includes("docker")) return <Box className="w-3.5 h-3.5 text-amber-400" />;
  return <Sparkles className="w-3.5 h-3.5 text-indigo-400" />;
}

function getLinkText(url: string) {
  if (url.includes("pypi.org")) return "PyPI Package";
  if (url.includes("github.com")) return "GitHub Repository";
  if (url.includes("linkedin.com")) return "Project Case Study";
  return "Live Demo";
}

export default function Projects() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const visibleProjects = (PROJECTS as Project[]).filter((p) => {
    const matchesTab = activeTab === "all" || p.tags.includes(activeTab);
    if (!matchesTab) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      p.title.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q) ||
      p.stack.some((s) => s.toLowerCase().includes(q))
    );
  });

  const featured = visibleProjects.find((p) => p.featured) || visibleProjects[0];
  const gridProjects = visibleProjects.filter((p) => p.id !== featured?.id);

  return (
    <SectionLayout label="Engineering Portfolio" title="Featured Projects & Systems" scrollable={false} sectionNumber="04 / 05">
      <div className="w-full flex-1 flex flex-col gap-3 max-w-full">
        {/* ── SECTION INSIGHT BAR ── */}
        <SectionInsightBar
          tag="SYSTEMS SHOWCASE"
          quote="Open-source PyPI packages, multi-agent AI frameworks, and high-concurrency data ingestion engines."
        />

        {/* ─── Search & Domain Filter Controls ─── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 bg-[var(--surface-1)] p-2.5 sm:p-3 rounded-2xl border border-[var(--border-strong)] backdrop-blur-md shadow-lg flex-shrink-0">
          {/* Search Input Bar */}
          <div className="relative flex-1 min-w-0">
            <Search className="w-4 h-4 text-[var(--muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              aria-label="Filter projects by technology or keyword"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search systems by tech (e.g. PyPI, Kafka, FastAPI, Bedrock, LangChain)..."
              className="w-full pl-10 pr-9 py-2 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] text-xs sm:text-sm text-[var(--text)] placeholder-[var(--text-muted)] outline-none focus:border-sky-500/60 transition-all font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--text)]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Domain Tabs & View Switcher */}
          <div className="flex items-center justify-between gap-2.5 overflow-x-auto pb-1 md:pb-0">
            <div className="flex items-center gap-1.5 shrink-0">
              {DOMAIN_TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border flex items-center gap-2 font-sans ${
                      isActive
                        ? "bg-sky-500/20 text-sky-300 border-sky-500/50 font-bold shadow-md ring-1 ring-sky-500/30"
                        : "bg-[var(--surface-2)] text-[var(--muted)] border-[var(--border)] hover:text-[var(--text)] hover:bg-[var(--surface-1)]"
                    }`}
                  >
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] text-xs font-semibold font-sans shrink-0">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-2.5 py-0.5 rounded-lg flex items-center gap-1.5 transition-all ${
                  viewMode === "grid" ? "bg-sky-500/20 text-sky-300 font-bold border border-sky-500/40" : "text-[var(--muted)] hover:text-[var(--text)]"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                Grid
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-2.5 py-0.5 rounded-lg flex items-center gap-1.5 transition-all ${
                  viewMode === "list" ? "bg-sky-500/20 text-sky-300 font-bold border border-sky-500/40" : "text-[var(--muted)] hover:text-[var(--text)]"
                }`}
              >
                <List className="w-3.5 h-3.5" />
                List
              </button>
            </div>
          </div>
        </div>

        {/* ─── Projects Display ─── */}
        {visibleProjects.length === 0 ? (
          <div className="text-[var(--muted)] text-xs sm:text-sm py-12 text-center font-sans rounded-2xl bg-[var(--surface-1)] border border-[var(--border)]">
            No projects found in this domain. Select another category above.
          </div>
        ) : viewMode === "grid" ? (
          <div className="flex flex-col gap-3">
            {/* HERO FEATURED SHOWCASE CARD */}
            {featured && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18 }}
                className="relative rounded-2xl p-4 sm:p-5 border border-sky-500/40 bg-gradient-to-br from-[var(--surface-1)] to-[var(--surface-2)] backdrop-blur-xl shadow-2xl overflow-hidden group"
              >
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                  <div className="flex flex-col gap-2 max-w-2xl">
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-sans text-xs font-bold border border-emerald-500/30 tracking-wider">
                        {featured.status}
                      </span>
                      <span className="text-xs font-sans text-sky-400 font-bold flex items-center gap-1">
                        <Sparkles size={13} className="text-amber-400" /> Featured Architecture
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--text)] tracking-tight">
                      {featured.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed font-sans">
                      {featured.desc}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {featured.stack.map((s) => (
                        <span
                          key={s}
                          className="px-2.5 py-1 rounded-lg bg-[var(--surface-1)] text-[var(--text)] border border-[var(--border-strong)] text-xs font-mono font-medium flex items-center gap-1.5 shadow-sm"
                        >
                          {getStackBadgeIcon(s)}
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-start lg:self-center">
                    {featured.github && (
                      <a
                        href={featured.github}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-[var(--surface-1)] border border-[var(--border-strong)] text-xs font-sans font-semibold text-[var(--text)] hover:text-sky-400 transition-all flex items-center gap-2"
                      >
                        <Github className="w-4 h-4 text-sky-400" />
                        Source Code
                      </a>
                    )}
                    {featured.link && (
                      <a
                        href={featured.link}
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-2.5 rounded-xl bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-sky-500/20 flex items-center gap-2 font-sans"
                      >
                        <ExternalLink className="w-4 h-4" />
                        {getLinkText(featured.link)}
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Grid Matrix for Remaining Projects */}
            {gridProjects.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <AnimatePresence mode="popLayout">
                  {gridProjects.map((p, i) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.97, y: 6 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.97, y: -6 }}
                      transition={{ duration: 0.18, delay: i * 0.03 }}
                      key={p.id}
                      className="flex flex-col rounded-2xl p-5 border border-[var(--border-strong)] bg-[var(--surface-1)] backdrop-blur-xl transition-all duration-300 hover:border-sky-500/50 shadow-lg group justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-[var(--border)]">
                          <span className="text-xs font-sans text-[var(--text-muted)] font-bold uppercase">
                            {p.tags.includes("ai") ? "AI System" : p.tags.includes("data") ? "Data Engine" : "Fullstack API"}
                          </span>
                          <span className="px-2.5 py-0.5 rounded bg-sky-500/15 text-sky-400 font-sans text-xs font-bold border border-sky-500/30">
                            {p.status}
                          </span>
                        </div>

                        <h4 className="text-base font-bold text-[var(--text)] mb-1.5 group-hover:text-sky-400 transition-colors font-sans">{p.title}</h4>
                        <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4 font-sans">{p.desc}</p>
                      </div>

                      <div>
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {p.stack.map((s) => (
                            <span
                              key={s}
                              className="px-2 py-0.5 rounded bg-[var(--surface-2)] text-[var(--text)] border border-[var(--border)] text-xs font-mono font-medium flex items-center gap-1"
                            >
                              {getStackBadgeIcon(s)}
                              {s}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-2.5 border-t border-[var(--border)]">
                          {p.github && (
                            <a
                              href={p.github}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs font-sans font-semibold text-[var(--text-muted)] hover:text-[var(--text)] transition-colors flex items-center gap-1.5"
                            >
                              <Github className="w-3.5 h-3.5 text-sky-400" />
                              Code
                            </a>
                          )}
                          {p.link && (
                            <a
                              href={p.link}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs font-sans text-sky-400 hover:text-sky-300 transition-colors flex items-center gap-1 font-bold ml-auto"
                            >
                              {getLinkText(p.link)} <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        ) : (
          /* List View Mode with Full Tech Pills & Smart Buttons */
          <div className="flex flex-col gap-3">
            {visibleProjects.map((p) => (
              <div
                key={p.id}
                className="p-4 sm:p-5 rounded-xl border border-[var(--border-strong)] bg-[var(--surface-1)] flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-sky-500/40 transition-all"
              >
                <div className="flex flex-col gap-1.5 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-sans text-[var(--muted)] font-bold uppercase">
                      {p.tags.includes("ai") ? "AI System" : p.tags.includes("data") ? "Data Engine" : "Fullstack API"}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-sky-500/15 text-sky-400 font-sans text-xs font-bold border border-sky-500/30">
                      {p.status}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-[var(--text)] font-sans">{p.title}</h4>
                  <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed font-sans">{p.desc}</p>
                  
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 rounded bg-[var(--surface-2)] text-[var(--text)] border border-[var(--border)] text-xs font-mono font-medium flex items-center gap-1"
                      >
                        {getStackBadgeIcon(s)}
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 self-start md:self-center">
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] text-xs font-sans font-semibold text-[var(--muted2)] hover:text-[var(--text)] flex items-center gap-1.5"
                    >
                      <Github className="w-3.5 h-3.5" /> Code
                    </a>
                  )}
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-sky-400 text-slate-950 font-bold text-xs font-sans flex items-center gap-1.5 hover:bg-sky-300 transition-all shadow-md"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      {getLinkText(p.link)}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </SectionLayout>
  );
}


