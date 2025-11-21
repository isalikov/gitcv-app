import { BootDashboard, BootLanding } from './apps';
import { authService, tokenStorage } from './services';

// Handle OAuth callback
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

// Check authentication and boot appropriate app
async function initApp(): Promise<void> {
  // Handle OAuth callback first
  if (handleAuthorizeCallback()) {
    return;
  }

  const meData = await authService.checkAuth();

  if (meData) {
    BootDashboard(meData);
  } else {
    BootLanding();
  }
}

// Start the application
void initApp();
