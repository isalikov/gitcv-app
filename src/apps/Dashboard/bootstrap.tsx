import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { protectedApi, protectedStore } from '../../store';
import type { MeResponse } from '../../types/auth';
import { Dashboard } from './Dashboard';

const bootstrap = (meResponse: MeResponse): void => {
  // Preload /me data into RTK Query cache
  void protectedStore.dispatch(protectedApi.util.upsertQueryData('getMe', undefined, meResponse));

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Provider store={protectedStore}>
        <Dashboard />
      </Provider>
    </StrictMode>,
  );
};

export default bootstrap;
