"use client";

import { useState, useEffect } from "react";
import { useNav } from "@/hooks/useNav";
import ParticleCanvas from "@/components/ui/ParticleCanvas";
import MouseGlow from "@/components/ui/MouseGlow";
import { ScrollEnhancer } from "@/components/ui/ScrollEnhancer";
import { DeveloperStoryModal } from "@/components/ui/DeveloperStoryModal";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { ResumeModal } from "@/components/ui/ResumeModal";
import { AvatarCompanionGuide } from "@/components/ui/AvatarCompanionGuide";

import { MonographNavHeader } from "@/components/monograph/MonographNavHeader";
import { MonographHomeSignal } from "@/components/monograph/MonographHomeSignal";
import { MonographAboutCore } from "@/components/monograph/MonographAboutCore";
import { MonographProjectsTopology } from "@/components/monograph/MonographProjectsTopology";
import { MonographProjectDetail } from "@/components/monograph/MonographProjectDetail";
import { MonographExperienceJourney } from "@/components/monograph/MonographExperienceJourney";
import { MonographSkillsCapability } from "@/components/monograph/MonographSkillsCapability";
import { MonographPlayLabExperiments } from "@/components/monograph/MonographPlayLabExperiments";
import { MonographContactConnect } from "@/components/monograph/MonographContactConnect";
import { MonographEasterEggs } from "@/components/monograph/MonographEasterEggs";
import { Project } from "@/data/index";
import { Moon } from "lucide-react";

export default function Page() {
  const { current, goTo } = useNav();
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [isCmdPaletteOpen, setIsCmdPaletteOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isEasterEggOpen, setIsEasterEggOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>(undefined);

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
    <>
      <div className="dot-grid" aria-hidden="true" />
      <ScrollEnhancer />
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

      {/* ── FLOATING COMPANION AVATAR WALKTHROUGH GUIDE ── */}
      <AvatarCompanionGuide
        currentSection={current}
        onOpenStory={() => setIsStoryOpen(true)}
        goTo={goTo}
      />

      {/* ── SPATIAL MONOGRAPH 10-PANEL SYSTEM ── */}
      <main className="portfolio-shell relative z-10 mx-auto w-full max-w-[1440px] xl:max-w-[1600px] 2xl:max-w-[1920px] px-4 sm:px-8 pt-20 pb-20">
        <div className="flex flex-col gap-12 sm:gap-16 w-full">
          {/* Panel 01: Homepage — The Signal */}
          <div id="section-home" className="w-full scroll-mt-24">
            <MonographHomeSignal onExplore={() => goTo("projects")} />
          </div>

          {/* Panel 02: About — The Core */}
          <MonographAboutCore onOpenStory={() => setIsStoryOpen(true)} />

          {/* Panel 03: Projects — System Topology */}
          <MonographProjectsTopology onSelectProject={(p) => setSelectedProject(p)} />

          {/* Panel 04: Project Detail — Architecture in Action */}
          <MonographProjectDetail
            project={selectedProject}
            onBack={() => goTo("projects")}
          />

          {/* Panel 05: Experience — The Journey */}
          <MonographExperienceJourney />

          {/* Panel 06: Skills — Capability Map */}
          <MonographSkillsCapability />

          {/* Panel 07: PlayLab — Experiments & Ideas */}
          <MonographPlayLabExperiments />

          {/* Panel 08: Contact — Let's Connect */}
          <MonographContactConnect />

          {/* Panel 09: Easter Eggs — Hidden Delights */}
          <MonographEasterEggs
            isOpen={isEasterEggOpen}
            onClose={() => setIsEasterEggOpen(false)}
          />
        </div>

        {/* Panel 10: Footer & Responsive Bar */}
        <footer className="w-full pt-16 pb-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-500 mt-12">
          <div className="flex items-center gap-2">
            <span className="font-display font-extrabold text-slate-950">CHOCKA<span className="text-cyan-600">.dev</span></span>
            <span>| Senior Software Engineer</span>
          </div>

          <div className="flex items-center gap-3">
            <span>Good ideas travel far.</span>
            <button
              onClick={() => setIsEasterEggOpen(true)}
              className="px-3.5 py-1 rounded-full bg-slate-900 border border-white/20 text-cyan-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
            >
              <Moon className="w-3.5 h-3.5 text-amber-300" />
              <span>Secret Moon 🌙</span>
            </button>
          </div>

          <div className="text-right font-serif-italic">
            Thanks for exploring — C B
          </div>
        </footer>
      </main>
    </>
  );
}
