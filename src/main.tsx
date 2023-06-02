import { createRoot } from 'react-dom/client'

import { AppProviders, AppRoutes } from './App'

const node = document.querySelector('#root')

if (node) {
    const root = createRoot(node)

    root.render(
        <AppProviders>
            <AppRoutes />
        </AppProviders>
    )
}
