# Tasks: Dockerization

**Input**: Design documents from `specs/09-dockerization/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `backend/src/`, `frontend/src/`
- Paths shown below assume single project - adjust based on plan.md structure

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create initial Dockerfiles and `docker-compose.yaml` file.

- [ ] T001 Create `Dockerfile` for the `frontend` service in `frontend/Dockerfile`.
- [ ] T002 Create `Dockerfile` for the `backend` service in `backend/Dockerfile`.
- [ ] T003 Create `docker-compose.yaml` in the project root.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Configure Dockerfiles and `docker-compose.yaml` for both services to be runnable and communicate.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T004 Configure `frontend/Dockerfile` to install dependencies, build Next.js application, expose port `3000`, and start the production-ready server (`frontend/Dockerfile`).
- [ ] T005 Configure `backend/Dockerfile` to install Python dependencies, copy application source code, expose port `8000`, and run FastAPI using a production server (e.g., Uvicorn) (`backend/Dockerfile`).
- [ ] T006 Define `frontend` service in `docker-compose.yaml`, specifying build context (`./frontend`), port mapping (`3000:3000`), environment variables (`NEXT_PUBLIC_API_BASE_URL`), and `depends_on` the `backend` service (`docker-compose.yaml`).
- [ ] T007 Define `backend` service in `docker-compose.yaml`, specifying build context (`./backend`), port mapping (`8000:8000`), and placeholder environment variables (`OPENAI_API_KEY`, `DATABASE_URL`, `QDRANT_URL`, `QDRANT_API_KEY`) (`docker-compose.yaml`).
- [ ] T008 Define a shared Docker network for `frontend` and `backend` services in `docker-compose.yaml` (`docker-compose.yaml`).
- [ ] T009 Update `NEXT_PUBLIC_API_BASE_URL` in `docker-compose.yaml` for the `frontend` service to `http://backend:8000` to enable inter-service communication (`docker-compose.yaml`).

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Run Entire App with One Command (Priority: P1) 🎯 MVP

**Goal**: To run the frontend and backend together using Docker Compose so that local development and deployment are consistent.

**Independent Test**: Run `docker-compose up --build` and access the frontend in the browser.

### Implementation for User Story 1

- [ ] T010 [US1] Execute `docker-compose up --build` from the project root and verify that both the frontend and backend containers start successfully.
- [ ] T011 [US1] Access the frontend application in a web browser (e.g., `http://localhost:3000`) and verify that the UI loads without errors.
- [ ] T012 [US1] Interact with the application to perform an action that requires frontend-backend communication (e.g., create a todo, send a chat message) and verify that API calls are successful.
- [ ] T013 [US1] Inspect container logs or network requests to confirm that the frontend is communicating with the backend using the Docker service name (`backend`) and that no hardcoded `localhost` URLs are used.

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Enhance usability and documentation for the Dockerized application.

- [ ] T014 Add a new section to the project's main `README.md` (at the root level) explaining how to set up and run the application using Docker Compose, including prerequisites and key commands.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational phase completion
- **Polish (Phase 4)**: Depends on User Story 1 completion

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories

### Within Each User Story

- Implementation tasks should generally follow a logical order (e.g., file creation before content, configuration before testing).

### Parallel Opportunities

- Tasks within Phase 1 (`T001`, `T002`, `T003`) can be initiated in parallel.
- Tasks within Phase 2 (`T004` to `T009`) can have some parallel aspects, especially `Dockerfile` configurations and initial `docker-compose.yaml` structure, but interdependencies (like network definition before service definition) should be respected.

---

## Parallel Example: Foundational Phase

```bash
# While T004 is configuring frontend/Dockerfile:
# T005 can configure backend/Dockerfile concurrently.

# Once T003 (docker-compose.yaml creation) is done, T006, T007, T008, T009 can be built up concurrently
# (e.g. one dev sets up frontend service, another backend service, another network, and updates env vars).
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Proceed to Polish phase.

---

## Notes

- Tasks are specific and include file paths for clarity.
- Each user story is designed to be independently completable and testable.
- Verification steps are integrated into User Story 1.
