import React from "react";
import { PenLine, Split, DownloadCloud, ArrowRight, CheckCircle2 } from "lucide-react";

export function SimpleWorkflowSection() {
  const steps = [
    {
      stage: "STAGE 01",
      icon: <PenLine className="w-4 h-4 text-indigo-500" />,
      title: "Flow-State Authoring",
      description:
        "Write in an uncluttered editor with crisp Geist Mono typography, smart tab indenting, and Zen Mode (⌘+Shift+F) to strip away all distractions.",
      tag: "Client-side Editor Buffer",
    },
    {
      stage: "STAGE 02",
      icon: <Split className="w-4 h-4 text-cyan-500" />,
      title: "Instant Dual Synthesis",
      description:
        "Sub-millisecond AST parser continuously compiles KaTeX equations, Mermaid flowcharts, and GFM checklists as you type with synchronized scrolling.",
      tag: "Reactive Virtual DOM",
    },
    {
      stage: "STAGE 03",
      icon: <DownloadCloud className="w-4 h-4 text-emerald-500" />,
      title: "Universal Export",
      description:
        "Package your document into a self-contained styled HTML file with embedded fonts, a print-optimized vector PDF, or a Word DOCX file with a single click.",
      tag: "Offline Publication Engine",
    },
  ];

  return (
    <section id="workflow" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[var(--border-subtle)]">
      <div className="max-w-3xl mb-16 text-left">
        <p className="font-mono text-xs font-semibold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase mb-3">
          Execution Flow
        </p>
        <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.035em] text-[var(--text-primary)] leading-tight mb-4">
          From initial thought to publication in real time.
        </h2>
        <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed font-normal">
          No compile wait, no telemetry roundtrips, and no configuration friction.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {steps.map((item, index) => (
          <div
            key={index}
            className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/40 hover:border-[var(--border-medium)] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] font-semibold text-[var(--text-muted)] tracking-wider">
                  {item.stage}
                </span>
                <div className="w-7 h-7 rounded-md bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center">
                  {item.icon}
                </div>
              </div>

              <h3 className="text-lg font-semibold tracking-tight text-[var(--text-primary)] mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-6">
                {item.description}
              </p>
            </div>

            <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center gap-1.5 font-mono text-[11px] text-[var(--text-muted)]">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <span>{item.tag}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
