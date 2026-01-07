# Feature Specification: Security & User Isolation

**Feature Branch**: `006-security`  
**Created**: 2026-01-07  
**Status**: Draft  
**Input**: User description: "Secure APIs using JWT and enforce user isolation"

## User Scenarios & Testing *(mandatory)*

### User Story 1 – Data Isolation (Priority: P1)

Users must only access their own data.

**Independent Test**:  
Can be tested by cross-user access attempt.

**Acceptance Scenarios**:

1. **Given** another user's task ID, **When** accessed, **Then** request is denied.

---

### Edge Cases

- Token tampering
- Replay attacks

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: All endpoints MUST require JWT.
- **FR-002**: Shared secret MUST be read from `BETTER_AUTH_SECRET`.
- **FR-003**: User ownership MUST be enforced on every operation.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Zero cross-user data leaks.
