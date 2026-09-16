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
    <section className={`relative w-full flex flex-col justify-start items-stretch py-1 ${className}`}>
      {/* ─── SECTION HEADER ─── */}
      <div className="flex-shrink-0 mb-3 sm:mb-4 text-center w-full max-w-full">
        <div className="mb-1 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[2px] text-[var(--accent)] font-sans">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--green)] animate-pulse-ring" />
          {label}
        </div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold leading-tight tracking-tight text-white text-center">
          {title}
        </h2>
      </div>

      {/* ─── NATURAL FLOW CONTENT CONTAINER ─── */}
      <div className="w-full flex flex-col justify-start items-stretch pb-6 sm:pb-8">
        {children}
      </div>
    </section>
  );
}



