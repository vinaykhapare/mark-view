import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Layers, Command, Cpu } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-16 pb-16 sm:pt-24 sm:pb-20 overflow-hidden">
      {/* Subtle Architectural Ambient Lighting */}
      <div 
        className="absolute inset-0 -z-10 pointer-events-none opacity-40 dark:opacity-25"
        style={{
          backgroundImage: `radial-gradient(ellipse 65% 55% at 50% -10%, rgba(99, 102, 241, 0.25), transparent 75%)`,
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.035em] text-[var(--text-primary)] leading-[1.08] mb-6 max-w-4xl">
          The Markdown studio engineered for deep focus.
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-[var(--text-secondary)] mb-10 leading-relaxed font-normal">
          A distraction-free, local-first writing environment built for engineers, researchers, and technical authors. Real-time split preview, native LaTeX typography, dynamic Mermaid diagrams, and instant publication export.
        </p>

        {/* CTA Button Group */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-14 w-full">
          <Link
            href="/app"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-lg text-sm font-medium bg-[var(--text-primary)] text-[var(--bg-primary)] hover:opacity-90 active:scale-[0.99] transition-all cursor-pointer shadow-xs"
          >
            <span>Open Studio</span>
            <kbd className="hidden sm:inline-block font-mono text-[10px] px-1.5 py-0.5 rounded bg-[var(--bg-primary)]/15 text-[var(--bg-primary)] border border-transparent">
              ⌘O
            </kbd>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            href="/docs"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-[var(--text-primary)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] hover:border-[var(--border-medium)] transition-all cursor-pointer"
          >
            <span>View Documentation</span>
          </Link>
        </div>

        {/* Engineering Highlights Strip */}
        <div className="w-full max-w-4xl pt-8 border-t border-[var(--border-subtle)] grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
          <div className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/50">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--text-primary)] mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>100% Client-Side</span>
            </div>
            <p className="text-[11px] text-[var(--text-muted)] leading-normal">
              Zero telemetry. Keystrokes never touch an external server.
            </p>
          </div>

          <div className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/50">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--text-primary)] mb-1">
              <Zap className="w-3.5 h-3.5 text-indigo-500" />
              <span>Sub-1ms Split Sync</span>
            </div>
            <p className="text-[11px] text-[var(--text-muted)] leading-normal">
              Bi-directional synchronized scroll between editor &amp; preview.
            </p>
          </div>

          <div className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/50">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--text-primary)] mb-1">
              <Layers className="w-3.5 h-3.5 text-cyan-500" />
              <span>KaTeX &amp; Mermaid</span>
            </div>
            <p className="text-[11px] text-[var(--text-muted)] leading-normal">
              Math equations and flowcharts compiled instantly on client.
            </p>
          </div>

          <div className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/50">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--text-primary)] mb-1">
              <Command className="w-3.5 h-3.5 text-purple-500" />
              <span>Raycast Command</span>
            </div>
            <p className="text-[11px] text-[var(--text-muted)] leading-normal">
              Quick keyboard navigation with Ctrl+K / ⌘K shortcuts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
