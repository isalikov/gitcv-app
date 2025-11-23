import type { AuthTokens } from '@types';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { tokenStorage } from '../tokenStorage';

describe('tokenStorage', () => {
  const mockTokens: AuthTokens = {
    access_token: 'mock_access_token',
    refresh_token: 'mock_refresh_token',
  };

  // Mock localStorage
  const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
      configurable: true,
    });
  });

  describe('getTokens', () => {
    it('should return tokens when both access_token and refresh_token exist', () => {
      localStorageMock.getItem.mockImplementation((key: string) => {
        if (key === 'access_token') return mockTokens.access_token;
        if (key === 'refresh_token') return mockTokens.refresh_token;
        return null;
      });

      const result = tokenStorage.getTokens();

      expect(result).toEqual(mockTokens);
      expect(localStorageMock.getItem).toHaveBeenCalledWith('access_token');
      expect(localStorageMock.getItem).toHaveBeenCalledWith('refresh_token');
    });

    it('should return null when access_token is missing', () => {
      localStorageMock.getItem.mockImplementation((key: string) => {
        if (key === 'refresh_token') return mockTokens.refresh_token;
        return null;
      });

      const result = tokenStorage.getTokens();

      expect(result).toBeNull();
    });

    it('should return null when refresh_token is missing', () => {
      localStorageMock.getItem.mockImplementation((key: string) => {
        if (key === 'access_token') return mockTokens.access_token;
        return null;
      });

      const result = tokenStorage.getTokens();

      expect(result).toBeNull();
    });

    it('should return null when both tokens are missing', () => {
      localStorageMock.getItem.mockReturnValue(null);

      const result = tokenStorage.getTokens();

      expect(result).toBeNull();
    });
  });

  describe('setTokens', () => {
    it('should set both access_token and refresh_token in localStorage', () => {
      tokenStorage.setTokens(mockTokens);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'access_token',
        mockTokens.access_token,
      );
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'refresh_token',
        mockTokens.refresh_token,
      );
      expect(localStorageMock.setItem).toHaveBeenCalledTimes(2);
    });
  });

  describe('setAccessToken', () => {
    it('should set only access_token in localStorage', () => {
      const newToken = 'new_access_token';

      tokenStorage.setAccessToken(newToken);

      expect(localStorageMock.setItem).toHaveBeenCalledWith('access_token', newToken);
      expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);
    });
  });

  describe('clearTokens', () => {
    it('should remove both access_token and refresh_token from localStorage', () => {
      tokenStorage.clearTokens();

      expect(localStorageMock.removeItem).toHaveBeenCalledWith('access_token');
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('refresh_token');
      expect(localStorageMock.removeItem).toHaveBeenCalledTimes(2);
    });
  });

  describe('hasTokens', () => {
    it('should return true when tokens exist', () => {
      localStorageMock.getItem.mockImplementation((key: string) => {
        if (key === 'access_token') return mockTokens.access_token;
        if (key === 'refresh_token') return mockTokens.refresh_token;
        return null;
      });

      const result = tokenStorage.hasTokens();

      expect(result).toBe(true);
    });

    it('should return false when tokens do not exist', () => {
      localStorageMock.getItem.mockReturnValue(null);

      const result = tokenStorage.hasTokens();

      expect(result).toBe(false);
    });

    it('should return false when only access_token exists', () => {
      localStorageMock.getItem.mockImplementation((key: string) => {
        if (key === 'access_token') return mockTokens.access_token;
        return null;
      });

      const result = tokenStorage.hasTokens();

      expect(result).toBe(false);
    });

    it('should return false when only refresh_token exists', () => {
      localStorageMock.getItem.mockImplementation((key: string) => {
        if (key === 'refresh_token') return mockTokens.refresh_token;
        return null;
      });

      const result = tokenStorage.hasTokens();

      expect(result).toBe(false);
    });
  });
});
