"use client";
import { useState, useCallback } from "react";
export type Theme = "blue" | "lilac" | "teal";
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("blue");
  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", t);
    }
  }, []);
  return { theme, setTheme };
}
