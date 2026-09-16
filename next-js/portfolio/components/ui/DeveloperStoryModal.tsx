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
  Layers,
  Cpu,
  Boxes,
} from "lucide-react";
import { PERSONAL } from "@/data/index";

export interface StorySlide {
  id: number;
  category: string;
  title: string;
  subtitle: string;
  quote: string;
  highlights: string[];
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
    gradient: "from-sky-500/25 via-slate-900 to-indigo-950/95",
    icon: <Sparkles className="w-5 h-5 text-sky-400" />,
  },
  {
    id: 1,
    category: "02 / ENTERPRISE DATA ENGINE",
    title: "40% ETL Pipeline Acceleration",
    subtitle: "Multi-Tenant PySpark & Databricks Ingestion Scale",
    quote:
      "Engineered distributed Databricks ingestion pipelines handling multi-terabyte data streams. Reduced end-to-end processing latency by 40% and built automated test suites with 90%+ coverage.",
    highlights: [
      "40% Processing Latency Speedup",
      "90%+ Automated QA Coverage",
      "Fault-Tolerant Distributed Data Nodes",
    ],
    gradient: "from-emerald-500/25 via-slate-900 to-teal-950/95",
    icon: <Zap className="w-5 h-5 text-emerald-400" />,
  },
  {
    id: 2,
    category: "03 / BACKEND MICROSERVICES STACK",
    title: "Production Tech Stack",
    subtitle: "Python (FastAPI/AsyncIO), PostgreSQL & Kafka",
    quote:
      "Deep expertise building async microservice APIs in Python & FastAPI, event-driven streaming with Apache Kafka, relational optimization in PostgreSQL, and container orchestration in Azure AKS.",
    highlights: [
      "Python, FastAPI & AsyncIO Microservices",
      "Apache Kafka Event-Driven Messaging",
      "Docker & Azure Kubernetes Service (AKS)",
    ],
    gradient: "from-purple-500/25 via-slate-900 to-slate-950/95",
    icon: <Terminal className="w-5 h-5 text-purple-400" />,
  },
  {
    id: 3,
    category: "04 / OPEN-SOURCE AUTHOR",
    title: "databricks-bundle on PyPI",
    subtitle: "Published Developer Tooling & Automation",
    quote:
      "Created and published the open-source 'databricks-bundle' package on PyPI, streamlining Databricks workspace deployments and multi-node compute automation for enterprise teams.",
    highlights: [
      "Published PyPI Package Creator",
      "Automated Databricks Deployments",
      "Community Open-Source Contributor",
    ],
    gradient: "from-amber-500/25 via-slate-900 to-slate-950/95",
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
    gradient: "from-cyan-500/25 via-slate-900 to-blue-950/95",
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
    gradient: "from-indigo-500/25 via-slate-900 to-slate-950/95",
    icon: <Boxes className="w-5 h-5 text-indigo-400" />,
  },
];

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

  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [progress, setProgress] = useState(0);

  const currentSlide = STORY_SLIDES[currentIdx];

  // Auto-advance story timer (6.5 seconds per slide)
  useEffect(() => {
    if (!isOpen || isPaused) return;

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
  }, [isOpen, currentIdx, isPaused, onClose]);

  const goToSlide = (idx: number) => {
    if (idx < 0 || idx >= STORY_SLIDES.length) return;
    setCurrentIdx(idx);
    setProgress(0);
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

  useEffect(() => {
    if (!isOpen) {
      stopAudio();
      setCurrentIdx(0);
      setProgress(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[2000] flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-2xl">
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
          className={`relative w-full max-w-[450px] h-[88vh] max-h-[760px] rounded-3xl overflow-hidden border border-white/25 shadow-2xl flex flex-col justify-between p-5 bg-gradient-to-b ${currentSlide.gradient}`}
        >
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

          {/* ── TOP HEADER BAR: Crisp Uncompressed Profile Photo + Audio + Close ── */}
          <div className="flex items-center justify-between z-20 w-full mb-4">
            <div className="flex items-center gap-2.5">
              <div className="relative w-11 h-11 rounded-full border-2 border-sky-400 overflow-hidden shrink-0 shadow-lg ring-2 ring-sky-400/40 bg-slate-900">
                <Image
                  src="/avatars/in-workspace.png"
                  alt="Chockalingam"
                  fill
                  unoptimized={true}
                  className="object-cover"
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
              <button
                onClick={toggleAudio}
                className={`p-2 rounded-full border transition-all ${
                  isPlayingAudio
                    ? "bg-sky-400 text-slate-950 border-sky-300 animate-pulse"
                    : "bg-black/50 text-white border-white/20 hover:bg-white/20"
                }`}
                title="Toggle Voice Audio Narration"
              >
                {isPlayingAudio ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-full bg-black/50 text-white border border-white/20 hover:bg-white/20 transition-all"
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
                className="flex flex-col gap-3 p-4 sm:p-5 rounded-2xl bg-slate-950/75 border border-white/20 backdrop-blur-xl shadow-2xl pointer-events-none"
              >
                <div className="flex items-center gap-2">
                  {currentSlide.icon}
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-sky-400">
                    {currentSlide.category}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
                  {currentSlide.title}
                </h3>

                <span className="text-xs font-bold text-emerald-400">
                  {currentSlide.subtitle}
                </span>

                <p className="text-xs sm:text-sm text-slate-100 leading-relaxed italic font-sans pt-1">
                  &ldquo;{currentSlide.quote}&rdquo;
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
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
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── BOTTOM ACTION BUTTONS ── */}
          <div className="relative z-40 flex items-center gap-2 pt-3 border-t border-white/20">
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
