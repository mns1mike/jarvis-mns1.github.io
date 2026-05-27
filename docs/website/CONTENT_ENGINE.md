# Website Content Engine

The website now uses Astro content collections for blog articles. This is the first repo-backed content workflow before any hosted CMS decision.

## Blog Posts

Blog source files live in `src/content/blog/*.md`.

Each post has frontmatter:

- `title`
- `description`
- `category`
- `readingMinutes`
- `order`

The article body is normal Markdown. Use `##` headings for sections.

## Add A Post

Create a draft:

```bash
npm run content:new-blog -- my-new-post "My New Post"
```

Then edit the generated Markdown file and run:

```bash
npm run verify
```

## Guardrails

- Keep GitHub as the source of truth.
- Content changes still go through PR review.
- Do not add a hosted CMS or browser editor without a separate dependency and security review.
