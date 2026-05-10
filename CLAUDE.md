# Kilocal — Project Guide

Kilocal is a calorie-tracking mobile app with a Duolingo-style design. This repo is a **light monorepo**: one repo contains both the mobile app and (eventually) the backend, but they are kept structurally independent. The only reason for the monorepo is to give AI agents (Claude Code) full-stack context when implementing features — there is **no shared code, no workspaces tool, no shared `package.json`**.

## Repo layout

```
kilocal-app/
├── app/                  # Expo Router routes (entry point of the mobile app)
│   ├── _layout.tsx
│   ├── onboarding.tsx
│   └── (tabs)/           # Tab navigator: index, calendar, insights, achievements, profile
├── src/                  # Mobile app source (not routes)
│   ├── components/       # Reusable RN components (AppHeader, Card, Mascot, XPBar, ...)
│   ├── screens/          # Screen-level components rendered by routes in app/
│   ├── data/             # Mock data (mock.ts) — replace with API calls when server lands
│   └── theme/            # Colors + ThemeContext
├── assets/               # Fonts, images
├── package.json          # MOBILE deps only (Expo, React Native, expo-router, ...)
├── app.json              # Expo config
├── tsconfig.json
├── eslint.config.js
└── server/               # BACKEND (not implemented yet) — see server/CLAUDE.md
```

## Mobile app (root)

- **Framework:** Expo (~54), Expo Router (file-based routing from `app/`).
- **React Native:** 0.81, React 19.
- **Entry:** `expo-router/entry` (configured in `package.json` `main`).
- **Scripts:** `npm start`, `npm run ios`, `npm run android`, `npm run web`, `npm run lint`.
- **Data:** Currently uses mocks in `src/data/mock.ts`. The backend in `server/` will eventually replace these.
- **Deployment:** Built and uploaded to the App Store / Play Store. **No Docker, no web hosting** for the mobile side.

### Conventions

- Routes go in `app/`. Components rendered by routes go in `src/screens/`. Reusable UI primitives go in `src/components/`.
- Theme tokens (colors, etc.) come from `src/theme/`. Don't hardcode colors in components.
- Mobile `package.json` must stay clean — **never add backend deps here**.

## Backend (`server/`)

See [`server/CLAUDE.md`](./server/CLAUDE.md). Summary:

- Not implemented yet — folder exists as a placeholder.
- Planned: **Hono** on Node.js, shipped via Dockerfile in `server/`.
- Has its **own** `package.json` and `node_modules` when implemented. No workspaces.

## Working on this repo

- **Mobile-only change?** Touch root files only (`app/`, `src/`, root `package.json`). Don't touch `server/`.
- **Backend-only change?** Work inside `server/` only. Run commands from `server/` (e.g., `cd server && npm install ...`).
- **Cross-stack change?** You're in the right repo — coordinate in one PR, but keep each side's deps in its own `package.json`.
- When adding backend code later, remember to exclude `server/` from Metro's watch list in a new `metro.config.js` at the root, or Metro will try to bundle backend files.

## Current state

- Mobile UI is built (Duolingo-style design, tab navigation, onboarding flow, mocked data).
- Backend not started. Next step is to scaffold Hono + a Dockerfile inside `server/`.
