import { StrictMode } from 'react';

import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { protectedStore } from '../../store';

const bootstrap = (): void => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Provider store={protectedStore}>
        <div style={{ padding: '2rem' }}>
          <Card title="Dashboard" subTitle="Protected Area">
            <p>Welcome to the Dashboard! This is a protected area.</p>
            <Button label="Primary Action" icon="pi pi-check" />
          </Card>
        </div>
      </Provider>
    </StrictMode>,
  );
};

export default bootstrap;
