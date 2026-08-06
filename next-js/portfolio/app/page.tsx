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

  const pages: Record<string, React.ReactNode> = {
    home: <Home goTo={goTo} />,
    skills: <Skills />,
    projects: <Projects />,
    experience: <Experience />,
    contact: <Contact />,
  };

  return (
    <>
      <ParticleCanvas />
      <MouseGlow />
      <Nav current={current} goTo={goTo} />
      <main className="portfolio-shell relative z-10 mx-auto w-full max-w-[1440px]">
        <div
          key={current}
          id="portfolio-main-panel"
          className="page-active portfolio-panel"
          role="tabpanel"
          aria-labelledby={`tab-${current}-desktop`}
        >
          {pages[current]}
        </div>
      </main>
    </>
  );
}
