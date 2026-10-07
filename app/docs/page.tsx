"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { ArrowLeft, BookOpen, Sigma, GitGraph, Keyboard, Download, ArrowRight, Terminal } from "lucide-react";
import { MarkdownPreview } from "@/components/editor/MarkdownPreview";

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState<"markdown" | "math" | "diagrams" | "shortcuts" | "export">("markdown");

  const markdownDocs = `# Markdown Syntax Specification

MarkView implements full GitHub Flavored Markdown (GFM) with extended mathematical and diagrammatic AST nodes.

## Basic Formatting

| Style | Syntax | Rendered Output |
| :--- | :--- | :--- |
| **Bold** | \`**bold text**\` | **bold text** |
| *Italic* | \`*italic text*\` | *italic text* |
| ~~Strikethrough~~ | \`~~strikethrough~~\` | ~~strikethrough~~ |
| \`Inline Code\` | \`\\\`inline code\\\`\` | \`inline code\` |

---

## Headings Hierarchy

\`\`\`markdown
# Section Title (H1)
## Subsection Level 2 (H2)
### Technical Topic (H3)
#### Sub-item (H4)
\`\`\`

---

## Task Checklists

\`\`\`markdown
- [x] Initial design system
- [x] KaTeX & Mermaid integration
- [ ] Connect custom cloud sync
\`\`\`

Rendered:
- [x] Initial design system
- [x] KaTeX & Mermaid integration
- [ ] Connect custom cloud sync

---

## Blockquotes & Callouts

\`\`\`markdown
> "Simplicity is prerequisite for reliability."
> — Edsger W. Dijkstra
\`\`\`

Rendered:
> "Simplicity is prerequisite for reliability."
> — Edsger W. Dijkstra

---

## Structured Data Tables

\`\`\`markdown
| Language | Paradigm | Type System | Memory Management |
| :--- | :--- | :--- | :--- |
| TypeScript | Multi-paradigm | Gradual / Static | Garbage Collected |
| Rust | Systems | Affine / Static | Ownership & Borrowing |
| Go | Concurrent | Static | Concurrent GC |
\`\`\`
`;

  const mathDocs = `# KaTeX Mathematical Equations

MarkView natively renders mathematical formulas using the high-performance KaTeX engine with zero layout reflow.

## Inline Formulas
Wrap expressions inside single dollar signs: \`$E = mc^2$\` or \`$\\sum_{i=1}^n i = \\frac{n(n+1)}{2}$\`.

Rendered: The energy-mass equation is $E = mc^2$, and the sum of first $n$ integers is $\\sum_{i=1}^n i = \\frac{n(n+1)}{2}$.

---

## Display (Block) Equations
Wrap expressions inside double dollar signs:

\`\`\`latex
$$
\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}
$$
\`\`\`

Rendered:
$$
\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}
$$

---

## Matrices & Linear Systems

\`\`\`latex
$$
\\mathbf{A} = \\begin{pmatrix}
a_{11} & a_{12} & \\cdots & a_{1n} \\\\
a_{21} & a_{22} & \\cdots & a_{2n} \\\\
\\vdots & \\vdots & \\ddots & \\vdots \\\\
a_{m1} & a_{m2} & \\cdots & a_{mn}
\\end{pmatrix}
$$
\`\`\`

Rendered:
$$
\\mathbf{A} = \\begin{pmatrix}
a_{11} & a_{12} & \\cdots & a_{1n} \\\\
a_{21} & a_{22} & \\cdots & a_{2n} \\\\
\\vdots & \\vdots & \\ddots & \\vdots \\\\
a_{m1} & a_{m2} & \\cdots & a_{mn}
\\end{pmatrix}
$$
`;

  const diagramDocs = `# Mermaid 12.0 Diagram Guide

Render interactive charts, flowcharts, sequence diagrams, and state machines with zero external plugins.

## Flowchart

\`\`\`mermaid
graph TD
    A[Client Request] --> B[Edge API Gateway]
    B --> C{Authenticated?}
    C -->|Yes| D[Microservices Mesh]
    C -->|No| E[HTTP 401 Unauthorized]
    D --> F[(Distributed DB)]
\`\`\`

---

## Sequence Architecture

\`\`\`mermaid
sequenceDiagram
    actor User
    participant Browser as MarkView Web
    participant Local as IndexedDB

    User->>Browser: Types Markdown
    Browser->>Browser: Debounce 300ms
    Browser->>Local: Save snapshot
    Browser->>Browser: Update Split Preview
\`\`\`
`;

  const shortcutsDocs = `# Keyboard Shortcuts Reference

Work at the speed of thought without taking your hands off the keyboard.

| Shortcut | Description | Scope |
| :--- | :--- | :--- |
| **Ctrl / Cmd + K** | Open Command Palette | Global |
| **Ctrl / Cmd + \\** | Toggle Workspace Sidebar | Studio |
| **Ctrl / Cmd + Shift + F** | Toggle Zen Mode (Distraction-Free) | Studio |
| **Ctrl / Cmd + Shift + P** | Cycle View (Split / Editor / Preview) | Studio |
| **Ctrl / Cmd + S** | Save / Download Markdown | Studio |
| **Ctrl / Cmd + P** | Open Print / PDF Export dialog | Studio |
| **Ctrl / Cmd + B** | Bold Selection | Editor |
| **Ctrl / Cmd + I** | Italic Selection | Editor |
| **Ctrl / Cmd + Shift + X** | Strikethrough Selection | Editor |
| **Ctrl / Cmd + E** | Inline Code Selection | Editor |
| **Ctrl / Cmd + Shift + C** | Code Block Wrapper | Editor |
| **Tab** | Indent text with 2 or 4 spaces | Editor |
| **?** | Open Shortcuts cheat sheet | Studio |
`;

  const exportDocs = `# Exporting & Publishing Pipeline

MarkView provides deterministic, multi-channel publishing to fit engineering and academic workflows:

## 1. Standalone Self-Contained HTML
- Produces a single, zero-dependency \`.html\` file.
- Contains all typography CSS, dark/light media queries, and KaTeX styles embedded inline.
- Ready to host on GitHub Pages, deploy to S3, or share via email.

## 2. Vector PDF (Print Engine)
- Utilizes browser-native print stylesheets.
- Strips all UI chrome, sidebars, and navigation.
- Preserves 300+ DPI vector clarity for KaTeX math and Mermaid graphics.

## 3. Microsoft Word (.doc)
- Generates structured, compliant XML documents.
- Compatible with Word, Google Docs, Apple Pages, and LibreOffice.

## 4. Universal Markdown (.md)
- Direct export of standard UTF-8 markdown buffer without proprietary locks.
`;

  const contentMap = {
    markdown: markdownDocs,
    math: mathDocs,
    diagrams: diagramDocs,
    shortcuts: shortcutsDocs,
    export: exportDocs,
  };

  const navItems = [
    { id: "markdown", label: "Markdown Syntax", icon: BookOpen },
    { id: "math", label: "KaTeX Math Guide", icon: Sigma },
    { id: "diagrams", label: "Mermaid Diagrams", icon: GitGraph },
    { id: "shortcuts", label: "Keyboard Shortcuts", icon: Keyboard },
    { id: "export", label: "Export & Publishing", icon: Download },
  ] as const;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <LandingNavbar />

      <main className="max-w-7xl mx-auto pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] mb-8">
          <Link href="/" className="hover:text-[var(--text-primary)] transition-colors flex items-center gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>STUDIO</span>
          </Link>
          <span>/</span>
          <span className="text-[var(--text-primary)]">DOCUMENTATION</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Nav */}
          <aside className="lg:col-span-1 space-y-4 select-none">
            <div className="p-1.5 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-subtle)] space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      isActive
                        ? "bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-xs border border-[var(--border-strong)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Studio Launch Prompt */}
            <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
              <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-primary)] mb-1">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>Test in Live Studio</span>
              </div>
              <p className="text-[11px] text-[var(--text-muted)] mb-3 leading-relaxed">
                Open MarkView Studio with all technical syntax features active.
              </p>
              <Link
                href="/app"
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--text-primary)] text-[var(--bg-primary)] hover:opacity-90 transition-opacity"
              >
                <span>Open Studio</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </aside>

          {/* Main Docs Content */}
          <section className="lg:col-span-3 p-6 sm:p-10 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
            <MarkdownPreview content={contentMap[activeSection]} />
          </section>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
