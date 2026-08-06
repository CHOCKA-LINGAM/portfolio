"use client";

import { useState } from "react";
import { DAG_NODES, type DagNode } from "@/data/index";
import { ACCENT_COLORS } from "@/data/theme";
import SectionLayout from "@/components/layout/SectionLayout";
// DAG_EDGES imported below inside commented-out DagView — kept for future reuse
// import { DAG_EDGES, type DagEdge } from "@/data/index";

const nodes = DAG_NODES as DagNode[];

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
    </div>
  );
}
*/
// ─── End DAG View ──────────────────────────────────────────────────────────

// ─── Bento Grid ────────────────────────────────────────────────────────────
function BentoView() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    /* On xl (3 cols × 2 rows): h-full + gridAutoRows:1fr makes cards fill the panel.
       On sm/mobile: natural height, scrollable via the parent overflow-y-auto panel. */
    <div
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 w-full xl:h-full"
      style={{ gridAutoRows: "minmax(0, 1fr)" }}
    >
      {nodes.map((node) => {
        const col = ACCENT_COLORS[node.id] ?? ACCENT_COLORS.core;
        const isActive = activeId === node.id;
        const previewCount = 4; // show more tags since cards are taller
        const hiddenCount = node.skills.length - previewCount;

        return (
          <div
            key={node.id}
            onClick={() => setActiveId(isActive ? null : node.id)}
            className="relative group rounded-2xl border cursor-pointer transition-all duration-300 overflow-hidden select-none flex flex-col"
            style={{
              padding: "clamp(18px, 2vw, 28px)",
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
              style={{ background: `radial-gradient(circle at 0% 0%, ${col.glow}, transparent 55%)` }}
            />

            {/* Card header */}
            <div className="flex items-start justify-between mb-4 relative z-10">
              <div className="flex items-center gap-3">
                <span
                  className="flex items-center justify-center rounded-xl text-[20px] flex-shrink-0"
                  style={{
                    width: "clamp(36px, 3vw, 44px)",
                    height: "clamp(36px, 3vw, 44px)",
                    background: col.bg,
                    border: `1px solid ${col.border}`,
                  }}
                >
                  {ICONS[node.id]}
                </span>
                <div>
                  <div
                    className="font-mono font-extrabold uppercase leading-tight"
                    style={{ fontSize: "clamp(9px, 1vw, 11px)", letterSpacing: "1.5px", color: col.text }}
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

            {/* Skill tags — more in preview, all when active */}
            <div className="flex flex-wrap gap-1.5 relative z-10">
              {(isActive ? node.skills : node.skills.slice(0, previewCount)).map((skill) => (
                <span
                  key={skill}
                  className="font-mono font-bold px-2.5 py-1 rounded-[6px] transition-all duration-200"
                  style={{
                    fontSize: "clamp(8px, .85vw, 10px)",
                    background: isActive ? col.bg : "rgba(255,255,255,.025)",
                    border: `1px solid ${isActive ? col.border : "rgba(255,255,255,.06)"}`,
                    color: isActive ? col.text : "var(--muted)",
                  }}
                >
                  {skill}
                </span>
              ))}
              {!isActive && hiddenCount > 0 && (
                <span
                  className="font-mono font-bold px-2.5 py-1 rounded-[6px]"
                  style={{
                    fontSize: "clamp(8px, .85vw, 10px)",
                    background: "rgba(255,255,255,.025)",
                    border: "1px solid rgba(255,255,255,.06)",
                    color: "var(--muted)",
                  }}
                >
                  +{hiddenCount} more
                </span>
              )}
            </div>

            {/* Spacer — pushes bottom elements down in tall cards */}
            <div className="flex-1" />

            {/* Bottom: subtle capability dots */}
            <div className="relative z-10 flex items-center gap-1.5 mt-4">
              {node.skills.map((_, i) => (
                <span
                  key={i}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: isActive || i < previewCount ? "clamp(5px,0.6vw,7px)" : "clamp(3px,0.4vw,5px)",
                    height: isActive || i < previewCount ? "clamp(5px,0.6vw,7px)" : "clamp(3px,0.4vw,5px)",
                    background: isActive || i < previewCount ? col.text : "rgba(255,255,255,.12)",
                    opacity: isActive ? 1 : i < previewCount ? 0.8 : 0.3,
                    boxShadow: isActive || i < previewCount ? `0 0 6px ${col.glow}` : "none",
                  }}
                />
              ))}
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
    <SectionLayout label="Skills Overview" title="Technical Skills" scrollable={false}>
      {/* 
          Bento grid container. Using flex-1 to fill SectionLayout height.
          On xl screens, overflow is hidden and it uses flex-col to pass flex-1 to grid. 
      */}
      <div className="flex-1 min-h-0 overflow-y-auto xl:overflow-hidden xl:flex xl:flex-col">
        <BentoView />
      </div>
    </SectionLayout>
  );
}
