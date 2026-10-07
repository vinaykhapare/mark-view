import { DocumentTemplate } from "./types";

export const DOCUMENT_TEMPLATES: DocumentTemplate[] = [
  {
    id: "welcome-guide",
    name: "Product Tour & Quickstart",
    description: "Overview of MarkView features, syntax highlights, and shortcuts",
    category: "general",
    badge: "Popular",
    iconName: "Sparkles",
    content: `# Welcome to MarkView ✦

A modern, distraction-free **Markdown Studio** inspired by Linear, Notion, and Raycast.

> MarkView combines instant local-first speed with rich publication-grade typography, KaTeX math formulas, and interactive Mermaid diagrams.

---

## ⚡ Quick Features

- [x] **Real-time split preview** with responsive synchronized scrolling
- [x] **Full-spectrum GFM**: Tables, checklists, strikethrough, autolinks
- [x] **Mathematical notation** via KaTeX ($E = mc^2$ and block equations)
- [x] **Mermaid diagrams**: Flowcharts, sequence diagrams, state machines
- [x] **Command Palette**: Press \`Ctrl+K\` or \`Cmd+K\` anywhere
- [x] **Multi-format export**: Standalone styled HTML, PDF, DOCX, and raw Markdown
- [ ] Connect your cloud sync (coming in MarkView Cloud)

---

## 📐 Mathematical Equations

Inline equation: The Euler identity is $e^{i\\pi} + 1 = 0$.

Block equation:
$$
\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}
$$

Matrix calculations:
$$
\\begin{pmatrix}
a & b \\\\
c & d
\\end{pmatrix}
\\begin{pmatrix}
x \\\\
y
\\end{pmatrix}
=
\\begin{pmatrix}
ax + by \\\\
cx + dy
\\end{pmatrix}
$$

---

## 📊 Interactive Mermaid Diagram

\`\`\`mermaid
graph TD
    A[Markdown Input] --> B(Realtime Parser)
    B --> C{Plugins}
    C -->|Math| D[KaTeX Renderer]
    C -->|Charts| E[Mermaid Engine]
    C -->|Code| F[Syntax Highlighter]
    D --> G[Live Split Preview]
    E --> G
    F --> G
\`\`\`

---

## 💻 Code Highlighting & Clean Presentation

\`\`\`typescript
interface UserSession {
  id: string;
  name: string;
  role: "admin" | "author" | "reviewer";
  lastActive: Date;
}

export function initializeWorkspace(config: WorkspaceConfig): WorkspaceSession {
  console.log("MarkView initialized with high-performance buffer");
  return new WorkspaceSession({ ...config, autoSaveInterval: 1000 });
}
\`\`\`

---

## 📋 Markdown Tables

| Feature | MarkView | Traditional Editors | Notion |
| :--- | :---: | :---: | :---: |
| Local First & Private | **100% Yes** | Partial | No |
| KaTeX & Math | **Native** | Plugin needed | Limited |
| Mermaid Diagrams | **Interactive** | Rare | Basic |
| Standalone HTML Export | **Single Click** | Script required | Export HTML zip |

---

> 💡 **Pro-tip**: Press \`Ctrl + Shift + F\` to activate **Zen Writing Mode** for zero distractions!
`,
  },
  {
    id: "tech-rfc",
    name: "Engineering RFC / Design Doc",
    description: "Standard RFC format with context, architecture diagram, and tradeoffs",
    category: "engineering",
    badge: "Staff Pick",
    iconName: "Cpu",
    content: `# RFC-042: Next-Gen Real-Time Collaboration Architecture

- **Status**: Draft
- **Author**: Engineering Platform Team
- **Created**: 2026-10-02
- **Reviewers**: @lead-architect, @sec-team, @frontend-core

---

## 1. Abstract
This document proposes migrating our internal document sync protocol from REST polling to a hybrid **CRDT (Conflict-free Replicated Data Type)** architecture backed by WebSockets.

## 2. Problem Statement
As MarkView documents grow in length and team collaboration density increases:
- Concurrent edits result in merge overwrites or race conditions.
- Latency between clients exceeds 450ms across intercontinental regions.
- Bandwidth usage scales linearly with document size rather than differential delta.

## 3. Proposed Architecture

\`\`\`mermaid
sequenceDiagram
    autonumber
    actor Alice as Client A (Editor)
    participant Edge as Anycast Edge Node
    participant Relay as Sync Pub/Sub Mesh
    actor Bob as Client B (Reviewer)

    Alice->>Edge: Send state update (Yjs binary delta)
    Edge->>Relay: Forward patch (12ms)
    Relay->>Bob: Stream patch via WebSocket
    Bob->>Bob: Merge patch with local CRDT doc
    Note over Alice,Bob: Zero merge conflicts guaranteed
\`\`\`

## 4. Key Performance Targets

| Metric | Current Baseline | Target Milestone |
| :--- | :--- | :--- |
| End-to-End Latency | 350ms - 800ms | < 45ms P95 |
| Payload Size per Keystroke | 12.4 KB (full doc) | ~40 Bytes (varint delta) |
| Memory Footprint | 24 MB per session | < 4 MB per document |

## 5. Security & Privacy
1. All client deltas are end-to-end encrypted with AES-GCM-256 before transmission.
2. The relay node only processes opaque binary blobs without access to plaintext content.

## 6. Alternatives Considered
- **Operational Transformation (OT)**: Discarded due to complex central server coordinator requirement and high maintenance overhead.
- **Git-based differential sync**: Discarded due to non-interactive latency during fast typing bursts.
`,
  },
  {
    id: "blog-post",
    name: "Technical Blog Post",
    description: "Frontmatter, author bio, code snippets, callouts, and reading cues",
    category: "writing",
    badge: "Publishing",
    iconName: "PenTool",
    content: `---
title: "Building Deterministic State Machines in TypeScript"
description: "A deep dive into zero-dependency finite state machines for complex UI state"
date: "2026-10-02"
author: "Alex Rivers"
tags: ["typescript", "architecture", "frontend", "patterns"]
coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c"
readingTime: "6 min read"
---

# Building Deterministic State Machines in TypeScript

Managing UI state with dozens of boolean flags (\`isLoading\`, \`isSaving\`, \`hasError\`, \`isModalOpen\`) inevitably leads to **impossible states**. A user clicks *Submit* while a network error is actively displaying, or a modal opens while the session has expired.

In this article, we will build a type-safe, deterministic finite state machine from scratch.

---

## The Flaw of Boolean Flags

Consider the classic form state:

\`\`\`typescript
interface BadState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  canRetry: boolean;
}
\`\`\`

With 4 booleans, there are $2^4 = 16$ possible states, but only 4 of them are valid:
1. \`idle\`
2. \`submitting\`
3. \`success\`
4. \`failed\`

---

## Defining the State Machine

Let's represent the machine formally using state transitions:

\`\`\`mermaid
stateDiagram-v2
    [*] --> Idle
    Idle --> Submitting : SUBMIT
    Submitting --> Success : RESOLVE
    Submitting --> Failed : REJECT
    Failed --> Submitting : RETRY
    Failed --> Idle : RESET
    Success --> [*]
\`\`\`

---

## Implementing with Discriminated Unions

\`\`\`typescript
type FormState =
  | { status: "idle" }
  | { status: "submitting"; startedAt: number }
  | { status: "success"; transactionId: string }
  | { status: "failed"; error: string; retryCount: number };

type FormAction =
  | { type: "SUBMIT" }
  | { type: "RESOLVE"; transactionId: string }
  | { type: "REJECT"; error: string }
  | { type: "RESET" };

export function formReducer(state: FormState, action: FormAction): FormState {
  switch (state.status) {
    case "idle":
      if (action.type === "SUBMIT") {
        return { status: "submitting", startedAt: Date.now() };
      }
      return state;

    case "submitting":
      if (action.type === "RESOLVE") {
        return { status: "success", transactionId: action.transactionId };
      }
      if (action.type === "REJECT") {
        return { status: "failed", error: action.error, retryCount: 0 };
      }
      return state;

    case "failed":
      if (action.type === "SUBMIT") {
        return { status: "submitting", startedAt: Date.now() };
      }
      if (action.type === "RESET") {
        return { status: "idle" };
      }
      return state;

    case "success":
      return state;
  }
}
\`\`\`

> 💡 **Takeaway**: When you eliminate impossible states at compile time, entire categories of bugs disappear before your code ever hits staging.
`,
  },
  {
    id: "project-roadmap",
    name: "Project Roadmap & Sprint Board",
    description: "Milestones, progress bars, sprint board, and dependency mapping",
    category: "productivity",
    badge: "Agile",
    iconName: "Kanban",
    content: `# Product Roadmap — MarkView 2026

Welcome to the strategic development tracker for MarkView.

## 🎯 High-Level Milestones

| Quarter | Focus Area | Status | Deliverables |
| :--- | :--- | :---: | :--- |
| **Q1** | Core Studio Engine | 🟢 Shipped | Split Preview, KaTeX, GFM, Raycast Palette |
| **Q2** | Export & Publishing | 🟢 Shipped | Standalone HTML, Vector PDF, Clean Markdown |
| **Q3** | Collaboration & CRDT | 🟡 Active | Real-time presence, multi-cursor, peer sync |
| **Q4** | Enterprise & Self-host | ⚪ Planned | Custom themes, SSO/SAML, S3 storage adapter |

---

## 🏃 Sprint 14 Backlog (In Progress)

### High Priority
- [x] Integrate KaTeX math rendering engine with zero delay
- [x] Add client-side dynamic Mermaid diagram compilation
- [x] Implement Raycast-inspired \`Ctrl+K\` command bar
- [ ] Add bi-directional scroll synchronization ratio calculation
- [ ] Implement DOCX binary generation module

### Medium Priority
- [x] Auto-save document buffer to browser LocalStorage
- [x] Zen Focus mode with toggleable full-screen view
- [ ] Add custom CSS snippet injection in document settings
- [ ] Support YAML frontmatter parsing for metadata preview

---

## 🗺️ System Dependency Flow

\`\`\`mermaid
flowchart LR
    A[Core Parser] --> B[Plugin Pipeline]
    B --> C[Math Plugin]
    B --> D[Diagram Plugin]
    B --> E[Highlight Plugin]
    C --> F[Canvas Output]
    D --> F
    E --> F
    F --> G[Export PDF / HTML]
\`\`\`
`,
  },
  {
    id: "meeting-notes",
    name: "Meeting Notes & Action Items",
    description: "Structured agenda, key decisions, attendance, and follow-ups",
    category: "productivity",
    iconName: "Users",
    content: `# Executive Sync: Product & Design Alignment

- **Date**: October 2, 2026 • 10:00 AM - 10:45 AM EST
- **Location**: MarkView Virtual Huddle
- **Meeting Lead**: Sarah Jenkins (VP Product)
- **Attendees**: @sarah, @vinay, @elena, @marcus, @rachel

---

## 📌 Executive Summary
Reviewed the redesign feedback for the MarkView desktop and web experience. Unanimous approval on the Linear/Raycast design direction. Launch timeline moved ahead by two weeks.

---

## 🎯 Discussion Topics

### 1. Visual Polish & Theming
- Confirmed dual dark/light aesthetic:
  - **Dark mode**: Obsidian backdrop (\`#090d16\`) with indigo/violet highlights.
  - **Light mode**: Crisp slate canvas (\`#ffffff\` / \`#f8fafc\`) with deep typography.
- Glassmorphism will be applied to the fixed navbar and Command Palette backdrop.

### 2. Export Fidelity
- **PDF Export**: Print stylesheet must hide navbars and sidebars while preserving KaTeX formulas and Mermaid vector clarity.
- **HTML Export**: Must embed self-contained styling so exported files look identical anywhere without external dependencies.

---

## ✅ Action Items & Owners

- [x] Finalize color tokens and CSS variables (@vinay)
- [x] Complete Mermaid parser integration (@vinay)
- [ ] Draft public release announcement notes (@sarah)
- [ ] Run WCAG contrast audit across light/dark palettes (@elena)
- [ ] Prepare ProductHunt launch media kit (@marcus)
`,
  },
  {
    id: "github-readme",
    name: "Open Source README",
    description: "Badges, tech stack, quick installation, usage examples, and license",
    category: "engineering",
    badge: "Developer",
    iconName: "FileCode",
    content: `# MarkView ✦ Production-Ready Markdown Studio

<p align="center">
  <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80" alt="MarkView Banner" width="100%" style="border-radius: 12px;"/>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#installation">Quickstart</a> •
  <a href="#keyboard-shortcuts">Shortcuts</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#license">License</a>
</p>

---

## ✨ Features

- ⚡ **Instant Live Preview**: Ultra-responsive split view with zero keystroke lag.
- 📐 **KaTeX Mathematical Notation**: First-class formulas and equation arrays.
- 📊 **Mermaid Diagrams**: Interactive flowcharts, sequence, state, and git graphs.
- ⌨️ **Command Palette**: Raycast-style \`Ctrl+K\` shortcut menu.
- 🎨 **Sleek Themes**: Dark Obsidian, Clean Light, and System adaptive.
- 📦 **Zero Cloud Dependencies**: 100% local-first and private in your browser.
- 💾 **Export Anywhere**: One-click download as Standalone HTML, PDF, or Markdown.

---

## 🚀 Quickstart

Clone the repository and run the Next.js development server:

\`\`\`bash
# Clone the repository
git clone https://github.com/your-org/mark-view.git

# Enter project directory
cd mark-view

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to experience MarkView.

---

## ⌨️ Essential Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| \`Ctrl + K\` | Open Command Palette |
| \`Ctrl + S\` | Save Document |
| \`Ctrl + B\` | Bold Text |
| \`Ctrl + I\` | Italic Text |
| \`Ctrl + Shift + F\` | Toggle Zen Mode |
| \`Ctrl + Shift + P\` | Cycle View (Split / Editor / Preview) |

---

## 📄 License
MarkView is released under the **MIT License**.
`,
  },
  {
    id: "math-research",
    name: "Academic & Scientific Research",
    description: "LaTeX formulas, theorem blocks, proofs, references, and citations",
    category: "academic",
    badge: "KaTeX",
    iconName: "Compass",
    content: `# On the Geometric Convergence of Gradient Descent

**Author**: Dr. Julian Hayes  
**Affiliation**: Institute for Advanced Computational Science  
**Status**: Pre-print

---

## Abstract
We examine the non-asymptotic convergence rate of accelerated gradient flows under strong convexity assumptions with Lipschitz continuous gradients.

---

## 1. Problem Formulation
Consider the unconstrained minimization problem:

$$
\\min_{x \\in \\mathbb{R}^d} f(x)
$$

where $f: \\mathbb{R}^d \\to \\mathbb{R}$ satisfies the $\\mu$-strong convexity condition:

$$
f(y) \\ge f(x) + \\nabla f(x)^T (y - x) + \\frac{\\mu}{2} \\|y - x\\|^2, \\quad \\forall x, y \\in \\mathbb{R}^d
$$

and has $L$-Lipschitz continuous gradient:

$$
\\|\\nabla f(x) - \\nabla f(y)\\| \\le L \\|x - y\\|, \\quad \\forall x, y \\in \\mathbb{R}^d
$$

---

## 2. Gradient Descent Formulation

With step size $\\eta = \\frac{1}{L}$, the iterative sequence satisfies:

$$
x_{k+1} = x_k - \\frac{1}{L} \\nabla f(x_k)
$$

### Theorem 1 (Convergence Bound)
Under the stated assumptions, for all $k \\ge 0$:

$$
\\|x_k - x^*\\|^2 \\le \\left( 1 - \\frac{\\mu}{L} \\right)^k \\|x_0 - x^*\\|^2
$$

where $x^* = \\arg\\min f(x)$ and $\\kappa = \\frac{L}{\\mu}$ represents the condition number.

---

## 3. Multivariate Calculus Reference

The Hessian matrix $\\mathbf{H} \\in \\mathbb{R}^{d \\times d}$ is given by:

$$
\\mathbf{H}_{i,j} = \\frac{\\partial^2 f}{\\partial x_i \\partial x_j}
$$

The characteristic polynomial and eigenvalues $\\lambda$ satisfy:

$$
\\det(\\mathbf{H} - \\lambda \\mathbf{I}) = 0
$$

where $\\mu \\le \\lambda_i \\le L$ for all $i \\in \\{1, \\dots, d\\}$.
`,
  },
  {
    id: "api-reference",
    name: "REST API Documentation",
    description: "HTTP endpoints, headers, request bodies, and JSON responses",
    category: "engineering",
    badge: "Developer",
    iconName: "Terminal",
    content: `# MarkView REST API v1 Specification

Base URL: \`https://api.markview.app/v1\`

All requests must supply an API key via the \`Authorization\` header:
\`Authorization: Bearer <your_api_key>\`

---

## 1. Document Management

### \`GET /documents\`
List all documents belonging to the authenticated workspace.

#### Response \`200 OK\`
\`\`\`json
{
  "object": "list",
  "data": [
    {
      "id": "doc_9x7a2b",
      "title": "Quarterly OKRs",
      "wordCount": 1420,
      "updatedAt": 1727871200,
      "isStarred": true
    }
  ],
  "hasMore": false
}
\`\`\`

---

### \`POST /documents\`
Create a new document in the workspace.

#### Request Body
\`\`\`json
{
  "title": "Architecture Blueprint",
  "content": "# Blueprint\\n\\nSystem components...",
  "tags": ["engineering", "v2"]
}
\`\`\`

#### Response \`201 Created\`
\`\`\`json
{
  "id": "doc_3m8x9q",
  "title": "Architecture Blueprint",
  "createdAt": 1727871600,
  "status": "synced"
}
\`\`\`

---

## 2. Status Codes

| Code | Meaning | Description |
| :--- | :--- | :--- |
| \`200\` | OK | Request succeeded |
| \`201\` | Created | Resource successfully created |
| \`400\` | Bad Request | Missing required parameters or invalid JSON |
| \`401\` | Unauthorized | Invalid or expired API token |
| \`429\` | Rate Limited | Exceeded 100 requests per minute quota |
`,
  },
];
