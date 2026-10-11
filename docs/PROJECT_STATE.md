# NordHarbor Project State

## Current phase

Architecture planning and initial repository setup.

## Project goal

Build a photography-first digital licensing platform as a practical full-stack software engineering portfolio project.

The first release will support a single photographer. The architecture will be designed and evolved deliberately to learn scalability, maintainability, security and production engineering.

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

## Current task

Review and synchronize project documentation, prepare the repository for a TypeScript monorepo, and understand npm workspaces.

## Exact next step

Create the initial `apps/web` and `apps/api` directories and configure a minimal root npm workspace, understanding each change before generating framework applications.

## Development workflow

- Use VS Code GUI for creating files and folders, staging, committing and pushing.
- Use the WSL terminal for package management, application execution, Docker, databases and meaningful command-line learning.
- Explain unfamiliar commands, syntax and framework concepts before using them.
- Implement features manually with ChatGPT acting as mentor and reviewer.
- Favor readable code, high cohesion, low coupling and traceable data flow.

## Next session

1. Create the initial `apps/web` and `apps/api` directories.
2. Learn the fundamentals of npm workspaces.
3. Configure the root `package.json`.
4. Validate the workspace structure.
5. Begin minimal framework setup, one application at a time.