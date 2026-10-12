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