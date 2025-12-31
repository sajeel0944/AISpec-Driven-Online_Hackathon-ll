<!--
Sync Impact Report:
Version change: N/A -> 1.0.0
List of modified principles:
  - [PROJECT_NAME] -> Todo App
  - [PRINCIPLE_1_NAME] -> I. Spec-Driven Development (SDD)
  - [PRINCIPLE_2_NAME] -> II. Test-First & Quality Assurance
  - [PRINCIPLE_3_NAME] -> III. Cloud-Native & Scalable Architecture
  - [PRINCIPLE_4_NAME] -> IV. AI Agent Integration
  - [PRINCIPLE_5_NAME] -> V. Document Everything (PHR & ADR)
  - [PRINCIPLE_6_NAME] -> VI. Incremental & Iterative Development
Added sections:
  - System Architecture
  - Development Practices
Removed sections: N/A
Templates requiring updates:
  - .specify/templates/plan-template.md: ⚠ pending (manual check needed)
  - .specify/templates/spec-template.md: ⚠ pending (manual check needed)
  - .specify/templates/tasks-template.md: ⚠ pending (manual check needed)
  - .claude/commands/*.md: ⚠ pending (manual check needed)
Follow-up TODOs: N/A
-->
# Todo App Constitution
<!-- Example: Spec Constitution, TaskFlow Constitution, etc. -->

## Core Principles

### I. Spec-Driven Development (SDD)
<!-- Example: I. Library-First -->
All development begins with clear, documented specifications (specs) and plans, ensuring a structured approach.

### II. Test-First & Quality Assurance
<!-- Example: II. CLI Interface -->
Implementation must follow a test-first approach. All features require comprehensive unit and integration tests to ensure correctness and maintainability.

### III. Cloud-Native & Scalable Architecture
<!-- Example: III. Test-First (NON-NEGOTIABLE) -->
Design and implement features with cloud-native principles, leveraging serverless, event-driven, and containerized solutions for scalability and resilience.

### IV. AI Agent Integration
<!-- Example: IV. Integration Testing -->
Proactively design for AI agent integration to enable intelligent features, automation, and enhanced developer workflows.

### V. Document Everything (PHR & ADR)
<!-- Example: V. Observability, VI. Versioning & Breaking Changes, VII. Simplicity -->
Capture all critical information through Prompt History Records (PHRs) for every interaction and Architectural Decision Records (ADRs) for significant architectural choices.

### VI. Incremental & Iterative Development


Build features progressively from MVP to advanced, ensuring a continuous delivery of value and adaptability to evolving requirements.

## System Architecture
<!-- Example: Additional Constraints, Security Requirements, Performance Standards, etc. -->

The application utilizes a multi-tier architecture:
- Frontend: Next.js (React-based framework, TypeScript, Tailwind CSS, React Hook Form, Framer Motion)
- Backend: FastAPI (Python 3.13+, UV, SQLModel)
- Database: Neon Serverless PostgreSQL
- Eventing: Kafka + Dapr (for Event-Driven Architecture)
<!-- Example: Technology stack requirements, compliance standards, deployment policies, etc. -->

## Development Practices
<!-- Example: Development Workflow, Review Process, Quality Gates, etc. -->

- AI Agent Integration: OpenAI Agents SDK and Model Context Protocol (MCP) SDK are used for smart task recommendations, automatic prioritization, and natural language task creation.
- Event-Driven Architecture: Leveraging Kafka and Dapr for task creation, updates, completion events, and reminder notifications.
- Deployment: Docker, Kubernetes, Minikube, and Helm Charts for containerization and orchestration.
<!-- Example: Code review requirements, testing gates, deployment approval process, etc. -->

## Governance
<!-- Example: Constitution supersedes all other practices; Amendments require documentation, approval, migration plan -->

- Authoritative Source Mandate: Prioritize MCP tools and CLI commands for information gathering and task execution.
- Explicit ADR Suggestions: Architectural decisions meeting impact, alternatives, and scope criteria will prompt ADR documentation.
- Human as Tool Strategy: User intervention will be requested for ambiguous requirements, unforeseen dependencies, or architectural uncertainties.
- Default Policies: Clarify and plan first, do not invent APIs, never hardcode secrets, prefer smallest viable diff, cite existing code.
- Execution Contract: Every request includes confirmation of surface/success, listed constraints/non-goals, artifact production with acceptance checks, and follow-ups/risks.
<!-- Example: All PRs/reviews must verify compliance; Complexity must be justified; Use [GUIDANCE_FILE] for runtime development guidance -->

**Version**: 1.0.0 | **Ratified**: 2025-12-24 | **Last Amended**: 2025-12-24
