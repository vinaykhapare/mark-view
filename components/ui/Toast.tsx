"use client";

import React from "react";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";
import { useToastNotifications } from "@/lib/useToast";

export function ToastContainer() {
  const { toasts, dismiss } = useToastNotifications();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none no-print toast-container">
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />,
          error: <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />,
          warning: <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />,
          info: <Info className="w-4 h-4 text-indigo-500 shrink-0" />,
        }[toast.type];

        const borderColors = {
          success: "border-emerald-500/30",
          error: "border-red-500/30",
          warning: "border-amber-500/30",
          info: "border-indigo-500/30",
        }[toast.type];

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl bg-[var(--bg-elevated)] border ${borderColors} shadow-xl backdrop-blur-md animate-in slide-in-from-bottom-3 duration-200`}
          >
            <div className="mt-0.5">{icons}</div>
            <div className="flex-1 min-w-0">
              <h5 className="text-xs font-semibold text-[var(--text-primary)]">
                {toast.title}
              </h5>
              {toast.message && (
                <p className="text-[11px] text-[var(--text-muted)] mt-0.5 leading-relaxed">
                  {toast.message}
                </p>
              )}
            </div>
            <button
              onClick={() => dismiss(toast.id)}
              className="text-[var(--text-muted)] hover:text-[var(--text-primary)] p-0.5 rounded transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
