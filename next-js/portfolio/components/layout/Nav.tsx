"use client";
import { useEffect, useState, useRef } from "react";
import { PAGES, Page } from "@/hooks/useNav";

interface NavProps { current: Page; goTo: (p: Page) => void; }

export default function Nav({ current, goTo }: NavProps) {
  const [open, setOpen] = useState(false);

  const desktopNavRef = useRef<HTMLDivElement>(null);
  const desktopPillRef = useRef<HTMLDivElement>(null);
  const tabletNavRef = useRef<HTMLDivElement>(null);
  const tabletPillRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setOpen(false); }, [current]);

  useEffect(() => {
    const updatePill = (nav: HTMLDivElement | null, pill: HTMLDivElement | null) => {
      if (!nav || !pill) return;
      const active = nav.querySelector(`[data-p="${current}"]`) as HTMLElement;
      if (active) {
        pill.style.width = `${active.offsetWidth}px`;
        pill.style.left = `${active.offsetLeft}px`;
        pill.style.height = `${active.offsetHeight}px`;
        pill.style.top = `${active.offsetTop}px`;
        pill.style.opacity = "1";
      } else {
        pill.style.opacity = "0";
      }
    };
    
    const id = requestAnimationFrame(() => {
      updatePill(desktopNavRef.current, desktopPillRef.current);
      updatePill(tabletNavRef.current, tabletPillRef.current);
    });
    return () => cancelAnimationFrame(id);
  }, [current]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  const label = (p: Page) => p === "experience" ? "exp" : p;
  const num   = String(PAGES.indexOf(current) + 1).padStart(2, "0");

  return (
    <>
      {/* ── MOBILE < 640px ─────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-[900] flex sm:hidden items-center h-12 px-3 gap-2"
        style={{ background: "rgba(4,5,10,.94)", borderBottom: "1px solid rgba(255,255,255,.06)", backdropFilter: "blur(20px)" }}
      >
        {/* page label + counter */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] animate-pulse-ring" />
          <span className="font-mono text-[11px] font-bold text-[var(--accent)] lowercase">{label(current)}</span>
          <span className="font-mono text-[9px] text-[var(--muted)]">{num}/05</span>
        </div>

        {/* open to work — grows to fill space */}
        <div className="flex-1 flex justify-center">
          <span
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-extrabold tracking-[.6px] text-[var(--green)] whitespace-nowrap"
            style={{ background: "rgba(74,222,128,.08)", border: "1px solid rgba(74,222,128,.2)" }}
          >
            <span className="w-1 h-1 rounded-full bg-[var(--green)] flex-shrink-0" />
            OPEN TO WORK
          </span>
        </div>

        {/* hamburger */}
        <button
          onClick={() => setOpen(o => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex-shrink-0 flex flex-col justify-center items-center gap-[4.5px] w-8 h-8 rounded-full border border-white/[.08] transition-all active:scale-90"
          style={{ background: "rgba(255,255,255,.04)" }}
        >
          {[0, 1, 2].map(i => (
            <span key={i} className="block w-[13px] h-[1.5px] rounded-full bg-[var(--t1)]"
              style={{
                transition: "transform .25s, opacity .2s",
                transform: open
                  ? i === 0 ? "rotate(45deg) translate(4px,4px)"
                  : i === 2 ? "rotate(-45deg) translate(4px,-4px)"
                  : "none"
                  : "none",
                opacity: open && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </nav>

      {/* spacer so content doesn't hide under mobile bar */}
      <div className="h-12 sm:hidden flex-shrink-0" aria-hidden />

      {/* slide-down drawer */}
      <div
        className="fixed left-0 right-0 z-[899] sm:hidden overflow-hidden"
        style={{
          top: 48,
          maxHeight: open ? 360 : 0,
          transition: "max-height .32s cubic-bezier(.16,1,.3,1)",
          background: "rgba(4,5,10,.97)",
          borderBottom: open ? "1px solid rgba(255,255,255,.06)" : "none",
          backdropFilter: "blur(24px)",
        }}
      >
        {PAGES.map((p, i) => (
          <button key={p} onClick={() => goTo(p)}
            className={`w-full flex items-center gap-4 px-5 py-4 text-left text-[13px] font-bold lowercase tracking-[.3px] border-b border-white/[.04] last:border-b-0 transition-colors ${
              current === p
                ? "text-[var(--accent)] bg-[rgba(var(--ar),.07)]"
                : "text-[var(--muted)] hover:text-white active:bg-white/[.04]"
            }`}
          >
            <span className="font-mono text-[9px] font-bold text-[var(--t3)] w-4 flex-shrink-0">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="flex-1">{p}</span>
            {current === p && <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />}
          </button>
        ))}
      </div>

      {/* backdrop */}
      {open && <div className="fixed inset-0 z-[898] sm:hidden" onClick={() => setOpen(false)} />}

      {/* ── TABLET 640–1023px ──────────────────────────── */}
      <nav
        className="fixed top-5 left-1/2 -translate-x-1/2 z-[900]
                   hidden sm:flex lg:hidden items-center gap-3
                   px-2 py-1.5 rounded-full
                   shadow-[0_16px_40px_-10px_rgba(0,0,0,.65)]"
        style={{ background: "rgba(4,5,10,.92)", border: "1px solid rgba(255,255,255,.07)", backdropFilter: "blur(24px)" }}
      >
        {/* page links */}
        <div ref={tabletNavRef} className="relative flex items-center gap-0.5">
          <div
            ref={tabletPillRef}
            className="absolute rounded-full z-[0] transition-all duration-[380ms] ease-[cubic-bezier(.16,1,.3,1)] pointer-events-none"
            style={{
              background: "rgba(143,178,255,.1)",
              border: "1px solid rgba(143,178,255,.18)",
              opacity: 0,
            }}
          />
          {PAGES.map(p => (
            <button key={p} data-p={p} onClick={() => goTo(p)}
              className={`text-[11px] font-bold px-3 py-1.5 rounded-full lowercase tracking-[.4px] transition-colors duration-200 relative z-10 ${
                current === p
                  ? "text-white"
                  : "text-[var(--muted)] hover:text-white"
              }`}
            >
              {label(p)}
            </button>
          ))}
        </div>
        {/* compact meta — no wrapping badge */}
        <div className="flex items-center gap-2 pl-2.5 border-l border-white/[.07]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] animate-pulse-ring flex-shrink-0" />
          <span className="font-mono text-[10px] font-bold text-[var(--accent)] tabular-nums whitespace-nowrap">{num}/05</span>
        </div>
      </nav>

      {/* ── DESKTOP ≥ 1024px ───────────────────────────── */}
      <nav
        className="fixed top-6 left-1/2 -translate-x-1/2 z-[900]
                   hidden lg:flex items-center gap-4
                   px-2.5 py-1.5 rounded-full
                   shadow-[0_20px_48px_-12px_rgba(0,0,0,.65)]"
        style={{ background: "rgba(4,5,10,.92)", border: "1px solid rgba(255,255,255,.07)", backdropFilter: "blur(28px)" }}
      >
        <div ref={desktopNavRef} className="relative flex items-center gap-0.5">
          <div
            ref={desktopPillRef}
            className="absolute rounded-full z-[0] transition-all duration-[380ms] ease-[cubic-bezier(.16,1,.3,1)] pointer-events-none"
            style={{
              background: "rgba(143,178,255,.1)",
              border: "1px solid rgba(143,178,255,.18)",
              opacity: 0,
            }}
          />
          {PAGES.map(p => (
            <button key={p} data-p={p} onClick={() => goTo(p)}
              className={`text-[11px] font-bold px-3.5 py-1.5 rounded-full lowercase tracking-[.4px] transition-colors duration-200 relative z-10 ${
                current === p
                  ? "text-white"
                  : "text-[var(--muted)] hover:text-white"
              }`}
            >
              {label(p)}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2.5 pl-3 border-l border-white/[.07]">
          <span
            className="flex items-center gap-1.5 px-2.5 py-[3px] rounded-full text-[9px] font-extrabold tracking-[.8px] text-[var(--green)] whitespace-nowrap"
            style={{ background: "rgba(74,222,128,.08)", border: "1px solid rgba(74,222,128,.2)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] animate-pulse-ring flex-shrink-0" />
            OPEN TO WORK
          </span>
          <span className="font-mono text-[10px] font-bold text-[var(--accent)] tabular-nums whitespace-nowrap">{num}/05</span>
          <span className="text-[12px] text-[#2a3a4a] opacity-60 cursor-default" title="← → to navigate">⌨</span>
        </div>
      </nav>
    </>
  );
}
