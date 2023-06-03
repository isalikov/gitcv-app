import { AppState } from './types'

const awaitRequestState = {
    idle: true,
    succeed: false,
    pending: false,
    error: null,
}

const initialState: AppState = {
    fetchState: awaitRequestState,
    syncState: awaitRequestState,
    user: null,
    locale: 'en',
    theme: 'light',
}

export default initialState
