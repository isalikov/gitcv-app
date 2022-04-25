import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { IUser } from '@interfaces/User'

import App from './App'
import createStore from './store'

const bootstrap = (user: IUser | null) => {
    const store = createStore(user)

    render(
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>,
        document.querySelector('#root')
    )
}

export default bootstrap
