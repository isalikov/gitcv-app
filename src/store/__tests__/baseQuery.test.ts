import { beforeEach, describe, expect, it, vi } from 'vitest';

import { tokenStorage } from '../../services';
import { axiosBaseQuery } from '../baseQuery';

// Hoist mock api creation
const { mockApi } = vi.hoisted(() => {
  const mockApi = vi.fn() as any;
  mockApi.post = vi.fn();
  return { mockApi };
});

// Mock dependencies
vi.mock('../../services/auth', () => ({
  api: mockApi,
}));

vi.mock('../../services/tokenStorage');

// Mock window.location
const mockLocation = {
  href: '',
};
Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
});

describe('axiosBaseQuery', () => {
  const baseQuery = axiosBaseQuery();

  beforeEach(() => {
    vi.clearAllMocks();
    mockLocation.href = '';
  });

  it('should return data on successful request', async () => {
    const mockData = { success: true, data: { id: 1 } };
    mockApi.mockResolvedValue({ data: mockData });

    const result = await baseQuery(
      {
        url: '/test',
        method: 'GET',
      },
      {} as never,
      {},
    );

    expect(result).toEqual({ data: mockData });
    expect(mockApi).toHaveBeenCalledWith({
      url: '/test',
      method: 'GET',
      data: undefined,
      params: undefined,
    });
  });

  it('should return error on failed request', async () => {
    const mockError = {
      response: {
        status: 500,
        data: {
          message: 'Server error',
          error: 'Internal server error',
        },
      },
      message: 'Request failed',
    };
    mockApi.mockRejectedValue(mockError);

    const result = await baseQuery(
      {
        url: '/test',
        method: 'GET',
      },
      {} as never,
      {},
    );

    expect(result).toEqual({
      error: {
        success: false,
        message: 'Server error',
        error: 'Internal server error',
      },
    });
  });

  it('should refresh token and retry on 401 error', async () => {
    const mockTokens = {
      access_token: 'old_access_token',
      refresh_token: 'refresh_token',
    };
    const mockRefreshResponse = {
      data: {
        success: true,
        message: 'Token refreshed',
        data: {
          access_token: 'new_access_token',
        },
      },
    };
    const mockRetryData = { success: true, data: { id: 1 } };

    vi.mocked(tokenStorage.getTokens).mockReturnValue(mockTokens);
    // First call returns 401
    mockApi.mockRejectedValueOnce({
      response: {
        status: 401,
        data: {
          message: 'Unauthorized',
          error: 'Token expired',
        },
      },
    });
    // Mock api.post for refresh token call
    mockApi.post.mockResolvedValueOnce(mockRefreshResponse);
    // Retry with new token succeeds
    mockApi.mockResolvedValueOnce({ data: mockRetryData });

    const result = await baseQuery(
      {
        url: '/protected',
        method: 'GET',
      },
      {} as never,
      {},
    );

    expect(result).toEqual({ data: mockRetryData });
    expect(tokenStorage.setAccessToken).toHaveBeenCalledWith('new_access_token');
    expect(mockApi.post).toHaveBeenCalledWith('/auth/refresh', {
      refresh_token: 'refresh_token',
    });
  });

  it('should redirect to login if refresh token fails', async () => {
    const mockTokens = {
      access_token: 'old_access_token',
      refresh_token: 'invalid_refresh_token',
    };

    vi.mocked(tokenStorage.getTokens).mockReturnValue(mockTokens);
    // First call returns 401
    mockApi.mockRejectedValueOnce({
      response: {
        status: 401,
        data: {
          message: 'Unauthorized',
          error: 'Token expired',
        },
      },
    });
    // Refresh token call fails
    mockApi.post.mockRejectedValueOnce({
      response: {
        status: 401,
        data: {
          message: 'Invalid refresh token',
          error: 'Authentication failed',
        },
      },
    });

    const result = await baseQuery(
      {
        url: '/protected',
        method: 'GET',
      },
      {} as never,
      {},
    );

    expect(result).toEqual({
      error: {
        success: false,
        message: 'Session expired. Please login again.',
        error: 'Authentication failed',
      },
    });
    expect(tokenStorage.clearTokens).toHaveBeenCalled();
    expect(mockLocation.href).toBe('/');
  });

  it('should redirect to login if no refresh token available', async () => {
    vi.mocked(tokenStorage.getTokens).mockReturnValue(null);
    mockApi.mockRejectedValueOnce({
      response: {
        status: 401,
        data: {
          message: 'Unauthorized',
          error: 'Token expired',
        },
      },
    });

    await baseQuery(
      {
        url: '/protected',
        method: 'GET',
      },
      {} as never,
      {},
    );

    expect(tokenStorage.clearTokens).toHaveBeenCalled();
    expect(mockLocation.href).toBe('/');
  });

  it('should not try to refresh token for /auth/refresh endpoint', async () => {
    mockApi.post.mockRejectedValueOnce({
      response: {
        status: 401,
        data: {
          message: 'Invalid refresh token',
          error: 'Authentication failed',
        },
      },
    });

    // Mock api function call to properly handle the request
    mockApi.mockRejectedValueOnce({
      response: {
        status: 401,
        data: {
          message: 'Invalid refresh token',
          error: 'Authentication failed',
        },
      },
    });

    const result = await baseQuery(
      {
        url: '/auth/refresh',
        method: 'POST',
        data: { refresh_token: 'invalid_token' },
      },
      {} as never,
      {},
    );

    expect(result).toEqual({
      error: {
        success: false,
        message: 'Invalid refresh token',
        error: 'Authentication failed',
      },
    });
    expect(tokenStorage.getTokens).not.toHaveBeenCalled();
    expect(mockApi).toHaveBeenCalledTimes(1); // Only the original call
  });
});
