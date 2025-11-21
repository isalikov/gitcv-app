import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { publicStore } from '../../store';
import { Landing } from './Landing';

const bootstrap = (): void => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Provider store={publicStore}>
        <Landing />
      </Provider>
    </StrictMode>,
  );
};

export default bootstrap;
