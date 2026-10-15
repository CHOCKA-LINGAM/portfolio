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
    <section id="section-about" className="relative w-full md:min-h-[85dvh] rounded-3xl overflow-hidden border border-cyan-500/20 bg-slate-950 text-white shadow-2xl p-5 sm:p-8 lg:p-10 flex flex-col justify-center scroll-mt-24">
      {/* Background Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-[radial-gradient(closest-side,rgba(34,211,238,0.12),transparent)]" />
        <div className="absolute bottom-0 left-10 w-[250px] sm:w-[450px] h-[250px] sm:h-[450px] rounded-full bg-[radial-gradient(closest-side,rgba(168,85,247,0.12),transparent)]" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-12">
        <div className="flex flex-col gap-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/60 text-cyan-300 text-xs font-mono font-bold tracking-widest w-max">
            <User className="w-3.5 h-3.5 text-cyan-400" />
            <span>02 // ABOUT</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-white tracking-tight leading-tight">
            Complex problems, simple systems.
          </h2>
          <p className="text-sm sm:text-base font-sans text-slate-300 leading-relaxed font-light">
            I work at the intersection of data pipelines, backend architecture and AI, turning messy, real-world workflows into reliable, scalable services.
          </p>
          <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs font-bold">
            {coreValues.map((val) => (
              <span key={val} className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-cyan-200 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                {val}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={onOpenStory}
          className="touch-manipulation w-full lg:w-auto shrink-0 px-6 py-3.5 rounded-2xl font-mono font-bold text-xs text-slate-950 bg-white hover:bg-cyan-300 transition-all shadow-[0_0_30px_rgba(255,255,255,0.25)] flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>My story</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
