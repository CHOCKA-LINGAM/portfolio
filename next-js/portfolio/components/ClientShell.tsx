'use client'
import { useEffect, useRef } from 'react'
import { useTheme } from '@/lib/theme'
import { useNav, PAGES, Page } from '@/lib/nav'
import Nav from './Nav'
import ThemeSwitcher from './ThemeSwitcher'
import PageHome from './pages/PageHome'
import PageSkills from './pages/PageSkills'
import PageProjects from './pages/PageProjects'
import PageExperience from './pages/PageExperience'
import PageContact from './pages/PageContact'

export default function ClientShell() {
  const { vars } = useTheme()
  const { current } = useNav()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: null as number | null, y: null as number | null, r: 150 })

  // ── Particles ──────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let animId: number

    class Particle {
      x: number; y: number; vx: number; vy: number; s: number
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 0.18
        this.vy = (Math.random() - 0.5) * 0.18
        this.s = Math.random() * 1.5 + 0.7
      }
      update() {
        this.x += this.vx; this.y += this.vy
        if (this.x < 0 || this.x > canvas.width)  this.vx *= -1
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1
        const { x, y, r } = mouse.current
        if (x !== null && y !== null) {
          const dx = this.x - x, dy = this.y - y, d = Math.hypot(dx, dy)
          if (d < r && d > 0) { const f = (r - d) / r; this.x += dx/d*f*0.7; this.y += dy/d*f*0.7 }
        }
      }
      draw() {
        ctx.beginPath(); ctx.arc(this.x, this.y, this.s, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${vars.ar},0.5)`
        ctx.shadowBlur = 7; ctx.shadowColor = `rgba(${vars.ar},.18)`
        ctx.fill(); ctx.shadowBlur = 0
      }
    }

    let particles: Particle[] = []
    function init() {
      canvas.width = window.innerWidth; canvas.height = window.innerHeight
      const n = Math.min(90, Math.floor(canvas.width * canvas.height / 14000))
      particles = Array.from({ length: n }, () => new Particle())
    }
    function connect() {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x, dy = particles[a].y - particles[b].y
          const d2 = dx*dx + dy*dy
          if (d2 < 18000) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${vars.ar},${(1 - d2/18000) * 0.055})`
            ctx.lineWidth = 0.7
            ctx.moveTo(particles[a].x, particles[a].y)
            ctx.lineTo(particles[b].x, particles[b].y)
            ctx.stroke()
          }
        }
      }
    }
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => { p.update(); p.draw() })
      connect()
      animId = requestAnimationFrame(animate)
    }
    init(); animate()
    const onResize = () => init()
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize) }
  }, [vars.ar])

  // ── Mouse glow ─────────────────────────────────────────────────────────
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX; mouse.current.y = e.clientY
      if (glowRef.current) {
        glowRef.current.style.setProperty('--mx', (e.clientX / innerWidth * 100) + '%')
        glowRef.current.style.setProperty('--my', (e.clientY / innerHeight * 100) + '%')
      }
    }
    const onOut = () => { mouse.current.x = null; mouse.current.y = null }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseout', onOut)
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseout', onOut) }
  }, [])

  const pages: Record<Page, React.ReactNode> = {
    home: <PageHome />,
    skills: <PageSkills />,
    projects: <PageProjects />,
    experience: <PageExperience />,
    contact: <PageContact />,
  }

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />
      <div
        ref={glowRef}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          opacity: 0.45,
          background: `radial-gradient(circle at var(--mx,50%) var(--my,50%), ${vars.ag} 0%, transparent 52%)`,
        }}
      />
      <Nav />
      <ThemeSwitcher />

      {/* SPA — all pages mounted, only current is visible */}
      <div id="root" className="relative z-[2] w-full h-screen overflow-hidden">
        {PAGES.map(page => (
          <div
            key={page}
            className={`absolute inset-0 overflow-y-auto overflow-x-hidden pt-[88px] pb-10 scrollbar-thin transition-all duration-[350ms] ease-[cubic-bezier(.4,0,.2,1)] ${
              current === page
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-4 pointer-events-none'
            }`}
            style={{ scrollbarColor: `rgba(${vars.ar},.12) transparent` }}
          >
            {pages[page]}
          </div>
        ))}
      </div>
    </>
  )
}
