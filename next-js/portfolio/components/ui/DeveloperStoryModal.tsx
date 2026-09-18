"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Volume2,
  VolumeX,
  Mail,
  Download,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Zap,
  Terminal,
  Award,
  Cpu,
  Boxes,
  Info,
} from "lucide-react";
import { PERSONAL } from "@/data/index";

export interface StorySlide {
  id: number;
  category: string;
  title: string;
  subtitle: string;
  quote: string;
  highlights: string[];
  techChips: { name: string; info: string }[];
  gradient: string;
  icon: React.ReactNode;
}

const STORY_SLIDES: StorySlide[] = [
  {
    id: 0,
    category: "01 / EXECUTIVE OVERVIEW",
    title: "Chockalingam Balan",
    subtitle: "Senior Software Engineer & Backend AI Architect",
    quote:
      "5+ years architecting high-throughput backend microservices, PySpark ETL data ingestion platforms, and production AI workflow automation at iLink Digital & Standard Chartered.",
    highlights: [
      "Tech Specialist @ iLink Digital",
      "Former Lead Software Engineer @ Standard Chartered",
      "Based in Chennai, IN • Open to Global Roles",
    ],
    techChips: [
      { name: "Python", info: "Core backend language for microservices & data processing" },
      { name: "FastAPI", info: "High-performance async REST & GraphQL APIs" },
      { name: "Databricks", info: "Multi-tenant cloud lakehouse data infrastructure" },
    ],
    gradient: "from-sky-500/30 via-slate-950 to-indigo-950/95",
    icon: <Sparkles className="w-5 h-5 text-sky-400" />,
  },
  {
    id: 1,
    category: "02 / ENTERPRISE DATA ENGINE",
    title: "40% ETL Pipeline Speedup",
    subtitle: "Multi-Tenant PySpark & Databricks Scale",
    quote:
      "Engineered distributed Databricks ingestion pipelines handling multi-terabyte data streams. Cut end-to-end processing latency by 40% and built automated test suites with 90%+ coverage.",
    highlights: [
      "40% Processing Latency Speedup",
      "90%+ Automated QA Coverage",
      "Fault-Tolerant Distributed Data Nodes",
    ],
    techChips: [
      { name: "PySpark", info: "Distributed data frame transformation & analytics" },
      { name: "Delta Lake", info: "ACID transaction storage for streaming data" },
      { name: "PostgreSQL", info: "Relational query optimization & connection pooling" },
    ],
    gradient: "from-emerald-500/30 via-slate-950 to-teal-950/95",
    icon: <Zap className="w-5 h-5 text-emerald-400" />,
  },
  {
    id: 2,
    category: "03 / BACKEND & CLOUD STACK",
    title: "Production Systems Stack",
    subtitle: "Async Microservices, Kafka & Kubernetes",
    quote:
      "Deep expertise building async microservice APIs in Python & FastAPI, event-driven streaming with Apache Kafka, relational optimization in PostgreSQL, and container orchestration in Azure AKS.",
    highlights: [
      "Python, FastAPI & AsyncIO Microservices",
      "Apache Kafka Event-Driven Messaging",
      "Docker & Azure Kubernetes Service (AKS)",
    ],
    techChips: [
      { name: "Apache Kafka", info: "Real-time event streaming & message queueing" },
      { name: "Azure AKS", info: "Kubernetes container deployment & auto-scaling" },
      { name: "Docker", info: "Containerized microservice packaging" },
    ],
    gradient: "from-purple-500/30 via-slate-950 to-slate-950/95",
    icon: <Terminal className="w-5 h-5 text-purple-400" />,
  },
  {
    id: 3,
    category: "04 / OPEN-SOURCE AUTHOR",
    title: "databricks-bundle on PyPI",
    subtitle: "Published Developer Tooling & Automation",
    quote:
      "Created and published the open-source 'databricks-bundle' package on PyPI, streamlining Databricks workspace deployments and multi-node compute automation for enterprise engineering teams.",
    highlights: [
      "Published PyPI Package Creator",
      "Automated Databricks Deployments",
      "Community Open-Source Contributor",
    ],
    techChips: [
      { name: "PyPI Package", info: "Published Python package for Databricks CLI automation" },
      { name: "CLI Tooling", info: "Automated deployment & environment configuration" },
    ],
    gradient: "from-amber-500/30 via-slate-950 to-slate-950/95",
    icon: <Award className="w-5 h-5 text-amber-400" />,
  },
  {
    id: 4,
    category: "05 / AI & LLM ORCHESTRATION",
    title: "Multi-Agent GenAI Workflows",
    subtitle: "AWS Bedrock, OpenAI & LangChain Guardrails",
    quote:
      "Architected multi-agent AI orchestration platforms leveraging AWS Bedrock & OpenAI models with strict fallback validation, prompt guardrails, and zero single-points-of-failure.",
    highlights: [
      "AWS Bedrock & OpenAI Integration",
      "Multi-Agent Workflow Orchestration",
      "Enterprise Prompt & Data Guardrails",
    ],
    techChips: [
      { name: "AWS Bedrock", info: "Enterprise foundation model API orchestration" },
      { name: "OpenAI GPT-4", info: "Structured reasoning & multi-step agent execution" },
      { name: "LangChain", info: "Agent tooling & memory vector integration" },
    ],
    gradient: "from-cyan-500/30 via-slate-950 to-blue-950/95",
    icon: <Cpu className="w-5 h-5 text-cyan-400" />,
  },
  {
    id: 5,
    category: "06 / LEADERSHIP & AVAILABILITY",
    title: "Engineering Leadership",
    subtitle: "Technical Architecture & Cross-Functional Delivery",
    quote:
      "Proven track record leading backend design initiatives, mentoring developers, and aligning software architecture with business goals. Actively available for Senior Backend & Tech Lead roles.",
    highlights: [
      "Cross-Functional Team Mentorship",
      "Immediate Availability for Work",
      "Open to Remote & On-site Relocation",
    ],
    techChips: [
      { name: "System Architecture", info: "Scalable microservice & cloud blueprinting" },
      { name: "Tech Leadership", info: "Sprint planning & cross-functional engineering" },
    ],
    gradient: "from-indigo-500/30 via-slate-950 to-slate-950/95",
    icon: <Boxes className="w-5 h-5 text-indigo-400" />,
  },
];

