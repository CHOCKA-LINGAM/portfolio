"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, Terminal, Zap, ShieldCheck, Command } from "lucide-react";
import { useNav } from "@/hooks/useNav";
import Nav from "@/components/layout/Nav";
import ParticleCanvas from "@/components/ui/ParticleCanvas";
import MouseGlow from "@/components/ui/MouseGlow";
import { ScrollEnhancer } from "@/components/ui/ScrollEnhancer";
import { DeveloperStoryModal } from "@/components/ui/DeveloperStoryModal";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { ResumeModal } from "@/components/ui/ResumeModal";
import { TerminalPlayground } from "@/components/lab/TerminalPlayground";
import { SystemPipelineCanvas } from "@/components/lab/SystemPipelineCanvas";
import { BenchmarkInspector } from "@/components/lab/BenchmarkInspector";

export default function LabPage() {
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

      <DeveloperStoryModal isOpen={isStoryOpen} onClose={() => setIsStoryOpen(false)} />
      <CommandPalette
        isOpen={isCmdPaletteOpen}
        onClose={() => setIsCmdPaletteOpen(false)}
        goTo={goTo}
        onOpenStory={() => setIsStoryOpen(true)}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
      />
      <ResumeModal isOpen={isResumeModalOpen} onClose={() => setIsResumeModalOpen(false)} />

      <main className="portfolio-shell relative z-10 mx-auto w-full max-w-[1440px] xl:max-w-[1600px] px-3 sm:px-6 pt-20 pb-28">
        <div className="flex flex-col gap-8 w-full">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[var(--surface-1)] border border-[var(--border-strong)] backdrop-blur-xl shadow-2xl">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1 text-xs font-bold text-sky-400 hover:text-sky-300 font-sans transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Main Portfolio
                </Link>
                <span className="text-xs text-[var(--muted)]">&bull;</span>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  DEDICATED EXPERIMENTAL ROUTE
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-[var(--text)] tracking-tight font-sans">
                Interactive Developer UI Laboratory
              </h1>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] font-sans">
                Real-time CLI terminal playground, end-to-end architecture canvas, and empirical benchmarks.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center">
              <button
                onClick={() => setIsCmdPaletteOpen(true)}
                className="px-4 py-2 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-500/40 text-xs font-bold font-sans flex items-center gap-1.5 hover:bg-sky-500/30 transition-all cursor-pointer shadow-md"
              >
                <Command className="w-4 h-4 text-sky-400" /> Cmd + K
              </button>
            </div>
          </div>

          {/* Feature 1: Chock CLI Terminal Playground */}
          <TerminalPlayground />

          {/* Feature 2: Interactive System Pipeline Canvas */}
          <SystemPipelineCanvas />

          {/* Feature 3: Benchmark Inspector */}
          <BenchmarkInspector />
        </div>
      </main>
    </>
  );
}
