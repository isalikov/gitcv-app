// ============================================================================
// Protected API (Dashboard - requires authentication)
// ============================================================================

export { protectedApi } from './protectedApi';
export {
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
} from './protectedApi';

// ============================================================================
// Public API (Landing - no authentication required)
// ============================================================================

export { publicApi } from './publicApi';
export {
  useHealthCheckQuery,
  useRefreshTokenMutation,
  useLogoutMutation,
  useGetPublicResumeQuery,
} from './publicApi';

// ============================================================================
// Protected Store (Dashboard)
// ============================================================================

export { protectedStore } from './protectedStore';
export type { ProtectedRootState, ProtectedAppDispatch } from './protectedStore';

// ============================================================================
// Public Store (Landing)
// ============================================================================

export { publicStore } from './publicStore';
export type { PublicRootState, PublicAppDispatch } from './publicStore';

// ============================================================================
// Protected Hooks (Dashboard)
// ============================================================================

export { useProtectedAppDispatch, useProtectedAppSelector } from './protectedHooks';

// ============================================================================
// Public Hooks (Landing)
// ============================================================================

export { usePublicAppDispatch, usePublicAppSelector } from './publicHooks';

// ============================================================================
// Base Query (shared)
// ============================================================================

export { axiosBaseQuery } from './baseQuery';
