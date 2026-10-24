# NordHarbor ⚓

NordHarbor is a full-stack photography portfolio and digital image licensing platform, built as a hands-on software engineering project.

**The vision:** A cinematic, photography-first experience where visitors can explore photographs and purchase licenses for full-resolution downloads.

The first release focuses on a single photographer, with the long-term goal of evolving into a multi-photographer marketplace.

**Engineering goals:** Readable code, maintainable architecture, security, testing, and learning how modern full-stack systems work under the hood.

## Tech stack

| Technology | Purpose |
|---|---|
| **Next.js** | React framework for frontend routing, rendering and data fetching |
| **React** | Component-based user interfaces |
| **TypeScript** | Static type checking for JavaScript |
| **NestJS** | Structured Node.js backend framework for APIs and business logic |
| **Node.js** | JavaScript and TypeScript runtime |
| **PostgreSQL 18** | Relational database for persistent application data |
| **Drizzle ORM** | Converts type-safe TypeScript queries into SQL |
| **Drizzle Kit** | Generates version-controlled SQL migrations from database schemas |
| **pg (node-postgres)** | PostgreSQL driver for database connections and queries |
| **@types/pg** | TypeScript declarations for the pg library |
| **Docker Compose** | Runs local development services, currently PostgreSQL |
| **npm workspaces** | Manages frontend and backend applications in one monorepo |
| **Swagger / OpenAPI** | Interactive API documentation |
| **Vitest** | Automated testing |
| **ESLint / Oxlint** | Static code analysis and linting |
| **Prettier** | Consistent code formatting |
| **SCSS Modules (planned)** | Scoped frontend styling |

## Repository structure

```text
nordharbor/
├── apps/
│   ├── web/              # Next.js frontend
│   └── api/              # NestJS backend
│       ├── config/       # Shared tooling configuration
│       ├── drizzle/      # SQL migrations and metadata
│       ├── scripts/      # Database tooling
│       └── src/          # API source code
├── docs/                 # Project state, decisions and roadmap
├── compose.yaml          # PostgreSQL container
├── .env.example          # Environment variable template
└── package.json          # Root scripts and npm workspaces
```

## Getting started

**Requirements**
- Node.js 24 and npm
- Docker with Docker Compose
- Git
- WSL2 with Ubuntu (recommended on Windows)

From the repository root:

```bash
npm ci
cp .env.example .env
```

Edit `.env` and set the database password and other settings as needed. Keep the `.env` file private.

Start PostgreSQL:

```bash
docker compose up -d db
```

For a fresh PostgreSQL volume, initialize the database credentials through the Compose environment variables.

Create the database tables:

```bash
npm run db:migrate
```

Start the frontend and backend:

```bash
npm run apps
```

**Local services**

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| API | http://localhost:3001 |
| Swagger API docs | http://localhost:3001/docs |
| PostgreSQL | localhost:5432 |

## Commands

Run these from the repository root.

### Development

| Command | Purpose |
|---|---|
| `npm run apps` | Start frontend and backend together |
| `npm run web` | Start Next.js only |
| `npm run api` | Start NestJS only |
| `docker compose up -d db` | Start PostgreSQL in the background |
| `docker compose down` | Stop and remove Compose containers and network, preserving the database volume |
| `docker compose logs -f db` | Follow PostgreSQL container logs |

### Database and migrations

| Command | Purpose |
|---|---|
| `npm run db:generate` | Generate SQL migration files from Drizzle schema changes |
| `npm run db:migrate` | Apply pending SQL migrations to PostgreSQL |

**Migration workflow**

1. Update the TypeScript schema in `apps/api/src/db/schema.ts`.
2. Run `npm run db:generate`.
3. Review the generated SQL inside `apps/api/drizzle/`.
4. Run `npm run db:migrate`.
5. Verify the database structure in DBeaver or PostgreSQL.
6. Commit the schema, SQL migration and generated migration metadata together.

**Note:** Drizzle Kit's direct `migrate` command currently fails silently in our tested setup. `db:migrate` uses Drizzle's programmatic migrator as a workaround.

### Tests and build

```bash
npm run test -w @nordharbor/api
npm run build -w @nordharbor/api
npm run build -w @nordharbor/web
```

## Current status

**Phase 2: PostgreSQL and persistent photo data (in progress)**

- Next.js and NestJS applications initialized and communicating.
- Public photo collection and detail endpoints working with temporary data.
- Category filtering and dynamic frontend routes implemented.
- PostgreSQL 18 running through Docker Compose.
- Drizzle ORM configured with version-controlled migrations.
- Initial `categories` table created and verified.
- Database migration scripts available from the repository root.

**Next:** Implement the `photos` database table, link photographs to categories through a foreign key, and replace hardcoded photo metadata with PostgreSQL queries.

## Project documentation

- [Project State](docs/PROJECT_STATE.md)
- [Architecture Decisions](docs/DECISIONS.md)
- [Roadmap](docs/ROADMAP.md)

NordHarbor is developed incrementally, with an emphasis on understanding and implementing each technology rather than generating an entire application upfront.