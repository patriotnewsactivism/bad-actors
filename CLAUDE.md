# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Bad Actors is a single-page album website built with React, TypeScript, Vite, and shadcn/ui. The site showcases the "Bad Actors" album by Don Matthews, featuring track listings, embedded audio player, track stories, and upcoming albums information. The design uses a distinctive dark theme with red/blue color scheme emphasizing accountability, justice, and truth.

## Development Commands

**Start development server:**
```bash
npm run dev
```
Server runs on `http://[::]:8080` (IPv6 localhost, port 8080)

**Build for production:**
```bash
npm run build
```

**Build in development mode:**
```bash
npm run build:dev
```

**Lint code:**
```bash
npm run lint
```

**Preview production build:**
```bash
npm run preview
```

## Tech Stack

- **Build Tool:** Vite 5.x with SWC for fast React compilation
- **Framework:** React 18.x with TypeScript 5.x
- **Routing:** React Router DOM 6.x
- **UI Framework:** shadcn/ui (Radix UI primitives)
- **Styling:** Tailwind CSS 3.x with custom design system
- **State Management:** TanStack Query (React Query) 5.x
- **Forms:** React Hook Form with Zod validation
- **Icons:** Lucide React

## Architecture

### Project Structure

```
src/
├── components/
│   ├── ui/          # shadcn/ui components (accordion, button, card, etc.)
│   ├── AlbumHero.tsx    # Hero section with album player embed
│   ├── TrackList.tsx    # Track listing display
│   ├── StoriesSection.tsx  # Album/track story narratives
│   ├── UpcomingAlbums.tsx  # Future album announcements
│   └── NavLink.tsx      # Navigation component
├── pages/
│   ├── Index.tsx    # Main landing page (album showcase)
│   └── NotFound.tsx # 404 page
├── hooks/
│   ├── use-toast.ts     # Toast notification hook
│   └── use-mobile.tsx   # Mobile detection hook
├── lib/
│   └── utils.ts     # Utility functions (cn, etc.)
├── App.tsx          # Root app component with routing
├── main.tsx         # Application entry point
└── index.css        # Global styles and design system
```

### Routing Architecture

The app uses React Router with a simple structure:
- `/` - Main album page (Index.tsx)
- `*` - Catch-all 404 route (NotFound.tsx)

**Important:** When adding new routes, add them BEFORE the catch-all `*` route in `App.tsx:19`

### Design System

The project uses a custom design system defined in `src/index.css` with specific theme colors:

**Custom Colors (all HSL):**
- `--police-red`: Primary red accent (0 100% 50%)
- `--justice-blue`: Secondary blue accent (217 100% 40%)
- `--warning-red`: Lighter red variant (0 100% 60%)
- `--reckoning-dark`: Pure black (0 0% 0%)
- `--blood-red`: Dark red (0 85% 35%)
- `--steel-blue`: Dark blue (210 100% 30%)

**Design Philosophy:**
- Dark background theme (nearly black: `--background: 0 0% 3%`)
- Bold, confrontational typography with heavy font weights
- Red/blue gradient accents for emphasis
- Custom animations: `fade-in`, `pulse-red`, `slide-in`
- Accessibility features from Radix UI components

### Component Patterns

**Page Components** (`src/pages/`)
- Single-purpose page components
- Contain data definitions (tracks, stories, albums)
- Compose smaller components to build full page layouts

**Feature Components** (`src/components/`)
- Reusable sections like AlbumHero, TrackList
- Accept props for data and configuration
- Use Lucide React icons
- Apply custom theme colors and animations

**UI Components** (`src/components/ui/`)
- shadcn/ui primitives - DO NOT modify unless absolutely necessary
- Pre-styled Radix UI components
- Manage via shadcn CLI when possible

### State Management

- TanStack Query (React Query) configured in `App.tsx:9` for server state
- No global state management - use React Query for async data
- Local component state via `useState` for UI interactions
- Toast notifications via custom `use-toast` hook

## TypeScript Configuration

The project uses relaxed TypeScript settings for rapid development:
- `noImplicitAny: false` - Allows implicit any types
- `noUnusedParameters: false` - No warnings for unused params
- `noUnusedLocals: false` - No warnings for unused variables
- `strictNullChecks: false` - Relaxed null checking
- Path alias: `@/*` maps to `./src/*`

## Adding shadcn/ui Components

This project uses shadcn/ui. To add new components:

```bash
npx shadcn@latest add [component-name]
```

Components are added to `src/components/ui/` with the project's theme configuration.

## Data Structure

Album data is defined directly in page components (see `src/pages/Index.tsx`):

**Track Interface:**
```typescript
interface Track {
  number: number;
  title: string;
  duration: string;  // Format: "M:SS"
}
```

**Story Interface:**
```typescript
interface Story {
  title: string;
  content: string;
  trackNumber?: number;  // Optional - links to specific track
}
```

## Styling Guidelines

1. All colors MUST be HSL format
2. Use Tailwind utility classes for styling
3. Custom theme colors available via `text-police-red`, `bg-justice-blue`, etc.
4. Use `cn()` utility from `@/lib/utils` for conditional class merging
5. Animations defined in `src/index.css` - use `animate-fade-in` class
6. Gradient text pattern: `bg-gradient-to-r from-police-red via-warning-red to-justice-blue bg-clip-text text-transparent`

## Important Notes

- **Lovable Integration:** This project was created with Lovable and maintains compatibility
- **Component Tagger:** Development mode uses `lovable-tagger` for component identification
- **Embedded Player:** Album player is embedded via iframe from BandLab
- **Git Workflow:** Changes pushed to repo are reflected in Lovable
- **Build Modes:** Supports both production (`build`) and development (`build:dev`) builds
