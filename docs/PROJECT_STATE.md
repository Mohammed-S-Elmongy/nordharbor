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

Prepare Phase 2: PostgreSQL and persistent photo metadata.

The first Photos API contract, response mapping, and initial automated tests have been implemented and verified locally.

## Completed in the latest session

- Created `PhotoResponseDto` with Swagger property metadata.
- Added `@ApiTags`, `@ApiOperation`, `@ApiQuery`, `@ApiOkResponse`, and `@ApiNotFoundResponse` documentation.
- Created a reusable `ErrorResponseDto` under `src/common/dto/`.
- Documented successful and missing-photo HTTP responses.
- Added `toPhotoResponseDto()` to explicitly select public photo properties.
- Verified that an internal `storageKey` does not leak into public responses.
- Created a mapper regression test and deliberately verified that it detects a field leak.
- Introduced Vitest mocking for NestJS controller dependencies.
- Updated generated tests to reflect current application behavior.
- Confirmed that all six API tests pass.

## Architectural lessons and decisions

- TypeScript types provide compile-time checks, not runtime protection.
- DTO classes provide runtime metadata for Swagger but do not automatically validate or filter responses.
- Public API fields should be explicitly allowlisted through response mapping.
- Feature-specific code belongs within its feature.
- Reusable technical contracts may live under `src/common/`.
- Controller unit tests can use mocked service providers through NestJS dependency injection.
- Testing should support understanding and development, without replacing the learn-while-building workflow.

## Environment and tooling changes

No new tools installed or environment changes made.

Existing tooling: WSL Ubuntu, Node.js, npm workspaces, Next.js, NestJS, Swagger/OpenAPI, and Vitest.

## Unresolved questions

- Which PostgreSQL access approach should NordHarbor use: direct SQL, query builder, or ORM?
- What is the simplest reliable migration strategy?
- Should Docker Compose be introduced immediately for local PostgreSQL?
- How should the initial Photo and Category tables be related?
- How should the existing hardcoded photo metadata be seeded into the database?
- The Next.js Cache Components warning and startup readiness behavior remain future frontend concerns.

## Exact next step

Begin Phase 2 by learning PostgreSQL's role in the application and comparing database-access strategies before choosing one.

Then:

1. Decide how to run PostgreSQL locally, including whether Docker Compose is appropriate.
2. Design the initial Photo and Category schema.
3. Learn migrations and establish the first migration.
4. Connect the NestJS application to PostgreSQL.
5. Replace hardcoded photo metadata with persistent data.
6. Preserve the existing HTTP contracts and response mapper.
7. Extend tests where necessary.

Continue implementing each step manually with explanations and review.