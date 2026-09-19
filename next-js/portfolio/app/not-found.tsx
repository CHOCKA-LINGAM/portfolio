"use client";

import Link from "next/link";
import { ArrowLeft, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-[var(--bg)] text-[var(--text)] font-sans">
      <div className="p-8 rounded-2xl bg-[var(--surface-1)] border border-[var(--border-strong)] shadow-2xl flex flex-col items-center text-center max-w-md gap-4">
        <div className="p-3 rounded-2xl bg-sky-500/15 text-sky-400">
          <Terminal className="w-8 h-8" />
        </div>
        <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
          404 &bull; Page Not Found
        </span>
        <h1 className="text-2xl font-extrabold tracking-tight">
          Route Out of Scope
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
          The requested path does not exist in this architecture pipeline.
        </p>
        <Link
          href="/"
          className="mt-2 px-5 py-2.5 rounded-xl bg-sky-400 text-slate-950 font-bold text-xs flex items-center gap-2 hover:bg-sky-300 transition-all shadow-md"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Portfolio Main Page
        </Link>
      </div>
    </div>
  );
}
