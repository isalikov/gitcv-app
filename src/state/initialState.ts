import { AppState } from './types'

const awaitRequestState = {
    idle: true,
    succeed: false,
    pending: false,
    error: null,
}

const initialState: AppState = {
    genCvState: awaitRequestState,
    saveState: awaitRequestState,
    fetchState: awaitRequestState,
    syncState: awaitRequestState,
    user: null,
    locale: 'en',
    theme: 'light',
}

export default initialState
