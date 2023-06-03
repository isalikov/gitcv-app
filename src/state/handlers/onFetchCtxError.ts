import { AppState } from '@gitcv/state/types'

const onFetchCtxError = (state: AppState, error: number): AppState => ({
    ...state,
    fetchState: {
        error,
        idle: false,
        succeed: false,
        pending: false,
    },
})

export default onFetchCtxError
