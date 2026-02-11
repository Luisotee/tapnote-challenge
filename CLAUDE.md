# TapNote Challenge

Frontend mockup for TapNote (tapnote.app) technical challenge. Next.js 16 + React 19 + shadcn/ui + Tailwind CSS v4.

## Commands

- **Dev server:** User runs `pnpm dev` themselves — do NOT run it
- **Build:** User runs `pnpm build` themselves — do NOT run it
- **Lint:** `pnpm lint`
- **Add shadcn component:** `pnpm dlx shadcn@latest add <component>`

## Key Rules

- NEVER run `pnpm dev` or `pnpm build` — the user manages these
- NEVER modify package.json directly — use `pnpm add <pkg>` for new deps
- Always use `"use client"` directive — this is a client-rendered app
- Prefer editing existing files over creating new ones

## Gotchas

- **react-pdf SSR:** react-pdf uses DOMMatrix which breaks SSR. Always lazy-load via `useEffect` + `next/dynamic` with `ssr: false`. See `pdf-viewer.tsx` for the pattern.
- **Sonner toasts:** Use `import { Toaster } from "sonner"` directly with `theme="dark"`, NOT the shadcn sonner wrapper (which requires next-themes).
- **Dark mode:** The app is always dark (`<html className="dark">`). No theme toggle exists.

## Architecture

- `src/components/layout/` — Sidebar, top bar, workspace layout
- `src/components/workspace/` — Source panel, note panel, chat panel, PDF viewer
- `src/components/ui/` — shadcn/ui primitives (do not edit manually)
- `src/lib/mock-data.ts` — All mock data (notes, folders, chat responses)
- `src/lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)
- `mockup/` — Figma screenshots to match (reference for visual fidelity)

## Style

- shadcn "new-york" style, lucide icons
- Primary: #7C3AED (purple), Background: #07040F, Card: #110D1B
- Path alias: `@/*` → `./src/*`
- Use `cn()` from `@/lib/utils` for conditional classes
