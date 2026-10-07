"use client";

import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { useTheme } from "../ThemeProvider";

interface MermaidRendererProps {
  chart: string;
}

export function MermaidRenderer({ chart }: MermaidRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    let isMounted = true;

    async function renderChart() {
      try {
        setError(null);
        mermaid.initialize({
          startOnLoad: false,
          theme: resolvedTheme === "dark" ? "dark" : "default",
          securityLevel: "loose",
          fontFamily: "var(--font-sans)",
        });

        const uniqueId = `mermaid-${Math.random().toString(36).substring(2, 9)}`;
        const { svg } = await mermaid.render(uniqueId, chart);

        if (isMounted) {
          setSvgContent(svg);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err?.message || "Failed to render Mermaid diagram");
        }
      }
    }

    if (chart.trim()) {
      renderChart();
    }

    return () => {
      isMounted = false;
    };
  }, [chart, resolvedTheme]);

  if (error) {
    return (
      <div className="my-4 p-3 rounded-lg border border-red-500/30 bg-red-500/10 text-xs text-red-400 font-mono">
        <p className="font-semibold mb-1">Diagram Syntax Error:</p>
        <pre className="overflow-x-auto whitespace-pre-wrap">{chart}</pre>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="my-5 p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-tertiary)] flex justify-center overflow-x-auto shadow-sm"
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}
