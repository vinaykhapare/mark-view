"use client";

import React, { useState } from "react";
import {
  FileText,
  LayoutGrid,
  ListTree,
  Search,
  Plus,
  Star,
  Trash2,
  Copy,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Upload,
  HardDrive,
  Cpu,
  PenTool,
  Kanban,
  Users,
  Compass,
  Terminal,
  X,
} from "lucide-react";
import { Document, DocumentTemplate, HeadingItem } from "@/lib/types";
import { DOCUMENT_TEMPLATES } from "@/lib/templates";
import { Tooltip } from "../ui/tooltip";
import { EmptyState } from "../ui/EmptyState";
import { TableOfContents } from "./TableOfContents";

export interface WorkspaceSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  documents: Document[];
  activeDocId: string;
  onSelectDoc: (id: string) => void;
  onCreateDoc: () => void;
  onDeleteDoc: (id: string) => void;
  onDuplicateDoc: (id: string) => void;
  onToggleStar: (id: string) => void;
  onApplyTemplate: (templateId: string) => void;
  onImportFile: (file: File) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  outline: HeadingItem[];
  activeHeadingId?: string;
  onSelectHeading?: (heading: HeadingItem) => void;
}

export function WorkspaceSidebar({
  isOpen,
  onToggle,
  documents,
  activeDocId,
  onSelectDoc,
  onCreateDoc,
  onDeleteDoc,
  onDuplicateDoc,
  onToggleStar,
  onApplyTemplate,
  onImportFile,
  searchQuery,
  onSearchChange,
  outline,
  activeHeadingId,
  onSelectHeading,
}: WorkspaceSidebarProps) {
  const [activeTab, setActiveTab] = useState<"docs" | "templates" | "outline">("docs");
  const [starFilterOnly, setStarFilterOnly] = useState(false);

  const filteredDocs = starFilterOnly
    ? documents.filter((d) => d.isStarred)
    : documents;

  // File upload input ref
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const getTemplateIcon = (name: string) => {
    switch (name) {
      case "Cpu":
        return <Cpu className="w-4 h-4 text-blue-500" />;
      case "PenTool":
        return <PenTool className="w-4 h-4 text-purple-500" />;
      case "Kanban":
        return <Kanban className="w-4 h-4 text-amber-500" />;
      case "Users":
        return <Users className="w-4 h-4 text-emerald-500" />;
      case "FileCode":
        return <FileText className="w-4 h-4 text-indigo-500" />;
      case "Compass":
        return <Compass className="w-4 h-4 text-rose-500" />;
      case "Terminal":
        return <Terminal className="w-4 h-4 text-cyan-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-amber-500" />;
    }
  };

  const handleHeadingClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (!isOpen) {
    return (
      <aside className="w-12 border-r border-[var(--border-subtle)] bg-[var(--bg-secondary)] hidden md:flex flex-col items-center py-3 select-none shrink-0 z-20 no-print workspace-sidebar">
        <Tooltip content="Expand Sidebar" shortcut={"⌘\\"} position="right">
          <button
            onClick={onToggle}
            className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors cursor-pointer"
            aria-label="Expand Sidebar"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </Tooltip>

        <div className="w-6 h-[1px] bg-[var(--border-subtle)] my-3" />

        <Tooltip content="New Document" position="right">
          <button
            onClick={onCreateDoc}
            className="p-2 rounded-lg bg-[var(--text-primary)] text-[var(--bg-primary)] hover:opacity-90 transition-opacity cursor-pointer"
            aria-label="New Document"
          >
            <Plus className="w-4 h-4" />
          </button>
        </Tooltip>
      </aside>
    );
  }

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden animate-in fade-in duration-200 no-print"
        onClick={onToggle}
        aria-hidden="true"
      />

      <aside className="fixed inset-y-0 left-0 z-40 md:relative md:z-20 w-72 sm:w-80 border-r border-[var(--border-subtle)] bg-[var(--bg-secondary)] flex flex-col h-full select-none shrink-0 shadow-2xl md:shadow-none transition-all duration-200 no-print workspace-sidebar">
        {/* Sidebar Header & Navigation Tabs */}
        <div className="p-3 border-b border-[var(--border-subtle)] flex items-center justify-between">
          <div className="flex items-center gap-1 bg-[var(--bg-tertiary)] p-0.5 rounded-lg border border-[var(--border-subtle)]">
            <button
              onClick={() => setActiveTab("docs")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                activeTab === "docs"
                  ? "bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-sm"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Docs</span>
            </button>

            <button
              onClick={() => setActiveTab("templates")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                activeTab === "templates"
                  ? "bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-sm"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Templates</span>
            </button>

            <button
              onClick={() => setActiveTab("outline")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                activeTab === "outline"
                  ? "bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-sm"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              <ListTree className="w-3.5 h-3.5" />
              <span>Outline</span>
            </button>
          </div>

          <Tooltip content="Collapse Sidebar" shortcut="⌘\">
            <button
              onClick={onToggle}
              className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors cursor-pointer"
              aria-label="Collapse Sidebar"
            >
              <ChevronLeft className="w-4 h-4 hidden md:block" />
              <X className="w-4 h-4 md:hidden" />
            </button>
          </Tooltip>
        </div>

      {/* Tab: Documents */}
      {activeTab === "docs" && (
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Action Row & Search */}
          <div className="p-3 space-y-2 border-b border-[var(--border-subtle)]">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[var(--text-muted)] absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search documents..."
                className="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--border-strong)] transition-colors"
              />
            </div>

            <div className="flex items-center justify-between gap-1.5">
              <button
                onClick={onCreateDoc}
                className="flex-1 flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-[var(--text-primary)] text-[var(--bg-primary)] hover:opacity-90 transition-opacity cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Doc</span>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] hover:border-[var(--border-medium)] transition-colors cursor-pointer"
                title="Import markdown file"
              >
                <Upload className="w-3.5 h-3.5" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".md,.markdown,.txt"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    onImportFile(e.target.files[0]);
                    e.target.value = "";
                  }
                }}
              />

              <button
                onClick={() => setStarFilterOnly(!starFilterOnly)}
                className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                  starFilterOnly
                    ? "bg-amber-500/10 text-amber-500 border-amber-500/30"
                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)] bg-[var(--bg-tertiary)] border-[var(--border-subtle)]"
                }`}
                title="Show only starred"
              >
                <Star className="w-3.5 h-3.5 fill-current" />
              </button>
            </div>
          </div>

          {/* Documents List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {filteredDocs.length === 0 ? (
              <EmptyState
                title="No documents"
                description={searchQuery ? "No matches found" : "Create one to start"}
                onAction={onCreateDoc}
              />
            ) : (
              filteredDocs.map((doc) => {
                const isActive = doc.id === activeDocId;
                const wordCount = doc.content.trim() ? doc.content.trim().split(/\s+/).length : 0;

                return (
                  <div
                    key={doc.id}
                    onClick={() => onSelectDoc(doc.id)}
                    className={`group relative flex flex-col p-2.5 rounded-lg transition-all cursor-pointer ${
                      isActive
                        ? "bg-[var(--bg-elevated)] border border-[var(--border-strong)] shadow-xs"
                        : "hover:bg-[var(--bg-tertiary)]/70 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <FileText
                          className={`w-4 h-4 shrink-0 ${
                            isActive ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"
                          }`}
                        />
                        <span
                          className={`text-xs font-medium truncate ${
                            isActive ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"
                          }`}
                        >
                          {doc.title || "Untitled"}
                        </span>
                      </div>

                      {/* Action buttons (Star, Duplicate, Delete) */}
                      <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleStar(doc.id);
                          }}
                          className={`p-1 rounded hover:bg-[var(--bg-secondary)] transition-colors ${
                            doc.isStarred ? "text-amber-400 opacity-100" : "text-[var(--text-muted)]"
                          }`}
                        >
                          <Star className={`w-3 h-3 ${doc.isStarred ? "fill-current" : ""}`} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDuplicateDoc(doc.id);
                          }}
                          className="p-1 rounded text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
                          title="Duplicate"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteDoc(doc.id);
                          }}
                          className="p-1 rounded text-[var(--text-muted)] hover:text-red-500 hover:bg-[var(--bg-secondary)] transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-[var(--text-faint)] mt-1.5">
                      <span>{wordCount} words</span>
                      <span>{new Date(doc.updatedAt).toLocaleDateString([], { month: "short", day: "numeric" })}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Tab: Templates */}
      {activeTab === "templates" && (
        <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
          <p className="text-xs text-[var(--text-muted)] font-medium mb-1">
            Choose a starter template:
          </p>
          {DOCUMENT_TEMPLATES.map((tpl) => (
            <div
              key={tpl.id}
              onClick={() => onApplyTemplate(tpl.id)}
              className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] hover:border-[var(--border-strong)] transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  {getTemplateIcon(tpl.iconName)}
                  <h4 className="text-xs font-semibold text-[var(--text-primary)] group-hover:text-blue-400 transition-colors">
                    {tpl.name}
                  </h4>
                </div>
                {tpl.badge && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-secondary)]">
                    {tpl.badge}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[var(--text-muted)] line-clamp-2 leading-relaxed">
                {tpl.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Outline (TOC) */}
      {activeTab === "outline" && (
        <TableOfContents
          headings={outline}
          activeHeadingId={activeHeadingId}
          onSelectHeading={(heading) => {
            onSelectHeading?.(heading);
          }}
        />
      )}

      {/* Footer Storage Indicator */}
      <div className="p-3 border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)] flex items-center justify-between text-[11px] text-[var(--text-muted)]">
        <div className="flex items-center gap-1.5">
          <HardDrive className="w-3.5 h-3.5 text-[var(--text-muted)]" />
          <span>Local Storage Buffer</span>
        </div>
        <span className="font-mono text-[10px] text-emerald-400 font-medium">100% Private</span>
      </div>
    </aside>
  </>
);
}
