"use client";

import { useState } from "react";
import {
  Send,
  Mail,
  Linkedin,
  Github,
  CheckCircle2,
  Copy,
  MapPin,
  Check,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { PERSONAL } from "@/data/index";
import SectionLayout from "@/components/layout/SectionLayout";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [copiedEmail, setCopiedEmail] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText(PERSONAL.email).then(() => {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (res.status === 501 || !res.ok) {
        const subj = encodeURIComponent(`[Portfolio Contact] ${subject || "Engineering Inquiry"} | From ${name}`);
        const body = encodeURIComponent(`From: ${name} <${email}>\n\n${message}`);
        window.open(`mailto:${PERSONAL.email}?subject=${subj}&body=${body}`);
      }
      setStatus("success");
    } catch {
      const subj = encodeURIComponent(`[Portfolio Contact] ${subject || "Engineering Inquiry"} | From ${name}`);
      const body = encodeURIComponent(`From: ${name} <${email}>\n\n${message}`);
      window.open(`mailto:${PERSONAL.email}?subject=${subj}&body=${body}`);
      setStatus("success");
    }
  }

  return (
    <SectionLayout label="Let's Connect" title="Get in Touch" scrollable={false}>
      <div className="w-full flex-1 min-h-0 flex flex-col justify-center max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 rounded-2xl border border-white/10 bg-[#070914] p-5 sm:p-7 shadow-2xl backdrop-blur-xl">
          
          {/* LEFT: Simple Contact Form (3/5 Width) */}
          <div className="md:col-span-3 flex flex-col gap-3.5">
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Send a Direct Message
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Reach out for opportunities, project collaborations, or inquiries.
              </p>
            </div>

            {status === "success" ? (
              <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center flex flex-col items-center gap-3 my-auto">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                <h4 className="text-base font-bold text-white">Message Sent Successfully!</h4>
                <p className="text-xs text-slate-300">
                  Thank you for reaching out. I'll get back to your inbox as soon as possible.
                </p>
                <button
                  onClick={() => {
                    setStatus("idle");
                    setMessage("");
                  }}
                  className="mt-2 text-xs font-mono text-sky-400 underline hover:text-sky-300"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-300 font-medium">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Sarah Jenkins"
                      className="w-full px-3.5 py-2 rounded-xl bg-[#04050a] border border-white/10 text-xs text-white placeholder-slate-400 outline-none focus:border-sky-500/50 transition-all font-sans"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-300 font-medium">Your Email *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="sarah@company.com"
                      className="w-full px-3.5 py-2 rounded-xl bg-[#04050a] border border-white/10 text-xs text-white placeholder-slate-400 outline-none focus:border-sky-500/50 transition-all font-sans"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs text-slate-300 font-medium">Subject</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Engineering Role / Project Opportunity"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#04050a] border border-white/10 text-xs text-white placeholder-slate-400 outline-none focus:border-sky-500/50 transition-all font-sans"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs text-slate-300 font-medium">Message *</label>
                  <textarea
                    required
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Hi Chockalingam, I came across your portfolio..."
                    className="w-full px-3.5 py-2 rounded-xl bg-[#04050a] border border-white/10 text-xs text-white placeholder-slate-400 outline-none focus:border-sky-500/50 transition-all resize-none leading-relaxed font-sans"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-1 px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-sky-500/20 disabled:opacity-50"
                >
                  {status === "sending" ? (
                    <>
                      <RotateCcw className="w-4 h-4 animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* RIGHT: Quick Contact Cards (2/5 Width) */}
          <div className="md:col-span-2 flex flex-col justify-between gap-3 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-5">
            <div className="flex flex-col gap-2.5">
              <span className="text-[10px] font-mono text-sky-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Quick Info
              </span>

              {/* Email Card (No truncation!) */}
              <div
                onClick={copyEmail}
                className="p-3 rounded-xl bg-[#0c1022] border border-white/10 hover:border-sky-500/40 transition-all cursor-pointer group flex items-center justify-between min-w-0"
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-mono text-slate-400 block">Direct Email</span>
                    <span className="text-[11px] font-mono font-bold text-white block truncate">
                      {PERSONAL.email}
                    </span>
                  </div>
                </div>
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 ml-1" /> : <Copy className="w-4 h-4 text-slate-500 group-hover:text-sky-400 flex-shrink-0 ml-1" />}
              </div>

              {/* LinkedIn Link */}
              <a
                href={PERSONAL.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-[#0c1022] border border-white/10 hover:border-sky-500/40 transition-all group flex items-center justify-between min-w-0"
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 flex-shrink-0">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-mono text-slate-400 block">LinkedIn Profile</span>
                    <span className="text-[11px] font-mono font-bold text-white block truncate">
                      in/chockalingam-balan
                    </span>
                  </div>
                </div>
              </a>

              {/* GitHub Link */}
              <a
                href={PERSONAL.github}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-[#0c1022] border border-white/10 hover:border-sky-500/40 transition-all group flex items-center justify-between min-w-0"
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <div className="p-2 rounded-lg bg-slate-800 text-slate-200 flex-shrink-0">
                    <Github className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-mono text-slate-400 block">GitHub Profile</span>
                    <span className="text-[11px] font-mono font-bold text-white block truncate">
                      github.com/chockalingam1805
                    </span>
                  </div>
                </div>
              </a>
            </div>

            {/* Location & Work Availability */}
            <div className="p-3 rounded-xl bg-[#050712] border border-white/10 flex flex-col gap-1.5 font-mono text-xs">
              <div className="flex items-center gap-2 text-slate-300 text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Chennai, India (IST / UTC+5:30)</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-[11px]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                <span>Available for Work & Interviews</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
}
