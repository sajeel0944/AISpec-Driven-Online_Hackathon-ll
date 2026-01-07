---

description: "Task list for Backend Service (FastAPI) feature implementation"
---

# Tasks: Backend Service (FastAPI)

**Input**: Design documents from `/specs/04-backend/`
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

**Purpose**: Ensure JWT secret is securely configured for the backend.
*Assumes general project setup (Phase 1 from 01-overview) and authentication dependencies (Phase 1 from 02-authentication) are complete.*

- [ ] T001 Ensure `BETTER_AUTH_SECRET` is loaded securely as an environment variable in FastAPI app startup (e.g., `backend/src/config.py`)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Implement the core mechanism for JWT verification and user ID extraction.
*Assumes authentication service and user model are available from 02-authentication.*

- [ ] T002 Implement FastAPI dependency `get_current_user` to verify JWT, extract `user_id`, and return `User` object in `backend/src/dependencies.py`
- [ ] T003 Ensure database session dependency is available for all API routes (e.g., in `backend/src/dependencies.py`)

**Checkpoint**: Foundational JWT verification and user access ready

---

## Phase 3: User Story 1 - Secure Backend Access (Priority: P1) 🎯 MVP

**Goal**: Only authenticated users can access backend APIs, and their actions are limited to their own data.

**Independent Test**: Can be tested by calling backend APIs with valid/invalid/missing JWT.

### Tests for User Story 1

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T004 [P] [US1] Write unit tests for `get_current_user` dependency (valid/invalid/expired token) in `backend/tests/dependencies/test_auth_dependency.py`
- [ ] T005 [P] [US1] Write integration tests for a sample protected API endpoint (e.g., `GET /tasks`) with a valid JWT in `backend/tests/api/test_secure_access.py`
- [ ] T006 [P] [US1] Write integration tests for a sample protected API endpoint with an invalid/missing JWT (expect 401 Unauthorized) in `backend/tests/api/test_secure_access.py`
- [ ] T007 [P] [US1] Write integration tests for a task API endpoint to verify user isolation (attempt to access another user's task, expect 403 Forbidden or 404 Not Found) in `backend/tests/api/test_user_isolation.py`

### Implementation for User Story 1

- [ ] T008 [US1] Apply `Depends(get_current_user)` to all existing and new protected API routes (e.g., in `backend/src/api/tasks.py`, `backend/src/api/users.py`)
- [ ] T009 [US1] Modify task CRUD operations in `backend/src/services/task_service.py` to accept `user_id` and filter all queries by it
- [ ] T010 [US1] Update API endpoints in `backend/src/api/tasks.py` to pass the authenticated `user_id` to `TaskService` methods

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Refine security features and backend robustness.

- [ ] TXXX [P] Implement custom error messages for 401/403 responses to improve API consumer experience
- [ ] TXXX Add logging for all unauthorized access attempts and security-related events
- [ ] TXXX Implement global exception handling for authentication and authorization errors in `backend/src/main.py`
- [ ] TXXX Review and harden JWT token handling (e.g., blacklist for invalidated tokens, if applicable)
- [ ] TXXX Update API documentation to clearly state authentication requirements and expected error responses
- [ ] TXXX Perform a security review of the backend service (manual or automated static analysis)

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

- **User Story 1 (P1)**: Can start after Foundational (Phase 2). Requires authentication setup from `02-authentication` and task API endpoints from `03-api`.

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Logic for user ID extraction/verification before applying to routes
- Filtering logic in services before applying to API endpoints
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel (if multiple config values needed)
- Foundational tasks can be developed in parallel (e.g., `get_current_user` and database session setup)
- All tests for User Story 1 marked [P] can run in parallel
- Applying dependencies to different API endpoints can be parallelized

---

## Parallel Example: User Story 1 (Backend Secure Access)

```bash
# Developer A (Backend - Core Security Logic):
- [ ] T004 [P] [US1] Write unit tests for `get_current_user` dependency (valid/invalid/expired token) in `backend/tests/dependencies/test_auth_dependency.py`
- [ ] T008 [US1] Apply `Depends(get_current_user)` to all existing and new protected API routes (e.g., `backend/src/api/tasks.py`)

# Developer B (Backend - Data Isolation and Testing):
- [ ] T007 [P] [US1] Write integration tests for a task API endpoint to verify user isolation (attempt to access another user's task, expect 403 Forbidden or 404 Not Found) in `backend/tests/api/test_user_isolation.py`
- [ ] T009 [US1] Modify task CRUD operations in `backend/src/services/task_service.py` to accept `user_id` and filter all queries by it
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery (Recommended for Security)

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo
3. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: Implements core JWT verification and applies to routes
   - Developer B: Implements user isolation logic in services and tests
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
