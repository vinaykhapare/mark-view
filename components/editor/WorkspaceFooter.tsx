"use client";

import React from "react";
import { DocumentStats } from "@/lib/types";
import { Clock, Keyboard, Sparkles } from "lucide-react";
import { Tooltip } from "../ui/tooltip";

export interface WorkspaceFooterProps {
  stats: DocumentStats;
  isSaving: boolean;
  lastSavedAt: Date;
  onOpenShortcuts: () => void;
  syncScroll: boolean;
  onToggleSyncScroll: () => void;
}

export function WorkspaceFooter({
  stats,
  isSaving,
  lastSavedAt,
  onOpenShortcuts,
  syncScroll,
  onToggleSyncScroll,
}: WorkspaceFooterProps) {
  return (
    <footer className="h-8 border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)]/90 backdrop-blur-md px-3 sm:px-4 flex items-center justify-between text-[11px] text-[var(--text-muted)] select-none shrink-0 z-20 no-print workspace-footer">
      {/* Left: Document Stats */}
      <div className="flex items-center gap-3 sm:gap-4">
        <span>
          <strong className="text-[var(--text-primary)] font-semibold">{stats.words}</strong>{" "}
          {stats.words === 1 ? "word" : "words"}
        </span>
        <span className="hidden sm:inline">
          <strong className="text-[var(--text-primary)] font-semibold">{stats.chars}</strong> chars
        </span>
        <span className="hidden md:inline">
          <strong className="text-[var(--text-primary)] font-semibold">{stats.lines}</strong> lines
        </span>
        <div className="hidden sm:flex items-center gap-1">
          <Clock className="w-3 h-3 opacity-60" />
          <span>
            {stats.readingTimeMinutes} min read
          </span>
        </div>
      </div>

      {/* Right: Auto-save status, Sync scroll, Shortcuts */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Sync Scroll Toggle */}
        <button
          onClick={onToggleSyncScroll}
          className={`hidden sm:flex items-center gap-1 transition-colors hover:text-[var(--text-primary)] cursor-pointer ${
            syncScroll ? "text-indigo-500 font-medium" : "text-[var(--text-muted)]"
          }`}
          title="Toggle synchronized scrolling"
        >
          <span>Sync Scroll</span>
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              syncScroll ? "bg-indigo-500 shadow-sm shadow-indigo-500/50" : "bg-[var(--border-strong)]"
            }`}
          />
        </button>

        {/* Auto-save Indicator */}
        <div className="flex items-center gap-1.5">
          <span
            className={`w-2 h-2 rounded-full ${
              isSaving
                ? "bg-amber-400 animate-ping"
                : "bg-emerald-500 shadow-sm shadow-emerald-500/50"
            }`}
          />
          <span>{isSaving ? "Saving..." : "Auto-saved"}</span>
        </div>

        {/* Keyboard Shortcuts Trigger */}
        <Tooltip content="Keyboard Shortcuts" shortcut="?">
          <button
            onClick={onOpenShortcuts}
            className="flex items-center gap-1 hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          >
            <Keyboard className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Shortcuts</span>
          </button>
        </Tooltip>
      </div>
    </footer>
  );
}
