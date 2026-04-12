---
name: setup
description: Configure the blog starter with your domain, name, and socials — then deploy to Cloudflare Workers.
---

# Setup Blog Starter

You are helping a user set up their blog from this template. Follow these steps exactly.

## Step 1: Gather info

Ask the user for:

1. **Domain** (required) — e.g. `myblog.com` or `blog.example.com`
2. **Name** (required) — displayed as author name
3. **Blog title** (optional, defaults to "<Name>'s Blog")
4. **Bio** (optional, one sentence about what they write about)
5. **GitHub username** (optional)
6. **Twitter/X handle** (optional)

Confirm the info before proceeding.

## Step 2: Update site.config.ts

Read `site.config.ts` and replace all placeholder values with the user's info:

- `name` → user's name
- `title` → blog title
- `description` → generate from bio or keep default
- `url` → `https://<domain>`
- `bio` → user's bio or keep default
- `social.github` → GitHub username (or empty string)
- `social.twitter` → Twitter handle (or empty string)

## Step 3: Update wrangler.toml

Read `wrangler.toml` and update:

- `name` → slugified domain (e.g. `myblog-com`)
- Uncomment and set `routes`:
  ```toml
  routes = [
    { pattern = "<domain>/*", zone_name = "<root-domain>" }
  ]
  ```
  Note: `zone_name` is always the root domain (e.g. for `blog.example.com` the zone is `example.com`).

## Step 4: Check Cloudflare auth

Run `npx wrangler whoami` to check if the user is logged in.

If not authenticated, run `npx wrangler login` and wait for the user to complete the browser auth flow.

## Step 5: Check DNS

Tell the user they need a **proxied A record** in Cloudflare DNS for their domain:
- **Type:** A
- **Name:** `@` (or subdomain)
- **Content:** `192.0.2.1`
- **Proxy:** ON (orange cloud)

Ask them to confirm it's set up before deploying.

## Step 6: Deploy

Run:
```bash
npm run build && npx wrangler deploy
```

## Step 7: Verify

Tell the user their blog is live at `https://<domain>` and suggest:
- Edit example posts in `content/blog/` or delete them and write their own
- Posts are markdown files with YAML frontmatter (title, date, summary, tags)
- Run `npm run deploy` to publish changes
