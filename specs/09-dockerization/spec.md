# Feature Specification: Dockerization – Frontend & Backend

**Feature Branch**: `020-dockerization`
**Created**: 2026-02-07
**Status**: Draft
**Input**: User requirement to containerize frontend (Next.js) and backend (FastAPI) with Docker and orchestrate using Docker Compose

---

## Overview

This feature introduces full Docker-based containerization for both the frontend and backend services of the AI-powered Todo Chatbot application. A single `docker-compose.yml` file will orchestrate all services, ensure correct networking, and inject environment variables so the frontend can communicate with the backend reliably.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 – Run Entire App with One Command (Priority: P1)

As a developer, I want to run the frontend and backend together using Docker Compose so that local development and deployment are consistent.

**Why this priority**:
This enables reproducible environments and simplifies onboarding and deployment.

**Independent Test**:
Run `docker-compose up --build` and access the frontend in the browser.

**Acceptance Scenarios**:

1. **Given** Docker and Docker Compose are installed, **When** the developer runs `docker-compose up`, **Then** both frontend and backend containers start successfully.
2. **Given** containers are running, **When** the user opens the frontend URL, **Then** the frontend can communicate with the backend API.

---

### Edge Cases

* Backend container starts slower than frontend
* Incorrect environment variables passed to frontend
* Backend container crashes or restarts

---

## Requirements *(mandatory)*

### Functional Requirements

* **FR-001**: System MUST containerize the frontend using Docker.
* **FR-002**: System MUST containerize the backend using Docker.
* **FR-003**: System MUST provide a Docker Compose file to run all services together.
* **FR-004**: Frontend MUST receive backend host URL via environment variables.
* **FR-005**: Containers MUST communicate over an isolated Docker network.

---

## Frontend Docker Specification

### Technology

* Next.js
* TypeScript
* Tailwind CSS
* Node.js (LTS)

### Dockerfile Responsibilities

* Install dependencies
* Build Next.js application
* Expose frontend port (e.g. `3000`)
* Start production-ready server

### Environment Variables

* `NEXT_PUBLIC_API_BASE_URL`: Backend base URL (e.g. `http://backend:8000`)

---

## Backend Docker Specification

### Technology

* Python 3.11+
* FastAPI
* OpenAI Agents SDK

### Dockerfile Responsibilities

* Install Python dependencies
* Copy application source code
* Expose backend port (e.g. `8000`)
* Run FastAPI using a production server (e.g. Uvicorn)

### Environment Variables

* `OPENAI_API_KEY`
* `DATABASE_URL`
* `QDRANT_URL`
* `QDRANT_API_KEY`

---

## Docker Compose Specification

### Services

#### Frontend Service

* Builds from frontend Dockerfile
* Exposes port `3000`
* Depends on backend service
* Injects backend URL via environment variables

#### Backend Service

* Builds from backend Dockerfile
* Exposes port `8000`
* Provides API endpoints and streaming AI responses

### Networking

* All services run on a shared Docker network
* Frontend accesses backend using service name (`backend`)

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

* **SC-001**: Entire application runs using a single Docker Compose command.
* **SC-002**: Frontend successfully calls backend APIs via Docker network.
* **SC-003**: No hardcoded localhost URLs in production containers.

---

## Non-Goals

* Kubernetes deployment
* Auto-scaling
* CI/CD pipeline setup

---

## Notes

* This Docker setup must be usable for both local development and production-like environments.
* Secrets must be provided via environment variables, not hardcoded in images.
