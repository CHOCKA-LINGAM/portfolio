"use client";
import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { PROJECTS, type Project } from "@/data/index";

// ─── Edit data/projects.json to add / remove / reorder projects ───
// Tags used for filtering — add new tags here if you add them to JSON
const FILTERS = [
  { id: "all",       label: "All Projects" },
  { id: "ai",        label: "AI / GenAI"   },
  { id: "data",      label: "Data / ETL"   },
  { id: "oss",       label: "Open Source"  },
  { id: "fullstack", label: "Fullstack"    },
];

// Use a plain predicate instead of a one-use Set for readability
const isPublished = (p: Project) => p.project_status === "active";

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const [query,  setQuery]  = useState("");

  const visible = (PROJECTS as Project[]).filter(p => {
    const matchF = filter === "all" || p.tags.includes(filter);
    const matchQ = !query || [p.title, p.desc, ...p.stack].join(" ").toLowerCase().includes(query.toLowerCase());
    return isPublished(p) && matchF && matchQ;
  });

  return (
    <section className="flex h-full min-h-0 flex-col py-4">

      {/* Section label */}
      <div className="flex items-center gap-1.5 text-[11px] font-bold text-[var(--accent)] uppercase tracking-[2px] mb-3">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] animate-pulse-ring" />
        Project Portfolio
      </div>
      <h2 className="text-[clamp(32px,4.5vw,50px)] font-black tracking-[-2.5px] text-white leading-none mb-8">
        Highlighted Projects
      </h2>

      {/* ── Filters ── */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search stack, title, or keyword…"
          className="flex-1 min-w-[200px] rounded-[11px] px-4 py-2.5 text-white font-mono text-[12px] outline-none transition-all focus:border-[rgba(var(--ar),.3)]"
          style={{ background: "rgba(255,255,255,.02)", border: "1px solid var(--border)" }}
        />
        <div className="flex gap-1.5 flex-wrap">
          {FILTERS.map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-3.5 py-2 rounded-[9px] text-[10px] font-extrabold uppercase tracking-[.8px] transition-all border ${
                filter === f.id
                  ? "text-[var(--accent)] bg-[rgba(var(--ar),.12)] border-[rgba(var(--ar),.3)]"
                  : "text-[var(--muted)] hover:text-white border-white/[.07] bg-[rgba(255,255,255,.02)]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Cards ── */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        {visible.length === 0 ? (
          <div className="text-[var(--muted)] text-[14px] py-12 text-center">
            No projects match — try a different filter or search term.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-2">
            {visible.map((p, i) => (
              <div
                key={p.id}
                className="animate-card-in flex flex-col rounded-[20px] p-6 relative overflow-hidden transition-all duration-[320ms] hover:-translate-y-1 hover:shadow-[0_22px_48px_-10px_rgba(0,0,0,.5)] hover:border-[rgba(var(--ar),.22)] group"
                style={{
                  background: "rgba(7,8,16,.9)",
                  border: "1px solid var(--border)",
                  animationDelay: `${i * 0.05}s`,
                  willChange: "transform, box-shadow",
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-[320ms] pointer-events-none"
                  style={{ background: "radial-gradient(circle at 100% 0%, rgba(var(--ar),.08), transparent)" }}
                />

                {/* Header row: project id + status badge */}
                <div className="flex justify-between items-center mb-3">
                  <span className="font-mono text-[9px] text-[var(--muted)] opacity-50">{p.id}</span>
                  <span className="font-mono text-[9px] font-extrabold text-[var(--green)] uppercase tracking-[.5px]">{p.status}</span>
                </div>

                {/* Title + description */}
                <div className="text-[18px] font-black tracking-[-0.6px] text-white mb-2">{p.title}</div>
                <div className="text-[13px] leading-[1.72] text-[var(--muted)] mb-4 flex-1">{p.desc}</div>

                {/* Stack tags */}
                <div className="flex flex-wrap gap-1.5 mb-3.5">
                  {p.stack.map(s => (
                    <span
                      key={s}
                      className="font-mono text-[9px] font-bold px-2.5 py-[3px] rounded-[6px] uppercase tracking-[.4px]"
                      style={{ background: "rgba(var(--ar),.07)", border: "1px solid rgba(var(--ar),.15)", color: "rgba(var(--ar),1)" }}
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Footer link */}
                <div className="flex gap-3 border-t pt-3.5" style={{ borderColor: "rgba(255,255,255,.04)" }}>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-[11px] font-extrabold text-[var(--muted2)] hover:text-[var(--accent)] transition-colors"
                  >
                    <ExternalLink size={12} /> Details
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
