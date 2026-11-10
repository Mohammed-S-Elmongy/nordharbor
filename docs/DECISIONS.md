### Code organization principles

NordHarbor will prioritize high cohesion, low coupling, clear responsibility boundaries and traceable data flow.

**Organization:**
- Use a monorepo with separate applications under `apps/`.
- Organize application code primarily by business feature.
- Keep related business logic close together.
- Separate HTTP handling, business logic and data access where appropriate.
- Avoid unnecessary abstraction and deeply nested folder structures.
- Make cross-feature dependencies explicit.

**Design goals:**
- A developer should quickly understand where a feature belongs.
- Following a request from the frontend to the database should be straightforward.
- Refactoring one feature should have minimal unintended impact on unrelated features.
- Errors should be traceable through clearly defined application boundaries.
- Favor readable, predictable code over clever abstractions.

**Learning goal:** Apply practical troubleshooting experience from physical network infrastructure to software architecture, using clear system boundaries, understandable data flow and deliberate isolation of faults.


### Decision 001: Single-photographer first release

**Status:** Accepted

**Decision:** NordHarbor will begin as a single-photographer photography platform, with the long-term goal of evolving into a multi-photographer marketplace.

**Why:** The primary learning objective is to understand how to design, build, and evolve software systems for growth. Starting with a smaller product allows us to experience this evolution deliberately, rather than implementing the final architecture immediately.

**Architectural approach:**

- Consider future scalability during initial design.
- Identify decisions that may be expensive to change later.
- Understand and document architectural trade-offs.
- Implement functionality incrementally.
- Revisit and evolve the architecture as requirements grow.
- Learn refactoring, database migrations, performance optimization, and scaling strategies through practical experience.

**Trade-off:** Some architectural decisions may add initial complexity, while others will deliberately require refactoring later. Both are acceptable when the reasoning and learning outcomes are understood.

**Long-term goal:** Develop the practical architectural knowledge and engineering judgment needed to design and maintain larger production systems.

### Decision 002: Photography-first user experience

**Status:** Accepted

**Decision:** NordHarbor will prioritize the photography portfolio experience over the storefront experience.

**Why:** The platform should attract and retain visitors through beautiful photography, intuitive navigation, and an enjoyable browsing experience. It should also demonstrate strong frontend development and UI/UX capabilities to potential employers.

**Design principles:**

- Photography remains the primary focus.
- Use a cinematic, minimal visual identity.
- Prioritize intuitive navigation and accessibility.
- Deliver excellent performance despite image-heavy content.
- Make purchasing available without overwhelming the gallery experience.
- Encourage voluntary exploration rather than artificially increasing session duration.

**Success criteria:** Visitors can discover and enjoy photography easily, understand how to purchase licenses when interested, and experience a polished, responsive website.

### Decision 003: Full-resolution edited image delivery

**Status:** Accepted

**Decision:** The initial platform will deliver full-resolution photographer-edited images to licensed customers. Original RAW files remain private.

**Why:** Provide customers with finished photographs suitable for permitted personal uses while retaining original source files and maintaining a straightforward initial licensing workflow.

**Future evolution:** Support alternative photographer edits, RAW purchases and AI-assisted variations when appropriate.



### Decision 004: Security-first engineering and practical security testing

**Status:** Accepted

**Context:** NordHarbor is both a photography platform and a software engineering learning project. Security is an essential part of demonstrating end-to-end engineering competence.

**Decision:** Security will be considered throughout system design, implementation, testing and deployment, rather than being treated as a final development phase.

**Why:** To develop practical cybersecurity knowledge, understand common attack techniques, learn how to protect production systems, and demonstrate security-conscious engineering to potential employers.

**Learning approach:**

- Understand security concepts and underlying mechanisms.
- Identify trust boundaries and potential attack surfaces.
- Perform controlled offensive security exercises against local, authorized environments.
- Reproduce vulnerabilities and understand their causes.
- Implement appropriate defenses.
- Verify fixes through automated security regression tests.
- Document security decisions, trade-offs and remaining risks.

**Initial security priorities:** Authentication, authorization, XSS, CSRF, SQL injection, secure file handling, protected downloads, payment integrity, rate limiting, logging and deployment security.

**Reference standards:** OWASP Top 10, OWASP API Security Top 10 and OWASP security testing guidance.

**Scope:** All offensive testing must be restricted to systems and environments we own or are explicitly authorized to test.

### Decision 005: Test-payment checkout first

**Status:** Accepted

**Decision:** Implement a complete end-to-end payment and digital fulfillment workflow using a payment provider's test environment.

**Why:** Demonstrate practical full-stack payment integration, secure order processing, webhooks, testing and digital delivery without initially operating a real commercial payment system.

**Future evolution:** Real payments may be enabled after legal, operational and production-readiness requirements are addressed.

### Decision 006: Commercial licensing through direct inquiry

**Status:** Accepted

**Decision:** Provide a straightforward contact option for customers interested in commercial licensing, reproduction rights or physical merchandise resale.

