# NordHarbor Project State

## Current phase

Phase 1: Public photography experience.

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
- ORM or SQL database-access strategy
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

## Current task

Phase 2: PostgreSQL and persistent photo data.

The local PostgreSQL environment is running successfully through Docker Compose. The next learning and implementation milestone is database migrations.

## Completed in the latest session (2026-10-22)

- Installed `@nestjs/config` in the API workspace.
- Configured `ConfigModule.forRoot()` to load the repository-root `.env`.
- Verified configuration loading through `ConfigService`.
- Created and committed `.env.example` without credentials.
- Audited npm dependencies and removed the unused `@nestjs/mau` deployment dependency and its script.
- Verified that all six existing API tests still pass.
- Enabled Docker Desktop's WSL2 integration.
- Resolved Docker socket permissions for the Ubuntu development user.
- Learned the distinction between Docker images, containers, volumes, networks, and the Docker daemon.
- Created the repository-root `compose.yaml`.
- Configured PostgreSQL 18 with environment variables, localhost-only port publishing, and a named persistent volume.
- Started PostgreSQL and verified successful initialization.
- Reset the disposable database volume to rename the initial database from `nordharbor_db` to `nordharbor`.
- Connected successfully through `psql` and configured DBeaver.
- Confirmed PostgreSQL 18.6, database `nordharbor`, and role `nordharbor_app`.

## Current local architecture

```text
Next.js (WSL, port 3000)
        |
        | HTTP
        v
NestJS (WSL, port 3001)
        |
        | PostgreSQL connection - not implemented yet
        v
PostgreSQL (Docker, localhost:5432)
        |
        v
Named volume: nordharbor_postgres_data
```

## Environment and tooling changes

- Docker Desktop with WSL2 integration enabled.
- Ubuntu user added to the `docker` group.
- PostgreSQL 18 Docker image.
- Docker Compose configuration in repository root.
- Database name: `nordharbor`.
- Database initialization role: `nordharbor_app`.
- NestJS configuration handled through `@nestjs/config`.
- Local credentials stored in ignored `.env`; placeholders in `.env.example`.

## Architectural decisions

- Use Docker Compose for local PostgreSQL while keeping the web and API development servers in WSL.
- Pin PostgreSQL to major version 18 instead of relying on `latest`.
- Preserve PostgreSQL data in a named volume.
- Bind the database's published port to `127.0.0.1`.
- Keep Docker resource names managed by Compose without a custom `container_name`.
- Each photograph belongs to exactly one category initially (Decision 009).
- Changes to database structure will be reproducible through migrations rather than undocumented manual database edits.

## Open questions and risks

- Choose a database access approach: direct SQL, query builder, or ORM.
- Choose a migration strategy and tool.
- Design the first `categories` and `photos` tables and constraints.
- Determine how to seed sample photo data.
- Connect NestJS to PostgreSQL without changing the public API contract.
- Introduce a least-privileged runtime database role later; the initialization role is currently a superuser.
- Review outstanding npm audit findings in development dependencies.
- Revisit Next.js Cache Components and startup-readiness issues during frontend work.
- Database backups and recovery have not been implemented.

## Exact next step

**Begin by learning database migrations properly, before creating application tables.**

1. Understand what a migration is and why it belongs in version control.
2. Learn how migrations are tracked, applied, and safely evolved.
3. Compare migration tooling alongside direct SQL, query builders, and ORMs.
4. Choose the simplest suitable approach for NordHarbor.
5. Design the initial `categories` and `photos` schema.
6. Create, apply, and verify the first migration.
7. Connect NestJS to the persisted data.

Maintain the learn-while-building approach. Explain syntax, commands, and database behavior before implementation.