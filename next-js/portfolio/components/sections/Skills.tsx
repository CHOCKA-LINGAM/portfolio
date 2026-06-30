"use client";

import { useEffect, useRef, useState } from "react";
import { DAG_EDGES, DAG_NODES, type DagEdge, type DagNode } from "@/data/index";

const nodes = DAG_NODES as DagNode[];
const edges = DAG_EDGES as DagEdge[];

function displayLabel(label: string) {
  return label.replaceAll("_", " ");
}

export default function Skills() {
  const [activeId, setActiveId] = useState(nodes[0]?.id ?? "");
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [width, setWidth] = useState(0);
  const outerRef = useRef<HTMLDivElement>(null);
  const activeNode = nodes.find((node) => node.id === activeId) ?? nodes[0];

  useEffect(() => {
    if (!outerRef.current) return;
    const handleResize = () => {
      if (outerRef.current) setWidth(outerRef.current.clientWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const accent = "#8fb2ff";
  const nodeWidth = Math.min(Math.max(Math.floor(width * 0.185), 145), 220);
  const nodeHeight = Math.min(Math.max(Math.floor(nodeWidth * 0.7), 92), 142);
  const padding = Math.floor(width * 0.03);
  const height = width > 0 ? Math.floor(nodeHeight * 3.15 + padding * 2) : 300;

  const positions: Record<string, { x: number; y: number; w: number; h: number }> = {};
  if (width > 0) {
    nodes.forEach((node) => {
      positions[node.id] = {
        x: padding + node.x * (width - padding * 2 - nodeWidth),
        y: padding + node.y * (height - padding * 2 - nodeHeight),
        w: nodeWidth,
        h: nodeHeight,
      };
    });
  }

  return (
    <section className="flex h-full min-h-0 flex-col">
      <div className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[2px] text-[var(--accent)]">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--green)] animate-pulse-ring" />
        Skills Overview
      </div>
      <h2 className="mb-5 text-[clamp(32px,4.5vw,50px)] font-black leading-none tracking-[-2.5px] text-white lg:mb-8">
        Technical Skills
      </h2>

      {/* ── MOBILE & TABLET LAYOUT (< 1024px) ────────────────────────── */}
      <div className="flex min-h-0 flex-1 flex-col lg:hidden">
        <div
          className="grid grid-cols-2 gap-2.5 sm:grid-cols-3"
          role="tablist"
          aria-label="Skill categories"
        >
          {nodes.map((node) => {
            const selected = node.id === activeNode?.id;
            return (
              <button
                key={node.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveId(node.id)}
                className={`rounded-xl px-4 py-3 text-left font-mono text-[10.5px] font-bold uppercase tracking-[.8px] transition-all duration-300 transform active:scale-95 border ${
                  selected
                    ? "text-white border-[rgba(143,178,255,.32)] bg-[rgba(143,178,255,.12)] shadow-[0_4px_16px_rgba(143,178,255,.08)]"
                    : "text-[var(--muted)] border-white/[.07] bg-white/[.02] hover:text-white hover:border-white/[.15] hover:bg-white/[.04]"
                }`}
              >
                <span className="mb-1 block font-mono text-[8px] text-[var(--accent)] opacity-60">
                  {String(nodes.indexOf(node) + 1).padStart(2, "0")}
                </span>
                {displayLabel(node.label)}
              </button>
            );
          })}
        </div>

        {activeNode && (
          <div
            role="tabpanel"
            className="mt-4 flex min-h-0 flex-1 flex-col rounded-2xl border border-white/[.08] p-5 sm:p-6 transition-all duration-300"
            style={{
              background:
                "radial-gradient(circle at 100% 0%, rgba(143,178,255,.08), transparent 45%), rgba(7,8,16,.92)",
              boxShadow: "0 16px 36px -12px rgba(0,0,0,.5)"
            }}
          >
            <div className="mb-4 flex items-center justify-between border-b border-white/[.04] pb-3">
              <h3 className="font-mono text-[13px] font-extrabold uppercase tracking-[1.5px] text-[var(--accent)]">
                {displayLabel(activeNode.label)}
              </h3>
              <span className="font-mono text-[10px] font-bold text-[var(--muted)] opacity-80">
                {activeNode.skills.length} Capabilities
              </span>
            </div>
            <div className="grid grid-cols-1 gap-2.5 min-[390px]:grid-cols-2">
              {activeNode.skills.map((skill) => (
                <div
                  key={skill}
                  className="flex min-w-0 items-center gap-2.5 rounded-xl border border-white/[.04] bg-white/[.015] px-3.5 py-3 text-[11.5px] font-semibold text-[var(--muted2)] hover:border-[rgba(143,178,255,.15)] hover:bg-white/[.03] transition-colors duration-200"
                >
                  <span className="h-1.5 w-1.5 flex-none rounded-full bg-[var(--accent)] shadow-[0_0_8px_rgba(143,178,255,.6)]" />
                  <span className="truncate">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── DESKTOP LAYOUT (≥ 1024px) ────────────────────────────────── */}
      <div
        ref={outerRef}
        className="relative hidden w-full max-w-full overflow-hidden rounded-3xl border border-white/[.07] lg:block"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,.015) 1px, transparent 0)",
          backgroundSize: "24px 24px",
          height: width > 0 ? `${height}px` : "auto"
        }}
      >
        {width > 0 && (
          <svg
            viewBox={`0 0 ${width} ${height}`}
            height={height}
            className="block w-full min-w-0"
            aria-label="Technical skills architecture diagram"
          >
            <defs>
              <filter id="skill-glow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <marker id="skill-arrow" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill={accent} opacity="0.5" />
              </marker>
            </defs>

            {/* Render Edges (Paths) first so they go behind nodes */}
            {edges.map((edge, index) => {
              const from = positions[edge.from];
              const to = positions[edge.to];
              if (!from || !to) return null;

              const startX = from.x + from.w;
              const startY = from.y + from.h / 2;
              const endX = to.x;
              const endY = to.y + to.h / 2;
              const controlX1 = startX + (endX - startX) * 0.5;
              const controlX2 = endX - (endX - startX) * 0.5;
              const pathId = `skill-path-${index}`;
              const d = `M${startX},${startY} C${controlX1},${startY} ${controlX2},${endY} ${endX},${endY}`;

              const isHighlighted =
                hoveredNode === edge.from ||
                hoveredNode === edge.to ||
                activeId === edge.from ||
                activeId === edge.to;

              return (
                <g key={pathId}>
                  <path
                    id={pathId}
                    d={d}
                    fill="none"
                    stroke={accent}
                    strokeWidth={isHighlighted ? 2.2 : 1.3}
                    strokeDasharray={isHighlighted ? "none" : "6 4"}
                    opacity={isHighlighted ? 0.75 : 0.16}
                    className="transition-all duration-300"
                    markerEnd="url(#skill-arrow)"
                  />
                  <circle
                    r={isHighlighted ? 5 : 3.5}
                    fill={accent}
                    filter="url(#skill-glow)"
                    opacity={isHighlighted ? 0.95 : 0.7}
                  >
                    <animateMotion
                      dur={`${(isHighlighted ? 1400 : 2800) + index * 400}ms`}
                      repeatCount="indefinite"
                      begin={`${index * 150}ms`}
                    >
                      <mpath href={`#${pathId}`} />
                    </animateMotion>
                  </circle>
                </g>
              );
            })}

            {/* Render Nodes */}
            {nodes.map((node) => {
              const pos = positions[node.id];
              if (!pos) return null;
              const { x, y, w, h } = pos;
              const centerX = x + w / 2;
              const fontSize = Math.max(9.2, Math.min(10.8, Math.floor(w * 0.054)));
              const isActive = node.id === activeId;
              const isHovered = node.id === hoveredNode;

              return (
                <g
                  key={node.id}
                  className="cursor-pointer select-none"
                  onClick={() => setActiveId(node.id)}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  {/* Glowing background underlay */}
                  {(isActive || isHovered) && (
                    <rect
                      x={x - 4}
                      y={y - 4}
                      width={w + 8}
                      height={h + 8}
                      rx="16"
                      fill="none"
                      stroke={accent}
                      strokeWidth="1.5"
                      strokeOpacity="0.15"
                      className="transition-all duration-300"
                    />
                  )}
                  {/* Node shape */}
                  <rect
                    x={x}
                    y={y}
                    width={w}
                    height={h}
                    rx="13"
                    fill={isActive ? "rgba(143,178,255,.05)" : "#070810"}
                    stroke={accent}
                    strokeWidth={isActive || isHovered ? 1.8 : 1.3}
                    strokeOpacity={isActive ? 0.85 : isHovered ? 0.6 : 0.22}
                    className="transition-all duration-300"
                    style={{
                      filter: isActive || isHovered ? "drop-shadow(0 0 12px rgba(143,178,255,0.18))" : "none"
                    }}
                  />
                  {/* Category Accent top border */}
                  <rect
                    x={x + 13}
                    y={y}
                    width={w - 26}
                    height="2.5"
                    rx="1.25"
                    fill={accent}
                    opacity={isActive ? 0.9 : isHovered ? 0.75 : 0.32}
                    className="transition-all duration-300"
                  />
                  {/* Node Category Title */}
                  <text
                    x={centerX}
                    y={y + 17}
                    textAnchor="middle"
                    fontFamily="JetBrains Mono,monospace"
                    fontSize="9.5"
                    fontWeight="900"
                    fill={isActive || isHovered ? "#fff" : accent}
                    opacity={isActive || isHovered ? 1 : 0.75}
                    letterSpacing="1.2"
                    className="transition-all duration-300"
                  >
                    {node.label.toUpperCase()}
                  </text>
                  {/* Skill List items */}
                  {node.skills.map((skill, idx) => {
                    const textY = y + 31 + idx * ((h - 34) / node.skills.length);
                    return (
                      <text
                        key={skill}
                        x={x + 13}
                        y={textY}
                        fontFamily="JetBrains Mono,monospace"
                        fontSize={fontSize}
                        fill={isActive ? "#eef2f7" : isHovered ? "#d4e4f5" : "#a2b4c5"}
                        opacity={isActive || isHovered ? 1 : 0.8}
                        className="transition-all duration-300"
                      >
                        <tspan fill={accent} opacity={isActive || isHovered ? 0.8 : 0.55}>› </tspan>
                        {skill}
                      </text>
                    );
                  })}
                </g>
              );
            })}
          </svg>
        )}
      </div>
    </section>
  );
}
