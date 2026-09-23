"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Uncaught App Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-slate-950 text-white font-sans">
      <div className="p-8 rounded-3xl bg-slate-900/90 border border-red-500/30 shadow-2xl flex flex-col items-center text-center max-w-lg gap-5 backdrop-blur-xl">
        <div className="p-4 rounded-2xl bg-red-500/10 text-red-400 border border-red-500/20">
          <AlertTriangle className="w-8 h-8" />
        </div>
        
        <div className="flex flex-col gap-1">
          <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-widest">
            SYSTEM DISRUPTION &bull; RUNTIME EXCEPTION
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-white">
            Something went wrong!
          </h1>
        </div>

        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-mono bg-slate-950/60 p-3 rounded-xl border border-white/5 w-full text-left overflow-auto max-h-32">
          {error?.message || "An unexpected application error occurred."}
          {error?.digest && (
            <span className="block mt-1 text-[10px] text-slate-500">
              Digest: {error.digest}
            </span>
          )}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 w-full pt-2">
          <button
            onClick={() => reset()}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-2 hover:bg-cyan-400 transition-all shadow-md cursor-pointer font-mono"
          >
            <RefreshCw className="w-4 h-4" /> Try Again / Reset State
          </button>
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-200 border border-white/10 font-bold text-xs flex items-center gap-2 hover:bg-slate-700 hover:text-white transition-all shadow-md font-mono"
          >
            <Home className="w-4 h-4" /> Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
