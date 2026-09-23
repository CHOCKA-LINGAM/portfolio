"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Volume2,
  VolumeX,
  Mail,
  Download,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Zap,
  Terminal,
  Award,
  Cpu,
  Boxes,
  Info,
  GraduationCap,
  Building2,
  Calendar,
} from "lucide-react";
import { PERSONAL, getExperienceYearsLabel } from "@/data/index";

export interface StorySlide {
  id: number;
  category: string;
  title: string;
  organization: string;
  period: string;
  subtitle: string;
  quote: string;
  highlights: string[];
  educationDetail?: {
    degree: string;
    institution: string;
    year: string;
    focus: string;
  };
  techChips: { name: string; info: string }[];
  icon: React.ReactNode;
}

const STORY_SLIDES: StorySlide[] = [
  {
    id: 0,
    category: "01 // GENESIS & EDUCATION",
    title: "B.E. Computer Science & Engineering",
    organization: "KLN College of Engineering",
    period: "2016 – 2020",
    subtitle: "Solid CS Fundamentals & Distributed Systems",
    quote: "Graduated with a Bachelor of Engineering in Computer Science from KLN College of Engineering (2020). Built core foundations in data structures, algorithms, RDBMS, and distributed computing principles.",
    educationDetail: {
      degree: "B.E. Computer Science & Engineering",
      institution: "KLN College of Engineering, Sivagangai",
      year: "Graduated 2020",
      focus: "Data Structures, Algorithms, Relational DBs & System Architecture",
    },
    highlights: [
      "B.E. Computer Science Graduate (2020)",
      "Strong CS Fundamentals & Data Structures",
      "RDBMS, OS Memory & Network Protocols",
    ],
    techChips: [
      { name: "Python", info: "Core language for backend microservices, async APIs & distributed data processing" },
      { name: "C / C++", info: "Foundational low-level memory management & object-oriented programming" },
      { name: "SQL", info: "Relational database schema design, normalization & query optimization" },
    ],
    icon: <GraduationCap className="w-4 h-4 text-cyan-400" />,
  },
  {
    id: 1,
    category: "02 // KAAR TECHNOLOGIES",
    title: "Fullstack & AI Developer",
    organization: "KAAR Technologies",
    period: "Nov 2020 – Oct 2023",
    subtitle: "Model Builder & Scenario Forecast Simulators",
    quote: "Engineered fullstack ML training and forecasting platforms with React, Flask, and Airflow DAGs. Developed custom XGBoost pipelines reducing dependency on proprietary AutoML tools.",
    highlights: [
      "Model Builder Platform (React + Flask)",
      "Custom XGBoost & LightGBM AutoML Engines",
      "Apache Airflow Retraining & Forecast DAGs",
    ],
    techChips: [
      { name: "React", info: "Frontend workbench for ML model configuration & scenario metrics" },
      { name: "Flask", info: "Python REST API backend orchestrating model training runs" },
      { name: "Apache Airflow", info: "Orchestrating model retraining & prediction workflows" },
      { name: "XGBoost", info: "Custom AutoML pipelines for automated scenario forecasting" },
    ],
    icon: <Boxes className="w-4 h-4 text-purple-400" />,
  },
  {
    id: 2,
    category: "03 // TIGER ANALYTICS",
    title: "ML Engineer & Sr. Analyst",
    organization: "Tiger Analytics",
    period: "Oct 2023 – Nov 2025",
    subtitle: "PepIris Retail CV Platform (10–12 Global Markets)",
    quote: "Architected Django multi-tenant backend operating across 10–12 international markets on a single codebase. Migrated legacy data pipelines to PySpark on Azure Databricks, cutting QA cycle times by >90%.",
    highlights: [
      "10–12 Global International Markets Deployed",
      ">90% QA Validation Cycle Time Reduction",
      "Celery Async Workers & PySpark Lakehouse ETL",
    ],
    techChips: [
      { name: "Django", info: "Multi-tenant backend platform with tenant-isolated database architecture" },
      { name: "Celery", info: "Asynchronous task execution framework for heavy ML inference jobs" },
      { name: "Azure Databricks", info: "Distributed PySpark DataFrames replacing legacy Pandas pipelines" },
    ],
    icon: <Terminal className="w-4 h-4 text-emerald-400" />,
  },
  {
    id: 3,
    category: "04 // iLINK DIGITAL",
    title: "Technical Specialist",
    organization: "iLink Digital",
    period: "Dec 2025 – Present",
    subtitle: "Tableau DAG Engine & AI Claims Platform",
    quote: "Architected DAG execution engine converting Tableau Prep flows into PySpark DataFrames with LLM accelerators (OpenAI, Claude, Bedrock). Reduced AI Claims API response latency from 25s to 10s.",
    highlights: [
      "Tableau Prep ➔ Spark DAG Execution Engine",
      "AI Migration Accelerators (OpenAI / Claude / Bedrock)",
      "AI Claims Adjudication (25s ➔ 10s Latency)",
    ],
    techChips: [
      { name: "FastAPI", info: "High-performance async Python service with <5s DAG planning response time" },
      { name: "PySpark", info: "Distributed execution engine for large-scale enterprise data transformations" },
      { name: "AWS Bedrock", info: "Enterprise LLM integration interpreting complex Tableau XML logic" },
    ],
    icon: <Zap className="w-4 h-4 text-cyan-400" />,
  },
  {
    id: 4,
    category: "05 // OPEN SOURCE",
    title: "Creator of 'schema-shield'",
    organization: "PyPI Package Author",
    period: "Active Open Source",
    subtitle: "Automated Runtime Schema Assertions & Data Drift Protection",
    quote: "Authored and published 'schema-shield' on PyPI (pip install schema-shield) to enforce zero-dependency runtime schema validation and data drift protection in data pipelines.",
    highlights: [
      "Published PyPI Package Creator (pip install schema-shield)",
      "Automated Runtime Schema & Data Drift Assertions",
      "Zero-Dependency Lightweight Python Package",
    ],
    techChips: [
      { name: "schema-shield", info: "Open-source Python package for runtime schema validation & assertions" },
      { name: "PyPI Release", info: "Official Python Package Index release" },
    ],
    icon: <Award className="w-4 h-4 text-amber-400" />,
  },
  {
    id: 5,
    category: "06 // SUMMARY & IMPACT",
    title: "Senior Software Engineer",
    organization: "Backend, Data Platforms & AI",
    period: `${getExperienceYearsLabel()} Years Experience`,
    subtitle: "Architecting Microservices, Lakehouses & AI Workflows",
    quote: `Combining ${getExperienceYearsLabel()} years of production engineering experience across high-scale backend microservices, PySpark distributed data lakes, multi-tenant architectures, and enterprise AI integrations.`,
    highlights: [
      "5+ Years Senior Software Engineering",
      "Multi-Tenant & Lakehouse Architecture",
      "Open for Global Remote & Relocation",
    ],
    techChips: [
      { name: "Backend", info: "Python, FastAPI, Django, Async Microservices, Multi-Tenant Architecture" },
      { name: "Data Engineering", info: "Azure Databricks, PySpark, Apache Airflow, Lakehouse ETL" },
      { name: "AI & Cloud", info: "OpenAI API, Claude, AWS Bedrock, Docker, React, TypeScript" },
    ],
    icon: <Cpu className="w-4 h-4 text-indigo-400" />,
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

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (err) {
      console.error("Audio synthesizer error:", err);
    }
  };

  useEffect(() => {
    if (isOpen && soundEnabled) {
      playTechSound(523.25 + currentIdx * 45, 0.12);
    }
  }, [currentIdx, soundEnabled, isOpen]);

  // Auto-advance progress timer (6s per slide)
  useEffect(() => {
    if (!isOpen || isPaused || selectedTechInfo !== null) return;

    const DURATION = 6000;
    const STEP = 50;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + (STEP / DURATION) * 100;
      });
    }, STEP);

    return () => clearInterval(interval);
  }, [isOpen, isPaused, selectedTechInfo]);

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

  const handleCloseModal = (e?: React.SyntheticEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    onClose();
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
        className="fixed inset-0 z-[2000] flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-hidden"
      >
        {/* Backdrop overlay click handler */}
        <div className="absolute inset-0 z-0" onClick={handleCloseModal} />

        {/* Story Modal Container — Fully Mobile Fluid & Responsive */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onMouseDown={() => setIsPaused(true)}
          onMouseUp={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="relative z-10 w-full max-w-[480px] max-h-[90vh] rounded-2xl overflow-y-auto overflow-x-hidden border border-slate-800 bg-slate-950 text-slate-100 shadow-2xl flex flex-col justify-between p-3.5 sm:p-5"
        >
          {/* Floating Emoji Reactions */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
            {reactions.map((r) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 1, y: 520, scale: 0.8 }}
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
          <div className="flex items-center gap-1 z-20 w-full mb-2.5">
            {STORY_SLIDES.map((slide, idx) => (
              <div
                key={slide.id}
                onClick={(e) => goToSlide(idx, e)}
                className="h-1 flex-1 rounded-full bg-slate-800 overflow-hidden cursor-pointer hover:bg-slate-700 transition-colors min-h-[6px]"
                title={`${slide.category}`}
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
          <div className="flex items-center justify-between w-full border-b border-slate-800 pb-2.5 mb-2 z-20">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center font-display font-extrabold text-xs text-white shrink-0">
                C B
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white font-mono leading-tight">
                  Chockalingam Balan
                </span>
                <span className="text-[10px] font-mono text-cyan-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  STORY {currentIdx + 1}/{STORY_SLIDES.length}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={toggleSound}
                onTouchEnd={(e) => {
                  e.stopPropagation();
                  toggleSound();
                }}
                className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-[11px] font-mono font-bold transition-all cursor-pointer ${
                  soundEnabled
                    ? "bg-cyan-950 text-cyan-300 border-cyan-500/50"
                    : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
                }`}
                title="Toggle UI Audio Effects"
              >
                {soundEnabled ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>ON</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                    <span>OFF</span>
                  </>
                )}
              </button>

              <button
                onClick={handleCloseModal}
                onTouchEnd={handleCloseModal}
                className="p-1.5 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800 transition-all cursor-pointer min-w-[32px] min-h-[32px] flex items-center justify-center"
                title="Close Story (ESC)"
              >
                <X className="w-4 h-4 text-cyan-400" />
              </button>
            </div>
          </div>

          {/* Main Story Slide Content */}
          <div className="relative flex-1 flex flex-col justify-center z-20 my-auto py-1">
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
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.16 }}
                className="relative z-30 flex flex-col gap-3 p-3.5 sm:p-4 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-md shadow-xl pointer-events-auto"
              >
                {/* Header Tag */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-1.5">
                    {currentSlide.icon}
                    <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-400">
                      {currentSlide.category}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-400 font-medium flex items-center gap-1 shrink-0">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    {currentSlide.period}
                  </span>
                </div>

                {/* Organization & Title */}
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-slate-400">
                    <Building2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>{currentSlide.organization}</span>
                  </div>
                  <h3 id="story-modal-title" className="text-base sm:text-lg font-display font-extrabold text-white tracking-tight leading-snug">
                    {currentSlide.title}
                  </h3>
                  <span className="text-[11px] sm:text-xs font-bold text-emerald-400 font-mono">
                    {currentSlide.subtitle}
                  </span>
                </div>

                {/* ACADEMIC EDUCATION CARD FOR SLIDE 0 */}
                {currentSlide.educationDetail && (
                  <div className="p-2.5 sm:p-3 rounded-lg bg-slate-950 border border-slate-800 flex flex-col gap-1 font-mono text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] sm:text-[11px] font-bold text-cyan-400 flex items-center gap-1.5">
                        <GraduationCap className="w-4 h-4 text-cyan-400 shrink-0" />
                        ACADEMIC DEGREE
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold">
                        {currentSlide.educationDetail.year}
                      </span>
                    </div>
                    <span className="font-bold text-white font-sans text-xs">
                      {currentSlide.educationDetail.degree}
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-slate-400">
                      {currentSlide.educationDetail.institution}
                    </span>
                  </div>
                )}

                {/* Narrative Quote Box */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans bg-slate-950/60 p-2.5 sm:p-3 rounded-lg border border-slate-800/80">
                  &quot;{currentSlide.quote}&quot;
                </p>

                {/* Highlights List */}
                <div className="flex flex-wrap gap-1.5">
                  {currentSlide.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-slate-950 border border-slate-800 text-[10px] sm:text-[11px] font-mono font-semibold text-slate-300 flex items-center gap-1.5"
                    >
                      <ShieldCheck className="w-3 h-3 text-cyan-400 shrink-0" />
                      <span>{h}</span>
                    </span>
                  ))}
                </div>

                {/* Tech Chips */}
                <div className="pt-2 border-t border-slate-800 relative z-40 pointer-events-auto flex flex-col gap-1.5">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Info className="w-3 h-3 text-cyan-400 shrink-0" />
                    Tech stack architecture:
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
                        className={`px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-mono font-bold transition-all border cursor-pointer relative z-50 ${
                          selectedTechInfo?.name === chip.name
                            ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/60"
                            : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                        }`}
                      >
                        ⚡ {chip.name}
                      </button>
                    ))}
                  </div>

                  {/* Popover Detail */}
                  <AnimatePresence>
                    {selectedTechInfo && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        className="p-2.5 rounded-lg bg-slate-950 border border-cyan-500/40 text-xs text-slate-300 font-sans relative z-50"
                      >
                        <span className="font-bold text-cyan-400 block mb-0.5 font-mono">
                          {selectedTechInfo.name}:
                        </span>
                        <span>{selectedTechInfo.info}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Action Controls */}
          <div className="relative z-40 flex flex-col gap-2 pt-2.5 border-t border-slate-800">
            <div className="flex items-center justify-between font-mono gap-2">
              <div className="flex items-center gap-1">
                {["🔥", "🚀", "👏", "⚡"].map((emoji) => (
                  <button
                    key={emoji}
                    onClick={(e) => {
                      e.stopPropagation();
                      addReaction(emoji);
                    }}
                    className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-400 active:scale-95 transition-all flex items-center justify-center text-xs cursor-pointer"
                  >
                    {emoji}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                <a
                  href={`mailto:${PERSONAL.email}`}
                  className="py-1.5 px-2.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1 hover:bg-cyan-400 transition-all shadow-sm cursor-pointer"
                >
                  Contact <Mail className="w-3.5 h-3.5" />
                </a>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="py-1.5 px-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 font-bold text-xs flex items-center gap-1 hover:bg-slate-800 transition-all cursor-pointer"
                >
                  Resume <Download className="w-3.5 h-3.5 text-cyan-400" />
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={(e) => prevSlide(e)}
            disabled={currentIdx === 0}
            className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-40 p-2 rounded-full bg-slate-900 text-slate-300 disabled:opacity-20 border border-slate-800 cursor-pointer hover:border-slate-700"
            aria-label="Previous story slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => nextSlide(e)}
            className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-40 p-2 rounded-full bg-slate-900 text-slate-300 border border-slate-800 cursor-pointer hover:border-slate-700"
            aria-label="Next story slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
