import { AppState } from '@gitcv/state/types'

export const onFetchCtxStart = (state: AppState): AppState => ({
    ...state,
    fetchState: {
        idle: false,
        succeed: false,
        pending: true,
        error: null,
    },
})

export default onFetchCtxStart