**Why:** Support realistic commercial use cases without introducing unnecessary licensing and royalty-management infrastructure.

**Future evolution:** Automated commercial and extended licensing may be introduced if justified by future requirements.


### Decision 007: Monorepo with feature-based applications

**Status:** Accepted

**Decision:** NordHarbor will use one Git repository with separate frontend and backend applications under `apps/web` and `apps/api`.

**Why:** Keep the full engineering project accessible in one place while maintaining clear application responsibilities, high cohesion, low coupling and understandable data flow.

**Initial tooling:** Native npm workspaces without additional monorepo frameworks.

**Architecture:** Organize internal application code primarily by business feature. Keep controllers, services, database access and related tests appropriately grouped.

**Trade-off:** Frontend and backend share repository tooling and change history but retain separate build, runtime and deployment responsibilities.

**Future evolution:** Introduce shared packages or more advanced monorepo tooling only when justified by actual needs.

### Decision 008: Public previews and account-based licensed downloads

**Status:** Accepted

**Decision:** Public visitors may browse and save reduced-resolution photograph previews without an account.

Registered customers may purchase digital licenses and access full-resolution edited photographs they have purchased.

**Security approach:**
- Publicly serve optimized, reduced-resolution previews.
- Keep full-resolution images in private storage.
- Require authentication for accessing customer purchases.
- Verify purchase ownership and download permissions on the backend.
- Use temporary authorized downloads where appropriate.
- Do not rely on disabling right-click or preventing screenshots for security.

**Why:** Provide an accessible photography-first browsing experience while demonstrating authentication, authorization, secure digital delivery and practical web security.

**Trade-off:** Customer accounts introduce additional authentication, account management and personal-data responsibilities.

**Future evolution:** Guest checkout may be introduced later if reducing purchasing friction becomes a priority.

### Decision 009: One primary category per photograph

**Status:** Accepted

**Decision:** Each photograph belongs to exactly one category in the initial release. A category may contain multiple photographs.

**Implementation:** Use a one-to-many relationship between `categories` and `photos`, with `photos.category_id` referencing `categories.id`.

**Why:** This satisfies current product requirements while keeping the initial relational model simple, understandable, and maintainable.

**Trade-off:** Photographs cannot initially belong to multiple categories.

**Future evolution:** If product requirements expand, introduce a many-to-many relationship through a deliberate database migration, updating queries, API contracts, and tests as needed.

**Learning goal:** Demonstrate incremental database design, schema migrations, backward compatibility, and architectural evolution through readable code and meaningful Git history.

### Decision 010: PostgreSQL local development through Docker Compose

**Status:** Accepted

**Decision:** Run PostgreSQL 18 through Docker Compose during local development. Keep Next.js and NestJS running directly in WSL initially.

**Why:** Provide a reproducible, isolated database environment while learning container architecture, networking, persistence, and database administration without prematurely containerizing the entire application.

**Implementation:**

- Store the Compose configuration in the repository root.
- Use the official `postgres:18` image.
- Publish PostgreSQL on `127.0.0.1:5432`.
- Preserve database files using the `postgres_data` named volume.
- Load local values from an ignored `.env` file.
- Commit `.env.example` without real credentials.
- Let Compose generate resource names.

**Trade-offs:** Development requires Docker Desktop to be available, and the current database initialization account has elevated privileges.

**Future evolution:** Introduce a least-privileged application role, health checks, backups, and controlled PostgreSQL upgrades. Containerize the API and frontend when deployment or development requirements justify it.

**Learning goal:** Understand and demonstrate reproducible development infrastructure, Docker fundamentals, and the separation between applications and persistent services.

### Decision 011: Drizzle ORM and version-controlled SQL migrations

**Status:** Accepted

**Decision:** Use Drizzle ORM with PostgreSQL for type-safe database access. Use Drizzle Kit to generate SQL migration files, review them before execution, and commit them to Git.

**Why:**
- SQL-like, readable TypeScript syntax.
- Transparent SQL generation.
- Type-safe queries.
- Reproducible database schema changes.
- Opportunities to learn PostgreSQL and SQL directly.

**Implementation:**
- Schema definitions in `apps/api/src/db/schema.ts`.
- Generated migrations in `apps/api/drizzle/`.
- Shared configuration in `apps/api/config/database.ts`.
- Drizzle Kit for migration generation.
- Programmatic migrator through `apps/api/scripts/migrate.ts`.
- Root npm scripts: `db:generate` and `db:migrate`.

**Trade-off:** Drizzle Kit's migration CLI currently fails silently in our environment. The programmatic migrator works and is used as a documented workaround.

**Future evolution:** Revisit the CLI workaround when upgrading Drizzle. Introduce a least-privileged database role and migration deployment procedures before production.

### Decision 012: Official framework integrations and shared database configuration

**Status:** Accepted

