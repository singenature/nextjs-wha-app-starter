<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Essential commands

```bash
# Development
npm run dev          # Start dev server on http://localhost:3000

# Build & Production
npm run build        # Build for production
npm run start        # Start production server

# Linting & Type checking
npm run lint         # ESLint (no TypeScript compiler check)
npx tsc --noEmit     # Type check (no npm script defined)

# Database
npx prisma generate  # Regenerate Prisma client after schema changes
npx prisma migrate dev  # Run migrations in development
npx prisma db seed   # Seed database (if seed script exists)
```

## Architecture

- **Framework**: Next.js 16.2.7 with App Router (not Pages Router)
- **Database**: MariaDB via Prisma 7 with `@prisma/adapter-mariadb` driver adapter
- **Auth**: better-auth 1.6.11 with email/password (no OAuth providers configured)
- **UI**: Radix UI + Tailwind CSS v4 + shadcn components
- **State**: Zustand for client-side cart state
- **Forms**: react-hook-form with Zod validation

## Project structure

```
src/
├── app/
│   ├── (auth)/          # Auth pages (login, signup) - separate layout
│   ├── (front)/         # Main storefront pages with Navbar
│   │   ├── page.tsx     # Homepage
│   │   ├── product/     # Product listing
│   │   ├── course/      # Course listing
│   │   ├── cart/        # Shopping cart
│   │   └── about/       # About page
│   └── api/auth/        # better-auth catch-all route
├── components/          # Shared UI components (navbar, hero, etc.)
│   └── ui/              # shadcn primitives (button, card, etc.)
├── lib/
│   ├── auth.ts          # better-auth server config
│   ├── auth-client.ts   # better-auth client config
│   ├── prisma.ts        # Prisma client singleton
│   ├── utils.ts         # cn() utility for Tailwind
│   ├── cart-store.ts    # Zustand cart store
│   └── services/        # Business logic services
│       └── repositories/ # Data access layer
prisma/
└── schema.prisma        # Database schema (User, Session, Account for auth; products, orders, etc.)
generated/
└── prisma/              # Generated Prisma client (import from "../../generated/prisma/client")
```

## Key gotchas

### Prisma client location
Generated client outputs to `generated/prisma/`, not the default `node_modules`. Import as:
```typescript
import { PrismaClient } from "../../generated/prisma/client"
```
Run `npx prisma generate` after any schema change.

### Driver adapter
Uses `@prisma/adapter-mariadb` driver adapter (not native Prisma MySQL connector). The adapter wraps `DATABASE_URL` from `.env`.

### Path aliases
`@/*` maps to `./src/*` (configured in `tsconfig.json`).

### Auth routes
better-auth uses a catch-all API route at `src/app/api/auth/[...all]/route.ts`. All auth endpoints go through this.

### No typecheck script
`package.json` only defines `lint` (ESLint). For type checking, run `npx tsc --noEmit` manually.

### .env loaded manually
`prisma.config.ts` and `src/lib/prisma.ts` both import `dotenv/config` to load `.env`. The `.env` file contains `DATABASE_URL`, `BETTER_AUTH_SECRET`, and `BETTER_AUTH_URL`.

### Database setup
Requires MariaDB running locally. See `docs/install_mariadb_with_docker.txt` for Docker command. Database name: `wha_ecommerce`.

### Route groups
`(front)` and `(auth)` are route groups that provide different layouts without affecting URL paths. `(front)` includes Navbar; `(auth)` has its own layout.

## Conventions

- **Thai language**: UI text and metadata are in Thai (lang="th" in layout)
- **Server components by default**: Only add `"use client"` when state/effects are needed
- **Service pattern**: Business logic in `src/lib/services/`, data access in `src/lib/repositories/`
- **shadcn components**: UI primitives live in `src/components/ui/`, feature components in `src/components/`

#####
- แยก TypeScript Type ทุกอย่าง ออกไปไว้ที่ Folder services/types
- Name Convention TypeScript (.ts) ให้ตั้งตามตัวอย่างคือ course-service.ts
- ห้ามใช้คำสั่ง npx prisma db push
