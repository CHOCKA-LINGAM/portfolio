"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, Workflow, CheckCircle2, Sparkles, Layers, Cpu, Lock } from "lucide-react";
import { PROJECTS, type Project } from "@/data/index";

export function MonographProjectDetail({
  project,
  onBack,
}: {
  project?: Project;
  onBack: () => void;
}) {
  const currentProject = project || (PROJECTS[0] as Project);
  const [activeTab, setActiveTab] = useState<"overview" | "architecture" | "stack" | "impact">("architecture");
  const isDevInProgress = currentProject.status.toUpperCase().includes("IN PROGRESS") || currentProject.status.toUpperCase().includes("DEV");

  return (
    <section className="relative w-full min-h-[88vh] rounded-3xl overflow-hidden border border-slate-200 bg-white text-slate-900 shadow-2xl p-6 sm:p-12 lg:p-16 my-8 flex flex-col justify-between scroll-mt-24">
      {/* Top Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="flex flex-col gap-2">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-600 hover:text-slate-950 transition-colors cursor-pointer w-max"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> ← Back to Projects
          </button>
          
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs font-mono text-cyan-600 font-bold uppercase tracking-widest">
              05 / PROJECT DETAIL
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
              isDevInProgress ? "bg-amber-100 text-amber-800 border border-amber-300" : "bg-emerald-100 text-emerald-800 border border-emerald-300"
            }`}>
              {currentProject.status}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-950 tracking-tight">
            {currentProject.title}
          </h2>
          <p className="text-sm font-sans text-slate-600">
            {currentProject.desc}
          </p>
        </div>

        {/* Links */}
        {isDevInProgress ? (
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <div
              className="px-3.5 py-2 rounded-xl font-bold text-slate-400 bg-slate-100 border border-slate-200 flex items-center gap-1.5 cursor-not-allowed opacity-80 select-none"
              title="Live Demo disabled during active development"
            >
              <Lock className="w-3.5 h-3.5 text-amber-600" />
              <span>Live Demo (Dev in Progress)</span>
            </div>
            <div
              className="px-3.5 py-2 rounded-xl font-bold text-slate-400 bg-slate-100 border border-slate-200 flex items-center gap-1.5 cursor-not-allowed opacity-80 select-none"
              title="Source code repository is private during dev phase"
            >
              <Lock className="w-3.5 h-3.5 text-amber-600" />
              <span>Source Code (Private)</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 font-mono text-xs">
            {currentProject.link && (
              <a
                href={currentProject.link}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl text-white bg-slate-950 hover:bg-slate-800 flex items-center gap-2 transition-all shadow-md cursor-pointer font-bold"
              >
                <ExternalLink className="w-3.5 h-3.5 text-emerald-400" /> Live Demo
              </a>
            )}
            {currentProject.github && (
              <a
                href={currentProject.github}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl text-slate-800 border border-slate-300 bg-slate-50 hover:bg-slate-100 transition-all flex items-center gap-2 cursor-pointer font-bold"
              >
                <Github className="w-3.5 h-3.5 text-cyan-600" /> View Code
              </a>
            )}
          </div>
        )}
      </div>

      {/* Main Grid: Left Flowchart & Tab Content, Right Outcomes Metrics Box matching Panel 04 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-auto py-8">
        
        {/* Left Column: Interactive Flowchart Architecture Diagram */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Sub Navigation Tabs matching Panel 04 */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3 font-mono text-xs overflow-x-auto no-scrollbar max-w-full">
            <button
              onClick={() => setActiveTab("architecture")}
              className={`px-4 py-2 rounded-xl cursor-pointer transition-all ${
                activeTab === "architecture"
                  ? "bg-slate-950 text-white font-bold shadow-md"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              Architecture (Flowchart)
            </button>
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2 rounded-xl cursor-pointer transition-all ${
                activeTab === "overview"
                  ? "bg-slate-950 text-white font-bold shadow-md"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("stack")}
              className={`px-4 py-2 rounded-xl cursor-pointer transition-all ${
                activeTab === "stack"
                  ? "bg-slate-950 text-white font-bold shadow-md"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              Tech Stack
            </button>
          </div>

          {/* Tab Content 1: Flowchart Architecture matching Panel 04 */}
          {activeTab === "architecture" && (
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-6 shadow-inner">
              <span className="text-xs font-mono font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
                <Workflow className="w-4 h-4 text-cyan-600" />
                // {currentProject.id === "05" ? "SCHEMA-SHIELD GUARDRAIL PIPELINE ARCHITECTURE" : "PIPELINE ARCHITECTURE IN ACTION"}
              </span>

              {/* Execution Diagram Nodes */}
              {currentProject.id === "05" ? (
                <div className="flex flex-col gap-4 font-mono text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-md flex flex-col justify-center">
                      <span className="font-extrabold text-slate-950">DDL / Schema Ingestion</span>
                      <span className="text-[10px] text-slate-500 mt-1">SQL Script / Delta Schema</span>
                    </div>

                    <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 text-purple-950 shadow-md flex flex-col justify-center">
                      <span className="font-extrabold">AST Introspection Engine</span>
                      <span className="text-[10px] text-purple-700 mt-1">Python AST Diff Engine</span>
                    </div>

                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 shadow-md flex flex-col justify-center">
                      <span className="font-extrabold">Safety Classifier Rules</span>
                      <span className="text-[10px] text-emerald-700 mt-1">SAFE / WARNING / BREAKING</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center pt-1">
                    <div className="p-4 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-950 shadow-md flex flex-col justify-center">
                      <span className="font-extrabold">Target Lakehouse / Database</span>
                      <span className="text-[10px] text-cyan-700 mt-1">Databricks Delta & Postgres</span>
                    </div>

                    <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 shadow-md flex flex-col justify-center">
                      <span className="font-extrabold">CI/CD & CLI Guardrail</span>
                      <span className="text-[10px] text-amber-700 mt-1">schema-shield check (PyPI)</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-xs font-mono">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-md flex flex-col justify-center">
                    <span className="font-extrabold text-slate-950">Input Module</span>
                    <span className="text-[10px] text-slate-500 mt-1">Data Ingestion</span>
                  </div>
                  <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 text-purple-950 shadow-md flex flex-col justify-center">
                    <span className="font-extrabold">Processing Engine</span>
                    <span className="text-[10px] text-purple-700 mt-1">In Development</span>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 shadow-md flex flex-col justify-center">
                    <span className="font-extrabold">Output Pipeline</span>
                    <span className="text-[10px] text-emerald-700 mt-1">Staging Target</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab Content 2: Overview */}
          {activeTab === "overview" && (
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-sans leading-relaxed text-slate-700">
              <p className="text-sm text-slate-900 font-medium mb-4">
                {currentProject.desc}
              </p>
              {currentProject.id === "05" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>SAFE / WARNING / BREAKING DDL Classification</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Multi-dialect Delta Lake & Postgres Support</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Git Pre-commit & CI/CD Guardrail Integration</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Published Open-Source PyPI CLI Package</span>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-mono text-xs">
                  ⚠️ This project is currently in active development / staging.
                </div>
              )}
            </div>
          )}

          {/* Tab Content 3: Tech Stack */}
          {activeTab === "stack" && (
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap gap-2.5 font-mono text-xs">
              {currentProject.stack.map((tech) => (
                <span key={tech} className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 font-bold shadow-sm">
                  {tech}
                </span>
              ))}
            </div>
          )}

        </div>

        {/* Right Column: Outcomes Box matching Panel 04 */}
        <div className="lg:col-span-4 p-6 sm:p-8 rounded-2xl bg-slate-950 text-white border border-slate-800 shadow-2xl flex flex-col justify-between min-h-[360px] gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              OUTCOMES & IMPACT
            </span>
            <h4 className="text-xl font-display font-extrabold text-white">
              {currentProject.id === "05" ? "Schema Guardrail Metrics" : "Project Status"}
            </h4>
          </div>

          {currentProject.id === "05" ? (
            <div className="flex flex-col gap-6 my-auto font-mono">
              <div className="flex flex-col">
                <span className="text-4xl sm:text-5xl font-extrabold text-cyan-300">&lt;200ms</span>
                <span className="text-xs text-slate-400 mt-1">AST Introspection Latency</span>
              </div>

              <div className="flex flex-col border-t border-slate-800 pt-4">
                <span className="text-4xl sm:text-5xl font-extrabold text-emerald-400">100%</span>
                <span className="text-xs text-slate-400 mt-1">Zero-Downtime Migration Safety</span>
              </div>

              <div className="flex flex-col border-t border-slate-800 pt-4">
                <span className="text-4xl sm:text-5xl font-extrabold text-purple-400">3</span>
                <span className="text-xs text-slate-400 mt-1">Dialects Supported (Delta, Postgres, SQL)</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4 my-auto font-mono">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-amber-300 text-xs font-bold">
                STATUS: IN PROGRESS
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Active prototype undergoing internal benchmarking & pipeline validation.
              </p>
            </div>
          )}

          <div className="pt-4 border-t border-slate-800 text-[11px] font-mono text-slate-400">
            REAL PROBLEMS. SCALABLE SOLUTIONS.
          </div>
        </div>

      </div>
    </section>
  );
}
