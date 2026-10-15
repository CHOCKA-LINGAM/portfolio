"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { MotionConfig } from "framer-motion";
import { useNav } from "@/hooks/useNav";
import MouseGlow from "@/components/ui/MouseGlow";
import { Reveal } from "@/components/ui/Reveal";
import { SectionRail } from "@/components/ui/SectionRail";
import { ScrollEnhancer } from "@/components/ui/ScrollEnhancer";

import { MonographNavHeader } from "@/components/monograph/MonographNavHeader";
import { MonographHomeSignal } from "@/components/monograph/MonographHomeSignal";
import { MonographAboutCore } from "@/components/monograph/MonographAboutCore";
import { MonographProjectsTopology } from "@/components/monograph/MonographProjectsTopology";
import { MonographExperienceJourney } from "@/components/monograph/MonographExperienceJourney";
import { MonographSkillsCapability } from "@/components/monograph/MonographSkillsCapability";
import { MonographContactConnect } from "@/components/monograph/MonographContactConnect";
import { Terminal, Github } from "lucide-react";

// Code-split heavy, interaction-only pieces so the first paint ships less JavaScript
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
      <DeveloperStoryModal isOpen={isStoryOpen} onClose={() => setIsStoryOpen(false)} />

      {/* ── RECRUITER FAST Q&A MODAL ── */}
      <RecruiterQAModal
        isOpen={isRecruiterQAOpen}
        onClose={() => setIsRecruiterQAOpen(false)}
        onOpenResume={() => setIsResumeModalOpen(true)}
      />

      {/* ── GLOBAL DEVELOPER COMMAND PALETTE (CMD + K) ── */}
      <CommandPalette
        isOpen={isCmdPaletteOpen}
        onClose={() => setIsCmdPaletteOpen(false)}
        goTo={goTo}
        onOpenStory={() => setIsStoryOpen(true)}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
      />

      {/* ── INLINE PDF RESUME PREVIEW MODAL ── */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />

      {/* ── SPATIAL MONOGRAPH 6-SECTION STREAMLINED SYSTEM ── */}
      <main className="portfolio-shell relative z-10 mx-auto w-full max-w-[1440px] xl:max-w-[1600px] 2xl:max-w-[1920px] px-4 sm:px-8 pt-20 pb-20">
        <div className="flex flex-col gap-6 sm:gap-10 w-full">
          {/* Section 01: Homepage — The Signal */}
          <div id="section-home" className="w-full scroll-mt-24">
            <MonographHomeSignal
              onExplore={() => goTo("about")}
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

          {/* Easter Eggs — Hidden Delights */}
          <MonographEasterEggs
            isOpen={isEasterEggOpen}
            onClose={() => setIsEasterEggOpen(false)}
            onNavigate={goTo}
          />
        </div>

        {/* Footer & Responsive Bar */}
        <footer className="w-full pt-16 pb-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-500 mt-12">
          <div className="flex items-center gap-2">
            <span className="font-display font-extrabold text-white">CHOCKA<span className="text-cyan-400">.dev</span></span>
            <span>| Senior Software Engineer</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/CHOCKA-LINGAM"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-400 transition-colors font-bold"
            >
              <Github className="w-3.5 h-3.5 text-cyan-400" />
              <span>GitHub</span>
            </a>

            <button
              onClick={() => setIsEasterEggOpen(true)}
              className="px-3.5 py-1 rounded-full bg-slate-950/80 border border-cyan-500/30 text-cyan-300 hover:border-cyan-400 hover:text-white transition-all cursor-pointer flex items-center gap-2 shadow-inner group"
              title="Open System Radar & Developer CLI 💻"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse group-hover:scale-125 transition-transform" />
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[11px] font-mono text-slate-300 group-hover:text-cyan-200">System Radar 💻</span>
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
