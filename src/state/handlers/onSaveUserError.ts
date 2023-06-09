import { AppState } from '@gitcv/state/types'

const onSaveUserError = (state: AppState, error: number): AppState => ({
    ...state,
    saveState: {
        error,
        idle: false,
        succeed: false,
        pending: false,
    },
})

export default onSaveUserError
