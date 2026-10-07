"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Document, DocumentStats, HeadingItem } from "./types";
import { DOCUMENT_TEMPLATES } from "./templates";
import { triggerToast } from "./useToast";
import { extractHeadings } from "./headingUtils";

const STORAGE_KEY_DOCS = "markview_studio_docs_v2";
const STORAGE_KEY_ACTIVE = "markview_studio_active_id_v2";

const INITIAL_DOCS: Document[] = [
  {
    id: "welcome-guide",
    title: "Welcome to MarkView ✦",
    content: DOCUMENT_TEMPLATES[0].content,
    createdAt: Date.now() - 3600000 * 24,
    updatedAt: Date.now() - 3600000,
    isStarred: true,
    tags: ["guide", "markdown", "popular"],
  },
  {
    id: "tech-rfc",
    title: "RFC-042: Next-Gen Sync Protocol",
    content: DOCUMENT_TEMPLATES[1].content,
    createdAt: Date.now() - 3600000 * 48,
    updatedAt: Date.now() - 3600000 * 12,
    isStarred: true,
    tags: ["engineering", "architecture"],
  },
  {
    id: "blog-post",
    title: "Deterministic State Machines in TS",
    content: DOCUMENT_TEMPLATES[2].content,
    createdAt: Date.now() - 3600000 * 72,
    updatedAt: Date.now() - 3600000 * 3,
    isStarred: false,
    tags: ["typescript", "blog"],
  },
];

