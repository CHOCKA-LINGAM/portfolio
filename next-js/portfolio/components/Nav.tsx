'use client'
import { useEffect, useRef } from 'react'
import { useNav, PAGES, Page } from '@/lib/nav'

const LABELS: Record<Page, string> = {
  home: 'home', skills: 'skills', projects: 'projects', experience: 'exp', contact: 'contact',
}

export default function Nav() {
  const { current, goTo } = useNav()
  const pillRef = useRef<HTMLDivElement>(null)
  const navRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const nav = navRef.current
    const pill = pillRef.current
    if (!nav || !pill) return
    const active = nav.querySelector(`[data-p="${current}"]`) as HTMLElement
    if (active) {
      pill.style.width = active.offsetWidth + 'px'
      pill.style.left  = active.offsetLeft + 'px'
    }
  }, [current])

  const idx = PAGES.indexOf(current)

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[900] w-fit max-w-[calc(100%-28px)]">
      <div className="flex items-center gap-4 px-[10px] py-[6px] rounded-full"
        style={{
          background: 'rgba(4,5,10,.88)',
          backdropFilter: 'blur(32px) saturate(1.8)',
          border: '1px solid rgba(255,255,255,.07)',
          boxShadow: '0 20px 48px -12px rgba(0,0,0,.65)',
        }}
      >
        {/* Nav links */}
        <div ref={navRef} className="flex items-center gap-[2px] relative">
          {/* Sliding pill */}
          <div
            ref={pillRef}
            className="absolute h-[30px] rounded-full z-[-1] transition-all duration-[400ms] cubic-bezier(.16,1,.3,1) pointer-events-none"
            style={{
              background: 'rgba(var(--ar),.1)',
              border: '1px solid rgba(var(--ar),.18)',
            }}
          />
          {PAGES.map(p => (
            <a
              key={p}
              data-p={p}
              onClick={e => { e.preventDefault(); goTo(p) }}
              href="#"
              className={`text-[11px] font-bold no-underline px-[14px] py-[6px] rounded-full transition-[.22s] lowercase tracking-[.4px] cursor-pointer select-none ${
                current === p ? 'text-white' : 'text-[var(--muted)] hover:text-white'
              }`}
            >
              {LABELS[p]}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-[10px] pl-3" style={{ borderLeft: '1px solid rgba(255,255,255,.07)' }}>
          {/* Open to work badge */}
          <div className="hidden sm:flex items-center gap-[6px] px-[10px] py-[3px] rounded-full text-[var(--green)] text-[9px] font-[800] tracking-[.8px]"
            style={{ background: 'rgba(74,222,128,.08)', border: '1px solid rgba(74,222,128,.2)' }}>
            <span className="w-[6px] h-[6px] rounded-full bg-[var(--green)] flex-shrink-0"
              style={{ animation: 'pulse-ring 2.2s infinite' }} />
            OPEN TO WORK
          </div>
          {/* Page counter */}
          <span className="font-mono text-[10px] text-[var(--accent)] font-bold min-w-[48px] text-right">
            {String(idx + 1).padStart(2, '0')}/05
          </span>
          {/* Keyboard hint */}
          <span className="text-[12px] opacity-60 cursor-default select-none text-[#2a3a4a] hover:opacity-100 hover:text-[var(--muted)] transition-[.2s]"
            title="Use ← → arrow keys to navigate">⌨</span>
        </div>
      </div>
    </nav>
  )
}
