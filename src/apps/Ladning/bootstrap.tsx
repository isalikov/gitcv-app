import { StrictMode } from 'react';

import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { publicStore } from '../../store';

const bootstrap = (): void => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Provider store={publicStore}>
        <div style={{ padding: '2rem' }}>
          <Card title="Welcome" subTitle="Public Landing Page">
            <p>Welcome to GitCV! Create your professional resume with ease.</p>
            <Button label="Get Started" icon="pi pi-arrow-right" />
          </Card>
        </div>
      </Provider>
    </StrictMode>,
  );
};

export default bootstrap;
