"use client";

import React, { useRef, useImperativeHandle, forwardRef, useEffect, useState, useMemo } from "react";
import { EditorSettings } from "@/lib/types";

export interface LocateAndHighlightOptions {
  lineNumber: number;
  charStart?: number;
  charEnd?: number;
  selectedText?: string;
  elementText?: string;
  headingId?: string;
}

export interface MarkdownEditorRef {
  insertText: (before: string, after?: string, defaultText?: string) => void;
  focus: () => void;
  scrollToLine: (lineNumber: number) => void;
  locateAndHighlight: (options: LocateAndHighlightOptions) => void;
  getTextarea: () => HTMLTextAreaElement | null;
  getCursorPosition: () => { start: number; end: number; scrollTop: number };
  restoreCursorPosition: (pos: { start: number; end: number; scrollTop?: number }) => void;
}

export interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  settings: EditorSettings;
  onDropFile?: (file: File) => void;
  onSave?: () => void;
  className?: string;
  onScroll?: (e: React.UIEvent<HTMLTextAreaElement>) => void;
  onVisibleLineChange?: (line: number) => void;
}

export const MarkdownEditor = forwardRef<MarkdownEditorRef, MarkdownEditorProps>(
  (
    {
      value,
      onChange,
      settings,
      onDropFile,
      onSave,
      className = "",
      onScroll,
      onVisibleLineChange,
    },
    ref
  ) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const lineNumbersRef = useRef<HTMLDivElement>(null);
    const highlightBackdropRef = useRef<HTMLDivElement>(null);
    const highlightTimerRef = useRef<NodeJS.Timeout | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [highlightedLine, setHighlightedLine] = useState<number | null>(null);

    useEffect(() => {
      return () => {
        if (highlightTimerRef.current) {
          clearTimeout(highlightTimerRef.current);
        }
      };
    }, []);

    // Expose insertion and scrolling methods to parent/toolbar
    useImperativeHandle(ref, () => ({
      insertText(before: string, after = "", defaultText = "") {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selected = value.substring(start, end) || defaultText;

        const replacement = `${before}${selected}${after}`;
        const newValue = value.substring(0, start) + replacement + value.substring(end);

        onChange(newValue);

        // Move cursor to inside insertion
        requestAnimationFrame(() => {
          textarea.focus();
          const newCursorPos = start + before.length + selected.length;
          textarea.setSelectionRange(
            start + before.length,
            newCursorPos
          );
        });
      },
      focus() {
        textareaRef.current?.focus();
      },
      locateAndHighlight(options: LocateAndHighlightOptions) {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const linesArr = value.split("\n");
        const totalLines = linesArr.length || 1;

        // 1. Determine target line index (0-indexed)
        let targetLine = Math.max(0, Math.min(options.lineNumber, totalLines - 1));

        // 2. Character offset to target line start
        let lineStartChar = 0;
        for (let i = 0; i < targetLine; i++) {
          lineStartChar += linesArr[i].length + 1;
        }

        let lineText = linesArr[targetLine] || "";
        let selStart = lineStartChar;
        let selEnd = lineStartChar + lineText.length;

        const userSelection = (options.selectedText || "").trim();

        // Match user selection if provided
        if (userSelection && userSelection.length >= 2) {
          let matchIndex = lineText.toLowerCase().indexOf(userSelection.toLowerCase());

          // Search nearby lines (±5 lines) if not in immediate line
          if (matchIndex === -1) {
            for (let offset = -5; offset <= 5; offset++) {
              const testLine = targetLine + offset;
              if (testLine >= 0 && testLine < totalLines && testLine !== targetLine) {
                const testText = linesArr[testLine];
                const testIdx = testText.toLowerCase().indexOf(userSelection.toLowerCase());
                if (testIdx !== -1) {
                  targetLine = testLine;
                  lineText = testText;
                  lineStartChar = 0;
                  for (let i = 0; i < targetLine; i++) {
                    lineStartChar += linesArr[i].length + 1;
                  }
                  matchIndex = testIdx;
                  break;
                }
              }
            }
          }

          if (matchIndex !== -1) {
            selStart = lineStartChar + matchIndex;
            selEnd = selStart + userSelection.length;
          }
        } else if (options.elementText) {
          // If no selection, try matching prominent words from element text on target line
          const words = options.elementText
            .split(/\s+/)
            .map((w) => w.replace(/[^a-zA-Z0-9_-]/g, ""))
            .filter((w) => w.length >= 3);

          for (const w of words) {
            const idx = lineText.toLowerCase().indexOf(w.toLowerCase());
            if (idx !== -1) {
              selStart = lineStartChar + idx;
              selEnd = selStart + w.length;
              break;
            }
          }
        }

        // 3. Smooth scroll: Center target line in editor viewport
        const avgLineHeight = textarea.scrollHeight / totalLines;
        const viewportHeight = textarea.clientHeight || 400;
        const targetScrollTop = Math.max(
          0,
          targetLine * avgLineHeight - viewportHeight / 2 + avgLineHeight
        );

        textarea.scrollTo({
          top: targetScrollTop,
          behavior: "smooth",
        });

        if (lineNumbersRef.current) {
          lineNumbersRef.current.scrollTo({
            top: targetScrollTop,
            behavior: "smooth",
          });
        }

        if (highlightBackdropRef.current) {
          highlightBackdropRef.current.scrollTo({
            top: targetScrollTop,
            behavior: "smooth",
          });
        }

        // 4. Focus cursor and highlight matching content
        textarea.focus();
        try {
          textarea.setSelectionRange(selStart, selEnd);
        } catch {}

        // 5. Trigger smooth visual highlight animation
        if (highlightTimerRef.current) {
          clearTimeout(highlightTimerRef.current);
        }
        setHighlightedLine(targetLine);

        highlightTimerRef.current = setTimeout(() => {
          setHighlightedLine(null);
        }, 2500);
      },
      scrollToLine(lineNumber: number) {
        this.locateAndHighlight({ lineNumber });
      },
      getTextarea() {
        return textareaRef.current;
      },
      getCursorPosition() {
        const textarea = textareaRef.current;
        return {
          start: textarea?.selectionStart ?? 0,
          end: textarea?.selectionEnd ?? 0,
          scrollTop: textarea?.scrollTop ?? 0,
        };
      },
      restoreCursorPosition(pos: { start: number; end: number; scrollTop?: number }) {
        const textarea = textareaRef.current;
        if (!textarea) return;
        requestAnimationFrame(() => {
          textarea.focus();
          try {
            textarea.setSelectionRange(pos.start, pos.end);
            if (typeof pos.scrollTop === "number") {
              textarea.scrollTop = pos.scrollTop;
            }
          } catch {}
        });
      },
    }));

    // Handle Tab key and common shortcuts
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

      // Save shortcut
      if (cmdOrCtrl && e.key.toLowerCase() === "s") {
        e.preventDefault();
        onSave?.();
        return;
      }

      // Tab indentation
      if (e.key === "Tab") {
        e.preventDefault();
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const tabSpaces = " ".repeat(settings.tabSize);

        const newValue = value.substring(0, start) + tabSpaces + value.substring(end);
        onChange(newValue);

        requestAnimationFrame(() => {
          textarea.selectionStart = textarea.selectionEnd = start + settings.tabSize;
        });
        return;
      }

      // Bold (Cmd/Ctrl + B)
      if (cmdOrCtrl && e.key.toLowerCase() === "b") {
        e.preventDefault();
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selected = value.substring(start, end) || "bold text";
        const replacement = `**${selected}**`;
        const newValue = value.substring(0, start) + replacement + value.substring(end);
        onChange(newValue);
        requestAnimationFrame(() => {
          textarea.setSelectionRange(start + 2, start + 2 + selected.length);
        });
        return;
      }

      // Italic (Cmd/Ctrl + I)
      if (cmdOrCtrl && e.key.toLowerCase() === "i") {
        e.preventDefault();
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selected = value.substring(start, end) || "italic text";
        const replacement = `*${selected}*`;
        const newValue = value.substring(0, start) + replacement + value.substring(end);
        onChange(newValue);
        requestAnimationFrame(() => {
          textarea.setSelectionRange(start + 1, start + 1 + selected.length);
        });
        return;
      }
    };

    // Drag and drop markdown file
    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const files = e.dataTransfer.files;
      if (files && files[0] && onDropFile) {
        onDropFile(files[0]);
      }
    };

    // Calculate line numbers
    const lines = useMemo(() => {
      return value.split("\n");
    }, [value]);

    const fontStyles = {
      mono: "font-mono",
      sans: "font-sans",
      serif: "font-serif",
    }[settings.fontFamily];

    const lineHeightClass = {
      12: "leading-5",
      13: "leading-6",
      14: "leading-6",
      15: "leading-7",
      16: "leading-7",
      18: "leading-8",
    }[settings.fontSize] || "leading-6";

    const fontSizeStyles = {
      12: "text-xs leading-5",
      13: "text-[13px] leading-6",
      14: "text-sm leading-6",
      15: "text-[15px] leading-7",
      16: "text-base leading-7",
      18: "text-lg leading-8",
    }[settings.fontSize];

    return (
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative flex h-full w-full overflow-hidden bg-[var(--bg-primary)] ${className}`}
      >
        {/* Drag Overlay */}
        {isDragging && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-indigo-500/10 backdrop-blur-sm border-2 border-dashed border-indigo-500 rounded-xl m-2 pointer-events-none">
            <div className="bg-[var(--bg-elevated)] px-4 py-2 rounded-lg shadow-lg border border-[var(--border-medium)] text-sm font-semibold text-indigo-500">
              Drop markdown file to import
            </div>
          </div>
        )}

        {/* Floating Line Indicator Badge on Locate */}
        {highlightedLine !== null && (
          <div className="absolute top-3 right-4 z-20 pointer-events-none transition-all duration-300">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-[var(--bg-elevated)] text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 shadow-md backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              <span>Line {highlightedLine + 1}</span>
            </div>
          </div>
        )}

        {/* Optional Line Numbers Column */}
        {settings.lineNumbers && (
          <div
            ref={lineNumbersRef}
            aria-hidden="true"
            className="w-12 py-5 sm:py-6 select-none text-right pr-3 text-[11px] font-mono text-[var(--text-faint)] bg-[var(--bg-secondary)]/50 border-r border-[var(--border-subtle)] shrink-0 overflow-hidden"
          >
            {lines.map((_, i) => (
              <div
                key={i}
                className={`${lineHeightClass} transition-all duration-200 ${
                  highlightedLine === i
                    ? "line-highlight-active font-bold"
                    : ""
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        )}

        {/* Active Line Highlight Backdrop (Behind Textarea) */}
        <div
          ref={highlightBackdropRef}
          aria-hidden="true"
          className={`absolute top-0 bottom-0 ${
            settings.lineNumbers ? "left-12" : "left-0"
          } right-0 pointer-events-none overflow-hidden z-0 select-none p-5 sm:p-6 ${fontStyles} ${fontSizeStyles}`}
          style={{
            tabSize: settings.tabSize,
          }}
        >
          {lines.map((line, i) => (
            <div
              key={i}
              className={`${lineHeightClass} w-full ${
                settings.wordWrap ? "whitespace-pre-wrap break-words" : "whitespace-pre"
              } transition-colors duration-200 ${
                highlightedLine === i
                  ? "bg-indigo-500/15 dark:bg-indigo-500/25 border-l-[3px] border-indigo-500 rounded-r animate-editor-line-flash shadow-xs"
                  : "border-l-[3px] border-transparent"
              }`}
            >
              <span className="invisible select-none">{line || " "}</span>
            </div>
          ))}
        </div>

        {/* The Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Markdown editor input"
          onKeyDown={handleKeyDown}
          onScroll={(e) => {
            onScroll?.(e);
            if (lineNumbersRef.current) {
              lineNumbersRef.current.scrollTop = e.currentTarget.scrollTop;
            }
            if (highlightBackdropRef.current) {
              highlightBackdropRef.current.scrollTop = e.currentTarget.scrollTop;
            }
            if (onVisibleLineChange) {
              const avgHeight = e.currentTarget.scrollHeight / (lines.length || 1);
              const currentLine = Math.floor((e.currentTarget.scrollTop + 60) / (avgHeight || 1));
              onVisibleLineChange(currentLine);
            }
          }}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          placeholder="Start writing in markdown, or drop a markdown file here..."
          className={`relative z-10 h-full w-full resize-none p-5 sm:p-6 outline-none border-none bg-transparent text-[var(--text-primary)] placeholder-[var(--text-muted)] ${fontStyles} ${fontSizeStyles} ${
            settings.wordWrap ? "whitespace-pre-wrap" : "whitespace-pre"
          }`}
          style={{
            tabSize: settings.tabSize,
          }}
        />
      </div>
    );
  }
);

MarkdownEditor.displayName = "MarkdownEditor";
