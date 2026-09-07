# shch-space agent guide

## Scope

This repository owns the static `shch.one` portfolio, project archive, notebook,
and shop placeholder. The site runs on Astro and is published separately to S3.

Do not infer that a successful local build is deployed. Do not run `pnpm deploy`,
write to S3, commit, or push without explicit owner authorization.

## Architecture

- Framework: Astro 7, static output in `dist/`.
- Content: Markdown or MDX loaded from the directory named by
  `OBSIDIAN_VAULT_PATH`, with committed `content/` as the CI fallback.
- Content contract: `src/content.config.ts`.
- Routes: `src/pages/`.
- Shared shell and metadata: `src/layouts/BaseLayout.astro`.
- Shared components: `src/components/*.astro`.
- Visual system: `src/styles/global.css` and `docs/design-system.md`.
- Public assets: `static/` (`publicDir` is configured explicitly).
- Package manager: pnpm.

The site has no React runtime. Prefer Astro components and native browser scripts.
For future Three.js or other heavy interactive work, isolate each experience in
its own component and load it only on the page that needs it. Add a UI framework
integration only when the interaction requires one.

## Content and URLs

Current Russian URLs are stable and must be preserved:

- `/`
- `/notes/`
- `/notes/<slug>/`
- `/projects/<slug>/`
- `/shop/`

Project `aliases` generate additional static pages with a canonical URL pointing
to the primary slug. Published content is selected by `status: published`.

The collection schema already accepts `locale: ru|en` and `translationKey`.
Russian is the default locale and keeps unprefixed URLs. Do not publish a
machine-generated translation or invent missing English copy. Add localized route
templates together with the first owner-approved English content.

Images referenced next to Markdown files are processed by Astro. Keep covers and
body media relative to the content entry so Obsidian preview and site builds agree.

## Commands

```bash
pnpm install
pnpm dev
pnpm check
pnpm build
pnpm preview
```

Before handing off a change, run `pnpm check`, `pnpm build`, `git diff --check`,
and verify that expected static routes exist in `dist/`. For dependency changes,
also run `pnpm audit` when the registry endpoint is available.

## Release and rollback

`pnpm release:prepare` synchronizes the local Obsidian vault into `content/`,
checks the project, and builds `dist/`. GitHub Pages deploys only after a manual
workflow run or a `master` commit containing `[deploy]`. Treat either trigger as
a production mutation requiring explicit approval and an independent public
read-back.

The pre-Astro implementation remains recoverable from Git history. Do not restore
individual legacy files into the Astro tree; revert the migration as one coherent
change if rollback is required.
