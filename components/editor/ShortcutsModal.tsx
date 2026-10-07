"use client";

import React from "react";
import { Modal } from "../ui/Modal";

export interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShortcutsModal({ isOpen, onClose }: ShortcutsModalProps) {
  const shortcutGroups = [
    {
      category: "General & Navigation",
      shortcuts: [
        { label: "Open Command Palette", key: "Ctrl + K" },
        { label: "Toggle Sidebar", key: "Ctrl + \\" },
        { label: "Toggle Zen Writing Mode", key: "Ctrl + Shift + F" },
        { label: "Cycle View (Split / Editor / Preview)", key: "Ctrl + Shift + P" },
        { label: "Show Keyboard Shortcuts", key: "?" },
      ],
    },
    {
      category: "Editor Formatting",
      shortcuts: [
        { label: "Bold", key: "Ctrl + B" },
        { label: "Italic", key: "Ctrl + I" },
        { label: "Strikethrough", key: "Ctrl + Shift + X" },
        { label: "Inline Code", key: "Ctrl + E" },
        { label: "Code Block", key: "Ctrl + Shift + C" },
        { label: "Insert Link", key: "Ctrl + K (selection)" },
        { label: "Indent / Tab", key: "Tab" },
      ],
    },
    {
      category: "Documents & Publishing",
      shortcuts: [
        { label: "Save / Download Markdown", key: "Ctrl + S" },
        { label: "Print / Export PDF", key: "Ctrl + P" },
        { label: "New Document", key: "Alt + N" },
      ],
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Keyboard Shortcuts"
      description="Accelerate your workflow with quick keyboard actions"
      maxWidth="lg"
    >
      <div className="space-y-5 py-2">
        {shortcutGroups.map((group) => (
          <div key={group.category}>
            <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2.5">
              {group.category}
            </h4>
            <div className="space-y-1.5">
              {group.shortcuts.map((sc) => (
                <div
                  key={sc.label}
                  className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors text-xs"
                >
                  <span className="text-[var(--text-secondary)]">{sc.label}</span>
                  <kbd className="font-mono text-[11px] text-[var(--text-primary)] bg-[var(--bg-tertiary)] px-2 py-0.5 rounded border border-[var(--border-subtle)] shadow-xs">
                    {sc.key}
                  </kbd>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}
