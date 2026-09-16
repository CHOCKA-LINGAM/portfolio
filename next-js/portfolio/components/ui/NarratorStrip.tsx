"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Radio, Volume2, VolumeX, MessageSquare, Layers, Award, Terminal } from "lucide-react";

export interface NarratorDetail {
  label: string;
  text: string;
}

interface NarratorStripProps {
  quote: string;
  details?: NarratorDetail[];
  className?: string;
  qaPairs?: { question: string; answer: string }[];
}

const DEFAULT_QA_PAIRS = [
  {
    question: "What is your core engineering expertise?",
    answer: "I specialize in high-throughput backend microservices, PySpark/Databricks ETL data ingestion pipelines, and multi-agent AI orchestration with 99.99% availability.",
  },
  {
    question: "What is your current availability & location flexibility?",
    answer: "I am based in Chennai, India and actively open to Senior Backend Engineer, Tech Lead, and AI Architect roles — both Remote and worldwide On-site relocation.",
  },
  {
    question: "What's your biggest production achievement?",
    answer: "At iLink Digital & Standard Chartered, I optimized data ingestion pipelines to reduce processing runtime by 40% and built automated test suites reaching 90%+ coverage.",
  },
];

export const NarratorStrip: React.FC<NarratorStripProps> = ({
  quote,
  details = [],
  className = "",
  qaPairs = DEFAULT_QA_PAIRS,
}) => {
  const [activeTab, setActiveTab] = useState<"quote" | "architecture" | "qa">("quote");
  const [selectedQAIdx, setSelectedQAIdx] = useState<number>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const toggleAudio = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();
      const textToSpeak = activeTab === "qa" ? qaPairs[selectedQAIdx].answer : quote;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      setIsPlayingAudio(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`relative w-full mb-6 rounded-xl bg-[var(--surface-1)]/95 backdrop-blur-xl border border-[var(--border-strong)] p-4 shadow-xl ${className}`}
    >
      {/* ── TOP HEADER BAR: Avatar + Developer Badge + Voice Narration Button ── */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-[var(--border)]">
        <div className="flex items-center gap-3">
          {/* Avatar Photo */}
          <div className="relative w-11 h-11 rounded-full border border-[var(--accent)]/40 ring-2 ring-[var(--accent)]/20 overflow-hidden shrink-0 shadow-md bg-[var(--surface-2)]">
            <Image
              src="/avatars/developer-themed.png"
              alt="Chockalingam Balan - Developer Workspace"
              fill
              unoptimized={true}
              className="object-cover rounded-full"
              style={{ imageRendering: "-webkit-optimize-contrast" }}
              priority
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[var(--text)] tracking-wide">
                Chockalingam Balan
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold flex items-center gap-1">
                <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                DEVELOPER CONSOLE
              </span>
            </div>
            <span className="text-[11px] text-[var(--muted)]">Interactive Portfolio Narrator</span>
          </div>
        </div>

        {/* Action Controls: Audio Voice Intro Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleAudio}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              isPlayingAudio
                ? "bg-sky-500/20 text-sky-300 border-sky-400 animate-pulse"
                : "bg-[var(--surface-2)] text-slate-300 border-[var(--border)] hover:border-sky-400/40 hover:text-white"
            }`}
            title="Listen to audio narration"
          >
            {isPlayingAudio ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-sky-400" />
                <span>Stop Voice</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-sky-400" />
                <span className="hidden sm:inline">Listen Intro</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── PERSPECTIVE TABS: Summary vs Architecture vs Recruiter Q&A ── */}
      <div className="flex items-center gap-2 pt-3 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab("quote")}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all shrink-0 ${
            activeTab === "quote"
              ? "bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm"
              : "text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Section Summary</span>
        </button>

        {details.length > 0 && (
          <button
            onClick={() => setActiveTab("architecture")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all shrink-0 ${
              activeTab === "architecture"
                ? "bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm"
                : "text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Architecture Insights ({details.length})</span>
          </button>
        )}

        <button
          onClick={() => setActiveTab("qa")}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all shrink-0 ${
            activeTab === "qa"
              ? "bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm"
              : "text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]"
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Recruiter Q&amp;A</span>
        </button>
      </div>

      {/* ── TAB CONTENT DISPLAY ── */}
      <AnimatePresence mode="wait">
        {activeTab === "quote" && (
          <motion.div
            key="tab-quote"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="pt-2 text-xs sm:text-sm text-[var(--text)] italic leading-relaxed"
          >
            &ldquo;{quote}&rdquo;
          </motion.div>
        )}

        {activeTab === "architecture" && (
          <motion.div
            key="tab-arch"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5"
          >
            {details.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-xs flex flex-col gap-1"
              >
                <span className="font-bold text-sky-400 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-sky-400" />
                  {item.label}
                </span>
                <span className="text-[var(--text)] leading-relaxed font-normal">
                  {item.text}
                </span>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === "qa" && (
          <motion.div
            key="tab-qa"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="pt-2 flex flex-col gap-3"
          >
            {/* Clickable Question Chips */}
            <div className="flex flex-wrap gap-2">
              {qaPairs.map((pair, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedQAIdx(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all text-left ${
                    selectedQAIdx === idx
                      ? "bg-sky-500/20 text-sky-300 border-sky-400 shadow-sm"
                      : "bg-[var(--surface-2)] text-[var(--muted)] border-[var(--border)] hover:text-white"
                  }`}
                >
                  ❓ {pair.question}
                </button>
              ))}
            </div>

            {/* Answer Box */}
            <div className="p-3.5 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] text-xs sm:text-sm text-[var(--text)] leading-relaxed flex items-start gap-2.5">
              <Terminal className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-emerald-400 block mb-1">
                  Chockalingam&apos;s Answer:
                </span>
                <p className="font-sans font-normal text-slate-200">
                  {qaPairs[selectedQAIdx].answer}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
