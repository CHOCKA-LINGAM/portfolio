"use client";

import React from "react";

interface MarqueeTickerProps {
  items?: string[];
  reverse?: boolean;
}

const DEFAULT_ITEMS = [
  "ARCHITECT",
  "INGEST",
  "OPTIMIZE",
  "SCALE",
  "AUTOMATE",
  "DEPLOY",
  "BENCHMARK",
  "ORCHESTRATE",
];

export function MarqueeTicker({
  items = DEFAULT_ITEMS,
  reverse = false,
}: MarqueeTickerProps) {
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className="w-full overflow-hidden border-y border-[var(--border)] bg-[var(--surface-1)]/60 py-3 backdrop-blur-md select-none my-6">
      <div
        className={`flex whitespace-nowrap font-display text-xs sm:text-sm font-bold tracking-[0.2em] text-[var(--text-muted)] ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
        style={{
          display: "flex",
          width: "max-content",
          animation: `marquee ${reverse ? "35s" : "30s"} linear infinite`,
        }}
      >
        {repeated.map((item, i) => (
          <div key={i} className="flex items-center gap-4 px-4">
            <span className="hover:text-[var(--accent)] transition-colors">
              {item}
            </span>
            <span className="text-[var(--accent)] opacity-60 font-mono">
              ///
            </span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
