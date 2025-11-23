import type { AuthTokens } from '@types';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export const tokenStorage = {
  getTokens(): AuthTokens | null {
    const access_token = localStorage.getItem(ACCESS_TOKEN_KEY);
    const refresh_token = localStorage.getItem(REFRESH_TOKEN_KEY);

    if (!access_token || !refresh_token) {
      return null;
    }

    return { access_token, refresh_token };
  },

  setTokens(tokens: AuthTokens): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, tokens.access_token);
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh_token);
  },

  setAccessToken(token: string): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  },

  clearTokens(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  hasTokens(): boolean {
    return !!this.getTokens();
  },
};
