"use client";

import React from "react";
import { Modal } from "../ui/Modal";
import { EditorSettings } from "@/lib/types";

export interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: EditorSettings;
  onUpdateSettings: (newSettings: Partial<EditorSettings>) => void;
}

export function SettingsModal({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
}: SettingsModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Editor Preferences"
      description="Configure typography, indentation, and buffer synchronization"
      maxWidth="md"
    >
      <div className="space-y-4 py-2">
        {/* Font Family */}
        <div className="flex items-center justify-between py-2 border-b border-[var(--border-subtle)]">
          <div>
            <label className="text-xs font-medium text-[var(--text-primary)] block">
              Typeface Family
            </label>
            <span className="text-[11px] text-[var(--text-muted)]">
              Choose your preferred editor typeface
            </span>
          </div>
          <select
            value={settings.fontFamily}
            onChange={(e) =>
              onUpdateSettings({ fontFamily: e.target.value as any })
            }
            className="text-xs bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg px-2.5 py-1.5 text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-strong)] cursor-pointer"
          >
            <option value="mono">Geist Mono (Monospace)</option>
            <option value="sans">Geist Sans (Clean Pro)</option>
            <option value="serif">Editorial Serif (Literary)</option>
          </select>
        </div>

        {/* Font Size */}
        <div className="flex items-center justify-between py-2 border-b border-[var(--border-subtle)]">
          <div>
            <label className="text-xs font-medium text-[var(--text-primary)] block">
              Font Scale
            </label>
            <span className="text-[11px] text-[var(--text-muted)]">
              Editor text rendering size
            </span>
          </div>
          <select
            value={settings.fontSize}
            onChange={(e) =>
              onUpdateSettings({ fontSize: Number(e.target.value) as any })
            }
            className="text-xs bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg px-2.5 py-1.5 text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-strong)] cursor-pointer"
          >
            <option value={12}>12px — Compact</option>
            <option value={13}>13px — Default</option>
            <option value={14}>14px — Standard</option>
            <option value={15}>15px — Spacious</option>
            <option value={16}>16px — Large</option>
            <option value={18}>18px — Presentation</option>
          </select>
        </div>

        {/* Tab Size */}
        <div className="flex items-center justify-between py-2 border-b border-[var(--border-subtle)]">
          <div>
            <label className="text-xs font-medium text-[var(--text-primary)] block">
              Tab Indentation
            </label>
            <span className="text-[11px] text-[var(--text-muted)]">
              Spaces inserted when pressing Tab
            </span>
          </div>
          <select
            value={settings.tabSize}
            onChange={(e) =>
              onUpdateSettings({ tabSize: Number(e.target.value) as any })
            }
            className="text-xs bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg px-2.5 py-1.5 text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-strong)] cursor-pointer"
          >
            <option value={2}>2 Spaces (Modern)</option>
            <option value={4}>4 Spaces (Standard)</option>
          </select>
        </div>

        {/* Line Numbers Toggle */}
        <div className="flex items-center justify-between py-2 border-b border-[var(--border-subtle)]">
          <div>
            <label className="text-xs font-medium text-[var(--text-primary)] block">
              Gutter Line Numbers
            </label>
            <span className="text-[11px] text-[var(--text-muted)]">
              Show line counts in editor left margin
            </span>
          </div>
          <input
            type="checkbox"
            checked={settings.lineNumbers}
            onChange={(e) => onUpdateSettings({ lineNumbers: e.target.checked })}
            className="h-4 w-4 rounded border-[var(--border-subtle)] cursor-pointer accent-emerald-500"
          />
        </div>

        {/* Word Wrap Toggle */}
        <div className="flex items-center justify-between py-2 border-b border-[var(--border-subtle)]">
          <div>
            <label className="text-xs font-medium text-[var(--text-primary)] block">
              Soft Word Wrap
            </label>
            <span className="text-[11px] text-[var(--text-muted)]">
              Wrap long lines instead of horizontal scroll
            </span>
          </div>
          <input
            type="checkbox"
            checked={settings.wordWrap}
            onChange={(e) => onUpdateSettings({ wordWrap: e.target.checked })}
            className="h-4 w-4 rounded border-[var(--border-subtle)] cursor-pointer accent-emerald-500"
          />
        </div>

        {/* Sync Scrolling */}
        <div className="flex items-center justify-between py-2 border-b border-[var(--border-subtle)]">
          <div>
            <label className="text-xs font-medium text-[var(--text-primary)] block">
              Bilateral Scroll Sync
            </label>
            <span className="text-[11px] text-[var(--text-muted)]">
              Keep editor and preview scrolling in tandem
            </span>
          </div>
          <input
            type="checkbox"
            checked={settings.syncScroll}
            onChange={(e) => onUpdateSettings({ syncScroll: e.target.checked })}
            className="h-4 w-4 rounded border-[var(--border-subtle)] cursor-pointer accent-emerald-500"
          />
        </div>

        {/* Auto-Save */}
        <div className="flex items-center justify-between py-2">
          <div>
            <label className="text-xs font-medium text-[var(--text-primary)] block">
              Local Browser Auto-Save
            </label>
            <span className="text-[11px] text-[var(--text-muted)]">
              Persist document buffer locally without server roundtrips
            </span>
          </div>
          <input
            type="checkbox"
            checked={settings.autoSave}
            onChange={(e) => onUpdateSettings({ autoSave: e.target.checked })}
            className="h-4 w-4 rounded border-[var(--border-subtle)] cursor-pointer accent-emerald-500"
          />
        </div>
      </div>
    </Modal>
  );
}
