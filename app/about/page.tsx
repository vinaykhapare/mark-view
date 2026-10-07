import React from "react";
import Link from "next/link";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { ArrowLeft, ShieldCheck, Cpu, ArrowRight, Lock, Layers, Zap } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <LandingNavbar />

      <main className="max-w-4xl mx-auto pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] mb-8">
          <Link href="/" className="hover:text-[var(--text-primary)] transition-colors flex items-center gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>STUDIO</span>
          </Link>
          <span>/</span>
          <span className="text-[var(--text-primary)]">ENGINEERING MANIFESTO</span>
        </div>

        {/* Title */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[11px] font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Platform Principles & Architecture
          </div>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[var(--text-primary)] mb-4">
            The MarkView Manifesto
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl">
            Why we engineered a local-first, distraction-free markdown studio designed for technical specifications, mathematical rigor, and publication-grade output.
          </p>
        </div>

        {/* Core Principles */}
        <div className="space-y-6 text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
          {/* Card 1 */}
          <div className="p-7 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)] flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-semibold tracking-tight text-[var(--text-primary)]">
                1. 100% Client-Side Privacy by Architecture
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              Your proprietary RFCs, source code, research drafts, and formulas belong solely to you. MarkView requires <strong>no account creation</strong> and executes entirely inside your client browser. There are no tracking pixels, telemetry events, or remote database synchronizations inspecting your keystrokes.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-7 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)] flex items-center justify-center text-blue-400">
                <Cpu className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-semibold tracking-tight text-[var(--text-primary)]">
                2. Modern Technical Foundations
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              MarkView is built with <strong>Next.js 16 App Router</strong>, <strong>React 19</strong>, <strong>Tailwind CSS</strong>, <strong>KaTeX</strong>, and <strong>Mermaid 12.0</strong>. We leverage native DOM layout pipelines for sub-millisecond typing response and deterministic split synchronization.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-7 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)] flex items-center justify-center text-violet-400">
                <Layers className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-semibold tracking-tight text-[var(--text-primary)]">
                3. Design Integrity: Linear Meets Raycast
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              Legacy markdown tools are either sterile plain-text boxes or sluggish desktop Electron wrappers with heavy memory footprints. We created an environment inspired by the craft of <strong>Linear</strong>, the simplicity of <strong>Notion</strong>, and the command efficiency of <strong>Raycast</strong>.
            </p>
          </div>
        </div>

        {/* Minimalist CTA */}
        <div className="mt-12 p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-base font-semibold text-[var(--text-primary)] tracking-tight">
              Ready to experience MarkView Studio?
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              Zero configuration. Instant local memory buffer.
            </p>
          </div>
          <Link
            href="/app"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-[var(--text-primary)] text-[var(--bg-primary)] hover:opacity-90 transition-opacity shrink-0"
          >
            <span>Launch Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
