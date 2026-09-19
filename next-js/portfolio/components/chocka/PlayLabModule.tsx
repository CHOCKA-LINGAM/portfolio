"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Terminal, Sparkles, Play, Code2, Image as ImageIcon, BarChart2, Globe, CheckCircle2, FlaskConical, Database, Layers } from "lucide-react";

const LAB_TABS = [
  { id: "llm", label: "LLM Playground", icon: <Cpu className="w-4 h-4 text-purple-400" /> },
  { id: "analyzer", label: "Text Analyzer", icon: <Terminal className="w-4 h-4 text-emerald-400" /> },
  { id: "visualizer", label: "Data Visualizer", icon: <BarChart2 className="w-4 h-4 text-cyan-400" /> },
  { id: "api", label: "API Explorer", icon: <Globe className="w-4 h-4 text-amber-400" /> },
];

const DEFAULT_PROMPTS = {
  llm: "Explain how PySpark distributed dataframes work under the hood...",
  analyzer: "Analyze sentiment & extract key technical entities from log stream...",
  visualizer: "Generate PySpark aggregation query for 10M events per second...",
  api: "GET /api/v1/healthcheck & POST /api/v1/inference/predict",
};

export function PlayLabModule() {
  const [activeTab, setActiveTab] = useState<keyof typeof DEFAULT_PROMPTS>("llm");
  const [prompt, setPrompt] = useState(DEFAULT_PROMPTS.llm);
  const [isExec, setIsExec] = useState(false);
  const [output, setOutput] = useState<string | null>(null);

  const handleTabChange = (tabId: keyof typeof DEFAULT_PROMPTS) => {
    setActiveTab(tabId);
    setPrompt(DEFAULT_PROMPTS[tabId]);
    setOutput(null);
  };

  const handleRun = () => {
    setIsExec(true);
    setOutput(null);
    setTimeout(() => {
      setIsExec(false);
      if (activeTab === "llm") {
        setOutput(
          `✓ [LLM GPT-4o OUTPUT]: PySpark partitions data into RDD partitions across worker nodes in Databricks. Data transformation operations are lazily evaluated via DAG execution graphs until an action (e.g. .count() or .collect()) is triggered.`
        );
      } else if (activeTab === "analyzer") {
        setOutput(
          `✓ [TEXT ANALYZER RESULT]: Identified 4 Key Tech Entities: [PySpark, Databricks, FastAPI, AWS Bedrock]. Sentiment: High Tech Confidence (98.4%). No memory leak anomalies detected.`
        );
      } else if (activeTab === "visualizer") {
        setOutput(
          `✓ [DATA AGGREGATOR]: df.groupBy("event_type").agg(count("*").alias("total_events"), avg("latency_ms").alias("avg_latency")).orderBy(col("total_events").desc()) → Execution Time: 42ms on 8 Spark Worker Nodes.`
        );
      } else {
        setOutput(
          `✓ [API EXPLORER 200 OK]: { "status": "healthy", "service": "chocka-inference-engine", "uptime": "99.99%", "active_workers": 16, "latency_p99_ms": 12.4 }`
        );
      }
    }, 700);
  };

  return (
    <section id="section-playlab" className="relative w-full min-h-[80vh] rounded-3xl overflow-hidden border border-emerald-500/20 bg-slate-950/90 shadow-2xl p-6 sm:p-10 lg:p-12 my-8 flex flex-col justify-between scroll-mt-24">
      
      {/* Top Header */}
      <div className="flex flex-col gap-2 border-b border-white/10 pb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/60 text-emerald-400 text-xs font-mono font-bold tracking-widest w-max backdrop-blur-md">
          <FlaskConical className="w-3.5 h-3.5 text-emerald-400" />
          <span>07 // PLAYLAB (HANDS-ON EXPERIMENTS & MINI APPS)</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-white tracking-tight">
          Ideas in Progress & Mini Apps
        </h2>
        <p className="text-sm font-serif-italic text-cyan-300">
          Small experiments. Big curiosity. Try different models and run live code.
        </p>
      </div>

      {/* Main Grid: Left Experiment Tabs, Right Live Interactive Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-auto py-6">
        
        {/* Left Column: Experiment Tabs */}
        <div className="lg:col-span-5 flex flex-col gap-4 p-6 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-xl shadow-2xl">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
            // SELECT EXPERIMENT MODULE
          </span>

          <div className="flex flex-col gap-2.5">
            {LAB_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id as keyof typeof DEFAULT_PROMPTS)}
                  className={`p-4 rounded-xl border text-left font-mono text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                    isActive
                      ? "bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 border-white shadow-[0_0_20px_rgba(52,211,153,0.4)] scale-[1.02]"
                      : "bg-slate-950/60 text-slate-300 border-white/10 hover:border-white/20 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-slate-950/40">{tab.icon}</div>
                    <span>{tab.label}</span>
                  </div>
                  {isActive && <Sparkles className="w-4 h-4 text-slate-950" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Live Interactive Console */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-slate-950/90 border border-emerald-500/30 backdrop-blur-2xl shadow-2xl flex flex-col gap-6 min-h-[380px] justify-between">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-xs">
            <span className="text-emerald-400 font-bold flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              // {activeTab.toUpperCase()} EXPERIMENT CONSOLE
            </span>
            <span className="text-cyan-400 font-bold px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30">
              ENGINE: Chocka Labs v2.4
            </span>
          </div>

          <div className="flex flex-col gap-2 font-mono">
            <label className="text-xs font-bold text-slate-400">// ENTER PROMPT OR COMMAND QUERY</label>
            <textarea
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/15 text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-400 transition-all font-mono resize-none leading-relaxed shadow-inner"
            />
          </div>

          <button
            onClick={handleRun}
            disabled={isExec}
            className="px-8 py-4 rounded-2xl font-mono font-bold text-sm text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 flex items-center justify-center gap-3 transition-all shadow-[0_0_30px_rgba(52,211,153,0.4)] disabled:opacity-50 cursor-pointer self-start"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            {isExec ? "Executing Engine..." : "Run Experiment →"}
          </button>

          {/* Console Output Box */}
          {output && (
            <div className="p-5 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-mono text-xs leading-relaxed flex items-start gap-3 shadow-lg">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span>{output}</span>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}


