"use client";

import React from "react";
import { Mail, Linkedin, MapPin, Send, MessageSquare, ArrowRight } from "lucide-react";
import { PERSONAL } from "@/data/index";

export function MonographContactConnect() {
  return (
    <section
      id="section-contact"
      className="relative w-full min-h-[80vh] rounded-3xl overflow-hidden border border-cyan-500/20 bg-slate-950 text-white shadow-2xl p-5 sm:p-10 lg:p-16 my-8 flex flex-col justify-between scroll-mt-24"
    >
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-purple-500/10 rounded-full blur-[140px]" />
      </div>

      {/* Top Header Tag */}
      <div className="flex flex-col gap-2 border-b border-white/10 pb-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/60 text-cyan-300 text-xs font-mono font-bold tracking-widest w-max backdrop-blur-md shadow-sm">
          <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
          <span>06 // CONTACT</span>
        </div>
        <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-extrabold text-white tracking-tight leading-tight max-w-full break-words">
          Contact Me
        </h2>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center my-auto py-6 sm:py-10 relative z-10">
        
        {/* Left Column */}
        <div className="lg:col-span-6 flex flex-col gap-3 sm:gap-4 font-mono w-full">
          
          <a
            href={`mailto:${PERSONAL.email}`}
            className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-cyan-400/60 transition-all flex items-center justify-between group backdrop-blur-md shadow-lg"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-300 shrink-0">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">DIRECT EMAIL</span>
                <span className="text-xs sm:text-sm font-bold text-white truncate break-all">{PERSONAL.email}</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
          </a>

          <a
            href={PERSONAL.linkedin}
            target="_blank"
            rel="noreferrer"
            className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-cyan-400/60 transition-all flex items-center justify-between group backdrop-blur-md shadow-lg"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-300 shrink-0">
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">LINKEDIN PROFILE</span>
                <span className="text-xs sm:text-sm font-bold text-white truncate">linkedin.com/in/chockalingam-balan</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
          </a>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-white/10 flex items-center gap-3.5 backdrop-blur-md shadow-lg">
            <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-300 shrink-0">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">LOCATION &amp; RELOCATION</span>
              <span className="text-xs sm:text-sm font-bold text-white">Chennai, India • Open for Global Remote / Relocation</span>
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-cyan-500/40 shadow-2xl flex flex-col justify-between min-h-[240px] gap-6 backdrop-blur-2xl">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              OPPORTUNITIES &amp; COLLABORATIONS
            </span>
            <p className="text-base sm:text-lg font-sans text-slate-200 leading-relaxed font-normal">
              &quot;Ready to discuss high-scale backend architecture, PySpark pipelines, or senior engineering roles.&quot;
            </p>
          </div>

          <a
            href={`mailto:${PERSONAL.email}?subject=${encodeURIComponent("[Portfolio Inquiry] Hello Chocka")}`}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl font-mono font-bold text-xs text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer self-start"
          >
            <Send className="w-3.5 h-3.5 text-slate-950" /> Send Direct Message →
          </a>
        </div>

      </div>

      {/* Footer Tag */}
      <div className="flex items-center justify-end pt-4 border-t border-white/10 text-xs font-mono text-slate-400 relative z-10">
        <span>06 / 06</span>
      </div>
    </section>
  );
}
