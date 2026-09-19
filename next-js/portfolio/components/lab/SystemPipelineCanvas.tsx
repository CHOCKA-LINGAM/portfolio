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
    stage: "01 / Event Ingestion",
    name: "Apache Kafka Event Bus",
    tech: "Kafka, Python AsyncIO",
    latency: "< 5ms",
    throughput: "50k+ events/sec",
    icon: <Database className="w-5 h-5 text-emerald-400" />,
    details: "High-throughput distributed event streaming layer capturing multi-terabyte financial transactions with zero packet loss.",
    metrics: ["Partition Auto-Scaling", "Strict Event Ordering", "Fault-Tolerant Replicas"],
  },
  {
    id: "pyspark",
    stage: "02 / Distributed Data Engine",
    name: "Databricks & PySpark ETL",
    tech: "PySpark, Delta Lake",
    latency: "8.5 min batch runtime",
    throughput: "3.2TB Delta tables",
    icon: <Zap className="w-5 h-5 text-orange-400" />,
    details: "Distributed parallel memory transformation pipelines cutting end-to-end data ingestion runtime by 40%.",
    metrics: ["40% Processing Speedup", "ACID Transaction Guarantees", "90%+ QA Test Coverage"],
  },
  {
    id: "fastapi",
    stage: "03 / Microservices Layer",
    name: "FastAPI Async Services",
    tech: "FastAPI, PostgreSQL, Redis",
    latency: "sub-45ms API response",
    throughput: "5k+ req/sec",
    icon: <Server className="w-5 h-5 text-sky-400" />,
    details: "Decoupled async REST & GraphQL APIs with Pydantic v2 schemas, connection pooling, and Redis cache invalidation.",
    metrics: ["Sub-50ms Response Latency", "Pydantic v2 Strict Validation", "Redis Caching Layer"],
  },
  {
    id: "ai",
    stage: "04 / GenAI Orchestration",
    name: "AWS Bedrock & LangChain Guardrails",
    tech: "AWS Bedrock, OpenAI GPT-4",
    latency: "sub-1.2s model stream",
    throughput: "Multi-Agent Workflows",
    icon: <Cpu className="w-5 h-5 text-purple-400" />,
    details: "Multi-agent LLM orchestration engines with automated prompt guardrails, retrieval vector memory, and failover fallbacks.",
    metrics: ["Prompt Injection Guardrails", "Multi-Agent Role Distribution", "99.99% Service Uptime"],
  },
  {
    id: "client",
    stage: "05 / Delivery & React Client",
    name: "Next.js & Azure AKS Cloud",
    tech: "Next.js, Docker, Azure AKS",
    latency: "Instant SPA state",
    throughput: "Global Edge CDNs",
    icon: <Layout className="w-5 h-5 text-indigo-400" />,
    details: "Containerized Kubernetes microservice deployments with edge distribution and 14-theme dynamic design system.",
    metrics: ["Zero-Downtime AKS Rollouts", "100/100 Lighthouse Performance", "Custom Design System"],
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
