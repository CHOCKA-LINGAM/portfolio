"use client";
import { useNav } from "@/hooks/useNav";
import { useTheme } from "@/hooks/useTheme";
import Nav from "@/components/layout/Nav";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";
import ParticleCanvas from "@/components/ui/ParticleCanvas";
import MouseGlow from "@/components/ui/MouseGlow";
import Home from "@/components/sections/Home";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";

export default function Page() {
  const { current, goTo } = useNav();
  const { theme, setTheme } = useTheme();

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
      {/* <ThemeSwitcher theme={theme} setTheme={setTheme} /> */}
      <main className="relative z-10 min-h-screen w-full max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-14 pt-[90px] pb-16 overflow-y-auto h-screen">
        <div key={current} className="page-active">
          {pages[current]}
        </div>
      </main>
    </>
  );
}
