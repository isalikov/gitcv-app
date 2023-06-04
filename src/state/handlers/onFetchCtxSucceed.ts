import { User } from '@isalikov/gitcv-api'

import { AppState } from '@gitcv/state/types'

export const onFetchCtxSucceed = (state: AppState, user: User): AppState => ({
    ...state,
    user,
    fetchState: {
        idle: false,
        succeed: true,
        pending: false,
        error: null,
    },
})

export default onFetchCtxSucceed
