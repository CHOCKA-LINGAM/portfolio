"use client";
import { useState, useCallback, useEffect } from "react";

// Optimal HR & Hiring Manager Navigation Flow:
// 1. Home -> 2. Experience -> 3. Skills -> 4. Projects -> 5. Contact
export const PAGES = ["home", "experience", "skills", "projects", "contact"] as const;
export type Page = (typeof PAGES)[number];

export function useNav() {
  const [current, setCurrent] = useState<Page>("home");

  const goTo = useCallback((page: Page) => {
    setCurrent(page);
    if (typeof window !== "undefined") {
      const targetEl = document.getElementById(`section-${page}`);
      if (targetEl && window.innerWidth < 1024) {
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
        const panel = document.getElementById("portfolio-main-panel");
        if (panel) panel.scrollTop = 0;
      }
    }
  }, []);

  // Keyboard navigation (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        ["INPUT", "TEXTAREA", "SELECT", "OPTION"].includes(target.tagName) ||
        target.isContentEditable ||
        target.getAttribute("role") === "textbox" ||
        target.closest(".monaco-editor") ||
        target.closest("[contenteditable='true']")
      ) {
        return;
      }
      const idx = PAGES.indexOf(current);
      if (e.key === "ArrowRight" && idx < PAGES.length - 1) goTo(PAGES[idx + 1]);
      if (e.key === "ArrowLeft" && idx > 0) goTo(PAGES[idx - 1]);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current, goTo]);

  return { current, goTo };
}
