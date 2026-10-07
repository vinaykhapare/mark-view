"use client";

import React, { useRef, useCallback, useEffect } from "react";

interface EditorProps {
  value: string;
  onChange: (v: string) => void;
}

export function Editor({ value, onChange }: EditorProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      const el = ref.current;
      if (!el) return;
      if (e.key === "Tab") {
        e.preventDefault();
        const s = el.selectionStart;
        const newVal = value.substring(0, s) + "  " + value.substring(el.selectionEnd);
        onChange(newVal);
        requestAnimationFrame(() => { el.selectionStart = el.selectionEnd = s + 2; });
      }
    },
    [value, onChange]
  );

  return (
    <textarea
      ref={ref}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
      spellCheck={false}
      placeholder="Start writing Markdown..."
      style={{
        width: "100%",
        height: "100%",
        resize: "none",
        background: "transparent",
        border: "none",
        outline: "none",
        fontFamily: "'Cascadia Code', 'Consolas', 'Fira Code', 'Courier New', monospace",
        fontSize: "13px",
        lineHeight: "1.7",
        color: "#c9d1d9",
        caretColor: "#58a6ff",
        padding: "0",
      }}
    />
  );
}
