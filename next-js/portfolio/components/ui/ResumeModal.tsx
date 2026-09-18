"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Printer, ExternalLink, FileText } from "lucide-react";
import { PERSONAL } from "@/data/index";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-modal-title"
        className="fixed inset-0 z-[2500] flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-2xl overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-4xl h-[90vh] max-h-[860px] rounded-3xl bg-[var(--surface-1)] border border-[var(--border-strong)] shadow-2xl flex flex-col justify-between overflow-hidden"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)] bg-[var(--surface-2)]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-sky-500/15 text-sky-400">
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <h3 id="resume-modal-title" className="text-sm sm:text-base font-bold text-[var(--text)] font-sans">
                  {PERSONAL.name} &mdash; Official Resume
                </h3>
                <span className="text-xs text-[var(--muted)] font-sans">
                  Senior Software Engineer &amp; Backend AI Architect
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="/resume.pdf"
                download="Chockalingam_Balan_Resume.pdf"
                className="px-3.5 py-1.5 rounded-xl bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md font-sans"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Download</span>
              </a>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-[var(--surface-1)] border border-[var(--border)] text-[var(--text)] hover:text-sky-400 transition-colors"
                title="Open in new tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-[var(--surface-1)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)] transition-colors cursor-pointer"
                title="Close viewer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* PDF Frame Viewer */}
          <div className="flex-1 w-full bg-slate-900 relative">
            <iframe
              src="/resume.pdf#toolbar=0"
              title="Chockalingam Balan Executive Resume"
              className="w-full h-full border-none"
            />
          </div>

          {/* Footer Bar */}
          <div className="px-5 py-3 border-t border-[var(--border)] bg-[var(--surface-2)] flex items-center justify-between text-xs text-[var(--muted)] font-sans">
            <span>Verified PDF Document &bull; Updated 2026</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1 hover:text-[var(--text)] transition-colors cursor-pointer font-semibold"
              >
                <Printer className="w-3.5 h-3.5 text-sky-400" />
                <span>Print Document</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
