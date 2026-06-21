"use client";
import { useEffect, useRef } from "react";
import { DAG_NODES, DAG_EDGES, type DagNode, type DagEdge } from "@/data/index";

// ─── Edit data/skills.json to update nodes and edges ─────────────

export default function Skills() {
  const svgRef  = useRef<SVGSVGElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);

  function drawDag() {
    const svg = svgRef.current; const outer = outerRef.current;
    if (!svg || !outer) return;
    const W = outer.clientWidth;
    const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#8fb2ff";
    const isMobile = W < 640;
    const nodes = DAG_NODES as DagNode[];
    const edges = DAG_EDGES as DagEdge[];

    if (isMobile) {
      const NW = W - 32, NH = 100, GAP = 52, PAD = 16;
      const TOTAL_H = nodes.length * (NH + GAP) + PAD * 2 - GAP;
      svg.setAttribute("viewBox", `0 0 ${W} ${TOTAL_H}`);
      svg.setAttribute("height", String(TOTAL_H));
      outer.style.height = TOTAL_H + "px";
      const mNodes: Record<string, { x:number; y:number; w:number; h:number }> = {};
      nodes.forEach((n, i) => { mNodes[n.id] = { x:PAD, y:PAD+i*(NH+GAP), w:NW, h:NH }; });
      let s = `<defs><filter id="gf" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter><marker id="arr" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="${accent}" opacity="0.45"/></marker></defs>`;
      for (let gx=0;gx<W;gx+=24) for (let gy=0;gy<TOTAL_H;gy+=24) s+=`<circle cx="${gx}" cy="${gy}" r=".7" fill="rgba(255,255,255,.015)"/>`;
      nodes.forEach((n, i) => {
        if (i === nodes.length-1) return;
        const a=mNodes[n.id], b=mNodes[nodes[i+1].id];
        const x1=a.x+a.w/2, y1=a.y+a.h, x2=b.x+b.w/2, y2=b.y, pid=`mep${i}`;
        s+=`<path id="${pid}" d="M${x1},${y1} C${x1},${(y1+y2)/2} ${x2},${(y1+y2)/2} ${x2},${y2}" fill="none" stroke="${accent}" stroke-width="1.5" stroke-dasharray="5 4" opacity="0.22" marker-end="url(#arr)"/>`;
        s+=`<circle r="3.5" fill="${accent}" filter="url(#gf)" opacity="0.8"><animateMotion dur="${1800+i*400}ms" repeatCount="indefinite" begin="${i*300}ms"><mpath href="#${pid}"/></animateMotion></circle>`;
      });
      nodes.forEach(n => {
        const {x,y,w,h}=mNodes[n.id], cx=x+w/2, R=10;
        s+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${R}" fill="#080912" stroke="${accent}" stroke-width="1.2" stroke-opacity="0.2"/>`;
        s+=`<rect x="${x+R}" y="${y}" width="${w-R*2}" height="2" rx="1" fill="${accent}" opacity="0.3"/>`;
        s+=`<text x="${cx}" y="${y+16}" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="9" font-weight="900" fill="${accent}" opacity="0.8" letter-spacing="1.2">${n.label.toUpperCase()}</text>`;
        const cols = NW < 260 ? 1 : 2;
        const cellW = (w - 24) / cols;
        n.skills.forEach((sk, si) => {
          const col=si%cols, row=Math.floor(si/cols), tx=x+12+col*cellW, ty=y+30+row*22;
          if (ty+10>y+h) return;
          s+=`<text x="${tx}" y="${ty}" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#9ab0c4" opacity="0.85"><tspan fill="${accent}" opacity="0.45">› </tspan>${sk}</text>`;
        });
      });
      svg.innerHTML = s; return;
    }

    const NW=Math.min(Math.max(Math.floor(W*0.185),145),220);
    const NH=Math.min(Math.max(Math.floor(NW*0.70),92),150);
    const PAD=Math.floor(W*0.03), H=Math.floor(NH*3.4+PAD*2);
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    svg.setAttribute("height", String(H));
    outer.style.height = H+"px";
    const pos: Record<string, {x:number;y:number;w:number;h:number}> = {};
    nodes.forEach(n => { pos[n.id]={x:PAD+n.x*(W-PAD*2-NW), y:PAD+n.y*(H-PAD*2-NH), w:NW, h:NH}; });
    let s = `<defs><filter id="gf" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter><filter id="nf" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="10" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter><marker id="arr" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="${accent}" opacity="0.5"/></marker></defs>`;
    for(let gx=0;gx<W;gx+=28) for(let gy=0;gy<H;gy+=28) s+=`<circle cx="${gx}" cy="${gy}" r=".8" fill="rgba(255,255,255,.018)"/>`;
    edges.forEach((e, i) => {
      const a=pos[e.from], b=pos[e.to];
      if (!a || !b) return;
      const ax=a.x+a.w, ay=a.y+a.h/2, bx=b.x, by=b.y+b.h/2;
      const cx1=ax+(bx-ax)*.5, cx2=bx-(bx-ax)*.5, pid=`ep${i}`;
      s+=`<path id="${pid}" d="M${ax},${ay} C${cx1},${ay} ${cx2},${by} ${bx},${by}" fill="none" stroke="${accent}" stroke-width="1.5" stroke-dasharray="6 4" opacity="0.2" marker-end="url(#arr)"/>`;
      s+=`<circle r="4" fill="${accent}" filter="url(#gf)" opacity="0.85"><animateMotion dur="${2800+i*650}ms" repeatCount="indefinite" begin="${i*480}ms"><mpath href="#${pid}"/></animateMotion></circle>`;
    });
    nodes.forEach(n => {
      const {x,y,w,h}=pos[n.id], cx=x+w/2, R=13, fs=Math.max(9,Math.min(10.5,Math.floor(w*0.052)));
      s+=`<ellipse cx="${cx}" cy="${y+4}" rx="${w*.42}" ry="11" fill="${accent}" opacity="0.06" filter="url(#nf)"/>`;
      s+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${R}" fill="#080912" stroke="${accent}" stroke-width="1.3" stroke-opacity="0.2"/>`;
      s+=`<rect x="${x+R}" y="${y}" width="${w-R*2}" height="2.5" rx="1.25" fill="${accent}" opacity="0.32"/>`;
      s+=`<text x="${cx}" y="${y+17}" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="9" font-weight="900" fill="${accent}" opacity="0.85" letter-spacing="1.2">${n.label.toUpperCase()}</text>`;
      n.skills.forEach((sk, si) => {
        const ty = y+30+(si*(h-32)/n.skills.length);
        s+=`<text x="${x+13}" y="${ty}" font-family="JetBrains Mono,monospace" font-size="${fs}" fill="#b0c3d5" opacity="0.85"><tspan fill="${accent}" opacity="0.45">› </tspan>${sk}</text>`;
      });
    });
    svg.innerHTML = s;
  }

  useEffect(() => {
    setTimeout(drawDag, 100);
    window.addEventListener("resize", drawDag);
    return () => window.removeEventListener("resize", drawDag);
  }, []);

  return (
    <div>
      <div className="flex items-center gap-1.5 text-[11px] font-bold text-[var(--accent)] uppercase tracking-[2px] mb-3">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] animate-pulse-ring" />
        Skills Overview
      </div>
      <h2 className="text-[clamp(32px,4.5vw,50px)] font-black tracking-[-2.5px] text-white leading-none mb-8">
        Technical Skills
      </h2>
      <div ref={outerRef} className="relative w-full border border-white/[.07] rounded-3xl overflow-hidden"
        style={{ backgroundImage:"radial-gradient(circle at 1px 1px, rgba(255,255,255,.02) 1px, transparent 0)", backgroundSize:"24px 24px" }}>
        <svg ref={svgRef} className="block w-full overflow-visible" />
      </div>
    </div>
  );
}
