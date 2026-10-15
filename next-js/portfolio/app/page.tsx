"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { MotionConfig } from "framer-motion";
import { useNav } from "@/hooks/useNav";
import MouseGlow from "@/components/ui/MouseGlow";
import { Reveal } from "@/components/ui/Reveal";
import { SectionRail } from "@/components/ui/SectionRail";
import { ScrollEnhancer } from "@/components/ui/ScrollEnhancer";
import { PERSONAL } from "@/data/index";

import { MonographNavHeader } from "@/components/monograph/MonographNavHeader";
import { MonographHomeSignal } from "@/components/monograph/MonographHomeSignal";
import { MonographAboutCore } from "@/components/monograph/MonographAboutCore";
import { MonographProjectsTopology } from "@/components/monograph/MonographProjectsTopology";
import { MonographExperienceJourney } from "@/components/monograph/MonographExperienceJourney";
import { MonographSkillsCapability } from "@/components/monograph/MonographSkillsCapability";
import { MonographContactConnect } from "@/components/monograph/MonographContactConnect";
import { Terminal, Github, Linkedin, Mail } from "lucide-react";

// Code-split heavy, interaction-only pieces; modals are mounted (and their chunks fetched) only when opened
const ParticleCanvas = dynamic(() => import("@/components/ui/ParticleCanvas"), { ssr: false });
const DeveloperStoryModal = dynamic(
  () => import("@/components/ui/DeveloperStoryModal").then((m) => m.DeveloperStoryModal),
  { ssr: false }
);
const CommandPalette = dynamic(
  () => import("@/components/ui/CommandPalette").then((m) => m.CommandPalette),
  { ssr: false }
);
const ResumeModal = dynamic(
  () => import("@/components/ui/ResumeModal").then((m) => m.ResumeModal),
  { ssr: false }
);
const RecruiterQAModal = dynamic(
  () => import("@/components/ui/RecruiterQAModal").then((m) => m.RecruiterQAModal),
  { ssr: false }
);
const MonographEasterEggs = dynamic(
  () => import("@/components/monograph/MonographEasterEggs").then((m) => m.MonographEasterEggs),
  { ssr: false }
);

export default function Page() {
  const { current, goTo } = useNav();
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [isCmdPaletteOpen, setIsCmdPaletteOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isRecruiterQAOpen, setIsRecruiterQAOpen] = useState(false);
  const [isEasterEggOpen, setIsEasterEggOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCmdPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[6000] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-white focus:text-slate-950 focus:font-bold focus:text-sm"
      >
        Skip to content
      </a>
      <div className="dot-grid" aria-hidden="true" />
      <ScrollEnhancer />
      <SectionRail current={current} onNavigate={goTo} />
      <ParticleCanvas />
      <MouseGlow />

      {/* ── SPATIAL MONOGRAPH TOP NAV HEADER ── */}
      <MonographNavHeader
        currentSection={current}
        onNavigate={goTo}
        onOpenCmdPalette={() => setIsCmdPaletteOpen(true)}
        onTriggerEasterEgg={() => setIsEasterEggOpen(true)}
      />

      {/* ── FULL-SCREEN DEVELOPER STORY REEL MODAL ── */}
      {isStoryOpen && (
        <DeveloperStoryModal isOpen onClose={() => setIsStoryOpen(false)} />
      )}

      {/* ── RECRUITER FAST Q&A MODAL ── */}
      {isRecruiterQAOpen && (
        <RecruiterQAModal
          isOpen
          onClose={() => setIsRecruiterQAOpen(false)}
          onOpenResume={() => setIsResumeModalOpen(true)}
        />
      )}

      {/* ── GLOBAL DEVELOPER COMMAND PALETTE (CMD + K) ── */}
      {isCmdPaletteOpen && (
        <CommandPalette
          isOpen
          onClose={() => setIsCmdPaletteOpen(false)}
          goTo={goTo}
          onOpenStory={() => setIsStoryOpen(true)}
          onOpenResumeModal={() => setIsResumeModalOpen(true)}
          onOpenRecruiterQA={() => setIsRecruiterQAOpen(true)}
        />
      )}

      {/* ── INLINE PDF RESUME PREVIEW MODAL ── */}
      {isResumeModalOpen && (
        <ResumeModal isOpen onClose={() => setIsResumeModalOpen(false)} />
      )}

      {/* ── SYSTEM TERMINAL & MOON EASTER EGG ── */}
      {isEasterEggOpen && (
        <MonographEasterEggs
          isOpen
          onClose={() => setIsEasterEggOpen(false)}
          onNavigate={goTo}
        />
      )}

      {/* ── SPATIAL MONOGRAPH 6-SECTION STREAMLINED SYSTEM ── */}
      <main
        id="main-content"
        className="portfolio-shell relative z-10 w-full px-4 sm:px-8 xl:px-12 pt-20 pb-20"
      >
        <div className="flex flex-col gap-6 sm:gap-10 w-full">
          {/* Section 01: Homepage — The Signal */}
          <div id="section-home" className="w-full scroll-mt-24">
            <MonographHomeSignal
              onExplore={() => goTo("experience")}
              onOpenResume={() => setIsResumeModalOpen(true)}
              onOpenRecruiterQA={() => setIsRecruiterQAOpen(true)}
            />
          </div>

          {/* Section 02: About — The Core */}
          <Reveal><MonographAboutCore onOpenStory={() => setIsStoryOpen(true)} /></Reveal>

          {/* Section 03: Experience — The Journey */}
          <Reveal><MonographExperienceJourney /></Reveal>

          {/* Section 04: Skills — Capability Map */}
          <Reveal><MonographSkillsCapability /></Reveal>

          {/* Section 05: Projects — Featured Open Source Flagship */}
          <Reveal><MonographProjectsTopology /></Reveal>

          {/* Section 06: Contact — Let's Connect */}
          <Reveal><MonographContactConnect /></Reveal>
        </div>

        {/* Footer */}
        <footer className="w-full pt-10 pb-4 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-5 font-mono text-xs text-slate-500 mt-12">
          <div className="flex items-center gap-2">
            <span className="font-display font-extrabold text-white">CHOCKA<span className="text-cyan-400">.dev</span></span>
            <span>| {PERSONAL.name}</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={PERSONAL.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-400 transition-colors font-bold"
            >
              <Github className="w-3.5 h-3.5 text-cyan-400" />
              <span>GitHub</span>
            </a>
            <a
              href={PERSONAL.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-400 transition-colors font-bold"
            >
              <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
              <span>LinkedIn</span>
            </a>
            <a
              href={`mailto:${PERSONAL.email}`}
              className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-400 transition-colors font-bold"
            >
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>Email</span>
            </a>

            <button
              onClick={() => setIsEasterEggOpen(true)}
              className="px-3.5 py-1 rounded-full bg-slate-950/80 border border-cyan-500/30 text-cyan-300 hover:border-cyan-400 hover:text-white transition-all cursor-pointer flex items-center gap-2 shadow-inner group"
              title="Open the developer terminal"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[11px] font-mono text-slate-300 group-hover:text-cyan-200">Terminal</span>
            </button>
          </div>

          <div className="text-right font-serif-italic">
            Thanks for exploring — C B
          </div>
        </footer>
      </main>
    </MotionConfig>
  );
}
