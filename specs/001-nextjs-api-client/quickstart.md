# Quickstart: Reusable Next.js API Client

**Date**: 2026-01-05
**Feature**: [001-nextjs-api-client]

This guide provides instructions to quickly integrate and use the reusable API client within a Next.js application.

## Prerequisites

-   Node.js (LTS version recommended)
-   An existing Next.js project
-   A backend API that issues and validates JWT tokens, storing them in a client-side cookie named `jwt_token`.

## Installation

The API client will be implemented as a module within your Next.js project. You will likely need to install a library for cookie manipulation:

```bash
npm install js-cookie # or yarn add js-cookie
```

## Usage

### 1. Initialize the API Client

Import and initialize the API client with your backend's base URL. This is typically done once at the application's entry point or within a dedicated API service module.

```typescript
// utils/apiClient.ts (example path)
import axios from 'axios'; // or use native fetch
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = Cookies.get('jwt_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
```

### 2. Configure Base URL

The `baseURL` can be configured via environment variables (e.g., `.env.local` for `NEXT_PUBLIC_API_BASE_URL`) or directly when initializing the client.

### 3. Make Authenticated Requests

If a `jwt_token` cookie is present, the client will automatically attach it to the `Authorization` header.

```typescript
// pages/dashboard.tsx (example usage in a Next.js page)
import { useEffect, useState } from 'react';
import apiClient from '../utils/apiClient'; // Adjust path as necessary

interface UserProfile {
  id: number;
  name: string;
  email: string;
}

const DashboardPage = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiClient.get<UserProfile>('/profile');
        setProfile(response.data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch profile');
      }
    };
    fetchProfile();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>Loading profile...</div>;

  return (
    <div>
      <h1>Welcome, {profile.name}</h1>
      <p>Email: {profile.email}</p>
    </div>
  );
};

export default DashboardPage;
```

### 4. Make Unauthenticated Requests

If no `jwt_token` cookie is present, the `Authorization` header will simply be omitted.

```typescript
// pages/public-data.tsx
import { useEffect, useState } from 'react';
import apiClient from '../utils/apiClient';

interface PublicData {
  message: string;
}

const PublicDataPage = () => {
  const [data, setData] = useState<PublicData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPublicData = async () => {
      try {
        const response = await apiClient.get<PublicData>('/public');
        setData(response.data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch public data');
      }
    };
    fetchPublicData();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>Loading public data...</div>;

  return (
    <div>
      <h1>Public Data</h1>
      <p>{data.message}</p>
    </div>
  );
};

export default PublicDataPage;
```

### 5. Error Handling

The API client will expose standard Axios (or fetch) error handling mechanisms. It's recommended to implement centralized error handling or a robust `try-catch` block around API calls.

## Next Steps

-   Implement the actual API client in `frontend/src/api/` as per the `plan.md`.
-   Add comprehensive unit and integration tests.
