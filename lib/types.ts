export interface Document {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
  isStarred?: boolean;
  tags?: string[];
}

export type TemplateCategory = "general" | "engineering" | "writing" | "productivity" | "academic";

export interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  badge?: string;
  iconName: string;
  content: string;
}

export type ViewMode = "split" | "editor" | "preview";

export type ThemeMode = "dark" | "light" | "system";

export interface EditorSettings {
  fontSize: 12 | 13 | 14 | 15 | 16 | 18;
  fontFamily: "mono" | "sans" | "serif";
  lineNumbers: boolean;
  wordWrap: boolean;
  tabSize: 2 | 4;
  syncScroll: boolean;
  theme: ThemeMode;
  autoSave: boolean;
}

export type ExportFormat = "html" | "pdf" | "docx" | "md";

export interface DocumentStats {
  words: number;
  chars: number;
  lines: number;
  readingTimeMinutes: number;
}

export interface HeadingItem {
  id: string;
  level: number;
  text: string;
  lineNumber: number;
  charOffset: number;
  children?: HeadingItem[];
}

export interface ToastMessage {
  id: string;
  type: "success" | "info" | "warning" | "error";
  title: string;
  message?: string;
  duration?: number;
}
