"use client";
import { useState, useEffect } from "react";
import { Mail, Zap, Lock } from "lucide-react";
import { PERSONAL } from "@/data/index";
import { Page } from "@/hooks/useNav";

// ─── Feature flag ─────────────────────────────────────────────────
// Set to true once you wire up your LLM API endpoint
const LLM_ENABLED = false;

// ─── Preset questions ─────────────────────────────────────────────
// Optional display only — no functionality until LLM_ENABLED = true
// Remove any entry to hide that question chip
const PRESET_QUESTIONS = [
  "What's his core stack?",
  "Architecture Experience?",
  "Why hire him?",
  "Key achievements?",
  "Open to roles?",
];

const PRESET_ANSWERS: Record<string, string> = {
  "what's his core stack?":
    "Chockalingam's core stack is Python (Expert) + FastAPI/Django for backend, Databricks + PySpark + Airflow for data engineering, and OpenAI API for AI/ML workflows. He deploys on Azure AKS with Docker and manages SQL Server, PostgreSQL, and Databricks Hive databases.",
  "architecture experience?":
    "Experienced in FastAPI microservices, distributed ETL pipelines, async APIs, multi-tenant platforms, workflow orchestration and cloud-native architectures.",

  "why hire him?":
    "Strong ownership from architecture to deployment, production AI experience, backend optimization, distributed systems expertise and measurable business impact.",
  "key achievements?":
    "Built production AI platforms, architected scalable FastAPI & Databricks solutions, delivered products across 10+ global markets, and automated enterprise workflows reducing QA effort by 90%+.",

  "open to roles?":
    "Open to Senior Backend, AI Systems, Full Stack, Fullstack and Data Platform Engineering roles. Feel free to reach out if you'd like to connect or explore opportunities together!",
};

