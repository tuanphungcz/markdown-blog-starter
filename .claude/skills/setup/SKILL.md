---
name: setup
description: Check prerequisites, configure the blog starter, and deploy to Cloudflare Workers.
---

# Setup Blog Starter

You are helping a user set up their blog from this template. Some users may be non-technical. Be patient, explain clearly, and guide them through each step. Do NOT skip the prerequisites check.

## Step 1: Check prerequisites

Run these checks silently and report what's missing:

```bash
node --version
npm --version
npx wrangler --version
```

If **Node.js** is missing, stop and tell the user:
> You need Node.js installed. Go to https://nodejs.org — download the LTS version, run the installer, then restart your terminal and run `/setup` again.

If **npm** works but `wrangler` fails, that's OK — it's in devDependencies and will work after `npm install`.

Check if `node_modules` exists. If not, run `npm install` automatically.

After install, verify wrangler works: `npx wrangler --version`

## Step 2: Check Cloudflare account

Run `npx wrangler whoami` to check authentication.

**If not logged in**, ask the user:

> Do you have a Cloudflare account?

- **If NO**: Tell them:
  > 1. Go to https://dash.cloudflare.com/sign-up
  > 2. Create a free account (email + password)
  > 3. Tell me when you're done

  Then run `npx wrangler login` — this opens a browser where they click "Allow".

- **If YES but not authenticated**: Run `npx wrangler login` and wait for them to complete the browser auth flow.

- **If already authenticated**: Continue.

Verify auth succeeded with `npx wrangler whoami` — confirm the account name.

## Step 3: Check domain

Ask the user:

> What domain do you want your blog on? (e.g. `myblog.com` or `blog.example.com`)

Then check if the domain's zone exists in their Cloudflare account:

```bash
npx wrangler zones list
```

- **If the root domain is listed**: Great, continue.
- **If NOT listed**: Tell them:
  > Your domain `<domain>` is not in your Cloudflare account yet. You need to add it:
  > 1. Go to https://dash.cloudflare.com → **Add a site**
  > 2. Enter your root domain (e.g. `example.com`)
  > 3. Select the **Free** plan
  > 4. Cloudflare will give you 2 nameservers — go to where you bought your domain and change the nameservers to these
  > 5. Wait for Cloudflare to confirm the domain is active (usually a few minutes, can take up to 24h)
  > 6. Tell me when it's done

  After they confirm, re-check with `npx wrangler zones list`.

## Step 4: Gather blog info

Ask the user for:

1. **Name** (required) — displayed as author name
2. **Blog title** (optional, defaults to "<Name>'s Blog")
3. **Bio** (optional, one sentence about what they write about)
4. **GitHub username** (optional)
5. **Twitter/X handle** (optional)

Confirm the info before proceeding.

## Step 5: Update config files

### site.config.ts

Read `site.config.ts` and replace all placeholder values:

- `name` → user's name
- `title` → blog title
- `description` → generate a short description from their bio, or keep default
- `url` → `https://<domain>`
- `bio` → user's bio or keep default
- `social.github` → GitHub username (or empty string if not provided)
- `social.twitter` → Twitter handle (or empty string if not provided)

### wrangler.toml

Read `wrangler.toml` and update:

- `name` → slugified domain (e.g. `myblog-com`)
- Set `routes`:
  ```toml
  routes = [
    { pattern = "<domain>/*", zone_name = "<root-domain>" }
  ]
  ```
  Note: `zone_name` is always the root domain (e.g. for `blog.example.com` the zone is `example.com`).

## Step 6: DNS setup

Check if a DNS record exists for the domain. Tell the user:

> I need you to add a DNS record in Cloudflare so your domain points to the blog:
> 1. Go to https://dash.cloudflare.com → select your domain → **DNS** → **Records**
> 2. Click **Add record**
> 3. Set: **Type** = `A`, **Name** = `@` (or subdomain like `blog`), **Content** = `192.0.2.1`, **Proxy** = ON (orange cloud)
> 4. Click **Save**
> 5. Tell me when it's done

If the domain is a subdomain (e.g. `blog.example.com`), the Name should be `blog` not `@`.

## Step 7: Deploy

Run:
```bash
npm run build && npx wrangler deploy
```

If the deploy fails due to authentication or permissions, diagnose and help the user fix it.

## Step 8: Verify and next steps

Tell the user their blog is live at `https://<domain>` (note: DNS may take a few minutes to propagate).

Then explain:
- Example posts are in `content/blog/` — edit or delete them and write your own
- Posts are markdown files with YAML frontmatter:
  ```yaml
  ---
  title: "My First Post"
  date: "2026-01-15"
  summary: "A short description"
  tags: ["intro"]
  ---
  Your content here...
  ```
- To publish changes: `npm run deploy`
- RSS feed is at `/feed.xml`, sitemap at `/sitemap.xml`
