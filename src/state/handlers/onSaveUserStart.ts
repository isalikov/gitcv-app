import { AppState } from '@gitcv/state/types'

export const onSyncUserStart = (state: AppState): AppState => ({
    ...state,
    saveState: {
        idle: false,
        succeed: false,
        pending: true,
        error: null,
    },
})

export default onSyncUserStart
