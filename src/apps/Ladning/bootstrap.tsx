import { StrictMode } from 'react';

import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { publicStore } from '../../store';

const bootstrap = (): void => {
  const handleGitHubLogin = (): void => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
    window.location.href = `${apiUrl}/v1/auth/github`;
  };

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Provider store={publicStore}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#f5f5f5',
          }}
        >
          <Card
            title="Welcome to GitCV"
            subTitle="Create your professional resume from your GitHub profile"
            style={{ width: '400px', textAlign: 'center' }}
          >
            <p style={{ marginBottom: '2rem', color: '#666' }}>
              Sign in with your GitHub account to get started
            </p>
            <Button
              label="Login with GitHub"
              icon="pi pi-github"
              onClick={handleGitHubLogin}
              style={{ width: '100%' }}
              size="large"
            />
          </Card>
        </div>
      </Provider>
    </StrictMode>,
  );
};

export default bootstrap;
