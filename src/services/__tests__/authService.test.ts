import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { MeApiResponse, MeResponse } from '../../types/auth';
// Import authService after mocking
import { authService } from '../auth';
import { tokenStorage } from '../tokenStorage';

// Hoist mock api creation
const { mockApiInstance, mockAxiosCreate, mockAxiosIsAxiosError } = vi.hoisted(() => {
  const mockApiInstance = {
    get: vi.fn(),
    post: vi.fn(),
    interceptors: {
      request: { use: vi.fn() },
      response: { use: vi.fn() },
    },
  };

  const mockAxiosCreate = vi.fn(() => mockApiInstance);
  const mockAxiosIsAxiosError = vi.fn((error: any) => !!error?.isAxiosError);

  return { mockApiInstance, mockAxiosCreate, mockAxiosIsAxiosError };
});

// Mock axios
vi.mock('axios', () => ({
  default: {
    create: mockAxiosCreate,
    isAxiosError: mockAxiosIsAxiosError,
  },
}));

// Mock tokenStorage
vi.mock('../tokenStorage');

describe('authService', () => {
  const mockTokens = {
    access_token: 'test_access_token',
    refresh_token: 'test_refresh_token',
  };

  const mockMeResponse: MeResponse = {
    user: {
      id: 1,
      username: 'testuser',
      email: 'test@example.com',
      avatar_url: 'https://example.com/avatar.jpg',
      github_id: 12345,
      bio: 'Test user bio',
      name: 'Test User',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    },
    repositories: [],
    resumes: [],
  };

  const mockMeApiResponse: MeApiResponse = {
    success: true,
    message: 'Success',
    data: mockMeResponse,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock console.error to avoid cluttering test output
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  describe('checkAuth', () => {
    it('should return null when no tokens exist', async () => {
      vi.mocked(tokenStorage.getTokens).mockReturnValue(null);

      const result = await authService.checkAuth();

      expect(result).toBeNull();
      expect(mockApiInstance.get).not.toHaveBeenCalled();
    });

    it('should return user data when tokens are valid', async () => {
      vi.mocked(tokenStorage.getTokens).mockReturnValue(mockTokens);
      mockApiInstance.get.mockResolvedValue({ data: mockMeApiResponse });

      const result = await authService.checkAuth();

      expect(result).toEqual(mockMeResponse);
      expect(mockApiInstance.get).toHaveBeenCalledWith('/me');
    });

    it('should try to refresh token and retry when receiving 401', async () => {
      vi.mocked(tokenStorage.getTokens).mockReturnValue(mockTokens);

      // First call returns 401
      mockApiInstance.get.mockRejectedValueOnce({
        isAxiosError: true,
        response: {
          status: 401,
          data: { message: 'Unauthorized' },
        },
      });

      // Mock successful token refresh
      const mockRefreshResponse = {
        data: {
          success: true,
          message: 'Token refreshed',
          data: {
            access_token: 'new_access_token',
          },
        },
      };
      mockApiInstance.post.mockResolvedValue(mockRefreshResponse);

      // Second call (after refresh) succeeds
      mockApiInstance.get.mockResolvedValueOnce({ data: mockMeApiResponse });

      const result = await authService.checkAuth();

      expect(result).toEqual(mockMeResponse);
      expect(mockApiInstance.post).toHaveBeenCalledWith('/auth/refresh', {
        refresh_token: mockTokens.refresh_token,
      });
      expect(tokenStorage.setAccessToken).toHaveBeenCalledWith('new_access_token');
      expect(mockApiInstance.get).toHaveBeenCalledTimes(2);
    });

    it('should return null when token refresh fails', async () => {
      vi.mocked(tokenStorage.getTokens).mockReturnValue(mockTokens);

      // First call returns 401
      mockApiInstance.get.mockRejectedValueOnce({
        isAxiosError: true,
        response: {
          status: 401,
          data: { message: 'Unauthorized' },
        },
      });

      // Token refresh fails
      mockApiInstance.post.mockRejectedValue({
        isAxiosError: true,
        response: {
          status: 401,
          data: { message: 'Invalid refresh token' },
        },
      });

      const result = await authService.checkAuth();

      expect(result).toBeNull();
      expect(tokenStorage.clearTokens).toHaveBeenCalled();
    });

    it('should return null when retry after refresh fails', async () => {
      vi.mocked(tokenStorage.getTokens).mockReturnValue(mockTokens);

      // First call returns 401
      mockApiInstance.get.mockRejectedValueOnce({
        isAxiosError: true,
        response: {
          status: 401,
          data: { message: 'Unauthorized' },
        },
      });

      // Mock successful token refresh
      const mockRefreshResponse = {
        data: {
          success: true,
          message: 'Token refreshed',
          data: {
            access_token: 'new_access_token',
          },
        },
      };
      mockApiInstance.post.mockResolvedValue(mockRefreshResponse);

      // Second call (after refresh) also fails
      mockApiInstance.get.mockRejectedValueOnce({
        isAxiosError: true,
        response: {
          status: 500,
          data: { message: 'Server error' },
        },
      });

      const result = await authService.checkAuth();

      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Auth check failed after token refresh:',
        expect.any(Object),
      );
    });

    it('should return null on non-401 errors', async () => {
      vi.mocked(tokenStorage.getTokens).mockReturnValue(mockTokens);

      mockApiInstance.get.mockRejectedValue({
        isAxiosError: true,
        response: {
          status: 500,
          data: { message: 'Server error' },
        },
      });

      const result = await authService.checkAuth();

      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalledWith('Auth check failed:', expect.any(Object));
      expect(mockApiInstance.post).not.toHaveBeenCalled();
    });

    it('should return null on network errors', async () => {
      vi.mocked(tokenStorage.getTokens).mockReturnValue(mockTokens);

      mockApiInstance.get.mockRejectedValue(new Error('Network error'));

      const result = await authService.checkAuth();

      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalledWith('Auth check failed:', expect.any(Error));
    });
  });

  describe('tryRefreshToken', () => {
    it('should refresh token successfully and return true', async () => {
      const newAccessToken = 'new_access_token';
      const mockRefreshResponse = {
        data: {
          success: true,
          message: 'Token refreshed',
          data: {
            access_token: newAccessToken,
          },
        },
      };

      mockApiInstance.post.mockResolvedValue(mockRefreshResponse);

      const result = await authService.tryRefreshToken(mockTokens.refresh_token);

      expect(result).toBe(true);
      expect(mockApiInstance.post).toHaveBeenCalledWith('/auth/refresh', {
        refresh_token: mockTokens.refresh_token,
      });
      expect(tokenStorage.setAccessToken).toHaveBeenCalledWith(newAccessToken);
    });

    it('should clear tokens and return false when refresh fails', async () => {
      mockApiInstance.post.mockRejectedValue({
        isAxiosError: true,
        response: {
          status: 401,
          data: { message: 'Invalid refresh token' },
        },
      });

      const result = await authService.tryRefreshToken(mockTokens.refresh_token);

      expect(result).toBe(false);
      expect(tokenStorage.clearTokens).toHaveBeenCalled();
      expect(console.error).toHaveBeenCalledWith('Token refresh failed:', expect.any(Object));
    });

    it('should handle network errors during refresh', async () => {
      mockApiInstance.post.mockRejectedValue(new Error('Network error'));

      const result = await authService.tryRefreshToken(mockTokens.refresh_token);

      expect(result).toBe(false);
      expect(tokenStorage.clearTokens).toHaveBeenCalled();
      expect(console.error).toHaveBeenCalledWith('Token refresh failed:', expect.any(Error));
    });
  });

  describe('logout', () => {
    it('should clear tokens', () => {
      authService.logout();

      expect(tokenStorage.clearTokens).toHaveBeenCalled();
    });
  });
});
