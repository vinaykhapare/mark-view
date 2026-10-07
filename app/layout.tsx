import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ToastContainer } from "@/components/ui/Toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#090a0f" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "MarkView — The Precision Markdown Studio",
  description:
    "A local-first, distraction-free Markdown studio with instant split preview, native KaTeX mathematics, Mermaid architecture diagramming, and multi-format publication export.",
  keywords: [
    "markdown editor",
    "katex",
    "mermaid",
    "math equations",
    "markdown studio",
    "linear design",
    "raycast command palette",
    "local-first",
    "html export",
    "pdf export",
  ],
  authors: [{ name: "MarkView" }],
  openGraph: {
    title: "MarkView — The Precision Markdown Studio",
    description:
      "A local-first, distraction-free Markdown studio with instant split preview, native KaTeX mathematics, Mermaid architecture diagramming, and multi-format publication export.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans antialiased selection:bg-indigo-500/15 selection:text-indigo-600 dark:selection:text-indigo-400">
        <ThemeProvider>
          {children}
          <ToastContainer />
        </ThemeProvider>
      </body>
    </html>
  );
}
