"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, RotateCcw, MapPin, Mail, ShieldCheck, Sparkles } from "lucide-react";
import { PERSONAL } from "@/data/index";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export function ModuleDispatchConsole() {
  const [roleType, setRoleType] = useState("Senior Backend Engineer");
  const [engagement, setEngagement] = useState("Full-Time / Direct Hire");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setStatus("sending");
    setTimeout(() => {
      const subj = encodeURIComponent(`[DISPATCH TICKET] ${roleType} | From ${name}`);
      const body = encodeURIComponent(`Role: ${roleType}\nEngagement: ${engagement}\nFrom: ${name} <${email}>\n\nMessage:\n${message}`);
      window.open(`mailto:${PERSONAL.email}?subject=${subj}&body=${body}`);
      setStatus("success");
    }, 600);
  };

  return (
    <div className="w-full flex flex-col gap-6 py-2">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Send className="w-5 h-5 text-[var(--accent)]" />
          <span className="text-xs font-mono font-bold text-[var(--accent)] uppercase tracking-[0.2em]">
            MODULE 05 // OPERATIONAL DISPATCH CONSOLE
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[var(--text)]">
          Direct Outreach & Hiring Ticket
        </h2>
        <p className="text-sm text-[var(--text-muted)] max-w-2xl font-sans">
          Select engagement parameters below to generate an official operational dispatch ticket directly to Chock's inbox.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Left Column: Dispatch Form (3 cols) */}
        <SpotlightCard tilt="none" className="md:col-span-3 p-5 sm:p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
            <span className="text-xs font-mono text-[var(--accent)] font-bold">
              TICKET CREATION CONSOLE
            </span>
            <span className="text-xs font-mono text-emerald-400 font-bold">
              AVAILABILITY: OPEN
            </span>
          </div>

          {status === "success" ? (
            <div className="p-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center flex flex-col items-center gap-3 my-auto">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 animate-pulse" />
              <h3 className="text-xl font-display font-bold text-[var(--text)]">
                Dispatch Ticket Transmitted!
              </h3>
              <p className="text-xs text-[var(--text-muted)] max-w-md font-sans">
                Your operational ticket has been routed. Chock will respond to your inbox as soon as possible.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-2 text-xs font-mono text-[var(--accent)] underline font-bold cursor-pointer"
              >
                + Dispatch another ticket
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Preset Role Type Selector */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono font-bold text-[var(--text-muted)] uppercase">
                  Select Desired Role Target
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Senior Backend Engineer",
                    "Distributed Systems Architect",
                    "Tech Lead",
                    "Staff AI Systems Engineer",
                  ].map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setRoleType(role)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all border cursor-pointer ${
                        roleType === role
                          ? "bg-[var(--accent)] text-slate-950 font-bold border-[var(--accent)]"
                          : "bg-[var(--surface-2)] text-[var(--muted)] border-[var(--border)] hover:text-[var(--text)]"
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Email inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-mono font-bold text-[var(--text-muted)]">YOUR NAME *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Sarah Jenkins"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] text-xs text-[var(--text)] placeholder-[var(--text-muted)] outline-none focus:border-[var(--accent)] transition-all font-mono"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-mono font-bold text-[var(--text-muted)]">YOUR EMAIL *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sarah@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] text-xs text-[var(--text)] placeholder-[var(--text-muted)] outline-none focus:border-[var(--accent)] transition-all font-mono"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-mono font-bold text-[var(--text-muted)]">DISPATCH DETAILS</label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Hi Chock, we are looking for a Senior Backend Architect..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] text-xs text-[var(--text)] placeholder-[var(--text-muted)] outline-none focus:border-[var(--accent)] transition-all font-sans resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-1 px-6 py-3.5 rounded-xl font-mono font-bold text-xs text-slate-950 flex items-center justify-center gap-2 transition-all shadow-lg hover:opacity-90 disabled:opacity-50 cursor-pointer"
                style={{ backgroundColor: "var(--accent)" }}
              >
                {status === "sending" ? (
                  <>
                    <RotateCcw className="w-4 h-4 animate-spin" />
                    Transmitting Ticket...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Transmit Operational Ticket
                  </>
                )}
              </button>
            </form>
          )}
        </SpotlightCard>

        {/* Right Column: Direct Contact Info (2 cols) */}
        <SpotlightCard tilt="none" className="md:col-span-2 p-5 flex flex-col gap-4 justify-between">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono text-[var(--accent)] font-bold uppercase">
              DIRECT REACHOUT
            </span>
            <h3 className="text-xl font-display font-bold text-[var(--text)]">
              Primary Channels
            </h3>

            <div className="flex flex-col gap-2.5 pt-2">
              <a
                href={`mailto:${PERSONAL.email}`}
                className="p-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] flex items-center gap-3 hover:border-[var(--accent)] transition-all"
              >
                <Mail className="w-4 h-4 text-[var(--accent)]" />
                <div className="flex flex-col min-w-0 font-mono text-xs">
                  <span className="text-[var(--muted)] text-[10px]">EMAIL</span>
                  <span className="text-[var(--text)] font-bold truncate">{PERSONAL.email}</span>
                </div>
              </a>

              <div className="p-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] flex items-center gap-3">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <div className="flex flex-col font-mono text-xs">
                  <span className="text-[var(--muted)] text-[10px]">LOCATION</span>
                  <span className="text-[var(--text)] font-bold">Chennai, India (Open for Global Remote/Relocation)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <span>AVAILABLE FOR GLOBAL ROLES</span>
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
}
