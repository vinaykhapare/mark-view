"use client";

import React, { useState } from "react";

export interface TooltipProps {
  content: string;
  shortcut?: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}

export function Tooltip({
  content,
  shortcut,
  children,
  position = "bottom",
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positionStyles = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  }[position];

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          role="tooltip"
          className={`absolute ${positionStyles} z-50 pointer-events-none flex items-center gap-1.5 whitespace-nowrap rounded-md bg-slate-900/95 dark:bg-slate-800/95 text-slate-100 px-2 py-1 text-[11px] font-medium shadow-lg border border-slate-700/50 backdrop-blur-md animate-in fade-in zoom-in-95 duration-100`}
        >
          <span>{content}</span>
          {shortcut && (
            <span className="bg-slate-700/60 text-slate-300 px-1 py-0.2 rounded font-mono text-[9px] border border-slate-600/40">
              {shortcut}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
