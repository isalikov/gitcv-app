import { createApi } from '@reduxjs/toolkit/query/react';

import type { ApiResponse, Resume } from '../types/api';
import type { RefreshTokenResponse } from '../types/auth';
import type { LogoutRequest, LogoutResponse, RefreshTokenRequest } from '../types/requests';
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

    healthCheck: builder.query<ApiResponse<{ status: string }>, void>({
      query: () => ({
        url: '/v1/healthcheck',
        method: 'GET',
      }),
    }),

    // ============================================================================
    // Authentication (Public)
    // ============================================================================

    refreshToken: builder.mutation<RefreshTokenResponse, RefreshTokenRequest>({
      query: (data) => ({
        url: '/auth/refresh',
        method: 'POST',
        data,
      }),
    }),

    logout: builder.mutation<LogoutResponse, LogoutRequest>({
      query: (data) => ({
        url: '/auth/logout',
        method: 'POST',
        data,
      }),
    }),

    // ============================================================================
    // Public Resumes
    // ============================================================================

    getPublicResume: builder.query<ApiResponse<Resume>, string>({
      query: (slug) => ({
        url: `/public/resumes/${slug}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useHealthCheckQuery,
  useRefreshTokenMutation,
  useLogoutMutation,
  useGetPublicResumeQuery,
} = publicApi;
