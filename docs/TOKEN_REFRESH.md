# Token Refresh Logic

This document describes the automatic token refresh mechanism implemented in RTK Query.

## Overview

The application automatically refreshes the access token when it expires, ensuring uninterrupted API access without requiring the user to re-authenticate.

## Implementation

### baseQuery (`src/store/baseQuery.ts`)

The token refresh logic is implemented at the `baseQuery` level, which means **all RTK Query requests** automatically benefit from this mechanism.

#### How it works:

1. **Initial Request**: A request is made to a protected endpoint with the current access token
2. **401 Detection**: If the server responds with `401 Unauthorized`, the baseQuery intercepts this error
3. **Token Refresh**: The baseQuery attempts to refresh the access token using the refresh token
4. **Retry**: If refresh succeeds, the original request is automatically retried with the new access token
5. **Logout on Failure**: If refresh fails, tokens are cleared and user is redirected to the login page

### Flow Diagram

```
┌──────────────────────┐
│  RTK Query Request   │
│  (with access_token) │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│   API Response 401   │
│   (Token expired)    │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────────────┐
│  Check if /auth/refresh?     │
│  (avoid infinite loop)       │
└──────┬───────────────────────┘
       │ No
       ▼
┌──────────────────────────────┐
│  Get refresh_token from      │
│  localStorage                │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│  POST /auth/refresh          │
│  with refresh_token          │
└──────┬───────────────────────┘
       │
       ├─ Success ──────────┐
       │                    ▼
       │         ┌────────────────────────┐
       │         │ Save new access_token  │
       │         │ to localStorage        │
       │         └──────┬─────────────────┘
       │                │
       │                ▼
       │         ┌────────────────────────┐
       │         │ Retry original request │
       │         │ with new token         │
       │         └──────┬─────────────────┘
       │                │
       │                ▼
       │         ┌────────────────────────┐
       │         │ Return successful data │
       │         └────────────────────────┘
       │
       └─ Failure ─────────┐
                           ▼
                ┌────────────────────────┐
                │ Clear all tokens       │
                │ localStorage.clear()   │
                └──────┬─────────────────┘
                       │
                       ▼
                ┌────────────────────────┐
                │ Redirect to /          │
                │ (Landing page)         │
                └────────────────────────┘
```

## Code Example

### Using RTK Query Hooks

No special handling needed! The token refresh happens automatically:

```typescript
import { useGetMeQuery, useGetResumesQuery } from '../store';

function MyComponent() {
  // Token refresh is automatic - no error handling needed!
  const { data: meData, isLoading: meLoading } = useGetMeQuery();
  const { data: resumes, isLoading: resumesLoading } = useGetResumesQuery();

  if (meLoading || resumesLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Welcome {meData.user.username}</h1>
      <ul>
        {resumes.map(resume => (
          <li key={resume.id}>{resume.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Behind the Scenes

When `useGetMeQuery()` receives a 401 error:

1. **baseQuery intercepts** the 401 response
2. **Calls** `/auth/refresh` with the refresh token
3. **Saves** the new access token to localStorage
4. **Retries** the `/me` request with the new token
5. **Returns** the data as if nothing happened

The component doesn't need to know about token refresh at all!

## Key Features

### 1. Automatic Retry

When a token is successfully refreshed, the original request is automatically retried:

```typescript
// Retry the original request with new token
const retryResult = await api({
  url,
  method,
  data,
  params,
});

return { data: retryResult.data };
```

### 2. Infinite Loop Prevention

The baseQuery checks if the current request is to `/auth/refresh` to prevent infinite loops:

```typescript
if (err.response?.status === 401 && !url.includes('/auth/refresh')) {
  // Try to refresh token
}
```

### 3. Automatic Logout

If token refresh fails (e.g., refresh token expired or revoked), the user is automatically logged out:

```typescript
// Refresh failed - clear tokens and redirect to login
tokenStorage.clearTokens();
window.location.href = '/';
```

### 4. Seamless User Experience

From the user's perspective:

- ✅ No interruption in their workflow
- ✅ No "session expired" popups
- ✅ No need to manually refresh
- ✅ Transparent token management

## Testing

The token refresh logic is thoroughly tested in `src/store/__tests__/baseQuery.test.ts`:

1. ✅ Successful token refresh and retry
2. ✅ Redirect to login when refresh fails
3. ✅ Redirect to login when no refresh token available
4. ✅ No refresh attempt for `/auth/refresh` endpoint (infinite loop prevention)
5. ✅ Standard error handling for non-401 errors

Run tests:

```bash
pnpm test:run
```

## Token Storage

Tokens are stored in localStorage via `tokenStorage` service:

```typescript
// Get tokens
const tokens = tokenStorage.getTokens();
// { access_token: '...', refresh_token: '...' }

// Set access token
tokenStorage.setAccessToken('new_access_token');

// Clear all tokens
tokenStorage.clearTokens();
```

## Security Considerations

1. **Refresh Token Validation**: Backend must validate refresh tokens on every `/auth/refresh` request
2. **Token Expiration**: Access tokens should have short expiration (15-30 minutes)
3. **Refresh Token Expiration**: Refresh tokens should have longer expiration (7-30 days)
4. **HTTPS Only**: Tokens should only be transmitted over HTTPS in production
5. **Token Rotation**: Consider rotating refresh tokens on each use for enhanced security

## Related Files

- **baseQuery**: `src/store/baseQuery.ts` - Token refresh implementation
- **Token Storage**: `src/services/tokenStorage.ts` - Token management
- **Auth Service**: `src/services/auth.ts` - Initial authentication
- **Tests**: `src/store/__tests__/baseQuery.test.ts` - Token refresh tests
- **Protected API**: `src/store/protectedApi.ts` - Uses baseQuery with token refresh
- **Public API**: `src/store/publicApi.ts` - Uses baseQuery (no auth required)

## Troubleshooting

### Issue: Token not refreshing

**Solution**: Check browser console for errors. Ensure:

- Refresh token exists in localStorage
- Backend `/auth/refresh` endpoint is working
- Backend returns correct response format

### Issue: Infinite redirect loop

**Solution**: Clear localStorage and try again:

```javascript
localStorage.clear();
window.location.href = '/';
```

### Issue: 401 errors not caught

**Solution**: Ensure the endpoint is using RTK Query hooks. Direct axios calls won't benefit from automatic token refresh.
