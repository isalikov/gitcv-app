import type { AxiosError } from 'axios';

import api from '../lib/api';
import type { ApiError } from '../types/api';
import type { MeResponse, RefreshTokenResponse } from '../types/auth';
import { tokenStorage } from './tokenStorage';

function isAxiosError(error: unknown): error is AxiosError<ApiError> {
  return (
    typeof error === 'object' &&
    error !== null &&
    'isAxiosError' in error &&
    error.isAxiosError === true
  );
}

export const authService = {
  /**
   * Check authentication by calling /v1/me
   * Returns true if authenticated, false otherwise
   * Automatically tries to refresh token if access_token is expired
   */
  async checkAuth(): Promise<boolean> {
    const tokens = tokenStorage.getTokens();

    // No tokens - user is not authenticated
    if (!tokens) {
      return false;
    }

    try {
      // Try to fetch user data with current access_token
      await api.get<MeResponse>('/me');
      return true;
    } catch (error: unknown) {
      // If access_token is invalid/expired, try to refresh
      if (isAxiosError(error) && error.response?.status === 401) {
        return await this.tryRefreshToken(tokens.refresh_token);
      }

      // Other errors - treat as not authenticated
      console.error('Auth check failed:', error);
      return false;
    }
  },

  /**
   * Try to refresh access token using refresh_token
   */
  async tryRefreshToken(refreshToken: string): Promise<boolean> {
    try {
      const response = await api.post<RefreshTokenResponse>('/auth/refresh', {
        refresh_token: refreshToken,
      });

      // Save new access_token
      const newAccessToken = response.data.data.access_token;
      tokenStorage.setAccessToken(newAccessToken);

      return true;
    } catch (error: unknown) {
      console.error('Token refresh failed:', error);
      // Clear invalid tokens
      tokenStorage.clearTokens();
      return false;
    }
  },

  /**
   * Logout user - clear tokens
   */
  logout(): void {
    tokenStorage.clearTokens();
  },
};
