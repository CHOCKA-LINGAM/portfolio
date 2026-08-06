"use client";
import { motion } from "framer-motion";
import { EXPERIENCE, type ExperienceItem } from "@/data/index";
import SectionLayout from "@/components/layout/SectionLayout";

// ─── Edit data/experience.json to add / remove / reorder roles ────

export default function Experience() {
  return (
    <SectionLayout label="Professional Experience" title="Career History">

      {/* Timeline — scrollable */}
      <div className="flex-1 min-h-0 overflow-y-auto pb-4">
        <div className="w-full max-w-[860px] mx-auto flex flex-col relative">

          {/* Vertical line (timeline backbone) */}
          <div
            className="absolute left-[38px] sm:left-[178px] top-6 bottom-6 w-px hidden sm:block"
            style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.06) 10%, rgba(255,255,255,0.06) 90%, transparent)" }}
          />

          {(EXPERIENCE as ExperienceItem[]).map((exp, i) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              key={exp.id}
              className="group grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-4 sm:gap-7 mb-6 relative"
            >
              {/* Meta: status + period (Left Column) */}
              <div className="pt-5 sm:text-right flex flex-row sm:flex-col items-center sm:items-end gap-3 sm:gap-0 pl-4 sm:pl-0">
                <div
                  className="font-mono text-[10px] font-bold uppercase tracking-[.5px] sm:mb-1"
                  style={{ color: exp.statusColor === "accent" ? "var(--accent)" : "var(--muted)" }}
                >
                  {exp.status}
                </div>
                <div className="font-mono text-[9px] opacity-60 text-[var(--muted)]">{exp.period}</div>
              </div>

              {/* Card Content (Right Column) */}
              <div
                className="relative rounded-[20px] p-6 sm:p-7 transition-all duration-[320ms] hover:-translate-y-1 hover:shadow-[0_22px_48px_-10px_rgba(0,0,0,.5)] hover:border-[rgba(var(--ar),.22)]"
                style={{
                  background: "rgba(12,14,28,.95)",
                  border: "1px solid var(--border)",
                  backdropFilter: "blur(12px)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
                  willChange: "transform, box-shadow",
                }}
              >
                {/* Timeline dot (absolutely positioned relative to the right column) */}
                <div
                  className="absolute left-[-16px] sm:left-[-33px] top-[34px] w-[11px] h-[11px] rounded-full border-2 transition-transform duration-300 group-hover:scale-[1.6] hidden sm:block"
                  style={{ background: "var(--accent)", borderColor: "var(--bg)", boxShadow: "0 0 12px rgba(var(--ar),.5)" }}
                />

                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-[320ms] pointer-events-none rounded-[20px]"
                  style={{ background: "radial-gradient(circle at 100% 0%, rgba(var(--ar),.08), transparent)" }}
                />

                <div className="text-[20px] font-black tracking-[-0.7px] text-white mb-1">{exp.role}</div>
                <div className="text-[13px] text-[var(--muted)] mb-4 font-semibold">{exp.company}</div>
                
                {exp.description && (
                  <div className="text-[13px] leading-[1.78] text-[var(--muted)] mb-5">
                    {exp.description}
                  </div>
                )}
                
                <div className="flex flex-wrap gap-1.5">
                  {exp.tags.map(t => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-[7px] text-[10px] font-bold text-[var(--muted2)]"
                      style={{ border: "1px solid rgba(255,255,255,.04)", background: "rgba(255,255,255,.02)" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionLayout>
  );
}
