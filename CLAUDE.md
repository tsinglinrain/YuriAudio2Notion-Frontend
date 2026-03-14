# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (Vite, default port 5173)
npm run build      # Type-check + production build (output: dist/)
npm run lint       # Run ESLint
npm run lint:fix   # Run ESLint with auto-fix
npm run format     # Format src/ with Prettier
npm run format:check  # Check formatting without writing
npm run preview    # Preview production build locally
```

There are no tests in this project.

## Architecture

This is a **React 19 + TypeScript + Vite + Tailwind CSS v4** single-page application. It serves as a debug/status frontend for the YuriAudio2Notion backend (a Flask service at port 5050).

### Data flow

```
Backend (Flask :5050)
  ├── GET /health          → HealthStatus component (polls every 30s)
  └── GET /logs/stream     → useLogStream hook (SSE, auto-reconnect 3s)
```

In **development**, Vite proxies `/health` and `/logs` to `http://localhost:5050` (see `vite.config.ts`).

In **production**, the app is containerized via Docker (multi-stage build: Node build → nginx:alpine serve on port 80). Nginx then proxies webhook routes to the Flask backend at port 5050. See `nginx.example.conf` for the full production Nginx setup.

### Source structure

- `src/api/index.ts` — all fetch calls and SSE URL helpers; `API_BASE_URL` is empty string in both dev and prod (proxy handles routing)
- `src/types/index.ts` — shared TypeScript types (`HealthResponse`, `LogEntry`, `ConnectionStatus`)
- `src/hooks/useLogStream.ts` — SSE connection management hook; caps logs at 500 entries, auto-reconnects on error
- `src/components/DebugPanel.tsx` — composes `HealthStatus` + `LogViewer`, owns the `useLogStream` instance
- `src/components/HealthStatus.tsx` — fetches `/health`, auto-refreshes every 30s
- `src/components/LogViewer.tsx` — terminal-style log display with connect/disconnect/clear controls
- `src/components/index.ts` — barrel export for components
- `src/App.tsx` — landing page with collapsible debug panel (`<details>` element with custom scroll-lock animation)

### Styling

Tailwind CSS v4 is integrated via `@tailwindcss/vite` plugin (not PostCSS). No `tailwind.config.js` exists — configuration is done in CSS if needed.
