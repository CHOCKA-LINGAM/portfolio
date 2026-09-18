"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Cpu,
  Database,
  Flame,
  Globe,
  Play,
  CheckCircle2,
  Code2,
  Activity,
  Coffee,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Mail,
  Eye,
  Download,
} from "lucide-react";
import { PERSONAL } from "@/data/index";
import { InteractiveAvatar } from "@/components/ui/InteractiveAvatar";

const CODE_SAMPLES = {
  pyspark: {
    filename: "spark_etl_pipeline.py",
    language: "python",
    icon: <Database className="w-4 h-4 text-orange-400" />,
    metrics: "40% Runtime Speedup · Databricks Parallel DF",
    code: `from pyspark.sql import SparkSession
from pyspark.sql.functions import col, when, expr

def execute_high_throughput_etl(input_path: str, delta_table: str):
    spark = SparkSession.builder \\
        .appName("ChockEngine_PySpark_Ingest") \\
        .config("spark.sql.shuffle.partitions", "200") \\
        .getOrCreate()
        
    df = spark.read.format("delta").load(input_path)
    
    transformed_df = df \\
        .filter(col("status") == "ACTIVE") \\
        .withColumn("ingest_ts", expr("current_timestamp()")) \\
        .repartition("partition_date")
        
    transformed_df.write \\
        .format("delta") \\
        .mode("append") \\
        .option("mergeSchema", "true") \\
        .saveAsTable(delta_table)
        
    return {"status": "SUCCESS", "records_processed": transformed_df.count()}`,
  },
  fastapi: {
    filename: "fastapi_microservice.py",
    language: "python",
    icon: <Globe className="w-4 h-4 text-emerald-400" />,
    metrics: "<38ms P99 Latency · Async Pydantic v2",
    code: `from fastapi import FastAPI, Depends, BackgroundTasks
from pydantic import BaseModel
import asyncio

app = FastAPI(title="ChockMicroservice", version="2.0.0")

class TelemetryPayload(BaseModel):
    service_id: str
    concurrency_load: int
    payload_hash: str

@app.post("/api/v1/ingest/stream")
async def process_stream(
    payload: TelemetryPayload, 
    bg_tasks: BackgroundTasks
):
    # Sub-38ms async execution pipeline
    task_result = await asyncio.gather(
        validate_payload_signature(payload),
        stream_event_kafka(payload)
    )
    
    bg_tasks.add_task(async_audit_logger, payload.service_id)
    return {"status": "ACK", "latency_ms": 14.2, "hash": payload.payload_hash}`,
  },
  bedrock: {
    filename: "bedrock_agent_orchestrator.py",
    language: "python",
    icon: <Cpu className="w-4 h-4 text-purple-400" />,
    metrics: "99.99% Guardrail Availability · Multi-Agent Fallback",
    code: `import boto3
from langchain.agents import AgentExecutor, create_openai_tools_agent

class BedrockAgentOrchestrator:
    def __init__(self, region: str = "us-east-1"):
        self.bedrock = boto3.client("bedrock-runtime", region_name=region)
        self.guardrail_active = True

    async def dispatch_with_fallback(self, prompt: str):
        try:
            # Primary AWS Bedrock Model Execution
            response = await self.call_bedrock(prompt)
            return self.apply_safety_guardrails(response)
        except Exception as fallback_err:
            # Automated Multi-Agent Secondary Fallback
            return await self.trigger_openai_fallback(prompt)`,
  },
};

