# Data Models: Reusable Next.js API Client

**Date**: 2026-01-05
**Feature**: [001-nextjs-api-client]

This document defines the key data structures and interfaces relevant to the API client's operation, including its configuration, request/response patterns, and token handling.

## 1. API Client Configuration

Represents the settings required to initialize and operate the API client.

-   **Fields**:
    -   `baseURL`: String, non-nullable. The base URL for all API requests made through this client instance (e.g., `https://api.example.com/v1`).

## 2. Request Parameters

Represents the parameters for making an API request.

-   **Fields**:
    -   `method`: String, non-nullable (e.g., `GET`, `POST`, `PUT`, `DELETE`, `PATCH`).
    -   `path`: String, non-nullable. The endpoint path relative to the `baseURL` (e.g., `/users/123`).
    -   `headers`: Optional object, where keys are header names (string) and values are header values (string). Includes `Authorization` header when a JWT is present.
    -   `body`: Optional object/string. The request payload for `POST`, `PUT`, `PATCH` requests.
    -   `params`: Optional object. Query parameters for the request.

## 3. Response Structure

Represents the typical structure of an API response.

-   **Fields**:
    -   `status`: Number, non-nullable. HTTP status code (e.g., `200`, `404`, `500`).
    -   `headers`: Object, non-nullable. Response headers.
    -   `data`: Optional object/string. The response payload.
    -   `error`: Optional object. Error details in case of a failed request.

## 4. JWT Token

Represents the JSON Web Token used for authentication.

-   **Fields**:
    -   `token`: String, non-nullable. The actual JWT string.

-   **Storage**: Client-side cookie, named `jwt_token` as per `FR-001`.
