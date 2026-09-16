import { ReactNode } from "react";

interface SectionLayoutProps {
  label: string;
  title: string;
  children: ReactNode;
  /** Custom classes for the main wrapper */
  className?: string;
  scrollable?: boolean;
}

export default function SectionLayout({
  label,
  title,
  children,
  className = "",
}: SectionLayoutProps) {
  return (
    <section className={`relative w-full h-full min-h-0 flex flex-col justify-start items-stretch py-1 sm:py-2 ${className}`}>
      {/* ─── FIXED SECTION HEADER ─── */}
      <div className="flex-shrink-0 mb-2.5 sm:mb-3.5 text-center w-full max-w-full">
        <div className="mb-1 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[2px] text-[var(--accent)] font-mono">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--green)] animate-pulse-ring" />
          {label}
        </div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black leading-tight tracking-tight text-white text-center">
          {title}
        </h2>
      </div>

      {/* ─── INTERNAL SCROLLABLE CONTENT BOX ─── */}
      <div className="w-full flex-1 min-h-0 flex flex-col justify-start items-stretch overflow-y-auto overflow-x-hidden pr-1 sm:pr-2 overscroll-contain pb-16">
        {children}
      </div>
    </section>
  );
}


