# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Angular 19 frontend for a "Latin Word of the Day" app. Displays daily Latin words with definitions, pronunciation, etymology, examples, synonyms/antonyms, and images. Features include random word generation with a timer, favorites (persisted to localStorage), text-to-speech, and keyboard shortcuts.

The backend lives in a sibling directory (`latinWordOfTheDayBe/`) — an Express + PostgreSQL/SQLite server.

## Commands

```bash
npm start          # ng serve (dev server on port 4200)
npm test           # Karma + Jasmine tests (Chrome)
npm run build      # ng build
npm run watch      # ng build --watch (development config)
```

There is no linting setup configured.

## Architecture

**Angular 19** with a hybrid module/standalone approach:
- Root app uses `@NgModule` (`app.module.ts` + `app-routing.module.ts`)
- All page and shared components are **standalone**
- Uses Angular 19 control flow syntax (`@if`, `@let`, `@for`)
- Uses `inject()` function for dependency injection in services/effects

**State management — NgRx 19:**
- Single feature store: `wordOfTheDay` (registered in `app.module.ts`)
- State shape: `{ wordOfTheDay: WordOfTheDay[], favorites: WordOfTheDayFavorite[], timerActive: boolean }`
- Effects handle API calls and a timer-based random word loader
- Favorites sync to/from `localStorage`

**Key files:**
- `src/app/store/` — actions, reducer, effects, selectors, state interface
- `src/app/services/word-of-the-day.service.ts` — HTTP client (3 endpoints)
- `src/app/components/scroll/` — shared word display component (used by home + random pages)
- `src/app/models/word-of-the-day.model.ts` — `WordOfTheDay` and `WordOfTheDayFavorite` interfaces

**API endpoints** (relative to `environment.apiUrl`):
- `GET /items/daily` — today's word
- `GET /items/:id` — word by ID
- `GET /items/random` — random word

**Environment config:**
- Dev (`environment.development.ts`): `apiUrl: 'http://localhost:3000'`
- Prod (`environment.ts`): `apiUrl: ''` (relative — proxied by Apache)

## Routing

Routes use Latin names (defined in `ROUTES_NAMES` enum in `app-routing.module.ts`):

| Route | Latin Name | Component |
|---|---|---|
| `/domus` | HOME | HomeComponent |
| `/domus/:id` | HOME (with ID) | HomeComponent |
| `/casuale` | RANDOM | RandomComponent |
| `/favorita` | FAVORITES | FavoritesComponent |
| `/de` | ABOUT | AboutComponent |
| `/cur` | WHY | WhyComponent |
| `/donare` | DONATE | DonateComponent |

## UI Stack

- **PrimeNG 19** (Material theme) + **PrimeFlex 4** for layout utilities
- Global Roman scroll/parchment aesthetic defined in `src/styles.scss`
- Dark mode toggle via `.my-app-dark` CSS class on the app component

## Docker Deployment

Multi-stage Dockerfile: Node 20 Alpine (build) → Apache httpd 2.4 Alpine (serve).
- Apache reverse-proxies `/items/*` to `http://server:3000/items/*`
- `.htaccess` handles SPA routing fallback and blocks WordPress scanner paths
- SSL config expects certs at `/usr/local/apache2/conf/ssl/`
- Build uses `NODE_OPTIONS=--max-old-space-size=256` for low-memory servers
