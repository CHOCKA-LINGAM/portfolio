"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Mail, ArrowRight, ShieldCheck, Zap, Terminal, Database, Cpu, Box, Flame, Download, Globe, Play, Eye } from "lucide-react";
import { PERSONAL } from "@/data/index";
import { Page } from "@/hooks/useNav";
import { NarratorStrip } from "@/components/ui/NarratorStrip";
import { InteractiveAvatar } from "@/components/ui/InteractiveAvatar";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { WorkstationHero } from "@/components/ui/WorkstationHero";

export default function Home({
  goTo,
  onOpenStory,
  onOpenResume,
}: {
  goTo: (p: Page) => void;
  onOpenStory?: () => void;
  onOpenResume?: () => void;
}) {
  return (
    <div className="w-full flex flex-col gap-6 py-1">
      {/* ── IDEA 1: DUAL-MONITOR DEVELOPER WORKSTATION HERO ── */}
      <WorkstationHero onOpenStory={onOpenStory} onOpenResume={onOpenResume} />

      {/* ── NARRATOR STRIP (HOME TAILORED) ── */}
      <NarratorStrip
        quote="Welcome to my engineering portfolio! I architect resilient backend microservices, PySpark ETL ingestion engines, and production AI workflow automation."
        details={[
          { label: "Core Vision", text: "Building high-concurrency, fault-tolerant backend systems with enterprise business impact." },
          { label: "Key Strengths", text: "Python, PySpark, Databricks, FastAPI, Apache Kafka, AWS Bedrock & Kubernetes" }
        ]}
        qaPairs={[
          { question: "What is your main engineering role?", answer: "Senior Software Engineer & Backend AI Architect with 5+ years shipping high-throughput systems." },
          { question: "What is your current availability?", answer: "Based in Chennai, India and open for Senior Backend, Tech Lead & Systems Architect roles globally." }
        ]}
      />
    </div>
  );
}


