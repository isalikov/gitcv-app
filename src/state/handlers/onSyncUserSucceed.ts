import { User } from '@isalikov/gitcv-api'

import { AppState } from '@gitcv/state/types'

export const onSyncUserSucceed = (state: AppState, user: User): AppState => ({
    ...state,
    user,
    syncState: {
        idle: false,
        succeed: true,
        pending: false,
        error: null,
    },
})

export default onSyncUserSucceed
