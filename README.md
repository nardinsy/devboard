# DevBoard — Roadmap & Decisions

## Stack

- Vite + React 19 + TypeScript (strict)
- TanStack Query — server state
- Zustand — client state
- React Hook Form + Zod — forms & validation
- dnd-kit — drag and drop
- Tailwind CSS v4 (Vite plugin)
- Lucide React — icons
- Vitest + RTL + Cypress — testing
- GitHub Actions + Vercel — CI/CD

## Phases

- [x] Phase 1 — Project setup & architecture
- [ ] Phase 2 — Auth & routing
- [ ] Phase 3 — Core features & data fetching
- [ ] Phase 4 — Performance (React Compiler added here)
- [ ] Phase 5 — Testing & quality
- [ ] Phase 6 — Polish, deploy & document

## Decisions

- Repository pattern + TypeScript interfaces for all data access
- Hooks depend on IRepository interfaces, never on implementations directly
- MockRepository used in dev/test, HttpRepository added when real backend exists
- Swap backend = add one file, change one import. Zero component changes.
- Route-level pages live inside their feature folder (features/auth/pages/)
- src/pages/ reserved for app-level pages that span multiple features
