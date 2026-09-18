"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Terminal, ArrowRight, Play, Sparkles, Code2, Monitor, Cpu, Activity, Server, ShieldCheck, Zap } from "lucide-react";

export function LandingWorkstation({
  onExplore,
  onOpenStory,
}: {
  onExplore: () => void;
  onOpenStory: () => void;
}) {
  const [termTab, setTermTab] = useState<"whoami" | "story" | "code">("whoami");

  return (
    <section className="relative w-full min-h-[90vh] rounded-3xl overflow-hidden border border-emerald-500/20 bg-slate-950 shadow-2xl my-4 flex flex-col justify-between">
      {/* ── CODE-RENDERED AMBIENT LIGHTING & TECH GRID BACKDROP (NO RASTER IMAGES) ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Radial Ambient Studio Glows */}
        <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px]" />
        <div className="absolute -bottom-32 left-1/3 w-[450px] h-[450px] bg-purple-500/10 rounded-full blur-[130px]" />

        {/* Vector Isometric Grid Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="workstationGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#workstationGrid)" />
        </svg>

        {/* Vignette Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(2,6,23,0.85)_100%)]" />
      </div>

      {/* ── MAIN CONTENT CONTAINER ── */}
      <div className="relative z-10 w-full min-h-[90vh] p-6 sm:p-10 lg:p-14 flex flex-col justify-between">
        
        {/* Top Header Tag */}
        <div className="flex items-center justify-between w-full">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-emerald-500/40 bg-emerald-950/60 backdrop-blur-md text-emerald-400 text-xs font-mono font-bold tracking-widest shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span>CHOCKA.dev // WORKSTATION OS</span>
          </div>

          <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-full border border-cyan-500/30 bg-slate-900/70 backdrop-blur-md text-cyan-300 text-xs font-mono">
            <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: "12s" }} />
            <span>Systems • Data • AI • Impact</span>
          </div>
        </div>

        {/* Middle Main Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-8">
          
          {/* Left Column: Slogan & Headline */}
          <div className="lg:col-span-6 flex flex-col gap-6 max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-3"
            >
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-extrabold text-white tracking-tight leading-[0.95] drop-shadow-2xl">
                Build<br />
                Learn<br />
                Solve<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 font-serif-italic font-normal">Repeat.</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans font-light drop-shadow"
            >
              Engineering scalable systems with Data, AI and meaningful impact. Senior Software Engineer specializing in backend microservices, PySpark ETL engines, and production GenAI pipelines.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-4 flex-wrap pt-2"
            >
              <button
                onClick={onExplore}
                className="px-8 py-4 rounded-2xl font-mono font-bold text-sm text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 flex items-center gap-3 shadow-[0_0_30px_rgba(52,211,153,0.4)] hover:shadow-[0_0_40px_rgba(52,211,153,0.6)] hover:scale-[1.02] transition-all cursor-pointer"
              >
                Explore My Work <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenStory}
                className="px-6 py-4 rounded-2xl font-mono font-bold text-sm text-white border border-white/20 bg-slate-900/80 hover:bg-slate-800 backdrop-blur-md transition-all flex items-center gap-2.5 cursor-pointer shadow-lg hover:border-emerald-400/50"
              >
                <Play className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                Watch Story Reel
              </button>
            </motion.div>

            <div className="flex items-center gap-3 pt-2 text-xs font-mono text-emerald-400/80">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Scroll or use keyboard ↓ to navigate interactive story</span>
            </div>
          </div>

          {/* Right Column: Code-Rendered Dual Monitor Workstation Setup */}
          <div className="lg:col-span-6 relative flex flex-col items-center lg:items-end">
            
            {/* Primary Monitor Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="w-full max-w-lg rounded-2xl border-2 border-emerald-500/30 bg-slate-950 shadow-[0_0_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl overflow-hidden relative group"
            >
              {/* Monitor Bezel & Camera Dot */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/90" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/90" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/90" />
                  <span className="ml-2 text-xs font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                    <Monitor className="w-3.5 h-3.5 text-emerald-400" />
                    CHOCKA_WORKSTATION_PRIMARY
                  </span>
                </div>
                
                {/* Terminal Tab Switchers */}
                <div className="flex gap-1.5 font-mono text-xs">
                  <button
                    onClick={() => setTermTab("whoami")}
                    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                      termTab === "whoami"
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    whoami
                  </button>
                  <button
                    onClick={() => setTermTab("story")}
                    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                      termTab === "story"
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    story.txt
                  </button>
                  <button
                    onClick={() => setTermTab("code")}
                    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                      termTab === "code"
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    main.py
                  </button>
                </div>
              </div>

              {/* Developer Avatar & Status Banner (Using Chocka's Own Avatar Asset) */}
              <div className="p-4 bg-slate-900/60 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full border-2 border-emerald-400 overflow-hidden shrink-0 shadow-lg">
                    <Image
                      src="/avatars/in-workspace.png"
                      alt="Chockalingam Balan"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white font-mono">Chockalingam Balan</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    </div>
                    <span className="text-xs text-emerald-400 font-mono">Senior Software Engineer & AI Architect</span>
                  </div>
                </div>

                <div className="hidden sm:flex flex-col items-end text-right font-mono">
                  <span className="text-[10px] text-cyan-300 font-bold">CLUSTER: ACTIVE</span>
                  <span className="text-[10px] text-slate-400">LATENCY: 12ms</span>
                </div>
              </div>

              {/* Live Terminal Screen Code Execution */}
              <div className="p-6 font-mono text-xs sm:text-sm leading-relaxed text-slate-200 min-h-[170px] flex flex-col justify-between bg-slate-950">
                {termTab === "whoami" && (
                  <div className="flex flex-col gap-2">
                    <div className="text-emerald-400 font-bold flex items-center gap-2">
                      <span className="text-cyan-400">$</span> chocka@portfolio:~$ whoami
                    </div>
                    <div className="text-xl font-bold text-white tracking-wide pt-1">
                      Chockalingam Balan
                    </div>
                    <div className="text-emerald-300 text-xs">
                      Senior Software Engineer • Data, Backend & AI Architect
                    </div>
                    <p className="text-xs text-slate-400 pt-2 border-t border-white/10 mt-2">
                      Specialized in PySpark distributed ingestion engines, FastAPI microservices, and AWS Bedrock foundation workflows.
                    </p>
                  </div>
                )}

                {termTab === "story" && (
                  <div className="flex flex-col gap-2">
                    <div className="text-emerald-400 font-bold flex items-center gap-2">
                      <span className="text-cyan-400">$</span> chocka@portfolio:~$ cat story.txt
                    </div>
                    <div className="text-amber-300 text-xs font-serif-italic text-sm pt-1 leading-relaxed">
                      &quot;Building scalable systems that turn complex real-world problems into elegant, executable solutions.&quot;
                    </div>
                    <p className="text-xs text-slate-300 pt-2 border-t border-white/10 mt-2">
                      5+ years shipping fault-tolerant architectures with measurable business impact.
                    </p>
                  </div>
                )}

                {termTab === "code" && (
                  <div className="flex flex-col gap-1 text-xs">
                    <div className="text-cyan-400 font-bold flex items-center justify-between pb-1 border-b border-white/10">
                      <span># Python 3.11 PySpark DAG Engine</span>
                      <span className="text-emerald-400">EXECUTING</span>
                    </div>
                    <div className="text-emerald-300 pt-1">
                      <span className="text-purple-400">from</span> pyspark.sql <span className="text-purple-400">import</span> SparkSession
                    </div>
                    <div className="text-slate-300">
                      spark = SparkSession.builder.appName(<span className="text-amber-300">&quot;ChockaDAG&quot;</span>).getOrCreate()
                    </div>
                    <div className="text-slate-400">
                      df = spark.read.json(<span className="text-amber-300">&quot;s3://telemetry/stream.json&quot;</span>)
                    </div>
                    <div className="text-emerald-400 font-bold pt-1">
                      # Result: 10M records processed in 42ms
                    </div>
                  </div>
                )}

                {/* Prompt Line */}
                <div className="flex items-center gap-2 pt-3 border-t border-emerald-500/20 text-xs text-emerald-400">
                  <span className="animate-pulse">▶</span>
                  <span className="text-slate-400">CHOCKA_OS_READY</span>
                  <span className="w-2 h-4 bg-emerald-400 animate-pulse ml-auto" />
                </div>
              </div>
            </motion.div>

            {/* Handwritten Dev Motto Sticky Note */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-4 p-4 rounded-xl border border-amber-500/30 bg-amber-950/50 backdrop-blur-md shadow-2xl max-w-sm self-end"
            >
              <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>DEV MOTTO</span>
              </div>
              <p className="text-xs text-amber-200/90 font-serif-italic leading-relaxed">
                &quot;A BETTER TOMORROW IS A WELL-BUILT SYSTEM. Good Code = Better Tomorrows.&quot;
              </p>
            </motion.div>

          </div>
        </div>

        {/* Bottom Bar Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10">
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/10 backdrop-blur-md flex flex-col">
            <span className="text-xs font-mono font-bold text-emerald-400">5+ YEARS</span>
            <span className="text-[11px] font-mono text-slate-400 uppercase">Senior Engineering</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/10 backdrop-blur-md flex flex-col">
            <span className="text-xs font-mono font-bold text-cyan-400">10+ SYSTEMS</span>
            <span className="text-[11px] font-mono text-slate-400 uppercase">Production Shipped</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/10 backdrop-blur-md flex flex-col">
            <span className="text-xs font-mono font-bold text-teal-400">40% SPEEDUP</span>
            <span className="text-[11px] font-mono text-slate-400 uppercase">ETL Optimization</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/10 backdrop-blur-md flex flex-col">
            <span className="text-xs font-mono font-bold text-amber-400">99.99% UPTIME</span>
            <span className="text-[11px] font-mono text-slate-400 uppercase">Resilient Architecture</span>
          </div>
        </div>

      </div>
    </section>
  );
}



