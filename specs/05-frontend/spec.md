# Feature Specification: Frontend Application (Next.js)

**Feature Branch**: `004-frontend-application`  
**Created**: 2026-01-07  
**Status**: Draft  
**Input**: User description: "Build responsive frontend using Next.js App Router"

## User Scenarios & Testing *(mandatory)*

### User Story 1 – Use Web UI (Priority: P1)

A user wants to manage tasks using a responsive web interface.

**Independent Test**:  
Can be tested via browser on mobile and desktop.

**Acceptance Scenarios**:

1. **Given** authenticated user, **When** accessing dashboard, **Then** tasks are visible.
2. **Given** unauthenticated user, **When** accessing protected route, **Then** redirected to signin.

---

### Edge Cases

- Network failure
- API returns 401

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Frontend MUST use Next.js App Router.
- **FR-002**: Frontend MUST attach JWT to API requests.
- **FR-003**: UI MUST be responsive.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: UI works across devices.
