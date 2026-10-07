"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import { Copy, Check, Terminal, ExternalLink } from "lucide-react";
import { MermaidRenderer } from "./MermaidRenderer";
import { slugifyHeading } from "@/lib/headingUtils";
import { visit } from "unist-util-visit";

function rehypeSourceLines() {
  return (tree: any) => {
    visit(tree, "element", (node: any) => {
      if (node.position?.start?.line) {
        node.properties = node.properties || {};
        node.properties["data-source-line"] = String(node.position.start.line);
        if (node.position.end?.line) {
          node.properties["data-source-end-line"] = String(node.position.end.line);
        }
      }
    });
  };
}

function getHeadingText(children: React.ReactNode): string {
  if (!children) return "";
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) {
    return children.map(getHeadingText).join("");
  }
  if (React.isValidElement(children)) {
    return getHeadingText((children.props as any)?.children);
  }
  return "";
}

export interface LocateSourceEvent {
  line: number;
  selectedText?: string;
  elementText?: string;
  headingId?: string;
}

export interface MarkdownPreviewProps {
  content: string;
  className?: string;
  onLocateSource?: (event: LocateSourceEvent) => void;
}

export function MarkdownPreview({ content, className = "", onLocateSource }: MarkdownPreviewProps) {
  if (!content.trim()) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8 text-[var(--text-muted)]">
        <p className="text-sm font-medium">Nothing to preview</p>
        <p className="text-xs mt-1">Start writing markdown in the editor pane to see live output.</p>
      </div>
    );
  }

  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!onLocateSource) return;

    const target = e.target as HTMLElement | null;
    if (!target) return;

    // Ignore interactive controls like buttons or inputs
    if (target.closest("button") || target.closest("input")) return;

    // Visual ping animation on the double-clicked preview element
    const clickedBlock =
      target.closest<HTMLElement>(
        "h1, h2, h3, h4, h5, h6, p, li, blockquote, pre, tr, figure, [data-source-line]"
      ) || target;

    if (clickedBlock) {
      clickedBlock.classList.remove("preview-sync-ping");
      void clickedBlock.offsetWidth;
      clickedBlock.classList.add("preview-sync-ping");
      setTimeout(() => clickedBlock.classList.remove("preview-sync-ping"), 1000);
    }

    // Determine source line from data-source-line
    const lineEl = target.closest<HTMLElement>("[data-source-line]");
    const lineAttr = lineEl?.getAttribute("data-source-line");
    const parsedLine = lineAttr ? parseInt(lineAttr, 10) : 1;

    // Selection text (e.g. user double-clicked a specific word)
    const selection = window.getSelection()?.toString().trim();

    // Text content fallback
    const text = (target.textContent || "").trim();

    // Heading ID if clicked on or inside a heading
    const headingEl = target.closest<HTMLElement>("[data-heading-id]");
    const headingId = headingEl?.getAttribute("data-heading-id") || undefined;

    onLocateSource({
      line: parsedLine,
      selectedText: selection || undefined,
      elementText: text.slice(0, 120) || undefined,
      headingId,
    });
  };

  return (
    <div className={`markdown-body ${className}`} onDoubleClick={handleDoubleClick}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks, remarkMath]}
        rehypePlugins={[rehypeSourceLines, rehypeKatex, rehypeRaw]}
        components={{
          // Code Block Component with Copy & Mermaid handling
          code({ className, children, node, ...props }: any) {
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1].toLowerCase() : "";
            const rawCode = String(children).replace(/\n$/, "");

            // Detect Mermaid Diagram
            if (language === "mermaid") {
              return (
                <div {...props}>
                  <MermaidRenderer chart={rawCode} />
                </div>
              );
            }

            // Inline code if no language class and no line breaks
            const isInline = !match && !rawCode.includes("\n");
            if (isInline) {
              return (
                <code className="inline-code" {...props}>
                  {children}
                </code>
              );
            }

            return <CodeBlock language={language} code={rawCode} {...props} />;
          },

          // Heading with automatic ID anchors for TOC
          h1: ({ children, node, ...props }: any) => {
            const cleanText = getHeadingText(children).replace(/[*_`~[\]]/g, "").trim();
            const id = slugifyHeading(cleanText) || "heading-h1";
            return (
              <h1 id={id} data-heading-id={id} {...props} className="scroll-mt-24 group relative">
                <a
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(id);
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth", block: "start" });
                      el.classList.remove("heading-highlight-flash");
                      void el.offsetWidth;
                      el.classList.add("heading-highlight-flash");
                      setTimeout(() => el.classList.remove("heading-highlight-flash"), 2500);
                    }
                  }}
                  className="absolute -left-6 opacity-0 group-hover:opacity-60 text-indigo-500 font-normal select-none no-underline cursor-pointer"
                  aria-label={`Link to ${cleanText}`}
                >
                  #
                </a>
                {children}
              </h1>
            );
          },
          h2: ({ children, node, ...props }: any) => {
            const cleanText = getHeadingText(children).replace(/[*_`~[\]]/g, "").trim();
            const id = slugifyHeading(cleanText) || "heading-h2";
            return (
              <h2 id={id} data-heading-id={id} {...props} className="scroll-mt-24 group relative">
                <a
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(id);
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth", block: "start" });
                      el.classList.remove("heading-highlight-flash");
                      void el.offsetWidth;
                      el.classList.add("heading-highlight-flash");
                      setTimeout(() => el.classList.remove("heading-highlight-flash"), 2500);
                    }
                  }}
                  className="absolute -left-5 opacity-0 group-hover:opacity-60 text-indigo-500 font-normal select-none no-underline cursor-pointer"
                  aria-label={`Link to ${cleanText}`}
                >
                  #
                </a>
                {children}
              </h2>
            );
          },
          h3: ({ children, node, ...props }: any) => {
            const cleanText = getHeadingText(children).replace(/[*_`~[\]]/g, "").trim();
            const id = slugifyHeading(cleanText) || "heading-h3";
            return (
              <h3 id={id} data-heading-id={id} {...props} className="scroll-mt-24 group relative">
                <a
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(id);
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth", block: "start" });
                      el.classList.remove("heading-highlight-flash");
                      void el.offsetWidth;
                      el.classList.add("heading-highlight-flash");
                      setTimeout(() => el.classList.remove("heading-highlight-flash"), 2500);
                    }
                  }}
                  className="absolute -left-4 opacity-0 group-hover:opacity-60 text-indigo-500 font-normal select-none no-underline cursor-pointer"
                  aria-label={`Link to ${cleanText}`}
                >
                  #
                </a>
                {children}
              </h3>
            );
          },
          h4: ({ children, node, ...props }: any) => {
            const cleanText = getHeadingText(children).replace(/[*_`~[\]]/g, "").trim();
            const id = slugifyHeading(cleanText) || "heading-h4";
            return (
              <h4 id={id} data-heading-id={id} {...props} className="scroll-mt-24 group relative">
                <a
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(id);
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth", block: "start" });
                      el.classList.remove("heading-highlight-flash");
                      void el.offsetWidth;
                      el.classList.add("heading-highlight-flash");
                      setTimeout(() => el.classList.remove("heading-highlight-flash"), 2500);
                    }
                  }}
                  className="absolute -left-4 opacity-0 group-hover:opacity-60 text-indigo-500 font-normal select-none no-underline cursor-pointer"
                  aria-label={`Link to ${cleanText}`}
                >
                  #
                </a>
                {children}
              </h4>
            );
          },

          // Checkbox Task List Item
          li: ({ children, node, ...props }: any) => {
            const childrenArray = React.Children.toArray(children);
            const hasCheckbox = childrenArray.some(
              (c: any) => c?.props?.type === "checkbox"
            );

            if (hasCheckbox) {
              return (
                <li className="flex items-start gap-2 list-none my-1 -ml-6" {...props}>
                  {children}
                </li>
              );
            }
            return <li {...props}>{children}</li>;
          },

          // Interactive or custom checkbox
          input: ({ type, checked, node, ...props }: any) => {
            if (type === "checkbox") {
              return (
                <input
                  type="checkbox"
                  checked={checked}
                  readOnly
                  className="mt-1 h-4 w-4 rounded border-[var(--border-medium)] text-indigo-600 focus:ring-indigo-500 cursor-pointer accent-indigo-600"
                  {...props}
                />
              );
            }
            return <input type={type} {...props} />;
          },

          // Responsive Table Wrapper
          table: ({ children, node, ...props }: any) => (
            <div className="overflow-x-auto my-4 rounded-xl border border-[var(--border-subtle)] shadow-sm max-w-full">
              <table className="w-full text-left border-collapse" {...props}>{children}</table>
            </div>
          ),

          // Smart Links: Internal vs External
          a: ({ href, children, node, ...props }: any) => {
            const isInternal = Boolean(href && href.startsWith("#"));
            if (isInternal && href) {
              const targetId = href.slice(1);
              return (
                <a
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    const el =
                      document.getElementById(targetId) ||
                      document.querySelector(`[data-heading-id="${targetId}"]`);
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth", block: "start" });
                      el.classList.remove("heading-highlight-flash");
                      void (el as HTMLElement).offsetWidth;
                      el.classList.add("heading-highlight-flash");
                      setTimeout(() => el.classList.remove("heading-highlight-flash"), 2500);
                    }
                  }}
                  className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium cursor-pointer"
                  {...props}
                >
                  {children}
                </a>
              );
            }
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 text-indigo-600 dark:text-indigo-400 hover:underline"
                {...props}
              >
                <span>{children}</span>
                <ExternalLink className="w-3 h-3 inline opacity-70" />
              </a>
            );
          },

          // Styled Image with caption
          img: ({ src, alt, node, ...props }: any) => (
            <figure className="my-5" {...props}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt || ""}
                className="w-full max-h-[460px] object-cover rounded-xl border border-[var(--border-subtle)] shadow-md"
              />
              {alt && (
                <figcaption className="text-center text-xs text-[var(--text-muted)] mt-2 italic">
                  {alt}
                </figcaption>
              )}
            </figure>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

// ─── Code Block Sub-component with Copy Button ────────────────────────────────
function CodeBlock({ language, code, ...props }: { language: string; code: string; [key: string]: any }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div {...props} className="my-5 rounded-xl border border-[var(--border-medium)] overflow-hidden bg-[var(--code-bg)] shadow-md group">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-[var(--bg-tertiary)] border-b border-[var(--border-subtle)] select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-1">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-[11px] font-mono font-medium text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1">
            <Terminal className="w-3 h-3 opacity-60" />
            {language || "text"}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[11px] font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] px-2 py-1 rounded-md hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-500" />
              <span className="text-emerald-500 font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <pre className="p-4 overflow-x-auto text-[13px] leading-relaxed font-mono text-[var(--text-primary)]">
        <code>{code}</code>
      </pre>
    </div>
  );
}
