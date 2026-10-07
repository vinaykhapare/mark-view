export function downloadFile(filename: string, content: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportToMarkdown(title: string, markdown: string) {
  const cleanTitle = (title.trim() || "document").replace(/[^a-z0-9_-]/gi, "_").toLowerCase();
  downloadFile(`${cleanTitle}.md`, markdown, "text/markdown;charset=utf-8");
}

export function exportToStandaloneHtml(title: string, renderedHtml: string) {
  const cleanTitle = title.trim() || "MarkView Document";
  const safeFilename = cleanTitle.replace(/[^a-z0-9_-]/gi, "_").toLowerCase();

  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${cleanTitle} — MarkView</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css">
  <style>
    :root {
      --bg: #090d16;
      --card-bg: #0f172a;
      --border: #1e293b;
      --text: #e2e8f0;
      --text-muted: #94a3b8;
      --accent: #6366f1;
      --code-bg: #0d1117;
      --quote-bg: #161e2e;
    }
    @media (prefers-color-scheme: light) {
      :root {
        --bg: #ffffff;
        --card-bg: #f8fafc;
        --border: #e2e8f0;
        --text: #0f172a;
        --text-muted: #64748b;
        --accent: #4f46e5;
        --code-bg: #f1f5f9;
        --quote-bg: #f8fafc;
      }
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.7;
      padding: 40px 20px;
    }
    .container {
      max-width: 860px;
      margin: 0 auto;
      background: var(--card-bg);
      padding: 48px;
      border-radius: 12px;
      border: 1px solid var(--border);
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
    }
    h1, h2, h3, h4, h5, h6 {
      color: var(--text);
      margin-top: 1.8em;
      margin-bottom: 0.6em;
      font-weight: 700;
      line-height: 1.3;
    }
    h1 { font-size: 2.25rem; border-bottom: 1px solid var(--border); padding-bottom: 0.4em; }
    h2 { font-size: 1.6rem; border-bottom: 1px solid var(--border); padding-bottom: 0.3em; }
    h3 { font-size: 1.25rem; }
    p { margin-bottom: 1.2em; font-size: 1.05rem; }
    a { color: var(--accent); text-decoration: underline; text-underline-offset: 4px; }
    strong { font-weight: 600; }
    code {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 0.9em;
      background: var(--code-bg);
      padding: 0.2em 0.4em;
      border-radius: 4px;
      border: 1px solid var(--border);
    }
    pre {
      background: var(--code-bg);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 16px;
      overflow-x: auto;
      margin-bottom: 1.5em;
    }
    pre code { background: none; border: none; padding: 0; }
    blockquote {
      border-left: 4px solid var(--accent);
      background: var(--quote-bg);
      padding: 12px 20px;
      margin-bottom: 1.5em;
      border-radius: 0 8px 8px 0;
      color: var(--text-muted);
      font-style: italic;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 1.5em;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid var(--border);
    }
    th, td {
      padding: 10px 16px;
      border: 1px solid var(--border);
      text-align: left;
    }
    th { background: var(--border); font-weight: 600; }
    ul, ol { margin-left: 1.8em; margin-bottom: 1.2em; }
    li { margin-bottom: 0.4em; }
    hr { border: none; border-top: 1px solid var(--border); margin: 2em 0; }
    img { max-width: 100%; border-radius: 8px; margin-bottom: 1.2em; }
    .markview-badge {
      display: inline-block;
      margin-top: 32px;
      padding: 6px 12px;
      font-size: 12px;
      color: var(--text-muted);
      border-top: 1px solid var(--border);
      width: 100%;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    ${renderedHtml}
    <div class="markview-badge">
      Document generated with <strong>MarkView</strong> — Modern Markdown Studio
    </div>
  </div>
</body>
</html>`;

  downloadFile(`${safeFilename}.html`, fullHtml, "text/html;charset=utf-8");
}

export function exportToWordDoc(title: string, renderedHtml: string) {
  const cleanTitle = title.trim() || "MarkView Document";
  const safeFilename = cleanTitle.replace(/[^a-z0-9_-]/gi, "_").toLowerCase();

  const docHtml = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset="utf-8">
  <title>${cleanTitle}</title>
  <style>
    body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; line-height: 1.5; color: #111827; }
    h1 { font-size: 20pt; color: #1e3a8a; margin-top: 18pt; margin-bottom: 8pt; }
    h2 { font-size: 15pt; color: #1e40af; margin-top: 14pt; margin-bottom: 6pt; }
    h3 { font-size: 12pt; color: #3b82f6; margin-top: 10pt; margin-bottom: 4pt; }
    p { margin-bottom: 8pt; }
    table { border-collapse: collapse; width: 100%; margin-bottom: 12pt; }
    th, td { border: 1px solid #d1d5db; padding: 6pt 10pt; }
    th { background-color: #f3f4f6; font-weight: bold; }
    blockquote { border-left: 3pt solid #3b82f6; padding-left: 10pt; color: #4b5563; font-style: italic; }
    pre { background: #f3f4f6; border: 1px solid #e5e7eb; padding: 8pt; font-family: Consolas, monospace; }
    code { font-family: Consolas, monospace; background: #f3f4f6; }
  </style>
</head>
<body>
  <h1>${cleanTitle}</h1>
  ${renderedHtml}
</body>
</html>`;

  downloadFile(`${safeFilename}.doc`, docHtml, "application/msword;charset=utf-8");
}

export function printDocument() {
  if (typeof window !== "undefined") {
    window.print();
  }
}

export async function exportToPdf(
  title?: string,
  element?: HTMLElement | null,
  fallbackMarkdown?: string
): Promise<boolean> {
  printDocument();
  return true;
}


