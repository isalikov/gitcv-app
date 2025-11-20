import { createApi } from '@reduxjs/toolkit/query/react';

import type { ApiResponse, Repository, Resume } from '../types/api';
import type { MeResponse } from '../types/auth';
import type {
  CreateResumeRequest,
  CreateSkillRequest,
  GenerateAboutRequest,
  GenerateAboutResponse,
  GeneratePDFRequest,
  GeneratePDFResponse,
  GetSkillsParams,
  LogoutResponse,
  RevokeSessionRequest,
  UpdateMeRequest,
  UpdateResumeRequest,
} from '../types/requests';
import { axiosBaseQuery } from './baseQuery';

interface Skill {
  id: number;
  name: string;
  user_id: number | null;
  created_at: string;
  updated_at: string;
}

interface RefreshToken {
  id: number;
  user_id: number;
  ip_address: string;
  user_agent: string;
  is_revoked: boolean;
  expires_at: string;
  last_used: string;
  created_at: string;
  updated_at: string;
}

/**
 * Protected API endpoints that require authentication
 * Used in the Dashboard app
 *
 * Corresponds to routes in Go API with AuthMiddleware:
 * - /v1/me (GET, PATCH, POST /sync)
 * - /v1/sessions (GET, POST /revoke)
 * - /v1/repositories/:github_id/sync (POST)
 * - /v1/resumes (all CRUD operations)
 * - /v1/skills (GET, POST)
 * - /v1/generate (POST)
 */
export const protectedApi = createApi({
  reducerPath: 'protectedApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Me', 'Resumes', 'Resume', 'Skills', 'Sessions', 'Repositories'],
  endpoints: (builder) => ({
    // ============================================================================
    // User/Me (Protected)
    // ============================================================================

    getMe: builder.query<MeResponse, void>({
      query: () => ({
        url: '/me',
        method: 'GET',
      }),
      providesTags: ['Me'],
    }),

    updateMe: builder.mutation<MeResponse, UpdateMeRequest>({
      query: (data) => ({
        url: '/me',
        method: 'PATCH',
        data,
      }),
      invalidatesTags: ['Me'],
    }),

    syncMe: builder.mutation<MeResponse, void>({
      query: () => ({
        url: '/me/sync',
        method: 'POST',
      }),
      invalidatesTags: ['Me', 'Repositories'],
    }),

    // ============================================================================
    // Resumes (Protected)
    // ============================================================================

    getResumes: builder.query<ApiResponse<Resume[]>, void>({
      query: () => ({
        url: '/resumes',
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Resume' as const, id })),
              { type: 'Resumes' as const },
            ]
          : [{ type: 'Resumes' as const }],
    }),

    getResume: builder.query<ApiResponse<Resume>, number>({
      query: (id) => ({
        url: `/resumes/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'Resume', id }],
    }),

    createResume: builder.mutation<ApiResponse<Resume>, CreateResumeRequest>({
      query: (data) => ({
        url: '/resumes',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['Resumes', 'Me'],
    }),

    updateResume: builder.mutation<ApiResponse<Resume>, { id: number; data: UpdateResumeRequest }>({
      query: ({ id, data }) => ({
        url: `/resumes/${id}`,
        method: 'PATCH',
        data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Resume', id }, 'Resumes', 'Me'],
    }),

    deleteResume: builder.mutation<ApiResponse<null>, number>({
      query: (id) => ({
        url: `/resumes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Resume', id }, 'Resumes', 'Me'],
    }),

    generateResumePDF: builder.mutation<
      GeneratePDFResponse,
      { id: number; data: GeneratePDFRequest }
    >({
      query: ({ id, data }) => ({
        url: `/resumes/${id}/pdf`,
        method: 'POST',
        data,
      }),
    }),

    // ============================================================================
    // AI Generation
    // ============================================================================

    generateAbout: builder.mutation<GenerateAboutResponse, GenerateAboutRequest>({
      query: (data) => ({
        url: '/generate',
        method: 'POST',
        data,
      }),
    }),

    // ============================================================================
    // Repositories
    // ============================================================================

    syncRepository: builder.mutation<ApiResponse<Repository>, number>({
      query: (github_id) => ({
        url: `/repositories/${github_id}/sync`,
        method: 'POST',
      }),
      invalidatesTags: ['Repositories', 'Me'],
    }),

    // ============================================================================
    // Skills
    // ============================================================================

    getSkills: builder.query<ApiResponse<Skill[]>, GetSkillsParams | void>({
      query: (params) => ({
        url: '/skills',
        method: 'GET',
        params,
      }),
      providesTags: ['Skills'],
    }),

    createSkill: builder.mutation<ApiResponse<Skill>, CreateSkillRequest>({
      query: (data) => ({
        url: '/skills',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['Skills'],
    }),

    // ============================================================================
    // Sessions
    // ============================================================================

    getSessions: builder.query<ApiResponse<{ sessions: RefreshToken[] }>, void>({
      query: () => ({
        url: '/sessions',
        method: 'GET',
      }),
      providesTags: ['Sessions'],
    }),

    revokeSession: builder.mutation<LogoutResponse, RevokeSessionRequest>({
      query: (data) => ({
        url: '/sessions/revoke',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['Sessions'],
    }),
  }),
});

export const {
  // Me
  useGetMeQuery,
  useUpdateMeMutation,
  useSyncMeMutation,

  // Resumes
  useGetResumesQuery,
  useGetResumeQuery,
  useCreateResumeMutation,
  useUpdateResumeMutation,
  useDeleteResumeMutation,
  useGenerateResumePDFMutation,

  // AI
  useGenerateAboutMutation,

  // Repositories
  useSyncRepositoryMutation,

  // Skills
  useGetSkillsQuery,
  useCreateSkillMutation,

  // Sessions
  useGetSessionsQuery,
  useRevokeSessionMutation,
} = protectedApi;
