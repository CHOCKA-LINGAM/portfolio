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
  const svgRef = useRef<SVGSVGElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const activeNode = nodes.find((node) => node.id === activeId) ?? nodes[0];

  useEffect(() => {
    function drawDag() {
      const svg = svgRef.current;
      const outer = outerRef.current;
      if (!svg || !outer || outer.clientWidth < 1) return;

      const width = outer.clientWidth;
      const accent =
        getComputedStyle(document.documentElement)
          .getPropertyValue("--accent")
          .trim() || "#8fb2ff";
      const nodeWidth = Math.min(Math.max(Math.floor(width * 0.185), 145), 220);
      const nodeHeight = Math.min(Math.max(Math.floor(nodeWidth * 0.7), 92), 142);
      const padding = Math.floor(width * 0.03);
      const height = Math.floor(nodeHeight * 3.15 + padding * 2);
      const positions: Record<
        string,
        { x: number; y: number; w: number; h: number }
      > = {};

      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
      svg.setAttribute("height", String(height));
      outer.style.height = `${height}px`;

      nodes.forEach((node) => {
        positions[node.id] = {
          x: padding + node.x * (width - padding * 2 - nodeWidth),
          y: padding + node.y * (height - padding * 2 - nodeHeight),
          w: nodeWidth,
          h: nodeHeight,
        };
      });

      let markup = `<defs>
        <filter id="skill-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="4" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <marker id="skill-arrow" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="${accent}" opacity="0.5"/>
        </marker>
      </defs>`;

      edges.forEach((edge, index) => {
        const from = positions[edge.from];
        const to = positions[edge.to];
        if (!from || !to) return;

        const startX = from.x + from.w;
        const startY = from.y + from.h / 2;
        const endX = to.x;
        const endY = to.y + to.h / 2;
        const controlX1 = startX + (endX - startX) * 0.5;
        const controlX2 = endX - (endX - startX) * 0.5;
        const pathId = `skill-path-${index}`;

        markup += `<path id="${pathId}" d="M${startX},${startY} C${controlX1},${startY} ${controlX2},${endY} ${endX},${endY}" fill="none" stroke="${accent}" stroke-width="1.5" stroke-dasharray="6 4" opacity="0.2" marker-end="url(#skill-arrow)"/>`;
        markup += `<circle r="4" fill="${accent}" filter="url(#skill-glow)" opacity="0.85"><animateMotion dur="${2800 + index * 650}ms" repeatCount="indefinite" begin="${index * 480}ms"><mpath href="#${pathId}"/></animateMotion></circle>`;
      });

      nodes.forEach((node) => {
        const { x, y, w, h } = positions[node.id];
        const centerX = x + w / 2;
        const fontSize = Math.max(9, Math.min(10.5, Math.floor(w * 0.052)));

        markup += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="13" fill="#080912" stroke="${accent}" stroke-width="1.3" stroke-opacity="0.2"/>`;
        markup += `<rect x="${x + 13}" y="${y}" width="${w - 26}" height="2.5" rx="1.25" fill="${accent}" opacity="0.32"/>`;
        markup += `<text x="${centerX}" y="${y + 17}" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="9" font-weight="900" fill="${accent}" opacity="0.85" letter-spacing="1.2">${node.label.toUpperCase()}</text>`;

        node.skills.forEach((skill, index) => {
          const textY = y + 30 + index * ((h - 32) / node.skills.length);
          markup += `<text x="${x + 13}" y="${textY}" font-family="JetBrains Mono,monospace" font-size="${fontSize}" fill="#b0c3d5" opacity="0.85"><tspan fill="${accent}" opacity="0.55">› </tspan>${skill}</text>`;
        });
      });

      svg.innerHTML = markup;
    }

    const frame = window.requestAnimationFrame(drawDag);
    window.addEventListener("resize", drawDag);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", drawDag);
    };
  }, []);

  return (
    <section className="flex h-full min-h-0 flex-col">
      <div className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[2px] text-[var(--accent)]">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--green)] animate-pulse-ring" />
        Skills Overview
      </div>
      <h2 className="mb-5 text-[clamp(32px,4.5vw,50px)] font-black leading-none tracking-[-2.5px] text-white lg:mb-8">
        Technical Skills
      </h2>

      <div className="flex min-h-0 flex-1 flex-col lg:hidden">
        <div
          className="grid grid-cols-2 gap-2 sm:grid-cols-3"
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
                className={`rounded-xl px-3 py-2.5 text-left font-mono text-[10px] font-bold uppercase tracking-[.6px] transition ${
                  selected
                    ? "text-white ring-1 ring-inset ring-[rgba(var(--ar),.32)]"
                    : "text-[var(--muted)] ring-1 ring-inset ring-white/[.07] hover:text-white"
                }`}
                style={{
                  background: selected
                    ? "rgba(var(--ar),.12)"
                    : "rgba(255,255,255,.025)",
                }}
              >
                <span className="mb-1 block text-[8px] text-[var(--accent)] opacity-60">
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
            className="mt-3 flex min-h-0 flex-1 flex-col rounded-2xl border border-[rgba(var(--ar),.18)] p-4 sm:p-5"
            style={{
              background:
                "radial-gradient(circle at 100% 0%, rgba(var(--ar),.1), transparent 45%), rgba(7,8,16,.92)",
            }}
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-mono text-[12px] font-extrabold uppercase tracking-[1.2px] text-[var(--accent)]">
                {displayLabel(activeNode.label)}
              </h3>
              <span className="text-[10px] font-bold text-[var(--muted)]">
                {activeNode.skills.length} capabilities
              </span>
            </div>
            <div className="grid grid-cols-1 gap-2 min-[390px]:grid-cols-2">
              {activeNode.skills.map((skill) => (
                <div
                  key={skill}
                  className="flex min-w-0 items-center gap-2 rounded-lg border border-white/[.05] bg-white/[.025] px-3 py-2.5 text-[11px] font-semibold text-[var(--muted2)]"
                >
                  <span className="h-1.5 w-1.5 flex-none rounded-full bg-[var(--accent)] shadow-[0_0_8px_rgba(var(--ar),.6)]" />
                  <span className="truncate">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div
        ref={outerRef}
        className="relative hidden w-full max-w-full overflow-hidden rounded-3xl border border-white/[.07] lg:block"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,.02) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      >
        <svg ref={svgRef} className="block w-full min-w-0" aria-label="Technical skills architecture diagram" />
      </div>
    </section>
  );
}
