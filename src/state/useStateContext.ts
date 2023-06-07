import { useReducer } from 'react'

import StateContext from './StateContext'
import { Actions } from './actions'
import {
    onFetchCtxError,
    onFetchCtxStart,
    onFetchCtxSucceed,
    onGenCvError,
    onGenCvStart,
    onGenCvSucceed,
    onSetLocale,
    onSetTheme,
    onSyncUserError,
    onSyncUserStart,
    onSyncUserSucceed,
} from './handlers'
import initialState from './initialState'
import { ActionType, AppState } from './types'

const reducer = (state: AppState, action: ActionType): AppState => {
    switch (action.type) {
        case Actions.FETCH_CTX_ERROR:
            return onFetchCtxError(state, action.payload)

        case Actions.FETCH_CTX_START:
            return onFetchCtxStart(state)

        case Actions.FETCH_CTX_SUCCEED:
            return onFetchCtxSucceed(state, action.payload)

        case Actions.GEN_CV_ERROR:
            return onGenCvError(state, action.payload)

        case Actions.GEN_CV_START:
            return onGenCvStart(state)

        case Actions.GEN_CV_SUCCEED:
            return onGenCvSucceed(state, action.payload)

        case Actions.SET_LOCALE:
            return onSetLocale(state, action.payload)

        case Actions.SET_THEME:
            return onSetTheme(state, action.payload)

        case Actions.SYNC_USER_ERROR:
            return onSyncUserError(state, action.payload)

        case Actions.SYNC_USER_START:
            return onSyncUserStart(state)

        case Actions.SYNC_USER_SUCCEED:
            return onSyncUserSucceed(state, action.payload)

        default:
            return state
    }
}

const useStateContext = () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return { StateContext, value: { state, dispatch } }
}

export default useStateContext
