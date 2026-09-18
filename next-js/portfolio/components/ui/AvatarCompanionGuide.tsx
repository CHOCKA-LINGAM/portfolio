"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Sparkles, Play, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";
import { Page } from "@/hooks/useNav";

interface AvatarCompanionGuideProps {
  currentSection: Page;
  onOpenStory?: () => void;
  goTo?: (page: Page) => void;
}

const SECTION_COMMENTARY: Record<Page, { title: string; text: string; chips: { label: string; action: () => void }[] }> = {
  home: {
    title: "Chock's Companion Guide",
    text: "Welcome! I'm Chock's engineering avatar. Scroll down to inspect 5+ years of backend microservices, PySpark ETL speedups, & AI workflow architecture.",
    chips: [
      { label: "⚡ Key Achievements", action: () => {} },
      { label: "🎬 Play Story Reel", action: () => {} },
    ],
  },
  about: {
    title: "About Chock",
    text: "A curious builder turned Senior Software Engineer. Chock specializes in scalable backend microservices, PySpark ETL engines, and LLM automation.",
    chips: [
      { label: "5+ Years Exp", action: () => {} },
      { label: "Core Pillars", action: () => {} },
    ],
  },
  experience: {
    title: "Career Timeline Commentary",
    text: "At iLink Digital & Standard Chartered, Chock refactored enterprise ingestion engines resulting in a 40% runtime speedup.",
    chips: [
      { label: "📊 See 40% Speedup Details", action: () => {} },
      { label: "🏢 View Tech Stack", action: () => {} },
    ],
  },
  skills: {
    title: "System Pipeline Stack",
    text: "This pipeline topology spans 5 layers — Databricks & PySpark data lakes, FastAPI REST endpoints, and AWS Bedrock multi-agent AI guardrails.",
    chips: [
      { label: "🔥 Filter PySpark", action: () => {} },
      { label: "🧠 View AI Stack", action: () => {} },
    ],
  },
  projects: {
    title: "Systems Showcase Commentary",
    text: "Check out the Databricks PyPI package authoring, multi-agent AI orchestrator, and high-concurrency microservices.",
    chips: [
      { label: "📦 PyPI Package", action: () => {} },
      { label: "🤖 AI Bedrock Case Study", action: () => {} },
    ],
  },
  playlab: {
    title: "PlayLab Hands-on Demos",
    text: "Interactive mini-apps & AI playgrounds! Try out prompt executions, LLM model fallbacks, and live code experiments.",
    chips: [
      { label: "🤖 Try GPT-4o Prompt", action: () => {} },
      { label: "⚡ Code Experiments", action: () => {} },
    ],
  },
  contact: {
    title: "Outreach & Hiring Console",
    text: "Chock is open for Senior Backend Engineer, Tech Lead, & Systems Architect roles with global remote or relocation options.",
    chips: [
      { label: "✉️ Direct Email", action: () => {} },
      { label: "📄 Preview Resume", action: () => {} },
    ],
  },
};

export function AvatarCompanionGuide({
  currentSection,
  onOpenStory,
  goTo,
}: AvatarCompanionGuideProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  const activeCommentary = SECTION_COMMENTARY[currentSection] || SECTION_COMMENTARY.home;

  return (
    <div className="fixed bottom-6 right-6 z-[950] flex flex-col items-end gap-3 pointer-events-none">
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 12 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="pointer-events-auto max-w-sm rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-1)]/95 p-4 shadow-2xl backdrop-blur-xl flex flex-col gap-3"
          >
            {/* Companion Speech Bubble Header */}
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono font-bold text-[var(--accent)] uppercase tracking-wider">
                  {activeCommentary.title}
                </span>
              </div>
              <button
                onClick={() => setIsMinimized(true)}
                className="text-[var(--muted)] hover:text-[var(--text)] transition-colors p-1"
                aria-label="Minimize Companion"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Speech Body */}
            <p className="text-xs sm:text-sm text-[var(--text)] leading-relaxed font-sans">
              "{activeCommentary.text}"
            </p>

            {/* Action Chips */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <button
                onClick={onOpenStory}
                className="px-2.5 py-1 rounded-lg bg-[var(--accent)]/15 border border-[var(--accent)]/30 text-[var(--accent)] text-xs font-mono font-bold flex items-center gap-1 hover:bg-[var(--accent)]/25 transition-all cursor-pointer"
              >
                <Play className="w-3 h-3 fill-[var(--accent)]" />
                Play Story Reel
              </button>
              <button
                onClick={() => goTo?.("contact")}
                className="px-2.5 py-1 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] text-xs font-mono font-semibold flex items-center gap-1 hover:border-[var(--accent)] transition-all cursor-pointer"
              >
                Get in Touch <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Avatar Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          if (isMinimized) {
            setIsMinimized(false);
            setIsOpen(true);
          } else {
            onOpenStory?.();
          }
        }}
        className="pointer-events-auto relative group flex items-center justify-center p-1 rounded-full border-2 border-[var(--accent)] bg-[var(--surface-1)] shadow-2xl cursor-pointer overflow-hidden"
        title="Click to interact with Chock Companion Guide"
      >
        <div className="relative w-12 h-12 rounded-full overflow-hidden">
          <Image
            src="/avatars/3d-cartoon.png"
            alt="Chock Companion Avatar"
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-[var(--surface-1)]" />
        </span>
      </motion.button>
    </div>
  );
}
