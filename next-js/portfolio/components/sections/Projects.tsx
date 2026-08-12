"use client";

import { useState } from "react";
import { ExternalLink, Github, Sparkles, Terminal, Flame, Database, Cpu, Globe, Box, LayoutGrid, List } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS, type Project } from "@/data/index";
import SectionLayout from "@/components/layout/SectionLayout";

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

export default function Projects() {
  const [activeTab, setActiveTab] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const visibleProjects = (PROJECTS as Project[]).filter((p) => {
    return activeTab === "all" || p.tags.includes(activeTab);
  });

  const featured = visibleProjects[0];
  const gridProjects = visibleProjects.slice(1);

  return (
    <SectionLayout label="Engineering Portfolio" title="Featured Projects & Systems" scrollable={true}>
      <div className="w-full flex flex-col gap-4 pt-1 pb-16">
        {/* ─── Segmented Domain Selector & Layout Switcher ─── */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#080b18]/90 p-3.5 rounded-2xl border border-white/10 backdrop-blur-md shadow-lg flex-shrink-0">
          {/* Domain Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {DOMAIN_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all border flex items-center gap-2 ${
                    isActive
                      ? "bg-sky-500/20 text-sky-300 border-sky-500/40 font-bold shadow-md"
                      : "bg-white/[0.03] text-slate-400 border-white/10 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/10 self-end sm:self-auto font-mono text-xs">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-all ${
                viewMode === "grid" ? "bg-sky-500/20 text-sky-300 font-bold border border-sky-500/30" : "text-slate-400 hover:text-white"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              Grid
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-all ${
                viewMode === "list" ? "bg-sky-500/20 text-sky-300 font-bold border border-sky-500/30" : "text-slate-400 hover:text-white"
              }`}
            >
              <List className="w-3.5 h-3.5" />
              List
            </button>
          </div>
        </div>

        {/* ─── Projects Display ─── */}
        {visibleProjects.length === 0 ? (
          <div className="text-slate-400 text-xs py-12 text-center font-mono rounded-2xl bg-[#080b18]/60 border border-white/10">
            No projects found in this domain. Select another category above.
          </div>
        ) : viewMode === "grid" ? (
          <div className="flex flex-col gap-4">
            {/* HERO FEATURED SHOWCASE CARD */}
            {featured && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="relative rounded-2xl p-6 border border-sky-500/40 bg-gradient-to-br from-[#0c1022] to-[#080b18] backdrop-blur-xl shadow-2xl overflow-hidden group"
              >
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex flex-col gap-2.5 max-w-2xl">
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/30 tracking-wider">
                        {featured.status}
                      </span>
                      <span className="text-xs font-mono text-sky-400 font-bold">Featured System</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      {featured.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {featured.desc}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {featured.stack.map((s) => (
                        <span
                          key={s}
                          className="px-2.5 py-1 rounded-lg bg-white/[0.06] text-slate-200 border border-white/10 text-xs font-mono font-medium flex items-center gap-1.5 shadow-sm"
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
                        className="px-4 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-xs font-mono text-slate-200 hover:text-white hover:border-sky-500/40 transition-all flex items-center gap-2"
                      >
                        <Github className="w-4 h-4 text-slate-400" />
                        Source Code
                      </a>
                    )}
                    {featured.link && (
                      <a
                        href={featured.link}
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-mono font-bold text-xs transition-all shadow-lg shadow-sky-500/20 flex items-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Live / Package
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
                      initial={{ opacity: 0, scale: 0.96, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96, y: -10 }}
                      transition={{ duration: 0.2, delay: i * 0.04 }}
                      key={p.id}
                      className="flex flex-col rounded-2xl p-5 border border-white/10 bg-[#080b18]/90 backdrop-blur-xl transition-all duration-300 hover:border-sky-500/30 shadow-lg group justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2.5">
                          <span className="text-[10px] font-mono text-slate-500 font-bold">PROJ-{p.id}</span>
                          <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 font-mono text-[10px] font-bold border border-sky-500/20">
                            {p.status}
                          </span>
                        </div>

                        <h4 className="text-base font-bold text-white mb-2">{p.title}</h4>
                        <p className="text-xs text-slate-300 leading-relaxed mb-4">{p.desc}</p>
                      </div>

                      <div>
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {p.stack.map((s) => (
                            <span
                              key={s}
                              className="px-2 py-0.5 rounded bg-white/[0.04] text-slate-200 border border-white/10 text-xs font-mono font-medium flex items-center gap-1"
                            >
                              {getStackBadgeIcon(s)}
                              {s}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                          {p.github && (
                            <a
                              href={p.github}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs font-mono text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
                            >
                              <Github className="w-3.5 h-3.5" />
                              GitHub
                            </a>
                          )}
                          {p.link && (
                            <a
                              href={p.link}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs font-mono text-sky-400 hover:text-sky-300 transition-colors flex items-center gap-1 font-bold ml-auto"
                            >
                              Details / Link <ExternalLink className="w-3 h-3" />
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
          /* List View Mode */
          <div className="flex flex-col gap-3">
            {visibleProjects.map((p) => (
              <div
                key={p.id}
                className="p-4 rounded-xl border border-white/10 bg-[#080b18]/90 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex flex-col gap-1.5 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-500 font-bold">PROJ-{p.id}</span>
                    <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 font-mono text-[10px] font-bold border border-sky-500/20">
                      {p.status}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white">{p.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{p.desc}</p>
                </div>

                <div className="flex items-center gap-3 self-start md:self-center">
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-sky-500 text-slate-950 font-bold text-xs flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      View Link
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
