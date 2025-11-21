import { describe, expect, it } from 'vitest';

import { publicApi } from '../publicApi';
import { publicStore } from '../publicStore';

describe('publicStore', () => {
  it('should have publicApi reducer registered', () => {
    const state = publicStore.getState();

    expect(state).toHaveProperty(publicApi.reducerPath);
    expect(state[publicApi.reducerPath]).toBeDefined();
  });

  it('should have correct reducer structure', () => {
    const state = publicStore.getState();
    const apiState = state[publicApi.reducerPath];

    // RTK Query state structure
    expect(apiState).toHaveProperty('queries');
    expect(apiState).toHaveProperty('mutations');
    expect(apiState).toHaveProperty('provided');
    expect(apiState).toHaveProperty('subscriptions');
    expect(apiState).toHaveProperty('config');
  });

  it('should expose dispatch method', () => {
    expect(publicStore.dispatch).toBeDefined();
    expect(typeof publicStore.dispatch).toBe('function');
  });

  it('should expose getState method', () => {
    expect(publicStore.getState).toBeDefined();
    expect(typeof publicStore.getState).toBe('function');
  });

  it('should expose subscribe method', () => {
    expect(publicStore.subscribe).toBeDefined();
    expect(typeof publicStore.subscribe).toBe('function');
  });
});
