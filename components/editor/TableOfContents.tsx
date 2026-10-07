"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { HeadingItem } from "@/lib/types";
import {
  ChevronRight,
  ChevronDown,
  Search,
  Hash,
  Compass,
  ArrowUpRight,
  ListTree,
} from "lucide-react";

export interface TableOfContentsProps {
  headings: HeadingItem[];
  activeHeadingId?: string;
  onSelectHeading: (heading: HeadingItem) => void;
  className?: string;
}

export function TableOfContents({
  headings,
  activeHeadingId,
  onSelectHeading,
  className = "",
}: TableOfContentsProps) {
  const [filterQuery, setFilterQuery] = useState("");
  const [collapsedIds, setCollapsedIds] = useState<Set<string>>(new Set());
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<HTMLDivElement>(null);

  // Filter headings based on search query
  const filteredHeadings = useMemo(() => {
    if (!filterQuery.trim()) return headings;
    const q = filterQuery.toLowerCase();
    return headings.filter((h) => h.text.toLowerCase().includes(q));
  }, [headings, filterQuery]);

  // Find active heading index
  const activeIndex = useMemo(() => {
    return headings.findIndex((h) => h.id === activeHeadingId);
  }, [headings, activeHeadingId]);

  // Calculate reading progress percentage
  const readingProgress = useMemo(() => {
    if (headings.length <= 1) return 100;
    if (activeIndex <= 0) return 0;
    return Math.round(((activeIndex + 1) / headings.length) * 100);
  }, [headings.length, activeIndex]);

  // Auto-scroll active TOC item into view inside TOC container
  useEffect(() => {
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [activeHeadingId]);

  // Auto-expand parent sections when a child becomes active
  useEffect(() => {
    if (!activeHeadingId) return;
    const activeItem = headings.find((h) => h.id === activeHeadingId);
    if (!activeItem) return;

    // Find preceding parent headings with lower level
    setCollapsedIds((prev) => {
      let modified = false;
      const nextSet = new Set(prev);

      const activeIdx = headings.findIndex((h) => h.id === activeHeadingId);
      for (let i = activeIdx - 1; i >= 0; i--) {
        if (headings[i].level < activeItem.level) {
          if (nextSet.has(headings[i].id)) {
            nextSet.delete(headings[i].id);
            modified = true;
          }
        }
      }
      return modified ? nextSet : prev;
    });
  }, [activeHeadingId, headings]);

  // Toggle collapse for a heading
  const toggleCollapse = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCollapsedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Determine visibility of nested items based on parent collapsed state
  const isItemVisible = useCallback(
    (index: number): boolean => {
      if (filterQuery.trim()) return true; // Show all when searching
      const current = headings[index];
      if (current.level === 1) return true;

      // Check all ancestors above this item
      for (let i = index - 1; i >= 0; i--) {
        const candidate = headings[i];
        if (candidate.level < current.level) {
          if (collapsedIds.has(candidate.id)) {
            return false;
          }
          if (candidate.level === 1) break;
        }
      }
      return true;
    },
    [headings, collapsedIds, filterQuery]
  );

  // Check if a heading has direct children (sub-headings)
  const hasChildren = useCallback(
    (index: number): boolean => {
      const current = headings[index];
      const next = headings[index + 1];
      return next ? next.level > current.level : false;
    },
    [headings]
  );

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (filteredHeadings.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev < filteredHeadings.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev > 0 ? prev - 1 : filteredHeadings.length - 1));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (focusedIndex >= 0 && filteredHeadings[focusedIndex]) {
        onSelectHeading(filteredHeadings[focusedIndex]);
      }
    } else if (e.key === "ArrowRight") {
      if (focusedIndex >= 0 && filteredHeadings[focusedIndex]) {
        const id = filteredHeadings[focusedIndex].id;
        setCollapsedIds((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      }
    } else if (e.key === "ArrowLeft") {
      if (focusedIndex >= 0 && filteredHeadings[focusedIndex]) {
        const id = filteredHeadings[focusedIndex].id;
        setCollapsedIds((prev) => {
          const next = new Set(prev);
          next.add(id);
          return next;
        });
      }
    }
  };

  if (headings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center text-[var(--text-muted)]">
        <ListTree className="w-8 h-8 opacity-40 mb-2 stroke-[1.5]" />
        <p className="text-xs font-medium text-[var(--text-secondary)]">No headings found</p>
        <p className="text-[11px] mt-1 leading-relaxed max-w-[200px]">
          Add <code className="font-mono text-indigo-500"># H1</code> or <code className="font-mono text-indigo-500">## H2</code> in your markdown to build a dynamic Table of Contents.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className={`flex flex-col h-full overflow-hidden select-none outline-none ${className}`}
    >
      {/* Header & Filter Bar */}
      <div className="p-3 border-b border-[var(--border-subtle)] space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--text-primary)]">
            <ListTree className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
            <span>Table of Contents</span>
          </div>
          <span className="text-[10px] font-mono text-[var(--text-muted)] font-medium">
            {headings.length} {headings.length === 1 ? "section" : "sections"}
          </span>
        </div>

        {/* Reading Progress Indicator */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)]">
            <span>Reading progress</span>
            <span className="font-mono font-medium text-[var(--text-primary)]">{readingProgress}%</span>
          </div>
          <div className="w-full h-1 bg-[var(--border-subtle)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--text-primary)] transition-all duration-300"
              style={{ width: `${readingProgress}%` }}
            />
          </div>
        </div>

        {/* Filter Input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-[var(--text-muted)] absolute left-2.5 top-2" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Filter outline..."
            className="w-full pl-7 pr-3 py-1 rounded-lg text-xs bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--border-strong)] transition-colors"
          />
        </div>
      </div>

      {/* Headings Tree List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-0.5 relative">
        {filteredHeadings.map((heading, index) => {
          const origIdx = headings.findIndex((h) => h.id === heading.id);
          if (origIdx !== -1 && !isItemVisible(origIdx)) return null;

          const isActive = heading.id === activeHeadingId;
          const isFocused = index === focusedIndex;
          const isCollapsed = collapsedIds.has(heading.id);
          const canCollapse = origIdx !== -1 ? hasChildren(origIdx) : false;

          // Level indentation & styling
          const levelIndent = {
            1: "pl-2 font-semibold text-xs",
            2: "pl-5 font-medium text-xs",
            3: "pl-8 text-[11px] text-[var(--text-secondary)]",
            4: "pl-11 text-[11px] text-[var(--text-muted)]",
          }[heading.level] || "pl-2";

          return (
            <div
              key={`${heading.id}-${index}`}
              ref={isActive ? activeItemRef : null}
              onClick={() => {
                setFocusedIndex(index);
                onSelectHeading(heading);
              }}
              className={`group relative flex items-center justify-between py-1.5 pr-2 rounded-lg cursor-pointer transition-all duration-150 ${levelIndent} ${
                isActive
                  ? "bg-[var(--bg-tertiary)] text-[var(--text-primary)] font-medium shadow-xs"
                  : isFocused
                  ? "bg-[var(--bg-tertiary)]/60 text-[var(--text-primary)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]/50"
              }`}
            >
              {/* Active Indicator Left Bar */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-emerald-400 rounded-r-full" />
              )}

              {/* Title & Level Tag */}
              <div className="flex items-center gap-1.5 min-w-0 flex-1">
                {/* Level icon or dot */}
                {heading.level === 1 ? (
                  <Hash className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-emerald-400" : "text-[var(--text-muted)]"}`} />
                ) : (
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      isActive ? "bg-emerald-400" : "bg-[var(--border-strong)]"
                    }`}
                  />
                )}

                <span className="truncate" title={heading.text}>
                  {heading.text}
                </span>
              </div>

              {/* Action buttons (Chevron collapse if parent, Jump icon on hover) */}
              <div className="flex items-center gap-1 shrink-0 ml-1">
                {canCollapse && (
                  <button
                    onClick={(e) => toggleCollapse(heading.id, e)}
                    className="p-1 rounded hover:bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                    title={isCollapsed ? "Expand section" : "Collapse section"}
                  >
                    {isCollapsed ? (
                      <ChevronRight className="w-3 h-3" />
                    ) : (
                      <ChevronDown className="w-3 h-3" />
                    )}
                  </button>
                )}

                <ArrowUpRight className="w-3 h-3 text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Navigation Tip */}
      <div className="px-3 py-2 border-t border-[var(--border-subtle)] bg-[var(--bg-tertiary)]/40 flex items-center justify-between text-[10px] text-[var(--text-muted)]">
        <span>Click to navigate & scroll</span>
        <div className="flex items-center gap-1">
          <kbd className="font-mono bg-[var(--bg-elevated)] px-1 rounded border border-[var(--border-subtle)]">↑↓</kbd>
          <kbd className="font-mono bg-[var(--bg-elevated)] px-1 rounded border border-[var(--border-subtle)]">↵</kbd>
        </div>
      </div>
    </div>
  );
}
