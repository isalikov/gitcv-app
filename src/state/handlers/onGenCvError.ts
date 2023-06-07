import { AppState } from '@gitcv/state/types'

const onGenCvError = (state: AppState, error: number): AppState => ({
    ...state,
    genCvState: {
        error,
        idle: false,
        succeed: false,
        pending: false,
    },
})

export default onGenCvError
