import { createApi } from '@reduxjs/toolkit/query/react';

import type { ApiResponse, RefreshToken, Repository, Resume, Skill } from '../types/api';
import type { MeApiResponse, MeResponse } from '../types/auth';
import type {
  CreateResumeRequest,
  CreateSkillRequest,
  GenerateAboutRequest,
  GenerateAboutResponse,
  GeneratePDFRequest,
  GeneratePDFResponse,
  GetSkillsParams,
  RevokeSessionRequest,
  UpdateMeRequest,
  UpdateResumeRequest,
} from '../types/requests';
import { axiosBaseQuery } from './baseQuery';

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
      transformResponse: (response: MeApiResponse) => response.data,
      providesTags: ['Me'],
    }),

    updateMe: builder.mutation<MeResponse, UpdateMeRequest>({
      query: (data) => ({
        url: '/me',
        method: 'PATCH',
        data,
      }),
      transformResponse: (response: MeApiResponse) => response.data,
      invalidatesTags: ['Me'],
    }),

    syncMe: builder.mutation<MeResponse, void>({
      query: () => ({
        url: '/me/sync',
        method: 'POST',
      }),
      transformResponse: (response: MeApiResponse) => response.data,
      invalidatesTags: ['Me', 'Repositories'],
    }),

    // ============================================================================
    // Resumes (Protected)
    // ============================================================================

    getResumes: builder.query<Resume[], void>({
      query: () => ({
        url: '/resumes',
        method: 'GET',
      }),
      transformResponse: (response: ApiResponse<Resume[]>) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Resume' as const, id })),
              { type: 'Resumes' as const },
            ]
          : [{ type: 'Resumes' as const }],
    }),

    getResume: builder.query<Resume, number>({
      query: (id) => ({
        url: `/resumes/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: ApiResponse<Resume>) => response.data,
      providesTags: (_result, _error, id) => [{ type: 'Resume', id }],
    }),

    createResume: builder.mutation<Resume, CreateResumeRequest>({
      query: (data) => ({
        url: '/resumes',
        method: 'POST',
        data,
      }),
      transformResponse: (response: ApiResponse<Resume>) => response.data,
      invalidatesTags: ['Resumes', 'Me'],
    }),

    updateResume: builder.mutation<Resume, { id: number; data: UpdateResumeRequest }>({
      query: ({ id, data }) => ({
        url: `/resumes/${id}`,
        method: 'PATCH',
        data,
      }),
      transformResponse: (response: ApiResponse<Resume>) => response.data,
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Resume', id }, 'Resumes', 'Me'],
    }),

    deleteResume: builder.mutation<void, number>({
      query: (id) => ({
        url: `/resumes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Resume', id }, 'Resumes', 'Me'],
    }),

    generateResumePDF: builder.mutation<string, { id: number; data: GeneratePDFRequest }>({
      query: ({ id, data }) => ({
        url: `/resumes/${id}/pdf`,
        method: 'POST',
        data,
      }),
      transformResponse: (response: GeneratePDFResponse) => response.download_url,
    }),

    // ============================================================================
    // AI Generation
    // ============================================================================

    generateAbout: builder.mutation<string, GenerateAboutRequest>({
      query: (data) => ({
        url: '/generate',
        method: 'POST',
        data,
      }),
      transformResponse: (response: GenerateAboutResponse) => response.data.about,
    }),

    // ============================================================================
    // Repositories
    // ============================================================================

    syncRepository: builder.mutation<Repository, number>({
      query: (github_id) => ({
        url: `/repositories/${github_id}/sync`,
        method: 'POST',
      }),
      transformResponse: (response: ApiResponse<Repository>) => response.data,
      invalidatesTags: ['Repositories', 'Me'],
    }),

    // ============================================================================
    // Skills
    // ============================================================================

    getSkills: builder.query<Skill[], GetSkillsParams | void>({
      query: (params) => ({
        url: '/skills',
        method: 'GET',
        params,
      }),
      transformResponse: (response: ApiResponse<Skill[]>) => response.data,
      providesTags: ['Skills'],
    }),

    createSkill: builder.mutation<Skill, CreateSkillRequest>({
      query: (data) => ({
        url: '/skills',
        method: 'POST',
        data,
      }),
      transformResponse: (response: ApiResponse<Skill>) => response.data,
      invalidatesTags: ['Skills'],
    }),

    // ============================================================================
    // Sessions
    // ============================================================================

    getSessions: builder.query<RefreshToken[], void>({
      query: () => ({
        url: '/sessions',
        method: 'GET',
      }),
      transformResponse: (response: ApiResponse<{ sessions: RefreshToken[] }>) =>
        response.data.sessions,
      providesTags: ['Sessions'],
    }),

    revokeSession: builder.mutation<void, RevokeSessionRequest>({
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
