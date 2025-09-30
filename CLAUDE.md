# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with React, TypeScript, Vite, and Tailwind CSS. The site features an interactive homepage with nested expandable content sections and separate pages for photography and writing projects.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production (runs TypeScript check, Vite build, and copies index.html to 404.html for SPA routing)
npm run build

# Preview production build locally
npm run preview

# Run linter
npm run lint
```

## Architecture

### Feature-Based Structure

The codebase uses a feature-based architecture with two main features:

1. **`features/portfolio/`** - The main interactive homepage
   - Contains the primary Portfolio component with nested, expandable bio sections
   - Uses a custom interactive typewriter system (`InteractiveTypewriter.tsx`) that handles trigger-based content expansion
   - State management handled by `usePortfolioState` hook
   - Portfolio content defined in `features/portfolio/data/content.ts` with a deeply nested data structure supporting triggers, links, galleries, and rich text

2. **`features/content/`** - Dynamic content pages (photography, writing)
   - Uses a page registry system (`data/page-registry.ts`) to map slugs to page components
   - `PageFactory` component dynamically loads pages using Vite's `import.meta.glob`
   - Pages are wrapped with `withContentPage` HOC for consistent layout
   - Content pages live in `features/content/pages/{photography|writing}/`

### Shared Resources

- **`shared/ui/`** - Reusable UI components organized by purpose:
  - `layout/` - AppLayout, navigation
  - `feedback/` - ErrorPage, loading states
  - `media/` - Image, Video components
- **`shared/data/`** - Shared data like gallery registries
- **`shared/icons/`** - Custom icon components

### Routing

- React Router handles client-side routing with three main routes:
  - `/` - Homepage (Portfolio component)
  - `/:slug` - Dynamic content pages (PageFactory)
  - `*` - 404 fallback
- SPA routing for GitHub Pages: `postbuild` script copies `dist/index.html` to `dist/404.html`

### Styling

- Tailwind CSS with custom CSS variables defined in `styles/globals.css`
- Custom Sohne font loaded via `@font-face` declarations
- Radix UI components for accessible UI primitives
- Path alias `@/*` maps to project root (configured in both `vite.config.ts` and `tsconfig.json`)

## Key Patterns

### Adding New Content Pages

1. Add page configuration to `features/content/data/page-registry.ts`
2. Create component in `features/content/pages/{type}/YourPage.tsx`
3. Wrap component with `withContentPage` HOC
4. Add to portfolio's side projects in `features/portfolio/data/content.ts` if needed

### Portfolio Content Structure

Portfolio bio sections use a recursive content model supporting:
- **Triggers**: Clickable text that expands nested content
- **Links**: External hyperlinks defined in `portfolioContent.links`
- **Rich text**: Text with inline triggers and links
- **Galleries**: Image galleries referenced by ID

The `InteractiveTypewriter` component manages active triggers and handles the typewriter animation for expanding/collapsing content.

## Static Assets

- Content images stored in `assets/content/{project-name}/`
- Fonts in `assets/fonts/`
- Public assets (favicon, etc.) in `public/`

## TypeScript Configuration

- Strict mode enabled
- Module resolution: bundler
- Path mapping: `@/*` → root directory
- Unused locals/parameters errors enabled