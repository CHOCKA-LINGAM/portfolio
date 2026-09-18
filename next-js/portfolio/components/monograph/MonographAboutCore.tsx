"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { User, Sparkles, ArrowRight, ShieldCheck, Cpu } from "lucide-react";

export function MonographAboutCore({
  onOpenStory,
}: {
  onOpenStory: () => void;
}) {
  const coreValues = ["Curiosity", "Discipline", "Execution", "Impact"];

  return (
    <section id="section-about" className="relative w-full min-h-[90vh] rounded-3xl overflow-hidden border border-cyan-500/20 bg-slate-950 text-white shadow-2xl p-6 sm:p-12 lg:p-16 my-8 flex flex-col justify-between scroll-mt-24">
      {/* Background Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-10 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-purple-500/10 rounded-full blur-[140px]" />
      </div>

      {/* Top Header Tag */}
      <div className="flex items-center justify-between w-full relative z-10 border-b border-white/10 pb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/60 text-cyan-300 text-xs font-mono font-bold tracking-widest backdrop-blur-md">
          <User className="w-3.5 h-3.5 text-cyan-400" />
          <span>01 // ABOUT — THE CORE</span>
        </div>

        <span className="text-xs font-mono text-slate-400">CHOCKA.dev // IDENTITY</span>
      </div>

      {/* Main Content Grid: Left Story Text, Right Crescent Orb */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-10 relative z-10">
        
        {/* Left Column: Narrative & Story CTA */}
        <div className="lg:col-span-6 flex flex-col gap-6 max-w-xl">
          <h2 className="text-5xl sm:text-7xl font-display font-extrabold text-white tracking-tight leading-[0.95]">
            A curious <br />
            builder.
          </h2>

          <p className="text-base sm:text-lg font-sans text-slate-300 leading-relaxed font-light">
            I&apos;m Chockalingam Balan, a Software Engineer who enjoys turning complex, real-world problems into simple, scalable systems.
          </p>

          <p className="text-sm font-sans text-slate-400 leading-relaxed">
            I work at the intersection of data, backend systems, and AI — building solutions that create measurable impact for enterprise products.
          </p>

          <div className="pt-2">
            <button
              onClick={onOpenStory}
              className="px-6 py-3.5 rounded-2xl font-mono font-bold text-xs text-slate-950 bg-white hover:bg-cyan-300 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center gap-2 cursor-pointer"
            >
              My story <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: 3D Glowing Crescent Core Orb with Values matching Panel 02 */}
        <div className="lg:col-span-6 relative w-full h-[340px] sm:h-[420px] flex items-center justify-center">
          
          {/* Glowing 3D Sphere / Crescent Orb Visual */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full border border-cyan-500/30 bg-gradient-to-tr from-slate-950 via-slate-900 to-cyan-950 p-2 shadow-[0_0_60px_rgba(34,211,238,0.25)] flex items-center justify-center overflow-hidden">
            
            {/* Crescent Shadow Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />

            {/* Glowing Inner Ring */}
            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full border border-cyan-400/40 shadow-[inset_0_0_30px_rgba(34,211,238,0.3)] animate-pulse" />

            {/* Center Avatar Badge */}
            <div className="absolute z-20 w-24 h-24 rounded-full overflow-hidden border-2 border-white/20 shadow-2xl">
              <Image
                src="/avatars/clean-professional.png"
                alt="Chockalingam Balan"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Orbiting Value Pills matching Panel 02 */}
          <div className="absolute right-4 sm:right-10 flex flex-col gap-2.5 z-30 font-mono text-xs font-bold">
            {coreValues.map((val, idx) => (
              <div
                key={val}
                className="px-4 py-1.5 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-cyan-200 backdrop-blur-md shadow-lg flex items-center gap-2 hover:border-cyan-400 transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>{val}</span>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Footer Quote */}
      <div className="flex items-center justify-between pt-6 border-t border-white/10 text-xs font-mono text-slate-400 relative z-10">
        <span className="font-serif-italic text-cyan-300 text-sm">
          &quot;Better systems, brighter tomorrows.&quot;
        </span>
        <span>01 / 09</span>
      </div>
    </section>
  );
}
