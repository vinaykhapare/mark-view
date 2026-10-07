"use client";

import React from "react";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  FileCode,
  Quote,
  List,
  ListOrdered,
  CheckSquare,
  Table,
  Link as LinkIcon,
  Image as ImageIcon,
  Sigma,
  GitGraph,
  Minus,
} from "lucide-react";
import { Tooltip } from "../ui/tooltip";

export interface EditorToolbarProps {
  onInsert: (before: string, after?: string, defaultText?: string) => void;
  className?: string;
}

export function EditorToolbar({ onInsert, className = "" }: EditorToolbarProps) {
  return (
    <div
      className={`flex items-center gap-1 p-1.5 overflow-x-auto select-none border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)]/80 backdrop-blur-sm no-print editor-toolbar ${className}`}
    >
      {/* Headings */}
      <div className="flex items-center gap-0.5">
        <Tooltip content="Heading 1" shortcut="⌘1">
          <button
            onClick={() => onInsert("# ", "", "Heading 1")}
            aria-label="Heading 1"
            className="px-2 py-1 rounded text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors cursor-pointer"
          >
            H1
          </button>
        </Tooltip>
        <Tooltip content="Heading 2" shortcut="⌘2">
          <button
            onClick={() => onInsert("## ", "", "Heading 2")}
            aria-label="Heading 2"
            className="px-2 py-1 rounded text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors cursor-pointer"
          >
            H2
          </button>
        </Tooltip>
        <Tooltip content="Heading 3" shortcut="⌘3">
          <button
            onClick={() => onInsert("### ", "", "Heading 3")}
            aria-label="Heading 3"
            className="px-2 py-1 rounded text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors cursor-pointer"
          >
            H3
          </button>
        </Tooltip>
      </div>

      <div className="w-[1px] h-4 bg-[var(--border-subtle)] mx-1" />

      {/* Formatting */}
      <div className="flex items-center gap-0.5">
        <Tooltip content="Bold" shortcut="⌘B">
          <button
            onClick={() => onInsert("**", "**", "bold text")}
            aria-label="Bold text"
            className="p-1.5 rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors cursor-pointer"
          >
            <Bold className="w-3.5 h-3.5" />
          </button>
        </Tooltip>
        <Tooltip content="Italic" shortcut="⌘I">
          <button
            onClick={() => onInsert("*", "*", "italic text")}
            aria-label="Italic text"
            className="p-1.5 rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors cursor-pointer"
          >
            <Italic className="w-3.5 h-3.5" />
          </button>
        </Tooltip>
        <Tooltip content="Strikethrough" shortcut="⌘⇧X">
          <button
            onClick={() => onInsert("~~", "~~", "strikethrough text")}
            aria-label="Strikethrough text"
            className="p-1.5 rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors cursor-pointer"
          >
            <Strikethrough className="w-3.5 h-3.5" />
          </button>
        </Tooltip>
        <Tooltip content="Inline Code" shortcut="⌘E">
          <button
            onClick={() => onInsert("`", "`", "code")}
            aria-label="Inline Code"
            className="p-1.5 rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors cursor-pointer"
          >
            <Code className="w-3.5 h-3.5" />
          </button>
        </Tooltip>
      </div>

      <div className="w-[1px] h-4 bg-[var(--border-subtle)] mx-1" />

      {/* Structures */}
      <div className="flex items-center gap-0.5">
        <Tooltip content="Blockquote">
          <button
            onClick={() => onInsert("> ", "", "Quote text")}
            aria-label="Insert Blockquote"
            className="p-1.5 rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors cursor-pointer"
          >
            <Quote className="w-3.5 h-3.5" />
          </button>
        </Tooltip>
        <Tooltip content="Code Block" shortcut="⌘⇧C">
          <button
            onClick={() => onInsert("```typescript\n", "\n```", "// your code here")}
            aria-label="Insert Code Block"
            className="p-1.5 rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors cursor-pointer"
          >
            <FileCode className="w-3.5 h-3.5" />
          </button>
        </Tooltip>
        <Tooltip content="Bulleted List">
          <button
            onClick={() => onInsert("- ", "", "List item")}
            aria-label="Insert Bulleted List"
            className="p-1.5 rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors cursor-pointer"
          >
            <List className="w-3.5 h-3.5" />
          </button>
        </Tooltip>
        <Tooltip content="Numbered List">
          <button
            onClick={() => onInsert("1. ", "", "First item")}
            aria-label="Insert Numbered List"
            className="p-1.5 rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors cursor-pointer"
          >
            <ListOrdered className="w-3.5 h-3.5" />
          </button>
        </Tooltip>
        <Tooltip content="Task Checklist">
          <button
            onClick={() => onInsert("- [ ] ", "", "Task to complete")}
            aria-label="Insert Task Checklist"
            className="p-1.5 rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors cursor-pointer"
          >
            <CheckSquare className="w-3.5 h-3.5" />
          </button>
        </Tooltip>
      </div>

      <div className="w-[1px] h-4 bg-[var(--border-subtle)] mx-1" />

      {/* Media & Advanced */}
      <div className="flex items-center gap-0.5">
        <Tooltip content="Insert Table">
          <button
            onClick={() =>
              onInsert(
                "| Header 1 | Header 2 | Header 3 |\n| :--- | :---: | ---: |\n| Cell 1 | Cell 2 | Cell 3 |\n| Cell 4 | Cell 5 | Cell 6 |\n"
              )
            }
            aria-label="Insert Table"
            className="p-1.5 rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors cursor-pointer"
          >
            <Table className="w-3.5 h-3.5" />
          </button>
        </Tooltip>
        <Tooltip content="Insert Link" shortcut="⌘K">
          <button
            onClick={() => onInsert("[", "](https://example.com)", "link title")}
            aria-label="Insert Link"
            className="p-1.5 rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors cursor-pointer"
          >
            <LinkIcon className="w-3.5 h-3.5" />
          </button>
        </Tooltip>
        <Tooltip content="Insert Image">
          <button
            onClick={() =>
              onInsert(
                "![Image description](https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80)"
              )
            }
            aria-label="Insert Image"
            className="p-1.5 rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors cursor-pointer"
          >
            <ImageIcon className="w-3.5 h-3.5" />
          </button>
        </Tooltip>
        <Tooltip content="KaTeX Math Formula ($$)">
          <button
            onClick={() =>
              onInsert("$$\n\\int_{0}^{\\infty} x^2 e^{-x} dx = 2\n$$")
            }
            aria-label="Insert Math Formula"
            className="p-1.5 rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors cursor-pointer"
          >
            <Sigma className="w-3.5 h-3.5" />
          </button>
        </Tooltip>
        <Tooltip content="Mermaid Diagram">
          <button
            onClick={() =>
              onInsert(
                "```mermaid\ngraph TD\n    A[Start] --> B{Process}\n    B -->|Yes| C[Success]\n    B -->|No| D[Retry]\n```"
              )
            }
            aria-label="Insert Mermaid Diagram"
            className="p-1.5 rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors cursor-pointer"
          >
            <GitGraph className="w-3.5 h-3.5" />
          </button>
        </Tooltip>
        <Tooltip content="Horizontal Divider">
          <button
            onClick={() => onInsert("\n---\n")}
            aria-label="Insert Horizontal Divider"
            className="p-1.5 rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors cursor-pointer"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
        </Tooltip>
      </div>
    </div>
  );
}
