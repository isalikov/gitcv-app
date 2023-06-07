import { AppState } from '@gitcv/state/types'

export const onGenCvStart = (state: AppState): AppState => ({
    ...state,
    genCvState: {
        idle: false,
        succeed: false,
        pending: true,
        error: null,
    },
})

export default onGenCvStart
