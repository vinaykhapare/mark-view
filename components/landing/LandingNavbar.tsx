"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "../ThemeProvider";
import { MarkViewLogo } from "../ui/MarkViewLogo";

export function LandingNavbar() {
  const { resolvedTheme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[var(--bg-primary)]/85 backdrop-blur-md border-b border-[var(--border-subtle)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center shrink-0 border border-[var(--border-subtle)] bg-[var(--bg-secondary)] group-hover:border-[var(--border-medium)] transition-all">
            <MarkViewLogo size={32} className="w-full h-full" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm tracking-tight text-[var(--text-primary)] leading-none">
              MarkView
            </span>
            <span className="text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-wider mt-0.5">
              Studio
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-[var(--text-secondary)]">
          <a href="#features" className="hover:text-[var(--text-primary)] transition-colors">
            Features
          </a>
          <a href="#workflow" className="hover:text-[var(--text-primary)] transition-colors">
            Workflow
          </a>
          <Link href="/docs" className="hover:text-[var(--text-primary)] transition-colors">
            Docs &amp; Syntax
          </Link>
          <Link href="/about" className="hover:text-[var(--text-primary)] transition-colors">
            Manifesto
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] transition-colors cursor-pointer"
            title={`Switch to ${resolvedTheme === "dark" ? "Light" : "Dark"} mode`}
            aria-label="Toggle Theme"
          >
            {resolvedTheme === "dark" ? (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-indigo-600" />
            )}
          </button>

          {/* Open Studio CTA */}
          <Link
            href="/app"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-[var(--text-primary)] text-[var(--bg-primary)] hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer shadow-xs"
          >
            <span>Open Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-md text-[var(--text-muted)] hover:bg-[var(--bg-tertiary)] border border-[var(--border-subtle)]"
          >
            {resolvedTheme === "dark" ? (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-indigo-600" />
            )}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-md text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] border border-[var(--border-subtle)]"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[var(--bg-elevated)] border-b border-[var(--border-subtle)] px-4 py-4 space-y-3 animate-in fade-in duration-150">
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            Features
          </a>
          <a
            href="#workflow"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            Workflow
          </a>
          <Link
            href="/docs"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            Docs &amp; Syntax
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            Manifesto
          </Link>
          <div className="pt-2">
            <Link
              href="/app"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-1.5 px-4 py-2 rounded-md text-xs font-medium bg-[var(--text-primary)] text-[var(--bg-primary)] shadow-xs text-center"
            >
              <span>Launch Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
