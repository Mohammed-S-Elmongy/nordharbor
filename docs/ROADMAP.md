# NordHarbor Roadmap

## Purpose

This roadmap defines the planned development phases for NordHarbor.

It is not a rigid contract.

The purpose is to:

- keep the project direction clear
- avoid building too many things at once
- know when a phase is considered complete
- identify the next practical step
- keep the learning process focused
- make architectural evolution deliberate rather than accidental

NordHarbor should be built as a series of small vertical slices.

Each vertical slice should connect as much of the real system as practical:

```text
UI
↓
Next.js
↓
NestJS API
↓
business logic
↓
data/storage
↓
tests
```

Not every phase needs every layer immediately.

Early phases may intentionally use hardcoded or simplified data before introducing infrastructure.

---

# Phase 0 - Foundation and project setup

## Goal

Create a clean development foundation and understand the basic tooling before implementing product features.

## Scope

- Git repository
- WSL development environment
- Node.js and npm
- npm workspaces monorepo
- `apps/web`
- `apps/api`
- Next.js frontend
- NestJS backend
- root development scripts
- VS Code project settings
- Swagger/OpenAPI
- basic repository documentation

## Done when

- [x] Git repository exists and is pushed to GitHub
- [x] Node.js is managed through nvm
- [x] npm workspaces are configured
- [x] Next.js app exists under `apps/web`
- [x] NestJS app exists under `apps/api`
- [x] `npm run web` starts the frontend
- [x] `npm run api` starts the backend
- [x] `npm run apps` starts both
- [x] frontend runs on port `3000`
- [x] backend runs on port `3001`
- [x] Swagger/OpenAPI works
- [x] repository documentation exists
- [x] generated build/cache files are ignored appropriately

## Exit condition

We understand the basic structure of the monorepo and how both applications start and communicate conceptually.

---

# Phase 1 - Public photography experience

## Goal

Turn NordHarbor from framework scaffolding into a real photography website.

The first release of this phase should be read-only and public.

No authentication, payments or database are required yet.

## Product routes

Initial public routes:

### `/`

Homepage with:

- cinematic hero section
- featured photographs
- category entry points
- short NordHarbor introduction
- simple navigation

### `/photos`

Main photography gallery.

### `/photos/[slug]`

Individual photograph detail page.

### `/categories/[slug]`

Category-specific gallery.

Initial categories may include:

- wildlife
- landscapes
- astro
- macro

### `/about`

Short photographer/project story.

## Backend scope

Create the first real NestJS feature module:

```text
photos/
├── photos.module.ts
├── photos.controller.ts
├── photos.service.ts
└── ...
```

Initial API:

```text
GET /photos
GET /photos/:slug
```

Photo data should initially be hardcoded.

Example photo metadata may include:

- id
- slug
- title
- description
- category
- image preview URL/path
- location
- camera
- lens
- capture date
- orientation
- featured flag

## Frontend scope

- fetch public photo data from the NestJS API
- render gallery cards
- render individual photo pages
- create reusable photo components
- implement responsive image layouts
- establish the first real NordHarbor visual identity
- begin SCSS Modules styling
- consider accessibility from the start

## Learning goals

- NestJS feature modules
- controllers
- services
- dependency injection
- route parameters
- Next.js App Router
- Server Components
- data fetching
- dynamic routes
- loading/error states
- responsive UI
- SCSS Modules
- Swagger endpoint documentation

## Done when

- [x] `GET /photos` returns photo metadata
- [x] `GET /photos/:slug` returns one photograph
- [ ] Swagger documents both endpoints
- [x] `/photos` displays data from the API
- [x] `/photos/[slug]` displays a real detail page
- [x] categories can filter or group photos
- [ ] homepage contains real photography content
- [ ] basic responsive styling is in place
- [ ] basic accessibility has been reviewed
- [ ] API and web tests exist for important behavior

## Exit condition

A visitor can browse NordHarbor as a real photography website even though the data is still temporary.

## Next step

Replace hardcoded photo data with persistent storage.

---

# Phase 2 - PostgreSQL and persistent photo data

## Goal

Introduce a real database and move photo metadata out of source code.

## Scope

- PostgreSQL
- local database development environment
- database schema
- migrations
- database access strategy
- photo persistence
- category persistence
- seed/test data

## Decisions required before implementation

Choose deliberately:

- ORM vs query builder vs direct SQL
- migration strategy
- local database setup
- database naming conventions

## Likely initial entities

```text
Photo
Category
```

Potential `Photo` fields:

- id
- slug
- title
- description
- categoryId
- preview image reference
- full-resolution image reference
- camera
- lens
- location
- capturedAt
- width
- height
- featured
- createdAt
- updatedAt

## Learning goals

- relational database design
- primary/foreign keys
- indexes
- migrations
- repositories/data-access layer
- connection management
- environment configuration
- seed data
- SQL inspection and debugging

## Done when

