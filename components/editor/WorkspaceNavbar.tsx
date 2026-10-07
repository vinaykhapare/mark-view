"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FileText,
  Columns,
  PenTool,
  Eye,
  Maximize2,
  Minimize2,
  Download,
  Copy,
  Check,
  Sun,
  Moon,
  Settings,
  Command,
  FileDown,
  Printer,
  Sparkles,
  Share2,
  FileCode,
  ListTree,
  PanelLeft,
} from "lucide-react";
import { ViewMode } from "@/lib/types";
import { useTheme } from "../ThemeProvider";
import { Tooltip } from "../ui/tooltip";
import { Dropdown } from "../ui/Dropdown";
import { triggerToast } from "@/lib/useToast";
import confetti from "canvas-confetti";
import { MarkViewLogo } from "../ui/MarkViewLogo";

export interface WorkspaceNavbarProps {
  title: string;
  onTitleChange: (newTitle: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  isZenMode: boolean;
  onToggleZenMode: () => void;
  onExport: (format: "html" | "pdf" | "docx" | "md") => void;
  onOpenCommandPalette: () => void;
  onOpenSettings: () => void;
  markdownContent: string;
  onOpenMobileToc?: () => void;
  tocCount?: number;
  isSidebarOpen?: boolean;
  onToggleSidebar?: () => void;
}

export function WorkspaceNavbar({
  title,
  onTitleChange,
  viewMode,
  onViewModeChange,
  isZenMode,
  onToggleZenMode,
  onExport,
  onOpenCommandPalette,
  onOpenSettings,
  markdownContent,
  onOpenMobileToc,
  tocCount,
  isSidebarOpen,
  onToggleSidebar,
}: WorkspaceNavbarProps) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const [copied, setCopied] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [localTitle, setLocalTitle] = useState(title);

  useEffect(() => {
    setLocalTitle(title);
  }, [title]);

