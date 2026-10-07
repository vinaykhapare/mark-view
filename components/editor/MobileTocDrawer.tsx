"use client";

import React, { useEffect } from "react";
import { X, Compass, ListTree } from "lucide-react";
import { HeadingItem } from "@/lib/types";
import { TableOfContents } from "./TableOfContents";

export interface MobileTocDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  headings: HeadingItem[];
  activeHeadingId?: string;
  onSelectHeading: (heading: HeadingItem) => void;
}

export function MobileTocDrawer({
  isOpen,
  onClose,
  headings,
  activeHeadingId,
  onSelectHeading,
}: MobileTocDrawerProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-stretch justify-end">
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over Drawer Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Table of Contents"
        className="relative z-10 w-full max-w-xs sm:max-w-sm bg-[var(--bg-secondary)] border-l border-[var(--border-subtle)] shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-250 ease-out"
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-[var(--border-subtle)] flex items-center justify-between bg-[var(--bg-elevated)]/60">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                Table of Contents
              </h3>
              <p className="text-[11px] text-[var(--text-muted)]">
                {headings.length} {headings.length === 1 ? "section" : "sections"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors cursor-pointer"
            aria-label="Close Table of Contents"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* TOC Content */}
        <div className="flex-1 overflow-hidden">
          <TableOfContents
            headings={headings}
            activeHeadingId={activeHeadingId}
            onSelectHeading={(heading) => {
              onSelectHeading(heading);
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
}
