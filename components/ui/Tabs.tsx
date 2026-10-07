"use client";

import React from "react";

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: number | string;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
  size?: "sm" | "md";
}

export function Tabs({ tabs, activeTab, onChange, className = "", size = "sm" }: TabsProps) {
  return (
    <div
      className={`inline-flex items-center p-1 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`relative flex items-center justify-center gap-1.5 rounded-lg font-medium transition-all duration-150 select-none cursor-pointer ${
              size === "sm" ? "px-2.5 py-1 text-xs" : "px-3.5 py-1.5 text-sm"
            } ${
              isActive
                ? "bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-sm border border-[var(--border-medium)]"
                : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] border-transparent"
            }`}
          >
            {tab.icon && <span className="w-3.5 h-3.5 shrink-0 flex items-center justify-center">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                className={`ml-1 text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                  isActive
                    ? "bg-indigo-500/20 text-indigo-500"
                    : "bg-[var(--border-subtle)] text-[var(--text-muted)]"
                }`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
