# NordHarbor Project State

## Current phase

## Current phase

Phase 1: Public photography experience (visual design in progress).

Phase 2: PostgreSQL and persistent photo data (core read-only integration complete).

## Project goal

Build a photography-first digital licensing platform as a practical full-stack software engineering portfolio project.

The first release will support a single photographer. The architecture will be designed and evolved deliberately to learn scalability, maintainability, security and production engineering.

## MVP access rules

- Anonymous visitors may browse galleries and save reduced-resolution previews.
- Customer registration and authentication are required for purchasing licenses.
- Full-resolution edited downloads require a completed purchase and backend authorization.
- Original RAW files remain private.
- Payments will initially operate in test mode.
- Commercial and resale licensing requests will be handled through direct inquiry.

## Development environment

- Windows 11 with WSL Ubuntu
- Development repositories stored in the Linux filesystem
- Node.js 24 managed through nvm
- npm 11
- Git and GitHub SSH configured
- Domain: elmongytech.com
- Repository hosted on GitHub

## Accepted decisions

- Single-photographer first release, with future marketplace expansion.
- Photography-first, cinematic user experience.
- Full-resolution edited image delivery; RAW files remain private.
- Security-first engineering and controlled local penetration-testing exercises.
- Complete test-payment and digital fulfillment workflow before real payments.
- Commercial and resale licensing through direct inquiry.
- Monorepo with independent frontend and backend applications.
- Feature-based organization emphasizing high cohesion, low coupling and traceable data flow.

## Preferred technology stack

- Frontend: Next.js, React and TypeScript
- Backend: NestJS and TypeScript
- Database: PostgreSQL
- Styling: SCSS Modules
- Monorepo tooling: npm workspaces
- Local development: WSL Ubuntu
- Containers: Docker / Docker Compose

Framework choices will be validated through small practical implementations.

## Proposed repository structure

```text
nordharbor/
├── apps/
│   ├── web/
│   └── api/
├── docs/
├── package.json
└── README.md
```

## Still undecided

- Detailed MVP feature boundaries
- Object-storage provider and image-processing approach
- Authentication implementation
- Payment provider
- Hosting and deployment architecture
- CI/CD configuration


## Development workflow

- Use VS Code GUI for creating files and folders, staging, committing and pushing.
- Use the WSL terminal for package management, application execution, Docker, databases and meaningful command-line learning.
- Explain unfamiliar commands, syntax and framework concepts before using them.
- Implement features manually with ChatGPT acting as mentor and reviewer.
- Favor readable code, high cohesion, low coupling and traceable data flow.

## Initial implementation

**Vertical slice 001: Public photo gallery**

Build a read-only gallery using Next.js and NestJS, initially backed by hardcoded photo metadata.

Then evolve the feature to use PostgreSQL and appropriate image storage.

**Current implementation status:**

- npm workspaces monorepo configured.
- `apps/web` initialized with Next.js, React and TypeScript.
- `apps/api` initialized with NestJS, TypeScript and ESM.
- Root development scripts start the web app, API, or both applications together.
- Next.js runs on port `3000`.
- NestJS API runs on port `3001`.
- Swagger/OpenAPI documentation is available from the API.
- Production dependency audit currently reports zero known vulnerabilities.
- `PhotosModule` is implemented as the first real NestJS feature module.
- `PhotosController` handles the public photo HTTP routes.
- `PhotosService` owns the temporary hardcoded photo data and lookup/filtering logic.
- `GET /photos` returns all photo metadata.
- `GET /photos?category=...` filters the photo collection case-insensitively.
- `GET /photos/:slug` returns an individual photo.
- Unknown photo slugs return `404 Not Found`.
- Empty category filters return an empty collection rather than `404`.
- Photo metadata currently uses Instagram post URLs as temporary external references while the real preview/storage architecture remains intentionally deferred.

In addition to the existing backend Photos feature:

- Next.js `/photos` fetches photo metadata from the NestJS API.
- Next.js `/photos/[slug]` fetches an individual photo by slug.
- Internal navigation between collection and detail pages works using Next.js `Link`.
- `/photos?category=...` forwards category filtering to the NestJS API.
- Category values are URL-encoded before being added to the API request.
- Empty filtered collections render a normal empty state.
- Missing individual photo resources remain a separate `404` concern.
- Duplicate frontend fetch logic has been removed.