- [ ] PostgreSQL runs locally
- [ ] schema is documented
- [ ] migrations can build the database from scratch
- [ ] photos are read from PostgreSQL
- [ ] categories are read from PostgreSQL
- [ ] hardcoded photo data is removed
- [ ] tests use a deliberate database strategy
- [ ] local setup is documented

## Exit condition

The public photography experience works using persistent structured data.

## Next step

Move actual images into a deliberate storage workflow.

---

# Phase 3 - Image storage and delivery

## Goal

Separate image files from database metadata and create a realistic image-delivery architecture.

## Scope

- public reduced-resolution previews
- private full-resolution edited images
- storage provider or local-compatible object storage
- image URLs/references stored in PostgreSQL
- image optimization
- secure storage boundaries

## Security rule

Public preview files may be directly accessible.

Full-resolution files must remain private and must never rely on hidden URLs alone for protection.

## Learning goals

- object storage
- CDN concepts
- public vs private objects
- signed/temporary URLs
- image optimization
- cache headers
- metadata vs binary storage
- file upload security

## Done when

- [ ] previews are served from the chosen storage architecture
- [ ] full-resolution files are private
- [ ] database stores file references rather than image blobs
- [ ] image loading is performant
- [ ] storage behavior is documented
- [ ] file-security assumptions are documented

## Exit condition

NordHarbor has a realistic photo-storage architecture suitable for later protected downloads.

## Next step

Introduce users and authentication.

---

# Phase 4 - Users and authentication

## Goal

Introduce customer identity only when the product has a real reason for accounts.

## Product routes

Likely routes:

```text
/login
/register
/account
```

Later:

```text
/account/purchases
```

## Scope

- customer registration
- login
- logout
- session handling
- protected routes
- OAuth/OIDC learning and implementation
- password security if local credentials are supported
- authorization foundations

## Learning approach

Authentication should be implemented with understanding first.

Important concepts to learn deliberately:

- sessions
- cookies
- password hashing
- OAuth 2.0
- OpenID Connect
- authorization code flow
- PKCE
- state
- nonce
- CSRF
- token lifetime
- refresh behavior

## Done when

- [ ] customer can register
- [ ] customer can log in/out
- [ ] protected routes reject anonymous users
- [ ] current user identity can be resolved in the API
- [ ] authentication security has automated tests
- [ ] OAuth flow is understood, not merely installed
- [ ] security decisions are documented

## Exit condition

NordHarbor has a secure identity boundary that later purchase/download logic can trust.

## Next step

Introduce licensing and orders.

---

# Phase 5 - Licensing and order model

## Goal

Model the business process of purchasing the right to download a photograph.

## Scope

- license types
- pricing
- cart or direct purchase flow
- orders
- order items
- purchase ownership
- order status
- commercial-license inquiry path

## Initial licensing model

Start simple.

Example:

```text
Personal digital license
```

Commercial/resale requests remain direct inquiry initially.

## Likely domain concepts

```text
Photo
License
Order
OrderItem
User
```

## Learning goals

- domain modeling
- transactional data
- pricing rules
- backend authorization
- state transitions
- idempotency concepts
- validation

## Done when

- [ ] a customer can select a license
- [ ] an order can be created
- [ ] order items reference the correct photo/license
- [ ] ownership is tied to the authenticated customer
- [ ] order status is modeled clearly
- [ ] purchasing logic is tested
- [ ] commercial inquiry path exists

## Exit condition

The platform understands what a customer intends to buy before any real money moves.

## Next step

Integrate test payments.

---

# Phase 6 - Test payments

## Goal

Build a complete payment workflow using a provider's test environment.

## Scope

- checkout session/payment intent
- test-mode payment provider
- payment redirects where applicable
- webhook handling
- payment verification
- order state transitions
- failure/cancellation handling
- idempotent webhook processing

## Security principles

Never trust the browser to declare payment success.

The backend must verify payment state using trusted provider data.

## Learning goals

- payment APIs
- webhooks
- signatures
- idempotency
- retry behavior
- asynchronous workflows
- payment failure handling
- test environments

## Done when

- [ ] customer can complete a test purchase
- [ ] backend receives/verifies payment confirmation
- [ ] paid orders become fulfilled
- [ ] failed/cancelled payments behave correctly
- [ ] duplicate webhook delivery is safe
- [ ] payment events are logged appropriately
- [ ] automated tests cover critical flows

## Exit condition

A complete purchase can succeed end-to-end without using real money.

## Next step

Release secure full-resolution downloads.

---

# Phase 7 - Secure digital fulfillment

## Goal

Allow customers to access purchased full-resolution images securely.

## Scope

```text
/account/purchases
```

- purchased-photo history
- download authorization
- temporary download URLs
- private storage access
- download auditing where appropriate

## Required backend flow

```text
authenticated user requests download
↓
verify user
↓
verify paid order
↓
verify photo/license ownership
↓
generate temporary authorized URL
↓
return download
```

## Learning goals

- authorization
- ownership checks
- signed URLs
- private object storage
- secure download architecture
- access logging
- expiry

