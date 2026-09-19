"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, X, ArrowRight, Moon, Sparkles } from "lucide-react";

export function EasterEggModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative w-full max-w-4xl min-h-[520px] rounded-3xl overflow-hidden border border-purple-500/30 shadow-2xl bg-slate-950 flex flex-col justify-between p-8 sm:p-12 text-white"
        >
          {/* ── CODE-RENDERED STARRY NIGHT NEBULA BACKDROP (NO RASTER IMAGES) ── */}
          <div className="absolute inset-0 z-0 bg-slate-950 pointer-events-none overflow-hidden">
            {/* Nebula Ambient Glows */}
            <div className="absolute top-10 right-10 w-[450px] h-[450px] bg-purple-600/15 rounded-full blur-[140px]" />
            <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[150px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[160px]" />

            {/* SVG Starry Night Sky Constellations */}
            <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
              <circle cx="15%" cy="20%" r="1.5" fill="#fde047" className="animate-ping" style={{ animationDuration: "3s" }} />
              <circle cx="35%" cy="15%" r="1" fill="#ffffff" />
              <circle cx="65%" cy="25%" r="2" fill="#a855f7" className="animate-pulse" />
              <circle cx="85%" cy="10%" r="1.5" fill="#22d3ee" />
              <circle cx="25%" cy="65%" r="1" fill="#ffffff" />
              <circle cx="75%" cy="70%" r="1.5" fill="#fde047" className="animate-ping" style={{ animationDuration: "4s" }} />
              <circle cx="50%" cy="80%" r="2" fill="#34d399" />
              <circle cx="90%" cy="85%" r="1" fill="#ffffff" />

              {/* Constellation Connection Lines */}
              <line x1="15%" y1="20%" x2="35%" y2="15%" stroke="rgba(253, 224, 71, 0.2)" strokeWidth="1" strokeDasharray="2 2" />
              <line x1="35%" y1="15%" x2="65%" y2="25%" stroke="rgba(168, 85, 247, 0.2)" strokeWidth="1" />
              <line x1="75%" y1="70%" x2="50%" y2="80%" stroke="rgba(52, 211, 153, 0.2)" strokeWidth="1" strokeDasharray="3 3" />
            </svg>

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/80" />
          </div>

          {/* Top Bar */}
          <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2 text-xs font-mono text-purple-300 font-bold">
              <Moon className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>09 // 404 / EASTER EGG (SECRET DISCOVERY)</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-900/80 border border-white/20 text-slate-300 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Middle Content Grid featuring Chocka's Own Avatar */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center my-auto py-6">
            <div className="md:col-span-7 flex flex-col gap-5">
              <h1 className="text-6xl font-display font-extrabold text-white tracking-tight">
                404
              </h1>

              <h3 className="text-2xl font-display font-bold text-cyan-300">
                Looks like you&apos;ve gone off the roadmap.
              </h3>

              <p className="text-sm font-sans text-slate-300 leading-relaxed bg-slate-950/80 p-5 rounded-2xl border border-white/10 backdrop-blur-md">
                But hey, great developers love to explore! Sometimes getting lost leads to the most interesting places.
              </p>

              <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-950/50 backdrop-blur-md text-amber-200 font-serif-italic text-sm">
                &quot;Same sky. Bigger dreams.&quot;
              </div>

              <button
                onClick={onClose}
                className="px-8 py-4 rounded-2xl font-mono font-bold text-sm text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 flex items-center gap-3 shadow-[0_0_30px_rgba(52,211,153,0.5)] cursor-pointer self-start"
              >
                Back to Roadmap <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Chocka's Own Explorer Avatar */}
            <div className="md:col-span-5 flex flex-col items-center justify-center">
              <div className="relative w-44 h-44 rounded-full overflow-hidden border-4 border-amber-400 shadow-[0_0_40px_rgba(251,191,36,0.4)]">
                <Image
                  src="/avatars/3d-cartoon.png"
                  alt="Chocka Explorer Avatar"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-xs font-mono font-bold text-amber-300 mt-3">CHOCKA THE EXPLORER</span>
            </div>
          </div>

          {/* Footer note */}
          <div className="relative z-10 pt-4 border-t border-white/10 text-xs font-mono text-slate-400 flex items-center justify-between">
            <span>CHOCKA.dev // SECRET DISCOVERY</span>
            <span>Because developers love surprises :)</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

