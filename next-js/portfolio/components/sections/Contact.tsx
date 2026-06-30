"use client";
import { useState, useRef } from "react";
import { Linkedin, Github, Mail, Phone, MapPin, Copy, Play, RotateCcw, Sparkles } from "lucide-react";
import { PERSONAL } from "@/data/index";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [output, setOutput] = useState<{ text: string; cls: "idle" | "running" | "ok" | "err" }>({ text: "# Output appears here after running", cls: "idle" });
  const [count, setCount] = useState(1);
  const [copied, setCopied] = useState(false);

  function previewName() { return name || "…"; }
  function previewEmail() { return email || "…"; }
  function previewMsg() { const m = msg || "…"; return m.length > 28 ? m.slice(0, 28) + "…" : m; }

  function nbRun() {
    if (!name || !email || !msg) {
      setCount(c => c + 1);
      setOutput({
        text: `Oops! Some details are missing:\n${!name ? "- Please enter your name\n" : ""}${!email ? "- Please enter your email\n" : ""}${!msg ? "- Please enter a message\n" : ""}`,
        cls: "err"
      });

      return;
    }
    setOutput({ text: "Executing…  ⟳", cls: "running" });
    setTimeout(() => {
      const subj = encodeURIComponent("Reaching out — Chockalingam Balan");
      window.location.href = `mailto:${PERSONAL.email}?subject=${subj}&body=${encodeURIComponent(msg)}`;
      setCount(c => c + 1);
      setOutput({ text: `✓ Message dispatched\n\nOut[${count + 1}]: {\n  'from'   : '${name} <${email}>',\n  'to'     : '${PERSONAL.email}',\n  'status' : 200,\n  'ts'     : '${new Date().toISOString()}'\n}`, cls: "ok" });
    }, 900);
  }

  function nbClear() { setName(""); setEmail(""); setMsg(""); setOutput({ text: "# Output appears here after running", cls: "idle" }); }

  function copyEmail() {
    navigator.clipboard.writeText(PERSONAL.email).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2200); });
  }

  const links = [
    { href: PERSONAL.linkedin, icon: <Linkedin size={16} />, label: "LINKEDIN", target: "_blank" },
    { href: PERSONAL.github, icon: <Github size={16} />, label: "GITHUB", target: "_blank" },
    { href: `mailto:${PERSONAL.email}`, icon: <Mail size={16} />, label: "MAIL" },
    // { href:`tel:${PERSONAL.phone.replace(/\s/g,"")}`, icon:<Phone size={16}/>, label:PERSONAL.phone },
  ];

  const outCls = output.cls === "ok" ? "text-[var(--green)]" : output.cls === "err" ? "text-[#c07070]" : output.cls === "running" ? "text-[var(--accent)]" : "text-[#2a3a4a]";

  return (
    <div>
      <div className="flex items-center gap-1.5 text-[11px] font-bold text-[var(--accent)] uppercase tracking-[2px] mb-3">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] animate-pulse-ring" />Let's Connect
      </div>
      <h2 className="text-[clamp(32px,4.5vw,50px)] font-black tracking-[-2.5px] text-white leading-none mb-8">Initialize a<br />Connection.</h2>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-[28px] lg:gap-[44px] items-start">
        <div>
          <p className="text-[14px] leading-[1.7] text-[var(--muted)] mb-6 max-w-[380px]">{PERSONAL.summary}</p>
          <div className="flex flex-col gap-2.5">
            {links.map(l => (
              <a key={l.href} href={l.href} target={(l as any).target} rel="noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-[12px] border text-[var(--muted2)] font-bold text-[13px] transition-all hover:border-[rgba(var(--ar),.25)] hover:bg-[rgba(var(--ar),.06)] hover:translate-x-1.5 hover:text-white"
                style={{ border: "1px solid var(--border)", background: "rgba(255,255,255,.02)" }}>
                <span className="text-[var(--accent)] flex-shrink-0">{l.icon}</span>{l.label}
              </a>
            ))}
            {/* <div className="flex items-center gap-3 px-4 py-3 rounded-[12px] border text-[var(--muted2)] text-[13px]" style={{border:"1px solid var(--border)",background:"rgba(255,255,255,.02)"}}>
              <MapPin size={16} className="text-[var(--accent)] flex-shrink-0" />{PERSONAL.location}
            </div> */}
            <button onClick={copyEmail} className="flex items-center gap-3 px-4 py-3 rounded-[12px] border text-[var(--accent)] font-bold text-[13px] text-left w-full transition-all hover:border-[rgba(var(--ar),.25)] hover:translate-x-1.5"
              style={{ border: "1px solid rgba(var(--ar),.18)", background: "rgba(var(--ar),.06)" }}>
              <Copy size={16} />{copied ? "Copied! ✓" : "Copy email address"}
            </button>
          </div>
        </div>

        {/* Jupyter Notebook */}
        <div className="rounded-[14px] overflow-hidden font-mono shadow-[0_28px_72px_-16px_rgba(0,0,0,.75)]" style={{ background: "#08090f", border: "1px solid rgba(255,255,255,.09)" }}>
          {/* titlebar */}
          <div className="flex items-center gap-2.5 px-4 py-2.5" style={{ background: "#0b0c15", borderBottom: "1px solid rgba(255,255,255,.05)" }}>
            <div className="flex gap-1.5">
              {["#ff5f56", "#ffbd2e", "#27c93f"].map(c => <span key={c} className="w-[11px] h-[11px] rounded-full block" style={{ background: c }} />)}
            </div>
            <span className="flex-1 text-center text-[11px] text-[#3a4e62] tracking-[.4px]">contact.ipynb</span>
            <span className="flex items-center gap-1.5 text-[9px] text-[#2a3e52]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] shadow-[0_0_6px_rgba(74,222,128,.5)]" />Python 3
            </span>
          </div>
          {/* toolbar */}
          <div className="flex items-center gap-1.5 px-3 py-1.5" style={{ background: "#090a13", borderBottom: "1px solid rgba(255,255,255,.04)" }}>
            {[{ icon: <Play size={10} />, label: "Run Cell", onClick: nbRun, accent: true }, { icon: <RotateCcw size={10} />, label: "Clear", onClick: nbClear }, { icon: <Sparkles size={10} />, label: "AI Refine ✨", disabled: true, onClick: () => { } }].map(b => (
              <button key={b.label} disabled={b.disabled} onClick={b.onClick} className={`
    inline-flex items-center gap-1 px-2.5 py-1 rounded-[5px]
    text-[10px] font-bold font-mono whitespace-nowrap transition-all
    ${b.accent
                  ? "text-[var(--accent)] hover:bg-[rgba(var(--ar),.2)]"
                  : "text-[#5a7080] hover:text-[var(--accent)] hover:border-[rgba(var(--ar),.22)]"
                }
    ${b.disabled
                  ? "opacity-40 cursor-not-allowed pointer-events-none"
                  : "cursor-pointer"
                }
  `}
                style={{
                  background: b.accent
                    ? "rgba(var(--ar),.1)"
                    : "rgba(255,255,255,.035)",
                  border: `1px solid ${b.accent
                    ? "rgba(var(--ar),.22)"
                    : "rgba(255,255,255,.07)"
                    }`,
                }}>
                {b.icon}{b.label}
              </button>
            ))}
            <span className="ml-auto flex items-center gap-1.5 text-[10px] text-[#2a3a4a]">
              <span className="w-[7px] h-[7px] rounded-full bg-[var(--green)] shadow-[0_0_6px_rgba(74,222,128,.5)]" />Idle
            </span>
          </div>
          {/* cell */}
          <div className="flex border-b relative" style={{ borderColor: "rgba(255,255,255,.04)", background: "rgba(var(--ar),.015)" }}>
            <div className="absolute left-0 top-0 bottom-0 w-[2.5px] rounded-r bg-[var(--accent)] opacity-50" />
            <div className="w-[54px] flex-shrink-0 px-2 py-3 flex flex-col items-end" style={{ background: "#070810", borderRight: "1px solid rgba(255,255,255,.04)" }}>
              <span className="text-[11px] text-[var(--accent)]">[{count}]:</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="px-4 py-2.5 text-[12px] leading-none border-b overflow-hidden text-ellipsis whitespace-nowrap" style={{ background: "rgba(0,0,0,.15)", borderColor: "rgba(255,255,255,.04)" }}>
                <span className="text-[#f0b96a]">send_message</span>
                <span className="text-[#6a7e8e]">(</span>
                <span className="text-[var(--accent)]">name</span>=<span className="text-[#86c986]">"{previewName()}"</span>,{" "}
                <span className="text-[var(--accent)]">email</span>=<span className="text-[#86c986]">"{previewEmail()}"</span>,{" "}
                <span className="text-[var(--accent)]">message</span>=<span className="text-[#86c986]">"{previewMsg()}"</span>
                <span className="text-[#6a7e8e]">)</span>
              </div>
              <div className="px-4 py-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-2.5">
                  {[{ label: "name", value: name, set: setName, type: "text", ph: "Your name" }, { label: "email", value: email, set: setEmail, type: "email", ph: "your@email.com" }].map(f => (
                    <div key={f.label} className="flex flex-col gap-1.5">
                      <label className="text-[9px] text-[#2e4255] uppercase tracking-[1px] font-bold">{f.label} <span className="text-[var(--accent)] opacity-60">*</span></label>
                      <input type={f.type} value={f.value} onChange={e => f.set(e.target.value)} placeholder={f.ph}
                        className="rounded-[6px] px-2.5 py-2 text-white font-mono text-[12px] outline-none transition-all w-full focus:border-[rgba(var(--ar),.28)] focus:bg-[rgba(var(--ar),.04)]"
                        style={{ background: "rgba(0,0,0,.35)", border: "1px solid rgba(255,255,255,.07)" }} />
                    </div>
                  ))}
                  <div className="sm:col-span-2 flex flex-col gap-1.5">
                    <label className="text-[9px] text-[#2e4255] uppercase tracking-[1px] font-bold">message <span className="text-[var(--accent)] opacity-60">*</span></label>
                    <textarea value={msg} onChange={e => setMsg(e.target.value)} placeholder="Hey Chockalingam, let's discuss…" rows={4}
                      className="rounded-[6px] px-2.5 py-2 text-white font-mono text-[12px] outline-none resize-none leading-[1.65] w-full focus:border-[rgba(var(--ar),.28)] focus:bg-[rgba(var(--ar),.04)]"
                      style={{ background: "rgba(0,0,0,.35)", border: "1px solid rgba(255,255,255,.07)" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* output */}
          <div className="flex min-h-[44px]" style={{ background: "#060710" }}>
            <div className="w-[54px] flex-shrink-0 px-2 py-3 flex flex-col items-end" style={{ background: "#050610", borderRight: "1px solid rgba(255,255,255,.04)" }}>
              <span className={`text-[11px] ${output.cls === "ok" ? "text-[#3a5a3a]" : "text-[#1e2e3e]"}`}>[{output.cls === "idle" ? "" : count}]:</span>
            </div>
            <div className={`flex-1 px-4 py-3 text-[12px] leading-[1.8] whitespace-pre-wrap break-all ${outCls}`} dangerouslySetInnerHTML={{ __html: output.text }} />
          </div>
          {/* status bar */}
          <div className="flex items-center text-[9px] border-t" style={{ background: "#060710", borderColor: "rgba(255,255,255,.04)" }}>
            {["contact.ipynb", "Python 3.11.0"].map((t, i) => (
              <span key={t} className="px-3 py-[5px] text-[#1e2e3e] tracking-[.4px]">{i > 0 && <span className="mr-3 text-[rgba(255,255,255,.05)]">|</span>}{t}</span>
            ))}
            <span className={`ml-auto pr-3.5 py-[5px] ${output.cls === "running" ? "text-[var(--amber)]" : output.cls === "ok" ? "text-[#2a4a2a]" : "text-[#2a4a2a]"}`}>
              ● {output.cls === "running" ? "Busy" : "Idle"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