## Done when

- [ ] anonymous users cannot access full-resolution files
- [ ] authenticated users cannot access another customer's files
- [ ] valid customers can download purchased images
- [ ] download URLs expire
- [ ] authorization behavior is covered by security tests

## Exit condition

NordHarbor can securely sell and fulfill digital licenses in test mode.

## Next step

Build photographer/admin tooling.

---

# Phase 8 - Photographer/admin dashboard

## Goal

Stop managing content directly through code/database tools.

## Likely routes

```text
/dashboard
/dashboard/photos
/dashboard/photos/new
/dashboard/orders
/dashboard/settings
```

## Scope

- upload photographs
- edit metadata
- manage categories
- publish/unpublish photos
- mark featured content
- view orders
- basic platform settings

## Learning goals

- protected admin authorization
- forms
- file uploads
- validation
- admin UX
- CRUD workflows
- audit/logging considerations

## Done when

- [ ] authorized photographer/admin can manage photos
- [ ] photo metadata can be edited safely
- [ ] images can be uploaded through the application
- [ ] orders can be reviewed
- [ ] public content no longer requires direct database/source edits

## Exit condition

The single-photographer product can be operated through its own interface.

## Next step

Production hardening.

---

# Phase 9 - Testing, security and production hardening

## Goal

Prepare the system to behave like a production application rather than a development demo.

Security work happens throughout the project, but this phase performs a deliberate full-system review.

## Scope

- unit tests
- integration tests
- end-to-end tests
- security regression tests
- input validation
- rate limiting
- secure headers
- CORS
- CSRF review
- XSS review
- SQL injection review
- authentication/authorization review
- file upload review
- payment review
- logging
- error handling
- dependency audits
- secrets management

## Controlled security testing

Perform local/authorized exercises against NordHarbor to understand and verify defenses.

Reference:

- OWASP Top 10
- OWASP API Security Top 10
- OWASP testing guidance

## Done when

- [ ] important flows have automated coverage
- [ ] authorization tests exist
- [ ] common attack surfaces have been reviewed
- [ ] known vulnerabilities are understood and addressed appropriately
- [ ] secrets are not committed
- [ ] logs avoid inappropriate sensitive data
- [ ] production error behavior is deliberate
- [ ] threat model is documented

## Exit condition

The application has a defensible production-security baseline.

## Next step

Containerization, CI/CD and deployment.

---

# Phase 10 - Docker, CI/CD and deployment

## Goal

Make NordHarbor reproducible and deployable.

## Scope

- Dockerfiles
- Docker Compose
- production configuration
- GitHub Actions
- automated lint/test/build
- migrations during deployment
- environment/secrets configuration
- hosting
- domain/DNS
- HTTPS
- monitoring
- backups

## Learning goals

- container networking
- build stages
- production images
- CI pipelines
- deployment strategy
- health checks
- environment separation
- rollback
- observability

## Done when

- [ ] project can be started reproducibly with documented steps
- [ ] CI runs checks automatically
- [ ] production deployment is automated or clearly documented
- [ ] HTTPS is enabled
- [ ] database backups are considered
- [ ] health/monitoring exists
- [ ] deployment and rollback procedures are documented

## Exit condition

NordHarbor is a deployed full-stack application rather than only a local portfolio repository.

## Next step

Evaluate marketplace evolution.

---

# Phase 11 - Multi-photographer evolution

## Goal

Use the working single-photographer product to learn how architecture evolves under new requirements.

This phase is intentionally not designed in detail yet.

## Potential scope

- photographer accounts
- photographer ownership of photos
- roles and permissions
- photographer profiles
- seller dashboards
- multi-tenant authorization
- marketplace discovery
- commissions/platform fees
- payouts
- moderation
- expanded licensing

## Learning goals

- refactoring a mature system
- schema evolution
- multi-tenancy
- authorization complexity
- scaling
- backward compatibility
- migration planning
- architectural trade-offs

## Done when

To be defined only after the single-photographer system is working and its real architectural constraints are understood.

---

# Current position

```text
Phase 0 - Foundation
████████████████████  DONE

Phase 1 - Public photography experience
██████░░░░░░░░░░░░░░  IN PROGRESS
```

## Completed in Phase 1 so far

The first backend feature is functional:

```text
PhotosModule
↓
PhotosController
↓
PhotosService
↓
GET /photos
GET /photos?category=...
GET /photos/:slug
↓
hardcoded photo metadata
```

Individual missing resources return `404 Not Found`.

Filtered collections with no matches return an empty array.

Swagger/OpenAPI discovers the endpoints, but richer API documentation remains a planned Phase 1 task.

## Exact next step

Photo DTO
↓
Swagger response schemas
↓
endpoint documentation
↓
API contract complete enough for PostgreSQL

---

# Working rule

Do not begin a later phase merely because its technology looks interesting.

Complete enough of the current phase to understand why the next dependency or architectural change is needed.

The roadmap may evolve as the product teaches us more about itself.
```