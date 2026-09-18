"use client";

import React from "react";
import { Mail, Linkedin, MapPin, Send, MessageSquare, ArrowRight } from "lucide-react";
import { PERSONAL } from "@/data/index";

export function MonographContactConnect() {
  return (
    <section id="section-contact" className="relative w-full min-h-[85vh] rounded-3xl overflow-hidden border border-slate-200 bg-[#f8fafc] text-slate-900 shadow-2xl p-6 sm:p-12 lg:p-16 my-8 flex flex-col justify-between scroll-mt-24">
      {/* Top Header Tag */}
      <div className="flex flex-col gap-2 border-b border-slate-200 pb-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-300 bg-white text-slate-700 text-xs font-mono font-bold tracking-widest w-max shadow-sm">
          <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
          <span>08 / CONTACT — LET&apos;S CONNECT</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-slate-950 tracking-tight">
          Let&apos;s build what&apos;s next.
        </h2>
        <p className="text-sm font-sans text-slate-600">
          Good conversations lead to great things.
        </p>
      </div>

      {/* Main Grid: Left Direct Links, Right Frosted Glass Prompt Box matching Panel 08 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-10 relative z-10">
        
        {/* Left Column: Direct Contact Links */}
        <div className="lg:col-span-6 flex flex-col gap-4 font-mono">
          
          <a
            href={`mailto:${PERSONAL.email}`}
            className="p-4 rounded-2xl bg-white border border-slate-200 shadow-md hover:border-slate-400 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-slate-100 text-slate-900">
                <Mail className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500">DIRECT EMAIL</span>
                <span className="text-xs sm:text-sm font-bold text-slate-900">{PERSONAL.email}</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-950 group-hover:translate-x-1 transition-all" />
          </a>

          <a
            href={PERSONAL.linkedin}
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-2xl bg-white border border-slate-200 shadow-md hover:border-slate-400 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-slate-100 text-slate-900">
                <Linkedin className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500">LINKEDIN PROFILE</span>
                <span className="text-xs sm:text-sm font-bold text-slate-900">linkedin.com/in/chockalingam-balan</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-950 group-hover:translate-x-1 transition-all" />
          </a>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-md flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-slate-100 text-slate-900">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500">LOCATION</span>
              <span className="text-xs sm:text-sm font-bold text-slate-900">Chennai, India</span>
            </div>
          </div>

        </div>

        {/* Right Column: Frosted Glass Prompt Box matching Panel 08 */}
        <div className="lg:col-span-6 p-8 rounded-3xl bg-gradient-to-br from-white via-slate-50 to-slate-100 border border-slate-200 shadow-2xl flex flex-col justify-between min-h-[280px] gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono font-bold text-emerald-600 uppercase tracking-widest">
              OPPORTUNITIES & COLLABORATIONS
            </span>
            <p className="text-base sm:text-lg font-sans text-slate-800 leading-relaxed font-normal">
              &quot;Open to opportunities, collaborations, or just a good conversation.&quot;
            </p>
          </div>

          <a
            href={`mailto:${PERSONAL.email}?subject=${encodeURIComponent("[Portfolio Inquiry] Hello Chocka")}`}
            className="px-6 py-3.5 rounded-2xl font-mono font-bold text-xs text-white bg-slate-950 hover:bg-slate-800 transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer self-start"
          >
            <Send className="w-3.5 h-3.5 text-emerald-400" /> Send a message →
          </a>
        </div>

      </div>

      {/* Footer Tag matching Panel 08 */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 text-xs font-mono text-slate-500">
        <span>LET&apos;S BUILD SOMETHING REMARKABLE</span>
        <span>08 / 09</span>
      </div>
    </section>
  );
}
