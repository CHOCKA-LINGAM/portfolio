"use client";
import { useState, useEffect } from "react";
import { Mail, MessageSquare } from "lucide-react";
import { PERSONAL } from "@/data/index";
import { STAT_ACCENTS } from "@/data/theme";
import { Page } from "@/hooks/useNav";

// ─── HR-focused Q&A — curated answers for recruiters & hiring managers ────
const PRESET_QUESTIONS = [
  // "Open to remote?",
  // "Notice period?",
  "Core stack?",
  "Biggest impact?",
  "Why hire you?",
  "Current role?",
];

const PRESET_ANSWERS: Record<string, string> = {
  "open to remote?":
    "Fully open to remote, hybrid, or on-site. Based in Chennai, India (IST, UTC+5:30). Available for interviews immediately and can join on short notice.",
  "notice period?":
    "30 days, negotiable depending on the role. Happy to discuss timelines — reach out and we'll work it out.",
  "core stack?":
    "Python · FastAPI · Django (backend), Databricks · PySpark · Airflow (data), OpenAI · AWS Bedrock (AI/LLM), Azure AKS · Docker (infra), PostgreSQL · SQL Server (databases).",
  "biggest impact?":
    "Automated enterprise QA workflows — 90%+ reduction in manual effort. Built an AI pipeline serving 10+ global markets. Architected Databricks ETL processing millions of records daily.",
  "why hire you?":
    "5+ years shipping production systems across backend, data, and AI — with measurable business impact at every step. I own the full stack from architecture to deployment.",
  "current role?":
    "Technical Specialist at iLink Digital Inc — backend systems, AI workflow automation, and data engineering. Open to senior/lead backend, AI systems, and data platform roles.",
};

