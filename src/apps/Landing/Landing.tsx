import { RouterProvider } from '@tanstack/react-router';

import { router } from './router';

export const Landing = () => {
  return <RouterProvider router={router} />;
};
