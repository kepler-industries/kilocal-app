# server/

This is the **backend** path of the Kilocal monorepo. The mobile app lives at the repo root (Expo / React Native). This folder will hold the API server consumed by the app.

## Status

**Not implemented yet.** This folder is currently empty (only `.gitkeep` and this file). No code, no `package.json`, no dependencies.

## Planned stack

When the backend is started, use:

- **Runtime:** Node.js
- **Framework:** [Hono](https://hono.dev) — chosen because it's tiny (~14 kB), Web-Standards based, TypeScript-first, and the simplest option for a small REST API. Runs on plain Node via `@hono/node-server`.
- **Deployment:** Dockerfile in this folder. The mobile app is not deployed here; it's built and shipped to the app stores separately.

## Conventions when implementing

- This folder has its **own `package.json`** and **own `node_modules`** — do not hoist deps to the repo root, and do not add `pnpm`/`bun` workspaces unless asked. The repo intentionally keeps the two sides independent.
- Backend deps must never leak into the mobile `package.json` at the repo root.
- When backend code is added, the root `metro.config.js` (or `app.json`) must exclude `server/` from Metro's `watchFolders` / `blockList` so the bundler ignores it.
- Keep the structure flat and light. No premature abstractions, no DDD layering — this is a small API.

## What does NOT belong here

- Mobile / React Native code (lives at repo root: `app/`, `src/`).
- Shared types between app and server. The user has explicitly said cross-stack type sharing is **not** a goal of this monorepo — the reason for one repo is purely so AI agents (Claude Code) can reason about both sides at once.
