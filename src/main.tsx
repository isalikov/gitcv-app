// PrimeReact styles
// Core CSS
import 'primeicons/primeicons.css';
// Theme
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-blue/theme.css';

// Icons

import BootDashboard from './apps/Dashboard/bootstrap';
import BootLanding from './apps/Ladning/bootstrap';
import { authService } from './services';

// Check authentication and boot appropriate app
async function initApp(): Promise<void> {
  const isAuthenticated = await authService.checkAuth();

  if (isAuthenticated) {
    BootDashboard();
  } else {
    BootLanding();
  }
}

// Start the application
void initApp();
