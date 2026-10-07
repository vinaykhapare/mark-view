import React from "react";
import {
  Columns,
  Sigma,
  GitGraph,
  Command,
  Download,
  ShieldCheck,
  Maximize2,
  FileCode,
  ArrowRight,
  HardDrive,
  Cpu,
} from "lucide-react";

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[var(--border-subtle)]">
      {/* Section Header */}
      <div className="max-w-3xl mb-16 text-left">
        <p className="font-mono text-xs font-semibold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase mb-3">
          Architecture &amp; Features
        </p>
        <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.035em] text-[var(--text-primary)] leading-tight mb-4">
          Engineered for technical rigor and zero friction.
        </h2>
        <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed font-normal">
          Every layer of MarkView is built for instant client execution, publication-grade typography, and complete data sovereignty.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Tile 1: Dual-Pane Synchronization (2 Columns) */}
        <div className="md:col-span-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/50 p-6 sm:p-8 flex flex-col justify-between hover:border-[var(--border-medium)] transition-all">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider bg-indigo-500/10 px-2 py-0.5 rounded">
                Virtual DOM Synchronizer
              </span>
              <span className="font-mono text-xs text-[var(--text-muted)]">60 FPS Target</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[var(--text-primary)] mb-2">
              Sub-millisecond Dual-Pane Synchronization
            </h3>
            <p className="text-sm text-[var(--text-secondary)] max-w-xl leading-relaxed">
              Bi-directional scroll spy locks your editing cursor and rendered document in perfect alignment. Switch between split-view, editor-only focus, or clean presentation preview without losing context.
            </p>
          </div>

          {/* Mini Mock Visual */}
          <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] grid grid-cols-2 gap-3 font-mono text-[11px]">
            <div className="p-3 rounded bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-muted)]">
              <span className="text-[var(--text-primary)] font-semibold block mb-1">Editor Buffer</span>
              <code># Heading Section</code>
              <div className="w-16 h-1 bg-indigo-500/50 rounded mt-1.5 animate-pulse" />
            </div>
            <div className="p-3 rounded bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-muted)]">
              <span className="text-[var(--text-primary)] font-semibold block mb-1">Render Tree</span>
              <span className="text-indigo-500 font-semibold block">Heading Section</span>
              <div className="w-20 h-1 bg-emerald-500/50 rounded mt-1.5" />
            </div>
          </div>
        </div>

        {/* Tile 2: Native KaTeX Math (1 Column) */}
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/50 p-6 sm:p-8 flex flex-col justify-between hover:border-[var(--border-medium)] transition-all">
          <div>
            <div className="w-8 h-8 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] flex items-center justify-center text-indigo-500 mb-4">
              <Sigma className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-semibold tracking-tight text-[var(--text-primary)] mb-2">
              Native KaTeX Mathematics
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Full support for LaTeX equations, tensors, and matrices. Typeset directly inside your browser with sub-second vector rendering.
            </p>
          </div>

          <div className="mt-5 p-3 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-center font-mono text-xs text-blue-400">
            {"$$\\oint \\mathbf{E} \\cdot d\\mathbf{l} = -\\frac{\\partial \\Phi_B}{\\partial t}$$"}
          </div>
        </div>

        {/* Tile 3: Mermaid Diagrams (1 Column) */}
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/50 p-6 sm:p-8 flex flex-col justify-between hover:border-[var(--border-medium)] transition-all">
          <div>
            <div className="w-8 h-8 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] flex items-center justify-center text-cyan-500 mb-4">
              <GitGraph className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-semibold tracking-tight text-[var(--text-primary)] mb-2">
              Mermaid 12.0 Diagrams
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Generate flowcharts, sequence interactions, and state machines purely from plaintext. Zero third-party cloud rendering dependencies.
            </p>
          </div>

          <div className="mt-5 p-3 rounded bg-[var(--bg-elevated)] border border-[var(--border-subtle)] font-mono text-[11px] text-[var(--text-muted)] flex items-center justify-between">
            <span>Client</span>
            <span className="text-indigo-500">→ AST →</span>
            <span>SVG Vector</span>
          </div>
        </div>

        {/* Tile 4: Raycast Command Palette (1 Column) */}
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/50 p-6 sm:p-8 flex flex-col justify-between hover:border-[var(--border-medium)] transition-all">
          <div>
            <div className="w-8 h-8 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] flex items-center justify-center text-purple-500 mb-4">
              <Command className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-semibold tracking-tight text-[var(--text-primary)] mb-2">
              Command Palette (⌘K)
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Navigate documents, insert templates, toggle Zen mode, and trigger exports without lifting your hands from the keyboard.
            </p>
          </div>

          <div className="mt-5 flex items-center gap-1.5 font-mono text-[11px] text-[var(--text-muted)]">
            <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)]">⌘K</kbd>
            <span>Command</span>
            <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] ml-2">⌘\</kbd>
            <span>Sidebar</span>
          </div>
        </div>

        {/* Tile 5: Multi-Format Export (1 Column) */}
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/50 p-6 sm:p-8 flex flex-col justify-between hover:border-[var(--border-medium)] transition-all">
          <div>
            <div className="w-8 h-8 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] flex items-center justify-center text-emerald-500 mb-4">
              <Download className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-semibold tracking-tight text-[var(--text-primary)] mb-2">
              Multi-Format Export
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Single-click compile to standalone styled HTML with embedded CSS, print-optimized vector PDF, Word DOCX, or clean raw Markdown.
            </p>
          </div>

          <div className="mt-5 flex items-center gap-2 font-mono text-[11px]">
            <span className="px-2 py-0.5 rounded bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-emerald-600 dark:text-emerald-400">.html</span>
            <span className="px-2 py-0.5 rounded bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-rose-500">.pdf</span>
            <span className="px-2 py-0.5 rounded bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-blue-500">.docx</span>
          </div>
        </div>

        {/* Tile 6: 100% Client-Side Privacy (3 Columns Wide) */}
        <div className="md:col-span-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/50 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-[var(--border-medium)] transition-all">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <h3 className="text-xl font-semibold tracking-tight text-[var(--text-primary)]">
                Local-First &amp; Zero-Telemetry Guarantee
              </h3>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Your drafts, intellectual property, equations, and code never touch external servers or cloud databases. IndexedDB and LocalStorage keep your work persisted on your local device with zero tracking cookies.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="px-3.5 py-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] font-mono text-xs text-[var(--text-primary)] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>0 bytes sent to cloud</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
