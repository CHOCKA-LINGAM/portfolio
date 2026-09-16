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
  return (
    <section className={`relative w-full flex flex-col justify-start items-stretch py-1 ${className}`}>
      {/* ─── SECTION HEADER ─── */}
      <div className="flex-shrink-0 mb-3 sm:mb-4 text-center w-full max-w-full">
        {sectionNumber && (
          <div className="mb-2">
            <span className="text-[10px] font-mono tracking-widest text-[var(--accent)] uppercase font-bold bg-[var(--surface-2)] px-3 py-1 rounded-full border border-[var(--border-strong)] shadow-sm">
              SECTION {sectionNumber}
            </span>
          </div>
        )}
        <div className="mb-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-[2px] text-[var(--accent)] font-sans w-full">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--green)] animate-pulse-ring" />
          {label}
        </div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold leading-tight tracking-tight text-[var(--text)] text-center">
          {title}
        </h2>
      </div>

      {/* ─── NATURAL FLOW CONTENT CONTAINER ─── */}
      <div className="w-full flex flex-col justify-start items-stretch pb-4 sm:pb-6">
        {children}
      </div>
    </section>
  );
}



