import type { ApiError, MeApiResponse, MeResponse, RefreshTokenResponse } from '@types';

import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';

import { API_URL } from '../constants';
import { tokenStorage } from './tokenStorage';

export const api = axios.create({
  baseURL: API_URL + '/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add auth token from localStorage
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error as Error);
  },
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: unknown) => {
    // Handle errors globally
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Server responded with error
        console.error('API Error:', error.response.status, error.response.data);
      } else if (error.request) {
        // Request made but no response
        console.error('Network Error:', error.message);
      } else {
        // Something else happened
        console.error('Error:', error.message);
      }
    } else {
      console.error('Unknown error:', error);
    }
    return Promise.reject(error as Error);
  },
);

const isAxiosError = (error: unknown): error is AxiosError<ApiError> => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'isAxiosError' in error &&
    error.isAxiosError === true
  );
};

export const authService = {
  /**
   * Check authentication by calling /v1/me
   * Returns MeResponse if authenticated, null otherwise
   * Automatically tries to refresh token if access_token is expired
   */
  async checkAuth(): Promise<MeResponse | null> {
    const tokens = tokenStorage.getTokens();

    // No tokens - user is not authenticated
    if (!tokens) {
      return null;
    }

    try {
      // Try to fetch user data with current access_token
      const response = await api.get<MeApiResponse>('/me');
      return response.data.data; // Extract data from API wrapper
    } catch (error: unknown) {
      // If access_token is invalid/expired, try to refresh
      if (isAxiosError(error) && error.response?.status === 401) {
        const refreshed = await this.tryRefreshToken(tokens.refresh_token);
        if (refreshed) {
          // Try to fetch user data again after successful refresh
          try {
            const response = await api.get<MeApiResponse>('/me');
            return response.data.data; // Extract data from API wrapper
          } catch (retryError: unknown) {
            console.error('Auth check failed after token refresh:', retryError);
            return null;
          }
        }

        return null;
      }

      // Other errors - treat as not authenticated
      console.error('Auth check failed:', error);
      return null;
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

      // Save new access_token (response.data.data.access_token from API wrapper)
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