---

## Session checkpoint: 2026-10-23

### Completed
- Installed `drizzle-orm`, `drizzle-kit`, `pg`, and `@types/pg` in the API workspace.
- Chose Drizzle ORM with version-controlled SQL migrations.
- Created `apps/api/src/db/schema.ts`.
- Defined the `categories` table with an identity primary key, required name, and unique slug.
- Generated `0000_initial_categories.sql`.
- Applied the migration successfully to PostgreSQL 18.
- Verified the table through DBeaver.
- Verified the migration journal contains one record.
- Confirmed repeated migrations do not reapply completed changes.
- Created shared database configuration in `apps/api/config/database.ts`.
- Created `apps/api/scripts/migrate.ts`.
- Verified the programmatic migration runner exits successfully with code `0`.

### Decisions
- Use Drizzle Kit to generate version-controlled SQL migrations.
- Use Drizzle's programmatic migrator as a workaround for the failing CLI migrate command.
- Share validated PostgreSQL configuration between database tooling.
- Keep database tooling in TypeScript where practical.

### Tooling and environment
- PostgreSQL 18 via Docker Compose.
- Drizzle ORM 0.45.4.
- Drizzle Kit 0.31.11.
- pg 8.23.1.
- Node.js 24 with native TypeScript type stripping.

**Open issues:**
- Replace the hardcoded `PhotosService` array with Drizzle queries.
- Preserve the existing API response DTO, category filtering and slug lookup behavior.
- Review unresolved npm security audit findings for `body-parser` and `multer`.
- Investigate the Drizzle Kit CLI migration failure separately.

## Session checkpoint: 2026-10-26

### Completed

- Replaced the hardcoded `PhotosService` array with PostgreSQL queries using Drizzle ORM.
- Established Drizzle's SQL-like query builder as the default database access convention.
- Implemented INNER JOINs to retrieve photo, category and photographer information.
- Preserved the existing public photo API contract.
- Added public photographer details through the response DTO and mapper.
- Updated database, feature and frontend TypeScript types.
- Verified all three public photo endpoints in Postman.
- Verified empty category results, the `all` category filter and missing-photo 404 responses.
- Created and passed 8 Vitest unit tests covering the controller, service, mapper and application controller.
- Verified successful NestJS and Next.js production builds.
- Confirmed that the Next.js gallery displays photographs retrieved from PostgreSQL.
- Selected NordHarbor's visual direction and generated reference mockups for future frontend development.
- Confirmed Git working tree clean after code commits.

### Decisions

- Use Drizzle's SQL-like query builder consistently for database operations.
- Keep database queries in feature services until complexity justifies a repository layer.
- Infer database types from Drizzle schemas.
- Keep feature-specific shared types in the feature's `types.ts`.
- Maintain explicit DTOs and mappers to control public API responses.
- Preserve `category` as a string and expose selected photographer information as a nested object.
- Adopt a cinematic Nordic visual identity with dark charcoal surfaces, cold teal accents, immersive nature imagery and restrained editorial typography.
- Implement frontend design manually in Next.js rather than depending on generated application code.

### Environment and tooling

- PostgreSQL 18 running through Docker Compose.
- NestJS with `@nestjs/drizzle`.
- Next.js 16.4.3 with Cache Components and Partial Prerendering.
- Postman collection created for public photo endpoints.
- Vitest: 8 passing unit tests.
- API and frontend production builds passing.
- No new infrastructure required.

### Outstanding work

- Build the homepage and photography gallery visual design.
- Implement responsive layouts, reusable components and SCSS Modules.
- Add real photo preview/image delivery.
- Add database integration and end-to-end tests.
- Review dependency security advisories before production.
- Investigate the direct Drizzle Kit migration CLI failure separately.
- Revisit Suspense and Partial Prerendering for deeper learning.

### Exact next step

Start Chapter 03: Frontend Design & Experience.

Use the approved NordHarbor homepage mockup to establish typography, color tokens, global styling and page layout.

Implement the homepage incrementally, starting with its navigation and cinematic hero section.

Continue using the existing PostgreSQL-backed API for dynamic photo content.