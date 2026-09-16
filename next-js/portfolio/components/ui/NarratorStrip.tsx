"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronDown, ChevronUp, Radio } from "lucide-react";

export interface NarratorDetail {
  label: string;
  text: string;
}

interface NarratorStripProps {
  quote: string;
  details?: NarratorDetail[];
  className?: string;
}

export const NarratorStrip: React.FC<NarratorStripProps> = ({
  quote,
  details = [],
  className = "",
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`relative w-full mb-6 rounded-xl bg-[var(--surface-1)]/90 backdrop-blur-md border border-[var(--border-strong)] p-3.5 sm:p-4 shadow-lg shadow-black/20 ${className}`}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Fixed Avatar Photo with Edge Blend & Equalizer Ring */}
        <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-sky-500/40 ring-2 ring-sky-500/20 overflow-hidden shrink-0 shadow-md bg-slate-900">
          <Image
            src="/avatars/in-workspace.png"
            alt="Chockalingam Balan"
            fill
            sizes="44px"
            className="object-cover rounded-full"
            priority
          />
          <div className="absolute inset-0 rounded-full shadow-[inset_0_0_8px_rgba(6,8,15,0.6)] pointer-events-none" />
        </div>

        {/* Narrator Quote & Equalizer Badge */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[11px] font-bold tracking-wider text-sky-400 uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
              Chockalingam Balan
            </span>
            <span className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
              <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
              VOICE NOTE
            </span>

            {/* Micro Equalizer Wave Visualizer */}
            <div className="hidden sm:flex items-end gap-0.5 h-3 ml-1 opacity-75">
              <span className="w-0.5 h-2 bg-sky-400 rounded-full animate-[pulse_1s_infinite_100ms]" />
              <span className="w-0.5 h-3 bg-emerald-400 rounded-full animate-[pulse_1s_infinite_300ms]" />
              <span className="w-0.5 h-1.5 bg-indigo-400 rounded-full animate-[pulse_1s_infinite_200ms]" />
              <span className="w-0.5 h-2.5 bg-sky-400 rounded-full animate-[pulse_1s_infinite_400ms]" />
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed font-normal">
            &ldquo;{quote}&rdquo;
          </p>
        </div>

        {/* Option B: Interactive Developer Context Expand Button */}
        {details.length > 0 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="group flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-sky-300 hover:text-sky-200 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 rounded-lg transition-all shrink-0 active:scale-[0.98] shadow-sm"
            title={isExpanded ? "Hide engineering context" : "View engineering context"}
            aria-label="Toggle engineering context"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-400 group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">
              {isExpanded ? "Hide Context" : "Engineering Context"}
            </span>
            <span className="sm:hidden">
              {isExpanded ? "Less" : "Insights"}
            </span>
            {isExpanded ? (
              <ChevronUp className="w-3.5 h-3.5 text-sky-400" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-sky-400" />
            )}
          </button>
        )}
      </div>

      {/* Option B: Expandable Interactive Context Drawer */}
      <AnimatePresence>
        {isExpanded && details.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-3.5 mt-3.5 border-t border-[var(--border)] grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {details.map((detail, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-[var(--surface-2)]/80 border border-[var(--border)] text-xs flex flex-col gap-1 shadow-sm"
                >
                  <span className="font-bold text-sky-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    {detail.label}
                  </span>
                  <span className="text-slate-200 leading-relaxed font-normal">
                    {detail.text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
