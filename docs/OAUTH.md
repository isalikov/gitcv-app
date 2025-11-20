# OAuth Authentication Flow

This document describes the GitHub OAuth authentication flow in the application.

## Overview

The application uses GitHub OAuth for user authentication. The flow consists of:

1. **Landing Page** - User clicks "Login with GitHub"
2. **GitHub Authorization** - User authorizes the app on GitHub
3. **Authorization Handler** - Receives tokens via `/authorize` route
4. **Dashboard** - User is redirected to the authenticated dashboard

## Architecture

### Single Entry Point

The application has a single HTML entry point that handles all routes:

- **`index.html`** → `src/main.tsx` → Handles `/authorize` callback or loads Landing/Dashboard

### Flow Diagram

```
┌─────────────┐
│   Landing   │  User not authenticated
│   Page      │
└─────┬───────┘
      │ Click "Login with GitHub"
      │
      ▼
┌─────────────────────────────────────────┐
│  Redirect to:                           │
│  http://localhost:8080/v1/auth/github   │
└─────┬───────────────────────────────────┘
      │
      │ User authorizes on GitHub
      │
      ▼
┌─────────────────────────────────────────┐
│  GitHub redirects to API:               │
│  /v1/auth/github/callback?code=...      │
└─────┬───────────────────────────────────┘
      │
      │ API exchanges code for tokens
      │
      ▼
┌─────────────────────────────────────────────────────┐
│  API redirects to:                                  │
│  http://localhost:5173/authorize?                   │
│    access_token=xxx&refresh_token=yyy               │
└─────┬───────────────────────────────────────────────┘
      │
      │ main.tsx saves tokens & redirects to /
      │
      ▼
┌─────────────┐
│  Dashboard  │  User authenticated
│   Page      │
└─────────────┘
```

## Implementation Details

### 1. Landing Page (`src/apps/Ladning/bootstrap.tsx`)

Displays a "Login with GitHub" button that redirects to the API OAuth endpoint:

```typescript
const handleGitHubLogin = (): void => {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
  window.location.href = `${apiUrl}/v1/auth/github`;
};
```

### 2. Authorization Handler (`src/main.tsx`)

The main entry point handles the `/authorize` callback route:

```typescript
function handleAuthorizeCallback(): boolean {
  if (window.location.pathname === '/authorize') {
    // Parse query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('access_token');
    const refreshToken = urlParams.get('refresh_token');

    if (accessToken && refreshToken) {
      // Save tokens to localStorage
      tokenStorage.setTokens({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      // Redirect to home page (will load Dashboard)
      window.location.href = '/';
      return true;
    }

    // If tokens are missing, redirect to landing
    window.location.href = '/';
    return true;
  }

  return false;
}
```

### 3. Main Entry Point (`src/main.tsx`)

After handling OAuth callback, checks authentication and loads appropriate app:

```typescript
async function initApp(): Promise<void> {
  const isAuthenticated = await authService.checkAuth();

  if (isAuthenticated) {
    BootDashboard(); // Protected area
  } else {
    BootLanding(); // Public area
  }
}
```

## API Integration

### Backend Requirements

The API must:

1. **Handle GitHub OAuth** at `/v1/auth/github`
2. **Exchange code for tokens** at `/v1/auth/github/callback`
3. **Redirect to `/authorize`** with tokens in query parameters:

```
http://localhost:5173/authorize?access_token=xxx&refresh_token=yyy
```

### Example API Response

After successful OAuth, the API should redirect to:

```
GET http://localhost:5173/authorize
  ?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  &refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Go/Gin Implementation Example

```go
func (h *AuthHandler) GitHubCallback(c *gin.Context) {
    // ... OAuth logic to exchange code for tokens ...

    // After successful authentication:
    frontendURL := os.Getenv("FRONTEND_URL") // http://localhost:5173
    redirectURL := fmt.Sprintf(
        "%s/authorize?access_token=%s&refresh_token=%s",
        frontendURL,
        accessToken,
        refreshToken,
    )

    c.Redirect(http.StatusFound, redirectURL)
}
```

## Environment Configuration

### Development (`.env.local`)

```
VITE_API_URL=http://localhost:8080
```

### Production (`.env.production`)

```
VITE_API_URL=https://api.gitcv.com
```

The callback URL will be:

- **Development**: `http://localhost:5173/authorize`
- **Production**: `https://app.gitcv.com/authorize`

## Security Considerations

1. **Token Storage**
   - Tokens are stored in localStorage
   - Access token is used for API requests
   - Refresh token is used to obtain new access tokens

2. **HTTPS in Production**
   - Always use HTTPS in production
   - Prevents token interception

3. **Token Validation**
   - API validates tokens on every request
   - Expired tokens trigger refresh flow

4. **Error Handling**
   - Missing tokens at `/authorize` redirect to landing page
   - User can retry authentication

## User Experience

### Success Flow

1. User clicks "Login with GitHub" → Redirected to GitHub
2. User authorizes app → Redirected to `/authorize`
3. Tokens saved to localStorage → Automatic redirect to `/`
4. Dashboard loads (authenticated)

### Error Flow

1. User clicks "Login with GitHub" → Redirected to GitHub
2. User denies access OR tokens missing at `/authorize`
3. Automatic redirect to `/` → Landing page loads

## Testing

### Manual Testing

1. **Test Success Flow**:
   - Start dev server: `pnpm dev`
   - Navigate to `http://localhost:5173`
   - Click "Login with GitHub"
   - Authorize on GitHub
   - Should redirect to Dashboard

2. **Test Authorization Handler Directly**:

   ```
   # With tokens - should save and redirect to Dashboard
   http://localhost:5173/authorize?access_token=test123&refresh_token=refresh456

   # Without tokens - should redirect to Landing
   http://localhost:5173/authorize
   ```

3. **Test Token Persistence**:
   - After successful login, refresh page
   - Should still be authenticated (Dashboard loads)

### Automated Testing

Token storage is tested in `src/services/__tests__/auth.test.ts`:

- Token saving/retrieval
- Token clearing
- Auth check with tokens
- Token refresh on 401

## Deployment

### SPA Routing

The application uses client-side routing. Ensure your web server redirects all routes to `index.html`:

**Nginx configuration:**

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

This ensures `/authorize` route is handled by the React app.

**Docker:**

The standard Nginx configuration in `nginx.conf` already handles SPA routing correctly.

## Troubleshooting

### Issue: `/authorize` shows blank page

**Solution**: Check browser console for errors. Ensure tokens are in query parameters.

### Issue: Tokens not saved

**Solution**:

- Check that query parameters `access_token` and `refresh_token` are present
- Verify localStorage is enabled in browser
- Check browser console for errors

### Issue: Infinite redirect loop

**Solution**:

- Clear localStorage: `localStorage.clear()`
- Clear browser cookies
- Verify tokens are valid JWT format

### Issue: API returns 401 after login

**Solution**:

- Verify API is returning valid tokens
- Check token format matches expected structure
- Test token manually with API `/me` endpoint

## Related Files

- **Landing**: `src/apps/Ladning/bootstrap.tsx` - GitHub login button
- **Dashboard**: `src/apps/Dashboard/bootstrap.tsx` - Protected area
- **Main Entry**: `src/main.tsx` - Authorization handler and app router
- **Token Storage**: `src/services/tokenStorage.ts` - localStorage management
- **Auth Service**: `src/services/auth.ts` - Authentication logic
- **Vite Config**: `vite.config.ts` - Build configuration
- **HTML File**: `index.html` - Single entry point
