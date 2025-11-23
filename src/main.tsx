import { BootDashboard, BootLanding } from '@apps';
import { authService, tokenStorage } from '@services';

function handleAuthorizeCallback(): boolean {
  if (window.location.pathname === '/authorize') {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('access_token');
    const refreshToken = urlParams.get('refresh_token');

    if (accessToken && refreshToken) {
      tokenStorage.setTokens({
        access_token: accessToken,
        refresh_token: refreshToken,
      });
    }

    window.location.href = '/';
    return true;
  }

  return false;
}

async function initApp(): Promise<void> {
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

void initApp();
