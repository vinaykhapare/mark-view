"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DOCUMENT_TEMPLATES } from "@/lib/templates";
import { ArrowRight, Cpu, PenTool, Kanban, Users, FileCode, Compass, Terminal, FileText } from "lucide-react";

export function TemplatesSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Blueprints" },
    { id: "engineering", label: "Engineering & RFCs" },
    { id: "academic", label: "Math & Academic" },
    { id: "productivity", label: "Roadmaps & Notes" },
    { id: "writing", label: "Publishing" },
  ];

  const filtered =
    selectedCategory === "all"
      ? DOCUMENT_TEMPLATES
      : DOCUMENT_TEMPLATES.filter((t) => t.category === selectedCategory);

  const getTemplateIcon = (name: string) => {
    switch (name) {
      case "Cpu":
        return <Cpu className="w-4 h-4 text-emerald-400" />;
      case "PenTool":
        return <PenTool className="w-4 h-4 text-violet-400" />;
      case "Kanban":
        return <Kanban className="w-4 h-4 text-amber-400" />;
      case "Users":
        return <Users className="w-4 h-4 text-blue-400" />;
      case "FileCode":
        return <FileCode className="w-4 h-4 text-sky-400" />;
      case "Compass":
        return <Compass className="w-4 h-4 text-rose-400" />;
      case "Terminal":
        return <Terminal className="w-4 h-4 text-teal-400" />;
      default:
        return <FileText className="w-4 h-4 text-zinc-400" />;
    }
  };

  return (
    <section id="templates" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[var(--border-subtle)]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[11px] font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Curated Document Library
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[var(--text-primary)]">
            Architected for immediate execution.
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-3 leading-relaxed">
            Eliminate blank page paralysis. Select from battle-tested document blueprints pre-configured with KaTeX mathematical formulas, Mermaid state diagrams, and GitHub-flavored tables.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-sm border border-[var(--border-strong)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map((tpl) => (
          <div
            key={tpl.id}
            className="group relative rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-5 flex flex-col justify-between hover:border-[var(--border-strong)] transition-all duration-200"
          >
            <div>
              {/* Header row */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)] flex items-center justify-center">
                  {getTemplateIcon(tpl.iconName)}
                </div>
                {tpl.badge && (
                  <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-secondary)]">
                    {tpl.badge}
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2 group-hover:text-blue-400 transition-colors">
                {tpl.name}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-6 line-clamp-2">
                {tpl.description}
              </p>
            </div>

            {/* Bottom link */}
            <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between">
              <span className="text-[11px] font-mono text-[var(--text-muted)] capitalize">
                {tpl.category}
              </span>
              <Link
                href={`/app?template=${tpl.id}`}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text-primary)] hover:text-blue-400 transition-colors"
              >
                <span>Use Blueprint</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
