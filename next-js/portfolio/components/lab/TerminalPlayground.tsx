"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, Send, Trash2 } from "lucide-react";
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
      text: "Type 'help' for a list of available commands or try 'databricks-bundle', 'stack', 'about', or 'contact'.",
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
    const [cmd] = raw.split(" ");
    const commandName = cmd.toLowerCase();

    switch (commandName) {
      case "help":
        addLog(
          "output",
          `Available Chock CLI Commands:
  • databricks-bundle  : Simulate the Pandas to PySpark migration
  • stack              : Output ASCII architecture pipeline diagram
  • contact            : Display direct outreach & email details
  • about              : Print executive engineer overview
  • clear              : Clear terminal screen logs`
        );
        break;

      case "databricks-bundle":
        addLog("output", "[1/3] Legacy Pandas pipelines identified...");
        setTimeout(() => {
          addLog("output", "[2/3] Migrating to distributed PySpark on Azure Databricks...");
        }, 400);
        setTimeout(() => {
          addLog("success", "[3/3] DONE: Pandas to PySpark migration complete. DAG planning API responds in under 5s.");
        }, 900);
        break;

      case "stack":
        addLog(
          "output",
          `+-----------------------------------------------------------------------+
| SYSTEM ARCHITECTURE PIPELINE                                         |
+-----------------------------------------------------------------------+
 [Raw Events] ──> (Azure Databricks) ──> [PySpark / Databricks Ingestion] 
                                                    │
                                                    ▼
 [Client UI]  <── (FastAPI Async) <── [Django multi-tenant backend]
                                                    │
                                                    ▼
                                    [AWS Bedrock AI workflows]`
        );
        break;

      case "contact":
        addLog(
          "output",
          `Direct Contact Info:
  • Email   : ${PERSONAL.email}
  • LinkedIn: ${PERSONAL.linkedin}
  • GitHub  : ${PERSONAL.github}
  • Status  : Open to backend and data engineering roles`
        );
        break;

      case "about":
        addLog("output", `${PERSONAL.name} - ${PERSONAL.role}. Python backend engineer building multi-tenant Django platforms, PySpark data pipelines, and production AI workflows.`);
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
          placeholder="Try 'databricks-bundle', 'stack', 'about', or 'help'..."
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
