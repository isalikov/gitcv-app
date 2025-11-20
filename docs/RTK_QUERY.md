# RTK Query API Documentation

This document describes how to use the RTK Query API in the application.

## Overview

The application uses [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) for data fetching and caching. RTK Query provides:

- **Automatic caching** - Reduces unnecessary network requests
- **Automatic re-fetching** - Keeps data up-to-date
- **Type safety** - Full TypeScript support
- **Optimistic updates** - Better UX with instant feedback
- **Tag-based invalidation** - Smart cache management

## Store Setup

The application has two separate stores and API definitions for different contexts:

### Dashboard Store (Protected API)

Used in the Dashboard app with protected API endpoints (requires authentication):

```typescript
import { protectedStore } from './store';
import { Provider } from 'react-redux';

// Wrap Dashboard app with Provider
<Provider store={protectedStore}>
  <Dashboard />
</Provider>
```

The Dashboard store uses `protectedApi` which includes all routes that require authentication (behind `AuthMiddleware` in Go API).

### Landing Store (Public API)

Used in the Landing app with only public endpoints (no authentication required):

```typescript
import { publicStore } from './store';
import { Provider } from 'react-redux';

// Wrap Landing app with Provider
<Provider store={publicStore}>
  <Landing />
</Provider>
```

The Landing store uses `publicApi` which includes only public routes (no `AuthMiddleware` in Go API).

**Why two APIs?**

This structure mirrors the Go/Gin API router:

- **Public routes** (no `AuthMiddleware`): health check, auth endpoints, public resumes
- **Protected routes** (with `AuthMiddleware`): user management, resumes CRUD, AI generation, etc.

Benefits:

- Landing app has smaller bundle size (only includes public API)
- Clear separation prevents unauthorized API calls from Landing
- Type safety maintained for both contexts

## Using API Hooks

All API endpoints are exposed as React hooks that you can use in your components.

### Queries (GET requests)

Queries automatically fetch data when the component mounts and cache the results.

```typescript
import { useGetMeQuery } from '../store/api';

function Profile() {
  const { data, error, isLoading, refetch } = useGetMeQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{data.data.user.username}</h1>
      <button onClick={refetch}>Refresh</button>
    </div>
  );
}
```

### Mutations (POST, PATCH, DELETE)

Mutations are used for data modification operations.

```typescript
import { useCreateResumeMutation } from '../store/api';

function CreateResumeForm() {
  const [createResume, { isLoading, error }] = useCreateResumeMutation();

  const handleSubmit = async (formData) => {
    try {
      const result = await createResume(formData).unwrap();
      console.log('Resume created:', result);
    } catch (err) {
      console.error('Failed to create resume:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create Resume'}
      </button>
      {error && <div>Error: {error.message}</div>}
    </form>
  );
}
```

## Available Endpoints

### Public Endpoints (Landing App)

These endpoints are available in the Landing app and don't require authentication.
Import from `../store`:

```typescript
import {
  useGetPublicResumeQuery,
  useHealthCheckQuery,
  useLogoutMutation,
  useRefreshTokenMutation,
} from '../store';
```

#### Health Check

```typescript
const { data } = useHealthCheckQuery();
console.log('Status:', data.data.status); // "ok"
```

#### Authentication

```typescript
// Refresh access token
const [refreshToken] = useRefreshTokenMutation();
await refreshToken({ refresh_token: 'token' });

// Logout
const [logout] = useLogoutMutation();
await logout({ refresh_token: 'token' });
```

#### Public Resumes

```typescript
// Get public resume by slug (no auth required)
const { data } = useGetPublicResumeQuery('john-doe-resume');
```

---

### Protected Endpoints (Dashboard App)

All endpoints below require authentication and are only available in the Dashboard app.
Import from `../store`:

```typescript
import {
  useCreateResumeMutation,
  useCreateSkillMutation,
  useDeleteResumeMutation,
  useGenerateAboutMutation,
  useGenerateResumePDFMutation,
  useGetMeQuery,
  useGetResumeQuery,
  useGetResumesQuery,
  useGetSessionsQuery,
  useGetSkillsQuery,
  useRevokeSessionMutation,
  useSyncMeMutation,
  useSyncRepositoryMutation,
  useUpdateMeMutation,
  useUpdateResumeMutation,
} from '../store';
```

