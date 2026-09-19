"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Workflow, Database, Server, Cpu, Cloud, ArrowRight, ShieldCheck, Flame, Terminal, Box, Globe, Code2 } from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

const TOPOLOGY_NODES = [
  {
    id: "data-lake",
    layer: "01 / INGESTION",
    title: "Delta Lake & Databricks Ingestion",
    tech: "PySpark · Databricks · Delta Lake",
    metric: "40% Runtime Speedup",
    status: "HEALTHY",
    desc: "Refactored multi-terabyte raw logs into parallelized PySpark dataframes over cloud lakehouse infrastructure.",
    code: `spark.read.format("delta").load("s3://logs/") \\
  .repartition("partition_date") \\
  .write.mode("append").saveAsTable("analytics_lake")`,
  },
  {
    id: "stream-kafka",
    layer: "02 / EVENT BUS",
    title: "Apache Kafka Real-time Streaming",
    tech: "Kafka · Event Streams · Async Consumer",
    metric: "<15ms Pipeline Latency",
    status: "ACTIVE",
    desc: "High-concurrency event-driven streaming bus for real-time telemetry processing across microservices.",
    code: `consumer = KafkaConsumer('telemetry_events', bootstrap_servers=['kafka:9092'])
for msg in consumer:
    asyncio.create_task(dispatch_event(msg.value))`,
  },
  {
    id: "api-fastapi",
    layer: "03 / SERVICES",
    title: "FastAPI High-Throughput REST APIs",
    tech: "FastAPI · Python 3.11 · Pydantic v2",
    metric: "<38ms P99 Latency",
    status: "HEALTHY",
    desc: "Async Python REST & GraphQL endpoints with Pydantic v2 validation supporting high-concurrency client traffic.",
    code: `@app.post("/api/v1/telemetry")
async def ingest(payload: TelemetrySchema):
    return await service_orchestrator.dispatch(payload)`,
  },
  {
    id: "ai-bedrock",
    layer: "04 / ORCHESTRATION",
    title: "AWS Bedrock & Multi-Agent AI",
    tech: "AWS Bedrock · OpenAI · Guardrails",
    metric: "99.99% Availability",
    status: "ACTIVE",
    desc: "Production GenAI orchestration with automated multi-agent fallback guardrails and sub-second tool execution.",
    code: `orchestrator = BedrockAgent(guardrail="STRICT")
result = await orchestrator.dispatch_with_fallback(prompt)`,
  },
];

export function ModuleTopologyCanvas() {
  const [activeNode, setActiveNode] = useState(TOPOLOGY_NODES[0]);

  return (
    <div className="w-full flex flex-col gap-6 py-2">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Workflow className="w-5 h-5 text-[var(--accent)]" />
          <span className="text-xs font-mono font-bold text-[var(--accent)] uppercase tracking-[0.2em]">
            MODULE 03 // LIVE SYSTEM TOPOLOGY CANVAS
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[var(--text)]">
          Distributed Pipeline Topology
        </h2>
        <p className="text-sm text-[var(--text-muted)] max-w-2xl font-sans">
          Click any glowing node on the interactive architectural canvas below to inspect live pipeline code, latency metrics, and design decisions.
        </p>
      </div>

      {/* Node Graph Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {TOPOLOGY_NODES.map((node, i) => {
          const isSelected = activeNode.id === node.id;
          return (
            <SpotlightCard
              key={node.id}
              onClick={() => setActiveNode(node)}
              tilt={i % 2 === 0 ? "left" : "right"}
              className={`cursor-pointer transition-all ${
                isSelected
                  ? "ring-2 ring-[var(--accent)] bg-[var(--surface-2)] shadow-2xl"
                  : "hover:border-[var(--accent)]/50"
              }`}
            >
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-2 mb-3">
                <span className="text-[10px] font-mono text-[var(--accent)] font-bold">
                  {node.layer}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/30">
                  {node.status}
                </span>
              </div>

              <h3 className="text-lg font-display font-bold text-[var(--text)] mb-1">
                {node.title}
              </h3>
              <span className="text-xs font-mono text-[var(--muted)] block mb-3">
                {node.tech}
              </span>

              <div className="p-2 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] font-mono text-xs text-emerald-400 font-bold flex items-center justify-between">
                <span>BENCHMARK</span>
                <span>{node.metric}</span>
              </div>
            </SpotlightCard>
          );
        })}
      </div>

      {/* Telemetry Code Inspector Drawer */}
      <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-1)] p-5 shadow-2xl backdrop-blur-xl flex flex-col gap-3 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
          <div className="flex items-center gap-2 text-[var(--accent)] font-bold">
            <Code2 className="w-4 h-4" />
            <span>&gt; INSPECTING NODE: {activeNode.title.toUpperCase()}</span>
          </div>
          <span className="text-[var(--muted)]">// {activeNode.metric}</span>
        </div>

        <p className="text-sm font-sans text-[var(--text)] leading-relaxed bg-[var(--surface-2)] p-4 rounded-xl border border-[var(--border)]">
          {activeNode.desc}
        </p>

        <div className="rounded-xl bg-[#080b12] border border-[var(--border)] p-4 text-slate-200 overflow-x-auto leading-relaxed">
          <pre>{activeNode.code}</pre>
        </div>
      </div>
    </div>
  );
}
