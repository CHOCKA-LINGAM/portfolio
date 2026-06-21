"use client";
import { useState } from "react";
import { Github, ExternalLink } from "lucide-react";
import { PROJECTS, type Project } from "@/data/index";

// ─── Edit data/projects.json to add / remove / reorder projects ───
// Tags used for filtering — add new tags here if you add them to JSON
const FILTERS = [
  { id: "all", label: "All Projects" },
  { id: "ai", label: "AI / GenAI" },
  { id: "data", label: "Data / ETL" },
  { id: "oss", label: "Open Source" },
  { id: "fullstack", label: "Fullstack" },
];

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  const visible = (PROJECTS as Project[]).filter(p => {
    const matchF = filter === "all" || p.tags.includes(filter);
    const matchQ = !query || [p.title, p.desc, ...p.stack].join(" ").toLowerCase().includes(query.toLowerCase());
    const matchStatus = p.project_status === "active";
    return matchF && matchQ && matchStatus;
  });


  return (
    <div>
      <div className="flex items-center gap-1.5 text-[11px] font-bold text-[var(--accent)] uppercase tracking-[2px] mb-3">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] animate-pulse-ring" />
        Project Portfolio
      </div>
      <h2 className="text-[clamp(32px,4.5vw,50px)] font-black tracking-[-2.5px] text-white leading-none mb-8">
      Highlighted Projects
      </h2>

      {/* ── Filters ── */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <input
          value={query} onChange={e => setQuery(e.target.value)}
          placeholder="Search stack, title, or keyword…"
          className="flex-1 min-w-[200px] rounded-[11px] px-4 py-2.5 text-white font-mono text-[12px] outline-none transition-all focus:border-[rgba(var(--ar),.3)]"
          style={{ background: "rgba(255,255,255,.02)", border: "1px solid var(--border)" }}
        />
        <div className="flex gap-1.5 flex-wrap">
          {FILTERS.map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)}
              className={`px-3.5 py-2 rounded-[9px] text-[10px] font-extrabold uppercase tracking-[.8px] transition-all border ${filter === f.id
                  ? "text-[var(--accent)] bg-[rgba(var(--ar),.12)] border-[rgba(var(--ar),.3)]"
                  : "text-[var(--muted)] hover:text-white border-white/[.07] bg-[rgba(255,255,255,.02)]"
                }`}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Cards ── */}
      {visible.length === 0 ? (
        <div className="text-[var(--muted)] text-[14px] py-12 text-center">
          No projects match — try a different filter or search term.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[18px]">
          {visible.map((p, i) => (
            <div key={p.id}
              className="animate-card-in flex flex-col rounded-[20px] p-6 relative overflow-hidden transition-all duration-[320ms] hover:-translate-y-1 hover:shadow-[0_22px_48px_-10px_rgba(0,0,0,.5)] hover:border-[rgba(var(--ar),.22)] group"
              style={{ background: "rgba(7,8,16,.9)", border: "1px solid var(--border)", animationDelay: `${i * .05}s` }}>

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-[320ms] pointer-events-none"
                style={{ background: "radial-gradient(circle at 100% 0%, rgba(var(--ar),.08), transparent)" }} />

              <div className="flex justify-between items-center mb-3">
                <span className="font-mono text-[9px] text-[var(--muted)] opacity-50">PRJ_{i+1}</span>
                <span className="font-mono text-[9px] font-extrabold text-[var(--green)] uppercase tracking-[.5px]">{p.status}</span>
              </div>
              <div className="text-[18px] font-black tracking-[-0.6px] text-white mb-2">{p.title}</div>
              <div className="text-[13px] leading-[1.72] text-[var(--muted)] mb-4 flex-1">{p.desc}</div>

              <div className="flex flex-wrap gap-1.5 mb-3.5">
                {p.stack.map(s => (
                  <span key={s} className="font-mono text-[9px] font-bold px-2.5 py-[3px] rounded-[6px] uppercase tracking-[.4px] opacity-80"
                    style={{ background: "rgba(var(--ar),.07)", border: "1px solid rgba(var(--ar),.15)", color: "rgba(var(--ar),1)" }}>
                    {s}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 border-t pt-3.5" style={{ borderColor: "rgba(255,255,255,.04)" }}>
                {/* <a href={p.github} target="_blank" rel="noreferrer"
                  className="flex items-center gap-1.5 text-[11px] font-extrabold text-[var(--muted2)] hover:text-[var(--accent)] transition-colors">
                  <Github size={12} /> GitHub
                </a> */}
                <a href={p.link} target="_blank" rel="noreferrer"
                  className="flex items-center gap-1.5 text-[11px] font-extrabold text-[var(--muted2)] hover:text-[var(--accent)] transition-colors">
                  <ExternalLink size={12} /> Details
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
