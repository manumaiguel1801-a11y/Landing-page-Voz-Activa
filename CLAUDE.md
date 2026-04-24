# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Dev server on port 3000 (LAN-accessible via 0.0.0.0)
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # Type-check only (tsc --noEmit) — no ESLint configured
npm run clean     # Remove dist/
```

No test suite is configured.

## Architecture

Single-page React 19 + TypeScript landing page for **Voz-Activa**, a voice-based financial management app for informal traders in Colombia. Built with Vite 6 and Tailwind CSS 4.

### Key files

- **`src/App.tsx`** — The entire landing page (~850 lines). All sections live here: Navbar, Hero, Problem, Features carousel (6 items, 2 pages), Financial Passport spotlight, Trust, CEO profiles, CTA, Footer.
- **`src/components/Logo.tsx`** — Logo image component.
- **`src/lib/pdfGenerator.ts`** — Generates a "Financial Passport" PDF via jsPDF with scoring, financial summary, and certification section.
- **`src/index.css`** — Tailwind base + custom utilities and CSS variables for the design system.

### Design system (index.css)

- **Font:** Montserrat (300/400/600/700)
- **Colors:** Gold `#D4A017`, Gold Mid `#F2D06B`, Gold Dark `#B8860B`, Cream `#FDFBF7`, Charcoal `#2D2926`
- **Custom utilities:** `.gold-gradient`, `.gold-text-gradient`, `.glass-card`, `.shadow-gold`

### Animation

Uses `motion/react` (the `motion` package, v12). Animations include scroll-based opacity/scale, staggered entrance delays, hover states, and infinite loops (floating badges, progress bars).

### Environment variables

`.env.example` documents the required vars:
- `GEMINI_API_KEY` — Google Gemini API key
- `APP_URL` — Injected automatically by Google AI Studio

The project was scaffolded for **Google AI Studio**: `vite.config.ts` injects `GEMINI_API_KEY` as a client-side define, disables file watching during agent edits, and disables HMR via `DISABLE_HMR`.

### Path alias

`@/` maps to the repository root (configured in both `vite.config.ts` and `tsconfig.json`).

### Static assets

Images live in `public/` and are referenced with root-relative paths (`/logoapp.png`, `/maileth_vallejo.png`, `/manuela_maiguel.png`, `/mercado.png`).

### External links

CTA buttons point to the live app at `https://voz-activa-snowy.vercel.app/`.
