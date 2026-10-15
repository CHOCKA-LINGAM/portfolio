"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, Server, Cpu, Cloud, Layout, Zap, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

interface PipelineNode {
  id: string;
  stage: string;
  name: string;
  tech: string;
  latency: string;
  throughput: string;
  icon: React.ReactNode;
  details: string;
  metrics: string[];
}

const PIPELINE_NODES: PipelineNode[] = [
  {
    id: "kafka",
    stage: "01 / Data Sources",
    name: "Legacy Pandas Pipelines",
    tech: "Python, Pandas",
    latency: "Single-node",
    throughput: "Pre-migration",
    icon: <Database className="w-5 h-5 text-emerald-400" />,
    details: "Starting point: legacy Pandas-based pipelines that were migrated to distributed PySpark.",
    metrics: ["Legacy Pandas ETL", "Migration source", "Schema drift risk"],
  },
  {
    id: "pyspark",
    stage: "02 / Distributed Data Engine",
    name: "Databricks & PySpark ETL",
    tech: "PySpark, Azure Databricks",
    latency: "Distributed",
    throughput: "Spark clusters",
    icon: <Zap className="w-5 h-5 text-orange-400" />,
    details: "Legacy Pandas pipelines migrated to distributed PySpark on Azure Databricks.",
    metrics: ["Pandas to PySpark migration", "Azure Databricks", "Sub-5s DAG planning API"],
  },
  {
    id: "fastapi",
    stage: "03 / Microservices Layer",
    name: "FastAPI Async Services",
    tech: "FastAPI, Django",
    latency: "AI claims API 25s → 10s",
    throughput: "10–12 markets",
    icon: <Server className="w-5 h-5 text-sky-400" />,
    details: "Python backends: a multi-tenant Django platform serving 10–12 markets on one codebase, plus FastAPI services.",
    metrics: ["Multi-tenant Django", "FastAPI services", "AI claims API 25s → 10s"],
  },
  {
    id: "ai",
    stage: "04 / GenAI Orchestration",
    name: "AI-Assisted Workflows",
    tech: "AWS Bedrock, LLM tooling",
    latency: "AI claims workflow",
    throughput: "Model-validated",
    icon: <Cpu className="w-5 h-5 text-purple-400" />,
    details: "AI-assisted claims workflows backed by direct model validation, which cut QA cycle time by over 90%.",
    metrics: [">90% QA cycle-time cut", "Direct model validation", "AWS Bedrock"],
  },
  {
    id: "client",
    stage: "05 / Delivery",
    name: "Schema Safety & Delivery",
    tech: "schema-shield, Docker",
    latency: "SAFE / WARNING / BREAKING",
    throughput: "Open source on PyPI",
    icon: <Layout className="w-5 h-5 text-indigo-400" />,
    details: "schema-shield classifies schema changes as SAFE, WARNING or BREAKING before they reach data pipelines.",
    metrics: ["schema-shield on PyPI", "Compatibility checks", "Transfer safety"],
  },
];

export const SystemPipelineCanvas: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<PipelineNode>(PIPELINE_NODES[1]);

  return (
    <div className="w-full flex flex-col gap-4 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-1)] p-4 sm:p-6 shadow-2xl backdrop-blur-xl">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[var(--border)] pb-3.5 gap-2">
        <div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <h3 className="text-base sm:text-lg font-bold text-[var(--text)] font-sans">
              Interactive System Architecture Canvas
            </h3>
          </div>
          <p className="text-xs text-[var(--text-muted)] font-sans mt-0.5">
            Click any pipeline node to inspect real-time throughput, latency, and engineering benchmarks.
          </p>
        </div>
        <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 w-max">
          LIVE DATA PIPELINE
        </span>
      </div>

      {/* 5 Stage Nodes Pipeline (Horizontal Flow) */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative py-2">
        {PIPELINE_NODES.map((node, idx) => {
          const isSelected = selectedNode.id === node.id;
          return (
            <motion.button
              key={node.id}
              onClick={() => setSelectedNode(node)}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className={`p-3.5 rounded-xl border transition-all text-left flex flex-col justify-between cursor-pointer relative ${
                isSelected
                  ? "bg-[var(--surface-2)] border-sky-400 ring-2 ring-sky-400/40 shadow-xl"
                  : "bg-[var(--surface-2)]/60 border-[var(--border)] hover:border-sky-400/50"
              }`}
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-[var(--surface-1)] border border-[var(--border)]">
                    {node.icon}
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[var(--muted)]">
                    0{idx + 1}
                  </span>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-bold">
                  {node.stage}
                </span>
                <h4 className="text-xs font-bold text-[var(--text)] font-sans leading-snug">
                  {node.name}
                </h4>
              </div>

              <div className="mt-3 pt-2 border-t border-[var(--border)] flex items-center justify-between text-[11px] font-mono">
                <span className="text-emerald-400 font-bold">{node.latency}</span>
                {idx < PIPELINE_NODES.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--muted)] hidden md:block" />
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Selected Node Inspector Detail Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedNode.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18 }}
          className="p-4 sm:p-5 rounded-xl bg-[var(--surface-2)] border border-sky-500/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 font-sans text-xs sm:text-sm"
        >
          <div className="flex flex-col gap-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-sky-500/20 text-sky-300 font-mono text-xs font-bold border border-sky-500/40">
                {selectedNode.stage}
              </span>
              <h4 className="text-base font-bold text-[var(--text)]">{selectedNode.name}</h4>
            </div>
            <p className="text-[var(--text-muted)] leading-relaxed">{selectedNode.details}</p>
            <div className="flex items-center gap-4 pt-1 font-mono text-xs">
              <span className="text-emerald-400 font-bold">Latency: {selectedNode.latency}</span>
              <span className="text-sky-400 font-bold">Throughput: {selectedNode.throughput}</span>
            </div>
          </div>

          {/* Metric Badges */}
          <div className="flex flex-wrap md:flex-col gap-2 shrink-0 border-t md:border-t-0 md:border-l border-[var(--border)] pt-3 md:pt-0 md:pl-5">
            {selectedNode.metrics.map((m) => (
              <span
                key={m}
                className="px-3 py-1.5 rounded-lg bg-[var(--surface-1)] border border-[var(--border)] text-xs font-semibold text-[var(--text)] flex items-center gap-1.5 shadow-sm"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                {m}
              </span>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
