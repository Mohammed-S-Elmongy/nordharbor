# NordHarbor

NordHarbor is a full-stack photography portfolio and digital licensing platform, built as a hands-on software engineering learning project.

The first release focuses on a single photographer, with a cinematic photography-first experience, digital image licensing, and a complete test-payment and secure-download workflow.

The long-term goal is to explore how the architecture can evolve into a scalable multi-photographer marketplace.

The project emphasizes readable and maintainable code, thoughtful system design, security, testing, deployment, and learning the underlying technologies rather than relying on AI-generated implementations.

## Planned areas

- Photography portfolio and galleries
- Photographer accounts and uploads
- Full-resolution image licensing
- Authentication and OAuth
- Payments
- Admin dashboard
- PostgreSQL database
- Docker and Linux deployment
- CI/CD and production monitoring

## Current status

**Phase 1: Public photography experience (in progress).**

The Next.js frontend and NestJS backend are connected through working public photo endpoints.

Implemented:
- Public photo collection and individual photo pages.
- Category filtering through the API.
- Dynamic routes and internal navigation.
- Hardcoded photo metadata as temporary development data.

**Next:** DTO classes, Swagger/OpenAPI documentation, and PostgreSQL persistence.