---

description: "Task list for REST API Endpoints feature implementation"
---

# Tasks: REST API Endpoints

**Input**: Design documents from `/specs/03-api/`
**Prerequisites**: plan.md (required), spec.md (required for user stories)

**Tests**: Test tasks are included to ensure a test-first approach.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `backend/src/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Ensure necessary dependencies for API implementation are in place.
*Assumes general project setup and core authentication setup are complete.*

- [ ] T001 Ensure SQLModel and Uvicorn are installed in `backend/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Implement core data model and service for tasks.
*Assumes database connection and migration setup are complete.*

- [ ] T002 [P] Define `Task` model with `user_id` foreign key in `backend/src/models/task.py`
- [ ] T003 Implement `TaskService` for CRUD operations on tasks in `backend/src/services/task_service.py`
- [ ] T004 Apply database migrations to create `tasks` table

**Checkpoint**: Foundational task service ready

---

## Phase 3: User Story 1 - Access Task APIs (Priority: P1) 🎯 MVP

**Goal**: A user wants to manage tasks using REST APIs.

**Independent Test**: Can be tested using Postman or curl with JWT.

### Tests for User Story 1

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T005 [P] [US1] Write unit tests for `Task` model in `backend/tests/models/test_task.py`
- [ ] T006 [P] [US1] Write unit tests for `TaskService` CRUD operations in `backend/tests/services/test_task_service.py`
- [ ] T007 [P] [US1] Write integration tests for creating a task with valid JWT in `backend/tests/api/test_tasks.py`
- [ ] T008 [P] [US1] Write integration tests for accessing tasks without JWT (expect 401) in `backend/tests/api/test_tasks.py`
- [ ] T009 [P] [US1] Write integration tests for reading, updating, and deleting tasks with valid JWT in `backend/tests/api/test_tasks.py`
- [ ] T010 [P] [US1] Write integration tests for cross-user task access (expect denial) in `backend/tests/api/test_tasks.py`

### Implementation for User Story 1

- [ ] T011 [P] [US1] Create FastAPI router for task endpoints (`/tasks`) in `backend/src/api/tasks.py`
- [ ] T012 [US1] Implement endpoint for creating a task (`POST /tasks`) in `backend/src/api/tasks.py`
- [ ] T013 [US1] Implement endpoint for listing all tasks for the authenticated user (`GET /tasks`) in `backend/src/api/tasks.py`
- [ ] T014 [US1] Implement endpoint for retrieving a single task (`GET /tasks/{task_id}`) in `backend/src/api/tasks.py`
- [ ] T015 [US1] Implement endpoint for updating a task (`PUT /tasks/{task_id}`) in `backend/src/api/tasks.py`
- [ ] T016 [US1] Implement endpoint for deleting a task (`DELETE /tasks/{task_id}`) in `backend/src/api/tasks.py`
- [ ] T017 [US1] Integrate JWT authentication dependency with all task endpoints in `backend/src/api/tasks.py`
- [ ] T018 [US1] Ensure task queries are filtered by `user_id` extracted from JWT in `backend/src/services/task_service.py` and `backend/src/api/tasks.py`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect API quality and security

- [ ] TXXX [P] Generate/Update OpenAPI documentation for task APIs in `backend/docs/openapi.json`
- [ ] TXXX Implement comprehensive input validation for all task API request bodies in `backend/src/schemas/task.py`
- [ ] TXXX Enhance error handling for API endpoints (e.g., custom error responses for 404 Not Found, 400 Bad Request)
- [ ] TXXX Implement rate limiting on task API endpoints (if not already done in 02-authentication)
- [ ] TXXX Add logging for all API operations and errors in `backend/src/main.py`
- [ ] TXXX Review and optimize database queries for task operations

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories. Requires authentication framework from `02-authentication`.

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, User Story 1 can begin.
- All tests for User Story 1 marked [P] can run in parallel
- Different API endpoints within a story marked [P] can be developed in parallel (if independent)

---

## Parallel Example: User Story 1

```bash
# Developer A (Backend - Core API Endpoints):
- [ ] T011 [P] [US1] Create FastAPI router for task endpoints (`/tasks`) in `backend/src/api/tasks.py`
- [ ] T012 [US1] Implement endpoint for creating a task (`POST /tasks`) in `backend/src/api/tasks.py`
- [ ] T013 [US1] Implement endpoint for listing all tasks for the authenticated user (`GET /tasks`) in `backend/src/api/tasks.py`

# Developer B (Backend - Remaining API Endpoints and Authentication Integration):
- [ ] T014 [US1] Implement endpoint for retrieving a single task (`GET /tasks/{task_id}`) in `backend/src/api/tasks.py`
- [ ] T015 [US1] Implement endpoint for updating a task (`PUT /tasks/{task_id}`) in `backend/src/api/tasks.py`
- [ ] T016 [US1] Implement endpoint for deleting a task (`DELETE /tasks/{task_id}`) in `backend/src/api/tasks.py`
- [ ] T017 [US1] Integrate JWT authentication dependency with all task endpoints in `backend/src/api/tasks.py`
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
2. Add User Story 1 → Test independently → Deploy/Demo
3. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (API creation, initial endpoints)
   - Developer B: User Story 1 (API authentication, remaining endpoints)
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