export default function Home({ goTo }: { goTo: (p: Page) => void }) {
  const [titleIdx, setTitleIdx] = useState(0);
  const titles = PERSONAL.typingTitles ?? ["Backend Engineer", "AI Engineer"];
  const [assistantResponse, setAssistantResponse] = useState(
    "👋 Hi! I'm Chockalingam's Resume Assistant.\nSelect one of the questions above to learn more about my experience."
  );
  const handleQuestionClick = (question: string) => {
    const answer =
      PRESET_ANSWERS[question.toLowerCase()] ??
      "Sorry, I don't have an answer for that yet.";

    setAssistantResponse(answer);
  };
  useEffect(() => {
    const t = setInterval(() => setTitleIdx(i => (i + 1) % titles.length), 2800);
    return () => clearInterval(t);
  }, [titles.length]);

  return (
    <div className="min-h-[calc(100vh-130px)] grid grid-cols-1 lg:grid-cols-[1.15fr_.85fr] gap-8 lg:gap-[52px] items-center">

      {/* ── LEFT ── */}
      <div>
        <div className="inline-flex items-center gap-2 px-3.5 py-[7px] rounded-full border border-white/[.07] text-[var(--muted)] text-[12px] font-semibold mb-6 backdrop-blur-xl"
          style={{ background: "rgba(255,255,255,.025)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] animate-pulse-ring" />
          {PERSONAL.role}
        </div>

        <h1 className="text-[clamp(46px,6.2vw,82px)] font-black tracking-[-4px] text-white leading-[.9] mb-4">
          {PERSONAL.name.split(" ").map((w, i) => <span key={i} className="block">{w}</span>)}
        </h1>

        <div className="flex items-center gap-2 font-mono text-[16px] font-semibold text-[var(--accent)] mb-7">
          <span>&gt; {titles[titleIdx]}</span>
          <span className="w-2.5 h-[22px] bg-[var(--accent)] animate-blink" />
        </div>

        <div className="flex flex-wrap gap-2 mb-7">
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

      {/* ── RIGHT — monitor widget ── */}
      <div className="rounded-3xl p-6 font-mono shadow-[0_56px_96px_-28px_rgba(0,0,0,.8)]"
        style={{ background: "rgba(7,8,16,.96)", border: "1px solid var(--border)" }}>

        {/* mac dots */}
        <div className="flex gap-1.5 mb-5 opacity-40">
          {["#ff5f56", "#ffbd2e", "#27c93f"].map(c => (
            <span key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
          ))}
        </div>

        {/* career assistant box */}
        <div className="rounded-[13px] p-4 mb-4"
          style={{ background: "rgba(255,255,255,.02)", border: "1px solid var(--border)" }}>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5 text-[var(--accent)] text-[10px] font-extrabold uppercase tracking-[1px]">
              <Zap size={12} />AI Resume Assistant
            </div>
            {/* Coming soon badge */}
            {/* <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-[.5px] text-[var(--muted)] px-2 py-0.5 rounded-full"
              style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)" }}>
              <Lock size={8} /> LLM integration coming soon
            </span> */}
          </div>

          {/* Preset question chips — display only, no action */}
          {PRESET_QUESTIONS.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {PRESET_QUESTIONS.map(q => (
                <button key={q}
                  className="font-mono text-[9px] font-bold px-2.5 py-1 rounded-[6px]"
                  style={{
                    background: "rgba(var(--ar),.07)",
                    border: "1px solid rgba(var(--ar),.18)",
                    color: "rgba(var(--ar),1)",

                  }}
                  onClick={() => handleQuestionClick(q)}
                // title="LLM integration not yet connected"
                >
                  {q}
                </button>
              ))}
            </div>
          )}
          <div
            className="rounded-lg p-2 h-[100px] overflow-y-auto text-[10px] leading-6 whitespace-pre-line"
            style={{
              background: "rgba(0,0,0,.35)",
              border: "1px solid var(--border)",
              color: "rgba(var(--af),.85)",
            }}
          >
            {assistantResponse}
          </div>

          {/* Input — disabled until LLM_ENABLED */}
          <div className="flex gap-2" style={{ marginTop: "12px" }}>
            <div className="relative flex-1">
              <input
                disabled={!LLM_ENABLED}
                placeholder={LLM_ENABLED ? "Ask about my stack, projects…" : "Coming soon"}
                className="w-full rounded-lg px-3 py-2 text-white font-mono text-[12px] outline-none transition-all cursor-not-allowed opacity-40"
                style={{ background: "rgba(0,0,0,.35)", border: "1px solid var(--border)" }}
              />
            </div>
            <button
              // disabled={!LLM_ENABLED}
              className="w-9 h-9 flex items-center justify-center rounded-lg flex-shrink-0 cursor-not-allowed opacity-30"
              style={{ background: "var(--accent)" }}>
              <Zap size={14} className="text-[#05101e]" />
            </button>
          </div>

          {/* {!LLM_ENABLED && (
            <p className="mt-2 text-[10px] text-[var(--muted)] opacity-50">
              Set <code className="font-mono bg-black/30 px-1 rounded">LLM_ENABLED = true</code> in <code className="font-mono bg-black/30 px-1 rounded">Home.tsx</code> once your API is wired up.
            </p>
          )} */}
        </div>

        {/* Stats grid — always visible */}
        <div className="grid gap-2" style={{
          gridTemplateColumns: `repeat(${PERSONAL.stats.length}, minmax(0, 1fr))`,
        }}>
          {PERSONAL.stats.map(s => (
            <div key={s.label}
              className="rounded-2xl p-4 transition-all hover:border-[rgba(var(--ar),.2)] hover:bg-[rgba(var(--ar),.05)]"
              style={{ background: "rgba(255,255,255,.025)", border: "1px solid var(--border)" }}>
              <span className="block text-[25px] font-extrabold text-white leading-none mb-1">{s.value}</span>
              <span className="text-[9px] text-[var(--muted)] uppercase tracking-[1.5px] font-bold">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