export function WorkstationHero({
  onOpenStory,
  onOpenResume,
}: {
  onOpenStory?: () => void;
  onOpenResume?: () => void;
}) {
  const [activeCodeTab, setActiveCodeTab] = useState<keyof typeof CODE_SAMPLES>("pyspark");
  const [isRunningSim, setIsRunningSim] = useState(false);
  const [simOutput, setSimOutput] = useState<string | null>(null);

  const activeSample = CODE_SAMPLES[activeCodeTab];

  const handleRunSimulation = () => {
    setIsRunningSim(true);
    setSimOutput(null);
    setTimeout(() => {
      setIsRunningSim(false);
      setSimOutput(
        `✓ [EXECUTION SUCCESS] Benchmark Passed: ${activeSample.metrics} | Output: ACK 200 OK`
      );
    }, 900);
  };

  return (
    <div className="w-full flex flex-col gap-6 py-2">
      {/* ── WORKSTATION HERO HEADER ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_.9fr] gap-6 lg:gap-10 items-center">
        {/* Left Column: Architect Persona Identity */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <InteractiveAvatar size="lg" onClick={onOpenStory} showBadge />
            <div className="flex flex-col gap-1">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold tracking-wide w-max backdrop-blur-xl bg-emerald-500/10">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                WORKSTATION ACTIVE · SENIOR ARCHITECT
              </div>
              <span className="text-xs font-mono text-[var(--muted)]">
                Based in Chennai, India · Open for Global Remote & Relocation
              </span>
              <button
                onClick={onOpenStory}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--accent)] hover:underline pt-0.5"
              >
                <Play className="w-3.5 h-3.5 fill-[var(--accent)]" />
                <span>Tap to Launch Interactive Story Highlights</span>
              </button>
            </div>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-[var(--text)] leading-[1.02]">
            {PERSONAL.name}
          </h1>

          <p className="text-base sm:text-xl text-[var(--text-muted)] leading-relaxed max-w-xl font-sans font-normal">
            Architecting high-concurrency <span className="font-serif-italic text-[var(--accent)] text-2xl font-normal">backend microservices</span>, PySpark ETL engines, and production AI agent orchestration. 5+ years shipping enterprise software with measurable impact.
          </p>

          {/* Action Callouts */}
          <div className="flex gap-3 flex-wrap mt-1">
            <a
              href={`mailto:${PERSONAL.email}`}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-slate-950 transition-all shadow-lg hover:opacity-90 cursor-pointer font-mono"
              style={{ backgroundColor: "var(--accent)" }}
            >
              Get in Touch <Mail size={16} />
            </a>
            <button
              onClick={onOpenResume}
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm text-[var(--text)] border border-[var(--border-strong)] bg-[var(--surface-2)] hover:bg-[var(--surface-1)] hover:border-[var(--accent)] transition-all shadow-md cursor-pointer font-mono"
            >
              <Eye size={16} className="text-[var(--accent)]" />
              Preview Resume
            </button>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm text-[var(--text)] border border-sky-500/40 bg-sky-500/15 hover:bg-sky-500/25 transition-all shadow-md font-mono"
            >
              Download <Download size={16} className="text-sky-400" />
            </a>
          </div>
        </div>

        {/* Right Column: Interactive Dual-Monitor Workstation Desk */}
        <div className="relative rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-1)] p-5 shadow-2xl backdrop-blur-xl flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[var(--accent)]" />
              <span className="text-xs font-mono font-bold text-[var(--text)] uppercase tracking-wider">
                MONITOR 01 // LIVE WORKSTATION IDE
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
          </div>

          {/* IDE Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {(Object.keys(CODE_SAMPLES) as Array<keyof typeof CODE_SAMPLES>).map((key) => {
              const sample = CODE_SAMPLES[key];
              const isActive = activeCodeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => {
                    setActiveCodeTab(key);
                    setSimOutput(null);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold flex items-center gap-2 transition-all border ${
                    isActive
                      ? "bg-[var(--surface-2)] text-[var(--accent)] border-[var(--accent)] shadow-md"
                      : "bg-[var(--surface-1)] text-[var(--muted)] border-[var(--border)] hover:text-[var(--text)]"
                  }`}
                >
                  {sample.icon}
                  <span>{sample.filename}</span>
                </button>
              );
            })}
          </div>

          {/* Code Viewer Box */}
          <div className="relative rounded-xl bg-[#080b12] border border-[var(--border)] p-4 font-mono text-xs overflow-x-auto text-slate-200 leading-relaxed max-h-[220px]">
            <div className="text-[11px] text-[var(--muted)] pb-2 border-b border-white/10 mb-2 flex items-center justify-between">
              <span>// {activeSample.metrics}</span>
              <button
                onClick={handleRunSimulation}
                disabled={isRunningSim}
                className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30 transition-all font-bold flex items-center gap-1 cursor-pointer disabled:opacity-50"
              >
                <Play className="w-3 h-3 fill-emerald-400" />
                {isRunningSim ? "Running..." : "Run Test"}
              </button>
            </div>
            <pre className="whitespace-pre">{activeSample.code}</pre>
          </div>

          {/* Interactive Run Simulation Output */}
          <AnimatePresence>
            {simOutput && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>{simOutput}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Workstation Desk Telemetry Metrics Footer */}
          <div className="grid grid-cols-3 gap-2.5 pt-1 border-t border-[var(--border)]">
            <div className="p-2.5 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] flex flex-col">
              <span className="text-xs font-mono font-bold text-[var(--accent)]">40% FASTER</span>
              <span className="text-[10px] text-[var(--muted)] font-mono uppercase">PySpark ETL</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] flex flex-col">
              <span className="text-xs font-mono font-bold text-emerald-400">&lt;38ms P99</span>
              <span className="text-[10px] text-[var(--muted)] font-mono uppercase">API Latency</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] flex flex-col">
              <span className="text-xs font-mono font-bold text-purple-400">99.99% UPTIME</span>
              <span className="text-[10px] text-[var(--muted)] font-mono uppercase">AI Failover</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
