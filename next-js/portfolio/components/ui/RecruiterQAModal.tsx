"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, HelpCircle, FileDown, Mail, MapPin, Briefcase, ChevronDown, ChevronRight, MessageSquareQuote } from "lucide-react";
import { PERSONAL, getExperienceYearsLabel } from "@/data/index";

const RECRUITER_FAQS = [
  {
    id: "role",
    question: "What engineering roles are you looking for?",
    answer: "Senior Software Engineer, Senior Data Engineer, Backend Architect, or AI/ML Platform Engineer roles focusing on high-throughput data infrastructure, microservices, and AI system integration.",
  },
  {
    id: "experience",
    question: "How many years of enterprise production experience do you have?",
    answer: `${getExperienceYearsLabel()} years of production engineering experience building enterprise microservices, PySpark ETL data platforms, and GenAI workflows at iLink Digital & Standard Chartered.`,
  },
  {
    id: "stack",
    question: "What is your primary tech stack?",
    answer: "Python 3.11+, PySpark, Databricks Delta Lake, FastAPI, PostgreSQL, SQLGlot, AWS Bedrock, OpenAI/LangChain, Azure AKS, Docker, and Next.js / TypeScript for full-stack interfaces.",
  },
  {
    id: "location",
    question: "Where are you located & are you open to remote/relocation?",
    answer: "Currently based in Chennai, India. Open to Full Remote roles worldwide as well as Hybrid or On-site relocation opportunities.",
  },
  {
    id: "highlight",
    question: "What is your biggest engineering accomplishment?",
    answer: "Architected and open-sourced 'schema-shield' — an automated schema compatibility guardrail and AST safety engine for Databricks Delta Lake and PostgreSQL, ensuring 100% zero-downtime DDL migrations across 500+ production runs.",
  },
  {
    id: "availability",
    question: "What is your availability / notice period?",
    answer: "Standard notice period or negotiable based on early release agreements for compelling technical leadership roles.",
  },
];

export function RecruiterQAModal({
  isOpen,
  onClose,
  onOpenResume,
}: {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume?: () => void;
}) {
  const [activeFaq, setActiveFaq] = useState(RECRUITER_FAQS[0]);
  const [openMobileFaqId, setOpenMobileFaqId] = useState<string | null>(RECRUITER_FAQS[0].id);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-3xl rounded-3xl bg-slate-900 border border-cyan-500/30 text-white shadow-2xl overflow-hidden flex flex-col max-h-[88vh] sm:max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-white/10 flex items-start justify-between bg-slate-950/70 gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 sm:p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shrink-0">
                <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-base sm:text-xl font-display font-extrabold text-white">
                    Recruiter Fast Q&amp;A
                  </h2>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                    QUICK BRIEF
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs font-mono text-slate-400">
                  Instant answers to hiring &amp; engineering questions
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all cursor-pointer shrink-0"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* ── DESKTOP DUAL-PANE VIEW (md:grid) ── */}
          <div className="hidden md:grid md:grid-cols-12 gap-6 p-6 overflow-y-auto">
            {/* Left FAQ Navigation Tabs */}
            <div className="md:col-span-5 flex flex-col gap-2 font-mono">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider px-1">
                // SELECT A QUESTION
              </span>
              {RECRUITER_FAQS.map((faq) => {
                const isSelected = activeFaq.id === faq.id;
                return (
                  <button
                    key={faq.id}
                    onClick={() => setActiveFaq(faq)}
                    className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? "bg-cyan-950/80 border-cyan-400 text-cyan-200 shadow-md"
                        : "bg-slate-950/50 border-white/10 text-slate-300 hover:border-slate-700 hover:bg-slate-800/80"
                    }`}
                  >
                    <span className="truncate max-w-[200px]">{faq.question}</span>
                    <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isSelected ? "text-cyan-400" : "text-slate-600"}`} />
                  </button>
                );
              })}
            </div>

            {/* Right FAQ Answer Details Box */}
            <div className="md:col-span-7 flex flex-col justify-between p-5 rounded-2xl bg-slate-950/90 border border-white/10">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold">
                  <MessageSquareQuote className="w-4 h-4 text-cyan-400" />
                  <span>ANSWER DETAILS</span>
                </div>

                <h3 className="text-base font-display font-extrabold text-white">
                  {activeFaq.question}
                </h3>

                <p className="text-sm font-sans text-slate-300 leading-relaxed bg-slate-900/80 p-4 rounded-xl border border-white/10">
                  {activeFaq.answer}
                </p>
              </div>

              {/* Quick Info Badges */}
              <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-2 text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Chennai, India</span>
                </div>

                <div className="flex items-center gap-2 text-slate-400">
                  <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{getExperienceYearsLabel()} Yrs Exp</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── MOBILE ACCORDION VIEW (block md:hidden) ── */}
          <div className="block md:hidden p-4 overflow-y-auto space-y-3 font-mono">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block px-1">
              // TAP QUESTION TO READ ANSWER
            </span>
            {RECRUITER_FAQS.map((faq) => {
              const isOpen = openMobileFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isOpen
                      ? "bg-slate-950 border-cyan-400/80 shadow-lg"
                      : "bg-slate-950/60 border-white/10"
                  }`}
                >
                  <button
                    onClick={() => setOpenMobileFaqId(isOpen ? null : faq.id)}
                    className="w-full p-3.5 text-left text-xs font-bold text-slate-200 flex items-center justify-between gap-2 cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? "rotate-180 text-cyan-400" : "text-slate-500"}`} />
                  </button>

                  {isOpen && (
                    <div className="p-3.5 pt-0 border-t border-white/10 font-sans text-xs text-slate-300 leading-relaxed bg-slate-900/60">
                      <p className="p-3 rounded-xl bg-slate-950 border border-white/10">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer Actions */}
          <div className="p-3.5 sm:p-4 sm:px-6 border-t border-white/10 bg-slate-950/80 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono">
            <span className="text-xs text-slate-400 text-center sm:text-left">
              Looking to schedule an interview?
            </span>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              {onOpenResume && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenResume();
                  }}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all border border-white/10 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileDown className="w-3.5 h-3.5 text-cyan-400" />
                  <span>View Resume</span>
                </button>
              )}

              <a
                href={`mailto:${PERSONAL.email}`}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Me</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
