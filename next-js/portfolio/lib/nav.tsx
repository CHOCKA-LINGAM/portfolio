'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Page = 'home' | 'skills' | 'projects' | 'experience' | 'contact'
export const PAGES: Page[] = ['home', 'skills', 'projects', 'experience', 'contact']

interface NavCtx { current: Page; goTo: (p: Page) => void }
const NavContext = createContext<NavCtx>({ current: 'home', goTo: () => {} })

export function NavProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<Page>('home')

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return
      const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
      if (!dir) return
      e.preventDefault()
      const idx = PAGES.indexOf(current)
      const next = PAGES[Math.max(0, Math.min(PAGES.length - 1, idx + dir))]
      if (next !== current) setCurrent(next)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [current])

  return (
    <NavContext.Provider value={{ current, goTo: setCurrent }}>
      {children}
    </NavContext.Provider>
  )
}

export const useNav = () => useContext(NavContext)
