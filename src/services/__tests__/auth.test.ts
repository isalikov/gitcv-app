import { beforeEach, describe, expect, it, vi } from 'vitest';

import api from '../../lib/api';
import { authService } from '../auth';
import { tokenStorage } from '../tokenStorage';

// Mock dependencies
vi.mock('../../lib/api');
vi.mock('../tokenStorage');

// Mock console.error to avoid cluttering test output
const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

describe('authService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    consoleErrorSpy.mockClear();
  });

  describe('checkAuth', () => {
    it('should return false when no tokens exist', async () => {
      vi.mocked(tokenStorage.getTokens).mockReturnValue(null);

      const result = await authService.checkAuth();

      expect(result).toBe(false);
      expect(tokenStorage.getTokens).toHaveBeenCalled();
      expect(api.get).not.toHaveBeenCalled();
    });

    it('should return true when /me request succeeds', async () => {
      vi.mocked(tokenStorage.getTokens).mockReturnValue({
        access_token: 'valid_token',
        refresh_token: 'refresh_token',
      });
      vi.mocked(api.get).mockResolvedValue({
        data: { success: true, data: { user: {} } },
      });

      const result = await authService.checkAuth();

      expect(result).toBe(true);
      expect(api.get).toHaveBeenCalledWith('/me');
    });

    it('should try to refresh token when /me returns 401', async () => {
      vi.mocked(tokenStorage.getTokens).mockReturnValue({
        access_token: 'expired_token',
        refresh_token: 'refresh_token',
      });
      vi.mocked(api.get).mockRejectedValue({
        isAxiosError: true,
        response: { status: 401 },
      });
      vi.mocked(api.post).mockResolvedValue({
        data: { data: { access_token: 'new_token' } },
      });

      const result = await authService.checkAuth();

      expect(result).toBe(true);
      expect(api.post).toHaveBeenCalledWith('/auth/refresh', {
        refresh_token: 'refresh_token',
      });
      expect(tokenStorage.setAccessToken).toHaveBeenCalledWith('new_token');
    });

    it('should return false when token refresh fails', async () => {
      vi.mocked(tokenStorage.getTokens).mockReturnValue({
        access_token: 'expired_token',
        refresh_token: 'invalid_refresh_token',
      });
      vi.mocked(api.get).mockRejectedValue({
        isAxiosError: true,
        response: { status: 401 },
      });
      vi.mocked(api.post).mockRejectedValue({
        response: { status: 401 },
      });

      const result = await authService.checkAuth();

      expect(result).toBe(false);
      expect(tokenStorage.clearTokens).toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalledWith('Token refresh failed:', expect.anything());
    });
  });

  describe('tryRefreshToken', () => {
    it('should refresh token successfully', async () => {
      vi.mocked(api.post).mockResolvedValue({
        data: { data: { access_token: 'new_access_token' } },
      });

      const result = await authService.tryRefreshToken('valid_refresh_token');

      expect(result).toBe(true);
      expect(tokenStorage.setAccessToken).toHaveBeenCalledWith('new_access_token');
    });

    it('should clear tokens when refresh fails', async () => {
      vi.mocked(api.post).mockRejectedValue(new Error('Invalid token'));

      const result = await authService.tryRefreshToken('invalid_refresh_token');

      expect(result).toBe(false);
      expect(tokenStorage.clearTokens).toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalledWith('Token refresh failed:', expect.any(Error));
    });
  });

  describe('logout', () => {
    it('should clear tokens', () => {
      authService.logout();

      expect(tokenStorage.clearTokens).toHaveBeenCalled();
    });
  });
});
