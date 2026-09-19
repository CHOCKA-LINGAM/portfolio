"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { User, Sparkles, MapPin, Award, CheckCircle2, ArrowRight, MessageSquare, Compass, Shield, Terminal, Cpu } from "lucide-react";

const TABS = [
  { id: "about", label: "01 / About" },
  { id: "journey", label: "02 / My Journey" },
  { id: "what-i-do", label: "03 / What I Do" },
  { id: "beyond", label: "04 / Beyond Work" },
];

const TAB_CONTENT = {
  about: {
    heading: "A Curious Builder",
    subheading: "I'm Chockalingam Balan, a Senior Software Engineer who enjoys building scalable backend platforms, data pipelines, and AI systems.",
    body: "I like turning complex real-world problems into simple, executable systems. This portfolio is a peek into how I think, build, and explore.",
    pills: ["Scalable Systems", "Distributed Architecture", "AI / LLM", "Data Engineering", "Clean Code", "Real-world Impact"],
  },
  journey: {
    heading: "5+ Years of Engineering Growth",
    subheading: "From building ML platforms to architecting enterprise DAG engines & cloud microservices.",
    body: "My engineering journey spans iLink Digital, Standard Chartered, and high-impact enterprise projects, focusing on high-concurrency systems and PySpark data lakes.",
    pills: ["Standard Chartered", "iLink Digital", "Databricks PyPI Package", "FastAPI REST APIs", "AWS Bedrock"],
  },
  "what-i-do": {
    heading: "Backend, Data & AI Systems",
    subheading: "Building high-throughput microservices and automated AI workflows.",
    body: "I specialize in Python, PySpark ETL optimizations, async FastAPI microservices, and AWS Bedrock foundation model orchestration with fallback guardrails.",
    pills: ["Python 3.11", "PySpark", "Databricks", "FastAPI", "OpenAI API", "AWS Bedrock", "Docker"],
  },
  beyond: {
    heading: "The Human Side",
    subheading: "When I'm not building systems, you'll find me exploring new technologies and reading.",
    body: "I believe that good engineers build better tomorrows. I enjoy tech blogs, travel, music, and continuous learning.",
    pills: ["Tech Blogs", "Continuous Learning", "Travel & Explore", "Music"],
  },
};

export function AboutInteractive() {
  const [activeTab, setActiveTab] = useState<keyof typeof TAB_CONTENT>("about");
  const activeData = TAB_CONTENT[activeTab];

  return (
    <section id="section-about" className="relative w-full min-h-[85vh] rounded-3xl overflow-hidden border border-cyan-500/20 bg-slate-950 shadow-2xl my-8 flex flex-col justify-between scroll-mt-24">
      {/* ── CODE-RENDERED AMBIENT BACKDROP (NO RASTER IMAGES) ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px]" />

        {/* Ambient SVG Circuit Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 800 600">
          <path d="M 50,100 L 200,100 L 300,250 L 500,250 L 600,100 L 750,100" fill="none" stroke="#22d3ee" strokeWidth="2" strokeDasharray="6 6" />
          <path d="M 100,500 L 250,500 L 350,350 L 550,350 L 650,500 L 800,500" fill="none" stroke="#34d399" strokeWidth="2" strokeDasharray="8 8" />
        </svg>

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950" />
      </div>

      {/* ── CONTENT CONTAINER ── */}
      <div className="relative z-10 w-full p-6 sm:p-10 lg:p-12 flex flex-col gap-8">
        
        {/* Top Header */}
        <div className="flex flex-col gap-2 border-b border-white/10 pb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/60 text-cyan-400 text-xs font-mono font-bold tracking-widest w-max backdrop-blur-md">
            <span>02 // ABOUT ME (INTERACTIVE STORY ROOM)</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-white tracking-tight">
            A story, not a summary.
          </h2>
        </div>

        {/* Main Grid: Left Avatar & Interactive Tabs, Right Narrative HUD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Speech Bubble & Nav Tabs & Key Stats */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Conversation Avatar & Speech Bubble using Chocka's Own Avatar */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.3)] shrink-0">
                  <Image
                    src="/avatars/clean-professional.png"
                    alt="Chockalingam Balan"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold shadow-md flex items-center gap-2">
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>&quot;Nice to meet you! Let me tell you my story...&quot;</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Based in Chennai, India 🇮🇳
                  </span>
                </div>
              </div>

              {/* Navigation Sidebar Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 pt-2 border-t border-white/10">
                {TABS.map((t) => {
                  const isActive = activeTab === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setActiveTab(t.id as keyof typeof TAB_CONTENT)}
                      className={`px-4 py-3 rounded-xl font-mono text-xs font-bold text-left transition-all border cursor-pointer flex items-center justify-between ${
                        isActive
                          ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 border-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.4)] scale-[1.02]"
                          : "bg-slate-950/60 text-slate-400 border-white/10 hover:text-white hover:border-white/20"
                      }`}
                    >
                      <span>{t.label}</span>
                      {isActive && <ArrowRight className="w-4 h-4 text-slate-950" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Floating Metric Glass Cards matching mockup 2 */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-white/10 backdrop-blur-md flex flex-col">
                <span className="text-2xl font-display font-extrabold text-emerald-400">5+ Yrs</span>
                <span className="text-[11px] font-mono text-slate-400 uppercase">Years Experience</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/90 border border-white/10 backdrop-blur-md flex flex-col">
                <span className="text-2xl font-display font-extrabold text-cyan-400">10+</span>
                <span className="text-[11px] font-mono text-slate-400 uppercase">Projects Delivered</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/90 border border-white/10 backdrop-blur-md flex flex-col">
                <span className="text-2xl font-display font-extrabold text-teal-400">3</span>
                <span className="text-[11px] font-mono text-slate-400 uppercase">Domains (Backend, Data, AI)</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/90 border border-white/10 backdrop-blur-md flex flex-col">
                <span className="text-2xl font-display font-extrabold text-amber-400">∞</span>
                <span className="text-[10px] font-mono text-slate-400 uppercase">Curiosity</span>
              </div>
            </div>

          </div>

          {/* Right Column: Tab Content Narrative Window */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-slate-950/90 border border-cyan-500/30 backdrop-blur-2xl shadow-2xl flex flex-col gap-6 min-h-[420px] justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-5"
              >
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <Terminal className="w-4 h-4" />
                  <span>CHAPTER // {activeTab.toUpperCase()}</span>
                </div>

                <h3 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
                  {activeData.heading}
                </h3>

                <p className="text-base sm:text-lg font-sans text-cyan-300 font-medium leading-relaxed">
                  {activeData.subheading}
                </p>

                <div className="p-5 rounded-xl bg-slate-900/80 border border-white/10 text-sm font-sans text-slate-200 leading-relaxed shadow-inner">
                  {activeData.body}
                </div>

                <div className="flex flex-col gap-3 pt-2">
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
                    // KEY SKILLS & CAPABILITIES
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {activeData.pills.map((pill) => (
                      <span
                        key={pill}
                        className="px-4 py-2 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-200 text-xs font-mono font-bold flex items-center gap-2 shadow-md hover:border-emerald-400 transition-colors"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        {pill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Quote Footer note */}
            <div className="pt-4 border-t border-white/10 text-xs font-serif-italic text-amber-300/90 flex items-center justify-between">
              <span>&quot;Same developer, different ideas.&quot;</span>
              <span className="font-mono text-[11px] text-slate-500">CHOCKA.dev</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

