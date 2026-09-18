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
import { TopNavHeader } from "@/components/chocka/TopNavHeader";
import { LandingWorkstation } from "@/components/chocka/LandingWorkstation";
import { AboutInteractive } from "@/components/chocka/AboutInteractive";
import { ProjectsShowcase } from "@/components/chocka/ProjectsShowcase";
import { ExperienceJourneyMap } from "@/components/chocka/ExperienceJourneyMap";
import { SkillsGalaxy } from "@/components/chocka/SkillsGalaxy";
import { PlayLabModule } from "@/components/chocka/PlayLabModule";
import { ContactLetBuild } from "@/components/chocka/ContactLetBuild";
import { EasterEggModal } from "@/components/chocka/EasterEggModal";
import { Sparkles, Moon } from "lucide-react";

export default function Page() {
  const { current, goTo } = useNav();
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [isCmdPaletteOpen, setIsCmdPaletteOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
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
    <>
      <div className="dot-grid" aria-hidden="true" />
      <ScrollEnhancer />
      <ParticleCanvas />
      <MouseGlow />
      
      {/* ── CHOCKA.dev TOP NAVIGATION HEADER ── */}
      <TopNavHeader
        current={current}
        goTo={goTo}
        onOpenCmdPalette={() => setIsCmdPaletteOpen(true)}
      />

      {/* ── FULL-SCREEN INSTAGRAM / SNAPCHAT STORY REEL MODAL ── */}
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

      {/* ── 09. EASTER EGG SECRET DISCOVERY MODAL (MOCKUP 09) ── */}
      <EasterEggModal
        isOpen={isEasterEggOpen}
        onClose={() => setIsEasterEggOpen(false)}
      />

      {/* ── FLOATING COMPANION AVATAR WALKTHROUGH GUIDE ── */}
      <AvatarCompanionGuide
        currentSection={current}
        onOpenStory={() => setIsStoryOpen(true)}
        goTo={goTo}
      />

      {/* ── CHOCKA.dev MAIN INTERACTIVE STORYBOARD SECTIONS ── */}
      <main className="portfolio-shell relative z-10 mx-auto w-full max-w-[1440px] xl:max-w-[1600px] 2xl:max-w-[1920px] px-4 sm:px-8 pt-16 pb-20">
        <div className="flex flex-col gap-12 sm:gap-16 w-full">
          {/* 01. Landing Workstation */}
          <div id="section-home" className="w-full scroll-mt-24">
            <LandingWorkstation
              onExplore={() => goTo("projects")}
              onOpenStory={() => setIsStoryOpen(true)}
            />
          </div>

          {/* 02. About Interactive Story */}
          <AboutInteractive />

          {/* 03 & 04. Projects Interactive System Showcase & Architecture Deep Dive */}
          <ProjectsShowcase />

          {/* 05. Experience Visual Journey Map */}
          <ExperienceJourneyMap />

          {/* 06. Skills Orbital Galaxy */}
          <SkillsGalaxy />

          {/* 07. PlayLab Hands-on Experiments */}
          <PlayLabModule />

          {/* 08. Contact Section */}
          <ContactLetBuild />
        </div>

        {/* 09. Footer with Easter Egg Trigger */}
        <footer className="w-full pt-16 pb-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-display font-extrabold text-white">CHOCKA<span className="text-emerald-400">.dev</span></span>
            <span>| Senior Software Engineer</span>
          </div>

          <div className="flex items-center gap-3">
            <span>Build · Learn · Solve · Repeat</span>
            <button
              onClick={() => setIsEasterEggOpen(true)}
              className="px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Moon className="w-3 h-3 text-amber-300" />
              <span>404 / Secret</span>
            </button>
          </div>

          <div className="text-right">
            Designed & Built with <span className="text-red-400">❤️</span> for a better tomorrow
          </div>
        </footer>
      </main>
    </>
  );
}