**Decision:**
- Prefer official framework documentation and CLI generators.
- Use `@nestjs/drizzle` for NestJS database integration and dependency injection.
- Use stable Drizzle ORM releases.
- Maintain one shared `getDbConfig()` validator for database connection settings.
- Load environment variables through NestJS ConfigModule at runtime and explicitly in standalone database CLI tools.
- Keep SQL migrations version-controlled and executed separately from application startup.
- Favor clean refactoring over preserving experimental code during early development.

**Why:** Consistent framework conventions, fewer custom abstractions, predictable configuration and understandable data flow.

**Known issue:** `drizzle-kit migrate` exits with code 1 without reporting an error. The programmatic migration runner remains the supported project workaround.

### Decision 013: SQL-like Drizzle queries and feature-local types

**Status:** Accepted

**Decision:**
- Use Drizzle's SQL-like query builder as the default database query pattern.
- Use explicit JOINs for related data.
- Keep database queries in feature services until a repository layer offers a clear benefit.
- Infer database row types using `$inferSelect` and insertion types using `$inferInsert`.
- Store shared feature-specific types close to the feature.
- Keep public DTOs separate from database models.
- Use mappers to explicitly expose public information.

**Why:** Consistent syntax, traceable SQL behavior, readable services and controlled API contracts.

**Trade-off:** Complex services may eventually justify dedicated repositories or reusable query helpers.

### Decision 014: NordHarbor visual design direction

**Status:** Accepted

**Decision:** Adopt a hybrid visual direction combining cinematic Nordic photography, minimalist editorial design and marketplace functionality.

**Design principles:**
- Dark charcoal and slate backgrounds.
- Cold teal-blue accents.
- Elegant editorial headings with readable sans-serif interface text.
- Large, immersive wildlife and landscape photography.
- Minimal visual clutter and restrained animations.
- Accessible controls and responsive layouts.
- Reusable design tokens and components.

**Implementation:** Use the approved homepage and supporting page mockups as visual references. Build the frontend incrementally with Next.js, React and SCSS Modules.

**Why:** Create a distinctive photography-first experience while demonstrating frontend engineering and design implementation skills.

**Note:** Generated mockups are design references, not authoritative application code.

### Decision 015: Native CSS Modules instead of SCSS

**Status:** Accepted

**Decision:** Use modern CSS and CSS Modules for NordHarbor frontend styling. Remove Sass unless a concrete future requirement justifies reintroducing it.

**Why:**
- Native CSS supports the variables and nesting currently needed.
- Next.js supports CSS Modules without additional styling dependencies.
- Reduces tooling complexity.
- Favors readable, predictable code over premature abstractions.

**Supersedes:** The SCSS Modules implementation choice in Decision 014. The visual design direction remains unchanged.

### Decision 016: Next.js App Router component colocation

**Status:** Accepted

**Decision:** Keep route-specific components close to their App Router pages. Place genuinely shared components in `app/_components/`.

**Why:**
- Reuses Next.js's existing project organization.
- Avoids duplicating the route hierarchy in a separate `features/` directory.
- Makes related files easier to find.
- Supports incremental extraction of reusable components.

**Conventions:**
- `app/page.tsx` remains the homepage entry point.
- `app/_home/` contains homepage-specific components.
- `app/photos/` contains photo routes and their route-specific code.
- `app/_components/` contains shared components such as Header and future Footer components.
- Use private folders where helpful to distinguish implementation structure from routing.

**Trade-off:** Components shared across several routes may need to move to a shared location as the application evolves.

**Guideline:** Prefer colocating first and extracting shared abstractions when actual reuse becomes clear.

**Implementation update, 2026-11-01:**

The homepage now uses the `(home)` route group.

- `app/(home)/page.tsx` serves `/`.
- `app/(home)/layout.tsx` owns homepage-specific presentation and the Header.
- `app/(home)/_components/` contains Hero and CategoryNavigation.
- `app/_components/` contains genuinely shared UI and layout components.
- The root layout continues to own fonts, metadata, global styling and the HTML document.

The route group does not change the homepage URL. This supersedes the earlier `app/page.tsx` and `app/_home/` conventions within Decision 016.

The photographic background is implemented through overlapping CSS Grid layers. The layout will be revisited when additional homepage sections require a clear separation from the introductory background.

### Decision 017: Public layouts and URL-driven Gallery filtering

**Status:** Accepted

**Decision:**

- Keep the root layout focused on HTML structure, fonts and global styles.
- Use `app/(public)/layout.tsx` for the shared public Header.
- Use `app/(public)/(home)/layout.tsx` for homepage-specific visuals.
- Keep Gallery filtering driven by URL search parameters.
- Use ordinary links with an active visual state for single-category filtering.
- Place asynchronous GalleryContent inside a Suspense boundary.

**Why:**

Maintain clear layout responsibilities, avoid unnecessary Client Components, preserve shareable filtered URLs and reuse components across public pages.

**Trade-offs:**

- The overlapping Header currently requires responsive clearance spacing.
- Category definitions are duplicated between the homepage and Gallery.
- Advanced filtering and interactive sidebar behavior remain future work.

**Supersedes:** The earlier homepage-specific Header placement in Decision 016. The component-colocation principle remains unchanged.