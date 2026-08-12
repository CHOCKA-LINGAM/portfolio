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

export default function Page() {
  const { current, goTo } = useNav();

  return (
    <>
      <ParticleCanvas />
      <MouseGlow />
      <Nav current={current} goTo={goTo} />
      <main className="portfolio-shell relative z-10 mx-auto w-full max-w-[1440px]">
        {/* DESKTOP (≥1024px): Sleek Tabbed SPA View — All sections top-aligned */}
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

        {/* MOBILE & TABLET (<1024px): Continuous Vertical Scroll Stream (Zero need to click nav each time!) */}
        <div className="block lg:hidden flex flex-col gap-16 overflow-y-auto h-full pt-2 pb-16">
          <div id="section-home"><Home goTo={goTo} /></div>
          <div id="section-experience"><Experience /></div>
          <div id="section-skills"><Skills /></div>
          <div id="section-projects"><Projects /></div>
          <div id="section-contact"><Contact /></div>
        </div>
      </main>
    </>
  );
}
