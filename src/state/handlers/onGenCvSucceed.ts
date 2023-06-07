import { Cv } from '@isalikov/gitcv-api'

import initialState from '@gitcv/state/initialState'
import { AppState } from '@gitcv/state/types'

export const onGenCvSucceed = (state: AppState, cv: Cv): AppState => {
    const { user } = state

    if (!user) {
        // TODO: handle error
        return initialState
    }

    return {
        ...state,
        user: {
            ...user,
            cvs: [...user.cvs, cv],
        },
        genCvState: {
            idle: false,
            succeed: true,
            pending: false,
            error: null,
        },
    }
}

export default onGenCvSucceed
