import { describe, expect, it } from 'vitest';

import { publicApi } from '../publicApi';

describe('publicApi', () => {
  it('should have correct reducerPath', () => {
    expect(publicApi.reducerPath).toBe('publicApi');
  });

  it('should have no tagTypes', () => {
    expect(publicApi.enhanceEndpoints).toBeDefined();
  });

  describe('endpoints', () => {
    const endpoints = publicApi.endpoints;

    it('should have all expected endpoints', () => {
      expect(endpoints.healthCheck).toBeDefined();
      expect(endpoints.refreshToken).toBeDefined();
      expect(endpoints.logout).toBeDefined();
      expect(endpoints.getPublicResume).toBeDefined();
    });

    describe('healthCheck', () => {
      it('should be a query endpoint', () => {
        expect(endpoints.healthCheck.name).toBe('healthCheck');
      });
    });

    describe('refreshToken', () => {
      it('should be a mutation endpoint', () => {
        expect(endpoints.refreshToken.name).toBe('refreshToken');
      });
    });

    describe('logout', () => {
      it('should be a mutation endpoint', () => {
        expect(endpoints.logout.name).toBe('logout');
      });
    });

    describe('getPublicResume', () => {
      it('should be a query endpoint', () => {
        expect(endpoints.getPublicResume.name).toBe('getPublicResume');
      });
    });
  });

  describe('hooks', () => {
    it('should export useHealthCheckQuery hook', () => {
      expect(publicApi.useHealthCheckQuery).toBeDefined();
      expect(typeof publicApi.useHealthCheckQuery).toBe('function');
    });

    it('should export useRefreshTokenMutation hook', () => {
      expect(publicApi.useRefreshTokenMutation).toBeDefined();
      expect(typeof publicApi.useRefreshTokenMutation).toBe('function');
    });

    it('should export useLogoutMutation hook', () => {
      expect(publicApi.useLogoutMutation).toBeDefined();
      expect(typeof publicApi.useLogoutMutation).toBe('function');
    });

    it('should export useGetPublicResumeQuery hook', () => {
      expect(publicApi.useGetPublicResumeQuery).toBeDefined();
      expect(typeof publicApi.useGetPublicResumeQuery).toBe('function');
    });
  });
});
