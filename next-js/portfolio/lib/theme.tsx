'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

type Theme = 'blue' | 'lilac' | 'teal'

const THEME_VARS: Record<Theme, { accent: string; ar: string; ag: string }> = {
  blue:  { accent: '#8fb2ff', ar: '143,178,255', ag: 'rgba(143,178,255,.14)' },
  lilac: { accent: '#c4b8f8', ar: '196,184,248', ag: 'rgba(196,184,248,.13)' },
  teal:  { accent: '#2dd4bf', ar: '45,212,191',  ag: 'rgba(45,212,191,.13)'  },
}

interface ThemeCtx { theme: Theme; setTheme: (t: Theme) => void; vars: typeof THEME_VARS['blue'] }
const ThemeContext = createContext<ThemeCtx>({
  theme: 'blue', setTheme: () => {}, vars: THEME_VARS.blue,
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('blue')
  return (
    <ThemeContext.Provider value={{ theme, setTheme, vars: THEME_VARS[theme] }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