export function useDocuments() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [activeDocId, setActiveDocId] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date>(new Date());

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const storedDocs = localStorage.getItem(STORAGE_KEY_DOCS);
      const storedActiveId = localStorage.getItem(STORAGE_KEY_ACTIVE);

      if (storedDocs) {
        const parsed = JSON.parse(storedDocs) as Document[];
        if (parsed.length > 0) {
          setDocuments(parsed);
          const activeExists = parsed.some((d) => d.id === storedActiveId);
          setActiveDocId(activeExists && storedActiveId ? storedActiveId : parsed[0].id);
        } else {
          setDocuments(INITIAL_DOCS);
          setActiveDocId(INITIAL_DOCS[0].id);
        }
      } else {
        setDocuments(INITIAL_DOCS);
        setActiveDocId(INITIAL_DOCS[0].id);
        localStorage.setItem(STORAGE_KEY_DOCS, JSON.stringify(INITIAL_DOCS));
        localStorage.setItem(STORAGE_KEY_ACTIVE, INITIAL_DOCS[0].id);
      }
    } catch {
      setDocuments(INITIAL_DOCS);
      setActiveDocId(INITIAL_DOCS[0].id);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced save to localStorage to eliminate keystroke lag
  const debouncedSave = useCallback((newDocs: Document[], newActiveId?: string) => {
    setIsSaving(true);
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }
    saveTimerRef.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY_DOCS, JSON.stringify(newDocs));
        if (newActiveId !== undefined) {
          localStorage.setItem(STORAGE_KEY_ACTIVE, newActiveId);
        }
        setIsSaving(false);
        setLastSavedAt(new Date());
      } catch (e) {
        console.error("Failed to persist to localStorage", e);
        setIsSaving(false);
      }
    }, 400);
  }, []);

  // Immediate save for critical actions (delete, switch doc, create doc)
  const flushSave = useCallback((newDocs: Document[], newActiveId?: string) => {
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }
    try {
      localStorage.setItem(STORAGE_KEY_DOCS, JSON.stringify(newDocs));
      if (newActiveId !== undefined) {
        localStorage.setItem(STORAGE_KEY_ACTIVE, newActiveId);
      }
      setIsSaving(false);
      setLastSavedAt(new Date());
    } catch (e) {
      console.error("Failed to persist to localStorage", e);
    }
  }, []);

  // Cleanup autosave timer on unmount
  useEffect(() => {
    return () => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }
    };
  }, []);

  // Active document object
  const activeDocument = useMemo(() => {
    return documents.find((doc) => doc.id === activeDocId) || documents[0] || null;
  }, [documents, activeDocId]);

  // Create new document
  const createDocument = useCallback(
    (title = "Untitled Document", content = "# Untitled\n\nStart writing markdown here...", tags: string[] = []) => {
      const id = `doc-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      const newDoc: Document = {
        id,
        title,
        content,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        isStarred: false,
        tags,
      };

      setDocuments((prev) => {
        const updated = [newDoc, ...prev];
        flushSave(updated, id);
        return updated;
      });
      setActiveDocId(id);
      triggerToast("New document created", "success");
      return id;
    },
    [flushSave]
  );

  // Update document content
  const updateActiveContent = useCallback(
    (content: string) => {
      if (!activeDocId) return;

      const firstH1Match = content.match(/^#\s+(.+)$/m);
      const derivedTitle = firstH1Match ? firstH1Match[1].trim() : undefined;

      setDocuments((prev) => {
        const updated = prev.map((doc) => {
          if (doc.id === activeDocId) {
            return {
              ...doc,
              content,
              title: derivedTitle && doc.title.startsWith("Untitled") ? derivedTitle : doc.title,
              updatedAt: Date.now(),
            };
          }
          return doc;
        });
        debouncedSave(updated);
        return updated;
      });
    },
    [activeDocId, debouncedSave]
  );

  const updateDocumentTitle = useCallback(
    (id: string, newTitle: string) => {
      setDocuments((prev) => {
        const updated = prev.map((doc) => (doc.id === id ? { ...doc, title: newTitle, updatedAt: Date.now() } : doc));
        flushSave(updated);
        return updated;
      });
    },
    [flushSave]
  );

  // Toggle starred
  const toggleStar = useCallback(
    (id: string) => {
      setDocuments((prev) => {
        const updated = prev.map((doc) => (doc.id === id ? { ...doc, isStarred: !doc.isStarred } : doc));
        flushSave(updated);
        return updated;
      });
    },
    [flushSave]
  );

  // Duplicate document
  const duplicateDocument = useCallback(
    (id: string) => {
      const target = documents.find((d) => d.id === id);
      if (!target) return;

      const newId = `doc-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      const duplicated: Document = {
        ...target,
        id: newId,
        title: `${target.title} (Copy)`,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      setDocuments((prev) => {
        const updated = [duplicated, ...prev];
        flushSave(updated, newId);
        return updated;
      });
      setActiveDocId(newId);
      triggerToast("Document duplicated", "info");
    },
    [documents, flushSave]
  );

  // Delete document
  const deleteDocument = useCallback(
    (id: string) => {
      if (documents.length <= 1) {
        triggerToast("Cannot delete the only document", "warning");
        return;
      }

      setDocuments((prev) => {
        const filtered = prev.filter((d) => d.id !== id);
        let nextActive = activeDocId;
        if (id === activeDocId) {
          nextActive = filtered[0]?.id || "";
          setActiveDocId(nextActive);
        }
        flushSave(filtered, nextActive);
        return filtered;
      });
      triggerToast("Document removed", "info");
    },
    [documents.length, activeDocId, flushSave]
  );

  // Apply template
  const applyTemplate = useCallback(
    (templateId: string) => {
      const tpl = DOCUMENT_TEMPLATES.find((t) => t.id === templateId);
      if (!tpl) return;

      const id = `doc-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      const newDoc: Document = {
        id,
        title: tpl.name,
        content: tpl.content,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        isStarred: false,
        tags: [tpl.category],
      };

      setDocuments((prev) => {
        const updated = [newDoc, ...prev];
        flushSave(updated, id);
        return updated;
      });
      setActiveDocId(id);
      triggerToast(`Loaded template: ${tpl.name}`, "success");
    },
    [flushSave]
  );

  // Import file
  const handleImportFile = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        if (text !== undefined) {
          const title = file.name.replace(/\.(md|markdown|txt)$/i, "");
          const id = createDocument(title, text, ["imported"]);
          triggerToast(`Imported ${file.name}`, "success");
          setActiveDocId(id);
        }
      };
      reader.readAsText(file);
    },
    [createDocument]
  );

  // Filtered documents
  const filteredDocuments = useMemo(() => {
    if (!searchQuery.trim()) return documents;
    const query = searchQuery.toLowerCase();
    return documents.filter(
      (doc) => doc.title.toLowerCase().includes(query) || doc.content.toLowerCase().includes(query)
    );
  }, [documents, searchQuery]);

  const activeContent = activeDocument?.content || "";

  // Document statistics (memoized on text content)
  const stats: DocumentStats = useMemo(() => {
    if (!activeContent) {
      return { words: 0, chars: 0, lines: 0, readingTimeMinutes: 0 };
    }
    const chars = activeContent.length;
    const words = activeContent.trim() ? activeContent.trim().split(/\s+/).length : 0;
    const lines = activeContent ? activeContent.split("\n").length : 0;
    const readingTimeMinutes = Math.max(1, Math.ceil(words / 200));

    return { words, chars, lines, readingTimeMinutes };
  }, [activeContent]);

  // Extract outline / TOC (memoized on text content)
  const outline: HeadingItem[] = useMemo(() => {
    if (!activeContent) return [];
    return extractHeadings(activeContent);
  }, [activeContent]);

  return {
    documents: filteredDocuments,
    allDocuments: documents,
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
  };
}
