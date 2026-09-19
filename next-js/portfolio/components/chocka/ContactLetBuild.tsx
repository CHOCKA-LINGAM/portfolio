"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Send, Mail, Linkedin, MapPin, CheckCircle2, RotateCcw, ShieldCheck, Sparkles, MessageSquare } from "lucide-react";
import { PERSONAL } from "@/data/index";

export function ContactLetBuild() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setStatus("sending");
    setTimeout(() => {
      const subj = encodeURIComponent(`[Portfolio Inquiry] From ${name}`);
      const body = encodeURIComponent(`From: ${name} <${email}>\n\nMessage:\n${message}`);
      window.open(`mailto:${PERSONAL.email}?subject=${subj}&body=${body}`);
      setStatus("success");
    }, 600);
  };

  return (
    <section id="section-contact" className="relative w-full min-h-[85vh] rounded-3xl overflow-hidden border border-emerald-500/20 shadow-2xl my-8">
      {/* ── CODE-RENDERED AMBIENT STUDIO BACKDROP (NO RASTER IMAGES) ── */}
      <div className="absolute inset-0 z-0 bg-slate-950 pointer-events-none overflow-hidden">
        {/* Deep Studio Ambient Radial Lighting */}
        <div className="absolute top-1/4 left-10 w-[550px] h-[550px] bg-emerald-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[160px]" />
        <div className="absolute top-10 right-10 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px]" />

        {/* Ambient Grid Pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="contactGrid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(52, 211, 153, 0.4)" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contactGrid)" />
        </svg>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60" />
      </div>

      {/* ── CONTENT CONTAINER ── */}
      <div className="relative z-10 w-full p-6 sm:p-10 lg:p-12 flex flex-col justify-between min-h-[85vh]">
        
        {/* Top Header */}
        <div className="flex flex-col gap-2 border-b border-white/10 pb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/60 text-emerald-400 text-xs font-mono font-bold tracking-widest w-max backdrop-blur-md">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span>08 // CONTACT (LET'S BUILD)</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-white tracking-tight">
            Let&apos;s Build Something Meaningful.
          </h2>
          <p className="text-sm font-serif-italic text-cyan-300">
            Ideas • Conversations • Opportunities — Let&apos;s Talk!
          </p>
        </div>

        {/* Main Grid: Left Direct Info & User Avatar, Right Translucent Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-6">
          
          {/* Left Column: Chocka's Own Photo Card & Contact Info */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* User's Actual Photo Card with Aligned Aspect Ratio & Glow Frame */}
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-emerald-500/30 shadow-2xl bg-slate-900/80 group">
              <Image
                src="/avatars/developer-themed.png"
                alt="Chockalingam Balan"
                fill
                priority
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10 backdrop-blur-md p-3 rounded-xl bg-slate-950/80 border border-white/10">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white font-mono">Chockalingam Balan</span>
                  <span className="text-xs text-emerald-400 font-mono font-semibold">Technical Specialist @ iLink Digital</span>
                </div>
                <span className="px-3 py-1 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-[10px] font-mono text-emerald-300 font-bold tracking-wider shrink-0 shadow-sm">
                  AVAILABLE
                </span>
              </div>
            </div>

            <p className="text-sm font-sans text-slate-300 leading-relaxed font-light">
              I&apos;m always open to interesting opportunities, collaborations, high-scale engineering challenges, or just a good tech conversation over coffee.
            </p>

            <div className="flex flex-col gap-3 font-mono text-xs">
              <a
                href={`mailto:${PERSONAL.email}`}
                className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-md flex items-center gap-3.5 hover:border-emerald-400 transition-all text-white font-bold shadow-lg"
              >
                <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-mono">EMAIL DIRECT</span>
                  <span className="truncate">{PERSONAL.email}</span>
                </div>
              </a>

              <a
                href={PERSONAL.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-md flex items-center gap-3.5 hover:border-cyan-400 transition-all text-white font-bold shadow-lg"
              >
                <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-mono">LINKEDIN PROFILE</span>
                  <span className="truncate">linkedin.com/in/chockalingam-balan</span>
                </div>
              </a>

              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-md flex items-center gap-3.5 text-slate-300 shadow-lg">
                <div className="p-2.5 rounded-xl bg-teal-500/20 border border-teal-500/40 text-teal-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-mono">LOCATION</span>
                  <span className="text-xs font-bold text-white">Chennai, India (Available Global Remote)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Translucent Glass Contact Form matching Mockup 08 */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-slate-950/85 border border-emerald-500/30 backdrop-blur-2xl shadow-2xl flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-xs">
              <span className="text-emerald-400 font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                // TRANSMIT DIRECT MESSAGE
              </span>
              <span className="text-cyan-400 font-bold px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30">
                STATUS: OPEN FOR ROLES
              </span>
            </div>

            {status === "success" ? (
              <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center flex flex-col items-center gap-3 my-auto">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 animate-bounce" />
                <h3 className="text-2xl font-display font-extrabold text-white">
                  Message Sent Successfully!
                </h3>
                <p className="text-sm text-slate-300 max-w-md font-sans leading-relaxed">
                  Thank you for reaching out. I&apos;ll respond directly to your email as soon as possible.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 text-xs font-mono text-emerald-400 underline font-bold cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 font-mono text-xs">
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-slate-300">YOUR NAME *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/15 text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-400 transition-all font-mono shadow-inner"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-slate-300">YOUR EMAIL *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. sarah@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/15 text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-400 transition-all font-mono shadow-inner"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-slate-300">YOUR MESSAGE *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Hi Chocka, I came across your portfolio..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/15 text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-400 transition-all font-sans resize-none leading-relaxed shadow-inner"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-2 px-8 py-4 rounded-2xl font-mono font-bold text-sm text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 flex items-center justify-center gap-3 transition-all shadow-[0_0_30px_rgba(52,211,153,0.4)] disabled:opacity-50 cursor-pointer"
                >
                  {status === "sending" ? (
                    <>
                      <RotateCcw className="w-4 h-4 animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message →
                    </>
                  )}
                </button>
              </form>
            )}

            <div className="text-center font-serif-italic text-xs text-amber-300/90 pt-3 border-t border-white/10">
              &quot;Good conversations lead to great things.&quot;
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}


