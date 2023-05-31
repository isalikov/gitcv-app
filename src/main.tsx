import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

const node = document.querySelector('#root')

if (node) {
    const root = createRoot(node)

    root.render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
    )
}
