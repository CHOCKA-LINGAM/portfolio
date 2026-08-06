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
    <section className={`flex h-full min-h-0 flex-col py-4 ${className}`}>
      {/* Section label (e.g. "Skills Overview") */}
      <div className="mb-3 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[2px] text-[var(--accent)]">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--green)] animate-pulse-ring" />
        {label}
      </div>
      
      {/* 
        Main Heading 
        NOTE: Changed tracking-[-2.5px] to tracking-tight (-0.025em) to fix 
        typography scaling collisions on mobile devices. 
      */}
      <h2 className="mb-6 text-[clamp(28px,4.5vw,50px)] font-black leading-none tracking-tight text-white">
        {title}
      </h2>

      {/* Children container */}
      <div className={`flex-1 min-h-0 ${scrollable ? "overflow-y-auto" : ""}`}>
        {children}
      </div>
    </section>
  );
}
