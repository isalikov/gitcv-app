import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import { tokenStorage } from '@services';
import { api } from '@services/auth';
import type { ApiError, RefreshTokenResponse } from '@types';

import type { AxiosError } from 'axios';

import type { BaseQueryArgs } from './types';

export const axiosBaseQuery =
  (): BaseQueryFn<BaseQueryArgs, unknown, ApiError> =>
  async ({ url, method, data, params }) => {
    try {
      const result = await api({
        url,
        method,
        data,
        params,
      });

      return { data: result.data as unknown };
    } catch (axiosError) {
      const err = axiosError as AxiosError<ApiError>;

      // Handle 401 Unauthorized - try to refresh token
      if (err.response?.status === 401 && !url.includes('/auth/refresh')) {
        const tokens = tokenStorage.getTokens();

        if (tokens?.refresh_token) {
          try {
            // Try to refresh the access token
            const refreshResponse = await api.post<RefreshTokenResponse>('/auth/refresh', {
              refresh_token: tokens.refresh_token,
            });

            // Save new access token
            const newAccessToken = refreshResponse.data.data.access_token;
            tokenStorage.setAccessToken(newAccessToken);

            // Retry the original request with new token
            const retryResult = await api({
              url,
              method,
              data,
              params,
            });

            return { data: retryResult.data as unknown };
          } catch (refreshError) {
            // Refresh failed - clear tokens and redirect to login
            console.error('Token refresh failed:', refreshError);
            tokenStorage.clearTokens();
            window.location.href = '/';

            return {
              error: {
                success: false,
                message: 'Session expired. Please login again.',
                error: 'Authentication failed',
              },
            };
          }
        } else {
          // No refresh token available - redirect to login
          tokenStorage.clearTokens();
          window.location.href = '/';
        }
      }

      return {
        error: {
          success: false,
          message: err.response?.data?.message || err.message,
          error: err.response?.data?.error || 'An error occurred',
        },
      };
    }
  };
