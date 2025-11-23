import { createApi } from '@reduxjs/toolkit/query/react';
import type {
  ApiResponse,
  LogoutRequest,
  RefreshTokenRequest,
  RefreshTokenResponse,
  Resume,
} from '@types';

import { axiosBaseQuery } from './baseQuery';

/**
 * Public API endpoints that don't require authentication
 * Used in the Landing app
 *
 * Corresponds to routes in Go API without AuthMiddleware:
 * - /v1/healthcheck
 * - /v1/auth/refresh
 * - /v1/auth/logout
 * - /v1/public/resumes/:slug
 */
export const publicApi = createApi({
  reducerPath: 'publicApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: [],
  endpoints: (builder) => ({
    // ============================================================================
    // Health Check
    // ============================================================================

    healthCheck: builder.query<{ status: string }, void>({
      query: () => ({
        url: '/v1/healthcheck',
        method: 'GET',
      }),
      transformResponse: (response: ApiResponse<{ status: string }>) => response.data,
    }),

    // ============================================================================
    // Authentication (Public)
    // ============================================================================

    refreshToken: builder.mutation<string, RefreshTokenRequest>({
      query: (data) => ({
        url: '/auth/refresh',
        method: 'POST',
        data,
      }),
      transformResponse: (response: RefreshTokenResponse) => response.data.access_token,
    }),

    logout: builder.mutation<void, LogoutRequest>({
      query: (data) => ({
        url: '/auth/logout',
        method: 'POST',
        data,
      }),
    }),

    // ============================================================================
    // Public Resumes
    // ============================================================================

    getPublicResume: builder.query<Resume, string>({
      query: (slug) => ({
        url: `/public/resumes/${slug}`,
        method: 'GET',
      }),
      transformResponse: (response: ApiResponse<Resume>) => response.data,
    }),
  }),
});

export const {
  useHealthCheckQuery,
  useRefreshTokenMutation,
  useLogoutMutation,
  useGetPublicResumeQuery,
} = publicApi;
