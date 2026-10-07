"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MarkdownPreview } from "../editor/MarkdownPreview";
import { ArrowUpRight, Code, Sigma, GitGraph, FileText, CheckCircle2 } from "lucide-react";

const SAMPLE_SNIPPETS = {
  math: `### 📐 Mathematical Formulation

The Gaussian normal distribution probability density is given by:

$$
f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} e^{-\\frac{1}{2}\\left(\\frac{x - \\mu}{\\sigma}\\right)^2}
$$

Inline Euler identity: $e^{i\\pi} + 1 = 0$, and limits: $\\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^n = e$.
`,
  diagram: `### 📊 Dynamic System Architecture

\`\`\`mermaid
graph TD
    Client[Browser Editor] -->|Incremental Delta| Engine[Client AST Compiler]
    Engine --> KaTeX[Native KaTeX Math]
    Engine --> Mermaid[Mermaid 12.0 Engine]
    Engine --> VDOM[Virtual DOM Synchronizer]
    VDOM --> Export[Standalone HTML / PDF]
\`\`\`
`,
  code: `### ⚡ Clean TypeScript Implementation

\`\`\`typescript
export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 225;
  const wordCount = text.trim().split(/\\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}
\`\`\`
`,
  table: `### 📋 Technical Capability Matrix

| Feature | Processing Engine | Client Privacy |
| :--- | :--- | :--- |
| KaTeX Mathematics | Native WebAssembly / JS | 100% Client-Side |
| Mermaid Diagrams | Dynamic Vector Engine | 100% Client-Side |
| Split Synchronizer | Bi-Directional ScrollSpy | 100% Client-Side |

- [x] Zero-telemetry client storage
- [x] Instant standalone HTML export
- [ ] Connect custom cloud vault
`,
};

const TAB_META = {
  math: { filename: "quantum-formulation.md", label: "KaTeX Math", icon: Sigma },
  diagram: { filename: "system-architecture.mmd", label: "Mermaid Diagram", icon: GitGraph },
  code: { filename: "parser-engine.ts", label: "Code Syntax", icon: Code },
  table: { filename: "specs-matrix.md", label: "Data Tables", icon: FileText },
};

export function InteractiveSandbox() {
  const [activeTab, setActiveTab] = useState<"math" | "diagram" | "code" | "table">("diagram");
  const [content, setContent] = useState(SAMPLE_SNIPPETS.diagram);

  const handleSnippetClick = (key: "math" | "diagram" | "code" | "table") => {
    setActiveTab(key);
    setContent(SAMPLE_SNIPPETS[key]);
  };

  const lineCount = content.split("\n").length;
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.03em] text-[var(--text-primary)] mb-3">
          Interactive by design.
        </h2>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
          Test real-time split rendering, LaTeX equation compilation, and Mermaid diagramming below.
        </p>

        {/* Refined Segmented Control */}
        <div className="inline-flex items-center p-1 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)] mt-6 gap-1 shadow-xs">
          {(["diagram", "math", "code", "table"] as const).map((key) => {
            const Icon = TAB_META[key].icon;
            const isSelected = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => handleSnippetClick(key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-xs border border-[var(--border-subtle)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{TAB_META[key].label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Editor Frame Mockup */}
      <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] shadow-lg overflow-hidden">
        {/* Window Titlebar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--bg-secondary)] border-b border-[var(--border-subtle)] select-none">
          <div className="flex items-center gap-3">
            {/* Window Dots */}
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-strong)]/30" />
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-strong)]/30" />
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-strong)]/30" />
            </div>

            {/* Active Document Tab */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-primary)]">
              <FileText className="w-3 h-3 text-indigo-500" />
              <span>{TAB_META[activeTab].filename}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="hidden sm:flex items-center gap-1.5 text-[var(--text-muted)] text-[11px] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              <span>Client AST Active</span>
            </div>

            <Link
              href="/app"
              className="flex items-center gap-1 font-medium text-xs text-[var(--text-primary)] hover:text-indigo-500 transition-colors"
            >
              <span>Launch Studio</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Split Sandbox Panes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[var(--border-subtle)] h-[460px] overflow-hidden">
          {/* Editor Pane */}
          <div className="h-full flex flex-col bg-[var(--bg-primary)]">
            <div className="flex items-center justify-between px-3.5 py-2 border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)]/30 text-[11px] font-mono text-[var(--text-muted)]">
              <span>MARKDOWN SOURCE</span>
              <span>{lineCount} lines • {wordCount} words</span>
            </div>
            <div className="flex-1 flex overflow-hidden">
              {/* Line Gutter */}
              <div className="w-10 py-3.5 pr-2 select-none text-right font-mono text-[11px] text-[var(--text-faint)] bg-[var(--bg-secondary)]/20 border-r border-[var(--border-subtle)] space-y-1">
                {Array.from({ length: Math.min(lineCount, 16) }).map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                spellCheck={false}
                className="flex-1 p-3.5 resize-none font-mono text-xs leading-relaxed bg-transparent text-[var(--text-primary)] outline-none border-none placeholder-[var(--text-muted)]"
              />
            </div>
          </div>

          {/* Live Preview Pane */}
          <div className="h-full flex flex-col bg-[var(--bg-secondary)]/30">
            <div className="flex items-center justify-between px-3.5 py-2 border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)]/50 text-[11px] font-mono text-[var(--text-muted)]">
              <span>LIVE RENDERED OUTPUT</span>
              <span className="text-emerald-500 font-medium">Synced</span>
            </div>
            <div className="flex-1 p-6 overflow-y-auto">
              <MarkdownPreview content={content} />
            </div>
          </div>
        </div>

        {/* Bottom Window Status Bar */}
        <div className="px-4 py-2 bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] text-[var(--text-muted)] font-mono">
          <div className="flex items-center gap-4">
            <span>Encoding: UTF-8</span>
            <span className="hidden sm:inline">Engine: KaTeX + GFM</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Zero Server Latency</span>
          </div>
        </div>
      </div>
    </section>
  );
}
