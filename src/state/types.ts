import { Dispatch } from 'react'

import { LOCALE, THEME, User } from '@isalikov/gitcv-api'

import { FetchState, GenericAction, GenericReducer } from '@gitcv/types/helpers'

import { Actions } from './actions'

export type AppState = {
    fetchState: FetchState
    syncState: FetchState
    user: Omit<User, 'settings'> | null
    locale: LOCALE
    theme: THEME
}

export type ActionType =
    | GenericAction<Actions.SET_LOCALE, LOCALE>
    | GenericAction<Actions.SET_THEME, THEME>
    | GenericAction<Actions.FETCH_CTX_START>
    | GenericAction<Actions.FETCH_CTX_SUCCEED, User>
    | GenericAction<Actions.FETCH_CTX_ERROR, number>
    | GenericAction<Actions.SYNC_USER_START>
    | GenericAction<Actions.SYNC_USER_SUCCEED, User>
    | GenericAction<Actions.SYNC_USER_ERROR, number>

export type AppReducer = GenericReducer<AppState, ActionType>

export type StateContextValue = {
    state: AppState
    dispatch: Dispatch<ActionType>
}
