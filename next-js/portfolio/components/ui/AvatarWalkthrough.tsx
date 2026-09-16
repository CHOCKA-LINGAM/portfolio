"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Sparkles, X, ChevronRight, Download, Mail, RefreshCw, Layers, Compass } from "lucide-react";
import { Page } from "@/hooks/useNav";

interface AvatarWalkthroughProps {
  currentSection: Page;
  goTo: (p: Page) => void;
}

export const AVATAR_OPTIONS = [
  { id: "cyberpunk", name: "Cyberpunk Tech", src: "/avatar.png" },
  { id: "developer-themed", name: "Developer Badge", src: "/avatars/developer-themed.png" },
  { id: "clean-professional", name: "Clean Professional", src: "/avatars/clean-professional.png" },
  { id: "in-workspace", name: "In Workspace", src: "/avatars/in-workspace.png" },
  { id: "3d-cartoon", name: "3D Avatar", src: "/avatars/3d-cartoon.png" },
  { id: "sketch-style", name: "Sketch Art", src: "/avatars/sketch-style.png" },
];

const SECTION_GUIDES: Record<Page, { title: string; subtitle: string; highlight: string; actionText: string; targetPage: Page | null }> = {
  home: {
    title: "Welcome to my Portfolio!",
    subtitle: "I'm Chockalingam's Portfolio Guide. I specialize in High-Performance Backend & AI Architecture.",
    highlight: "5+ Years Exp • 40% Speedup in Databricks ETL • Multi-Agent AI",
    actionText: "Explore Experience",
    targetPage: "experience",
  },
  experience: {
    title: "Career & Enterprise Impact",
    subtitle: "From Lead Tech Specialist at iLink Digital to AI Systems Architect.",
    highlight: "Key Wins: Redshift to Databricks ETL, PySpark pipelines, PyTest QA automation",
    actionText: "View Skills Stack",
    targetPage: "skills",
  },
  skills: {
    title: "Tech Stack & Architecture",
    subtitle: "Categorized by Backend, Data Engineering, AI/ML, and Cloud Infrastructure.",
    highlight: "Core: Python, FastAPI, Databricks, PySpark, AWS Bedrock, Docker",
    actionText: "View Featured Projects",
    targetPage: "projects",
  },
  projects: {
    title: "Production Projects Showcase",
    subtitle: "6 Enterprise & Open-Source Projects with Architecture & Code Links.",
    highlight: "Highlights: Multi-Agent AI Assistant, Databricks Engine, Automated QA Framework",
    actionText: "Get in Touch",
    targetPage: "contact",
  },
  contact: {
    title: "Let's Build Together!",
    subtitle: "Open for Senior Software Engineer, Tech Lead, and Architect roles.",
    highlight: "Location: Chennai, India • Email: chockalingambalan.bcl@gmail.com",
    actionText: "Back to Top",
    targetPage: "home",
  },
};

export default function AvatarWalkthrough({ currentSection, goTo }: AvatarWalkthroughProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [activeAvatarIndex, setActiveAvatarIndex] = useState(0);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);

  useEffect(() => {
    if (!hasDismissed) {
      setIsOpen(true);
    }
  }, [currentSection, hasDismissed]);

  const activeAvatar = AVATAR_OPTIONS[activeAvatarIndex];
  const guide = SECTION_GUIDES[currentSection] || SECTION_GUIDES.home;

  return (
    <aside
      aria-label="AI Portfolio Assistant"
      className="fixed bottom-4 right-4 z-50 flex flex-col items-end max-w-[calc(100vw-2rem)] sm:max-w-md pointer-events-none"
    >
      {/* ─── AVATAR PICKER MODAL / POPUP ─── */}
      {showAvatarPicker && (
        <div className="pointer-events-auto mb-3 p-3.5 rounded-2xl bg-[#090d1f] border border-sky-500/30 shadow-2xl backdrop-blur-xl w-72 text-white text-xs font-sans animate-chip-in">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
            <span className="font-bold flex items-center gap-1.5 text-sky-400">
              <Layers size={14} /> Select Avatar Style
            </span>
            <button
              onClick={() => setShowAvatarPicker(false)}
              className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
            >
              <X size={14} />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {AVATAR_OPTIONS.map((av, idx) => (
              <button
                key={av.id}
                onClick={() => {
                  setActiveAvatarIndex(idx);
                  setShowAvatarPicker(false);
                }}
                className={`flex flex-col items-center p-1.5 rounded-xl border transition-all ${
                  activeAvatarIndex === idx
                    ? "border-sky-400 bg-sky-400/20 ring-2 ring-sky-400/40"
                    : "border-white/10 bg-white/[0.03] hover:border-white/20"
                }`}
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden mb-1">
                  <Image src={av.src} alt={av.name} fill className="object-cover" />
                </div>
                <span className="text-[10px] text-center font-medium truncate w-full text-slate-300">
                  {av.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ─── GUIDE BUBBLE / CARD ─── */}
      {isOpen && (
        <div className="pointer-events-auto mb-3 p-4 rounded-2xl bg-[#070914]/95 border border-sky-500/30 shadow-2xl backdrop-blur-xl text-white text-xs font-sans w-full sm:w-96 animate-card-in">
          <div className="flex items-start justify-between gap-2 pb-2 mb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-sky-400/50 shadow-md">
                <Image src={activeAvatar.src} alt="Chock's Avatar" fill className="object-cover" />
              </div>
              <div>
                <h4 className="font-bold text-sky-400 flex items-center gap-1">
                  <Sparkles size={12} className="text-amber-400 animate-pulse" />
                  Portfolio Guide
                </h4>
                <p className="text-[10px] text-slate-400 font-mono">
                  {currentSection.toUpperCase()} TOUR
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                title="Change Avatar Style"
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all"
              >
                <RefreshCw size={12} />
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setHasDismissed(true);
                }}
                title="Dismiss Guide"
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
              >
                <X size={12} />
              </button>
            </div>
          </div>

          <h5 className="font-bold text-white text-sm mb-1">{guide.title}</h5>
          <p className="text-slate-300 leading-relaxed mb-2.5">{guide.subtitle}</p>

          <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-200 text-[11px] mb-3 font-mono">
            {guide.highlight}
          </div>

          <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/10">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-bold text-slate-200 hover:text-white transition-all"
            >
              <Download size={12} className="text-sky-400" /> Resume PDF
            </a>

            {guide.targetPage && (
              <button
                onClick={() => goTo(guide.targetPage!)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold text-[11px] transition-all shadow-md shadow-sky-400/20"
              >
                {guide.actionText} <ChevronRight size={13} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* ─── FLOATING AVATAR TRIGGER BUTTON ─── */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) setHasDismissed(false);
        }}
        aria-label="Toggle Portfolio AI Guide"
        className="pointer-events-auto relative group flex items-center gap-2 p-1.5 pr-3.5 rounded-full bg-[#070914] border border-sky-400/50 shadow-2xl hover:border-sky-300 transition-all hover:scale-105 active:scale-95"
      >
        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-sky-400 ring-2 ring-sky-400/30">
          <Image src={activeAvatar.src} alt="Guide Avatar" fill className="object-cover" />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full ring-2 ring-slate-950" />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-xs font-bold text-white group-hover:text-sky-400 transition-colors flex items-center gap-1">
            <Compass size={12} className="text-sky-400" /> Portfolio Tour
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            {isOpen ? "Click to collapse" : "Click to guide"}
          </span>
        </div>
      </button>
    </aside>
  );
}
