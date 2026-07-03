"use client";

import { useState } from "react";
import { DAG_NODES, type DagNode } from "@/data/index";
// DAG_EDGES imported below inside commented-out DagView — kept for future reuse
// import { DAG_EDGES, type DagEdge } from "@/data/index";

const nodes = DAG_NODES as DagNode[];
// const edges = DAG_EDGES as DagEdge[]; // reserved for DAG reuse

function displayLabel(label: string) {
  return label.replaceAll("_", " ");
}

const ICONS: Record<string, string> = {
  core:  "⚙",
  ai:    "🤖",
  data:  "📊",
  infra: "☁",
  ui:    "🎨",
  db:    "🗄",
};

const ACCENT_COLORS: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  core:  { bg: "rgba(139,92,246,.08)",  border: "rgba(139,92,246,.25)",  text: "#a78bfa", glow: "rgba(139,92,246,.15)" },
  ai:    { bg: "rgba(59,130,246,.08)",  border: "rgba(59,130,246,.25)",  text: "#60a5fa", glow: "rgba(59,130,246,.15)" },
  data:  { bg: "rgba(16,185,129,.08)",  border: "rgba(16,185,129,.25)",  text: "#34d399", glow: "rgba(16,185,129,.15)" },
  infra: { bg: "rgba(245,158,11,.08)",  border: "rgba(245,158,11,.25)",  text: "#fbbf24", glow: "rgba(245,158,11,.15)" },
  ui:    { bg: "rgba(236,72,153,.08)",  border: "rgba(236,72,153,.25)",  text: "#f472b6", glow: "rgba(236,72,153,.15)" },
  db:    { bg: "rgba(20,184,166,.08)",  border: "rgba(20,184,166,.25)",  text: "#2dd4bf", glow: "rgba(20,184,166,.15)" },
};

// ─── DAG View (commented out — reserved for future reuse) ──────────────────
/*
import { useEffect, useRef } from "react";
import { DAG_EDGES, type DagEdge } from "@/data/index";
const edges = DAG_EDGES as DagEdge[];

function DagView() {
  const [activeId, setActiveId] = useState(nodes[0]?.id ?? "");
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [svgWidth, setSvgWidth] = useState(0);
  const outerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!outerRef.current) return;
    const obs = new ResizeObserver(([entry]) => {
      setSvgWidth(Math.floor(entry.contentRect.width));
    });
    obs.observe(outerRef.current);
    setSvgWidth(outerRef.current.clientWidth);
    return () => obs.disconnect();
  }, []);

  const accent = "#8fb2ff";
  const W = svgWidth;
  const nodeW = W > 0 ? Math.min(Math.max(Math.floor(W * 0.175), 130), 200) : 160;
  const nodeH = Math.min(Math.max(Math.floor(nodeW * 0.68), 88), 132);
  const pad   = Math.max(16, Math.floor(W * 0.025));
  const svgH  = W > 0 ? Math.floor(nodeH * 3.2 + pad * 2) : 320;

  const pos: Record<string, { x: number; y: number }> = {};
  if (W > 0) {
    nodes.forEach((n) => {
      pos[n.id] = {
        x: pad + n.x * (W - pad * 2 - nodeW),
        y: pad + n.y * (svgH - pad * 2 - nodeH),
      };
    });
  }

  const activeNode = nodes.find((n) => n.id === activeId) ?? nodes[0];

  return (
    <div className="flex flex-col gap-4 w-full">
      // ... Mobile/Tablet fallback and Desktop SVG DAG here
      // Full implementation preserved in git history / task-189 log
    </div>
  );
}
*/
// ─── End DAG View ──────────────────────────────────────────────────────────

