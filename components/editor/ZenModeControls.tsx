"use client";

import React, { useState, useEffect } from "react";
import {
  Minimize2,
  Sun,
  Moon,
  Eye,
  Columns,
  PenTool,
  Settings,
  ListTree,
  Sparkles,
} from "lucide-react";
import { ViewMode } from "@/lib/types";
import { useTheme } from "../ThemeProvider";
import { Tooltip } from "../ui/tooltip";

export interface ZenModeControlsProps {
  onExit: () => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onOpenSettings: () => void;
  onOpenToc?: () => void;
  documentTitle?: string;
  wordCount?: number;
}

export function ZenModeControls({
  onExit,
  viewMode,
  onViewModeChange,
  onOpenSettings,
  onOpenToc,
  documentTitle,
  wordCount,
}: ZenModeControlsProps) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [showExitHint, setShowExitHint] = useState(true);

  // Auto-hide the "Press Esc to exit" hint after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowExitHint(false);
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Top Banner Hint on Enter (Auto-fades) */}
      {showExitHint && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-in fade-in slide-in-from-top duration-300 no-print">
          <div className="px-3.5 py-1.5 rounded-lg bg-[var(--bg-elevated)]/90 backdrop-blur-md border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] shadow-lg flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Zen Mode active</span>
            <span className="text-[var(--text-muted)]">•</span>
            <span className="font-mono text-[11px] text-[var(--text-primary)] font-medium">Press Esc to exit</span>
          </div>
        </div>
      )}

      {/* Top-Right Floating Controls Bar */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed top-4 right-4 z-40 flex items-center gap-1.5 p-1 rounded-xl bg-[var(--bg-elevated)]/90 hover:bg-[var(--bg-elevated)] backdrop-blur-md border border-[var(--border-subtle)] shadow-xl transition-all duration-200 no-print ${
          isHovered ? "opacity-100 scale-100 shadow-2xl" : "opacity-85 hover:opacity-100"
        }`}
      >
        {/* Document Word Count Pill */}
        {typeof wordCount === "number" && (
          <div className="hidden sm:flex items-center px-2 py-1 text-[11px] font-mono text-[var(--text-muted)] border-r border-[var(--border-subtle)] mr-0.5">
            {wordCount} words
          </div>
        )}

        {/* View Mode Cycle Button */}
        <Tooltip
          content={`View: ${viewMode === "editor" ? "Editor Only" : viewMode === "split" ? "Split View" : "Preview Only"} (Click to cycle)`}
        >
          <button
            onClick={() => {
              if (viewMode === "editor") onViewModeChange("split");
              else if (viewMode === "split") onViewModeChange("preview");
              else onViewModeChange("editor");
            }}
            className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors cursor-pointer"
            aria-label="Toggle View Mode"
          >
            {viewMode === "editor" && <PenTool className="w-4 h-4 text-[var(--text-primary)]" />}
            {viewMode === "split" && <Columns className="w-4 h-4 text-[var(--text-primary)]" />}
            {viewMode === "preview" && <Eye className="w-4 h-4 text-[var(--text-primary)]" />}
          </button>
        </Tooltip>

        {/* Table of Contents Drawer Toggle */}
        {onOpenToc && (
          <Tooltip content="Table of Contents">
            <button
              onClick={onOpenToc}
              className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors cursor-pointer"
              aria-label="Open Table of Contents"
            >
              <ListTree className="w-4 h-4" />
            </button>
          </Tooltip>
        )}

        {/* Theme Toggle Button */}
        <Tooltip content={resolvedTheme === "dark" ? "Light Mode" : "Dark Mode"}>
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors cursor-pointer"
            aria-label="Toggle Theme"
          >
            {resolvedTheme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-[var(--text-primary)]" />
            )}
          </button>
        </Tooltip>

        {/* Settings Button */}
        <Tooltip content="Editor Settings">
          <button
            onClick={onOpenSettings}
            className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors cursor-pointer"
            aria-label="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </Tooltip>

        <div className="w-[1px] h-4 bg-[var(--border-subtle)] mx-0.5" />

        {/* Exit Zen Mode Button (High Contrast & Clear Label) */}
        <Tooltip content="Press Esc to exit Zen Mode" shortcut="Esc">
          <button
            onClick={onExit}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--text-primary)] text-[var(--bg-primary)] hover:opacity-90 font-medium text-xs shadow-xs transition-opacity cursor-pointer active:scale-95"
            aria-label="Exit Zen Mode"
          >
            <Minimize2 className="w-3.5 h-3.5" />
            <span>Exit Zen</span>
          </button>
        </Tooltip>
      </div>
    </>
  );
}
