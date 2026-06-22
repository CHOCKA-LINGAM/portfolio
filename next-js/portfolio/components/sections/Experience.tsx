"use client";
import { EXPERIENCE, type ExperienceItem } from "@/data/index";

// ─── Edit data/experience.json to add / remove / reorder roles ────

export default function Experience() {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-[11px] font-bold text-[var(--accent)] uppercase tracking-[2px] mb-3">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] animate-pulse-ring" />
        Professional Experience
      </div>
      <h2 className="text-[clamp(32px,4.5vw,50px)] font-black tracking-[-2.5px] text-white leading-none mb-10">
        Career History
      </h2>

      <div className="w-full max-w-[860px] mx-auto flex flex-col relative overflow-hidden">
        {/* vertical line */}
        <div className="absolute left-0 top-2.5 bottom-2.5 w-px"
          style={{ background: "linear-gradient(to bottom, transparent, var(--border) 10%, var(--border) 90%, transparent)" }} />

        {(EXPERIENCE as ExperienceItem[]).map(exp => (
          <div key={exp.id}
            className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-6 sm:gap-7 py-7 pl-7 relative transition-all hover:pl-9 border-b last:border-b-0"
            style={{ borderColor: "rgba(255,255,255,.04)" }}>

            {/* dot */}
            <div className="absolute left-[-5px] top-[34px] w-[11px] h-[11px] rounded-full border-2"
              style={{ background: "var(--accent)", borderColor: "var(--bg)", boxShadow: "0 0 12px rgba(var(--ar),.5)" }} />

            {/* meta */}
            <div>
              <div className="font-mono text-[10px] font-bold uppercase tracking-[.5px] mb-1"
                style={{ color: exp.statusColor === "accent" ? "var(--accent)" : "var(--muted)" }}>
                {exp.status}
              </div>
              <div className="font-mono text-[9px] opacity-60 text-[var(--muted)]">{exp.period}</div>
            </div>

            {/* content */}
            <div>
              <div className="text-[20px] font-black tracking-[-0.7px] text-white mb-1">{exp.role}</div>
              <div className="text-[13px] text-[var(--muted)] mb-3 font-semibold">
                {exp.company} · {exp.location}
              </div>
              {exp.description && (
                <div className="text-[13px] leading-[1.78] text-[var(--muted)] mb-3 max-w-[580px]">
                  {exp.description}
                </div>
              )}
              <div className="flex flex-wrap gap-1.5">
                {exp.tags.map(t => (
                  <span key={t} className="px-2.5 py-1 rounded-[7px] text-[10px] font-bold text-[var(--muted2)]"
                    style={{ border: "1px solid rgba(255,255,255,.04)", background: "rgba(255,255,255,.02)" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
