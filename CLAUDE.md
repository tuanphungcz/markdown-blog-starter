# Blog Starter

## Branching strategy

This repo is both a **GitHub template** and a **personal blog**. One repo, two roles.

| Branch | Purpose | Deploy URL | Cloudflare Worker |
|---|---|---|---|
| `main` | Clean template — example posts only | https://markdown-blog-starter.tuanph.com | `markdown-blog-starter` |
| `sites/tuanph-com` | Tuan's personal blog | https://tuanph.com | `tuanph-com` |

### Rules

- **Never merge instance branches back into `main`.** `main` is the template source of truth.
- Merge direction is always `main → sites/*` to pull in template updates.
- Template improvements (layout, components, styles) go on `main`.
- Personal content (blog posts, site config, personal wrangler routes) goes on `sites/tuanph-com`.
- If you discover a useful fix on an instance branch, cherry-pick it to `main` separately.

### Workflow

```bash
# Template change (e.g. sticky navbar):
git checkout main
# ... make changes ...
git commit && npm run build && npx wrangler deploy

# Pull template updates into personal blog:
git checkout sites/tuanph-com
git merge main
npm run build && npx wrangler deploy

# New blog post (personal):
git checkout sites/tuanph-com
# ... add post to content/blog/ ...
git commit && npm run build && npx wrangler deploy
```

## Deploy

Both sites deploy via Cloudflare Workers using `wrangler deploy`. Build first with `npm run build`.

Each branch has its own `wrangler.toml` with the correct worker name and route.

## Site config

Personal site config lives in `site.config.ts` (name, title, url, socials). On `main` it has placeholder values; on `sites/tuanph-com` it has Tuan's info.

## Content

Blog posts are markdown files in `content/blog/` with YAML frontmatter (title, date, summary, tags, draft).