#### User/Me

```typescript
// Get current user data
const { data } = useGetMeQuery();

// Update user profile
const [updateMe] = useUpdateMeMutation();
await updateMe({ email: 'new@email.com' });

// Sync user data from GitHub
const [syncMe] = useSyncMeMutation();
await syncMe();
```

### Resumes

```typescript
// Get all resumes
const { data } = useGetResumesQuery();

// Get single resume
const { data } = useGetResumeQuery(resumeId);

// Create resume
const [createResume] = useCreateResumeMutation();
await createResume({
  title: 'My Resume',
  full_name: 'John Doe',
  // ... other fields
});

// Update resume
const [updateResume] = useUpdateResumeMutation();
await updateResume({
  id: resumeId,
  data: { title: 'Updated Title' }
});

// Delete resume
const [deleteResume] = useDeleteResumeMutation();
await deleteResume(resumeId);

// Generate PDF
const [generatePDF] = useGenerateResumePDFMutation();
const result = await generatePDF({
  id: resumeId,
  data: { template: 'modern' }
});
console.log('Download URL:', result.download_url);
```

### AI Generation

```typescript
// Generate "About" section using AI
const [generateAbout] = useGenerateAboutMutation();
const result = await generateAbout({
  repository_ids: [123, 456],
  job_description: 'Senior Backend Developer',
  user_note: 'Focus on microservices experience',
});
console.log('Generated text:', result.data.about);
```

### Repositories

```typescript
// Sync repository details from GitHub
const [syncRepo] = useSyncRepositoryMutation();
await syncRepo(githubRepoId);
```

### Skills

```typescript
// Get all skills (with optional search)
const { data } = useGetSkillsQuery({ q: 'react' });
const { data: allSkills } = useGetSkillsQuery();

// Create new skill
const [createSkill] = useCreateSkillMutation();
await createSkill({ name: 'TypeScript' });
```

### Sessions

```typescript
// Get all active sessions
const { data } = useGetSessionsQuery();

// Revoke a session
const [revokeSession] = useRevokeSessionMutation();
await revokeSession({ refresh_token: 'token' });
```

## Advanced Usage

### Skip Queries

Skip a query until a condition is met:

```typescript
const { data } = useGetResumeQuery(resumeId, {
  skip: !resumeId, // Don't fetch if no ID
});
```

### Polling

Automatically refetch data at intervals:

```typescript
const { data } = useGetMeQuery(undefined, {
  pollingInterval: 30000, // Refetch every 30 seconds
});
```

### Manual Cache Invalidation

```typescript
import { protectedApi, useProtectedAppDispatch } from '../store';

function Component() {
  const dispatch = useProtectedAppDispatch();

  const invalidateCache = () => {
    // Invalidate specific tags
    dispatch(protectedApi.util.invalidateTags(['Resumes']));
  };

  return <button onClick={invalidateCache}>Refresh Data</button>;
}
```

### Optimistic Updates

```typescript
const [updateResume] = useUpdateResumeMutation();

await updateResume(
  {
    id: resumeId,
    data: { title: 'New Title' },
  },
  {
    // Optimistically update the cache
    fixedCacheKey: `resume-${resumeId}`,
    optimisticUpdate: {
      queryFulfilled: () => {
        // Update runs immediately
      },
    },
  },
);
```

### Prefetching

Prefetch data before it's needed:

```typescript
import { protectedApi, useProtectedAppDispatch } from '../store';

function ResumesList() {
  const dispatch = useProtectedAppDispatch();

  const handleMouseEnter = (resumeId: number) => {
    // Prefetch resume details on hover
    dispatch(protectedApi.endpoints.getResume.initiate(resumeId));
  };

  return (
    <div>
      {resumes.map((resume) => (
        <div
          key={resume.id}
          onMouseEnter={() => handleMouseEnter(resume.id)}
        >
          {resume.title}
        </div>
      ))}
    </div>
  );
}
```

## Cache Tags

The API uses the following tags for cache invalidation:

- `Me` - User profile data
- `Resumes` - List of all resumes
- `Resume` - Individual resume (by ID)
- `Skills` - List of skills
- `Sessions` - Active sessions
- `Repositories` - User repositories

