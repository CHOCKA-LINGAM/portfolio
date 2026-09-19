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
import { PERSONAL, getExperienceYearsLabel } from "@/data/index";

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
    category: "01 // OVERVIEW",
    title: "Chockalingam Balan",
    subtitle: "Senior Software Engineer — Data, AI & Backend",
    quote: `${getExperienceYearsLabel()} years engineering high-throughput backend microservices, PySpark ETL data platforms, and production AI workflow automation.`,
    highlights: [
      "Technical Specialist @ iLink Digital",
      "Former Lead Software Engineer @ Standard Chartered",
      "Based in Chennai, IN • Open to Global Roles",
    ],
    techChips: [
      { name: "Python", info: "Core language for backend microservices & data processing" },
      { name: "FastAPI", info: "High-performance async REST & GraphQL APIs" },
      { name: "Databricks", info: "Multi-tenant cloud lakehouse data infrastructure" },
    ],
    gradient: "from-cyan-950/80 via-slate-950 to-slate-950",
    icon: <Sparkles className="w-5 h-5 text-cyan-400" />,
  },
  {
    id: 1,
    category: "02 // DATA ENGINE",
    title: "40% Pipeline Speedup",
    subtitle: "PySpark & Databricks Scale",
    quote: "Engineered distributed Databricks ingestion pipelines, cutting processing latency by 40% with 90%+ automated test coverage.",
    highlights: [
      "40% Processing Latency Speedup",
      "90%+ Automated QA Coverage",
      "Fault-Tolerant Distributed Data Pipelines",
    ],
    techChips: [
      { name: "PySpark", info: "Distributed data frame transformation & analytics" },
      { name: "Delta Lake", info: "ACID transaction storage for streaming data" },
      { name: "PostgreSQL", info: "Relational query optimization & connection pooling" },
    ],
    gradient: "from-emerald-950/80 via-slate-950 to-slate-950",
    icon: <Zap className="w-5 h-5 text-emerald-400" />,
  },
  {
    id: 2,
    category: "03 // BACKEND STACK",
    title: "Production Systems",
    subtitle: "Async Microservices & Cloud Native",
    quote: "Built async Python & FastAPI microservices with event-driven Kafka messaging deployed on Azure Kubernetes Service (AKS).",
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
    gradient: "from-purple-950/80 via-slate-950 to-slate-950",
    icon: <Terminal className="w-5 h-5 text-purple-400" />,
  },
  {
    id: 3,
    category: "04 // OPEN SOURCE",
    title: "schema-shield on PyPI",
    subtitle: "Automated Safety & CI/CD Guardrails",
    quote: "Authored and published 'schema-shield' & 'databricks-bundle' on PyPI to enforce zero-downtime DDL compatibility guardrails.",
    highlights: [
      "Published PyPI Package Creator",
      "Zero-Downtime DDL Safety Guardrail",
      "Community Open-Source Contributor",
    ],
    techChips: [
      { name: "schema-shield", info: "AST DDL compatibility guardrail for Postgres & Databricks" },
      { name: "PyPI Package", info: "Published Python package for Databricks CLI automation" },
    ],
    gradient: "from-amber-950/80 via-slate-950 to-slate-950",
    icon: <Award className="w-5 h-5 text-amber-400" />,
  },
  {
    id: 4,
    category: "05 // AI & LLMS",
    title: "Multi-Agent AI Workflows",
    subtitle: "AWS Bedrock, OpenAI & RAG Systems",
    quote: "Architected multi-agent AI orchestration platforms leveraging AWS Bedrock & OpenAI with RAG retrieval and strict prompt guardrails.",
    highlights: [
      "AWS Bedrock & OpenAI Integration",
      "Multi-Agent Workflow Orchestration",
      "Enterprise RAG & Prompt Guardrails",
    ],
    techChips: [
      { name: "AWS Bedrock", info: "Enterprise foundation model API orchestration" },
      { name: "OpenAI GPT-4", info: "Structured reasoning & multi-step agent execution" },
      { name: "LangChain", info: "Agent tooling & memory vector integration" },
    ],
    gradient: "from-cyan-950/80 via-slate-950 to-slate-950",
    icon: <Cpu className="w-5 h-5 text-cyan-400" />,
  },
  {
    id: 5,
    category: "06 // LEADERSHIP",
    title: "Engineering Delivery",
    subtitle: "Architecture & Mentorship",
    quote: "Proven leadership designing backend architectures, mentoring teams, and shipping resilient products. Open for Senior & Lead roles.",
    highlights: [
      "Cross-Functional Team Mentorship",
      "Immediate Availability for Work",
      "Open to Remote & On-site Relocation",
    ],
    techChips: [
      { name: "System Architecture", info: "Scalable microservice & cloud blueprinting" },
      { name: "Tech Leadership", info: "Sprint planning & cross-functional engineering" },
    ],
    gradient: "from-indigo-950/80 via-slate-950 to-slate-950",
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
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [selectedTechInfo, setSelectedTechInfo] = useState<{ name: string; info: string } | null>(null);

  const [reactions, setReactions] = useState<FloatingReaction[]>([]);
  const lastNavTimeRef = useRef<number>(0);
  const [progress, setProgress] = useState(0);

  const currentSlide = STORY_SLIDES[currentIdx];

  // Zero-dependency Web Audio API Sound Synthesizer
  const playTechSound = (freq = 587.33, duration = 0.15) => {
    try {
      if (typeof window === "undefined") return;
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (err) {
      console.error("Audio synthesizer error:", err);
    }
  };

  // Trigger sound effect on slide change if Sound is ON
  useEffect(() => {
    if (isOpen && soundEnabled) {
      playTechSound(523.25 + currentIdx * 40, 0.12);
    }
  }, [currentIdx, soundEnabled, isOpen]);

  // Auto-advance progress timer (5.5s per slide)
  useEffect(() => {
    if (!isOpen || isPaused || selectedTechInfo !== null) return;

    const DURATION = 5500;
    const STEP = 50;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + (STEP / DURATION) * 100;
      });
    }, STEP);

    return () => clearInterval(interval);
  }, [isOpen, isPaused, selectedTechInfo]);

  // Handle slide advance when progress reaches 100%
  useEffect(() => {
    if (progress >= 100) {
      const now = Date.now();
      if (now - lastNavTimeRef.current >= 300) {
        lastNavTimeRef.current = now;
        if (currentIdx < STORY_SLIDES.length - 1) {
          setCurrentIdx((i) => i + 1);
          setProgress(0);
        } else {
          onClose();
        }
      }
    }
  }, [progress, currentIdx, onClose]);

  const goToSlide = (idx: number, e?: React.SyntheticEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const now = Date.now();
    if (now - lastNavTimeRef.current < 300) return;
    lastNavTimeRef.current = now;

    if (idx < 0 || idx >= STORY_SLIDES.length) return;
    setCurrentIdx(idx);
    setProgress(0);
    setSelectedTechInfo(null);
  };

  const nextSlide = (e?: React.SyntheticEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const now = Date.now();
    if (now - lastNavTimeRef.current < 300) return;
    lastNavTimeRef.current = now;

    if (currentIdx < STORY_SLIDES.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setProgress(0);
      setSelectedTechInfo(null);
    } else {
      onClose();
    }
  };

  const prevSlide = (e?: React.SyntheticEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const now = Date.now();
    if (now - lastNavTimeRef.current < 300) return;
    lastNavTimeRef.current = now;

    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
      setProgress(0);
      setSelectedTechInfo(null);
    }
  };

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    if (nextState) {
      playTechSound(659.25, 0.2);
    }
  };

  const addReaction = (emoji: string) => {
    if (soundEnabled) playTechSound(783.99, 0.1);
    const newId = Date.now() + Math.random();
    const xPos = Math.random() * 60 + 20;
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
        {/* Story Modal Container — Matched to Spatial Monograph Theme */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          onMouseDown={() => setIsPaused(true)}
          onMouseUp={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className={`relative w-full max-w-[440px] h-[86vh] max-h-[720px] rounded-3xl overflow-y-auto overflow-x-hidden border border-cyan-500/30 shadow-2xl flex flex-col justify-between p-4 sm:p-5 bg-gradient-to-b ${currentSlide.gradient}`}
        >
          {/* Floating Emoji Reactions */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
            {reactions.map((r) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 1, y: 500, scale: 0.8 }}
                animate={{ opacity: 0, y: 60, scale: 1.5 }}
                transition={{ duration: 1.8, ease: "easeOut" }}
                style={{ left: `${r.x}%` }}
                className="absolute text-2xl"
              >
                {r.emoji}
              </motion.div>
            ))}
          </div>

          {/* Timed Progress Bars */}
          <div className="flex items-center gap-1 z-20 w-full mb-3">
            {STORY_SLIDES.map((slide, idx) => (
              <div
                key={slide.id}
                onClick={() => goToSlide(idx)}
                className="h-1 flex-1 rounded-full bg-white/20 overflow-hidden cursor-pointer"
              >
                <div
                  className="h-full bg-cyan-400 transition-all duration-75"
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

          {/* Top Header Bar */}
          <div className="flex items-center justify-between z-20 w-full mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-900 border border-cyan-400/40 flex items-center justify-center font-display font-extrabold text-xs text-white shadow-md">
                C B
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white tracking-wide">
                  Chockalingam Balan
                </span>
                <span className="text-[10px] font-semibold text-cyan-300 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  STORY {currentIdx + 1}/{STORY_SLIDES.length}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Web Audio Synthesizer Sound Button */}
              <button
                onClick={toggleSound}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-mono font-bold transition-all cursor-pointer ${
                  soundEnabled
                    ? "bg-cyan-950 text-cyan-300 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                    : "bg-slate-900/80 text-slate-400 border-white/10 hover:text-white"
                }`}
                title="Toggle UI Audio Effects"
              >
                {soundEnabled ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    <span>Sound ON</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                    <span>Sound OFF</span>
                  </>
                )}
              </button>

              <button
                onClick={onClose}
                className="p-1.5 rounded-full bg-slate-900/80 text-slate-300 border border-white/15 hover:bg-slate-800 transition-all cursor-pointer"
                title="Close Story"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Story Slide Content */}
          <div className="relative flex-1 flex flex-col justify-center z-20 my-auto">
            {/* Background Tap Navigation Zones (z-10) */}
            <div
              onClick={(e) => prevSlide(e)}
              className="absolute left-0 top-0 bottom-0 w-1/3 z-10 cursor-pointer"
            />
            <div
              onClick={(e) => nextSlide(e)}
              className="absolute right-0 top-0 bottom-0 w-2/3 z-10 cursor-pointer"
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, x: 15, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -15, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="relative z-30 flex flex-col gap-3 p-4 sm:p-5 rounded-2xl bg-slate-950/95 border border-cyan-500/30 backdrop-blur-xl shadow-2xl pointer-events-auto"
              >
                <div className="flex items-center gap-2">
                  {currentSlide.icon}
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400">
                    {currentSlide.category}
                  </span>
                </div>

                <h3 id="story-modal-title" className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight leading-tight">
                  {currentSlide.title}
                </h3>

                <span className="text-xs font-bold text-emerald-400 font-mono">
                  {currentSlide.subtitle}
                </span>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans bg-slate-900/80 p-3 rounded-xl border border-white/10">
                  {currentSlide.quote}
                </p>

                {/* Highlights List */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {currentSlide.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 border border-cyan-500/20 text-[11px] font-mono font-semibold text-slate-200 flex items-center gap-1 shadow-sm"
                    >
                      <ShieldCheck className="w-3 h-3 text-cyan-400" />
                      {h}
                    </span>
                  ))}
                </div>

                {/* Interactive Tech Chip Inspector inside Story Slide */}
                <div className="pt-2 border-t border-white/10 relative z-40 pointer-events-auto">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                    <Info className="w-3 h-3 text-cyan-400" />
                    Tap tech chip to inspect:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentSlide.techChips.map((chip, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (soundEnabled) playTechSound(700, 0.08);
                          setSelectedTechInfo(selectedTechInfo?.name === chip.name ? null : chip);
                        }}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all border cursor-pointer relative z-50 ${
                          selectedTechInfo?.name === chip.name
                            ? "bg-cyan-500/30 text-cyan-200 border-cyan-400 shadow-md scale-105"
                            : "bg-slate-900 text-slate-300 border-white/15 hover:border-cyan-400/50 hover:text-white"
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
                        className="mt-2.5 p-3 rounded-xl bg-slate-900 border border-cyan-400/50 text-xs text-slate-200 shadow-2xl font-sans relative z-50"
                      >
                        <span className="font-bold text-cyan-400 block mb-0.5 font-mono flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-cyan-300" />
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

          {/* Reaction Bar & CTAs */}
          <div className="relative z-40 flex flex-col gap-2.5 pt-3 border-t border-white/15">
            <div className="flex items-center justify-center gap-3">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                React:
              </span>
              {["🔥", "🚀", "👏", "⚡", "💡"].map((emoji) => (
                <button
                  key={emoji}
                  onClick={(e) => {
                    e.stopPropagation();
                    addReaction(emoji);
                  }}
                  className="w-8 h-8 rounded-full bg-slate-900 border border-white/15 hover:border-cyan-400 hover:scale-125 active:scale-90 transition-all flex items-center justify-center text-sm shadow-md cursor-pointer"
                >
                  {emoji}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 font-mono">
              <a
                href={`mailto:${PERSONAL.email}`}
                className="flex-1 py-2.5 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
              >
                Get in Touch <Mail className="w-3.5 h-3.5" />
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/15 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                Resume <Download className="w-3.5 h-3.5 text-cyan-400" />
              </a>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={(e) => prevSlide(e)}
            disabled={currentIdx === 0}
            className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-40 p-2 rounded-full bg-slate-950/80 text-white disabled:opacity-20 border border-white/15 cursor-pointer"
            aria-label="Previous story slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => nextSlide(e)}
            className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-40 p-2 rounded-full bg-slate-950/80 text-white border border-white/15 cursor-pointer"
            aria-label="Next story slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
