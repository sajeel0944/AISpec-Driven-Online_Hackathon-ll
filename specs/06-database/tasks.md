---

description: "Task list for Database (Neon PostgreSQL) feature implementation"
---

# Tasks: Database (Neon PostgreSQL)

**Input**: Design documents from `/specs/06-database/`
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

**Purpose**: Configure database connectivity for Neon PostgreSQL.
*Assumes general project setup is complete.*

- [ ] T001 Install `asyncpg` (or `psycopg2-binary`) in `backend/` for PostgreSQL connectivity
- [ ] T002 Configure database connection string (e.g., `DATABASE_URL`) in `backend/.env`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish core database interaction and migration framework.
*Assumes SQLModel is already installed.*

- [ ] T003 Define `Base` for SQLModel models and database engine in `backend/src/db/base.py`
- [ ] T004 Implement dependency for managing database sessions in `backend/src/dependencies.py`
- [ ] T005 Initialize Alembic for database migrations in `backend/`
- [ ] T006 [P] Ensure `User` model (`backend/src/models/user.py`) has `id` as primary key and any required relationships (from 02-authentication plan)
- [ ] T007 [P] Define `Task` model with `id`, `title`, `description`, `completed`, `created_at`, `updated_at`, and `user_id` linked to `User` model (foreign key) in `backend/src/models/task.py`

**Checkpoint**: Core database interaction framework and models ready.

---

## Phase 3: User Story 1 - Persist User Tasks (Priority: P1) 🎯 MVP

**Goal**: A user's tasks must be stored persistently across application restarts.

**Independent Test**: Can be tested by creating task, verifying in DB, and re-fetching after app restart.

### Tests for User Story 1

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T008 [P] [US1] Write unit tests for `Task` model definition and relationships in `backend/tests/models/test_task.py`
- [ ] T009 [P] [US1] Write integration tests for database connection and session management in `backend/tests/db/test_connection.py`
- [ ] T010 [P] [US1] Write integration tests for task CRUD operations via SQLModel with data persistence verification in `backend/tests/services/test_task_persistence.py`
- [ ] T011 [P] [US1] Write integration test to verify data integrity rules (e.g., foreign key constraints) in `backend/tests/db/test_data_integrity.py`

### Implementation for User Story 1

- [ ] T012 [US1] Create initial Alembic migration script for `User` and `Task` tables in `backend/alembic/versions/`
- [ ] T013 [US1] Apply the database migration to create tables
- [ ] T014 [US1] Implement `create_task`, `get_tasks`, `get_task`, `update_task`, `delete_task` methods in `backend/src/services/task_service.py` using SQLModel sessions
- [ ] T015 [US1] Ensure all task operations enforce user ownership by filtering queries with `user_id` in `backend/src/services/task_service.py`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Enhance database performance, reliability, and maintainability.

- [ ] TXXX [P] Implement connection pooling for database connections in `backend/src/db/session.py`
- [ ] TXXX Add robust error handling for database-related exceptions (e.g., connection errors, integrity errors)
- [ ] TXXX Implement database indexing strategies for frequently queried columns (e.g., `user_id` on `tasks` table)
- [ ] TXXX Setup database monitoring and logging for slow queries and errors
- [ ] TXXX Develop a database backup and restore strategy
- [ ] TXXX Review and optimize ORM queries to prevent N+1 issues and improve performance

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

- **User Story 1 (P1)**: Can start after Foundational (Phase 2). Relies on `User` model from `02-authentication`.

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Model definitions before service implementations
- Migration scripts before applying to database
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- Foundational tasks (e.g., `User` and `Task` model definitions) can be parallelized.
- All tests for User Story 1 marked [P] can run in parallel.
- Task service CRUD methods can be developed in parallel (if independent).

---

## Parallel Example: User Story 1 (Persist User Tasks)

```bash
# Developer A (Database Models and Migrations):
- [ ] T006 [P] Ensure `User` model (`backend/src/models/user.py`) has `id` as primary key and any required relationships
- [ ] T007 [P] Define `Task` model with `id`, `title`, `description`, `completed`, `created_at`, `updated_at`, and `user_id` linked to `User` model (foreign key) in `backend/src/models/task.py`
- [ ] T012 [US1] Create initial Alembic migration script for `User` and `Task` tables in `backend/alembic/versions/`

# Developer B (Service Implementation and Testing):
- [ ] T008 [P] [US1] Write unit tests for `Task` model definition and relationships in `backend/tests/models/test_task.py`
- [ ] T014 [US1] Implement `create_task`, `get_tasks`, `get_task`, `update_task`, `delete_task` methods in `backend/src/services/task_service.py` using SQLModel sessions
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
3. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: Focus on defining models and migration
   - Developer B: Focus on service implementation and testing
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
