# Copilot Instructions

## Architecture
- Use React + TypeScript with a component-based structure.
- Keep UI screens in `src/screens` and reusable pieces in `src/components`.
- Keep business logic and formatters in `src/utils`.
- Keep shared types in `src/types`.
- Co-locate screen/component files in a dedicated folder per unit:
	- `src/screens/ScreenName/ScreenName.tsx`
	- `src/screens/ScreenName/ScreenName.module.css`
	- `src/components/ComponentName/ComponentName.tsx`
	- `src/components/ComponentName/ComponentName.module.css`
- Keep root-level app files (`src/App.tsx`, `src/main.tsx`, `src/index.css`) at `src/` level.

## Component Rules
- Split large UI into small, focused components.
- Prefer composition over large monolithic components.
- Keep each component responsible for one clear concern.
- Reuse existing components before creating new ones.

## Code Style
- Use strict TypeScript types; avoid `any` unless justified.
- Prefer pure functions for calculations and formatting.
- Keep naming explicit and consistent.
- Avoid duplicated logic; extract helpers when needed.

## Data & State
- Load test/mock data from JSON files when possible.
- Keep state local unless it must be shared.
- Derive computed values from source state instead of storing duplicates.

## UI & UX
- Mobile-first layout by default for this project.
- Match existing visual style and spacing patterns.
- Preserve accessibility basics: semantic HTML, labels, and keyboard support.

## Delivery Checklist
- Build passes: `npm run build`
- Lint passes: `npm run lint`
- Keep README updated with short project description and run steps.
