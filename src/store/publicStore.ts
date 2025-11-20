import { configureStore } from '@reduxjs/toolkit';

import { publicApi } from './publicApi';

/**
 * Redux store for Landing app with only public API endpoints
 */
export const publicStore = configureStore({
  reducer: {
    [publicApi.reducerPath]: publicApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(publicApi.middleware),
});

export type PublicRootState = ReturnType<typeof publicStore.getState>;
export type PublicAppDispatch = typeof publicStore.dispatch;
