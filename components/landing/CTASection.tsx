import React from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[var(--border-subtle)]">
      <div className="max-w-4xl mx-auto p-8 sm:p-14 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/60 text-center relative overflow-hidden">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.035em] text-[var(--text-primary)] mb-4">
          Ready to write with clarity?
        </h2>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] mb-8 max-w-xl mx-auto leading-relaxed">
          No sign-up, no telemetry, and zero latency. Launch directly into the studio and draft your technical RFCs, formulas, and architecture diagrams today.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
          <Link
            href="/app"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium bg-[var(--text-primary)] text-[var(--bg-primary)] hover:opacity-90 transition-all cursor-pointer shadow-xs"
          >
            <span>Open Studio Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/docs"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-[var(--text-primary)] bg-[var(--bg-elevated)] hover:bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] hover:border-[var(--border-medium)] transition-all cursor-pointer"
          >
            <span>Syntax Documentation</span>
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-[var(--text-muted)] font-mono">
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-500" />
            <span>Zero Sign-up</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-500" />
            <span>100% Client-Side</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-500" />
            <span>Instant HTML/PDF Export</span>
          </div>
        </div>
      </div>
    </section>
  );
}
