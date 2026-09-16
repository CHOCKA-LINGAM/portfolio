"use client";

import { useState } from "react";
import { useNav } from "@/hooks/useNav";
import Nav from "@/components/layout/Nav";
import ParticleCanvas from "@/components/ui/ParticleCanvas";
import MouseGlow from "@/components/ui/MouseGlow";
import { ScrollEnhancer } from "@/components/ui/ScrollEnhancer";
import { DeveloperStoryModal } from "@/components/ui/DeveloperStoryModal";
import { InteractiveAvatar } from "@/components/ui/InteractiveAvatar";
import Home from "@/components/sections/Home";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";

export default function Page() {
  const { current, goTo } = useNav();
  const [isStoryOpen, setIsStoryOpen] = useState(false);

  return (
    <>
      <ScrollEnhancer />
      <ParticleCanvas />
      <MouseGlow />
      <Nav current={current} goTo={goTo} />
      
      {/* ── FULL-SCREEN INSTAGRAM / SNAPCHAT STORY REEL MODAL ── */}
      <DeveloperStoryModal isOpen={isStoryOpen} onClose={() => setIsStoryOpen(false)} />

      {/* ── FLOATING SIGNATURE STORY BADGE (Bottom Left Global Trigger) ── */}
      <div className="fixed bottom-6 left-6 z-[900] hidden sm:block">
        <InteractiveAvatar
          size="sm"
          onClick={() => setIsStoryOpen(true)}
          showBadge={false}
          className="shadow-2xl hover:scale-110 transition-transform"
        />
      </div>

      <main className="portfolio-shell relative z-10 mx-auto w-full max-w-[1440px] xl:max-w-[1600px] 2xl:max-w-[1920px]">
        {/* UNIFIED CONTINUOUS VERTICAL SECTION STACK */}
        <div className="flex flex-col gap-16 sm:gap-24 w-full pt-1 pb-24">
          <div id="section-home" className="w-full scroll-mt-20">
            <Home goTo={goTo} onOpenStory={() => setIsStoryOpen(true)} />
          </div>
          
          <div id="section-experience" className="w-full scroll-mt-20">
            <Experience />
          </div>
          
          <div id="section-skills" className="w-full scroll-mt-20">
            <Skills />
          </div>
          
          <div id="section-projects" className="w-full scroll-mt-20">
            <Projects />
          </div>
          
          <div id="section-contact" className="w-full scroll-mt-20">
            <Contact />
          </div>
        </div>
      </main>
    </>
  );
}
