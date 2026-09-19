"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Workflow, CheckCircle2, Lock, Cpu, Layers } from "lucide-react";
import { type Project } from "@/data/index";

interface ProjectDetailModalProps {
  project?: Project;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectDetailModal({ project, isOpen, onClose }: ProjectDetailModalProps) {
  const [activeTab, setActiveTab] = useState<"architecture" | "overview" | "stack">("architecture");

  if (!isOpen || !project) return null;

  const isDevInProgress = project.status.toUpperCase().includes("IN PROGRESS") || project.status.toUpperCase().includes("DEV");

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-slate-200 text-slate-900 shadow-2xl p-6 sm:p-10 flex flex-col gap-6 z-10"
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-slate-200 pb-5 gap-4">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-cyan-600 font-bold uppercase tracking-widest">
                  PROJECT SPECIFICATIONS
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                  isDevInProgress ? "bg-amber-100 text-amber-800 border border-amber-300" : "bg-emerald-100 text-emerald-800 border border-emerald-300"
                }`}>
                  {project.status}
                </span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-950">
                {project.title}
              </h3>
              <p className="text-xs sm:text-sm font-sans text-slate-600 max-w-2xl">
                {project.desc}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-950 transition-colors shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Action Links Bar: Enabled for LIVE, Disabled for IN PROGRESS */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-xs">
            <span className="font-bold text-slate-700">DEPLOYMENT &amp; SOURCE ACCESS:</span>

            {isDevInProgress ? (
              <div className="flex flex-wrap items-center gap-2">
                <div
                  className="px-3.5 py-2 rounded-xl text-xs font-mono font-bold text-slate-400 bg-slate-100 border border-slate-200 flex items-center gap-1.5 cursor-not-allowed opacity-80 select-none"
                  title="Live Demo disabled during active development"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Live Demo (Dev in Progress)</span>
                </div>
                <div
                  className="px-3.5 py-2 rounded-xl text-xs font-mono font-bold text-slate-400 bg-slate-100 border border-slate-200 flex items-center gap-1.5 cursor-not-allowed opacity-80 select-none"
                  title="Source code repository is private during development"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Source Code (Private)</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl text-xs font-mono font-bold text-white bg-slate-950 hover:bg-slate-800 flex items-center gap-2 transition-all shadow-md cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-emerald-400" /> Live Demo
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl text-xs font-mono font-bold text-slate-800 border border-slate-300 bg-white hover:bg-slate-100 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Github className="w-3.5 h-3.5 text-cyan-600" /> View Code
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3 font-mono text-xs overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab("architecture")}
              className={`px-4 py-2 rounded-xl cursor-pointer transition-all ${
                activeTab === "architecture"
                  ? "bg-slate-950 text-white font-bold shadow-md"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              Architecture Flowchart
            </button>
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2 rounded-xl cursor-pointer transition-all ${
                activeTab === "overview"
                  ? "bg-slate-950 text-white font-bold shadow-md"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              Overview &amp; Features
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

          {/* Tab Content */}
          {activeTab === "architecture" && (
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-6">
              <span className="text-xs font-mono font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
                <Workflow className="w-4 h-4 text-cyan-600" />
                // PIPELINE ARCHITECTURE IN ACTION
              </span>

              {project.id === "05" ? (
                <div className="flex flex-col gap-4 font-mono text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col justify-center">
                      <span className="font-extrabold text-slate-950">DDL Ingestion</span>
                      <span className="text-[10px] text-slate-500 mt-1">SQL / Delta Schema</span>
                    </div>

                    <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 text-purple-950 shadow-sm flex flex-col justify-center">
                      <span className="font-extrabold">AST Engine</span>
                      <span className="text-[10px] text-purple-700 mt-1">Python AST Diff</span>
                    </div>

                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 shadow-sm flex flex-col justify-center">
                      <span className="font-extrabold">Safety Classifier</span>
                      <span className="text-[10px] text-emerald-700 mt-1">SAFE / WARNING / BREAKING</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center pt-1">
                    <div className="p-4 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-950 shadow-sm flex flex-col justify-center">
                      <span className="font-extrabold">Target Storage</span>
                      <span className="text-[10px] text-cyan-700 mt-1">Databricks Delta &amp; Postgres</span>
                    </div>

                    <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 shadow-sm flex flex-col justify-center">
                      <span className="font-extrabold">CI/CD Guardrail</span>
                      <span className="text-[10px] text-amber-700 mt-1">schema-shield check (PyPI)</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-xs font-mono">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col justify-center">
                    <span className="font-extrabold text-slate-950">Input Layer</span>
                    <span className="text-[10px] text-slate-500 mt-1">Data Ingestion</span>
                  </div>
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 shadow-sm flex flex-col justify-center">
                    <span className="font-extrabold">Processing Engine</span>
                    <span className="text-[10px] text-amber-700 mt-1">In Active Development</span>
                  </div>
                  <div className="p-4 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-950 shadow-sm flex flex-col justify-center">
                    <span className="font-extrabold">Staging Target</span>
                    <span className="text-[10px] text-cyan-700 mt-1">Pipeline Validation</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "overview" && (
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-sans leading-relaxed text-slate-700">
              <p className="text-sm text-slate-900 font-medium mb-4">
                {project.desc}
              </p>
              {project.id === "05" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-sans">
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>SAFE / WARNING / BREAKING DDL Classification</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Multi-dialect Delta Lake &amp; Postgres Support</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Git Pre-commit &amp; CI/CD Guardrail Integration</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Published Open-Source PyPI CLI Package</span>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-mono text-xs flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>This project is currently in active development / staging. Demos and source code repositories are private during dev phase.</span>
                </div>
              )}
            </div>
          )}

          {activeTab === "stack" && (
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap gap-2.5 font-mono text-xs">
              {project.stack.map((tech) => (
                <span key={tech} className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 font-bold shadow-sm">
                  {tech}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
