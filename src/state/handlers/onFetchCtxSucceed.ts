import { User } from '@isalikov/gitcv-api'

import { AppState } from '@gitcv/state/types'

export const onFetchCtxSucceed = (
    state: AppState,
    { settings, ...user }: User
): AppState => ({
    ...state,
    user,
    locale: settings.locale,
    theme: settings.theme,
    fetchState: {
        idle: false,
        succeed: true,
        pending: false,
        error: null,
    },
})

export default onFetchCtxSucceed
