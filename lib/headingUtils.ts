import { HeadingItem } from "./types";

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters and emojis
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with hyphen
    .replace(/-+/g, "-"); // Collapse consecutive hyphens
}

export function extractHeadings(markdown: string): HeadingItem[] {
  if (!markdown) return [];
  const lines = markdown.split("\n");
  const headings: HeadingItem[] = [];
  const slugCounts: Record<string, number> = {};
  let currentOffset = 0;

  lines.forEach((line, index) => {
    const match = line.match(/^(#{1,4})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const rawText = match[2].trim();
      // Remove any markdown formatting inside heading text like **bold** or `code`
      const cleanText = rawText.replace(/[*_`~[\]]/g, "").trim();
      let baseSlug = slugifyHeading(cleanText) || `heading-${index + 1}`;

      // Handle duplicate headings
      if (slugCounts[baseSlug] !== undefined) {
        slugCounts[baseSlug]++;
        baseSlug = `${baseSlug}-${slugCounts[baseSlug]}`;
      } else {
        slugCounts[baseSlug] = 0;
      }

      headings.push({
        id: baseSlug,
        level,
        text: cleanText,
        lineNumber: index,
        charOffset: currentOffset,
      });
    }
    currentOffset += line.length + 1; // +1 for the newline
  });

  return headings;
}

export function buildHeadingTree(headings: HeadingItem[]): HeadingItem[] {
  const root: HeadingItem[] = [];
  const stack: HeadingItem[] = [];

  headings.forEach((heading) => {
    const node: HeadingItem = { ...heading, children: [] };

    while (stack.length > 0 && stack[stack.length - 1].level >= node.level) {
      stack.pop();
    }

    if (stack.length === 0) {
      root.push(node);
    } else {
      const parent = stack[stack.length - 1];
      if (!parent.children) parent.children = [];
      parent.children.push(node);
    }

    stack.push(node);
  });

  return root;
}
