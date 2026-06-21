"use client";
import { useState, useCallback, useEffect } from "react";
export const PAGES = ["home","skills","projects","experience","contact"] as const;
export type Page = typeof PAGES[number];
export function useNav() {
  const [current, setCurrent] = useState<Page>("home");
  const goTo = useCallback((page: Page) => { setCurrent(page); }, []);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (["INPUT","TEXTAREA"].includes((e.target as HTMLElement).tagName)) return;
      const idx = PAGES.indexOf(current);
      if (e.key === "ArrowRight" && idx < PAGES.length - 1) goTo(PAGES[idx + 1]);
      if (e.key === "ArrowLeft" && idx > 0) goTo(PAGES[idx - 1]);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current, goTo]);
  return { current, goTo };
}
