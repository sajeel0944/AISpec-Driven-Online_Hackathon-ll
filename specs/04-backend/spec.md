# Feature Specification: Backend Service (FastAPI)

**Feature Branch**: `003-backend-service`  
**Created**: 2026-01-07  
**Status**: Draft  
**Input**: User description: "Implement FastAPI backend with JWT verification"

## User Scenarios & Testing *(mandatory)*

### User Story 1 – Secure Backend Access (Priority: P1)

Only authenticated users can access backend APIs.

**Independent Test**:  
Can be tested by enabling/disabling JWT.

**Acceptance Scenarios**:

1. **Given** valid JWT, **When** API is called, **Then** request succeeds.
2. **Given** invalid JWT, **When** API is called, **Then** 401 returned.

---

### Edge Cases

- JWT secret mismatch
- Clock skew causing expiry issues

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Backend MUST verify JWT on every request.
- **FR-002**: Backend MUST extract user_id from JWT.
- **FR-003**: Backend MUST filter queries by user_id.

### Key Entities

- **User**
- **Task**

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: No unauthorized backend access.
