"use client";

import { useState, useEffect } from "react";
import { useNav } from "@/hooks/useNav";
import Nav from "@/components/layout/Nav";
import ParticleCanvas from "@/components/ui/ParticleCanvas";
import MouseGlow from "@/components/ui/MouseGlow";
import { ScrollEnhancer } from "@/components/ui/ScrollEnhancer";
import { DeveloperStoryModal } from "@/components/ui/DeveloperStoryModal";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { ResumeModal } from "@/components/ui/ResumeModal";
import { InteractiveAvatar } from "@/components/ui/InteractiveAvatar";
import Home from "@/components/sections/Home";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";

export default function Page() {
  const { current, goTo } = useNav();
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [isCmdPaletteOpen, setIsCmdPaletteOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

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
      <ScrollEnhancer />
      <ParticleCanvas />
      <MouseGlow />
      <Nav
        current={current}
        goTo={goTo}
        onOpenCommandPalette={() => setIsCmdPaletteOpen(true)}
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

      {/* ── FLOATING SIGNATURE STORY BADGE (Bottom Left Global Trigger) ── */}
      <div className="fixed bottom-6 left-6 z-[900] hidden sm:block">
        <InteractiveAvatar
          size="sm"
          onClick={() => setIsStoryOpen(true)}
          showBadge={false}
          className="shadow-2xl hover:scale-110 transition-transform"
        />
      </div>

      <main className="portfolio-shell relative z-10 mx-auto w-full max-w-[1440px] xl:max-w-[1600px] 2xl:max-w-[1920px] px-3 sm:px-6">
        {/* UNIFIED CONTINUOUS VERTICAL SECTION STACK WITH GENERATED STUDIO SEPARATORS */}
        <div className="flex flex-col gap-16 sm:gap-24 w-full pt-4 pb-28">
          <div id="section-home" className="w-full scroll-mt-24">
            <Home
              goTo={goTo}
              onOpenStory={() => setIsStoryOpen(true)}
              onOpenResume={() => setIsResumeModalOpen(true)}
            />
          </div>

          <div aria-hidden="true" className="h-px w-full bg-gradient-to-r from-transparent via-[var(--border-strong)] to-transparent opacity-80" />
          
          <div id="section-experience" className="w-full scroll-mt-24">
            <Experience />
          </div>

          <div aria-hidden="true" className="h-px w-full bg-gradient-to-r from-transparent via-[var(--border-strong)] to-transparent opacity-80" />
          
          <div id="section-skills" className="w-full scroll-mt-24">
            <Skills />
          </div>

          <div aria-hidden="true" className="h-px w-full bg-gradient-to-r from-transparent via-[var(--border-strong)] to-transparent opacity-80" />
          
          <div id="section-projects" className="w-full scroll-mt-24">
            <Projects />
          </div>

          <div aria-hidden="true" className="h-px w-full bg-gradient-to-r from-transparent via-[var(--border-strong)] to-transparent opacity-80" />
          
          <div id="section-contact" className="w-full scroll-mt-24">
            <Contact />
          </div>
        </div>
      </main>
    </>
  );
}
