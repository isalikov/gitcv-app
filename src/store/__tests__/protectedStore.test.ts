import { describe, expect, it } from 'vitest';

import { protectedApi } from '../protectedApi';
import { protectedStore } from '../protectedStore';

describe('protectedStore', () => {
  it('should have protectedApi reducer registered', () => {
    const state = protectedStore.getState();

    expect(state).toHaveProperty(protectedApi.reducerPath);
    expect(state[protectedApi.reducerPath]).toBeDefined();
  });

  it('should have correct reducer structure', () => {
    const state = protectedStore.getState();
    const apiState = state[protectedApi.reducerPath];

    // RTK Query state structure
    expect(apiState).toHaveProperty('queries');
    expect(apiState).toHaveProperty('mutations');
    expect(apiState).toHaveProperty('provided');
    expect(apiState).toHaveProperty('subscriptions');
    expect(apiState).toHaveProperty('config');
  });

  it('should expose dispatch method', () => {
    expect(protectedStore.dispatch).toBeDefined();
    expect(typeof protectedStore.dispatch).toBe('function');
  });

  it('should expose getState method', () => {
    expect(protectedStore.getState).toBeDefined();
    expect(typeof protectedStore.getState).toBe('function');
  });

  it('should expose subscribe method', () => {
    expect(protectedStore.subscribe).toBeDefined();
    expect(typeof protectedStore.subscribe).toBe('function');
  });
});
