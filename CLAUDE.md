# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start Vite development server with HMR
- `npm run build` - Type-check with TypeScript and build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

## Tech Stack

- React 19 with TypeScript
- Vite 7 with SWC for fast refresh
- React Router DOM 7 for routing
- CSS Modules for styling
- classnames utility for conditional CSS classes

## Architecture

### Routing
Routes are defined in `src/main.tsx` using `createBrowserRouter`. The app uses a nested route structure with `Layout` as the parent route containing an `Outlet` for child pages.

### Component Structure
Components follow this pattern:
- `ComponentName/ComponentName.tsx` - Main component file
- `ComponentName/ComponentName.props.ts` - TypeScript interface extending native HTML element attributes
- `ComponentName/ComponentName.module.css` - Scoped CSS module styles

Props interfaces extend native HTML attributes (e.g., `ButtonHTMLAttributes<HTMLButtonElement>`) to allow passing standard HTML props through.

### Project Organization
- `src/components/` - Reusable UI components (Button, Input)
- `src/pages/` - Page components (Menu, Cart, Error)
- `src/layout/` - Layout components with navigation structure
