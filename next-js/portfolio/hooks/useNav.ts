"use client";

import { useState, useCallback, useEffect } from "react";

export const PAGES = ["home", "about", "experience", "skills", "projects", "contact"] as const;
export type Page = (typeof PAGES)[number];

export function useNav() {
  const [current, setCurrent] = useState<Page>("home");

  const goTo = useCallback((page: Page) => {
    setCurrent(page);
    if (typeof window !== "undefined") {
      const targetEl = document.getElementById(`section-${page}`);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, []);

  // IntersectionObserver to auto-update active nav tab as user scrolls down document
  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id.replace("section-", "") as Page;
            if (PAGES.includes(id)) {
              setCurrent(id);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "-25% 0px -45% 0px",
        threshold: 0.1,
      }
    );

    PAGES.forEach((p) => {
      const el = document.getElementById(`section-${p}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
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
        target.closest("[contenteditable='true']") ||
        document.querySelector(".story-modal-dark") ||
        document.querySelector('[role="dialog"]')
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
