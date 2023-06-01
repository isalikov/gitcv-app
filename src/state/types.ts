import { Dispatch } from 'react'

import { LOCALE, THEME } from '@isalikov/gitcv-api'

import { GenericAction, GenericReducer } from '@gitcv/types/helpers'

import { Actions } from './actions'

export type AppState = {
    locale: LOCALE
    theme: THEME
}

export type ActionType =
    | GenericAction<Actions.SET_LOCALE, LOCALE>
    | GenericAction<Actions.SET_THEME, THEME>

export type AppReducer = GenericReducer<AppState, ActionType>

export type StateContextValue = {
    state: AppState
    dispatch: Dispatch<ActionType>
}
