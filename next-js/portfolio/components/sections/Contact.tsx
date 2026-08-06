"use client";
import { useState, useEffect } from "react";
import { Linkedin, Github, Mail, Copy, Play, RotateCcw, CheckCircle, AlertCircle, X } from "lucide-react";
import { PERSONAL } from "@/data/index";
// Default message pre-filled for the visitor — they edit before sending
// Uses PERSONAL.name so it stays in sync with data/personal.json
const _firstName = PERSONAL.name.split(" ")[0];
const DEFAULT_MSG = `Hi ${_firstName},\n\nI came across your portfolio and would love to connect. I'm interested in discussing [role/opportunity] with you.\n\nLooking forward to hearing from you!\n\nBest regards,`;

// \u2500\u2500\u2500 Toast \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
type ToastType = "success" | "error" | "warn";
interface ToastData { id: number; type: ToastType; title: string; body: string; }

function Toast({ data, onClose }: { data: ToastData; onClose: () => void }) {
  const [exiting, setExiting] = useState(false);
  
  useEffect(() => {
    const t = setTimeout(() => { setExiting(true); setTimeout(onClose, 220); }, 4000);
    return () => clearTimeout(t);
  }, [onClose]);

  const map = {
    success: { icon: <CheckCircle size={15} />, bar: "#4ade80", text: "#4ade80",  bg: "rgba(74,222,128,.07)",  border: "rgba(74,222,128,.2)"  },
    error:   { icon: <AlertCircle size={15} />, bar: "#f87171", text: "#f87171",  bg: "rgba(248,113,113,.07)", border: "rgba(248,113,113,.2)" },
    warn:    { icon: <AlertCircle size={15} />, bar: "#fbbf24", text: "#fbbf24",  bg: "rgba(251,191,36,.07)",  border: "rgba(251,191,36,.2)"  },
  }[data.type];

  return (
    <div
      className={`relative flex items-start gap-3 rounded-[14px] border px-4 py-3.5 shadow-[0_16px_40px_-8px_rgba(0,0,0,.6)] overflow-hidden w-[320px] pointer-events-auto ${exiting ? "toast-exit" : "toast-enter"}`}
      style={{ background: map.bg, borderColor: map.border }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-[14px]" style={{ background: map.bar }} />
      <span style={{ color: map.text }} className="flex-shrink-0 mt-0.5">{map.icon}</span>
      <div className="flex-1 min-w-0">
        <div className="text-[12px] font-bold text-white mb-0.5">{data.title}</div>
        <div className="text-[11px] text-[var(--muted)] leading-[1.5]">{data.body}</div>
      </div>
      <button onClick={() => { setExiting(true); setTimeout(onClose, 220); }} className="flex-shrink-0 text-[var(--muted)] hover:text-white transition-colors mt-0.5">
        <X size={13} />
      </button>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────
export default function Contact() {
  const [name,  setName]  = useState("");
  const [email, setEmail] = useState("");
  const [msg,   setMsg]   = useState(DEFAULT_MSG);
  const [output, setOutput] = useState<{ text: string; cls: "idle" | "running" | "ok" }>({
    text: "# Output appears here after running",
    cls: "idle",
  });
  const [count,   setCount]   = useState(1);
  const [copied,  setCopied]  = useState(false);
  const [errors,  setErrors]  = useState<{ name?: string; email?: string; msg?: string }>({});
  const [shake,   setShake]   = useState<{ name?: boolean; email?: boolean; msg?: boolean }>({});
  const [toasts,  setToasts]  = useState<ToastData[]>([]);

  // Auto-append name below "Best regards," whenever the name field changes
  useEffect(() => {
    setMsg(prev => {
      const anchor = "Best regards,";
      const idx = prev.indexOf(anchor);
      if (idx === -1) return prev; // user removed the anchor — don't touch
      const beforeAnchor = prev.slice(0, idx + anchor.length);
      return name.trim() ? `${beforeAnchor}\n${name.trim()}` : beforeAnchor;
    });
  }, [name]);

  function addToast(type: ToastType, title: string, body: string) {
    const id = Date.now();
    setToasts(prev => [...prev, { id, type, title, body }]);
  }
  function removeToast(id: number) { setToasts(prev => prev.filter(t => t.id !== id)); }

  function nbRun() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors: { name?: string; email?: string; msg?: string } = {};
    if (!name.trim())  newErrors.name  = "Name is required.";
    if (!email.trim()) newErrors.email = "Email address is required.";
    else if (!emailRegex.test(email)) newErrors.email = "Please enter a valid email address.";
    if (!msg.trim())   newErrors.msg   = "Message cannot be empty.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setShake({ name: !!newErrors.name, email: !!newErrors.email, msg: !!newErrors.msg });
      setTimeout(() => setShake({}), 500);
      const missing = Object.values(newErrors);
      addToast("error", "Please fix the highlighted fields", missing.join(" "));
      return;
    }

    setErrors({});
    setOutput({ text: "Executing…  ⟳", cls: "running" });

    setTimeout(() => {
      const subj = encodeURIComponent(`Reaching out — via Portfolio | ${name}`);
      const body = encodeURIComponent(`From: ${name} <${email}>\n\n${msg}`);
      // window.open with mailto works with Gmail, Outlook, Apple Mail —
      // opens whichever handler the user has configured in their browser.
      window.open(`mailto:${PERSONAL.email}?subject=${subj}&body=${body}`);
      setCount((c) => c + 1);

      const successText =
        `✓ Message dispatched successfully!\n\n` +
        `<span style="color:#6a7e8e;">Out[${count + 1}]:</span> {\n` +
        `  <span style="color:#8fb2ff;">'from'</span>   : <span style="color:#86c986;">'${name} &lt;${email}&gt;'</span>,\n` +
        `  <span style="color:#8fb2ff;">'to'</span>     : <span style="color:#86c986;">'${PERSONAL.email}'</span>,\n` +
        `  <span style="color:#8fb2ff;">'status'</span> : <span style="color:#fbbf24;">200</span>,\n` +
        `  <span style="color:#8fb2ff;">'ts'</span>     : <span style="color:#86c986;">'${new Date().toISOString()}'</span>\n}`;
      setOutput({ text: successText, cls: "ok" });
      addToast("success", "Message sent!", `Opening your email client to send to ${PERSONAL.email}`);
    }, 900);
  }

  function nbClear() {
    setName(""); setEmail(""); setMsg(DEFAULT_MSG); setErrors({});
    setOutput({ text: "# Awaiting execution…", cls: "idle" });
  }

  function copyEmail() {
    navigator.clipboard.writeText(PERSONAL.email).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2200);
      addToast("success", "Copied!", `${PERSONAL.email} copied to clipboard.`);
    });
  }

  function previewName()  { return name  || "…"; }
  function previewEmail() { return email || "…"; }
  function previewMsg()   { const m = msg.trim() || "…"; return m.length > 22 ? m.slice(0, 22) + "…" : m; }

  const outCls = output.cls === "ok" ? "text-[var(--green)]" : output.cls === "running" ? "text-[var(--accent)]" : "text-[#2a3a4a]";

  const links = [
    { href: PERSONAL.linkedin, icon: <Linkedin size={16} />, label: "LINKEDIN", target: "_blank" },
    { href: PERSONAL.github,   icon: <Github   size={16} />, label: "GITHUB",   target: "_blank" },
    { href: `mailto:${PERSONAL.email}`, icon: <Mail size={16} />, label: "MAIL" },
  ];

  const nbWrap    = { background: "#08090f", border: "1px solid rgba(255,255,255,.09)" } as const;
  const nbTitleBg = { background: "#111322", borderBottom: "1px solid rgba(255,255,255,.12)" } as const;
  const nbCellNum = { background: "#070810", borderRight: "1px solid rgba(255,255,255,.04)" } as const;

  return (
    <div className="min-h-full flex flex-col justify-center py-4">
      {/* ── Toast container (fixed top-right) ─────────────────────────── */}
      <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-2.5 pointer-events-none">
        {toasts.map(t => (
          <Toast key={t.id} data={t} onClose={() => removeToast(t.id)} />
        ))}
      </div>

      {/* ── Two-column grid ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

        {/* LEFT — label + heading + summary + links ───────────────────── */}
        <div className="flex flex-col gap-6">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[var(--accent)] uppercase tracking-[2px] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] animate-pulse-ring" />
              Let's Connect
            </div>
            <h2 className="text-[clamp(28px,4vw,48px)] font-black tracking-[-2.5px] text-white leading-none mb-5">
              Initialize a<br />Connection.
            </h2>
            <p className="text-[14px] leading-[1.75] text-[var(--muted)]">
              {PERSONAL.summary}
            </p>
          </div>
          <div className="flex flex-col gap-2.5">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target={l.target}
                rel="noreferrer"
                className="relative flex items-center gap-3 px-4 py-3 pl-5 rounded-[12px] border text-[var(--muted2)] font-bold text-[13px] transition-all duration-300 hover:border-[rgba(143,178,255,.25)] hover:bg-[rgba(143,178,255,.04)] hover:translate-x-1.5 hover:text-white group overflow-hidden"
                style={{ border: "1px solid var(--border)", background: "rgba(255,255,255,.015)", willChange: "transform" }}
              >
                {/* Sliding left accent bar */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--accent)] transform -translate-x-1 group-hover:translate-x-0 transition-transform duration-300" />
                <span className="text-[var(--accent)] flex-shrink-0 group-hover:drop-shadow-[0_0_6px_rgba(143,178,255,.6)] transition-all duration-300">{l.icon}</span>
                {l.label}
              </a>
            ))}
            <button
              onClick={copyEmail}
              className="relative flex items-center gap-3 px-4 py-3 pl-5 rounded-[12px] border text-[var(--accent)] font-bold text-[13px] text-left w-full transition-all duration-300 hover:border-[rgba(143,178,255,.32)] hover:bg-[rgba(143,178,255,.06)] hover:translate-x-1.5 group overflow-hidden"
              style={{ border: "1px solid rgba(143,178,255,.18)", background: "rgba(143,178,255,.03)", willChange: "transform" }}
            >
              {/* Sliding left accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--accent)] transform -translate-x-1 group-hover:translate-x-0 transition-transform duration-300" />
              <span className="flex-shrink-0 group-hover:drop-shadow-[0_0_6px_rgba(143,178,255,.6)] transition-all duration-300"><Copy size={16} /></span>
              {copied ? "Copied! ✓" : "Copy email address"}
            </button>
          </div>
        </div>

        {/* RIGHT — Jupyter notebook form ──────────────────────────────── */}
        <div className="rounded-[14px] overflow-hidden font-mono shadow-[0_28px_72px_-16px_rgba(0,0,0,.75)]" style={nbWrap}>
          {/* titlebar */}
          <div className="flex items-center gap-2.5 px-4 py-2.5" style={nbTitleBg}>
            <div className="flex gap-1.5">
              {["#ff5f56","#ffbd2e","#27c93f"].map(c => (
                <span key={c} className="w-[11px] h-[11px] rounded-full block" style={{ background: c }} />
              ))}
            </div>
            <span className="flex-1 text-center text-[11px] text-[#3a4e62] tracking-[.4px]">contact.ipynb</span>
            <span className="flex items-center gap-1.5 text-[9px] text-[#2a3e52]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] shadow-[0_0_6px_rgba(74,222,128,.5)]" />
              Python 3
            </span>
          </div>

          {/* toolbar */}
          <div className="flex items-center gap-1.5 px-3 py-1.5" style={{ background: "#090a13", borderBottom: "1px solid rgba(255,255,255,.04)" }}>
            {[
              { icon: <Play size={10} />, label: "Run Cell", onClick: nbRun, accent: true },
              { icon: <RotateCcw size={10} />, label: "Clear", onClick: nbClear },
            ].map((b) => (
              <button
                key={b.label}
                onClick={b.onClick}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-[5px] text-[10px] font-bold font-mono whitespace-nowrap transition-all cursor-pointer ${
                  b.accent ? "text-[var(--accent)] hover:bg-[rgba(143,178,255,.2)]" : "text-[#5a7080] hover:text-[var(--accent)]"
                }`}
                style={{
                  background: b.accent ? "rgba(143,178,255,.1)" : "rgba(255,255,255,.035)",
                  border: `1px solid ${b.accent ? "rgba(143,178,255,.22)" : "rgba(255,255,255,.07)"}`,
                }}
              >
                {b.icon}{b.label}
              </button>
            ))}
            <span className="ml-auto flex items-center gap-1.5 text-[10px] text-[#2a3a4a]">
              <span className={`w-[7px] h-[7px] rounded-full shadow-[0_0_6px_rgba(74,222,128,.5)] ${output.cls === "running" ? "bg-[var(--amber)]" : "bg-[var(--green)]"}`} />
              {output.cls === "running" ? "Busy" : "Idle"}
            </span>
          </div>

          {/* input cell */}
          <div className="flex border-b relative" style={{ borderColor: "rgba(255,255,255,.04)", background: "rgba(143,178,255,.015)" }}>
            <div className="absolute left-0 top-0 bottom-0 w-[2.5px] rounded-r bg-[var(--accent)] opacity-50" />
            <div className="w-[54px] flex-shrink-0 px-2 py-3 flex items-start justify-end" style={nbCellNum}>
              <span className="text-[11px] text-[var(--accent)]">[{count}]:</span>
            </div>
            <div className="flex-1 min-w-0">
              {/* send_message live preview — the element that makes this a notebook, not just a form */}
              <div
                className="px-4 py-2.5 text-[11px] leading-relaxed border-b whitespace-pre-wrap"
                style={{ background: "rgba(0,0,0,.18)", borderColor: "rgba(255,255,255,.04)" }}
              >
                <span className="text-[#f0b96a]">send_message</span>
                <span className="text-[#6a7e8e]">(</span>
                <span className="text-[var(--accent)]">name</span>=<span className="text-[#86c986]">"{previewName()}"</span>,{" "}
                <span className="text-[var(--accent)]">email</span>=<span className="text-[#86c986]">"{previewEmail()}"</span>,{" "}
                <span className="text-[var(--accent)]">message</span>=<span className="text-[#86c986]">"{previewMsg()}"</span>
                <span className="text-[#6a7e8e]">)</span>
              </div>

              {/* form fields */}
              <div className="px-4 py-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* name */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] text-[#2e4255] uppercase tracking-[1.5px] font-bold">
                      name <span className="text-[var(--accent)] opacity-80">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => { setName(e.target.value); if (errors.name) setErrors(p => ({ ...p, name: undefined })); }}
                      placeholder="Your full name"
                      className={`rounded-[6px] px-2.5 py-2 text-white font-mono text-[12px] outline-none transition-all w-full border ${
                        errors.name ? "border-[#f87171] bg-[#f87171]/[0.04]" : "border-white/[.07] focus:border-[rgba(143,178,255,.28)] focus:bg-[rgba(143,178,255,.04)]"
                      } ${shake.name ? "animate-shake" : ""}`}
                      style={{ background: errors.name ? undefined : "rgba(0,0,0,.35)" }}
                    />
                    {errors.name && <span className="text-[10px] text-[#f87171] font-sans">{errors.name}</span>}
                  </div>

                  {/* from email */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] text-[#2e4255] uppercase tracking-[1.5px] font-bold">
                      from <span className="text-[var(--accent)] opacity-80">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors(p => ({ ...p, email: undefined })); }}
                      placeholder="your@email.com"
                      className={`rounded-[6px] px-2.5 py-2 text-white font-mono text-[12px] outline-none transition-all w-full border ${
                        errors.email ? "border-[#f87171] bg-[#f87171]/[0.04]" : "border-white/[.07] focus:border-[rgba(143,178,255,.28)] focus:bg-[rgba(143,178,255,.04)]"
                      } ${shake.email ? "animate-shake" : ""}`}
                      style={{ background: errors.email ? undefined : "rgba(0,0,0,.35)" }}
                    />
                    {errors.email && <span className="text-[10px] text-[#f87171] font-sans">{errors.email}</span>}
                  </div>

                  {/* to — read-only configured destination */}
                  {/* <div className="sm:col-span-2 flex flex-col gap-1">
                    <label className="text-[9px] text-[#2e4255] uppercase tracking-[1.5px] font-bold">to</label>
                    <div
                      className="rounded-[6px] px-2.5 py-2 font-mono text-[12px] text-[#3a6a5a] border border-white/[.04] flex items-center gap-2 cursor-not-allowed select-none"
                      style={{ background: "rgba(0,0,0,.2)" }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] flex-shrink-0 opacity-70" />
                      {PERSONAL.email}
                    </div>
                  </div> */}

                  {/* message */}
                  <div className="sm:col-span-2 flex flex-col gap-1">
                    <label className="text-[9px] text-[#2e4255] uppercase tracking-[1.5px] font-bold">
                      message <span className="text-[var(--accent)] opacity-80">*</span>
                    </label>
                    <textarea
                      value={msg || DEFAULT_MSG}
                      onChange={(e) => { setMsg(e.target.value); if (errors.msg) setErrors(p => ({ ...p, msg: undefined })); }}
                      placeholder={DEFAULT_MSG}
                      rows={7}
                      className={`rounded-[6px] px-2.5 py-2 text-white font-mono text-[12px] outline-none resize-none leading-[1.65] w-full border ${
                        errors.msg ? "border-[#f87171] bg-[#f87171]/[0.04]" : "border-white/[.07] focus:border-[rgba(143,178,255,.28)] focus:bg-[rgba(143,178,255,.04)]"
                      } ${shake.msg ? "animate-shake" : ""}`}
                      style={{ background: errors.msg ? undefined : "rgba(0,0,0,.35)" }}
                    />
                    {errors.msg && <span className="text-[10px] text-[#f87171] font-sans">{errors.msg}</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* output — always visible; shows idle hint or result */}
          <div className="flex min-h-[44px]" style={{ background: "#060710" }}>
            <div className="w-[54px] flex-shrink-0 px-2 py-3 flex items-start justify-end" style={{ background: "#050610", borderRight: "1px solid rgba(255,255,255,.04)" }}>
              <span className={`text-[11px] ${output.cls === "ok" ? "text-[#3a5a3a]" : "text-[var(--accent)] opacity-30"}`}>
                [{output.cls === "idle" ? " " : count}]:
              </span>
            </div>
            <div
              className={`flex-1 px-4 py-3 text-[12px] leading-[1.8] whitespace-pre-wrap break-all ${
                output.cls === "idle" ? "text-[#1e2e3e]" : outCls
              }`}
              dangerouslySetInnerHTML={{
                __html: output.cls === "idle" ? "# Awaiting execution…" : output.text
              }}
            />
          </div>

          {/* status bar */}
          <div className="flex items-center text-[9px] border-t" style={{ background: "#060710", borderColor: "rgba(255,255,255,.04)" }}>
            {["contact.ipynb", "Python 3.11.0"].map((t, i) => (
              <span key={t} className="px-3 py-[5px] text-[#1e2e3e] tracking-[.4px]">
                {i > 0 && <span className="mr-3 text-[rgba(255,255,255,.05)]">|</span>}
                {t}
              </span>
            ))}
            <span className={`ml-auto pr-3.5 py-[5px] ${output.cls === "running" ? "text-[var(--amber)]" : "text-[#2a4a2a]"}`}>
              ● {output.cls === "running" ? "Busy" : "Idle"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