When a mutation is performed, related tags are automatically invalidated, triggering refetches of affected queries.

### Tag Relationships

| Mutation         | Invalidates Tags          |
| ---------------- | ------------------------- |
| `updateMe`       | `Me`                      |
| `syncMe`         | `Me`, `Repositories`      |
| `createResume`   | `Resumes`, `Me`           |
| `updateResume`   | `Resume`, `Resumes`, `Me` |
| `deleteResume`   | `Resume`, `Resumes`, `Me` |
| `syncRepository` | `Repositories`, `Me`      |
| `createSkill`    | `Skills`                  |
| `logout`         | `Me`, `Sessions`          |
| `revokeSession`  | `Sessions`                |

## Error Handling

RTK Query errors follow this structure:

```typescript
interface ApiError {
  success: false;
  message: string;
  error: string;
}
```

Handle errors in components:

```typescript
const { data, error } = useGetMeQuery();

if (error) {
  // error.message contains the error message
  // error.error contains the error type
  console.error('Error:', error.message);
}
```

## TypeScript Support

All endpoints are fully typed. TypeScript will:

- Infer request payload types
- Infer response data types
- Catch type errors at compile time
- Provide autocomplete in your IDE

```typescript
// TypeScript knows the shape of the data
const { data } = useGetMeQuery();
//      ^? MeResponse

// TypeScript validates the payload
const [createResume] = useCreateResumeMutation();
await createResume({
  title: 'My Resume', // ✅ Required field
  full_name: 'John', // ✅ Required field
  invalid: 'field', // ❌ Type error - unknown field
});
```

## Best Practices

1. **Use hooks at the component level** - Don't call hooks conditionally
2. **Handle loading states** - Always show loading indicators
3. **Handle errors gracefully** - Show user-friendly error messages
4. **Use skip option** - Skip queries when conditions aren't met
5. **Leverage caching** - Queries with same arguments share cache
6. **Invalidate carefully** - Only invalidate tags that need updating
7. **Use optimistic updates** - For better perceived performance
8. **Prefetch when possible** - Load data before it's needed

## Examples

### Complete CRUD Example

```typescript
import {
  useGetResumesQuery,
  useCreateResumeMutation,
  useUpdateResumeMutation,
  useDeleteResumeMutation,
} from '../store/api';

function ResumesManager() {
  const { data: resumes, isLoading } = useGetResumesQuery();
  const [createResume] = useCreateResumeMutation();
  const [updateResume] = useUpdateResumeMutation();
  const [deleteResume] = useDeleteResumeMutation();

  const handleCreate = async () => {
    await createResume({
      title: 'New Resume',
      full_name: 'John Doe',
    });
  };

  const handleUpdate = async (id: number) => {
    await updateResume({
      id,
      data: { title: 'Updated Title' }
    });
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure?')) {
      await deleteResume(id);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <button onClick={handleCreate}>Create Resume</button>
      {resumes?.data.map((resume) => (
        <div key={resume.id}>
          <h3>{resume.title}</h3>
          <button onClick={() => handleUpdate(resume.id)}>Edit</button>
          <button onClick={() => handleDelete(resume.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
```

## Testing

Mock RTK Query hooks in tests:

### Testing Protected API (Dashboard)

```typescript
import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { protectedApi, useGetMeQuery } from '../store';

// Create test store
const testStore = configureStore({
  reducer: {
    [protectedApi.reducerPath]: protectedApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(protectedApi.middleware),
});

// Wrap component in Provider
const wrapper = ({ children }) => (
  <Provider store={testStore}>{children}</Provider>
);

// Test the hook
const { result } = renderHook(() => useGetMeQuery(), { wrapper });
```

### Testing Public API (Landing)

```typescript
import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { publicApi, useGetPublicResumeQuery } from '../store';

// Create test store
const testStore = configureStore({
  reducer: {
    [publicApi.reducerPath]: publicApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(publicApi.middleware),
});

// Wrap component in Provider
const wrapper = ({ children }) => (
  <Provider store={testStore}>{children}</Provider>
);

// Test the hook
const { result } = renderHook(() => useGetPublicResumeQuery('slug'), { wrapper });
```