interface FloatingReaction {
  id: number;
  emoji: string;
  x: number;
}

interface DeveloperStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeveloperStoryModal: React.FC<DeveloperStoryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [selectedTechInfo, setSelectedTechInfo] = useState<{ name: string; info: string } | null>(null);

  const [reactions, setReactions] = useState<FloatingReaction[]>([]);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [progress, setProgress] = useState(0);

  const currentSlide = STORY_SLIDES[currentIdx];

  // Auto-advance story timer (6.5s per slide)
  useEffect(() => {
    if (!isOpen || isPaused || selectedTechInfo !== null) return;

    const DURATION = 6500;
    const STEP = 50;

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (currentIdx < STORY_SLIDES.length - 1) {
            setCurrentIdx((i) => i + 1);
            return 0;
          } else {
            onClose();
            return 100;
          }
        }
        return prev + (STEP / DURATION) * 100;
      });
    }, STEP);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isOpen, currentIdx, isPaused, selectedTechInfo, onClose]);

  const goToSlide = (idx: number) => {
    if (idx < 0 || idx >= STORY_SLIDES.length) return;
    setCurrentIdx(idx);
    setProgress(0);
    setSelectedTechInfo(null);
    if (isPlayingAudio) stopAudio();
  };

  const nextSlide = () => {
    if (currentIdx < STORY_SLIDES.length - 1) {
      goToSlide(currentIdx + 1);
    } else {
      onClose();
    }
  };

  const prevSlide = () => {
    if (currentIdx > 0) {
      goToSlide(currentIdx - 1);
    }
  };

  const stopAudio = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
  };

  const toggleAudio = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (isPlayingAudio) {
      stopAudio();
    } else {
      stopAudio();
      const utterance = new SpeechSynthesisUtterance(currentSlide.quote);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      setIsPlayingAudio(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const addReaction = (emoji: string) => {
    const newId = Date.now() + Math.random();
    const xPos = Math.random() * 60 + 20; // 20% to 80%
    setReactions((prev) => [...prev, { id: newId, emoji, x: xPos }]);

    setTimeout(() => {
      setReactions((prev) => prev.filter((r) => r.id !== newId));
    }, 2000);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIdx, onClose]);

  useEffect(() => {
    if (!isOpen) {
      stopAudio();
      setCurrentIdx(0);
      setProgress(0);
      setSelectedTechInfo(null);
      setReactions([]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="story-modal-title"
        className="fixed inset-0 z-[2000] flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-2xl overflow-hidden"
      >
        {/* Story Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          onMouseDown={() => setIsPaused(true)}
          onMouseUp={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className={`story-modal-dark relative w-full max-w-[460px] h-[88vh] max-h-[760px] rounded-3xl overflow-y-auto overflow-x-hidden border border-white/25 shadow-2xl flex flex-col justify-between p-4 sm:p-5 bg-gradient-to-b ${currentSlide.gradient}`}
        >
          {/* ── FLOATING EMOJI REACTION PARTICLES ── */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
            {reactions.map((r) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 1, y: 550, scale: 0.8 }}
                animate={{ opacity: 0, y: 80, scale: 1.5 }}
                transition={{ duration: 1.8, ease: "easeOut" }}
                style={{ left: `${r.x}%` }}
                className="absolute text-2xl"
              >
                {r.emoji}
              </motion.div>
            ))}
          </div>

          {/* ── TOP TIMED STORY PROGRESS BARS (6 SLIDES) ── */}
          <div className="flex items-center gap-1 z-20 w-full mb-3">
            {STORY_SLIDES.map((slide, idx) => (
              <div
                key={slide.id}
                onClick={() => goToSlide(idx)}
                className="h-1 flex-1 rounded-full bg-white/30 overflow-hidden cursor-pointer"
              >
                <div
                  className="h-full bg-white transition-all duration-75"
                  style={{
                    width:
                      idx < currentIdx
                        ? "100%"
                        : idx === currentIdx
                        ? `${progress}%`
                        : "0%",
                  }}
                />
              </div>
            ))}
          </div>

          {/* ── TOP HEADER BAR: Profile Photo + Equalizer + Audio + Close ── */}
          <div className="flex items-center justify-between z-20 w-full mb-3">
            <div className="flex items-center gap-2.5">
              <div className="relative w-11 h-11 rounded-full border-2 border-sky-400 overflow-hidden shrink-0 shadow-lg ring-2 ring-sky-400/40 bg-slate-900">
                <Image
                  src="/avatars/developer-themed.png"
                  alt="Chockalingam Balan - Developer Workspace"
                  fill
                  unoptimized={true}
                  className="object-cover"
                  style={{ imageRendering: "-webkit-optimize-contrast" }}
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-extrabold text-white tracking-wide">
                  Chockalingam Balan
                </span>
                <span className="text-[10px] font-semibold text-sky-300 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  STORY {currentIdx + 1}/{STORY_SLIDES.length}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Voice Equalizer Audio Player Button */}
              <button
                onClick={toggleAudio}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-bold transition-all ${
                  isPlayingAudio
                    ? "bg-sky-400 text-slate-950 border-sky-300 animate-pulse shadow-lg"
                    : "bg-black/50 text-white border-white/20 hover:bg-white/20"
                }`}
                title="Toggle Voice Audio Narration"
              >
                {isPlayingAudio ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    {/* Equalizer Soundwave Animation */}
                    <div className="flex items-end gap-0.5 h-3">
                      <span className="w-0.5 h-2.5 bg-slate-950 animate-pulse" />
                      <span className="w-0.5 h-3 bg-slate-950 animate-pulse" />
                      <span className="w-0.5 h-1.5 bg-slate-950 animate-pulse" />
                    </div>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-sky-400" />
                    <span className="hidden sm:inline">Sound On</span>
                  </>
                )}
              </button>

              <button
                onClick={onClose}
                className="p-1.5 rounded-full bg-black/50 text-white border border-white/20 hover:bg-white/20 transition-all"
                title="Close Story"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ── MAIN STORY CARD CONTENT (Tappable Left / Right) ── */}
          <div className="relative flex-1 flex flex-col justify-center z-20 my-auto">
            <div
              onClick={prevSlide}
              className="absolute left-0 top-0 bottom-0 w-1/3 z-30 cursor-pointer"
            />
            <div
              onClick={nextSlide}
              className="absolute right-0 top-0 bottom-0 w-2/3 z-30 cursor-pointer"
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-3 p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-white/20 backdrop-blur-xl shadow-2xl pointer-events-none"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {currentSlide.icon}
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-sky-400">
                      {currentSlide.category}
                    </span>
                  </div>
                </div>

                <h3 id="story-modal-title" className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
                  {currentSlide.title}
                </h3>

                <span className="text-xs font-bold text-emerald-400">
                  {currentSlide.subtitle}
                </span>

                <p className="text-xs sm:text-sm text-slate-100 leading-relaxed italic font-sans pt-1">
                  &ldquo;{currentSlide.quote}&rdquo;
                </p>

                {/* Highlights List */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {currentSlide.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-white/20 text-[11px] font-semibold text-slate-100 flex items-center gap-1 shadow-sm"
                    >
                      <ShieldCheck className="w-3 h-3 text-sky-400" />
                      {h}
                    </span>
                  ))}
                </div>

                {/* Interactive Tech Chip Inspector inside Story Slide */}
                <div className="pt-2 border-t border-white/10 pointer-events-auto">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                    <Info className="w-3 h-3 text-sky-400" />
                    Tap tech chip to inspect:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentSlide.techChips.map((chip, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTechInfo(selectedTechInfo?.name === chip.name ? null : chip);
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono transition-all border ${
                          selectedTechInfo?.name === chip.name
                            ? "bg-sky-500/30 text-sky-200 border-sky-400 shadow-md"
                            : "bg-slate-900/90 text-slate-300 border-white/15 hover:border-sky-400/50 hover:text-white"
                        }`}
                      >
                        ⚡ {chip.name}
                      </button>
                    ))}
                  </div>

                  {/* Popover Inspector Detail */}
                  <AnimatePresence>
                    {selectedTechInfo && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        className="mt-2 p-2.5 rounded-lg bg-slate-900 border border-sky-500/40 text-xs text-slate-200 shadow-xl"
                      >
                        <span className="font-bold text-sky-400 block mb-0.5">
                          {selectedTechInfo.name} Architecture:
                        </span>
                        <span>{selectedTechInfo.info}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── INTERACTIVE EMOJI REACTION BAR & ACTION BUTTONS ── */}
          <div className="relative z-40 flex flex-col gap-2.5 pt-3 border-t border-white/20">
            {/* Interactive Reaction Floating Spawners */}
            <div className="flex items-center justify-center gap-3">
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                React:
              </span>
              {["🔥", "🚀", "👏", "⚡", "💡"].map((emoji) => (
                <button
                  key={emoji}
                  onClick={(e) => {
                    e.stopPropagation();
                    addReaction(emoji);
                  }}
                  className="w-8 h-8 rounded-full bg-slate-900/90 border border-white/20 hover:border-sky-400 hover:scale-125 active:scale-90 transition-all flex items-center justify-center text-sm shadow-md"
                >
                  {emoji}
                </button>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-2">
              <a
                href={`mailto:${PERSONAL.email}`}
                className="flex-1 py-2.5 px-3 rounded-xl bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-lg"
              >
                Get in Touch <Mail className="w-3.5 h-3.5" />
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
              >
                Resume <Download className="w-3.5 h-3.5 text-sky-400" />
              </a>
            </div>
          </div>

          {/* Side Nav Arrows for Desktop Mouse Users */}
          <button
            onClick={prevSlide}
            disabled={currentIdx === 0}
            className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-40 p-2 rounded-full bg-black/50 text-white disabled:opacity-30 border border-white/20"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-40 p-2 rounded-full bg-black/50 text-white border border-white/20"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
