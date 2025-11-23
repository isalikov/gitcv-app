import { Outlet, createRootRoute, createRoute, createRouter } from '@tanstack/react-router';

import { LandingLayout } from './layouts';
import { About, Home, Terms } from './routes';

// Root route
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

// Landing layout route
const landingLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'landing',
  component: LandingLayout,
});

// Landing home route
const indexRoute = createRoute({
  getParentRoute: () => landingLayoutRoute,
  path: '/',
  component: Home,
});

// Terms route
const termsRoute = createRoute({
  getParentRoute: () => landingLayoutRoute,
  path: '/terms',
  component: Terms,
});

// About route
const aboutRoute = createRoute({
  getParentRoute: () => landingLayoutRoute,
  path: '/about',
  component: About,
});

// Create route tree
const routeTree = rootRoute.addChildren([
  landingLayoutRoute.addChildren([indexRoute, termsRoute, aboutRoute]),
]);

// Create router instance
export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
});
