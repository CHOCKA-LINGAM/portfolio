"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Send,
  Moon,
  X,
  Database,
  Server,
  Cpu,
  Zap,
  Activity,
  ArrowRight,
  Play,
  CheckCircle2,
  Info,
} from "lucide-react";
import { Page } from "@/hooks/useNav";

export function MonographEasterEggs({
  isOpen,
  onClose,
  onNavigate,
}: {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (sectionId: Page) => void;
}) {
  // Mode Toggle: 'simulator' (Out of Box DE/BE/AI Architecture Radar) or 'moon' (Celestial Starlight)
  const [activeMode, setActiveMode] = useState<"simulator" | "moon">("simulator");

  // ── MOON MODE STATE ──
  const [moonPhase, setMoonPhase] = useState<"supermoon" | "crescent" | "eclipse" | "new">("supermoon");
  const [moonClicks, setMoonClicks] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const secretQuotes = [
    "\"Curiosity is the engine of achievement. Great software is built with passion.\"",
    "\"Data flows like water. Systems are designed to give it direction.\"",
    "\"Simple code scales best. Precision over complexity.\"",
    "\"Same sky. Bigger dreams. Keep building forward!\"",
  ];

  // ── DE/BE/AI SIMULATOR STATE ──
  const [simType, setSimType] = useState<"de" | "be" | "ai">("de");
  const [isSimulating, setIsSimulating] = useState(false);
  const [rowsProcessed, setRowsProcessed] = useState(1250400);
  const [apiRequests, setApiRequests] = useState(8920);
  const [agentStep, setAgentStep] = useState(0);

  // Terminal state for inline bottom section
  const [cmdInput, setCmdInput] = useState("");
  const [outputLog, setOutputLog] = useState<string[]>([
    "ChockaOS v2.4.0 Developer Terminal Active",
    "Type 'help', 'pyspark', 'fastapi', 'ai', or 'schema-shield'",
  ]);

  const handleClose = (e?: React.SyntheticEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Terminal Execution
  const executeCmd = (commandText: string) => {
    const cmd = commandText.trim().toLowerCase();
    let res = "";
    if (cmd === "help") {
      res = "Available commands: help, pyspark, fastapi, ai, schema-shield, clear";
    } else if (cmd === "pyspark") {
      res = "⚡ PySpark ETL: Processing 1.2M rows/sec with Delta Lake ACID transactions.";
    } else if (cmd === "fastapi") {
      res = "🚀 FastAPI Backend: P95 API Latency < 18ms with async connection pooling.";
    } else if (cmd === "ai") {
      res = "🤖 AI Agents: RAG Vector Indexing + Autonomous LLM Tool Calling Engine.";
    } else if (cmd === "schema-shield") {
      res = "🛡️ schema-shield PyPI: pip install schema-shield (Runtime schema assertion).";
    } else if (cmd === "clear") {
      setOutputLog([]);
      setCmdInput("");
      return;
    } else {
      res = `Command not found: '${cmd}'. Try 'help'.`;
    }

    setOutputLog((prev) => [...prev, `> ${commandText}`, res]);
    setCmdInput("");
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cmdInput) return;
    executeCmd(cmdInput);
  };

  // Interactive Simulation Triggers
  const runDataPipelineSim = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    let count = 0;
    const interval = setInterval(() => {
      count += 25000;
      setRowsProcessed((prev) => prev + 25000);
      if (count >= 250000) {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 120);
  };

  const runApiStressSim = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    let count = 0;
    const interval = setInterval(() => {
      count += 100;
      setApiRequests((prev) => prev + 100);
      if (count >= 1000) {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 100);
  };

  const runAiAgentSim = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setAgentStep(1);
    setTimeout(() => setAgentStep(2), 600);
    setTimeout(() => setAgentStep(3), 1200);
    setTimeout(() => {
      setAgentStep(4);
      setIsSimulating(false);
    }, 1800);
  };

  return (
    <>
      {/* ── INLINE TERMINAL SECTION AT BOTTOM OF PAGE ── */}
      <section id="section-easteregg" className="relative w-full rounded-3xl overflow-hidden border border-cyan-500/20 bg-slate-950 text-white shadow-2xl p-6 sm:p-12 my-8 flex flex-col justify-between scroll-mt-24">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-10 right-10 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-purple-500/10 rounded-full blur-[150px]" />
        </div>

        <div className="flex flex-col gap-2 border-b border-white/10 pb-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/60 text-cyan-300 text-xs font-mono font-bold tracking-widest w-max backdrop-blur-md">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>DEVELOPER CLI &amp; INSIGHTS</span>
          </div>
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight max-w-full break-words">
            System Terminal
          </h2>
        </div>

        <div className="my-auto py-8 relative z-10 font-mono max-w-4xl mx-auto w-full">
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/30 backdrop-blur-2xl shadow-xl flex flex-col justify-between min-h-[320px]">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs text-cyan-300 font-bold">
              <span className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                chocka-dev :: system-console v2.4
              </span>
              <span className="text-[10px] text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30">
                ACTIVE
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/90 border border-white/10 text-xs text-emerald-300 h-40 overflow-y-auto my-4 font-mono leading-relaxed space-y-1">
              {outputLog.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {["help", "pyspark", "fastapi", "ai", "schema-shield", "clear"].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => executeCmd(cmd)}
                  className="px-2.5 py-1 rounded-lg bg-slate-950 border border-cyan-500/30 text-xs text-cyan-300 hover:bg-cyan-500/20 transition-all cursor-pointer font-bold"
                >
                  {cmd}
                </button>
              ))}
            </div>

            <form onSubmit={handleCommandSubmit} className="flex items-center gap-2">
              <input
                type="text"
                value={cmdInput}
                onChange={(e) => setCmdInput(e.target.value)}
                placeholder="Type command (e.g. 'help', 'pyspark', 'ai')..."
                className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-white/20 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
              />
              <button type="submit" className="px-4 py-2 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs cursor-pointer flex items-center gap-1 hover:bg-cyan-300 transition-all">
                <Send className="w-3.5 h-3.5" /> Send
              </button>
            </form>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-mono text-slate-400 relative z-10">
          <span>Clean code. Scalable pipelines. High performance.</span>
          <span>CHOCKA.dev</span>
        </div>
      </section>

      {/* ── FULL-SCREEN INTERACTIVE OVERLAY MODAL (DUAL-MODE: SIMULATOR & MOON) ── */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[5000] flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-xl">
            {/* Backdrop click exit with explicit touch support */}
            <div
              className="absolute inset-0 z-0 cursor-pointer"
              onClick={handleClose}
              onTouchEnd={handleClose}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 w-full max-w-4xl rounded-3xl bg-slate-900/95 border border-cyan-500/30 text-white shadow-2xl p-4 sm:p-7 flex flex-col justify-between min-h-[520px] max-h-[92vh] overflow-y-auto"
            >
              {/* Top Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-400 shrink-0">
                    <Activity className="w-5 h-5 animate-pulse" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-widest">
                      DEVELOPER ARCHITECTURE RADAR
                    </span>
                    <span className="text-xs font-sans text-slate-300 font-medium">
                      Live interactive simulator of Data Engineering, Microservices &amp; AI Agents
                    </span>
                  </div>
                </div>

                {/* Mode Selector & Close Button */}
                <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
                  <div className="flex items-center gap-1 p-1 rounded-full bg-slate-950 border border-white/10 font-mono text-xs">
                    <button
                      onClick={() => setActiveMode("simulator")}
                      className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        activeMode === "simulator"
                          ? "bg-cyan-500 text-slate-950 shadow-md"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>DE / BE / AI Radar</span>
                    </button>

                    <button
                      onClick={() => setActiveMode("moon")}
                      className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        activeMode === "moon"
                          ? "bg-amber-400 text-slate-950 shadow-md"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <Moon className="w-3.5 h-3.5" />
                      <span>The Moon 🌙</span>
                    </button>
                  </div>

                  {/* EXIT / CLOSE BUTTON FOR TABLET & MOBILE */}
                  <button
                    onClick={handleClose}
                    onTouchEnd={handleClose}
                    className="p-2 rounded-full bg-slate-800 border border-cyan-400/40 text-cyan-300 hover:bg-slate-700 hover:text-white transition-all cursor-pointer shadow-lg shrink-0 min-w-[36px] min-h-[36px] flex items-center justify-center"
                    aria-label="Close Overlay"
                    title="Close (ESC)"
                  >
                    <X className="w-4 h-4 text-cyan-400" />
                  </button>
                </div>
              </div>

              {/* PURPOSE INDICATOR BANNER */}
              <div className="mt-3 p-3 rounded-xl bg-slate-950/80 border border-cyan-500/20 text-xs font-mono text-slate-300 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-cyan-300">Purpose Indicator:</strong> This interactive radar simulates empirical runtime benchmarks for Chockalingam&apos;s 3 core specializations: <span className="text-cyan-400 font-bold">Data Engineering (PySpark ETL)</span>, <span className="text-emerald-400 font-bold">Backend Microservices (FastAPI P95)</span>, and <span className="text-purple-400 font-bold">Autonomous AI Agents (LLM Tool Traces)</span>.
                </span>
              </div>

              {/* ── MODE 1: OUT-OF-THE-BOX DE/BE/AI LIVE SIMULATOR ── */}
              {activeMode === "simulator" && (
                <div className="my-auto py-5 font-mono flex flex-col gap-5">
                  {/* Category Pills */}
                  <div className="flex items-center gap-2 border-b border-white/10 pb-3 text-xs overflow-x-auto">
                    <button
                      onClick={() => setSimType("de")}
                      className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 border whitespace-nowrap ${
                        simType === "de"
                          ? "bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-md"
                          : "bg-slate-950 text-slate-400 border-white/10 hover:text-white"
                      }`}
                    >
                      <Database className="w-4 h-4 text-cyan-400" />
                      <span>Data Engineering Stream</span>
                    </button>

                    <button
                      onClick={() => setSimType("be")}
                      className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 border whitespace-nowrap ${
                        simType === "be"
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-400 shadow-md"
                          : "bg-slate-950 text-slate-400 border-white/10 hover:text-white"
                      }`}
                    >
                      <Server className="w-4 h-4 text-emerald-400" />
                      <span>FastAPI Async Benchmarks</span>
                    </button>

                    <button
                      onClick={() => setSimType("ai")}
                      className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 border whitespace-nowrap ${
                        simType === "ai"
                          ? "bg-purple-500/20 text-purple-300 border-purple-400 shadow-md"
                          : "bg-slate-950 text-slate-400 border-white/10 hover:text-white"
                      }`}
                    >
                      <Cpu className="w-4 h-4 text-purple-400" />
                      <span>AI Agent Tool Trace</span>
                    </button>
                  </div>

                  {/* ⚡ SIMULATOR 1: DATA ENGINEERING */}
                  {simType === "de" && (
                    <div className="p-5 rounded-2xl bg-slate-950/80 border border-cyan-500/40 shadow-xl flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm font-bold text-cyan-300">
                          <Zap className="w-4 h-4 text-amber-400" />
                          <span>PySpark + Delta Lake Pipeline Simulator</span>
                        </div>
                        <span className="text-xs text-slate-400">Status: {isSimulating ? "RUNNING BATCH..." : "IDLE"}</span>
                      </div>

                      {/* Animated Flow Nodes */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-xs">
                        <div className={`p-3 rounded-xl border transition-all ${isSimulating ? "bg-cyan-950 border-cyan-400 animate-pulse text-cyan-200" : "bg-slate-900 border-white/10 text-slate-300"}`}>
                          <span className="block text-[10px] text-slate-400">NODE 01</span>
                          <span className="font-bold">Kafka Ingest</span>
                        </div>
                        <div className={`p-3 rounded-xl border transition-all ${isSimulating ? "bg-cyan-950 border-cyan-400 animate-pulse text-cyan-200" : "bg-slate-900 border-white/10 text-slate-300"}`}>
                          <span className="block text-[10px] text-slate-400">NODE 02</span>
                          <span className="font-bold">PySpark ETL</span>
                        </div>
                        <div className={`p-3 rounded-xl border transition-all ${isSimulating ? "bg-emerald-950 border-emerald-400 animate-pulse text-emerald-200" : "bg-slate-900 border-white/10 text-slate-300"}`}>
                          <span className="block text-[10px] text-slate-400">NODE 03</span>
                          <span className="font-bold">schema-shield ✅</span>
                        </div>
                        <div className={`p-3 rounded-xl border transition-all ${isSimulating ? "bg-purple-950 border-purple-400 animate-pulse text-purple-200" : "bg-slate-900 border-white/10 text-slate-300"}`}>
                          <span className="block text-[10px] text-slate-400">NODE 04</span>
                          <span className="font-bold">Delta Lake Write</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-white/10">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-slate-400 uppercase">Live Processed Records</span>
                          <span className="text-lg font-extrabold text-cyan-300">{rowsProcessed.toLocaleString()} rows</span>
                        </div>

                        <button
                          onClick={runDataPipelineSim}
                          disabled={isSimulating}
                          className="px-4 py-2.5 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs hover:bg-cyan-300 transition-all cursor-pointer shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          <Play className="w-4 h-4" />
                          <span>Inject 250,000 Data Packets</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* 🚀 SIMULATOR 2: BACKEND FASTAPI BENCHMARK */}
                  {simType === "be" && (
                    <div className="p-5 rounded-2xl bg-slate-950/80 border border-emerald-500/40 shadow-xl flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm font-bold text-emerald-300">
                          <Server className="w-4 h-4 text-emerald-400" />
                          <span>FastAPI Async Stress Test Simulator</span>
                        </div>
                        <span className="text-xs text-slate-400">P95 Latency: 14.2ms</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                        <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/30 flex flex-col gap-1">
                          <span className="text-[10px] text-slate-400">TOTAL REQUESTS</span>
                          <span className="text-base font-bold text-emerald-300">{apiRequests.toLocaleString()}</span>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/30 flex flex-col gap-1">
                          <span className="text-[10px] text-slate-400">HTTP STATUS</span>
                          <span className="text-base font-bold text-emerald-400">200 OK (100%)</span>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/30 flex flex-col gap-1">
                          <span className="text-[10px] text-slate-400">CONNECTION POOL</span>
                          <span className="text-base font-bold text-cyan-300">Active Pool (64/64)</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-white/10">
                        <span className="text-xs text-slate-400">Simulate asynchronous REST API traffic</span>

                        <button
                          onClick={runApiStressSim}
                          disabled={isSimulating}
                          className="px-4 py-2.5 rounded-xl bg-emerald-400 text-slate-950 font-bold text-xs hover:bg-emerald-300 transition-all cursor-pointer shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          <Play className="w-4 h-4" />
                          <span>Fire 1,000 Async API Requests</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* 🤖 SIMULATOR 3: AI AGENT REASONING TRACE */}
                  {simType === "ai" && (
                    <div className="p-5 rounded-2xl bg-slate-950/80 border border-purple-500/40 shadow-xl flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm font-bold text-purple-300">
                          <Cpu className="w-4 h-4 text-purple-400" />
                          <span>Autonomous AI Agent Multi-Step Trace</span>
                        </div>
                        <span className="text-xs text-slate-400">LLM Tool Calling</span>
                      </div>

                      <div className="flex flex-col gap-2 text-xs font-mono">
                        <div className={`p-2.5 rounded-xl border transition-all flex items-center justify-between ${agentStep >= 1 ? "bg-purple-950/80 border-purple-400 text-purple-200" : "bg-slate-900 border-white/10 text-slate-500"}`}>
                          <span>Step 1: User Request &amp; Intent Parsing</span>
                          {agentStep >= 1 && <CheckCircle2 className="w-4 h-4 text-purple-400" />}
                        </div>

                        <div className={`p-2.5 rounded-xl border transition-all flex items-center justify-between ${agentStep >= 2 ? "bg-purple-950/80 border-purple-400 text-purple-200" : "bg-slate-900 border-white/10 text-slate-500"}`}>
                          <span>Step 2: Vector Search Retrieval (Pinecone / pgvector)</span>
                          {agentStep >= 2 && <CheckCircle2 className="w-4 h-4 text-purple-400" />}
                        </div>

                        <div className={`p-2.5 rounded-xl border transition-all flex items-center justify-between ${agentStep >= 3 ? "bg-purple-950/80 border-purple-400 text-purple-200" : "bg-slate-900 border-white/10 text-slate-500"}`}>
                          <span>Step 3: Execute Custom Python API Tool</span>
                          {agentStep >= 3 && <CheckCircle2 className="w-4 h-4 text-purple-400" />}
                        </div>

                        <div className={`p-2.5 rounded-xl border transition-all flex items-center justify-between ${agentStep >= 4 ? "bg-emerald-950/80 border-emerald-400 text-emerald-200 font-bold" : "bg-slate-900 border-white/10 text-slate-500"}`}>
                          <span>Step 4: Output Verified Synthesized Result</span>
                          {agentStep >= 4 && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-white/10">
                        <span className="text-xs text-slate-400">Trace AI tool-calling loop execution</span>

                        <button
                          onClick={runAiAgentSim}
                          disabled={isSimulating}
                          className="px-4 py-2.5 rounded-xl bg-purple-400 text-slate-950 font-bold text-xs hover:bg-purple-300 transition-all cursor-pointer shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          <Play className="w-4 h-4" />
                          <span>Trigger AI Agent Tool-Call</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ── MODE 2: CELESTIAL MOON STARLIGHT CANVAS ── */}
              {activeMode === "moon" && (
                <div className="my-auto py-5 max-w-2xl mx-auto w-full flex flex-col items-center gap-5">
                  {/* Interactive 3D Moon Sphere */}
                  <motion.div
                    onClick={() => {
                      setMoonClicks((prev) => prev + 1);
                      setQuoteIndex((prev) => (prev + 1) % secretQuotes.length);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative w-40 h-40 sm:w-52 sm:h-52 rounded-full cursor-pointer transition-all duration-700 flex items-center justify-center select-none shadow-[0_0_80px_rgba(251,191,36,0.35)] ${
                      moonPhase === "supermoon"
                        ? "bg-gradient-to-tr from-amber-100 via-slate-100 to-amber-300 border-4 border-amber-300 ring-8 ring-amber-400/20"
                        : moonPhase === "crescent"
                        ? "bg-gradient-to-tr from-slate-950 via-slate-900 to-amber-200 border-2 border-amber-400/60"
                        : moonPhase === "eclipse"
                        ? "bg-gradient-to-tr from-rose-950 via-red-900 to-amber-600 border-4 border-rose-500 shadow-[0_0_90px_rgba(244,63,94,0.5)]"
                        : "bg-slate-950 border-2 border-slate-700 shadow-inner"
                    }`}
                  >
                    <div className="flex flex-col items-center justify-center text-center p-4">
                      <Moon className="w-6 h-6 text-slate-950 mb-1" />
                      <span className="font-display font-extrabold text-slate-950 text-xs tracking-wider uppercase">
                        {moonPhase}
                      </span>
                      <span className="font-mono text-[10px] text-slate-800 font-bold">
                        Click Moon ({moonClicks})
                      </span>
                    </div>
                  </motion.div>

                  {/* Moon Phase Buttons */}
                  <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs">
                    {(["supermoon", "crescent", "eclipse", "new"] as const).map((phase) => (
                      <button
                        key={phase}
                        onClick={() => setMoonPhase(phase)}
                        className={`px-3 py-1 rounded-xl border transition-all cursor-pointer capitalize ${
                          moonPhase === phase
                            ? "bg-amber-400 text-slate-950 font-bold border-amber-300 shadow-md"
                            : "bg-slate-950 text-slate-300 border-white/10 hover:border-amber-400"
                        }`}
                      >
                        {phase}
                      </button>
                    ))}
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-amber-500/30 text-center max-w-md">
                    <p className="font-serif-italic text-xs sm:text-sm text-amber-200">
                      {secretQuotes[quoteIndex]}
                    </p>
                  </div>
                </div>
              )}

              {/* Bottom Footer & Navigation Teleport */}
              <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Teleport:</span>
                  <button
                    onClick={(e) => {
                      handleClose(e);
                      if (onNavigate) onNavigate("projects");
                    }}
                    className="px-3 py-1 rounded-lg bg-slate-950 border border-white/10 text-cyan-300 hover:border-cyan-400 font-bold cursor-pointer"
                  >
                    Projects 🚀
                  </button>
                  <button
                    onClick={(e) => {
                      handleClose(e);
                      if (onNavigate) onNavigate("experience");
                    }}
                    className="px-3 py-1 rounded-lg bg-slate-950 border border-white/10 text-emerald-300 hover:border-emerald-400 font-bold cursor-pointer"
                  >
                    Experience 💼
                  </button>
                </div>

                <button
                  onClick={handleClose}
                  onTouchEnd={handleClose}
                  className="w-full sm:w-auto px-5 py-2 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs hover:bg-cyan-300 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-lg"
                >
                  <span>Close Overlay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
