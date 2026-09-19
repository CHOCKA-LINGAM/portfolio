import { ReactNode } from "react";

interface SectionLayoutProps {
  label: string;
  title: string;
  children: ReactNode;
  /** Custom classes for the main wrapper */
  className?: string;
  scrollable?: boolean;
  sectionNumber?: string;
}

export default function SectionLayout({
  label,
  title,
  children,
  className = "",
  sectionNumber,
}: SectionLayoutProps) {
  const headingId = `heading-${label.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;

  return (
    <section 
      aria-labelledby={headingId}
      className={`relative w-full flex flex-col justify-start items-stretch py-4 sm:py-6 ${className}`}
    >
      {/* ─── STUDIO SECTION HEADER ─── */}
      <div className="flex flex-col items-center text-center w-full max-w-full mb-6 sm:mb-8">
        {sectionNumber && (
          <div className="mb-2.5">
            <span className="text-[11px] font-mono tracking-[0.2em] text-[var(--accent)] uppercase font-bold bg-[var(--surface-2)] px-3.5 py-1 rounded-full border border-[var(--border-strong)] shadow-sm -rotate-[0.5deg] inline-block">
              {sectionNumber}
            </span>
          </div>
        )}
        <div className="mb-1.5 inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[2.5px] text-[var(--accent)] font-mono w-full">
          <span className="h-2 w-2 rounded-full bg-[var(--green)] animate-pulse-ring" />
          {label}
        </div>
        <h2 id={headingId} className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold leading-tight tracking-tight text-[var(--text)] text-center max-w-3xl">
          {title}
        </h2>
      </div>

      {/* ─── NATURAL FLOW CONTENT CONTAINER ─── */}
      <div className="w-full flex flex-col justify-start items-stretch">
        {children}
      </div>
    </section>
  );
}



