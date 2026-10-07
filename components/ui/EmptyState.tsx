import React from "react";
import { FileText, Plus } from "lucide-react";
import { Button } from "./button";

export interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export function EmptyState({
  title = "No documents found",
  description = "Get started by creating your first markdown document or exploring a template.",
  actionLabel = "New Document",
  onAction,
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center border border-dashed border-[var(--border-medium)] rounded-2xl bg-[var(--bg-secondary)]/50">
      <div className="w-12 h-12 rounded-2xl bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--accent-primary)] mb-3 shadow-inner">
        {icon || <FileText className="w-6 h-6" />}
      </div>
      <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1">
        {title}
      </h4>
      <p className="text-xs text-[var(--text-muted)] max-w-sm mb-4 leading-relaxed">
        {description}
      </p>
      {onAction && (
        <Button size="sm" variant="primary" onClick={onAction} leftIcon={<Plus className="w-3.5 h-3.5" />}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