  const handleCopyMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(markdownContent);
      setCopied(true);
      triggerToast("Markdown copied to clipboard", "success");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      triggerToast("Failed to copy to clipboard", "error");
    }
  };

  const handleCommitTitle = () => {
    setIsEditingTitle(false);
    if (localTitle.trim() && localTitle !== title) {
      onTitleChange(localTitle.trim());
    } else {
      setLocalTitle(title);
    }
  };

  return (
    <header className="h-14 border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)]/90 backdrop-blur-md px-3 sm:px-5 flex items-center justify-between z-30 select-none shrink-0 gap-2 no-print workspace-navbar">
      {/* Left: Sidebar Toggle, Brand & Title */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        {onToggleSidebar && (
          <Tooltip content={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"} shortcut="⌘\">
            <button
              onClick={onToggleSidebar}
              className={`p-1.5 sm:p-2 rounded-lg transition-colors cursor-pointer ${
                isSidebarOpen
                  ? "text-indigo-500 bg-indigo-500/10"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"
              }`}
              aria-label="Toggle Sidebar"
            >
              <PanelLeft className="w-4 h-4" />
            </button>
          </Tooltip>
        )}

        <Link
          href="/"
          className="flex items-center gap-2 group shrink-0"
          title="Back to MarkView Home"
        >
          <div className="relative w-8 h-8 rounded-xl overflow-hidden flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <MarkViewLogo size={32} className="w-full h-full" />
          </div>
          <div className="hidden md:flex flex-col">
            <span className="font-semibold text-sm tracking-tight text-[var(--text-primary)] leading-none">
              MarkView
            </span>
            <span className="text-[10px] font-mono text-[var(--text-muted)] tracking-widest uppercase mt-0.5">
              STUDIO
            </span>
          </div>
        </Link>

        <div className="hidden sm:block w-[1px] h-5 bg-[var(--border-subtle)]" />

        {/* Inline Editable Title */}
        <div className="flex items-center gap-2 min-w-0 max-w-[140px] sm:max-w-xs md:max-w-md">
          <FileText className="w-4 h-4 text-[var(--text-muted)] shrink-0 hidden sm:block" />
          {isEditingTitle ? (
            <input
              type="text"
              value={localTitle}
              autoFocus
              onChange={(e) => setLocalTitle(e.target.value)}
              onBlur={handleCommitTitle}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCommitTitle();
                if (e.key === "Escape") {
                  setLocalTitle(title);
                  setIsEditingTitle(false);
                }
              }}
              className="text-xs sm:text-sm font-medium text-[var(--text-primary)] bg-[var(--bg-tertiary)] border border-[var(--border-strong)] rounded-md px-2 py-0.5 outline-none w-full"
            />
          ) : (
            <span
              onClick={() => setIsEditingTitle(true)}
              className="text-xs sm:text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] px-2 py-1 rounded-md cursor-pointer truncate transition-colors"
              title="Click to rename"
            >
              {title || "Untitled Document"}
            </span>
          )}
        </div>
      </div>

      {/* Middle: Responsive View Mode Switcher */}
      <div className="flex items-center p-0.5 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
        <button
          onClick={() => onViewModeChange("editor")}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
            viewMode === "editor"
              ? "bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-xs border border-[var(--border-strong)]"
              : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          }`}
          title="Editor only"
          aria-label="Editor only view"
        >
          <PenTool className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Editor</span>
        </button>

        <button
          onClick={() => onViewModeChange("split")}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
            viewMode === "split"
              ? "bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-xs border border-[var(--border-strong)]"
              : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          }`}
          title="Split screen"
          aria-label="Split screen view"
        >
          <Columns className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Split</span>
        </button>

        <button
          onClick={() => onViewModeChange("preview")}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
            viewMode === "preview"
              ? "bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-xs border border-[var(--border-strong)]"
              : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          }`}
          title="Preview only"
          aria-label="Preview only view"
        >
          <Eye className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Preview</span>
        </button>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Outline / Table of Contents Button (Quick Drawer Access) */}
        {onOpenMobileToc && (
          <Tooltip content="Table of Contents Outline">
            <button
              onClick={onOpenMobileToc}
              className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-lg text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-[var(--bg-secondary)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] transition-colors cursor-pointer"
            >
              <ListTree className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
              <span className="hidden sm:inline">TOC</span>
              {typeof tocCount === "number" && tocCount > 0 && (
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] font-medium">
                  {tocCount}
                </span>
              )}
            </button>
          </Tooltip>
        )}

        {/* Command Palette Trigger */}
        <Tooltip content="Command Palette" shortcut="⌘K">
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-lg text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-[var(--bg-secondary)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] transition-colors cursor-pointer"
          >
            <Command className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
            <span className="hidden xl:inline">Commands</span>
            <kbd className="hidden sm:inline text-[10px] font-mono text-[var(--text-muted)] bg-[var(--bg-elevated)] px-1 rounded border border-[var(--border-subtle)]">
              ⌘K
            </kbd>
          </button>
        </Tooltip>

        {/* Copy Markdown */}
        <Tooltip content="Copy Markdown">
          <button
            onClick={handleCopyMarkdown}
            className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] border border-transparent hover:border-[var(--border-subtle)] transition-colors cursor-pointer"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </Tooltip>

        {/* Export Dropdown */}
        <Dropdown
          align="right"
          trigger={
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--text-primary)] text-[var(--bg-primary)] hover:opacity-90 transition-opacity cursor-pointer">
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export</span>
            </div>
          }
          items={[
            {
              id: "export-html",
              label: "Standalone HTML (.html)",
              icon: <FileCode className="w-4 h-4 text-indigo-500" />,
              onClick: () => {
                onExport("html");
                confetti({ particleCount: 30, spread: 60, origin: { y: 0.15 } });
              },
            },
            {
              id: "export-pdf",
              label: "Print / Save PDF (.pdf)",
              icon: <Printer className="w-4 h-4 text-emerald-500" />,
              shortcut: "⌘P",
              onClick: () => onExport("pdf"),
            },
            {
              id: "export-docx",
              label: "Word Document (.doc)",
              icon: <FileDown className="w-4 h-4 text-blue-500" />,
              onClick: () => onExport("docx"),
            },
            "divider",
            {
              id: "export-md",
              label: "Markdown File (.md)",
              icon: <FileText className="w-4 h-4 text-purple-500" />,
              shortcut: "⌘S",
              onClick: () => onExport("md"),
            },
          ]}
        />

        {/* Zen Mode Toggle */}
        <Tooltip content={isZenMode ? "Exit Zen Mode" : "Zen Mode (Distraction-free)"} shortcut="⌘⇧F">
          <button
            onClick={onToggleZenMode}
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
              isZenMode
                ? "bg-[var(--bg-tertiary)] text-[var(--text-primary)] border-[var(--border-strong)]"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] border-transparent hover:border-[var(--border-subtle)]"
            }`}
          >
            {isZenMode ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>
        </Tooltip>

        {/* Theme Toggle */}
        <Tooltip content={`Switch to ${resolvedTheme === "dark" ? "Light" : "Dark"} mode`}>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] border border-transparent hover:border-[var(--border-subtle)] transition-colors cursor-pointer"
          >
            {resolvedTheme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600" />
            )}
          </button>
        </Tooltip>

        {/* Settings */}
        <Tooltip content="Editor Settings">
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] border border-transparent hover:border-[var(--border-subtle)] transition-colors cursor-pointer"
          >
            <Settings className="w-4 h-4" />
          </button>
        </Tooltip>
      </div>
    </header>
  );
}
