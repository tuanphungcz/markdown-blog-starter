---
title: "Markdown Features Guide"
date: "2026-01-10"
summary: "A showcase of all the Markdown features supported in this blog starter."
tags: ["guide", "markdown"]
---

## Headings

Use `##` through `######` for heading levels 2–6 (h1 is reserved for the post title).

## Text Formatting

You can write **bold text**, *italic text*, or ***bold and italic***. Use ~~strikethrough~~ for deleted text.

## Links and Images

[External link](https://example.com) and inline `code` work as expected.

## Blockquotes

> "The best way to predict the future is to invent it."
> — Alan Kay

Nested blockquotes:

> First level
>
> > Second level

## Lists

Unordered:

- First item
- Second item
  - Nested item
  - Another nested item
- Third item

Ordered:

1. Step one
2. Step two
3. Step three

## Code Blocks

Inline code: `const x = 42`

Fenced code block:

```typescript
interface Post {
  title: string;
  date: string;
  tags: string[];
}

function greet(name: string): string {
  return `Hello, ${name}!`;
}
```

## Tables

| Feature        | Supported |
| -------------- | --------- |
| Bold           | Yes       |
| Italic         | Yes       |
| Code blocks    | Yes       |
| Tables         | Yes       |
| Task lists     | Yes       |

## Task Lists

- [x] Set up the blog
- [x] Write first post
- [ ] Deploy to Cloudflare
- [ ] Share with the world

## Horizontal Rule

---

That's everything you need to write great blog posts. Delete this file when you're ready!
