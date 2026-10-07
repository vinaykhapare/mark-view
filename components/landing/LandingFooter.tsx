import React from "react";
import Link from "next/link";
import { MarkViewLogo } from "../ui/MarkViewLogo";

export function LandingFooter() {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]/40 text-xs text-[var(--text-muted)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand & Tagline */}
        <div className="flex items-center gap-3">
          <div className="relative w-6 h-6 rounded-md overflow-hidden flex items-center justify-center shrink-0 border border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
            <MarkViewLogo size={24} className="w-full h-full" />
          </div>
          <span className="font-semibold text-xs text-[var(--text-primary)] tracking-tight">
            MarkView Studio
          </span>
          <span className="text-[11px] font-mono text-[var(--text-faint)]">
            v2.4 • Client-Side AST
          </span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-6 text-xs text-[var(--text-secondary)]">
          <Link href="/app" className="hover:text-[var(--text-primary)] transition-colors">
            Studio
          </Link>
          <Link href="/docs" className="hover:text-[var(--text-primary)] transition-colors">
            Documentation
          </Link>
          <Link href="/about" className="hover:text-[var(--text-primary)] transition-colors">
            Manifesto
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--text-primary)] transition-colors"
          >
            GitHub
          </a>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--text-muted)]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
          <span>All systems client-side</span>
        </div>
      </div>
    </footer>
  );
}