export default function Home({ goTo }: { goTo: (p: Page) => void }) {
  const [titleIdx, setTitleIdx] = useState(0);
  const titles = PERSONAL.typingTitles ?? ["Backend Engineer", "AI Engineer"];
  const [activeQ, setActiveQ] = useState<string | null>(null);

  const response = activeQ
    ? PRESET_ANSWERS[activeQ.toLowerCase()] ?? "I don't have an answer for that yet."
    : "Select a question above";

  useEffect(() => {
    const t = setInterval(() => setTitleIdx(i => (i + 1) % titles.length), 2800);
    return () => clearInterval(t);
  }, [titles.length]);

  return (
    <div className="h-full min-h-0 w-full grid grid-cols-1 lg:grid-cols-[1.08fr_.92fr] gap-7 lg:gap-12 items-center">

      {/* ── LEFT ── */}
      <div>
        <div className="inline-flex items-center gap-2 px-3.5 py-[7px] rounded-full border border-white/[.07] text-[var(--muted)] text-[12px] font-semibold mb-4 sm:mb-6 backdrop-blur-xl"
          style={{ background: "rgba(255,255,255,.025)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] animate-pulse-ring" />
          {PERSONAL.role}
        </div>

        <h1 className="text-[clamp(42px,6vw,78px)] font-black tracking-[-0.055em] text-white leading-[.92] mb-4">
          {PERSONAL.name.split(" ").map((w, i) => <span key={i} className="block">{w}</span>)}
        </h1>

        <div className="flex items-center gap-2 font-mono text-[clamp(13px,1.6vw,16px)] font-semibold text-[var(--accent)] mb-5 sm:mb-7">
          <span>&gt; {titles[titleIdx]}</span>
          <span className="w-2.5 h-[22px] bg-[var(--accent)] animate-blink" />
        </div>

        <div className="flex flex-wrap gap-2 mb-5 sm:mb-7">
          {PERSONAL.chips.map((c, i) => (
            <span key={c} className="animate-chip-in inline-flex items-center gap-1.5 px-3.5 py-[7px] rounded-[11px] border border-[rgba(var(--ar),.18)] text-[var(--muted2)] text-[12px] font-bold transition-all hover:bg-[rgba(var(--ar),.14)] hover:border-[rgba(var(--ar),.36)] hover:text-white hover:-translate-y-0.5 cursor-default"
              style={{ background: "rgba(var(--ar),.055)", animationDelay: `${i * 0.06}s` }}>
              <span className="w-1 h-1 rounded-full bg-[var(--accent)] shadow-[0_0_7px_rgba(var(--ar),.7)]" />{c}
            </span>
          ))}
        </div>

        <div className="flex gap-3 flex-wrap">
          <a href={`mailto:${PERSONAL.email}`}
            className="flex items-center gap-2 px-7 py-3 rounded-[13px] font-extrabold text-[13px] text-[#05101e] transition-all hover:-translate-y-1 shadow-[0_14px_32px_-8px_rgba(var(--ar),.35)]"
            style={{ background: "linear-gradient(135deg,rgba(var(--ar),.92),rgba(var(--ar),.62))" }}>
            Get in Touch <Mail size={14} />
          </a>
          <button onClick={() => goTo("projects")}
            className="px-7 py-3 rounded-[13px] font-extrabold text-[13px] text-white border border-white/[.07] transition-all hover:-translate-y-1 hover:border-[rgba(var(--ar),.3)]"
            style={{ background: "rgba(255,255,255,.025)" }}>
            Explore Projects ↓
          </button>
        </div>
      </div>

      {/* ── RIGHT — profile widget ── */}
      <div className="rounded-3xl p-4 sm:p-5 xl:p-6 font-mono shadow-[0_56px_96px_-28px_rgba(0,0,0,.8)]"
        style={{ background: "rgba(7,8,16,.96)", border: "1px solid var(--border)" }}>

        {/* mac dots */}
        <div className="flex gap-1.5 mb-5">
          {["#ff5f56", "#ffbd2e", "#27c93f"].map(c => (
            <span key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
          ))}
        </div>

        {/* Recruiter Q&A panel */}
        <div className="rounded-[13px] p-4 mb-4"
          style={{ background: "rgba(255,255,255,.02)", border: "1px solid var(--border)" }}>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5 text-[var(--accent)] text-[10px] font-extrabold uppercase tracking-[1px]">
              <MessageSquare size={11} />Recruiter Q&amp;A
            </div>
            <span className="text-[9px] font-bold text-[var(--muted)] opacity-40 font-mono">
              click any question ↓
            </span>
          </div>

          {/* Question chips */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {PRESET_QUESTIONS.map(q => (
              <button
                key={q}
                onClick={() => setActiveQ(activeQ === q ? null : q)}
                className="font-mono text-[9px] font-bold px-2.5 py-1 rounded-[6px] transition-all duration-200"
                style={{
                  background: activeQ === q ? "rgba(var(--ar),.16)" : "rgba(var(--ar),.06)",
                  border: `1px solid ${activeQ === q ? "rgba(var(--ar),.4)" : "rgba(var(--ar),.16)"}`,
                  color: activeQ === q ? "#fff" : "rgba(var(--ar),1)",
                  transform: activeQ === q ? "translateY(-1px)" : "none",
                }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Answer area */}
          <div
            className="rounded-lg px-3 py-2.5 text-[11px] leading-[1.75] font-mono min-h-[76px] transition-all duration-200"
            style={{
              background: "rgba(0,0,0,.3)",
              border: `1px solid ${activeQ ? "rgba(var(--ar),.12)" : "var(--border)"}`,
              color: activeQ ? "rgba(143,178,255,.9)" : "rgba(255,255,255,.2)",
            }}
          >
            <span style={{ color: activeQ ? "rgba(74,222,128,.7)" : "rgba(74,222,128,.25)" }}>› </span>
            {response}
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid gap-2" style={{
          gridTemplateColumns: `repeat(${PERSONAL.stats.length}, minmax(0, 1fr))`,
        }}>
          {PERSONAL.stats.map((s, i) => {
            const a = STAT_ACCENTS[i % STAT_ACCENTS.length];
            return (
              <div key={s.label}
                className="rounded-2xl p-3 transition-all hover:-translate-y-0.5 group"
                style={{ background: "rgba(255,255,255,.025)", border: `1px solid ${a.border}` }}>
                <span
                  className="block text-[22px] font-black leading-none mb-1.5"
                  style={{ color: a.text, textShadow: `0 0 20px ${a.glow}` }}
                >
                  {s.value}
                </span>
                <span className="text-[8.5px] text-[var(--muted)] uppercase tracking-[1.5px] font-bold leading-tight block">
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
