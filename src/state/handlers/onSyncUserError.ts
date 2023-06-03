import { AppState } from '@gitcv/state/types'

const onSyncUserError = (state: AppState, error: number): AppState => ({
    ...state,
    syncState: {
        error,
        idle: false,
        succeed: false,
        pending: false,
    },
})

export default onSyncUserError
