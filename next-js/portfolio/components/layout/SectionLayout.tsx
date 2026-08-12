import { ReactNode } from "react";

interface SectionLayoutProps {
  label: string;
  title: string;
  children: ReactNode;
  /** Custom classes for the main wrapper */
  className?: string;
  /** Whether the children container should scroll. Default: true */
  scrollable?: boolean;
}

export default function SectionLayout({
  label,
  title,
  children,
  className = "",
  scrollable = true,
}: SectionLayoutProps) {
  return (
    <section className={`relative h-full w-full flex flex-col items-center py-2 sm:py-3 ${className}`}>
      {/* ─── CENTERED SECTION HEADER ─── */}
      <div className="flex-shrink-0 mb-3 sm:mb-4 text-center w-full">
        <div className="mb-1 inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[2px] text-[var(--accent)] font-mono">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--green)] animate-pulse-ring" />
          {label}
        </div>
        <h2 className="text-[clamp(22px,3.5vw,38px)] font-black leading-tight tracking-tight text-white">
          {title}
        </h2>
      </div>

      {/* ─── SCROLLABLE CONTENT CONTAINER (justify-start prevents top/bottom truncation!) ─── */}
      <div
        className={`w-full flex-1 min-h-0 flex flex-col justify-start items-stretch ${
          scrollable ? "overflow-y-auto pr-1 sm:pr-2 overscroll-contain" : "overflow-hidden"
        }`}
      >
        {children}
      </div>
    </section>
  );
}
