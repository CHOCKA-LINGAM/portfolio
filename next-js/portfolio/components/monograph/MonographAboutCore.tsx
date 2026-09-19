"use client";

import React from "react";
import { User, ArrowRight } from "lucide-react";

export function MonographAboutCore({
  onOpenStory,
}: {
  onOpenStory: () => void;
}) {
  const coreValues = ["Curiosity", "Discipline", "Execution", "Impact"];

  return (
    <section id="section-about" className="relative w-full min-h-[85vh] rounded-3xl overflow-hidden border border-cyan-500/20 bg-slate-950 text-white shadow-2xl p-5 sm:p-10 lg:p-16 my-4 sm:my-8 flex flex-col justify-between scroll-mt-24">
      {/* Background Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-10 right-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-cyan-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-10 w-[250px] sm:w-[450px] h-[250px] sm:h-[450px] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Top Header Tag */}
      <div className="flex flex-wrap items-center justify-between w-full relative z-10 border-b border-white/10 pb-4 sm:pb-6 gap-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/60 text-cyan-300 text-xs font-mono font-bold tracking-widest backdrop-blur-md">
          <User className="w-3.5 h-3.5 text-cyan-400" />
          <span>02 // ABOUT</span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-6 sm:py-10 relative z-10">
        
        {/* Left Column: Title & Clean Narrative */}
        <div className="lg:col-span-6 flex flex-col gap-4 sm:gap-6 max-w-xl">
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-extrabold text-white tracking-tight leading-tight max-w-full break-words">
            About Me
          </h2>

          <p className="text-sm sm:text-base lg:text-lg font-sans text-slate-300 leading-relaxed font-light">
            Turning complex, real-world problems into simple, scalable systems. Operating at the intersection of data pipelines, backend architecture, and AI models.
          </p>

          <div className="pt-2">
            <button
              onClick={onOpenStory}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl font-mono font-bold text-xs text-slate-950 bg-white hover:bg-cyan-300 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>My story</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: 3D Core Orb & Values */}
        <div className="lg:col-span-6 flex flex-col sm:flex-row items-center justify-center gap-6 relative w-full py-4 sm:py-0">
          
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full border border-cyan-500/30 bg-gradient-to-tr from-slate-950 via-slate-900 to-cyan-950 p-2 shadow-[0_0_60px_rgba(34,211,238,0.25)] flex items-center justify-center shrink-0">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent rounded-full" />
            <div className="w-32 h-32 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-full border border-cyan-400/40 shadow-[inset_0_0_30px_rgba(34,211,238,0.3)] animate-pulse" />

            <div className="absolute z-20 flex flex-col items-center justify-center text-center p-3 font-mono">
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 mb-1" />
              <span className="text-xs font-display font-extrabold text-white tracking-widest">CHOCKA</span>
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-col gap-2 sm:gap-2.5 z-30 font-mono text-xs font-bold justify-center">
            {coreValues.map((val) => (
              <div
                key={val}
                className="px-3.5 sm:px-4 py-1.5 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-cyan-200 backdrop-blur-md shadow-lg flex items-center gap-2 hover:border-cyan-400 transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>{val}</span>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Footer Tag */}
      <div className="flex items-center justify-end pt-4 border-t border-white/10 text-xs font-mono text-slate-400 relative z-10">
        <span className="text-[11px] sm:text-xs text-slate-500">02 / 06</span>
      </div>
    </section>
  );
}
