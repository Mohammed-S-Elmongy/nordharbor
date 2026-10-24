# NordHarbor Project State

## Current phase

Phase 2: Public photography experience.

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

## Session checkpoint: 2026-10-24

### Completed
- Created `photographers` and `photos` tables.
- Defined category and photographer foreign keys with `ON DELETE RESTRICT`.
- Generated, reviewed and applied migration `0001`.
- Practiced SQL INSERT, JOIN, NULL, defaults and foreign-key validation in DBeaver.
- Verified a PostgreSQL photo query through NestJS.
- Replaced custom database connection scaffolding with official `@nestjs/drizzle`.
- Centralized database configuration validation in `getDbConfig()`.
- Kept schema generation and migration execution as standalone CLI workflows.
- Upgraded Next.js and `eslint-config-next` to 16.4.3.
- Fixed production prerendering failures using React Suspense.
- Verified API build, web build, Drizzle generation, programmatic migration and NestJS startup.

### Decisions
- Prefer official framework documentation and CLI generators.
- Keep Drizzle ORM on its stable release line.
- Favor readable framework conventions over unnecessary custom abstractions.
- Permit deliberate destructive resets of disposable local development data.

### Open issues
- `PhotosService` still uses an in-memory photo array.
- Database rows must be mapped to the existing API response DTO.
- Review outstanding `body-parser` and `multer` security advisories using a fresh audit.
- Investigate the silent `drizzle-kit migrate` failure separately.
- Study Next.js Suspense and Partial Prerendering in greater depth.

### Exact next step
Replace `PhotosService.getPhotos()` with a real Drizzle query while preserving the existing API response structure.

Then implement category filtering and slug lookup through PostgreSQL.