// ─── Bento Grid ────────────────────────────────────────────────────────────
function BentoView() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 w-full pb-2">
      {nodes.map((node) => {
        const col = ACCENT_COLORS[node.id] ?? ACCENT_COLORS.core;
        const isActive = activeId === node.id;
        return (
          <div
            key={node.id}
            onClick={() => setActiveId(isActive ? null : node.id)}
            className="relative group rounded-2xl border p-5 cursor-pointer transition-all duration-300 overflow-hidden select-none"
            style={{
              background: isActive
                ? `radial-gradient(circle at 0% 0%, ${col.glow}, transparent 55%), rgba(7,8,16,.97)`
                : "rgba(7,8,16,.9)",
              borderColor: isActive ? col.border : "rgba(255,255,255,.06)",
              boxShadow: isActive
                ? `0 20px 48px -12px ${col.glow}`
                : "0 4px 16px -4px rgba(0,0,0,.4)",
              transform: isActive ? "translateY(-2px)" : "translateY(0)",
            }}
          >
            {/* Hover ambient glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
              style={{
                background: `radial-gradient(circle at 0% 0%, ${col.glow}, transparent 55%)`,
              }}
            />

            {/* Card header */}
            <div className="flex items-start justify-between mb-4 relative z-10">
              <div className="flex items-center gap-2.5">
                <span
                  className="flex items-center justify-center w-9 h-9 rounded-xl text-[18px] flex-shrink-0"
                  style={{ background: col.bg, border: `1px solid ${col.border}` }}
                >
                  {ICONS[node.id]}
                </span>
                <div>
                  <div
                    className="font-mono text-[10px] font-extrabold uppercase tracking-[1.5px] leading-tight"
                    style={{ color: col.text }}
                  >
                    {displayLabel(node.label)}
                  </div>
                  <div className="font-mono text-[9px] text-[var(--muted)] opacity-60 mt-0.5">
                    {node.skills.length} capabilities
                  </div>
                </div>
              </div>
              <span
                className="font-mono text-[8px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ml-2 transition-all duration-200"
                style={{
                  background: col.bg,
                  border: `1px solid ${col.border}`,
                  color: col.text,
                }}
              >
                {isActive ? "▲ HIDE" : "▼ VIEW"}
              </span>
            </div>

            {/* Skill tags — 3 preview or full list when active */}
            <div className="flex flex-wrap gap-1.5 relative z-10">
              {(isActive ? node.skills : node.skills.slice(0, 3)).map((skill) => (
                <span
                  key={skill}
                  className="font-mono text-[9px] font-bold px-2.5 py-1 rounded-[6px] transition-all duration-200"
                  style={{
                    background: isActive ? col.bg : "rgba(255,255,255,.025)",
                    border: `1px solid ${isActive ? col.border : "rgba(255,255,255,.06)"}`,
                    color: isActive ? col.text : "var(--muted)",
                  }}
                >
                  {skill}
                </span>
              ))}
              {!isActive && node.skills.length > 3 && (
                <span
                  className="font-mono text-[9px] font-bold px-2.5 py-1 rounded-[6px]"
                  style={{
                    background: "rgba(255,255,255,.025)",
                    border: "1px solid rgba(255,255,255,.06)",
                    color: "var(--muted)",
                  }}
                >
                  +{node.skills.length - 3} more
                </span>
              )}
            </div>

            {/* Bottom accent line */}
            <div
              className="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-300"
              style={{
                background: `linear-gradient(to right, transparent, ${col.text}, transparent)`,
                opacity: isActive ? 0.5 : 0.15,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
// ─── End Bento Grid ────────────────────────────────────────────────────────

// ─── Main Skills Section ───────────────────────────────────────────────────
export default function Skills() {
  return (
    <section className="flex h-full min-h-0 flex-col">
      {/* Section header */}
      <div className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[2px] text-[var(--accent)]">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--green)] animate-pulse-ring" />
        Skills Overview
      </div>
      <h2 className="mb-6 text-[clamp(28px,4.5vw,50px)] font-black leading-none tracking-[-2.5px] text-white">
        Technical Skills
      </h2>

      {/* Bento grid — click any card to expand full skill list */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <BentoView />
      </div>
    </section>
  );
}
