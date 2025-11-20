# Authentication Flow

This document describes the authentication system implementation.

## Overview

The application uses JWT-based authentication with access and refresh tokens stored in localStorage. On startup, the app checks authentication status and loads either the Dashboard (authenticated) or Landing (unauthenticated) app.

## Flow Diagram

```
Application Start
      ↓
  Check tokens in localStorage
      ↓
   ┌──────────────────────┐
   │  Call GET /v1/me     │
   │  with access_token   │
   └──────────────────────┘
      ↓
   Success (200)?
      ↓
   ┌──YES──────────────┐    ┌──NO────────────────┐
   │ Load Dashboard    │    │ Try token refresh  │
   └───────────────────┘    └────────────────────┘
                                     ↓
                            POST /v1/auth/refresh
                            with refresh_token
                                     ↓
                               Success (200)?
                                     ↓
                    ┌────YES──────────┴────NO─────┐
                    │                              │
         Save new access_token          Clear tokens
         Load Dashboard                 Load Landing
```

## Components

### 1. Token Storage (`src/services/tokenStorage.ts`)

Manages token persistence in localStorage:

```typescript
tokenStorage.getTokens(); // Get both tokens
tokenStorage.setTokens({ access_token, refresh_token }); // Set both tokens
tokenStorage.setAccessToken(token); // Update only access token
tokenStorage.clearTokens(); // Clear all tokens
tokenStorage.hasTokens(); // Check if tokens exist
```

### 2. Auth Service (`src/services/auth.ts`)

Handles authentication logic:

```typescript
// Check if user is authenticated
const isAuth = await authService.checkAuth();

// Try to refresh access token
const success = await authService.tryRefreshToken(refreshToken);

// Logout (clear tokens)
authService.logout();
```

### 3. API Client (`src/lib/api.ts`)

Axios instance with automatic token injection:

- Base URL: `VITE_API_URL/v1`
- Request interceptor: Adds `Authorization: Bearer <token>` header
- Response interceptor: Handles errors globally

### 4. App Entry Point (`src/main.tsx`)

Determines which app to load:

```typescript
async function initApp() {
  const isAuthenticated = await authService.checkAuth();

  if (isAuthenticated) {
    BootDashboard(); // Load authenticated app
  } else {
    BootLanding(); // Load public app
  }
}
```

## Authentication Check Flow

### Step 1: Check Tokens

```typescript
const tokens = tokenStorage.getTokens();
if (!tokens) {
  return false; // No tokens → not authenticated
}
```

### Step 2: Validate Access Token

```typescript
try {
  await api.get('/me'); // Try to get user data
  return true; // Success → authenticated
} catch (error) {
  // Continue to step 3
}
```

### Step 3: Refresh Token if Needed

```typescript
if (error.response?.status === 401) {
  // Access token expired, try refresh
  return await authService.tryRefreshToken(tokens.refresh_token);
}
```

### Step 4: Try Token Refresh

```typescript
try {
  const response = await api.post('/auth/refresh', {
    refresh_token: refreshToken,
  });

  // Save new access token
  tokenStorage.setAccessToken(response.data.data.access_token);
  return true; // Refresh successful
} catch (error) {
  // Refresh failed, clear tokens
  tokenStorage.clearTokens();
  return false;
}
```

## API Endpoints Used

### GET /v1/me

Requires: `Authorization: Bearer <access_token>`

Response:

```json
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "user": { ... },
    "repositories": [...],
    "resumes": [...]
  }
}
```

### POST /v1/auth/refresh

Request:

```json
{
  "refresh_token": "..."
}
```

Response:

```json
{
  "success": true,
  "message": "Token refreshed successfully",
  "data": {
    "access_token": "eyJhbGc..."
  }
}
```

## Token Storage

Tokens are stored in localStorage with the following keys:

- `access_token` - Short-lived JWT token for API requests
- `refresh_token` - Long-lived token for getting new access tokens

## Security Considerations

1. **XSS Protection**: Tokens in localStorage are vulnerable to XSS attacks. Ensure proper content security policy.
2. **Automatic Refresh**: Access token is automatically refreshed on 401 errors.
3. **Token Cleanup**: Invalid tokens are automatically cleared.
4. **HTTPS Only**: Always use HTTPS in production to protect tokens in transit.

## Usage Examples

### After OAuth Login

```typescript
import { tokenStorage } from './services/tokenStorage';

// After successful GitHub OAuth callback
const tokens = {
  access_token: 'eyJhbGc...',
  refresh_token: 'dGVzdC...',
};

tokenStorage.setTokens(tokens);
// Reload page to trigger auth check
window.location.href = '/';
```

### Manual Logout

```typescript
import { authService } from './services/auth';

// Logout button handler
function handleLogout() {
  authService.logout(); // Clears tokens
  window.location.href = '/'; // Reload to show Landing
}
```

### Making Authenticated Requests

```typescript
import api from './lib/api';

// Token is automatically added by interceptor
const response = await api.get('/resumes');
const resumes = response.data.data;
```

## Troubleshooting

### Issue: App shows Landing even with valid tokens

- Check browser console for API errors
- Verify `VITE_API_URL` is correctly set
- Check if API server is running
- Inspect tokens in localStorage (DevTools → Application → Local Storage)

### Issue: Token refresh fails

- Verify refresh_token is still valid (not expired/revoked)
- Check API logs for refresh endpoint errors
- Ensure refresh token is correctly stored in localStorage

### Issue: 401 errors on every request

- Access token might be expired and refresh token invalid
- Clear localStorage and login again
- Check server-side token validation logic
