import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

const bootstrap = () => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <div>Landing</div>
    </StrictMode>,
  );
};

export default bootstrap;
