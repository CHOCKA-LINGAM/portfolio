"use client";

import { useNav } from "@/hooks/useNav";
import Nav from "@/components/layout/Nav";
import ParticleCanvas from "@/components/ui/ParticleCanvas";
import MouseGlow from "@/components/ui/MouseGlow";
import Home from "@/components/sections/Home";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import AvatarWalkthrough from "@/components/ui/AvatarWalkthrough";

export default function Page() {
  const { current, goTo } = useNav();

  return (
    <>
      <ParticleCanvas />
      <MouseGlow />
      <Nav current={current} goTo={goTo} />
      <main className="portfolio-shell relative z-10 mx-auto w-full max-w-[1440px] xl:max-w-[1600px] 2xl:max-w-[1920px]">
        {/* DESKTOP (≥1024px): Sleek Centered SPA Panel */}
        <div
          key={current}
          id="portfolio-main-panel"
          className="hidden lg:block page-active portfolio-panel h-full"
          role="tabpanel"
          aria-labelledby={`tab-${current}-desktop`}
        >
          {current === "home" && <Home goTo={goTo} />}
          {current === "experience" && <Experience />}
          {current === "skills" && <Skills />}
          {current === "projects" && <Projects />}
          {current === "contact" && <Contact />}
        </div>

        {/* MOBILE & TABLET (<1024px): Smooth Natural Vertical Flow (Zero flex scroll traps!) */}
        <div className="flex lg:hidden flex-col gap-12 w-full pt-1 pb-16">
          <div id="section-home" className="w-full scroll-mt-20"><Home goTo={goTo} /></div>
          <div id="section-experience" className="w-full scroll-mt-20"><Experience /></div>
          <div id="section-skills" className="w-full scroll-mt-20"><Skills /></div>
          <div id="section-projects" className="w-full scroll-mt-20"><Projects /></div>
          <div id="section-contact" className="w-full scroll-mt-20"><Contact /></div>
        </div>
      </main>
      <AvatarWalkthrough currentSection={current} goTo={goTo} />
    </>
  );
}
