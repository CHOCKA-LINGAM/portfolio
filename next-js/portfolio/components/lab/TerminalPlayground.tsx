"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, Sparkles, Send, Trash2 } from "lucide-react";
import { themeOptions, ThemeId } from "@/components/ui/ThemeSwitcher";
import { PERSONAL } from "@/data/index";

interface TerminalLog {
  id: number;
  type: "input" | "output" | "system" | "success" | "error";
  text: string;
}

export const TerminalPlayground: React.FC = () => {
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState<TerminalLog[]>([
    {
      id: 1,
      type: "system",
      text: "Welcome to Chock CLI v2.4.0 (x86_64-apple-darwin22.0)",
    },
    {
      id: 2,
      type: "system",
      text: "Type 'help' for a list of available commands or try 'databricks-bundle', 'stack', 'theme cyberpunk', or 'contact'.",
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const addLog = (type: TerminalLog["type"], text: string) => {
    setLogs((prev) => [...prev, { id: Date.now() + Math.random(), type, text }]);
  };

  const handleCommand = (cmdStr: string) => {
    const raw = cmdStr.trim();
    if (!raw) return;

    addLog("input", `$ ${raw}`);
    const [cmd, ...args] = raw.split(" ");
    const commandName = cmd.toLowerCase();

    switch (commandName) {
      case "help":
        addLog(
          "output",
          `Available Chock CLI Commands:
  • databricks-bundle  : Run live simulation of published PyPI asset bundle deployment
  • stack              : Output ASCII architecture pipeline diagram
  • theme <theme-name> : Switch site theme directly (e.g. 'theme emerald', 'theme cyberpunk')
  • contact            : Display direct outreach & email details
  • about              : Print executive engineer overview
  • clear              : Clear terminal screen logs`
        );
        break;

      case "databricks-bundle":
        addLog("output", "[1/4] Connecting to PyPI repository (databricks-bundle v1.2.4)...");
        setTimeout(() => {
          addLog("output", "[2/4] Downloading wheels & validating cryptographic hashes... ✓");
        }, 300);
        setTimeout(() => {
          addLog("output", "[3/4] Authenticating with Databricks workspace host (https://adb-8493021.azuredatabricks.net)...");
        }, 650);
        setTimeout(() => {
          addLog("success", "[4/4] SUCCESS: Deployed multi-tenant PySpark asset bundle across 12 worker nodes. Ingestion runtime: 8.5min.");
        }, 1100);
        break;

      case "stack":
        addLog(
          "output",
          `+-----------------------------------------------------------------------+
| SYSTEM ARCHITECTURE PIPELINE                                         |
+-----------------------------------------------------------------------+
 [Raw Events] ──> (Apache Kafka) ──> [PySpark / Databricks Ingestion] 
                                                    │
                                                    ▼
 [Client UI]  <── (FastAPI Async) <── [PostgreSQL + Redis Cache Layer]
                                                    │
                                                    ▼
                                    [AWS Bedrock LLM Guardrails]`
        );
        break;

      case "theme":
        if (args.length === 0) {
          addLog("error", "Error: Specify a theme name. Example: 'theme emerald'. Available: " + themeOptions.map(t => t.id).join(", "));
        } else {
          const targetTheme = args[0].toLowerCase() as ThemeId;
          const match = themeOptions.find((t) => t.id === targetTheme);
          if (match) {
            localStorage.setItem("portfolio_theme", match.id);
            if (match.id === "midnight") {
              document.documentElement.removeAttribute("data-theme");
            } else {
              document.documentElement.setAttribute("data-theme", match.id);
            }
            addLog("success", `Switched active theme to '${match.name}' (${match.id})`);
          } else {
            addLog("error", `Error: Unknown theme '${args[0]}'. Available: ` + themeOptions.map(t => t.id).join(", "));
          }
        }
        break;

      case "contact":
        addLog(
          "output",
          `Direct Contact Info:
  • Email   : ${PERSONAL.email}
  • LinkedIn: ${PERSONAL.linkedin}
  • GitHub  : ${PERSONAL.github}
  • Status  : Available for Senior Backend & Tech Lead roles globally`
        );
        break;

      case "about":
        addLog("output", `${PERSONAL.name} - ${PERSONAL.role}. 5+ years building high-throughput backend microservices, PySpark ETL engines, and production AI workflows at iLink Digital & Standard Chartered.`);
        break;

      case "clear":
        setLogs([]);
        break;

      default:
        addLog("error", `Command not found: '${commandName}'. Type 'help' for available CLI commands.`);
        break;
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
    setInput("");
  };

  return (
    <div className="w-full rounded-2xl border border-[var(--border-strong)] bg-slate-950 p-4 sm:p-5 shadow-2xl flex flex-col gap-3 font-mono text-xs sm:text-sm">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-slate-400 font-bold ml-2 flex items-center gap-1.5">
            <TerminalIcon className="w-4 h-4 text-sky-400" />
            Chock CLI &mdash; Interactive Terminal
          </span>
        </div>

        <button
          onClick={() => setLogs([])}
          className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-xs cursor-pointer"
          title="Clear screen logs"
        >
          <Trash2 className="w-3.5 h-3.5" /> Clear
        </button>
      </div>

      {/* Log Output Window */}
      <div className="flex flex-col gap-2 min-h-[220px] max-h-[380px] overflow-y-auto font-mono text-xs leading-relaxed p-1">
        {logs.map((log) => (
          <div
            key={log.id}
            className={`whitespace-pre-wrap break-words ${
              log.type === "input"
                ? "text-sky-300 font-bold"
                : log.type === "success"
                ? "text-emerald-400 font-bold"
                : log.type === "error"
                ? "text-rose-400"
                : log.type === "system"
                ? "text-slate-400 italic"
                : "text-slate-200"
            }`}
          >
            {log.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input Prompt Form */}
      <form onSubmit={onSubmit} className="flex items-center gap-2 pt-2 border-t border-white/10">
        <span className="text-emerald-400 font-bold">$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Try 'databricks-bundle', 'stack', 'theme cyberpunk', or 'help'..."
          className="flex-1 bg-transparent text-slate-100 outline-none font-mono text-xs sm:text-sm placeholder-slate-500"
        />
        <button
          type="submit"
          className="px-3 py-1.5 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-400/50 hover:bg-sky-500/30 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
        >
          Run <Send className="w-3 h-3" />
        </button>
      </form>
    </div>
  );
};
