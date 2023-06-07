import { Dispatch } from 'react'

import { Cv, User } from '@isalikov/gitcv-api'

import { FetchState, GenericAction, GenericReducer } from '@gitcv/types/helpers'

import { Actions } from './actions'

export type AppState = {
    fetchState: FetchState
    syncState: FetchState
    saveState: FetchState
    genCvState: FetchState
    user: Omit<User, 'settings'> | null
    locale: 'en' | 'es'
    theme: 'dark' | 'light'
}

export type ActionType =
    | GenericAction<Actions.SET_LOCALE, AppState['locale']>
    | GenericAction<Actions.SET_THEME, AppState['theme']>
    | GenericAction<Actions.FETCH_CTX_START>
    | GenericAction<Actions.FETCH_CTX_SUCCEED, User>
    | GenericAction<Actions.FETCH_CTX_ERROR, number>
    | GenericAction<Actions.GEN_CV_START>
    | GenericAction<Actions.GEN_CV_SUCCEED, Cv>
    | GenericAction<Actions.GEN_CV_ERROR, number>
    | GenericAction<Actions.SYNC_USER_START>
    | GenericAction<Actions.SYNC_USER_SUCCEED, User>
    | GenericAction<Actions.SYNC_USER_ERROR, number>

export type AppReducer = GenericReducer<AppState, ActionType>

export type StateContextValue = {
    state: AppState
    dispatch: Dispatch<ActionType>
}
