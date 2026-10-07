import WorkspaceApp from "@/components/editor/WorkspaceApp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studio — MarkView",
  description: "Distraction-free Markdown Studio with live split preview, KaTeX math, and Mermaid diagrams",
};

export default function StudioPage() {
  return <WorkspaceApp />;
}
