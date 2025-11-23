import { Outlet, createRootRoute, createRoute, createRouter } from '@tanstack/react-router';

import { DashboardLayout } from './layouts';
import { Home, Repositories, RepositoryDetail, ResumeDetail, Resumes, Settings } from './routes';

// Root route
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

// Dashboard layout route
const dashboardLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'dashboard',
  component: DashboardLayout,
});

// Dashboard home route
const indexRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/',
  component: Home,
});

// Settings route
const settingsRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/settings',
  component: Settings,
});

// Resumes list route
const resumesRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/resumes',
  component: Resumes,
});

// Resume detail route
const resumeDetailRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/resumes/$id',
  component: ResumeDetail,
});

// Repositories list route
const repositoriesRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/repositories',
  component: Repositories,
});

// Repository detail route
const repositoryDetailRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/repositories/$id',
  component: RepositoryDetail,
});

// Create route tree
const routeTree = rootRoute.addChildren([
  dashboardLayoutRoute.addChildren([
    indexRoute,
    settingsRoute,
    resumesRoute,
    resumeDetailRoute,
    repositoriesRoute,
    repositoryDetailRoute,
  ]),
]);

// Create router instance
export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
});

// Register router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
