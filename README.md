# Awesome repositories

A personal collection of GitHub repositories I like, grouped by type, each with an optional note.
Browse and search it at **https://romainbourdain.github.io/awesome-repositories/**: click a repository to read its README.

## Data

One Markdown file per repository in `data/<category>/<owner>__<repo>.md`. The frontmatter is the metadata, the body is my own notes (Markdown, optional).

```md
---
repo: owner/repo
category: "Skills"
description: "One sentence on what it does."
language: TypeScript
tags: [agents, memory]
added: 2026-11-24
---

Why I like it, what to remember.
```

Only `repo` is required. `category` groups repositories in the site's filter; a new value creates a new category.
At build time, stars, topics and the README are fetched from GitHub, so they are never stored here.

## Development

```sh
cd app
pnpm install
pnpm data      # fetch READMEs and metadata into app/public/data (uses `gh auth token` or GITHUB_TOKEN)
pnpm dev
pnpm check && pnpm test run && pnpm build
```

## Deployment

`.github/workflows/pages.yml` builds and deploys to GitHub Pages on every push to `main` that touches `app/` or `data/`, and every Monday to refresh READMEs and star counts.
In the repository settings, **Pages → Source** must be set to **GitHub Actions**.
