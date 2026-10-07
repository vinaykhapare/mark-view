export const DEFAULT_MARKDOWN = `# Welcome to MarkView ✦

> *Write Markdown on the left — see the live preview on the right.*

---

## Text Formatting

You can write **bold text**, *italic text*, or ***bold and italic*** together.
Use ~~strikethrough~~ for deleted content, and \`inline code\` for technical terms.

---

## Headings

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5

---

## Lists

### Unordered List
- Apples
- Bananas
  - Plantains
  - Cavendish
- Mangoes

### Ordered List
1. Install Node.js
2. Create a Next.js app
3. Start building!

### Task List
- [x] Write the editor component
- [x] Add live preview
- [ ] Deploy to production

---

## Links & Images

Visit [Next.js Documentation](https://nextjs.org/docs) to learn more.

![Demo Banner](https://placehold.co/600x160/0d1117/58a6ff?text=MarkView+Preview)

---

## Code Blocks

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}! Welcome to MarkView.\`;
}
console.log(greet("Developer"));
\`\`\`

\`\`\`python
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

print(list(fibonacci(10)))
\`\`\`

---

## Tables

| Feature        | Supported | Notes                  |
|----------------|-----------|------------------------|
| Headings       | ✅        | H1 through H6          |
| Bold / Italic  | ✅        | Full inline formatting |
| Code Blocks    | ✅        | Language label shown   |
| Tables         | ✅        | GFM style              |
| Task Lists     | ✅        | Checkbox support       |
| Images         | ✅        | With captions          |

---

## Blockquotes

> "The best way to predict the future is to invent it."
> — Alan Kay

> **Nested quotes:**
> > This is a nested blockquote.

---

Happy writing! ✦
`;
