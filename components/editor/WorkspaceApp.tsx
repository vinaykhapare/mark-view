"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { ViewMode, EditorSettings, HeadingItem } from "@/lib/types";
import { useDocuments } from "@/lib/useDocuments";
import { WorkspaceNavbar } from "./WorkspaceNavbar";
import { WorkspaceSidebar } from "./WorkspaceSidebar";
import { EditorToolbar } from "./EditorToolbar";
import { MarkdownEditor, MarkdownEditorRef } from "./MarkdownEditor";
import { MarkdownPreview, LocateSourceEvent } from "./MarkdownPreview";
import { WorkspaceFooter } from "./WorkspaceFooter";
import { CommandPalette } from "./CommandPalette";
import { SettingsModal } from "./SettingsModal";
import { ShortcutsModal } from "./ShortcutsModal";
import { MobileTocDrawer } from "./MobileTocDrawer";
import { ZenModeControls } from "./ZenModeControls";
import {
  exportToStandaloneHtml,
  exportToMarkdown,
  exportToWordDoc,
  exportToPdf,
  printDocument,
} from "@/lib/exportUtils";
import { triggerToast } from "@/lib/useToast";
import { MarkViewLogo } from "../ui/MarkViewLogo";

export default function WorkspaceApp() {
  const {
    documents,
    allDocuments,
    activeDocument,
    activeDocId,
    setActiveDocId,
    createDocument,
    updateActiveContent,
    updateDocumentTitle,
    deleteDocument,
    duplicateDocument,
    toggleStar,
    applyTemplate,
    handleImportFile,
    searchQuery,
    setSearchQuery,
    isLoaded,
    isSaving,
    lastSavedAt,
    stats,
    outline,
  } = useDocuments();

  // Layout states
  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isZenMode, setIsZenMode] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);

  // Table of Contents state
  const [activeHeadingId, setActiveHeadingId] = useState<string>("");
  const isNavigatingRef = useRef(false);

  // Editor Settings
  const [settings, setSettings] = useState<EditorSettings>({
    fontSize: 14,
    fontFamily: "mono",
    lineNumbers: true,
    wordWrap: true,
    tabSize: 2,
    syncScroll: true,
    theme: "dark",
    autoSave: true,
  });

  const editorRef = useRef<MarkdownEditorRef>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  // Initialize active heading on document change
  useEffect(() => {
    if (outline.length > 0) {
      if (!activeHeadingId || !outline.some((h) => h.id === activeHeadingId)) {
        setActiveHeadingId(outline[0].id);
      }
    } else {
      setActiveHeadingId("");
    }
  }, [activeDocId, outline]);

  // Check for template query parameter on initial load
  const templateProcessedRef = useRef(false);
  useEffect(() => {
    if (isLoaded && !templateProcessedRef.current && typeof window !== "undefined") {
      templateProcessedRef.current = true;
      const params = new URLSearchParams(window.location.search);
      const templateId = params.get("template");
      if (templateId) {
        applyTemplate(templateId);
        window.history.replaceState({}, "", window.location.pathname);
      }
    }
  }, [isLoaded, applyTemplate]);

  // Navigate to heading smoothly in editor and preview pane
  const handleNavigateToHeading = useCallback(
    (heading: HeadingItem) => {
      isNavigatingRef.current = true;
      setActiveHeadingId(heading.id);

      // 1. Scroll textarea in editor if visible
      if (viewMode === "split" || viewMode === "editor") {
        editorRef.current?.scrollToLine(heading.lineNumber);
      }

      // 2. Scroll preview container if visible
      if (viewMode === "split" || viewMode === "preview") {
        const previewEl = previewContainerRef.current;
        if (previewEl) {
          const targetEl =
            previewEl.querySelector<HTMLElement>(`[data-heading-id="${heading.id}"]`) ||
            document.getElementById(heading.id);

          if (targetEl) {
            targetEl.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });

            // Trigger brief highlight pulse animation
            targetEl.classList.remove("heading-highlight-flash");
            void targetEl.offsetWidth; // Force CSS reflow to replay animation
            targetEl.classList.add("heading-highlight-flash");

            setTimeout(() => {
              targetEl.classList.remove("heading-highlight-flash");
            }, 2600);
          }
        }
      }

      // Reset navigation lock after smooth scroll settles
      setTimeout(() => {
        isNavigatingRef.current = false;
      }, 750);
    },
    [viewMode]
  );

  // IntersectionObserver scroll spy for preview pane
  useEffect(() => {
    const container = previewContainerRef.current;
    if (!container) return;

    const headingEls = container.querySelectorAll<HTMLElement>("[data-heading-id]");
    if (headingEls.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isNavigatingRef.current) return;

        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          visibleEntries.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
          const topEntry = visibleEntries[0];
          const id = topEntry.target.getAttribute("data-heading-id");
          if (id) {
            setActiveHeadingId(id);
          }
        }
      },
      {
        root: container,
        rootMargin: "-20px 0px -65% 0px",
        threshold: [0, 0.25, 0.5, 1],
      }
    );

    headingEls.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [activeDocument?.content, viewMode]);

  // Preview scroll handler for edge cases (top/bottom of document)
  const handlePreviewScroll = useCallback(() => {
    if (isNavigatingRef.current || !previewContainerRef.current) return;
    const container = previewContainerRef.current;

    // Top edge of document
    if (container.scrollTop < 60 && outline.length > 0) {
      if (activeHeadingId !== outline[0].id) {
        setActiveHeadingId(outline[0].id);
      }
      return;
    }

    // Bottom edge of document
    if (
      container.scrollTop + container.clientHeight >=
        container.scrollHeight - 30 &&
      outline.length > 0
    ) {
      const lastHeading = outline[outline.length - 1];
      if (activeHeadingId !== lastHeading.id) {
        setActiveHeadingId(lastHeading.id);
      }
      return;
    }

    // Scroll spy fallback calculation
    const headingEls = Array.from(
      container.querySelectorAll<HTMLElement>("[data-heading-id]")
    );
    if (headingEls.length === 0) return;

    const containerTop = container.getBoundingClientRect().top;
    let currentId = headingEls[0].getAttribute("data-heading-id") || "";

    for (const el of headingEls) {
      const rect = el.getBoundingClientRect();
      const relativeTop = rect.top - containerTop;
      if (relativeTop <= 120) {
        currentId = el.getAttribute("data-heading-id") || currentId;
      } else {
        break;
      }
    }

    if (currentId && currentId !== activeHeadingId) {
      setActiveHeadingId(currentId);
    }
  }, [outline, activeHeadingId]);

  // Editor visible line scroll tracking -> sync TOC
  const handleEditorVisibleLineChange = useCallback(
    (currentLine: number) => {
      if (isNavigatingRef.current || outline.length === 0) return;
      let matchedHeading = outline[0];
      for (const h of outline) {
        if (h.lineNumber <= currentLine) {
          matchedHeading = h;
        } else {
          break;
        }
      }
      if (matchedHeading && matchedHeading.id !== activeHeadingId) {
        setActiveHeadingId(matchedHeading.id);
      }
    },
    [outline, activeHeadingId]
  );

  // Sync scroll implementation
  const handleEditorScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (!settings.syncScroll || !previewContainerRef.current) return;
    const target = e.currentTarget;
    const scrollPercentage =
      target.scrollTop / (target.scrollHeight - target.clientHeight || 1);
    const previewEl = previewContainerRef.current;
    previewEl.scrollTop =
      scrollPercentage * (previewEl.scrollHeight - previewEl.clientHeight);
  };

  // Double-click in Preview -> locate, scroll, focus cursor and highlight in Editor
  const handleLocateSource = useCallback(
    ({ line, selectedText, elementText, headingId }: LocateSourceEvent) => {
      // 1. If currently in preview-only view mode, switch to split view so editor is visible
      if (viewMode === "preview") {
        setViewMode("split");
      }

      const executeLocate = () => {
        if (!editorRef.current) return;
        editorRef.current.locateAndHighlight({
          lineNumber: line - 1, // convert 1-based AST line to 0-based
          selectedText,
          elementText,
          headingId,
        });
      };

      if (viewMode === "preview") {
        // Wait for split view transition to mount the editor component
        setTimeout(executeLocate, 100);
      } else {
        executeLocate();
      }
    },
    [viewMode]
  );

  // Preserve cursor & scroll position on Zen Mode toggle
  const toggleZenMode = useCallback(() => {
    const pos = editorRef.current?.getCursorPosition();
    const previewScrollTop = previewContainerRef.current?.scrollTop;

    setIsZenMode((prev) => !prev);

    requestAnimationFrame(() => {
      if (pos) {
        editorRef.current?.restoreCursorPosition(pos);
      }
      if (previewContainerRef.current && previewScrollTop !== undefined) {
        previewContainerRef.current.scrollTop = previewScrollTop;
      }
    });
  }, []);

  // Keyboard shortcut listeners
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

      // Escape: Close modals or exit Zen Mode (never get trapped in full screen)
      if (e.key === "Escape") {
        if (isMobileTocOpen) {
          e.preventDefault();
          setIsMobileTocOpen(false);
          return;
        }
        if (isCommandPaletteOpen) {
          e.preventDefault();
          setIsCommandPaletteOpen(false);
          return;
        }
        if (isSettingsOpen) {
          e.preventDefault();
          setIsSettingsOpen(false);
          return;
        }
        if (isShortcutsOpen) {
          e.preventDefault();
          setIsShortcutsOpen(false);
          return;
        }
        if (isZenMode) {
          e.preventDefault();
          toggleZenMode();
          return;
        }
      }

      // Cmd/Ctrl + K: Command Palette
      if (cmdOrCtrl && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
        return;
      }

      // Cmd/Ctrl + \ : Toggle Sidebar
      if (cmdOrCtrl && e.key === "\\") {
        e.preventDefault();
        setIsSidebarOpen((prev) => !prev);
        return;
      }

      // Cmd/Ctrl + Shift + F: Zen Mode
      if (cmdOrCtrl && e.shiftKey && e.key.toLowerCase() === "f") {
        e.preventDefault();
        toggleZenMode();
        return;
      }

      // Cmd/Ctrl + Shift + P: Cycle View Mode
      if (cmdOrCtrl && e.shiftKey && e.key.toLowerCase() === "p") {
        e.preventDefault();
        setViewMode((current) => {
          if (current === "split") return "editor";
          if (current === "editor") return "preview";
          return "split";
        });
        return;
      }

      // '?' key: Shortcuts Modal (when not focused in textarea)
      if (
        e.key === "?" &&
        !["input", "textarea"].includes(
          (document.activeElement?.tagName || "").toLowerCase()
        )
      ) {
        e.preventDefault();
        setIsShortcutsOpen(true);
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [
    isMobileTocOpen,
    isCommandPaletteOpen,
    isSettingsOpen,
    isShortcutsOpen,
    isZenMode,
    toggleZenMode,
  ]);

  // Export handler
  const handleExport = useCallback(
    async (format: "html" | "pdf" | "docx" | "md") => {
      if (!activeDocument) return;
      const title = activeDocument.title || "MarkView Document";
      const markdown = activeDocument.content;

      if (format === "md") {
        exportToMarkdown(title, markdown);
        triggerToast("Exported Markdown (.md)", "success");
      } else if (format === "html") {
        const previewElement = previewContainerRef.current;
        const renderedHtml = previewElement ? previewElement.innerHTML : markdown;
        exportToStandaloneHtml(title, renderedHtml);
        triggerToast("Exported Standalone HTML", "success");
      } else if (format === "docx") {
        const previewElement = previewContainerRef.current;
        const renderedHtml = previewElement ? previewElement.innerHTML : markdown;
        exportToWordDoc(title, renderedHtml);
        triggerToast("Exported Word Document (.doc)", "success");
      } else if (format === "pdf") {
        if (viewMode === "editor") {
          setViewMode("split");
        }
        setTimeout(() => {
          printDocument();
        }, 60);
      }
    },
    [activeDocument, viewMode]
  );

  const handleInsert = (before: string, after?: string, defaultText?: string) => {
    editorRef.current?.insertText(before, after, defaultText);
  };

  if (!isLoaded || !activeDocument) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[var(--bg-primary)]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-2xl overflow-hidden flex items-center justify-center animate-pulse">
            <MarkViewLogo size={48} className="w-full h-full" />
          </div>
          <p className="text-xs font-medium text-[var(--text-muted)] animate-pulse">
            Loading MarkView Studio...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Top Navbar (Hidden in Zen Mode) */}
      {!isZenMode && (
        <WorkspaceNavbar
          title={activeDocument.title}
          onTitleChange={(title) => updateDocumentTitle(activeDocument.id, title)}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          isZenMode={isZenMode}
          onToggleZenMode={toggleZenMode}
          onExport={handleExport}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
          markdownContent={activeDocument.content}
          onOpenMobileToc={() => setIsMobileTocOpen(true)}
          tocCount={outline.length}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        />
      )}

      {/* Main Body (Sidebar + Centered Editor Workspace) */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Collapsible Sidebar (Hidden in Zen Mode) */}
        {!isZenMode && (
          <WorkspaceSidebar
            isOpen={isSidebarOpen}
            onToggle={() => setIsSidebarOpen((prev) => !prev)}
            documents={documents}
            activeDocId={activeDocId}
            onSelectDoc={setActiveDocId}
            onCreateDoc={() => createDocument()}
            onDeleteDoc={deleteDocument}
            onDuplicateDoc={duplicateDocument}
            onToggleStar={toggleStar}
            onApplyTemplate={applyTemplate}
            onImportFile={handleImportFile}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            outline={outline}
            activeHeadingId={activeHeadingId}
            onSelectHeading={handleNavigateToHeading}
          />
        )}

        {/* Editor & Preview Workspace Container */}
        <div className="flex flex-col flex-1 overflow-hidden relative">
          {/* Formatting Toolbar (Show if in editor or split mode, hidden in Zen mode) */}
          {!isZenMode && viewMode !== "preview" && (
            <EditorToolbar onInsert={handleInsert} />
          )}

          {/* Centered Split Workspace Content (Responsive Side-by-Side on Desktop, Stacked on Mobile Split) */}
          <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
            {/* Left: Editor Pane */}
            {(viewMode === "split" || viewMode === "editor") && (
              <div
                className={`${
                  viewMode === "split"
                    ? "h-1/2 md:h-full flex-1 border-b md:border-b-0 md:border-r border-[var(--border-subtle)]"
                    : "h-full flex-1"
                } overflow-hidden flex flex-col no-print editor-pane ${
                  isZenMode ? "max-w-4xl mx-auto w-full" : ""
                }`}
              >
                <MarkdownEditor
                  ref={editorRef}
                  value={activeDocument.content}
                  onChange={updateActiveContent}
                  settings={settings}
                  onDropFile={handleImportFile}
                  onSave={() => handleExport("md")}
                  onScroll={handleEditorScroll}
                  onVisibleLineChange={handleEditorVisibleLineChange}
                />
              </div>
            )}

            {/* Right: Live Preview Pane */}
            <div
              ref={previewContainerRef}
              onScroll={handlePreviewScroll}
              className={`${
                viewMode === "editor" ? "hidden" : viewMode === "split" ? "h-1/2 md:h-full flex-1" : "h-full w-full"
              } overflow-y-auto bg-[var(--bg-secondary)]/30 print-area`}
            >
              <div className="max-w-4xl mx-auto p-4 sm:p-8 lg:p-12 print-content-wrapper">
                <MarkdownPreview
                  content={activeDocument.content}
                  onLocateSource={handleLocateSource}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Zen Mode Floating Top-Right Controls */}
      {isZenMode && (
        <ZenModeControls
          onExit={toggleZenMode}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenToc={() => setIsMobileTocOpen(true)}
          documentTitle={activeDocument.title}
          wordCount={stats.words}
        />
      )}

      {/* Workspace Footer (Hidden in Zen Mode) */}
      {!isZenMode && (
        <WorkspaceFooter
          stats={stats}
          isSaving={isSaving}
          lastSavedAt={lastSavedAt}
          onOpenShortcuts={() => setIsShortcutsOpen(true)}
          syncScroll={settings.syncScroll}
          onToggleSyncScroll={() =>
            setSettings((s) => ({ ...s, syncScroll: !s.syncScroll }))
          }
        />
      )}

      {/* Mobile / Slide-over Table of Contents Drawer & Modals */}
      <div className="no-print">
        <MobileTocDrawer
          isOpen={isMobileTocOpen}
          onClose={() => setIsMobileTocOpen(false)}
          headings={outline}
          activeHeadingId={activeHeadingId}
          onSelectHeading={handleNavigateToHeading}
        />

        {/* Command Palette Modal (Ctrl+K) */}
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          documents={allDocuments}
          onSelectDoc={setActiveDocId}
          onCreateDoc={() => createDocument()}
          onViewModeChange={setViewMode}
          onToggleZenMode={toggleZenMode}
          onExport={handleExport}
          onInsertSnippet={(snippet) => handleInsert(snippet)}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        {/* Settings Modal */}
        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          settings={settings}
          onUpdateSettings={(newSettings) =>
            setSettings((prev) => ({ ...prev, ...newSettings }))
          }
        />

        {/* Shortcuts Modal */}
        <ShortcutsModal
          isOpen={isShortcutsOpen}
          onClose={() => setIsShortcutsOpen(false)}
        />
      </div>
    </div>
  );
}
