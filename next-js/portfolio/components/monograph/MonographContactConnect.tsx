"use client";

import React, { useState } from "react";
import { Mail, Linkedin, Github, MapPin, Send, MessageSquare, ArrowRight, Copy, Check } from "lucide-react";
import { PERSONAL } from "@/data/index";

export function MonographContactConnect() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable; the mailto link still works
    }
  };

  return (
    <section
      id="section-contact"
      className="relative w-full rounded-3xl overflow-hidden border border-cyan-500/20 bg-slate-950 text-white shadow-2xl p-5 sm:p-10 lg:p-16 flex flex-col justify-between scroll-mt-24"
    >
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[radial-gradient(closest-side,rgba(34,211,238,0.12),transparent)]" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] rounded-full bg-[radial-gradient(closest-side,rgba(168,85,247,0.12),transparent)]" />
      </div>

      {/* Top Header Tag */}
      <div className="flex flex-col gap-2 border-b border-white/10 pb-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/60 text-cyan-300 text-xs font-mono font-bold tracking-widest w-max backdrop-blur-md shadow-sm">
          <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
          <span>06 // CONTACT</span>
        </div>
        <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-display font-extrabold text-white tracking-tight leading-tight max-w-full break-words">
          Contact Me
        </h2>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch my-auto py-6 sm:py-10 relative z-10">
        
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
                <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-wider">DIRECT EMAIL</span>
                <span className="text-xs sm:text-sm font-bold text-white truncate break-all">{PERSONAL.email}</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
          </a>

          <a
            href={PERSONAL.github}
            target="_blank"
            rel="noreferrer"
            className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-cyan-400/60 transition-all flex items-center justify-between group backdrop-blur-md shadow-lg"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-300 shrink-0">
                <Github className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-wider">GITHUB REPOSITORIES</span>
                <span className="text-xs sm:text-sm font-bold text-white truncate">github.com/CHOCKA-LINGAM</span>
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
                <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-wider">LINKEDIN PROFILE</span>
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
              <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-wider">LOCATION &amp; RELOCATION</span>
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

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 self-start w-full sm:w-auto">
          <a
            href={`mailto:${PERSONAL.email}?subject=${encodeURIComponent("[Portfolio Inquiry] Hello Chocka")}`}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl font-mono font-bold text-xs text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 text-slate-950" /> Send Direct Message →
          </a>
            <button
              onClick={copyEmail}
              className="touch-manipulation w-full sm:w-auto px-5 py-3.5 rounded-2xl font-mono font-bold text-xs text-cyan-200 bg-slate-950 border border-cyan-500/40 hover:border-cyan-300 transition-all flex items-center justify-center gap-2 cursor-pointer"
              aria-live="polite"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
              {copied ? "Copied!" : "Copy email"}
            </button>
          </div>
        </div>

      </div>

    </section>
  );
}
