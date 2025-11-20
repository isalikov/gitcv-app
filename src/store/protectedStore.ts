import { configureStore } from '@reduxjs/toolkit';

import { protectedApi } from './protectedApi';

/**
 * Redux store for Dashboard app with protected API endpoints (requires authentication)
 */
export const protectedStore = configureStore({
  reducer: {
    [protectedApi.reducerPath]: protectedApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(protectedApi.middleware),
});

export type ProtectedRootState = ReturnType<typeof protectedStore.getState>;
export type ProtectedAppDispatch = typeof protectedStore.dispatch;
