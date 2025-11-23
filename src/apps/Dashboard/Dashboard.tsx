import { RouterProvider } from '@tanstack/react-router';

import { router } from './router';

export const Dashboard = () => {
  return <RouterProvider router={router} />;
};
