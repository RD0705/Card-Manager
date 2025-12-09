# CardMember - Gestão de Carteirinhas de Associados

## Overview

CardMember is a SaaS application for managing digital membership cards (carteirinhas) for associations. It provides a B2B admin dashboard to manage members, track expiration dates, and issue professional membership cards. The application is built in Portuguese (Brazilian) and targets association management workflows.

Key features include:
- Member management with CRUD operations
- Status tracking (active/expired) based on expiration dates
- Digital membership card generation and viewing
- Filter and search capabilities for member lists
- Light/dark theme support

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight router)
- **State Management**: TanStack React Query for server state
- **UI Components**: Shadcn UI (New York style) built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **Build Tool**: Vite with custom plugins for Replit integration

The frontend follows a component-based architecture with:
- Pages in `client/src/pages/` (login, dashboard, not-found)
- Reusable components in `client/src/components/`
- UI primitives from Shadcn in `client/src/components/ui/`
- Custom hooks in `client/src/hooks/`
- Theme provider for dark/light mode support

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Pattern**: RESTful JSON API with `/api` prefix
- **Build**: esbuild for production bundling with selective dependency bundling

The server structure:
- `server/index.ts` - Express app setup and middleware
- `server/routes.ts` - API route definitions
- `server/storage.ts` - Data access layer interface
- `server/vite.ts` - Vite dev server integration
- `server/static.ts` - Static file serving for production

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Defined in `shared/schema.ts` using Drizzle's pgTable
- **Validation**: Zod schemas generated via drizzle-zod
- **Current Storage**: In-memory implementation with seed data (IStorage interface allows easy swap to database)

Database schema includes:
- `users` - Authentication (id, username, password)
- `members` - Member data (id, name, email, cpf, phone, photoUrl, startDate, expirationDate)

### Design System
- Material Design principles adapted for Shadcn UI
- Inter font family for typography
- Color-coded status badges (emerald for active, red for expired)
- Responsive layout with sidebar navigation pattern
- Professional B2B aesthetic with information clarity focus

## External Dependencies

### Database
- **PostgreSQL** - Primary database (configured via DATABASE_URL environment variable)
- **Drizzle Kit** - Database migrations and schema push (`npm run db:push`)

### UI Component Libraries
- **Radix UI** - Headless component primitives (dialog, dropdown, tabs, etc.)
- **Shadcn UI** - Styled component layer on top of Radix
- **Lucide React** - Icon library
- **date-fns** - Date formatting and manipulation

### State & Data Fetching
- **TanStack React Query** - Server state management and caching
- **Zod** - Schema validation for API requests

### Build & Development
- **Vite** - Frontend build tool with HMR
- **esbuild** - Server-side bundling for production
- **TypeScript** - Type safety across the stack
- **Tailwind CSS** - Utility-first styling

### Session Management (available but not fully implemented)
- **connect-pg-simple** - PostgreSQL session store
- **express-session** - Session middleware