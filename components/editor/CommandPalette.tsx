"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  FileText,
  Plus,
  Moon,
  Sun,
  Laptop,
  Maximize2,
  Download,
  Sigma,
  GitGraph,
  Table,
  Settings,
  X,
  Columns,
  PenTool,
  Eye,
} from "lucide-react";
import { Document, ViewMode } from "@/lib/types";
import { useTheme } from "../ThemeProvider";

export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  documents: Document[];
  onSelectDoc: (id: string) => void;
  onCreateDoc: () => void;
  onViewModeChange: (mode: ViewMode) => void;
  onToggleZenMode: () => void;
  onExport: (format: "html" | "pdf" | "docx" | "md") => void;
  onInsertSnippet: (snippet: string) => void;
  onOpenSettings: () => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  documents,
  onSelectDoc,
  onCreateDoc,
  onViewModeChange,
  onToggleZenMode,
  onExport,
  onInsertSnippet,
  onOpenSettings,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { setTheme } = useTheme();

  // Reset query and focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Define commands
  const allCommands = [
    // Documents
    ...documents.map((doc) => ({
      id: `doc-${doc.id}`,
      title: doc.title || "Untitled",
      category: "Documents",
      icon: <FileText className="w-4 h-4 text-indigo-500" />,
      action: () => {
        onSelectDoc(doc.id);
        onClose();
      },
    })),
    // Actions
    {
      id: "act-new",
      title: "Create New Document",
      category: "Actions",
      icon: <Plus className="w-4 h-4 text-emerald-500" />,
      action: () => {
        onCreateDoc();
        onClose();
      },
    },
    {
      id: "act-zen",
      title: "Toggle Zen Writing Mode",
      category: "Actions",
      icon: <Maximize2 className="w-4 h-4 text-amber-500" />,
      action: () => {
        onToggleZenMode();
        onClose();
      },
    },
    {
      id: "act-settings",
      title: "Open Preferences & Settings",
      category: "Actions",
      icon: <Settings className="w-4 h-4 text-slate-400" />,
      action: () => {
        onOpenSettings();
        onClose();
      },
    },
    // View Modes
    {
      id: "view-split",
      title: "Switch to Split Screen View",
      category: "View",
      icon: <Columns className="w-4 h-4 text-blue-500" />,
      action: () => {
        onViewModeChange("split");
        onClose();
      },
    },
    {
      id: "view-editor",
      title: "Switch to Editor Only View",
      category: "View",
      icon: <PenTool className="w-4 h-4 text-blue-500" />,
      action: () => {
        onViewModeChange("editor");
        onClose();
      },
    },
    {
      id: "view-preview",
      title: "Switch to Preview Only View",
      category: "View",
      icon: <Eye className="w-4 h-4 text-blue-500" />,
      action: () => {
        onViewModeChange("preview");
        onClose();
      },
    },
    // Theme
    {
      id: "theme-dark",
      title: "Set Theme: Dark Mode",
      category: "Theme",
      icon: <Moon className="w-4 h-4 text-indigo-400" />,
      action: () => {
        setTheme("dark");
        onClose();
      },
    },
    {
      id: "theme-light",
      title: "Set Theme: Light Mode",
      category: "Theme",
      icon: <Sun className="w-4 h-4 text-amber-400" />,
      action: () => {
        setTheme("light");
        onClose();
      },
    },
    {
      id: "theme-system",
      title: "Set Theme: Match System",
      category: "Theme",
      icon: <Laptop className="w-4 h-4 text-slate-400" />,
      action: () => {
        setTheme("system");
        onClose();
      },
    },
    // Exports
    {
      id: "export-html",
      title: "Export as Standalone HTML",
      category: "Export",
      icon: <Download className="w-4 h-4 text-indigo-500" />,
      action: () => {
        onExport("html");
        onClose();
      },
    },
    {
      id: "export-pdf",
      title: "Export / Print as PDF",
      category: "Export",
      icon: <Download className="w-4 h-4 text-emerald-500" />,
      action: () => {
        onExport("pdf");
        onClose();
      },
    },
    {
      id: "export-docx",
      title: "Export as Word Document (.doc)",
      category: "Export",
      icon: <Download className="w-4 h-4 text-blue-500" />,
      action: () => {
        onExport("docx");
        onClose();
      },
    },
    {
      id: "export-md",
      title: "Download as Markdown (.md)",
      category: "Export",
      icon: <Download className="w-4 h-4 text-purple-500" />,
      action: () => {
        onExport("md");
        onClose();
      },
    },
    // Insert Snippets
    {
      id: "insert-katex",
      title: "Insert KaTeX Math Formula",
      category: "Insert",
      icon: <Sigma className="w-4 h-4 text-rose-500" />,
      action: () => {
        onInsertSnippet("$$\n\\int_{0}^{\\infty} e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}\n$$\n");
        onClose();
      },
    },
    {
      id: "insert-mermaid",
      title: "Insert Mermaid Flowchart Diagram",
      category: "Insert",
      icon: <GitGraph className="w-4 h-4 text-cyan-500" />,
      action: () => {
        onInsertSnippet("```mermaid\ngraph TD\n    A[Start] --> B(Process)\n    B --> C{Decision}\n    C -->|Yes| D[End]\n    C -->|No| B\n```\n");
        onClose();
      },
    },
    {
      id: "insert-table",
      title: "Insert Markdown Table",
      category: "Insert",
      icon: <Table className="w-4 h-4 text-violet-500" />,
      action: () => {
        onInsertSnippet("| Item | Status | Priority |\n| :--- | :---: | ---: |\n| Engine | Shipped | High |\n| Styles | Polished | High |\n");
        onClose();
      },
    },
  ];

  // Filter commands by query
  const filtered = allCommands.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  // Key navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      filtered[selectedIndex].action();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Palette Dialog */}
      <div
        className="relative w-full max-w-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[var(--border-subtle)]">
          <Search className="w-4 h-4 text-[var(--text-muted)] mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or search documents..."
            className="w-full bg-transparent text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none border-none"
          />
          <kbd className="text-[10px] font-mono text-[var(--text-muted)] bg-[var(--bg-tertiary)] px-1.5 py-0.5 rounded border border-[var(--border-subtle)] uppercase">
            Esc
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs text-[var(--text-muted)]">
              No matching commands or documents found.
            </div>
          ) : (
            filtered.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={cmd.id}
                  onClick={cmd.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-[var(--bg-tertiary)] text-[var(--text-primary)]"
                      : "text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]/60"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="shrink-0">{cmd.icon}</span>
                    <span className="text-xs font-medium truncate">{cmd.title}</span>
                  </div>
                  <span className="text-[10px] font-medium text-[var(--text-muted)] uppercase tracking-wider bg-[var(--bg-secondary)] px-1.5 py-0.5 rounded border border-[var(--border-subtle)]">
                    {cmd.category}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Hints */}
        <div className="px-4 py-2.5 bg-[var(--bg-tertiary)]/50 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] text-[var(--text-muted)]">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="font-mono bg-[var(--bg-elevated)] px-1 py-0.2 rounded border border-[var(--border-subtle)]">↑↓</kbd> navigate
            </span>
            <span>
              <kbd className="font-mono bg-[var(--bg-elevated)] px-1 py-0.2 rounded border border-[var(--border-subtle)]">↵</kbd> select
            </span>
          </div>
          <span>MarkView Command Menu</span>
        </div>
      </div>
    </div>
  );
}
